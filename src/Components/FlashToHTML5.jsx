import React, { useState } from 'react';
import './QuestionPage.css';

const FlashToHTML5 = () => {
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

  // Optional highlighter (compatible with your other modules)
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
    { text: "Industry shift: browsers phased out Adobe Flash and iOS never supported it; rich media had to move to HTML5/JavaScript.", highlight: false },
    { text: "At Flashtalking, clients had years of Flash creatives and internal teams were anxious about new HTML5 workflows.", highlight: false },
    { text: "Risk: broken campaigns, tracking gaps, and loss of trust if the transition caused outages or heavy rework.", highlight: true }, // PROBLEM

    { text: "I partnered with our core HTML5 API engineer to deeply understand event tracking, asset loading, and responsive rendering in the new stack.", highlight: true }, // ACTION (1)
    { text: "I built role-specific enablement for production, support, campaign, and sales—so each team could confidently guide clients.", highlight: false },
    { text: "Externally, I ran developer workshops showing how to use our platform inside familiar tools (Google Web Designer, Hype, Adobe Animate).", highlight: false },
    { text: "I contributed to standards: IAB HTML5 Platforms Showcase and Tech Lab working group (HTML5 Guide 2.0, HTML5 Ad Validator, LEAN principles).", highlight: false },
    { text: "I also advised on onboarding for our no-code builder to meet marketer usability and IAB compliance.", highlight: false },

    { text: "Outcome: 95%+ of clients migrated without outages; creatives passed IAB validator checks; compatibility tickets dropped post-migration.", highlight: true }, // IMPACT
    { text: "The work became a springboard for innovations like DCOOH on constrained screens.", highlight: false },

    { text: "Takeaway: change is technical and human—translate standards into clear paths, meet users where they are, and provide options that reduce risk.", highlight: true }, // LEARNING
  ];

  // ~30s micro version (just the anchors)
  const STORY_SHORT = [
    { text: "When Flash was deprecated, we risked outages and tracking gaps as clients moved to HTML5.", highlight: true }, // PROBLEM
    { text: "I partnered with our HTML5 API engineer, shipped role-specific enablement, ran external workshops in GWD/Hype/Animate, and contributed to IAB standards.", highlight: true }, // ACTION
    { text: "Result: 95%+ seamless migrations, IAB validator passes, and fewer compatibility tickets.", highlight: true }, // IMPACT
    { text: "Lesson: lead both the tech and the humans—turn standards into usable paths and reduce adoption friction.", highlight: true }, // LEARNING
  ];

  // Optional opening hooks (pick one)
  const HOOKS = [
    "The end of Flash wasn’t a sunset—it was a reliability deadline.",
    "Standards only help if people can ship with them.",
    "We stopped teaching a tool and started teaching a migration path."
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
        <li><Highlight text="IAB conformance (HTML5 Guide 2.0, Validator, LEAN) → predictable QA outcomes across publishers." /></li>
        <li><Highlight text="Role-specific playbooks reduced variance and sped up certification checks with partners." /></li>
        <li><Highlight text="Workshops and no-code onboarding converted standards into reproducible execution paths." /></li>
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
            <p>Industry Flash deprecation → HTML5 shift</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Outage/accuracy risk; team anxiety</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Role-based enablement + IAB standards + workshops</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>95%+ seamless; fewer tickets</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Lead tech + humans</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Say the standard</strong>: IAB Validator, LEAN, Guide 2.0</li>
            <li><strong>Name the enablement</strong>: role-specific playbooks + workshops</li>
            <li><strong>Give the delta</strong>: 95%+ seamless, tickets ↓</li>
            <li><strong>Bridge to QA</strong>: conformance = predictable reviews</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Flash → HTML5 Industry Transition</h1>
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
            <h1>Flash → HTML5 Industry Transition</h1>
            <div className="question-meta">
              <span className="category-tag">Technical Transformation</span>
              <span className="difficulty-tag hard">Hard</span>
              <span className="review-date">Last reviewed: 2024-01-22</span>
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
                <p>Browsers and iOS ended Flash; rich media ads had to move to HTML5/JS; clients and teams needed a safe, fast migration path.</p>
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
                <p>Risk of broken campaigns and tracking issues could erode trust; internal confidence in HTML5 workflows was low.</p>
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
                  <li>Deep dive with HTML5 API engineer (events, loading, responsive behavior)</li>
                  <li>Role-specific enablement across internal teams</li>
                  <li>External workshops for GWD/Hype/Animate users</li>
                  <li>Contributions to IAB HTML5 Guide 2.0, Validator, LEAN principles</li>
                  <li>No-code builder onboarding aligned with standards and marketer UX</li>
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
                  <li>95%+ seamless client migrations</li>
                  <li>Consistent IAB validator passes; fewer compatibility tickets</li>
                  <li>Foundation for later innovations (e.g., DCOOH)</li>
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
                <p>Standards + enablement = adoption. Translate compliance into practical build paths so partners can ship without risking reliability.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashToHTML5;
