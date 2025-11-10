import React, { useState } from 'react';
import './QuestionPage.css';

const KnowledgeSharing = () => {
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

  // (optional) keyword highlighter – same signature as other modules
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
    { text: "As a creative developer, my team relied on a shared tag container owned by another department to bridge creatives with the serving environment and platform API.", highlight: false },
    { text: "Troubleshooting was slow and brittle because the container owner resisted sharing documentation and debug steps—knowledge lived with one person.", highlight: true }, // PROBLEM

    { text: "I approached it as a systems risk, not a personal conflict: I proposed joint debugging, shared runbooks, and co-documentation to open the black box.", highlight: true }, // ACTION (1)
    { text: "When progress stalled, I escalated to my manager explicitly as a process and resilience issue—single point of failure, delivery risk, and knowledge loss.", highlight: false },
    { text: "In parallel, I documented patterns and workarounds we discovered via testing and shared them with my immediate team to reduce dependency.", highlight: false },

    { text: "Result: our team became more self-sufficient, reduced cycle time on issues, and avoided outages tied to a single engineer.", highlight: true }, // IMPACT

    { text: "Takeaway: technical excellence is also enablement—transparent knowledge sharing and documentation are core engineering controls for reliability and trust.", highlight: true }, // LEARNING
  ];

  // ~30s micro version (just the anchors)
  const STORY_SHORT = [
    { text: "A shared tag container was a single point of failure—docs and know-how were siloed, slowing delivery.", highlight: true }, // PROBLEM
    { text: "I framed it as a resilience risk, proposed runbooks, escalated as process—not personal—and created our own playbooks/workarounds.", highlight: true }, // ACTION
    { text: "We became self-sufficient and faster to debug, reducing reliance on one engineer.", highlight: true }, // IMPACT
    { text: "Lesson: documentation and open knowledge flow are reliability controls, not nice-to-haves.", highlight: true }, // LEARNING
  ];

  const HOOKS = [
    "The outage risk wasn’t in code—it was in a single person’s head.",
    "Reliability fails at the knowledge boundary, not the API boundary.",
    "We treated documentation as an engineering control."
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
        <li><Highlight text="Removes the single-point-of-failure risk during certifications and partner testing." /></li>
        <li><Highlight text="Creates repeatable, auditable steps → higher QA pass rates and faster incident resolution." /></li>
        <li><Highlight text="Improves cross-team trust and throughput → smoother integrations with partners." /></li>
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
            <p>Shared container owned by another team</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Knowledge silo → slow delivery & risk</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Runbooks, escalation as process risk, local playbooks</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>Self-sufficient, faster debugging</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Enablement = reliability control</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Frame risk</strong>: SPOF + delivery delay</li>
            <li><strong>Show leadership</strong>: systems thinking, no blame</li>
            <li><strong>Show artifacts</strong>: runbooks, playbooks, training</li>
            <li><strong>State delta</strong>: faster debug, resilient team</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Knowledge Sharing & Cross-functional Collaboration</h1>
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
            <h1>Knowledge Sharing & Cross-functional Collaboration</h1>
            <div className="question-meta">
              <span className="category-tag">Team Collaboration</span>
              <span className="difficulty-tag medium">Medium</span>
              <span className="review-date">Last reviewed: 2024-01-10</span>
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
                <p>We depended on a shared tag container owned by another department that linked creatives with serving and API layers.</p>
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
                <p>Documentation and debug steps weren’t shared; knowledge was siloed with one engineer, creating delivery risk and delays.</p>
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
                  <li>Proposed joint debugging, shared runbooks, and co-documentation</li>
                  <li>Escalated as a <strong>process/resilience risk</strong> (SPOF), not a personal issue</li>
                  <li>Authored team playbooks and shared workarounds to reduce dependency</li>
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
                  <li>Team became self-sufficient with faster debugging cycles</li>
                  <li>Reduced reliance on a single engineer; improved delivery reliability</li>
                  <li>Better cross-team trust and collaboration</li>
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
                <p>Enablement is part of engineering: open documentation and shared knowledge are QA controls that reduce variance and protect timelines.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeSharing;
