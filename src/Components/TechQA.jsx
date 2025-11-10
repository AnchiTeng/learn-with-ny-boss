import React, { useMemo, useRef, useState, useEffect } from "react";
import "./InterviewQAFinder.css";

/**
 * Interview Q&A Finder (Multi-keyword + AND/OR)
 * - Fast multi-keyword filter over Questions + Answers
 * - Left: searchable results with live multi-term highlight
 * - Right: reading pane with anchors; click a result to jump
 * - Panic Mode (big text) for quick glance during interview
 */

// ---------- Data ----------------------------------------------
const QA_ITEMS = [
  // ===== Batch 1 — Group 1: Dynamic Creative Execution (6) =====
  {
    id: "G1-Q1",
    group: "G1 · Dynamic Creative Execution",
    question: "How do you verify dynamic creative renders correctly across placements?",
    answer:
      "I don’t start by eyeballing the ad — I start by confirming the input contract between feed → template → environment is correctly defined. That’s because I’ve seen first-hand how even a visually ‘fine’ preview doesn’t mean the system is functionally correct — like when Sales booked demos before intake forms contained actual context; the problem was upstream variance, not UI. In practice, I pick controlled known values, assert parameter resolution, and confirm default fallback behavior before I even change environments. Then I preview in multiple placements with attention to CSP, sandboxing, pixel firing order, and whether macros get rewritten by the DSP. If something looks off, I debug the contract break not the pixel. Getting the inputs clean is how you get first-time-right creative renders.",
  },
  {
    id: "G1-Q2",
    group: "G1 · Dynamic Creative Execution",
    question: "How do you verify a feed-driven creative is using the correct row values?",
    answer:
      "I approach that like a deterministic assertion problem — not ‘does this look right.’ I pull a few known feed rows and hard-assert which token values should appear in the output markup. That’s the same philosophy I applied in the intake redesign — if we let people operate without specifying demo type or technical depth, downstream teams would be guessing. For DCO I don’t let rendering become guesswork either — I intentionally create synthetic rows and assert resolution step by step. Once I know substitution is correct, then I move to environment variation (mobile / desktop / in-app WebView). That’s how you avoid false positives and keep it cert-ready.",
  },
  {
    id: "G1-Q3",
    group: "G1 · Dynamic Creative Execution",
    question:
      "If a creative previews fine but fails in publisher live environment — what do you check first?",
    answer:
      "My first check is environment deltas — not the template. Publishers often have CSP differences, sandboxing, or macro rewriting behavior that doesn’t exist in preview. I learned this pattern the hard way: when people assumed ‘preview looked good’ but the real root cause was that the upstream definition was ambiguous — same as the demo intake issue. So I validate: are we being blocked by cross-domain rules, is a click macro rewriting and dropping params, is TLS blocking mixed content? Only after I confirm that the environment can actually execute what we send, then I look at creative code. 90% of the time, ‘preview good / live broken’ = environment policy mismatch.",
  },
  {
    id: "G1-Q4",
    group: "G1 · Dynamic Creative Execution",
    question: "What do you look at when a creative isn’t tracking click-through correctly?",
    answer:
      "I immediately look at the redirect chain and which hop is dropping the value. DSP click macros sometimes rewrite and strip parameters if they don’t match expected spec. That’s why I test macro expansion as a contract — not as a feeling — similar to how I enforced required fields instead of hoping Sales would send correct info. If UTMs or clickIDs disappear between hops, that is a contract break event. Then I verify encoding, URL encoding vs double encoding, and whether a nested redirect is causing premature resolution. The output is not just ‘did it click?’ — it’s ‘did contract survive every hop?’",
  },
  {
    id: "G1-Q5",
    group: "G1 · Dynamic Creative Execution",
    question: "What matters more — pixel syntax or pixel timing?",
    answer:
      "Timing — easily. A pixel can be syntactically valid but if it fires too late (post-navigation / blocked by browser priority) it won’t count. This is similar to the onboarding situation — the data was ‘valid’ but it arrived too late so the meeting wasn’t meaningful — timing > data. In QA terms, timing is part of the contract. I check placement in execution waterfall, async loads, and whether load sequencing is blocked. Correct syntax but wrong timing = failure in real life.",
  },
  {
    id: "G1-Q6",
    group: "G1 · Dynamic Creative Execution",
    question: "Walk me through a bad dynamic render root cause you’ve solved.",
    answer:
      "One that stands out was a multi-agency client where creative variations looked inconsistent across campaigns. It wasn’t actually the template — it was that each agency named targeting attributes differently, so the DCO logic couldn’t resolve them consistently. That’s when I built the unified creative taxonomy so each variation had a stable canonical naming layer before entering rendering logic. Once that taxonomy existed, the ‘creative quality’ issue disappeared, because the problem was not visual — it was contract variance across submitters. Same exact pattern as the intake process redesign: fix the structure upstream → output variance collapses.",
  },

  // ===== Batch 2 — Group 2: Tracking / Discrepancy / Measurement QA (6) =====
  {
    id: "G2-Q1",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question: "When tracking numbers don’t match what the client reports, where do you start?",
    answer:
      "I don’t start by arguing the number — I start by mapping the data path end-to-end. I learned this from a large tracking discrepancy problem where multiple internal teams were debating ‘who is wrong’ — but the real issue was we were not even using the same implementation model. So I reconstruct: where does the event fire, who transforms the payload, what system parses, who aggregates. Then I verify whether the contract assumptions are shared (is this the abbreviated API method or the extended library method with manual config?). Ninety percent of mismatches are not ‘analytics failure,’ they are ‘unspoken contract drift.’",
  },
  {
    id: "G2-Q2",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question: "How do you debug a discrepancy between impression logs and click logs?",
    answer:
      "I isolate whether the discrepancy is temporal or structural. Temporal = sequencing (e.g. event ordering, browser navigation timing) — structural = redirect expansion / macro rewrite / parameter loss. I learned from a real RCA I led that if you jump straight to log diffing you miss the fact that different teams sometimes think they are implementing the same thing — but they’re not. So I assert the implementation contract first, then I validate multi-hop value retention across redirects. If IDs disappear, the click pipeline is innocent — the redirect chain is guilty.",
  },
  {
    id: "G2-Q3",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question: "How do you decide if tracking failure is a creative bug or an integration bug?",
    answer:
      "I check discriminators — a technique I built out of necessity. If the creative code fires correctly in a neutral environment but fails when wrapped with the platform’s macro expansion, that’s integration. That’s the same conceptual move as my Zendesk intake redesign — don’t blame individuals until you verify the structure. So I test with ‘known good’ static rows, stable test URLs, controlled values; if those pass in isolation → creative is not the culprit. Creative bugs fail in purity — integration bugs only fail in context.",
  },
  {
    id: "G2-Q4",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question: "How do you ensure a workaround is sustainable — not just a band-aid?",
    answer:
      "I treat documentation as the deliverable, not the workaround. In my tracking RCA project, we couldn’t patch the underlying library because engineering capacity was locked. So I wrote role-specific implementation guides — not one giant doc — because different personas needed different precision. I measure sustainability by whether the workaround reduces future tickets — not whether it ‘sounds tidy.’ If ticket volume drops long-tail — that’s sustainable.",
  },
  {
    id: "G2-Q5",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question:
      "What’s your philosophy on aligning different internal teams when no one agrees on the root cause?",
    answer:
      "I remove the emotional frame entirely. I learned that the biggest risk in tracking QA is not the platform — it’s siloed assumptions. So I do structured narrative mapping: ‘what does each team believe the system does?’ — side-by-side — then reconcile. Once everyone sees the mismatch in assumptions visually, the debate ends because the real bug becomes obvious. This technique is more powerful than authority — because it surfaces the shared blind spot.",
  },
  {
    id: "G2-Q6",
    group: "G2 · Tracking / Discrepancy / Measurement QA",
    question:
      "How do you differentiate between a true tracking failure and a reporting misunderstanding?",
    answer:
      "I check for schema-alignment first. If the event name + object structure doesn’t match what the dashboard expects — it’s a semantic failure, not a measurement failure. This is basically the same mental model as ‘demos booked without context’: the system didn’t fail — the inputs were ambiguous. So I verify JSON shape, param naming, and whether fields are optional vs required in the reporting schema. If the schema is misaligned, the reporting layer is innocent — the contract is wrong.",
  },

  // ===== Group 3 — RCA / QA rigor (30s answers) =====
  {
    id: "G3-Q1",
    group: "G3 · Root Cause Analysis / QA Rigor",
    question: "Tell me about a time you uncovered a technical root cause that wasn’t obvious.",
    answer:
      "In one role, we saw recurring reporting discrepancies in custom dynamic creatives, and every team believed the issue lived somewhere else. I led the RCA across developers, campaign managers, and reporting. I traced the mismatch to the fact that our creative API expected abbreviated tracking methods, but the standalone tracking library had extended behaviors and configuration that weren’t documented. Engineering didn’t have bandwidth to re-architect, so I wrote role-specific implementation guides and trained each function on a single consistent workflow. Within two months, tracking-related tickets dropped by over 90%. For me, that reinforced that sometimes the fix isn’t code — it’s alignment and clarity.",
  },
  {
    id: "G3-Q2",
    group: "G3 · Root Cause Analysis / QA Rigor",
    question: "How do you handle conflicting assumptions between engineering and client-facing teams?",
    answer:
      "On a dynamic tracking project, each team in the chain believed their implementation was correct — but they were referencing contradictory doc sets. Instead of debating who owned the bug, I traced data flow end-to-end — API, tracking library, creative payload, and reporting pipeline. Once I proved the exact divergence point, I didn’t stop at diagnosis — I wrote role-specific playbooks so each group knew exactly what to do. That cut escalations by 90% and got everyone speaking the same implementation language. The key for me was shifting the conversation from blame → convergence.",
  },
  {
    id: "G3-Q3",
    group: "G3 · Root Cause Analysis / QA Rigor",
    question: "Describe a time you fixed something without shipping code.",
    answer:
      "We had API + tracking library drift that engineering couldn’t immediately patch. So instead of blocking on dev resources, I authored a unified implementation guide, mapped the exact working pattern, and ran enablement sessions so each team could execute the same way. That documentation became the de-facto standard and brought ticket volume down dramatically. The lesson for me was that sometimes documentation is the product — especially when you’re protecting data integrity and client trust under real delivery pressure.",
  },

  // ===== Group 4 — HTML5 Transition / Standards =====
  {
    id: "G4-Q1a",
    group: "G4 · HTML5 Transition / Standards",
    question: "Tell me about a time you led through a major industry transition.",
    answer:
      "When Flash was deprecated and we moved to HTML5, I partnered with our core API engineer to deeply understand the new creative runtime. Then I converted that into enablement: production, support, campaign teams — and external partners. I also represented the company in the IAB HTML5 Platforms Showcase and contributed to the HTML5 best practices working group. The outcome — 95%+ of active clients migrated without disruption, ticket volume actually dropped, and our creatives consistently passed validator checks. That’s when I really learned that change leadership is half technical, half human.",
  },
  {
    id: "G4-Q2a",
    group: "G4 · HTML5 Transition / Standards",
    question: "How do you ensure standards compliance during creative innovation?",
    answer:
      "In the Flash → HTML5 transition, the principle was: standards first, features second. I mapped how our runtime aligned with IAB LEAN guidance — lightweight, encrypted, non-intrusive. Then I trained both internal teams and external developers on how to get compliant builds using the tools they already loved — e.g., GWD, Hype, Animate. Because I personally presented our best practices at the IAB platform showcase, I had direct visibility into how publishers evaluated creatives. That ensured our work was both innovative and safely deployable.",
  },
  {
    id: "G4-Q3a",
    group: "G4 · HTML5 Transition / Standards",
    question: "How do you communicate technical change to non-technical stakeholders?",
    answer:
      "During the HTML5 migration, most of the fear wasn’t technical — it was emotional. I didn’t dump APIs on people. I showed them concrete examples: ‘same workflow, now compatible on mobile.’ I offered two paths — deep integration details for technical builders, and simple guardrails for marketers who just needed assets to run. This dual-enablement model helped 95%+ of active clients transition with zero outage. For me — that’s where I learned that adoption is a communication problem, not an engineering one.",
  },
  {
    id: "G4-Q1b",
    group: "G4 · Automation / Repeatability / Coverage",
    question: "How do you decide what to automate first?",
    answer:
      "When the industry migrated away from Flash, there were hundreds of edge-cases that could have been tested — but the first thing I automated was the high-frequency creatives and the core tracking cases that drove the majority of rejection risk. In other words — automation should target the patterns that repeat the most, not the weird one-offs. Once we validated those core behaviors in HTML5 environments (asset loading, event firing, responsive layout), our support tickets dropped immediately because the riskiest category became predictable. After that, automation expanded outward to long-tail behaviors. For me — automation is not about volume — it’s about locking down the things that create the most variance in outcomes.",
  },
  {
    id: "G4-Q2b",
    group: "G4 · Automation / Repeatability / Coverage",
    question: "How do you talk about automation to non-technical stakeholders?",
    answer:
      "During the Flash→HTML5 transition, I learned that non-technical people don’t care that automation is ‘faster’ — they care that it makes outcomes more reliable. So when I explained our testing approach to account teams and producers, I framed it as: ‘this reduces rejection surprises and protects campaigns from last-minute blockers.’ That resonated because the value was business-oriented — fewer escalations, smoother approvals, and fewer last-minute rebuilds. After that reframing, adoption of the new process accelerated because it felt like a safeguard, not more work. So to non-technical stakeholders — automation = confidence, not code.",
  },

  // ===== Group 5 — Behavioral example (handoff) =====
  {
    id: "G5-F",
    group: "G5 · Behavioral / Cross-Functional Delivery",
    question: "Give me an example where your handoff created clarity across teams.",
    answer:
      "When we were productizing the DCO for DOOH solution in APAC, a big risk was ownership ambiguity — engineering knew the caching logic, but the regional teams needed a usable, repeatable workflow. After the core template was validated, I owned the ‘handoff moment.’ I translated the multi-session caching logic into a simple, step-based framework that regional CS teams could follow without needing to understand byte-range requests. I ran a short enablement call that walked through how to stage assets, when static fallback would appear, and what ‘good vs risky placements’ looked like for low-bandwidth screens. That handoff turned an engineering innovation into something regional teams could actually ship — without escalation. It taught me that the value of innovation is not only in the build — it’s in the transfer of capability.",
  },
];

// ---------- Helpers -------------------------------------------
const useScrollMap = (ids) => {
  const mapRef = useRef({});
  useEffect(() => {
    mapRef.current = ids.reduce((acc, id) => {
      acc[id] = React.createRef();
      return acc;
    }, {});
  }, [ids.join("|")]);
  return mapRef.current;
};

const escapeForRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// 將輸入字串分割為多個關鍵字（逗號/空白/全形逗號），去重、小寫
const parseTerms = (q) => {
  return Array.from(
    new Set(
      q
        .split(/[,，\s]+/)
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    )
  );
};

// 多詞高亮
const Highlight = ({ text, terms = [] }) => {
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeForRegExp).join("|")})`, "gi");
  const parts = String(text).split(pattern);
  return (
    <>
      {parts.map((p, i) =>
        pattern.test(p) ? (
          <mark key={i} className="hl">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
};

// ---------- Component -----------------------------------------
export default function InterviewQAFinder() {
  const [q, setQ] = useState("");
  const [panic, setPanic] = useState(false);
  const [groupFilter, setGroupFilter] = useState("All");
  const [matchAll, setMatchAll] = useState(false); // false=OR, true=AND

  const groups = useMemo(() => {
    const set = new Set(QA_ITEMS.map((i) => i.group));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter with multi-terms + AND/OR
  const filtered = useMemo(() => {
    const terms = parseTerms(q);
    return QA_ITEMS.filter((item) => {
      const inGroup = groupFilter === "All" || item.group === groupFilter;
      if (!inGroup) return false;
      if (terms.length === 0) return true;
      const haystack = (item.question + " " + item.answer).toLowerCase();
      return matchAll
        ? terms.every((t) => haystack.includes(t))
        : terms.some((t) => haystack.includes(t));
    });
  }, [q, groupFilter, matchAll]);

  const scrollRefs = useScrollMap(QA_ITEMS.map((i) => i.id));

  const handleJump = (id) => {
    const ref = scrollRefs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // counts by group (current filter)
  const countsByGroup = useMemo(() => {
    const m = new Map();
    filtered.forEach((i) => m.set(i.group, (m.get(i.group) || 0) + 1));
    return m;
  }, [filtered]);

  const activeTerms = parseTerms(q);

  return (
    <div className={`iqaf ${panic ? "iqaf--panic" : ""}`}>
      {/* Sticky header */}
      <div className="iqaf__header">
        <div className="iqaf__title">🎧 Interview Q&A Finder</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="iqaf__panic" onClick={() => setPanic((v) => !v)}>
            {panic ? "Panic Mode: ON" : "Panic Mode"}
          </button>
        </div>
      </div>

      {/* Left column: controls + matches */}
      <aside className="iqaf__left">
        {/* Search */}
        <div className="iqaf__search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by multiple keywords… e.g. logs, testing js"
            className="iqaf__input"
          />

          {/* AND/OR toggle */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              className={`iqaf__chip ${matchAll ? "iqaf__chip--active" : ""}`}
              onClick={() => setMatchAll((v) => !v)}
              title="Toggle ALL/ANY keywords"
            >
              {matchAll ? "Match ALL terms (AND)" : "Match ANY term (OR)"}
            </button>
          </div>

          {/* Active terms badges */}
          {activeTerms.length > 0 && (
            <div className="iqaf__chips" style={{ marginTop: 6 }}>
              {activeTerms.map((t) => (
                <span key={t} className="iqaf__badge">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Group chips */}
          <div className="iqaf__chips" style={{ marginTop: 8 }}>
            {groups.map((g) => (
              <button
                key={g}
                className={`iqaf__chip ${
                  groupFilter === g ? "iqaf__chip--active" : ""
                }`}
                onClick={() => setGroupFilter(g)}
                title={g}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Matches list */}
        <div className="iqaf__list">
          {/* small counts row */}
          <div className="iqaf__chips" style={{ marginBottom: 6 }}>
            {Array.from(countsByGroup.entries()).map(([g, n]) => (
              <span key={g} className="iqaf__badge" title={g}>
                {g} · {n}
              </span>
            ))}
          </div>

          {filtered.map((item) => (
            <div
              key={item.id}
              className="iqaf__item"
              onClick={() => handleJump(item.id)}
            >
              <div className="iqaf__item-title">
                <Highlight text={item.question} terms={activeTerms} />
              </div>
              <div className="iqaf__item-snippet">
                <Highlight text={item.answer} terms={activeTerms} />
              </div>
              <div className="iqaf__meta">
                <span className="iqaf__badge">{item.group}</span>
                <span className="iqaf__badge">#{item.id}</span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="iqaf__empty">No matches. Try different keywords.</div>
          )}
        </div>
      </aside>

      {/* Right column: reader */}
      <main className="iqaf__right">
        {/* Optional group section headers */}
        {["All", ...new Set(QA_ITEMS.map((i) => i.group))]
          .filter((g) => g !== "All")
          .map((g) => (
            <div key={g}>
              <div className="iqaf__group">
                <h2>{g}</h2>
                <div className="rule" />
              </div>

              {QA_ITEMS.filter((i) => i.group === g).map((item) => (
                <article
                  className="iqaf__qa"
                  key={item.id}
                  ref={scrollRefs[item.id]}
                  id={item.id}
                >
                  <div className="qa__q">
                    <Highlight text={item.question} terms={activeTerms} />
                  </div>
                  <div className="qa__a">
                    <Highlight text={item.answer} terms={activeTerms} />
                  </div>
                  <div className="iqaf__meta">
                    <span className="iqaf__badge">#{item.id}</span>
                    <span className="iqaf__badge">{item.group}</span>
                  </div>
                </article>
              ))}
            </div>
          ))}
      </main>
    </div>
  );
}
