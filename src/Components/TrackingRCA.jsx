import React, { useState } from 'react';
import './QuestionPage.css';

const TrackingRCA = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [useShort, setUseShort] = useState(false);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowOriginal(false);
  };

  const toggleOriginal = () => {
    setShowOriginal((v) => !v);
    if (!showOriginal) {
      setTimeout(() => { scrollToSection('original-notes'); }, 100);
    }
  };

  // optional keyword marker (same helper signature as your other page)
  const escapeForRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const Highlight = ({ text, terms = [] }) => {
    if (!terms.length) return text;
    const pattern = new RegExp(`(${terms.map(escapeForRegExp).join('|')})`, 'gi');
    const parts = String(text).split(pattern);
    return parts.map((part, i) =>
      pattern.test(part) ? <mark key={i} className="hl">{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
    );
  };

  // ------------------ CONTENT (SPSIL) ------------------

  // 45–60s story: keep the 4 anchors highlighted, rest plain
  const STORY = [
    { text: "We started seeing large reporting discrepancies on campaigns using custom product-level tracking in dynamic creatives.", highlight: false },
    { text: "Clients questioned the data; we were issuing make-goods; teams were in fire-drill mode across reporting, solutions, production, and campaign ops.", highlight: false },
    { text: "The real issue wasn’t obvious: teams worked in silos with outdated, conflicting docs — events fired inconsistently, product IDs were missing, and no one agreed on where the break was.", highlight: true }, // PROBLEM

    { text: "I led a cross-functional root cause analysis and treated it as governance — not a one-off debug.", highlight: true }, // ACTION (frame)
    { text: "I traced the pipeline end-to-end: reviewed creative code, compared the dynamic API vs the tracking library, audited live tags, and followed data into the reporting backend.", highlight: false },
    { text: "We found the mismatch: the creative API expected abbreviated methods while the tracking library supported richer events that required extra setup — the docs didn’t reflect this.", highlight: false },

    { text: "With product bandwidth limited, I authored role-specific implementation guides, ran enablement sessions, and aligned everyone on a single, reliable workflow.", highlight: false },
    { text: "Within two months, tracking-related tickets dropped by 90%+, billing disputes fell, and clients regained trust in the numbers.", highlight: true }, // IMPACT

    { text: "My takeaway: the biggest risks live between teams — clear, role-targeted documentation is an engineering control, not an afterthought.", highlight: true }, // LEARNING
    { text: "Even before the API could be patched, the process fix created a sustainable, low-friction workaround used for years.", highlight: false },
  ];
  

  // ~30s micro version: just the 4 anchors
  const STORY_SHORT = [
    { text: "Custom product-level tracking showed big discrepancies; teams were siloed and docs conflicted — events and IDs didn’t line up.", highlight: true }, // PROBLEM
    { text: "I led a cross-functional RCA: traced creative → API → tracking lib → reporting; found the API vs library mismatch behind inconsistent firing.", highlight: true }, // ACTION
    { text: "We standardized implementation with role-specific guides and training; tracking tickets dropped 90%+ and billing disputes fell.", highlight: true }, // IMPACT
    { text: "Lesson: fix the governance layer — documentation and enablement are quality controls that protect data integrity and client trust.", highlight: true }, // LEARNING
  ];

  const HOOKS = [
    "This wasn’t a code bug — it was a governance gap.",
    "Data integrity broke in the handoffs, not the SQL.",
    "We treated documentation like an engineering control."
  ];

  const OriginalNotes = () => (
    <article className="notes-body">
      <h3>Optional Opening Hook (pick one)</h3>
      <ul className="bullet">
        {HOOKS.map((h, i) => <li key={i}>{h}</li>)}
      </ul>

      <hr />

      <h3>45–60s Version</h3>
      {STORY.map((item, i) => (
        <p key={i} className={item.highlight ? "highlight-line" : ""}>
          {item.text}
        </p>
      ))}

      <hr />
      <h4>QA / Certification / Integration Fit</h4>
      <ul className="bullet compact">
        <li><Highlight text="Defines a single source of truth for implementation → certification checklists become enforceable." terms={[]} /></li>
        <li><Highlight text="Prevents partner discrepancies by aligning API/library behavior with doc’d steps." terms={[]} /></li>
        <li><Highlight text="Reduces operational variance — a core QA objective." terms={[]} /></li>
      </ul>
    </article>
  );

  const OriginalNotesShort = () => (
    <article className="notes-body short">
      <h3>~30s Micro Version</h3>
      {STORY_SHORT.map((item, i) => (
        <p key={i} className={item.highlight ? "highlight-line" : ""}>
          {item.text}
        </p>
      ))}
    </article>
  );

  return (
    <div className="question-page">
      {/* NAV */}
      <nav className="question-nav">
        <a href="/finn1219" className="back-link">← Back to Interview Dashboard</a>
        <div className="nav-controls">
          <button onClick={scrollToTop} className="nav-button">↑ Top</button>
          <button onClick={toggleOriginal} className={`nav-button ${showOriginal ? 'active' : ''}`}>
            {showOriginal ? '📖 View Structured' : '📝 View Original Notes'}
          </button>
        </div>
      </nav>

      {/* QUICK GUIDE */}
      <div className="quick-guide">
        <h2>🎯 Quick Response Guide</h2>
        <p className="click-hint">Click any section to jump to details</p>

        <div className="guide-cards">
          <div className="guide-card clickable" onClick={() => scrollToSection('situation')}>
            <h3>Situation</h3>
            <p>High discrepancies on dynamic product-level tracking</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Siloed teams + outdated docs → inconsistent events/IDs</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Cross-functional RCA + role-specific guides + training</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>Tickets ↓ 90%+, fewer disputes, restored trust</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Governance fixes protect data integrity</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Lead with integrity risk</strong> (discrepancies → make-goods)</li>
            <li><strong>Name the mismatch</strong> (API vs tracking lib)</li>
            <li><strong>Show governance</strong> (role-specific guides, training)</li>
            <li><strong>Prove delta</strong> (tickets ↓ 90%+)</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Root Cause Analysis of Tracking Discrepancies</h1>
            <div className="notes-header-actions">
              <button onClick={() => setUseShort(false)} className={`switch-mode-btn ${!useShort ? 'active' : ''}`}>Long (45–60s)</button>
              <button onClick={() => setUseShort(true)} className={`switch-mode-btn ${useShort ? 'active' : ''}`}>Short (~30s)</button>
              <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
            </div>
          </div>

          <div className="notes-content">
            {useShort ? <OriginalNotesShort /> : <OriginalNotes />}
          </div>

          <div className="notes-actions">
            <button onClick={toggleOriginal} className="switch-mode-btn">← Back to Structured Version</button>
          </div>
        </div>
      ) : (
        <div className="interview-content">
          <header className="content-header">
            <h1>Root Cause Analysis of Tracking Discrepancies</h1>
            <div className="question-meta">
              <span className="category-tag">Technical Governance</span>
              <span className="difficulty-tag hard">Hard</span>
              <span className="review-date">Last reviewed: 2024-01-20</span>
            </div>
          </header>

          <div className="interview-response">
            <section id="situation" className="response-section">
              <div className="section-header">
                <h2>🧩 Situation</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>Reporting discrepancies escalated on dynamic creatives with custom product-level tracking; client trust and costs were at risk.</p>
              </div>
            </section>

            <section id="problem" className="response-section">
              <div className="section-header">
                <h2>⚠️ Problem</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>Teams operated in silos with contradictory or outdated docs; events fired inconsistently and product IDs were missing — no clear owner of the truth.</p>
              </div>
            </section>

            <section id="solution" className="response-section">
              <div className="section-header">
                <h2>💡 Solution</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <ul>
                  <li>Cross-functional RCA from creative code → dynamic API → tracking library → reporting backend</li>
                  <li>Identified <strong>API vs tracking library</strong> behavior mismatch behind inconsistent event firing</li>
                  <li>Published <strong>role-specific implementation guides</strong> and delivered training enablement</li>
                </ul>
              </div>
            </section>

            <section id="impact" className="response-section">
              <div className="section-header">
                <h2>📈 Impact</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <ul>
                  <li>Tracking-related support tickets ↓ <strong>90%+</strong></li>
                  <li>Fewer billing disputes; restored client confidence in reported performance</li>
                  <li>Sustainable governance <em>before</em> any API patch shipped</li>
                </ul>
              </div>
            </section>

            <section id="learning" className="response-section">
              <div className="section-header">
                <h2>🎓 Learning & Application</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>The gaps between teams are where integrity fails. Treat documentation and enablement as engineering controls; that’s how QA, certification, and partner trust sustain at scale.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingRCA;
