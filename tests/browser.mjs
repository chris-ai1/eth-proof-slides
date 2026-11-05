// Copyright (c) 2026 Christian Reitwiessner
// Authors: Christian Reitwiessner
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const base=process.env.TEST_URL || pathToFileURL(resolve('site/index.html')).href;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
function pass(s){checks.push(s);console.log('PASS',s);}
try{
 await page.goto(base);await page.waitForSelector('#step-title');
 const slides=await page.evaluate(()=>window.ETH_TALK.slides);
 assert.equal(slides.length,20);assert.equal(await page.locator('.index-link').count(),20);
 pass('20-slide index and initial overview load');
 for(let i=0;i<slides.length;i++)for(let j=0;j<3;j++){
   await page.evaluate(hash=>{location.hash=hash;},'#'+slides[i].id+(j?'/'+j:''));
   await page.waitForFunction(({title,label})=>document.querySelector('#slide-title').textContent===title&&document.querySelector('#step-title').textContent===label,{title:slides[i].title,label:slides[i].steps[j].label});
   assert.equal(await page.locator('#stage svg').count(),1);
   assert.equal(await page.locator('.katex-error').count(),0,'KaTeX error on '+slides[i].id+'/'+j);
   assert.ok((await page.locator('#next-reason').textContent()).length>35);
 }
 pass('All 60 reveal states render without math errors, with causal next-step text');
 await page.goto(base+'#small-example/2');await page.waitForSelector('#dial');
 await page.locator('#dial').fill('0');await page.locator('#dial').dispatchEvent('input');assert.match(await page.locator('#live-value').textContent(),/9\.00/);
 await page.locator('#dial').fill('1');await page.locator('#dial').dispatchEvent('input');assert.match(await page.locator('#live-value').textContent(),/6\.00/);
 pass('Toy polynomial dial preserves H(0)=9 and evaluates H(1)=6');
 await page.goto(base+'#root-filter');await page.waitForSelector('#dial');await page.locator('#dial').fill('2');await page.locator('#dial').dispatchEvent('input');assert.match(await page.locator('#live-value').textContent(),/0\.00/);
 pass('Root filter vanishes at its mismatched node');
 await page.goto(base+'#condition');await page.locator('[data-action="summary"][data-value="2"]').click();assert.match(await page.locator('#stage').textContent(),/0 × 1 = 0/);await page.locator('[data-action="summary"][data-value="1"]').click();assert.match(await page.locator('#stage').textContent(),/2 × 2 = 4/);
 pass('Summary conditioning changes the constrained group product correctly');
 await page.goto(base+'#swaps');await page.locator('[data-action="swap"]').click();assert.match(await page.locator('#stage').textContent(),/supplies orange/);
 pass('Swap control connects a fixed receiving row to a matching supplying column');
 await page.goto(base+'#the-plan');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#step-label').textContent(),'Step 2 of 3');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#step-label').textContent(),'Step 1 of 3');
 await page.locator('#formal summary').click();assert.equal(await page.locator('#formal').getAttribute('open'),'');
 await page.locator('#sources-open').click();assert.equal(await page.locator('#sources-dialog').evaluate(x=>x.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#sources-dialog').evaluate(x=>x.open),false);
 pass('Keyboard navigation, expandable details, and accessible source dialog');
 await page.locator('#tour').click();await page.waitForFunction(()=>!document.querySelector('#narrator').paused&&document.querySelector('#narrator').duration>0);
 assert.match(await page.locator('#narrator').getAttribute('src'),/the-plan-0\.mp3/);
 await page.evaluate(()=>document.querySelector('#narrator').dispatchEvent(new Event('ended')));await page.waitForFunction(()=>document.querySelector('#step-label').textContent==='Step 2 of 3');
 await page.locator('#tour').click();assert.equal(await page.locator('#narrator').evaluate(x=>x.paused),true);
 pass('Real audio loads and plays; tour advances and pauses');
 await page.locator('#theme').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.locator('#motion').click();assert.equal(await page.locator('html').getAttribute('data-motion'),'reduce');
 pass('Theme and reduced-motion controls work');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(base);await mobile.waitForSelector('#slide-title');assert.equal(await mobile.locator('#sidebar').evaluate(x=>x.inert),true);
 await mobile.locator('#menu').click();assert.equal(await mobile.locator('#menu').getAttribute('aria-expanded'),'true');await mobile.locator('.index-link[data-slide="11"]').click();assert.match(await mobile.locator('#slide-title').textContent(),/root/);assert.equal(await mobile.locator('#menu').getAttribute('aria-expanded'),'false');
 for(const slide of slides){await mobile.evaluate(id=>{location.hash='#'+id;},slide.id);await mobile.waitForFunction(title=>document.querySelector('#slide-title').textContent===title,slide.title);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Mobile overflow '+slide.id);}
 pass('All slides fit a 390px mobile viewport; menu is operable and hidden navigation is inert');
 await mkdir('scripts/qa',{recursive:true});await page.goto(base+'#the-plan');await page.screenshot({path:'scripts/qa/desktop.png',fullPage:true});await mobile.goto(base+'#condition');await mobile.screenshot({path:'scripts/qa/mobile.png',fullPage:true});await mobile.close();
 assert.deepEqual(errors,[]);pass('No JavaScript page errors');
 await writeFile('scripts/qa/report.json',JSON.stringify({authors:['Christian Reitwiessner'],base,checks,errors},null,2));
 console.log('All browser checks passed');
}finally{await browser.close();}
