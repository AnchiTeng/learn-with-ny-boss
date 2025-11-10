import React, { useState } from 'react';
import './QuestionPage.css';

const MRCAudit = () => {
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

  // Optional keyword highlighter (same signature as your other modules)
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
    { text: "I was the SME for our annual MRC audit on impressions and viewability—setting up creatives, placements, and tags across desktop, mobile web, and in-app, plus documentation and non-compliance fixes.", highlight: false },
    { text: "We were integrating a new verification vendor and needed full test parity, including Android in-app using the IAB’s legacy test app.", highlight: false },
    { text: "Days before kickoff, the IAB Android test app no longer functioned on current OS versions; without an in-app test bed the auditors couldn’t schedule tags, risking accreditation.", highlight: true }, // PROBLEM

    { text: "I treated it as a certification blocker: informed our VP of Compliance, proposed leveraging internal skills, and identified a senior director with prior Android dev and an active Play Store account.", highlight: true }, // ACTION
    { text: "I defined the minimal viable requirements—tag input UI, HTTPS requests, mraid.js support, rendering, and simple logging—and secured the CTO’s approval to dedicate the director’s time.", highlight: false },
    { text: "We partnered through the weekend: I owned requirements and QA passes; he coded. By Monday, a working test app was live on Google Play for auditors.", highlight: false },

    { text: "Outcome: the audit proceeded on schedule with full environment coverage; we renewed MRC accreditation with no delays or findings.", highlight: true }, // IMPACT

    { text: "Takeaway: for certification work, unblockers win—rapid cross-functional coordination, smallest-viable tooling, and clear QA gates protect timelines and trust.", highlight: true }, // LEARNING
  ];

  // ~30s micro version (just the anchors)
  const STORY_SHORT = [
    { text: "Right before our MRC audit, the IAB Android test app failed on modern OS versions—no in-app test bed, accreditation at risk.", highlight: true }, // PROBLEM
    { text: "I escalated as a certification blocker, sourced internal Android expertise, defined a minimal test app (mraid.js, HTTPS, tag input), and got CTO approval.", highlight: true }, // ACTION
    { text: "We shipped a Play-Store test app in a weekend; the audit ran on time and accreditation was renewed.", highlight: true }, // IMPACT
    { text: "Lesson: unblock fast with smallest viable tool and tight QA coordination.", highlight: true }, // LEARNING
  ];

  // Optional hooks you can pick from
  const HOOKS = [
    "The biggest audit risk wasn’t a metric—it was a missing test bed.",
    "Certifications fail in the seams between tools and timelines.",
    "We treated unblockers as deliverables, not favors."
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
        <li><Highlight text="Certification readiness: restore full test-matrix coverage (desktop, mobile web, Android in-app)." /></li>
        <li><Highlight text="QA rigor: define minimal acceptance criteria (mraid.js, HTTPS, render, log) and validate quickly." /></li>
        <li><Highlight text="Partner enablement: give auditors a frictionless path (Play Store) and clear steps to execute tests." /></li>
      </ul>

      <h4 style={{ marginTop: '0.75rem' }}>Contingency (Follow-up ready)</h4>
      <ul className="bullet compact">
        <li>Documented a stable third-party mobile testing app (smartclip / Equativ) as a backup path.</li>
        <li>Added to the compliance playbook and scheduled pre-audit verification checks months ahead.</li>
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
            <p>Annual MRC audit; new verification vendor</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>IAB Android app broken → no in-app tests</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Ship minimal Android test app + clear QA gates</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>On-time audit; accreditation renewed</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Unblockers + cross-functional speed win audits</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Name the blocker</strong>: missing in-app test bed</li>
            <li><strong>Show leadership</strong>: escalate + mobilize fast</li>
            <li><strong>Specify MVP</strong>: mraid.js, HTTPS, render, logging</li>
            <li><strong>Quantify outcome</strong>: on-time, zero findings</li>
            <li><strong>Show resilience</strong>: contingency app + playbook</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: MRC Audit & Viewability Testing</h1>
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
            <h1>MRC Audit & Viewability Testing</h1>
            <div className="question-meta">
              <span className="category-tag">Compliance & Audit</span>
              <span className="difficulty-tag medium">Medium</span>
              <span className="review-date">Last reviewed: 2024-01-05</span>
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
                <p>Annual MRC audit for impressions and viewability; integrating a new verification vendor; full matrix testing required.</p>
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
                <p>IAB’s legacy Android test app failed on current OS versions, blocking in-app testing and threatening the accreditation timeline.</p>
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
                  <li>Escalated as a <strong>certification blocker</strong> and mobilized internal Android expertise</li>
                  <li>Defined MVP: <strong>mraid.js</strong> support, HTTPS requests, tag input UI, render + basic logs</li>
                  <li>Secured CTO approval; shipped a Play-Store test app over a weekend for auditors</li>
                  <li>Documented a third-party app (smartclip/Equativ) as a contingency and added pre-audit checks</li>
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
                  <li>Audit proceeded on schedule; accreditation renewed with no findings</li>
                  <li>Restored full environment coverage and auditor confidence</li>
                  <li>Playbook now includes contingency + proactive verification timeline</li>
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
                <p>For certifications, speed + clarity beat elegance: unblock fast with a minimal, testable path and codify the backup plan so the next audit is boring—in a good way.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default MRCAudit;
