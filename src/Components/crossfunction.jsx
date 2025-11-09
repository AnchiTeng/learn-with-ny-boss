import React, { useState } from 'react';
import './QuestionPage.css';

const CrossFunction = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [useShort, setUseShort] = useState(false);

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
    if (!showOriginal) {
      setTimeout(() => { scrollToSection('original-notes'); }, 100);
    }
  };

  // highlight helper
const escapeForRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const Highlight = ({ text, terms = [] }) => {
  if (!terms.length) return text;
  const pattern = new RegExp(`(${terms.map(escapeForRegExp).join('|')})`, 'gi');
  const parts = String(text).split(pattern);
  return parts.map((part, i) =>
    pattern.test(part) ? <mark key={i} className="hl">{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
  );
};

const STORY = [
  { text: "When we were scaling and onboarding new Sales and Success hires, I noticed demos were often booked with clients before our team received an intake ticket.", highlight: false },
  { text: "And the tickets we did get often only had date/time, without info on the demo type, attendees, or campaign details.", highlight: false },
  { text: "This meant the first demo sometimes missed the mark and we needed a second call.", highlight: true }, // PROBLEM

  { text: "I solved it at the workflow level.", highlight: true }, // ACTION
  { text: "I partnered with our Zendesk admin to add required fields with conditional logic, so requesters had to choose demo type and include technical level plus campaign mechanics.", highlight: false },
  { text: "For edge cases, I built a Zendesk macro to standardize clarifying questions.", highlight: false },

  { text: "After socializing the change, about 90% of requests came in with actionable context, and repeat demos dropped by ~50%.", highlight: true }, // IMPACT

  { text: "Takeaway: great client outcomes start with clean inputs.", highlight: true }, // LEARNING
  { text: "Tighten the input contract, reduce variance, and you get first-time-right delivery.", highlight: false },
  { text: "Now, when issues recur, I first check whether the workflow needs adjustment.", highlight: false },
];

// 30s micro version: only the 4 anchors
const STORY_SHORT = [
  { text: "We were booking demos without proper intake, so the first call often missed the mark and triggered a second call.", highlight: true },
  { text: "I partnered with our Zendesk admin to add required fields with conditional logic and built a Zendesk macro to standardize clarifications.", highlight: true },
  { text: "After rollout, ~90% of requests arrived with usable context and repeat demos dropped ~50%.", highlight: true },
  { text: "Lesson: tighten the input contract to reduce variance and get first-time-right delivery.", highlight: true },
];




const HOOKS = [
  'inconsistent inputs',
  'input contract',
  'without context',
];

const KEYWORDS = [
  'inconsistent inputs',
  'missing context',
  'required fields',
  'conditional logic',
  'Zendesk macro',
  '90%',
  '50%',
  'input contract',
  'first-time-right'
];



const OriginalNotes = () => (
  <article className="notes-body">
   

    <h3>Optional Opening Hook (pick one)</h3>
    <ul className="bullet">
      <li><Highlight text='We were seeing "inconsistent inputs" that created rework.' terms={HOOKS} /></li>
      <li><Highlight text='This was basically an "input contract" problem.' terms={HOOKS} /></li>
      <li><Highlight text='We kept going into demos "without context", so I fixed the source.' terms={HOOKS} /></li>
    </ul>

    <hr />

    <h3>45–60s Hybrid Version</h3>
    {STORY.map((item, i) => (
  <p key={i} className={item.highlight ? "highlight-line" : ""}>
    {item.text}
  </p>
))}


    

    <hr />

    <h4>Keywords to sprinkle in (lightly)</h4>
    <div className="chips">
      {['input contract','coverage','repeatability','variance reduction','first-time-right','conformance'].map((k) => (
        <span key={k} className="chip">{k}</span>
      ))}
    </div>
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



  // 滾動到指定部分
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // 滾動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowOriginal(false);
  };

  
  // 你的原始筆記內容
//  const originalNotes = `Hybrid STAR Answer - Ad Tech QA / Certification Lens

// Optional Opening Hook options (pick just one, short):
// - "We were seeing inconsistent inputs that created rework."
// - "This was basically an input contract problem."
// - "We kept going into demos without context, so I focused on fixing the source."

// ---

// 45-60 sec Hybrid Version (structured but natural tone)

// When we were scaling and onboarding new Sales and Success hires, I started noticing a pattern — demos were often being booked with clients before our team received an intake ticket. And when we did receive the ticket, it often only had the date and time, with no information about what type of demo was needed, who was attending, or any campaign/context details. The result was: sometimes the first demo wasn’t aligned with the client’s actual needs, and we’d end up needing a second call. It was inefficient and didn’t feel good from a client experience standpoint.

// I decided to fix this at the workflow level, not at the ticket-by-ticket level. I partnered with our Zendesk admin to add required fields with conditional logic so the requester had to identify the demo type up front (pre-sales evaluation, onboarding, troubleshooting) along with key context like technical level of attendees and campaign mechanics. I also built a Zendesk macro that standardized follow-up clarifying questions, so the support team could quickly get missing info in a consistent way.

// After I socialized the changes with Sales and Success — including examples of strong vs weak submissions — about 90% of requests came in with actionable context, and repeat demos dropped by ~50%. Our APAC and EMEA teams later adapted the macro with region-specific needs as well.

// My takeaway from this was: great client outcomes start with clean inputs. If you tighten the input contract, you reduce variance and improve first-time-right delivery. So now, any time I see a recurring issue, I check whether the workflow itself needs adjustment — not just the individuals sending the requests.

// ---

// Keywords I can sprinkle in lightly if they fit naturally:
// - input contract
// - coverage / repeatability
// - variance reduction
// - first-time-right
// - conformance`;


  return (
    <div className="question-page">
      {/* 導航欄 - 添加原文切換按鈕 */}
      <nav className="question-nav">
        <a href="/finn1219" className="back-link">
          ← Back to Interview Dashboard
        </a>
        <div className="nav-controls">
          <button onClick={scrollToTop} className="nav-button">
            ↑ Top
          </button>
          <button 
            onClick={toggleOriginal} 
            className={`nav-button ${showOriginal ? 'active' : ''}`}
          >
            {showOriginal ? '📖 View Structured' : '📝 View Original Notes'}
          </button>
        </div>
      </nav>

      {/* 快速提示卡片 */}
      <div className="quick-guide">
        <h2>🎯 Quick Response Guide</h2>
        <p className="click-hint">Click any section to jump to details</p>
        
        <div className="guide-cards">
          <div 
            className="guide-card clickable"
            onClick={() => scrollToSection('situation')}
          >
            <h3>Situation</h3>
            <p>Company scaling, new hires scheduling demos without proper intake process</p>
          </div>
          
          <div 
            className="guide-card clickable"
            onClick={() => scrollToSection('problem')}
          >
            <h3>Problem</h3>
            <p>Missing context → inefficient demos → delayed onboarding → client dissatisfaction</p>
          </div>
          
          <div 
            className="guide-card clickable"
            onClick={() => scrollToSection('solution')}
          >
            <h3>Solution</h3>
            <p>Redesigned intake: required fields + macros + training</p>
          </div>
          
          <div 
            className="guide-card clickable"
            onClick={() => scrollToSection('impact')}
          >
            <h3>Impact</h3>
            <p>90% better context, 50% fewer follow-ups, positive client feedback</p>
          </div>
          
          <div 
            className="guide-card clickable"
            onClick={() => scrollToSection('learning')}
          >
            <h3>Learning</h3>
            <p>Great client experiences start with smooth internal operations</p>
          </div>
        </div>

         <div className="delivery-tips-sidebar">
      <h3>💡 Delivery Tips</h3>
      <ul>
        <li><strong>Start with impact</strong> - Frame as client satisfaction story</li>
        <li><strong>Emphasize leadership</strong> - Cross-functional collaboration</li>
        <li><strong>Use metrics</strong> - 90% & 50% improvements are memorable</li>
        <li><strong>Connect to role</strong> - Link to TAM responsibilities</li>
        <li><strong>Show learning</strong> - Demonstrate applied insights</li>
      </ul>
    </div>
      </div>

      {/* 根據模式顯示不同內容 */}
      {showOriginal ? (
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Q:  Cross-functional Process Improvement</h1>
            <div className="notes-header-actions">
              <button onClick={() => setUseShort(false)} className={`switch-mode-btn ${!useShort ? 'active' : ''}`}>
                Long (45–60s)
              </button>
              <button onClick={() => setUseShort(true)} className={`switch-mode-btn ${useShort ? 'active' : ''}`}>
                Short (~30s)
              </button>
              <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
            </div>
          </div>

          <div className="notes-content">
            {useShort ? <OriginalNotesShort /> : <OriginalNotes />}
          </div>

          <div className="notes-actions">
            <button onClick={toggleOriginal} className="switch-mode-btn">
              ← Back to Structured Version
            </button>
          </div>
        </div>
      ) : (
        /* 結構化回答模式 */
        <div className="interview-content">
          <header className="content-header">
            <h1>Cross-functional Process Improvement</h1>
            <div className="question-meta">
              <span className="category-tag">Process Optimization</span>
              <span className="difficulty-tag medium">Medium</span>
              <span className="review-date">Last reviewed: 2024-01-15</span>
            </div>
          </header>

          <div className="interview-response">
            
            {/* Situation */}
            <section id="situation" className="response-section">
              <div className="section-header">
                <h2>🧩 Situation</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>During a period of rapid company growth, we onboarded new Sales and Customer Success team members. I identified a recurring pattern where these teams were scheduling product demos and client walkthroughs <strong>before submitting proper requests</strong> to our Creative Support team.</p>
                <p>The requests that did come through contained only basic information—date and time—but lacked essential context about the client's needs, technical requirements, or campaign objectives.</p>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="response-section">
              <div className="section-header">
                <h2>⚠️ Problem</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>This created a cascade of inefficiencies:</p>
                <ul>
                  <li><strong>Support team committed blind</strong> - They agreed to dates without knowing demo type, attendee profiles, or creative requirements</li>
                  <li><strong>Clarification gaps</strong> - Follow-up questions in tickets often went unanswered, forcing default to generic onboarding demos</li>
                  <li><strong>Client impact</strong> - Most demos required second, more tailored calls, delaying onboarding timelines</li>
                  <li><strong>Direct client feedback</strong> - One client explicitly stated they "didn't feel their time was used productively"</li>
                </ul>
                <p>The core issue was a <strong>systemic process gap</strong> that affected both internal efficiency and client satisfaction.</p>
              </div>
            </section>

            {/* Solution */}
            <section id="solution" className="response-section">
              <div className="section-header">
                <h2>💡 Solution</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>I initiated and led a complete redesign of our cross-functional intake process:</p>
                
                <div className="solution-steps">
                  <div className="step">
                    <h4>1. Structured Intake Forms</h4>
                    <p>Collaborated with our Zendesk admin to implement required fields with conditional logic that guided requesters to provide:</p>
                    <ul>
                      <li>Demo type categorization (pre-sales evaluation, client onboarding, troubleshooting)</li>
                      <li>Attendee technical proficiency levels</li>
                      <li>Campaign-specific requirements and objectives</li>
                    </ul>
                  </div>

                  <div className="step">
                    <h4>2. Automated Clarification System</h4>
                    <p>Built Zendesk macros that enabled support teams to quickly send targeted clarification questions about:</p>
                    <ul>
                      <li>Client workflow and tool preferences</li>
                      <li>Specific targeting requirements</li>
                      <li>Integration or technical constraints</li>
                    </ul>
                  </div>

                  <div className="step">
                    <h4>3. Change Management & Training</h4>
                    <p>Rather than just deploying the new process, I:</p>
                    <ul>
                      <li>Socialized the benefits through concise team communications</li>
                      <li>Provided concrete examples of "strong vs. weak" requests</li>
                      <li>Offered personalized walkthroughs for team leads</li>
                      <li>Framed it as a time-saving upgrade, not additional bureaucracy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="response-section">
              <div className="section-header">
                <h2>📈 Impact</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <div className="impact-metrics">
                  <div className="metric">
                    <span className="metric-value">90%</span>
                    <span className="metric-label">of tickets included actionable context</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">50%</span>
                    <span className="metric-label">reduction in follow-up demo requests</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">100%</span>
                    <span className="metric-label">client feedback improvement</span>
                  </div>
                </div>
                
                <p>The improvements were immediate and significant:</p>
                <ul>
                  <li>Client feedback shifted to comments like <em>"This demo was just what we needed"</em></li>
                  <li>Reduced time-to-onboarding for new clients</li>
                  <li>The framework proved flexible enough for APAC and EMEA teams to adapt with region-specific questions</li>
                  <li>Improved cross-team alignment and reduced internal friction</li>
                </ul>
              </div>
            </section>

            {/* Learning */}
            <section id="learning" className="response-section">
              <div className="section-header">
                <h2>🎓 Learning & Application</h2>
                <div>
                  <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
                  <button onClick={toggleOriginal} className="view-original-btn">📝 Original</button>
                </div>
              </div>
              <div className="response-content">
                <p>This experience taught me that <strong>exceptional client experiences begin with streamlined internal operations</strong>. The key insights I apply to my work today:</p>
                
                <div className="learning-points">
                  <div className="learning-point">
                    <h4>Systemic Thinking</h4>
                    <p>When issues recur, I first evaluate if they're symptomatic of larger process gaps rather than individual performance issues.</p>
                  </div>
                  
                  <div className="learning-point">
                    <h4>Change Management</h4>
                    <p>Successful process improvements require equal parts technical solution and people-focused adoption strategies.</p>
                  </div>
                  
                  <div className="learning-point">
                    <h4>Scalable Design</h4>
                    <p>Building flexible frameworks allows for organic adaptation across different teams and regions.</p>
                  </div>
                </div>

                <div className="ttd-connection">
                  <h4>🔗 Relevance to Technical Account Management</h4>
                  <p>This approach directly translates to TAM roles where we must:</p>
                  <ul>
                    <li>Identify and bridge process gaps between technical and business teams</li>
                    <li>Implement scalable solutions that improve client outcomes</li>
                    <li>Balance technical rigor with practical, adoptable processes</li>
                    <li>Measure impact through both quantitative metrics and qualitative feedback</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossFunction;