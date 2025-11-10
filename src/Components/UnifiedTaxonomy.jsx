import React, { useState } from 'react';
import './QuestionPage.css';

const UnifiedTaxonomy = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [useShort, setUseShort] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShowOriginal(false); };
  const toggleOriginal = () => {
    setShowOriginal(v => !v);
    if (!showOriginal) setTimeout(() => scrollToSection('original-notes'), 100);
  };

  // Optional marker helper (same signature as your other modules)
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

  // 45–60s story (anchor lines highlighted)
  const STORY = [
    { text: "I supported a large self-serve travel client using multiple external creative agencies with no shared naming standards or structure.", highlight: false },
    { text: "Fragmentation made a unified performance view nearly impossible; reporting meant manual spreadsheet reconciliation and chasing context.", highlight: true }, // PROBLEM

    { text: "I partnered with Client Success to design a unified creative taxonomy and dynamic framework that mapped cleanly to existing workflows.", highlight: true }, // ACTION
    { text: "We reverse-engineered a common structure from current patterns, added guardrails, migrated historical assets into a single organized library.", highlight: false },
    { text: "Because not everyone was technical, I created simple visual docs and ran hands-on sessions so naming, uploads, and tags would auto-populate reports.", highlight: false },

    { text: "Within one quarter, reporting time dropped 60%+, CS reclaimed 10+ hours per week, and the client could finally compare creative performance across campaigns.", highlight: true }, // IMPACT

    { text: "Takeaway: standardization isn’t control—it’s clarity. Translate technical needs into business outcomes to earn buy-in and scale.", highlight: true }, // LEARNING
  ];

  // ~30s micro version (just the anchors)
  const STORY_SHORT = [
    { text: "Multi-agency builds lacked a shared taxonomy, so reporting was manual and fragmented.", highlight: true }, // PROBLEM
    { text: "I co-designed a unified taxonomy + dynamic framework, added guardrails, and migrated assets; trained partners with simple visuals.", highlight: true }, // ACTION
    { text: "Result: 60%+ faster reporting, 10+ hours/week saved, apples-to-apples creative comparisons enabled.", highlight: true }, // IMPACT
    { text: "Lesson: standardize for clarity; connect taxonomy to business value for adoption.", highlight: true }, // LEARNING
  ];

  const HOOKS = [
    "We didn’t need more dashboards—we needed a shared language.",
    "The blocker wasn’t SQL; it was taxonomy.",
    "Once the inputs were clean, the insights unlocked themselves."
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
        <p key={i} className={item.highlight ? "highlight-line" : ""}>{item.text}</p>
      ))}

      <hr />
      <h4>QA / Certification / Integration Fit</h4>
      <ul className="bullet compact">
        <li><Highlight text="Single source of truth → certification checklists and partner specs become enforceable, not aspirational." /></li>
        <li><Highlight text="Reduced operational variance → higher QA pass rates and fewer trafficking discrepancies." /></li>
        <li><Highlight text="Interoperability → cleaner handoffs across agencies, publishers, and measurement partners." /></li>
      </ul>
    </article>
  );

  const OriginalNotesShort = () => (
    <article className="notes-body short">
      <h3>~30s Micro Version</h3>
      {STORY_SHORT.map((item, i) => (
        <p key={i} className={item.highlight ? "highlight-line" : ""}>{item.text}</p>
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
            <p>Multi-agency builds, no shared taxonomy</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Fragmented labels → manual, error-prone reporting</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Unified taxonomy + dynamic framework + training</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>Reporting 60%+ faster; 10+ hrs/week saved</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Standardization = clarity → adoption</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Lead with business pain</strong> (manual reconciliation)</li>
            <li><strong>Name the system</strong> (taxonomy + guardrails + library)</li>
            <li><strong>Show enablement</strong> (visual docs + sessions)</li>
            <li><strong>Quantify</strong> (60%+, 10+ hrs/week)</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Unified Creative Taxonomy for Multi-Agency Client</h1>
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
            <h1>Unified Creative Taxonomy for Multi-Agency Client</h1>
            <div className="question-meta">
              <span className="category-tag">Process Standardization</span>
              <span className="difficulty-tag medium">Medium</span>
              <span className="review-date">Last reviewed: 2024-01-12</span>
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
                <p>A large self-service travel client used multiple agencies building independently, without shared naming or structure.</p>
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
                <p>Fragmentation blocked a unified performance view; reporting required manual reconciliation and frequent context chasing.</p>
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
                  <li>Co-designed a <strong>unified taxonomy</strong> and dynamic framework aligned to current workflows</li>
                  <li>Reverse-engineered common patterns; added <strong>guardrails</strong>; centralized a unified creative library</li>
                  <li>Produced <strong>visual documentation</strong> and hands-on training for non-technical users</li>
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
                  <li>Reporting time ↓ <strong>60%+</strong>; Client Success regained <strong>10+ hours/week</strong></li>
                  <li>Enabled apples-to-apples performance comparisons across campaigns</li>
                  <li>Reduced errors and rework across agencies and internal teams</li>
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
                <p>Standardization creates clarity and adoption. Tie taxonomy to business value to drive behavior change—this is core to QA rigor, certification readiness, and partner enablement.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedTaxonomy;
