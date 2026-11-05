// Copyright (c) 2026 Christian Reitwiessner
// Authors: Christian Reitwiessner
window.ETH_TALK = {
  "authors": [
    "Christian Reitwiessner"
  ],
  "title": "An algebraic escape",
  "slides": [
    {
      "id": "the-plan",
      "chapter": "Overview",
      "title": "The whole idea, before the machinery.",
      "lead": "Recover a hard answer from calculations with more useful structure.",
      "why": "independent small groups can be handled separately, but arbitrary SAT formulas contain interactions between groups.",
      "kind": "overview",
      "next": "Next we will isolate the obstruction: exactly how a crossing clause couples two groups.",
      "steps": [
        {
          "label": "The opportunity",
          "body": "If every clause stayed within one group, we could solve the groups separately and multiply their counts. Crossing clauses prevent that separation.",
          "math": "\\text{independent groups}\\quad\\Longrightarrow\\quad\\text{separate sums, then multiply}",
          "narration": "We are here because independent small groups can be handled separately, but arbitrary SAT formulas contain interactions between groups. If every clause stayed within one group, we could solve the groups separately and multiply their counts. Crossing clauses prevent that separation. The useful idea is structural independence, not a numerical comparison of assignment counts."
        },
        {
          "label": "The transfer",
          "body": "Instead of separating the original formula directly, build a polynomial whose value at zero is its count. Other selected points will have more useful structure.",
          "math": "H(0)=\\#F",
          "narration": "Instead of separating the original formula directly, build a polynomial whose value at zero is its count. Other selected points will have more useful structure. Here F is the original formula. T will be the polynomial parameter, and H of T its weighted counting sum."
        },
        {
          "label": "The two jobs",
          "body": "We need a low-degree construction that creates structured points, and an affordable way to obtain enough data at those points. Interpolation then recovers the answer.",
          "math": "\\text{construct structure}\\quad+\\quad\\text{recover enough data}",
          "narration": "We need a low-degree construction that creates structured points, and an affordable way to obtain enough data at those points. Interpolation then recovers the answer. These are different jobs. The first is an algebraic construction; the second is a derivative-recovery algorithm. Next we will isolate the obstruction: exactly how a crossing clause couples two groups."
        }
      ],
      "details": []
    },
    {
      "id": "coupling",
      "chapter": "Overview",
      "title": "Why drawing boxes does not help.",
      "lead": "A partition is useful only if the calculation actually separates.",
      "why": "we need to know what must change before a group-by-group calculation is valid.",
      "kind": "coupling",
      "next": "Next we will explain why answers to different weighted calculations can determine the original answer.",
      "steps": [
        {
          "label": "Separate choices",
          "body": "For genuinely independent groups, the sum of a product factors into a product of sums.",
          "math": "\\sum_{x_A,x_B} f(x_A)g(x_B)=\\left(\\sum_{x_A}f(x_A)\\right)\\left(\\sum_{x_B}g(x_B)\\right)",
          "narration": "We are here because we need to know what must change before a group-by-group calculation is valid. For genuinely independent groups, the sum of a product factors into a product of sums. The variables x sub A and x sub B are the assignments in the two groups."
        },
        {
          "label": "A crossing factor",
          "body": "A factor involving both groups prevents this identity from being applied directly. Deleting that factor would change the problem.",
          "math": "\\sum_{x_A,x_B} f(x_A)g(x_B)c(x_A,x_B)",
          "narration": "A factor involving both groups prevents this identity from being applied directly. Deleting that factor would change the problem. The crossing factor c depends on both choices. It cannot be placed entirely inside either group sum."
        },
        {
          "label": "What would suffice",
          "body": "We can allow a short list of shared summaries, provided fixing their group contributions leaves independent sums. The summaries must be kept exactly.",
          "math": "\\text{condition on summaries}\\ \\longrightarrow\\ \\text{separate}",
          "narration": "We can allow a short list of shared summaries, provided fixing their group contributions leaves independent sums. The summaries must be kept exactly. This is the structure we will ask our new calculations to have; we are not assuming the original formula already has it. Next we will explain why answers to different weighted calculations can determine the original answer."
        }
      ],
      "details": []
    },
    {
      "id": "interpolation",
      "chapter": "Overview",
      "title": "Put the answer at zero.",
      "lead": "A polynomial is the bridge between the original problem and structured calculations.",
      "why": "changing the calculation is useful only if we can recover the answer we wanted.",
      "kind": "interpolation",
      "next": "Next we will follow a small example through the entire transfer, before asking how to construct it for every input.",
      "steps": [
        {
          "label": "Preserve one point",
          "body": "Replace clause inputs by polynomial expressions in a parameter T, agreeing with the original inputs at T=0. Summing the resulting weights defines H(T).",
          "math": "L_{e,v}(0;X)=X_v\\quad\\Longrightarrow\\quad H(0)=\\#F",
          "narration": "We are here because changing the calculation is useful only if we can recover the answer we wanted. Replace clause inputs by polynomial expressions in a parameter T, agreeing with the original inputs at T=0. Summing the resulting weights defines H(T). The replacement for variable v in factor e is called L sub e comma v. Capital X denotes formal inputs."
        },
        {
          "label": "Recover a polynomial",
          "body": "Enough exact values and derivatives determine a polynomial of bounded degree. Once H is known, evaluate it at zero.",
          "math": "\\text{exact data}+\\text{degree bound}\\quad\\Longrightarrow\\quad H(0)",
          "narration": "Enough exact values and derivatives determine a polynomial of bounded degree. Once H is known, evaluate it at zero. For example, a value, slope, and curvature at one point determine a quadratic. This is only an illustration of interpolation."
        },
        {
          "label": "Keep the transfer affordable",
          "body": "An arbitrary curve through easy instances may have too high a degree. The real challenge is making both the degree and the cost of obtaining its data small.",
          "math": "\\text{low degree}\\quad+\\quad\\text{inexpensive structured data}",
          "narration": "An arbitrary curve through easy instances may have too high a degree. The real challenge is making both the degree and the cost of obtaining its data small. The other values need not be counts of Boolean formulas, positive numbers, or equal to the original count. Next we will follow a small example through the entire transfer, before asking how to construct it for every input."
        }
      ],
      "details": []
    },
    {
      "id": "small-example",
      "chapter": "A running example",
      "title": "One transfer you can inspect.",
      "lead": "A small example explains the roles; it is not a hard instance.",
      "why": "we should see what changes and what stays exact before introducing the general construction.",
      "kind": "example",
      "next": "Next we will fix that summary y, because doing so makes the two groups independent in the modified calculation.",
      "steps": [
        {
          "label": "Choose a partition",
          "body": "Take this two-clause formula and the groups A={1,2}, B={3,4}. The chosen partition makes both clauses cross. Another partition would separate this toy.",
          "math": "F=(x_1\\vee x_3)\\wedge(x_2\\vee\\neg x_4),\\qquad x_i\\in\\{0,1\\}",
          "narration": "We are here because we should see what changes and what stays exact before introducing the general construction. Take this two-clause formula and the groups A={1,2}, B={3,4}. The chosen partition makes both clauses cross. Another partition would separate this toy. The original count is nine. The example is deliberately small; it demonstrates recovery, not an algorithmic speedup."
        },
        {
          "label": "Turn clauses into weights",
          "body": "On Boolean inputs these clause polynomials are their zero-or-one indicators. Their product, summed over the original assignments, counts solutions.",
          "math": "\\Phi_1=1-(1-X_1)(1-X_3),\\qquad\\Phi_2=1-(1-X_2)X_4",
          "narration": "On Boolean inputs these clause polynomials are their zero-or-one indicators. Their product, summed over the original assignments, counts solutions. This algebraic representation lets us substitute non-Boolean inputs while still defining an exact weighted sum."
        },
        {
          "label": "Move the dial",
          "body": "Keep inputs 1 and 2 unchanged. Replace the other two inputs as shown. At zero this is the original calculation. At one, both changed inputs become y=x3+x4.",
          "math": "L_3=X_3+TX_4,\\qquad L_4=X_4+TX_3",
          "narration": "Keep inputs 1 and 2 unchanged. Replace the other two inputs as shown. At zero this is the original calculation. At one, both changed inputs become y=x3+x4. Use the dial to inspect the weighted sum. Values away from zero are not counts of the same original problem. Next we will fix that summary y, because doing so makes the two groups independent in the modified calculation."
        }
      ],
      "details": [
        [
          "Exact toy calculation",
          "For this toy, direct expansion gives $H(T)=9-2T-T^2$, so $H(0)=9$ and $H(1)=6$. These numbers illustrate that deformation changes the value. They do not explain the speedup, and no binary assignment table is needed."
        ]
      ]
    },
    {
      "id": "condition",
      "chapter": "A running example",
      "title": "Fix a summary. Then separate.",
      "lead": "Conditioning is the step that makes the product structure real.",
      "why": "at T=1 the modified inputs depend on the second group only through y=x3+x4.",
      "kind": "condition",
      "next": "Next we will turn this example into a precise group-evaluation contract, including the costs that must be bounded.",
      "steps": [
        {
          "label": "Freeze the interaction",
          "body": "For a prescribed y, both modified clause factors depend only on x1,x2 and that fixed value. The second group only needs to realize y.",
          "math": "A(x_1;y)=x_1+(1-x_1)y,\\quad B(x_2;y)=1-(1-x_2)y",
          "narration": "We are here because at T=1 the modified inputs depend on the second group only through y=x3+x4. For a prescribed y, both modified clause factors depend only on x1,x2 and that fixed value. The second group only needs to realize y. Here A and B name the two modified factor values, not the groups themselves."
        },
        {
          "label": "Multiply constrained sums",
          "body": "Sum the weighted factors in the first group. Multiply by the number of second-group assignments realizing the same summary. Each complete assignment belongs to one summary value.",
          "math": "H(1)=\\sum_y\\left(\\sum_{x_1,x_2} A(x_1;y)B(x_2;y)\\right)\\left|\\{(x_3,x_4):x_3+x_4=y\\}\\right|",
          "narration": "Sum the weighted factors in the first group. Multiply by the number of second-group assignments realizing the same summary. Each complete assignment belongs to one summary value. The summary is supported in the second group, so fixing it does not impose a new equation coupling the groups."
        },
        {
          "label": "Recover the original value",
          "body": "Summing over y gives H(1)=6, not the original count 9. Supplied Taylor data recover H(0) exactly; obtaining such data efficiently in general is still a separate task.",
          "math": "H(1+z)=6-4z-z^2\\quad\\Longrightarrow\\quad H(0)=9",
          "narration": "Summing over y gives H(1)=6, not the original count 9. Supplied Taylor data recover H(0) exactly; obtaining such data efficiently in general is still a separate task. In this toy, the Taylor record comes from direct expansion. Setting z to minus one returns to T zero. Next we will turn this example into a precise group-evaluation contract, including the costs that must be bounded."
        }
      ],
      "details": []
    },
    {
      "id": "group-contract",
      "chapter": "Evaluation",
      "title": "What makes a node inexpensive?",
      "lead": "A short, bounded-range list of exact summaries is enough.",
      "why": "we now need a guarantee that applies to every input, not just the example.",
      "kind": "groups",
      "next": "Next we need a construction that creates this node structure while keeping the polynomial degree low.",
      "steps": [
        {
          "label": "Balanced local work",
          "body": "Let N be the bounded-occurrence input size. At a selected node t, partition its variable indices into r groups, each of size at most 2N/r. Assign every factor to one group.",
          "math": "[N]=\\bigsqcup_{g=1}^{r}S_{t,g},\\quad |S_{t,g}|\\leq2N/r",
          "narration": "We are here because we now need a guarantee that applies to every input, not just the example. Let N be the bounded-occurrence input size. At a selected node t, partition its variable indices into r groups, each of size at most 2N/r. Assign every factor to one group. Here r is a fixed integer at least two. Every input of a factor uses that same assigned group."
        },
        {
          "label": "Bounded exact summaries",
          "body": "Allow at most 2τN integer linear measurements at each node. Each is supported in one group and has coefficient absolute sum at most D, hence integer values in [−D,D].",
          "math": "\\#\\text{measurements}\\leq2\\tau N,\\quad\\|m\\|_1\\leq D",
          "narration": "Allow at most 2τN integer linear measurements at each node. Each is supported in one group and has coefficient absolute sum at most D, hence integer values in [−D,D]. The density tau is a positive rational, and D a positive integer. Both are fixed before the input. Fix each group contribution separately, not just their total."
        },
        {
          "label": "Name the cost",
          "body": "Enumerate summary tuples, then enumerate assignments within each group separately. Multiply the group answers. The searches add; we do not search their Cartesian product.",
          "math": "T_{\\rm node}\\leq\\operatorname{poly}(N)(2D+1)^{2\\tau N}2^{2N/r}",
          "narration": "Enumerate summary tuples, then enumerate assignments within each group separately. Multiply the group answers. The searches add; we do not search their Cartesian product. This also works with known constants added to factor inputs, and with specified actual bits fixed inside their own groups. Those extensions will pay for derivatives. Next we need a construction that creates this node structure while keeping the polynomial degree low."
        }
      ],
      "details": [
        [
          "Evaluation lemma and domains",
          "Fix rational parameters $r,Q,R,D,\\tau$ with integer $r\\ge2$, positive integers $Q,R,D$, and rational $\\tau>0$. At each integer node $t\\in[Q]$, every supplied replacement input must be a rational linear combination of local variables and the supplied measurements. Measurement matrices have integer entries, each row has $\\ell_1$ norm at most $D$. The displayed bound counts rational operations, up to polynomial factors for these fixed parameters. The exact-arithmetic lemma later converts it to bit complexity."
        ]
      ]
    },
    {
      "id": "construction-contract",
      "chapter": "Construction",
      "title": "What must the construction deliver?",
      "lead": "Identity at zero. Locality at selected nodes. Low degree throughout.",
      "why": "we know how to evaluate a structured node, but do not yet know how to create one.",
      "kind": "contract",
      "next": "Next we will connect an actual clause input to a matrix row, because the construction acts on stored input slots.",
      "steps": [
        {
          "label": "Keep the original calculation",
          "body": "For each factor input, its replacement at zero must be its original variable, identically in the formal inputs. This is what protects H(0).",
          "math": "L_{e,v}(0;X)=X_v",
          "narration": "We are here because we know how to evaluate a structured node, but do not yet know how to create one. For each factor input, its replacement at zero must be its original variable, identically in the formal inputs. This is what protects H(0). The factor index is e, and v indexes an original variable appearing in that factor."
        },
        {
          "label": "Create structured points",
          "body": "At each of Q selected integer nodes, every replacement must use its assigned group plus the bounded exact measurements from our evaluation contract.",
          "math": "t\\in[Q]:\\quad\\text{local input}+\\text{exact summary correction}",
          "narration": "At each of Q selected integer nodes, every replacement must use its assigned group plus the bounded exact measurements from our evaluation contract. The groups and factor assignments may change with the node. We do not need one partition that works at every point."
        },
        {
          "label": "Control the degree",
          "body": "Ask for replacement degree below R. Then the count polynomial has degree at most 3NR in the normalized bounded-occurrence system.",
          "math": "\\deg_TL_{e,v}<R,\\qquad\\deg H\\leq3NR",
          "narration": "Ask for replacement degree below R. Then the count polynomial has degree at most 3NR in the normalized bounded-occurrence system. The node count Q and degree parameter R are fixed before the input. Later, their ratio will control how many derivatives we need. Next we will connect an actual clause input to a matrix row, because the construction acts on stored input slots."
        }
      ],
      "details": [
        [
          "Normalization",
          "We first work with width-three formulas where each variable occurs at most three times. After removing tautologies and terminal empty-clause cases, add a dummy constant-one factor for every unused declared variable. There are $N\\le M\\le3N$ incidence slots. No new Boolean variable is introduced by these dummy factors."
        ]
      ]
    },
    {
      "id": "dictionary",
      "chapter": "Construction",
      "title": "A row is a replacement rule.",
      "lead": "Storage coordinates organize original bits; they do not create new choices.",
      "why": "the next linear-algebra step must still represent inputs of the original formula.",
      "kind": "dictionary",
      "next": "Next we will swap supplying and receiving labels, because that gives the group match required for locality.",
      "steps": [
        {
          "label": "Label one occurrence",
          "body": "Give variable v a supplying schedule av and factor e a receiving schedule de of group labels across the Q nodes. Their pair labels the occurrence slot u.",
          "math": "u=(a_v,d_e),\\qquad a_v,d_e\\in[r]^Q",
          "narration": "We are here because the next linear-algebra step must still represent inputs of the original formula. Give variable v a supplying schedule av and factor e a receiving schedule de of group labels across the Q nodes. Their pair labels the occurrence slot u. The slot for this particular occurrence stores the symbol X v. Repeated slots for that variable will always use the same actual bit."
        },
        {
          "label": "Read one row",
          "body": "A row u of a matrix polynomial P(T) specifies the replacement of this clause input. Column w names another stored symbol. ζw(x) is that original bit, or zero in an unused slot.",
          "math": "L_{e,v}(T;x)=\\sum_w P(T)[u,w]\\zeta_w(x)",
          "narration": "A row u of a matrix polynomial P(T) specifies the replacement of this clause input. Column w names another stored symbol. ζw(x) is that original bit, or zero in an unused slot. We have changed the linear rule for a clause input, not the Boolean assignment space."
        },
        {
          "label": "Protect zero",
          "body": "If P(0)=I, row u selects its original slot. The replacement at zero is exactly the original variable. Now we can look for a matrix with useful behavior at other nodes.",
          "math": "P(0)=I\\quad\\Longrightarrow\\quad L_{e,v}(0;x)=x_v",
          "narration": "If P(0)=I, row u selects its original slot. The replacement at zero is exactly the original variable. Now we can look for a matrix with useful behavior at other nodes. This is the dictionary we will keep using: occurrence, row, stored symbol, actual bit. Next we will swap supplying and receiving labels, because that gives the group match required for locality."
        }
      ],
      "details": []
    },
    {
      "id": "swaps",
      "chapter": "Construction",
      "title": "Swapping gives locality—but loses identity.",
      "lead": "The two requirements pull in different directions.",
      "why": "we need each replacement to draw from its factor’s assigned group at a selected node.",
      "kind": "swap",
      "next": "Next we will state that lemma explicitly, then derive the useful deformation from its two guarantees.",
      "steps": [
        {
          "label": "Match the group labels",
          "body": "At node t, the receiving factor wants inputs supplied by its assigned group. Swapping the two labels makes the supplying label match that receiving label.",
          "math": "a_w(t)=d_u(t)\\quad\\text{is the locality condition}",
          "narration": "We are here because we need each replacement to draw from its factor’s assigned group at a selected node. At node t, the receiving factor wants inputs supplied by its assigned group. Swapping the two labels makes the supplying label match that receiving label. Try the swap control. It concerns slot labels, not new Boolean variables."
        },
        {
          "label": "Swap every node",
          "body": "Let Πt exchange the two labels at node t. The swaps commute and square to identity. Their product V gives the matching condition at all nodes.",
          "math": "\\Pi_t^2=I,\\quad V=\\prod_{t=1}^{Q}\\Pi_t",
          "narration": "Let Πt exchange the two labels at node t. The swaps commute and square to identity. Their product V gives the matching condition at all nodes. A nonzero entry of the full-swap matrix connects only matching groups."
        },
        {
          "label": "Identify the conflict",
          "body": "V is generally not identity. We need a compromise that is close to identity in a low-rank sense and nearly group-matching in an entry-support sense.",
          "math": "\\text{few exceptional directions}\\quad+\\quad\\text{few mismatched nodes}",
          "narration": "V is generally not identity. We need a compromise that is close to identity in a low-rank sense and nearly group-matching in an entry-support sense. These are two different notions. The technical spectral lemma supplies both at once. Next we will state that lemma explicitly, then derive the useful deformation from its two guarantees."
        }
      ],
      "details": []
    },
    {
      "id": "spectral-lemma",
      "chapter": "Construction",
      "title": "The spectral input: two guarantees.",
      "lead": "We state the technical lemma; we do not hide it inside an animation.",
      "why": "the swap matrix alone cannot both preserve the original input and supply local nodes.",
      "kind": "spectrum",
      "next": "Next we will turn the exceptional directions into the very summary values our group algorithm knows how to enumerate.",
      "steps": [
        {
          "label": "Fix the parameters",
          "body": "For integers r≥2, R≥32 and Q≥6R, put D=r^(2Q). A rational operator K can be constructed on the D-dimensional slot space.",
          "math": "r\\geq2,\\quad R\\geq32,\\quad Q\\geq6R,\\quad D=r^{2Q}",
          "narration": "We are here because the swap matrix alone cannot both preserve the original input and supply local nodes. For integers r≥2, R≥32 and Q≥6R, put D=r^(2Q). A rational operator K can be constructed on the D-dimensional slot space. The central-level spectral argument is in the companion. Here we will use its exact quantitative guarantees."
        },
        {
          "label": "Few exceptional directions",
          "body": "The correction I−K is determined by c integer measurements with coefficient norm at most D, where c satisfies the tail bound. No exceptional contribution is discarded.",
          "math": "c\\leq2D\\exp\\!\\left(-R^2/(8Q)\\right)",
          "narration": "The correction I−K is determined by c integer measurements with coefficient norm at most D, where c satisfies the tail bound. No exceptional contribution is discarded. The displayed spectrum is schematic. Spectral concentration counts basis directions, not satisfying assignments."
        },
        {
          "label": "Few mismatched nodes",
          "body": "A nonzero entry K[u,w] mismatches the receiving label at fewer than R nodes. This support statement is what will make low-degree root filters possible.",
          "math": "E_{u,w}:=\\{t:a_w(t)\\ne d_u(t)\\},\\quad K[u,w]\\ne0\\Rightarrow |E_{u,w}|<R",
          "narration": "A nonzero entry K[u,w] mismatches the receiving label at fewer than R nodes. This support statement is what will make low-degree root filters possible. The lemma comes from a low-degree polynomial in commuting swaps, fitted on central spectral levels. Its proof and precise construction remain available in the details. Next we will turn the exceptional directions into the very summary values our group algorithm knows how to enumerate."
        }
      ],
      "details": [
        [
          "Where the two guarantees come from",
          "On the common tensor eigenbasis of the swaps, write $j$ for the number of negative one-pair factors. Then $W=\\frac12\\sum_t(I-\\Pi_t)$ has eigenvalue $j$, and $V$ has eigenvalue $(-1)^j$. A degree-$R-1$ polynomial $f$ matching parity on $R$ central levels makes $K=Vf(W)$ act as identity there. The remaining dimension has the stated binomial-tail bound. Expanding the low-degree polynomial leaves fewer than $R$ omitted swaps relative to $V$, giving the mismatch bound. See Lemma 8 and the supplementary derivation in the companion."
        ]
      ]
    },
    {
      "id": "exact-correction",
      "chapter": "Construction",
      "title": "Low rank becomes exact information.",
      "lead": "Knowing a short scalar list determines the whole correction vector.",
      "why": "an abstract rank bound is useful only if it becomes enumerable data for the counting algorithm.",
      "kind": "measurements",
      "next": "Next we will handle the other part of K: remove its mismatched entries with low-degree root filters.",
      "steps": [
        {
          "label": "Factor the correction",
          "body": "Express (I−K)ζ as fixed rational vectors aℓ multiplied by scalar inner products with exceptional integer vectors bℓ.",
          "math": "(I-K)\\zeta=\\sum_{\\ell=1}^{c}a_\\ell\\langle b_\\ell,\\zeta\\rangle",
          "narration": "We are here because an abstract rank bound is useful only if it becomes enumerable data for the counting algorithm. Express (I−K)ζ as fixed rational vectors aℓ multiplied by scalar inner products with exceptional integer vectors bℓ. Once the c scalar values are known, every correction entry is known exactly."
        },
        {
          "label": "Return to actual bits",
          "body": "After substituting stored original symbols, repeated slots contribute to coefficients of the same actual bit. Split each inner product into its restrictions to the actual variable groups.",
          "math": "\\langle b_\\ell,\\zeta(x)\\rangle=\\sum_{g=1}^{r}m_{\\ell,g}(x_{S_g})",
          "narration": "After substituting stored original symbols, repeated slots contribute to coefficients of the same actual bit. Split each inner product into its restrictions to the actual variable groups. Each restricted measurement is an integer linear form in one group’s bits. Fixing its value is a group-local constraint."
        },
        {
          "label": "Use the original evaluation contract",
          "body": "Fix every group contribution separately. Reconstruct the full scalar measurements, hence the correction. The local factor calculations can now treat it as known rational data.",
          "math": "\\text{group-supported values}\\quad\\Longrightarrow\\quad\\text{known correction}",
          "narration": "Fix every group contribution separately. Reconstruct the full scalar measurements, hence the correction. The local factor calculations can now treat it as known rational data. This is exact conditioning. Small rank by itself would not bound enumeration costs; the bounded integer norms do. Next we will handle the other part of K: remove its mismatched entries with low-degree root filters."
        }
      ],
      "details": []
    },
    {
      "id": "root-filter",
      "chapter": "Construction",
      "title": "A root at the wrong node.",
      "lead": "Each mismatch costs one linear factor, so few mismatches mean low degree.",
      "why": "the exact correction is available, but the K contribution still has some nonlocal entries.",
      "kind": "roots",
      "next": "Next we need to place all actual input occurrences in this construction without making groups or summary lists too large.",
      "steps": [
        {
          "label": "Kill one mismatch",
          "body": "If an entry mismatches only at node 2, multiply its contribution by 1−T/2. It stays unchanged at zero and vanishes at the node where it would be nonlocal.",
          "math": "E_{u,w}=\\{2\\}:\\qquad\\phi_{u,w}(T)=1-T/2",
          "narration": "We are here because the exact correction is available, but the K contribution still has some nonlocal entries. If an entry mismatches only at node 2, multiply its contribution by 1−T/2. It stays unchanged at zero and vanishes at the node where it would be nonlocal. Move the dial. At the other nodes, the entry already draws from the correct group."
        },
        {
          "label": "Filter every nonzero entry",
          "body": "Put one root at each mismatch. The spectral support guarantee bounds the number of roots by R−1, so the filter has degree below R.",
          "math": "\\phi_{u,w}(T)=\\prod_{t\\in E_{u,w}}(1-T/t),\\qquad\\deg\\phi_{u,w}<R",
          "narration": "Put one root at each mismatch. The spectral support guarantee bounds the number of roots by R−1, so the filter has degree below R. This is how a support bound becomes a degree bound. We have not changed the exact summary correction."
        },
        {
          "label": "Add the correction back",
          "body": "Define the replacement rule as the unchanged correction plus filtered K. At zero it equals identity; at a selected node, the remaining K terms are local.",
          "math": "P_u(T;\\zeta)=((I-K)\\zeta)_u+\\sum_{w:K[u,w]\\ne0}K[u,w]\\phi_{u,w}(T)\\zeta_w",
          "narration": "Define the replacement rule as the unchanged correction plus filtered K. At zero it equals identity; at a selected node, the remaining K terms are local. Thus the original input is preserved at zero, and every selected point has the local-plus-summary form. Next we need to place all actual input occurrences in this construction without making groups or summary lists too large."
        }
      ],
      "details": []
    },
    {
      "id": "placement",
      "chapter": "Construction",
      "title": "Place occurrences, not new Boolean variables.",
      "lead": "A deterministic placement lemma closes the construction contract.",
      "why": "the operator must accommodate a real bounded-occurrence formula, including repeated input labels.",
      "kind": "placement",
      "next": "Next we must ask how much data those node values provide: degree grows with the input, so values alone will not suffice.",
      "steps": [
        {
          "label": "Keep the formula consistent",
          "body": "One schedule belongs to each actual variable and one to each factor. All occurrences of a variable share its bit; all inputs of a factor share its receiving group.",
          "math": "a_v,d_e\\in[r]^Q",
          "narration": "We are here because the operator must accommodate a real bounded-occurrence formula, including repeated input labels. One schedule belongs to each actual variable and one to each factor. All occurrences of a variable share its bit; all inputs of a factor share its receiving group. The placement lemma constructs balanced schedules in polynomial time for fixed parameters and sufficiently large normalized inputs."
        },
        {
          "label": "Resolve slot collisions",
          "body": "Use h copies of the array when several occurrences have the same label. Copies store the original symbols, or zero in unused slots. They add storage, not Boolean choices.",
          "math": "\\zeta_w(x)\\in\\{0,x_1,\\ldots,x_N\\}",
          "narration": "Use h copies of the array when several occurrences have the same label. Copies store the original symbols, or zero in unused slots. They add storage, not Boolean choices. The full quantitative size and tail hypotheses are stated in the companion."
        },
        {
          "label": "Close the summary budget",
          "body": "There are h copies, c exceptional directions per copy, and at most r group restrictions per direction. The placement and tail bounds give the required measurement budget.",
          "math": "hcr\\leq2\\tau N,\\qquad |S_{t,g}|\\leq2N/r",
          "narration": "There are h copies, c exceptional directions per copy, and at most r group restrictions per direction. The placement and tail bounds give the required measurement budget. The construction debt is now paid, subject to the stated technical lemmas. Values at structured nodes are accessible. Next we must ask how much data those node values provide: degree grows with the input, so values alone will not suffice."
        }
      ],
      "details": [
        [
          "Full placement hypotheses",
          "For normalized width-three, occurrence-three factors, let $M$ be the incidence count, $N\\le M\\le3N$. With $D=r^{2Q}$, require $12D^2\\le M$, $2Qr^2\\le N$, and $2e^{-R^2/(8Q)}\\le\\tau/(3r)$. Deterministic balanced placement gives at most $h\\le2M/D$ copies. As $c\\le D\\tau/(3r)$, the split count is $rhc\\le hD\\tau/3\\le2\\tau N$. See the companion for the conditional-expectation argument."
        ]
      ]
    },
    {
      "id": "enough-data",
      "chapter": "Recovery",
      "title": "Why node values are not enough.",
      "lead": "Derivatives let a small collection of nodes determine a larger-degree polynomial.",
      "why": "the construction controls each input degree, but H still has degree proportional to N.",
      "kind": "hermite",
      "next": "Next we will expand only the change away from a structured node, because differentiating the whole input directly can reintroduce nonlocal variables.",
      "steps": [
        {
          "label": "Count the required information",
          "body": "The normalized system has at most 3N incidence slots. Input degree below R therefore gives deg H≤3NR. Q values alone do not determine it.",
          "math": "\\deg H\\leq3NR",
          "narration": "We are here because the construction controls each input degree, but H still has degree proportional to N. The normalized system has at most 3N incidence slots. Input degree below R therefore gives deg H≤3NR. Q values alone do not determine it. We need more data per node without losing the efficient group structure."
        },
        {
          "label": "Keep Taylor records",
          "body": "At each node t, retain J coefficients of H(t+z), with q=floor(3NR/Q) and J=q+1. The coefficient of z^j is the jth derivative divided by j factorial.",
          "math": "q=\\lfloor3NR/Q\\rfloor,\\quad J=q+1,\\quad QJ>\\deg H",
          "narration": "At each node t, retain J coefficients of H(t+z), with q=floor(3NR/Q) and J=q+1. The coefficient of z^j is the jth derivative divided by j factorial. The variable z is displacement from one fixed node. The records are exact rational coefficients."
        },
        {
          "label": "Prove uniqueness",
          "body": "If two candidates have the same records, their difference is divisible by (T−t)^J at every node. The product has degree QJ, forcing the difference to vanish.",
          "math": "\\prod_{t=1}^{Q}(T-t)^J\\mid(H_1-H_2)\\quad\\Longrightarrow\\quad H_1=H_2",
          "narration": "If two candidates have the same records, their difference is divisible by (T−t)^J at every node. The product has degree QJ, forcing the difference to vanish. This proves that sufficient data recover H. It does not yet show that computing these derivatives is affordable. Next we will expand only the change away from a structured node, because differentiating the whole input directly can reintroduce nonlocal variables."
        }
      ],
      "details": []
    },
    {
      "id": "taylor-change",
      "chapter": "Recovery",
      "title": "Expand the change, not the structured base.",
      "lead": "An independent formal vector tracks which corrections a Taylor coefficient uses.",
      "why": "derivatives can destroy locality, even though the value at a selected node is structured.",
      "kind": "taylor",
      "next": "Next we will freeze formal correction inputs and use inclusion–exclusion, turning those coefficients back into structured group sums.",
      "steps": [
        {
          "label": "Freeze the base",
          "body": "Return to the same toy at node 1. For each actual Boolean assignment x, its structured factor values are A and B. Introduce a separate formal vector X only in the changes.",
          "math": "G_x(X,z)=[A+z(1-x_1)X_4][B-z(1-x_2)X_3]",
          "narration": "We are here because derivatives can destroy locality, even though the value at a selected node is structured. Return to the same toy at node 1. For each actual Boolean assignment x, its structured factor values are A and B. Introduce a separate formal vector X only in the changes. Here y equals x three plus x four, A equals x one plus one minus x one times y, and B equals one minus one minus x two times y."
        },
        {
          "label": "Keep the target sum visible",
          "body": "Substituting actual x into the formal correction inputs restores the shifted calculation. Summing over the actual assignments gives exactly the Taylor record we want.",
          "math": "H(1+z)=\\sum_{x\\in\\{0,1\\}^4}G_x(x,z)",
          "narration": "Substituting actual x into the formal correction inputs restores the shifted calculation. Summing over the actual assignments gives exactly the Taylor record we want. We are reorganizing the same sum. Actual bits x remain in the structured base; the independent X tracks corrections."
        },
        {
          "label": "Read off small supports",
          "body": "Every formal input arrives with a factor z. Order j can use at most j formal indices, after Boolean multilinearization. At order two in this toy, the only two-index term uses X3X4.",
          "math": "[z^2]G_x(X,z)=-(1-x_1)(1-x_2)X_3X_4",
          "narration": "Every formal input arrives with a factor z. Order j can use at most j formal indices, after Boolean multilinearization. At order two in this toy, the only two-index term uses X3X4. This limits the supports we must handle. We still need to explain how a small-support coefficient can be summed efficiently. Next we will freeze formal correction inputs and use inclusion–exclusion, turning those coefficients back into structured group sums."
        }
      ],
      "details": [
        [
          "General definition",
          "For a fixed node $t$ and Boolean base assignment $x$, put $\\Delta_{e,v}(z;X)=L_{e,v}(t+z;X)-L_{e,v}(t;X)$. Define $G_x(X,z)=\\prod_e\\Phi_e((L_{e,v}(t;x)+\\Delta_{e,v}(z;X))_{v\\in I_e})$. Each $\\Delta$ is linear in $X$ and divisible by $z$. Hence $\\deg_X[z^j]G_x\\le j$, and $H(t+z)=\\sum_xG_x(x,z)$."
        ]
      ]
    },
    {
      "id": "small-supports",
      "chapter": "Recovery",
      "title": "Why extracting a support helps.",
      "lead": "Fixed formal inputs restore the earlier group-evaluation contract.",
      "why": "a support bound is useful only if its coefficients reduce to calculations we can actually perform.",
      "kind": "support",
      "next": "Next we will collect every enumeration cost, because the algorithm is useful only if all of them have small exponential rates.",
      "steps": [
        {
          "label": "Extract one coefficient",
          "body": "For formal support E={3,4}, alternating four Boolean evaluations extracts the X3X4 coefficient. Lower-support terms cancel.",
          "math": "a_{\\{3,4\\}}=G_x(11,z)-G_x(10,z)-G_x(01,z)+G_x(00,z)",
          "narration": "We are here because a support bound is useful only if its coefficients reduce to calculations we can actually perform. For formal support E={3,4}, alternating four Boolean evaluations extracts the X3X4 coefficient. Lower-support terms cancel. Only formal coordinates three and four vary in these evaluations; all other formal coordinates are zero."
        },
        {
          "label": "Freeze corrections; constrain actual bits",
          "body": "For each formal evaluation the corrections are known constants. After substituting actual x, the monomial X3X4 selects actual assignments with x3=x4=1, a within-group constraint.",
          "math": "a_{\\{3,4\\}}(x,z)=-z^2(1-x_1)(1-x_2)",
          "narration": "For each formal evaluation the corrections are known constants. After substituting actual x, the monomial X3X4 selects actual assignments with x3=x4=1, a within-group constraint. The base retains its group structure. This is exactly why we needed the evaluation lemma to allow fixed corrections and fixed actual bits."
        },
        {
          "label": "Generalize the cost",
          "body": "Up to order q, enumerate supports E of size at most q and subsets U⊆E for inclusion–exclusion. E fixes actual bits; U freezes formal corrections.",
          "math": "\\#(E,U)\\leq\\sum_{j=0}^{\\min(q,N)}\\binom{N}{j}2^j",
          "narration": "Up to order q, enumerate supports E of size at most q and subsets U⊆E for inclusion–exclusion. E fixes actual bits; U freezes formal corrections. Each pair reduces to group evaluation. This supplies the Taylor records without storing the large multivariate expansion. The general identity is in the companion. Next we will collect every enumeration cost, because the algorithm is useful only if all of them have small exponential rates."
        }
      ],
      "details": [
        [
          "Generic recovery identity",
          "With $J=q+1$, Boolean indicator vectors $\\mathbf1_U$, and all computations modulo $z^J$, the record is $$H(t+z)\\equiv\\sum_{|E|\\le q}\\sum_{U\\subseteq E}(-1)^{|E|-|U|}\\sum_{x:x_i=1\\ (i\\in E)}G_x(\\mathbf1_U,z).$$ Here $E\\subseteq[N]$. The correction vector $\\Delta(z;\\mathbf1_U)$ is independent of the actual assignment being summed, so each inner sum satisfies the node contract."
        ]
      ]
    },
    {
      "id": "costs",
      "chapter": "Runtime",
      "title": "Three costs. All three must shrink.",
      "lead": "A fast interpolation step is not enough if preparing its data costs too much.",
      "why": "the algorithm nests support extraction, summary conditioning, and group enumeration.",
      "kind": "ledger",
      "next": "Next we must return to arbitrary three-SAT, because the original ETH statement does not promise bounded occurrences.",
      "steps": [
        {
          "label": "Read the ledger",
          "body": "For fixed parameters, multiply the numbers of support/subset pairs, bounded integer summary tuples, and assignments inside one group. All remaining arithmetic has polynomial overhead.",
          "math": "\\operatorname{poly}(N)\\cdot\\left(\\sum_{j\\le q}\\binom Nj2^j\\right)(2D+1)^{2\\tau N}2^{2N/r}",
          "narration": "We are here because the algorithm nests support extraction, summary conditioning, and group enumeration. For fixed parameters, multiply the numbers of support/subset pairs, bounded integer summary tuples, and assignments inside one group. All remaining arithmetic has polynomial overhead. The three exponential rates add. None may be silently treated as free."
        },
        {
          "label": "Choose one fixed scale",
          "body": "For each fixed integer s≥64, use r=s, Q=s^4, R=s^3 and τ=s^−6, with D=r^(2Q). Then q/N≤3/s and the three rates tend to zero.",
          "math": "a_s=H_2(3/s)+3/s+2/r+2\\tau\\log_2(2D+1)\\longrightarrow0",
          "narration": "For each fixed integer s≥64, use r=s, Q=s^4, R=s^3 and τ=s^−6, with D=r^(2Q). Then q/N≤3/s and the three rates tend to zero. H two is binary entropy. The companion checks the construction inequalities and shows a sub s is order log s over s. The parameter s is chosen before the input."
        },
        {
          "label": "Count bit operations",
          "body": "The exact-arithmetic lemma gives polynomial bit overhead for fixed s. Below an s-dependent size threshold, brute force is absorbed in a constant. Thus bounded-occurrence exact counting has arbitrarily small exponential rate.",
          "math": "T_s\\leq\\operatorname{poly}_s(N+m+1)2^{a_sN},\\quad a_s\\to0",
          "narration": "The exact-arithmetic lemma gives polynomial bit overhead for fixed s. Below an s-dependent size threshold, brute force is absorbed in a constant. Thus bounded-occurrence exact counting has arbitrarily small exponential rate. Here m is the input clause count. This is an asymptotic algorithm family, not a practical speed guarantee. Next we must return to arbitrary three-SAT, because the original ETH statement does not promise bounded occurrences."
        }
      ],
      "details": [
        [
          "Entropy and arithmetic details",
          "$H_2(p)=-p\\log_2p-(1-p)\\log_2(1-p)$. For $q=\\lfloor3N/s\\rfloor$, the support bound is at most $(N+1)2^{N(H_2(3/s)+3/s)}$. The summary rate is $O(\\log s/s^2)$ and the group rate is $2/s$. For fixed $s$, grouped sums and Taylor data have $O_s(N)$-bit numerators and denominators; fraction-free Hermite elimination has polynomial bit complexity. These are stated implementation estimates, with full companion references."
        ]
      ]
    },
    {
      "id": "general-sat",
      "chapter": "Runtime",
      "title": "Return to the original problem.",
      "lead": "Preprocessing costs a little exponent and a fixed variable blowup.",
      "why": "we have a counter for bounded-occurrence inputs, not yet an algorithm for all three-CNF formulas.",
      "kind": "reductions",
      "next": "Next we will spend the exponent budget and make the quantifiers explicit.",
      "steps": [
        {
          "label": "Sparsify",
          "body": "For every fixed η>0, decision sparsification gives at most 2^(ηn) branches on the same n variables, each with at most Cηn clauses. The total construction time has the same exponential rate.",
          "math": "L\\leq2^{\\eta n},\\quad m_i\\leq C_\\eta n",
          "narration": "We are here because we have a counter for bounded-occurrence inputs, not yet an algorithm for all three-CNF formulas. For every fixed η>0, decision sparsification gives at most 2^(ηn) branches on the same n variables, each with at most Cηn clauses. The total construction time has the same exponential rate. The density constant C eta depends only on eta. The branch solution sets may overlap."
        },
        {
          "label": "Copy occurrences",
          "body": "Replace repeated occurrences by copies and force them to agree using an implication cycle. The reduced variable count is at most n+3mi, and every variable occurs at most three times.",
          "math": "N_i\\leq n+3m_i\\leq B_\\eta n,\\qquad B_\\eta=1+3C_\\eta",
          "narration": "Replace repeated occurrences by copies and force them to agree using an implication cycle. The reduced variable count is at most n+3mi, and every variable occurs at most three times. The width remains at most three. This is a fixed linear blowup once eta has been selected."
        },
        {
          "label": "Use decision correctly",
          "body": "Run the bounded-occurrence counter on each reduced branch and accept if one count is positive. We take an OR, not the sum of overlapping branch counts.",
          "math": "F\\text{ satisfiable}\\quad\\Longleftrightarrow\\quad\\exists i:\\#F_i>0",
          "narration": "Run the bounded-occurrence counter on each reduced branch and accept if one count is positive. We take an OR, not the sum of overlapping branch counts. The remaining task is choosing the parameters in the right order so the combined rate meets any prescribed epsilon. Next we will spend the exponent budget and make the quantifiers explicit."
        }
      ],
      "details": [
        [
          "Reduction lemma status",
          "The decision sparsification lemma and the occurrence-copying bound are stated standard reductions. A variable with $d\\ge2$ occurrences is replaced by $d$ copies with clauses $(\\neg x_j\\vee x_{j+1})$, cyclically indexed. These force all copies equal, with a unique satisfying extension. Unused declared variables are retained. See the companion for terminal cases and all construction-time bounds."
        ]
      ]
    },
    {
      "id": "quantifiers",
      "chapter": "Runtime",
      "title": "Choose the algorithm before the input.",
      "lead": "The order of choices is the last part of the proof.",
      "why": "small rates for bounded-occurrence inputs must survive both preprocessing steps.",
      "kind": "quantifiers",
      "next": "Finally we will read the argument backwards, checking why each component was needed.",
      "steps": [
        {
          "label": "Reserve the branching rate",
          "body": "Fix ε>0 and choose η=ε/2. Sparsification gives Cη and therefore Bη. Only then choose the fixed scale s so that asBη≤ε/2.",
          "math": "\\varepsilon\\to\\eta=\\varepsilon/2\\to B_\\eta\\to s:\\quad a_sB_\\eta\\leq\\varepsilon/2",
          "narration": "We are here because small rates for bounded-occurrence inputs must survive both preprocessing steps. Fix ε>0 and choose η=ε/2. Sparsification gives Cη and therefore Bη. Only then choose the fixed scale s so that asBη≤ε/2. Every algorithm parameter is fixed before the input arrives. Its constants may depend enormously on epsilon."
        },
        {
          "label": "Multiply the costs",
          "body": "There are at most 2^(ηn) branches. Each copied instance has at most Bηn variables. Their combined running time has exponential rate at most ε.",
          "math": "2^{\\eta n}2^{a_sB_\\eta n}\\leq2^{\\varepsilon n}",
          "narration": "There are at most 2^(ηn) branches. Each copied instance has at most Bηn variables. Their combined running time has exponential rate at most ε. Polynomial factors may depend on epsilon but not on the input instance."
        },
        {
          "label": "Contradict positive-rate ETH",
          "body": "For every ε>0, one deterministic algorithm handles all n-variable, m-clause three-CNFs in the displayed bit-time bound. Any positive forbidden ETH rate is contradicted by choosing a smaller ε.",
          "math": "\\forall\\varepsilon>0\\ \\exists A_\\varepsilon\\ \\exists C_\\varepsilon,c_\\varepsilon>0:\\quad T\\leq C_\\varepsilon(n+m+1)^{c_\\varepsilon}2^{\\varepsilon n}",
          "narration": "For every ε>0, one deterministic algorithm handles all n-variable, m-clause three-CNFs in the displayed bit-time bound. Any positive forbidden ETH rate is contradicted by choosing a smaller ε. This conclusion does not say that SAT is polynomial-time or that these constants make the algorithm practical. Finally we will read the argument backwards, checking why each component was needed."
        }
      ],
      "details": []
    },
    {
      "id": "put-together",
      "chapter": "Finish",
      "title": "Read the proof backwards.",
      "lead": "Each device pays for a specific obstacle—not for an unrelated technical trick.",
      "why": "the final bound should remain connected to the strategy we started with.",
      "kind": "finish",
      "next": "You can now revisit any link in the argument, or open the quantified companion for the hypotheses and supplementary spectral derivation.",
      "steps": [
        {
          "label": "Recover the hard answer",
          "body": "Interpolation returns H(0), the original count, once sufficient exact node data are known. Small formal supports make the Taylor records affordable.",
          "math": "\\text{small supports}\\to\\text{Taylor records}\\to H(0)",
          "narration": "We are here because the final bound should remain connected to the strategy we started with. Interpolation returns H(0), the original count, once sufficient exact node data are known. Small formal supports make the Taylor records affordable. The actual assignment and the independent formal correction vector have distinct roles throughout recovery."
        },
        {
          "label": "Explain the structured data",
          "body": "At selected nodes, root filters remove mismatched contributions. The exceptional correction is still present, represented by exact bounded integer summaries. Conditioning separates the remaining group sums.",
          "math": "\\text{root filters}+\\text{exact correction}\\to\\text{group evaluation}",
          "narration": "At selected nodes, root filters remove mismatched contributions. The exceptional correction is still present, represented by exact bounded integer summaries. Conditioning separates the remaining group sums. The spectral and placement lemmas supply the quantitative guarantees. Their status is explicit, with construction details and source attribution below."
        },
        {
          "label": "Keep the whole map",
          "body": "We did not find a partition that solves the original formula directly. We built low-degree structured calculations, obtained their data without losing locality, and transferred the answer back.",
          "math": "\\text{count}\\to\\text{polynomial}\\to\\text{structured data}\\to\\text{count}",
          "narration": "We did not find a partition that solves the original formula directly. We built low-degree structured calculations, obtained their data without losing locality, and transferred the answer back. The three costs are supports, summaries, and assignments inside one group. Their rates shrink together. You can now revisit any link in the argument, or open the quantified companion for the hypotheses and supplementary spectral derivation."
        }
      ],
      "details": []
    }
  ]
};
