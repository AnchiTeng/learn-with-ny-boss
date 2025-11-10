import React, { useState } from 'react';
import './QuestionPage.css';

const AudienceCommunication = () => {
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

  // Optional keyword highlighter (same signature you use elsewhere)
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
    { text: "I supported the U.S. Army’s marketing team during a platform migration—moving a dynamic VAST video template from a legacy tool into a newer environment.", highlight: false },
    { text: "I produced extremely detailed instructions (step-by-steps, annotated screenshots, short videos), but the audience were non-technical marketers, not the original builders.", highlight: false },
    { text: "Instead of helping, my documentation overwhelmed them; they stalled and couldn’t complete the migration independently.", highlight: true }, // PROBLEM

    { text: "I ensured no delay by completing the migration myself, then asked their lead what would’ve made it easier.", highlight: true }, // ACTION (1)
    { text: "Based on feedback, I reframed enablement: diagnose the audience first (builders vs requesters, technical vs strategic) and lead with the ask, not the architecture.", highlight: false },
    { text: "I created a two-path model: a concise self-serve guide for technical partners and a 'send us your assets' workflow for non-technical teams.", highlight: false },

    { text: "Outcome: onboarding time dropped ~40% and migration-related escalations disappeared; clients felt supported, not burdened.", highlight: true }, // IMPACT

    { text: "Takeaway: effective TAM communication means matching fidelity to role—reduce cognitive load, clarify inputs, and remove friction to drive adoption.", highlight: true }, // LEARNING
  ];

  // ~30s micro version (just the anchors)
  const STORY_SHORT = [
    { text: "My detailed VAST migration docs overwhelmed a non-technical Army marketing team; progress stalled.", highlight: true }, // PROBLEM
    { text: "I finished the migration to protect timelines, then rebuilt enablement with a two-path model (self-serve guide for tech partners; 'send assets' flow for marketers).", highlight: true }, // ACTION
    { text: "Onboarding time fell ~40% and escalations went to zero; the team felt supported.", highlight: true }, // IMPACT
    { text: "Lesson: match message to audience—lead with the ask and cut cognitive load to increase adoption.", highlight: true }, // LEARNING
  ];

  // Optional hooks to open with (pick one)
  const HOOKS = [
    "The right documentation for the wrong audience is still the wrong documentation.",
    "I stopped teaching the tool and started teaching the path.",
    "Fewer steps, clearer asks—faster adoption."
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
        <li><Highlight text="Reduces variance by tailoring input requirements to role → cleaner handoffs, fewer retries." /></li>
        <li><Highlight text="Creates repeatable playbooks that partners can follow without deep platform knowledge." /></li>
        <li><Highlight text="Accelerates readiness for cert/integration windows by lowering the cognitive load on non-technical teams." /></li>
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
            <p>U.S. Army VAST migration; non-technical audience</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Docs too detailed → cognitive overload</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>Two-path enablement; lead with the ask</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>~40% faster onboarding; no escalations</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Match fidelity to audience</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Say the delta</strong>: 40% faster + zero escalations</li>
            <li><strong>Name the shift</strong>: from “teach the tool” to “teach the path”</li>
            <li><strong>Role-first framing</strong>: builders vs requesters</li>
            <li><strong>Keep one example</strong>: “send assets” checklist</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Adapting Communication to Audience Needs</h1>
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
            <h1>Adapting Communication to Audience Needs</h1>
            <div className="question-meta">
              <span className="category-tag">Communication Skills</span>
              <span className="difficulty-tag easy">Easy</span>
              <span className="review-date">Last reviewed: 2024-01-08</span>
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
                <p>U.S. Army marketing team needed to migrate a dynamic VAST template from a legacy tool to a newer platform.</p>
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
                <p>My comprehensive instructions overwhelmed a non-technical audience; the team stalled and couldn’t complete the migration alone.</p>
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
                  <li>Completed the migration to protect timelines</li>
                  <li>Diagnosed audience needs (builders vs requesters; technical vs strategic)</li>
                  <li>Introduced a two-path enablement model:
                    <ul>
                      <li><strong>Self-serve</strong> guide for technical partners</li>
                      <li><strong>“Send assets”</strong> checklist + intake for marketers</li>
                    </ul>
                  </li>
                  <li>Led with the ask; minimized cognitive load</li>
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
                  <li>~40% reduction in onboarding time</li>
                  <li>Migration-related escalations eliminated</li>
                  <li>Higher satisfaction: teams felt supported, not burdened</li>
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
                <p>In TAM/QA/certification contexts, the fastest path to adoption is clarity: right fidelity, right format, right order—so partners can act without needing to understand every internal detail.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceCommunication;
