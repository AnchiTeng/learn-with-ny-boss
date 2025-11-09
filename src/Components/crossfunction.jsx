import React, { useState } from 'react';
import './QuestionPage.css';

const CrossFunction = () => {
  const [showOriginal, setShowOriginal] = useState(false);

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
  };

  // 切換原文顯示
  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
    if (!showOriginal) {
      // 如果切換到原文模式，滾動到原文區域
      setTimeout(() => {
        scrollToSection('original-notes');
      }, 100);
    }
  };

  // 你的原始筆記內容
  const originalNotes = `
When asked: "Tell me about a time you improved a cross-functional process" or "How do you ensure technical accuracy in client engagements?"

Cross-Functional Intake

S: During a period when our company was scaling and we brought on new hires, I noticed a recurring issue with the new Sales and Success team members. They were scheduling product demos and walkthroughs with clients before submitting requests to our Creative Support team. The requests that were submitted only contained a date and a time, but lacked essential background information.

P: Our support team was already committed to a date and a time, but didn't know what type of walk thru was needed, who the meeting attendees were, type of creatives needed to be built, or relevant campaign details. When the support team followed up with clarifying questions on the ticket they, often went unanswered so we would default to a standard onboarding demo. 

Following the demos, while clients usually appreciated the walk through, often times a second call was needed with more curated information to meet the specific client needs that were identified during the call. It was inefficient and in the worst cases it would even delay client onboarding. Once, a client openly expressed that they didn't feel their time was used productively.

S: I initiated a redesign to our intake process. 
1 Collaborating with our Zendesk admin we added required fields with conditional logic that would guide the requester to provide info about the type of demo up front:  
pre-sales product evaluation, 
client onboarding, 
troubleshooting help
This allowed the process to enforce the requirements.

2 If submitted tickets still required more details, I also built a ZD macro that the support team could use to quickly populate a response with clarifying questions about, 
whether the client meeting attendees were technical or not
details about the campaign needs (like targeting requirements, if a feed was being used, etc..)
any available information about the client workflow or preferred tools

3 To drive adoption, I didn't just roll it out — I socialized it by sending a short email to Sales and Success explaining why the updated process would save them time (fewer re-schedules, happier clients) and included examples of strong vs. weak requests. I offered to jump on a quick sync with any team lead who wanted to walk through it.

I: The impact was immediate, ~90% of tickets included actionable context, and follow-up demo requests dropped by about 50%. More importantly, client feedback shifted and our team often received comments like 'This demo was just what we needed'. Also, since the framework was flexible, our APAC and EMEA teams adapted the macro to include region-specific questions.

Learning
What I gained from this was an understanding that great client experiences start with the smoothing out of internal operations
From that point anytime issues appeared to be recurring, I would first look at the bigger picture to evaluate if it was systemic and how modifying operational processes could.
  `;

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
        /* 原文筆記模式 */
        <div id="original-notes" className="original-notes">
          <div className="notes-header">
            <h1>📝 Original Notes: Cross-functional Process Improvement</h1>
            <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
          </div>
          
          <div className="notes-content">
            <pre>{originalNotes}</pre>
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