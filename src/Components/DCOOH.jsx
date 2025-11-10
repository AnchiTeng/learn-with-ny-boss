import React, { useState } from 'react';
import './QuestionPage.css';

const DCOOH = () => {
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

  // keyword mark helper (same pattern as CrossFunction if you need it later)
  const escapeForRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const Highlight = ({ text, terms = [] }) => {
    if (!terms.length) return text;
    const pattern = new RegExp(`(${terms.map(escapeForRegExp).join('|')})`, 'gi');
    const parts = String(text).split(pattern);
    return parts.map((part, i) =>
      pattern.test(part) ? <mark key={i} className="hl">{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
    );
  };

  // ---- CONTENT (SPSIL, tuned for QA / Cert / Integration) ----
  // 45–60s: keep only the essential sentences; highlight the 4 anchors
  const STORY = [
    { text: "Our APAC VP asked me to support a client with Australia’s largest DOOH network exploring DCO on their screens.", highlight: false },
    { text: "During template prototyping we uncovered an unspoken blocker: many screens had spotty bandwidth and high data costs, so large video assets partially downloaded, timed out, and repeatedly retried.", highlight: false },
    { text: "That meant fallbacks kept showing and bandwidth kept burning — the DCO promise would fail unless we fixed delivery first.", highlight: true }, // PROBLEM

    { text: "I solved it at the delivery/workflow layer — not by asking for perfect networks.", highlight: true }, // ACTION (frame)
    { text: "Working with Solutions Engineering, we used indexedDB + byte-range requests to resume partial downloads across non-consecutive ad calls and staged assets by network profile.", highlight: false },
    { text: "We pre-cached core assets during off-peak cycles and only pulled light, real-time data (weather/offers) at render time.", highlight: false },

    { text: "Result: they launched Australia’s first DCOOH with reliable playback on low-bandwidth screens, and the product became a flagship with ~18% YoY outdoor revenue lift.", highlight: true }, // IMPACT

    { text: "My takeaway: design for constraints and make the process do the heavy lifting — that’s how you get scalable, partner-ready integrations.", highlight: true }, // LEARNING
    { text: "We also productized the utility so other DOOH partners could adopt it quickly.", highlight: false },
  ];

  // ~30s micro: the 4 anchors only (same highlight style)
  const STORY_SHORT = [
    { text: "DCO for DOOH was failing on low-bandwidth screens: video assets timed out and kept retrying, so fallbacks showed and costs rose.", highlight: true }, // PROBLEM
    { text: "We built a delivery-layer fix — indexedDB + byte-range resume and staged pre-caching — then kept render-time calls lightweight.", highlight: true }, // ACTION
    { text: "They launched Australia’s first DCOOH; performance stabilized and the client reported ~18% YoY revenue growth in that unit.", highlight: true }, // IMPACT
    { text: "Lesson: engineer for constraints; productize the pattern so partners can scale it.", highlight: true }, // LEARNING
  ];

  const HOOKS = [
    "We had to make DCO work on imperfect networks.",
    "The blocker wasn’t creative — it was delivery under bandwidth constraints.",
    "We fixed the pipeline so personalization could shine."
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
      <h4>Role Alignment (QA / Certification / Integration)</h4>
      <ul className="bullet compact">
        <li>Validates **ad delivery performance** under real constraints (QA mindset).</li>
        <li>Turns solution into a **repeatable integration** partners can certify against.</li>
        <li>Demonstrates **interoperability** across environments (OOH players, networks).</li>
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
            <p>APAC client exploring DCO on DOOH with bandwidth limits</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('problem')}>
            <h3>Problem</h3>
            <p>Partial video downloads → timeouts, retries, fallbacks, wasted bandwidth</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('solution')}>
            <h3>Solution</h3>
            <p>indexedDB + byte-range resume, staged pre-cache, light render calls</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('impact')}>
            <h3>Impact</h3>
            <p>First DCOOH launch, stabilized delivery, ~18% YoY revenue lift</p>
          </div>
          <div className="guide-card clickable" onClick={() => scrollToSection('learning')}>
            <h3>Learning</h3>
            <p>Engineer for constraints; productize for partner scale</p>
          </div>
        </div>

        <div className="delivery-tips-sidebar">
          <h3>💡 Delivery Tips</h3>
          <ul>
            <li><strong>Lead with the blocker</strong> (bandwidth → fallbacks → retries)</li>
            <li><strong>Name the lever</strong> (resume + pre-cache + light data)</li>
            <li><strong>Prove with metrics</strong> (~18% YoY)</li>
            <li><strong>Tie to role</strong> (QA, cert readiness, interoperability)</li>
          </ul>
        </div>
      </div>

      {/* STRUCTURED vs NOTES */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q: Dynamic Creative Optimization for Out-of-Home</h1>
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
            <h1>Dynamic Creative Optimization for Out-of-Home</h1>
            <div className="question-meta">
              <span className="category-tag">Technical Innovation</span>
              <span className="difficulty-tag hard">Hard</span>
              <span className="review-date">Last reviewed: 2024-01-18</span>
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
                <p>APAC client with the largest DOOH network in Australia wanted to launch DCO across thousands of screens with uneven connectivity.</p>
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
                <p>Large video assets partially downloaded, timed out, and re-tried — triggering fallbacks, burning bandwidth, and breaking the personalized experience.</p>
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
                  <li>Delivery-layer fix: <strong>indexedDB + byte-range resume</strong> across non-consecutive ad calls</li>
                  <li><strong>Staged pre-caching</strong> of heavy assets during off-peak cycles per screen profile</li>
                  <li>Lightweight, <strong>real-time data</strong> (weather/offers) injected at render time</li>
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
                  <li>Australia’s first <strong>DCOOH</strong> launched; reliable playback on low-bandwidth screens</li>
                  <li>Flagship product status; ~<strong>18% YoY</strong> revenue lift in outdoor unit</li>
                  <li>Solution **productized** for rapid rollout to other DOOH partners</li>
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
                <p>Engineer for constraints and push the process to do the heavy lifting; then package it so partners can certify and scale.</p>
                <p>Direct fit for Ad Tech QA / Certification: validates performance, standardizes behavior across environments, and strengthens partner integrations.</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default DCOOH;
