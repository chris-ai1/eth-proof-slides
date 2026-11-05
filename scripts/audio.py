# Copyright (c) 2026 Christian Reitwiessner
# Authors: Christian Reitwiessner
"""Optional prerecorded neural narration, one clip per reveal step."""
from pathlib import Path
import hashlib,json,re,wave,subprocess
from piper import PiperVoice,SynthesisConfig
import onnxruntime as ort
ROOT=Path(__file__).resolve().parents[1]
MODEL=ROOT.parent/'assets/voice/en_US-lessac-high.onnx'
def spoken(text):
    substitutions={
      '2^(ηn)':'two to the eta n','2^(Q':'two to the Q','s^4':'s to the fourth','s^3':'s cubed','s^−6':'s to the minus sixth',
      'D=r^(2Q)':'D equals r to the two Q','N=r':'N equals r','Cηn':'C eta times n','Bηn':'B eta times n','asBη':'a sub s times B eta',
      'Cη':'C eta','Bη':'B eta','N_i':'N sub i','H(1+z)':'H of one plus z','H(0)':'H of zero','H(1)':'H of one','H(T)':'H of T',
      'P(0)':'P of zero','P(T)':'P of T','I−K':'identity minus K','Πt':'Pi sub t','Π':'Pi','ζw(x)':'zeta sub w of x','ζ':'zeta','τ':'tau','η':'eta','ε':'epsilon','ℓ':'ell',
      '≤':' at most ','≥':' at least ','−':' minus ','→':' then ','∈':' in ', '⊆':' contained in ', 'x3=x4=1':'x three and x four both equal one',
      'E={3,4}':'E consisting of indices three and four','[−D,D]':'the integers from minus D through D','X3X4':'capital X three times capital X four',
      '3NR':'three N R','2N/r':'two N over r','2τN':'two tau N','2tauN':'two tau N','2D':'two D','R−1':'R minus one','QJ':'Q times J','J=q+1':'J equals q plus one',
      'x_A':'the first group assignment','x_B':'the second group assignment','av':'a sub v','de':'d sub e','e,v':'e comma v',
      'D=r':'D equals r','r=s':'r equals s','Q=s':'Q equals s','R=s':'R equals s','tau=s':'tau equals s','cε':'c epsilon'
    }
    for a,b in substitutions.items():text=text.replace(a,b)
    names={'1':'one','2':'two','3':'three','4':'four'}
    text=re.sub(r'\b([xX])([1-4])',lambda m:('capital X ' if m[1]=='X' else 'x ')+names[m[2]],text)
    text=re.sub(r'\bH\(t\+z\)','H of t plus z',text)
    text=text.replace('=',' equals ').replace('^',' to the power ').replace('∥',' norm ')
    return re.sub(r'\s+',' ',text).strip()
def main():
    data=json.loads((ROOT/'scripts/slides.json').read_text())
    voice=PiperVoice.load(MODEL);opt=ort.SessionOptions();opt.intra_op_num_threads=2;opt.inter_op_num_threads=1
    voice.session=ort.InferenceSession(str(MODEL),sess_options=opt,providers=['CPUExecutionProvider'])
    cache=ROOT/'scripts/.audio-cache';cache.mkdir(exist_ok=True)
    manifest={}
    for i,s in enumerate(data['slides']):
      for j,step in enumerate(s['steps']):
        text=spoken(step['narration']);key=hashlib.sha256(('1.29'+text).encode()).hexdigest()[:18];wav=cache/(key+'.wav');mp3=ROOT/f'site/assets/audio/{s["id"]}-{j}.mp3'
        if not wav.exists():
          with wave.open(str(wav),'wb') as w:voice.synthesize_wav(text,w,SynthesisConfig(length_scale=1.29,noise_scale=.60,noise_w_scale=.65))
        with wave.open(str(wav)) as w:seconds=w.getnframes()/w.getframerate()
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(wav),'-af','loudnorm=I=-18:TP=-2:LRA=9','-c:a','libmp3lame','-b:a','80k','-metadata','artist=Christian Reitwiessner',str(mp3)],check=True)
        manifest[f'{s["id"]}-{j}']=dict(seconds=round(seconds,2),speech=text)
      print(f'Narration {i+1}/20',flush=True)
    (ROOT/'site/audio.js').write_text('// Authors: Christian Reitwiessner\nwindow.ETH_AUDIO = '+json.dumps(manifest,ensure_ascii=False)+';\n')
    print('Total narration minutes',round(sum(x['seconds'] for x in manifest.values())/60,1),flush=True)
if __name__=='__main__':main()
