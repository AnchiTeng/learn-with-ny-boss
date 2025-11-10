import { useState, useMemo } from 'react';
import './InterviewDashboard.css';


const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    title: "Cross-functional Process Improvement",
    path: "/cross-functional-process",
    category: "Process Optimization",
    difficulty: "medium",
    tags: ["Process Improvement", "Cross-team Collaboration", "Client Experience", "Systematic Thinking", "Zendesk"],
    lastReviewed: "2024-01-15",
    content: {
      situation: "During company scaling with new hires, Sales and Success team members were scheduling product demos before submitting requests to Creative Support team, with requests lacking essential background information.",
      problem: "Support team committed to dates without knowing demo type, attendees, creative needs, or campaign details. Follow-up questions went unanswered, requiring second calls and delaying client onboarding.",
      solution: "Redesigned intake process: 1) Added required fields with conditional logic in Zendesk 2) Built macros for quick clarification responses 3) Socialized through email and training sessions",
      impact: "90% of tickets included actionable context, follow-up demo requests dropped by 50%, client feedback improved significantly, framework adopted by APAC and EMEA teams",
      learning: "Great client experiences start with smooth internal operations, recurring issues should be evaluated at systemic level for process improvements"
    }
  },
  {
    id: 2,
    title: "Dynamic Creative Optimization for Out-of-Home Media",
    path: "/dco-outdoor-media",
    category: "Technical Innovation",
    difficulty: "hard",
    tags: ["DCO", "Outdoor Advertising", "Caching Optimization", "Low-bandwidth Solutions", "Productization", "APAC"],
    lastReviewed: "2024-01-18",
    content: {
      situation: "Supported APAC client with largest digital outdoor advertising network in Australia for DCO solution, discovered bandwidth limitations and high caching cost challenges.",
      problem: "Screens in subways and remote areas had limited bandwidth, video ads failing to download fell back to static creatives, breaking dynamic geo-targeted experience and campaign performance.",
      solution: "Designed multi-session caching protocol to pre-cache core creative elements during off-peak hours and pull real-time contextual data while staying within bandwidth limits.",
      impact: "Successfully launched Australia's first DCOOH platform, contributed to 18% YoY revenue growth, solution productized and rolled out across APAC region",
      learning: "Constraints often spark the best innovation, deeply understanding client's technical reality and strategic ambition turns limitations into market-differentiating capabilities"
    }
  },
  {
    id: 3,
    title: "Unified Creative Taxonomy for Multi-Agency Client",
    path: "/unified-taxonomy",
    category: "Process Standardization",
    difficulty: "medium",
    tags: ["Creative Taxonomy", "Data Standardization", "Process Design", "Non-technical Users", "Reporting"],
    lastReviewed: "2024-01-12",
    content: {
      situation: "Supported large self-service travel client working with multiple external creative agencies building campaigns independently without shared naming standards.",
      problem: "Fragmentation made unified campaign performance view impossible, reporting required manual reconciliation of multiple spreadsheets, time-consuming and error-prone.",
      solution: "Designed unified creative taxonomy and dynamic framework, reverse-engineered common structure, created visual documentation and hands-on training sessions.",
      impact: "Campaign reporting time reduced by over 60%, Client Success team reclaimed 10+ hours weekly, client could compare creative performance across campaigns",
      learning: "Process standardization isn't about control; it's about clarity. Earn buy-in by translating technical needs into business outcomes"
    }
  },
  {
    id: 4,
    title: "Root Cause Analysis of Tracking Discrepancies",
    path: "/tracking-analysis",
    category: "Technical Governance",
    difficulty: "hard",
    tags: ["Root Cause Analysis", "Cross-functional Leadership", "Technical Documentation", "Data Integrity", "API"],
    lastReviewed: "2024-01-20",
    content: {
      situation: "High discrepancies in reporting for campaigns with custom product-level tracking in dynamic creatives, requiring cost absorption and creating fire-drill culture.",
      problem: "Tracking implementation broken but no agreement on cause, teams working in silos with outdated documentation, inconsistent event firing and missing product IDs.",
      solution: "Led cross-functional root cause analysis, discovered API and tracking library mismatch, authored comprehensive role-specific implementation guides with training sessions.",
      impact: "Tracking-related support tickets dropped by over 90%, clients received consistent trustworthy metrics, fewer billing disputes and better retention",
      learning: "Biggest risks live in gaps between teams, clear role-specific documentation is crucial strategic tool for preventing operational failure"
    }
  },
  {
    id: 5,
    title: "Knowledge Sharing and Cross-functional Collaboration",
    path: "/knowledge-sharing",
    category: "Team Collaboration",
    difficulty: "medium",
    tags: ["Knowledge Sharing", "Psychological Safety", "Systems Thinking", "Team Enablement", "Documentation"],
    lastReviewed: "2024-01-10",
    content: {
      situation: "As creative developer, relied on shared tag container managed by another department, critical for bridging creatives with serving environment and platform API.",
      problem: "Container developer reluctant to share documentation and technical context, knowledge siloed within small informal group, creating bottlenecks and slowing delivery.",
      solution: "Escalated as process and risk issue, adjusted project assignments to reduce dependency, documented workarounds and patterns for team resilience.",
      impact: "Team became more self-sufficient, reduced reliance on single point of failure, improved debugging speed",
      learning: "Technical excellence isn't just about code—it's about enablement. Transparent knowledge sharing is foundational in platform-driven environments"
    }
  },
  {
    id: 6,
    title: "Flash to HTML5 Industry Transition",
    path: "/flash-html5-transition",
    category: "Technical Transformation",
    difficulty: "hard",
    tags: ["Technology Transition", "Industry Standards", "Client Enablement", "IAB Compliance", "HTML5"],
    lastReviewed: "2024-01-22",
    content: {
      situation: "Digital advertising industry shift from Adobe Flash to HTML5/JavaScript as mobile usage exploded and browsers phased out Flash support.",
      problem: "Entire platform needed transition, clients anxious about existing Flash campaigns, internal teams lacked confidence in HTML workflows, risk of service disruption.",
      solution: "Partnered with core HTML5 API engineer for deep understanding, provided role-specific enablement, hosted developer workshops, contributed to IAB HTML5 Best Practices Working Group.",
      impact: "Seamless transition for 95%+ clients, creatives passed IAB validator checks, support ticket volume dropped post-migration, laid groundwork for DCOOH innovation",
      learning: "Change isn't just technical—it's human. Lead with empathy, clarity, and actionable paths forward so everyone moves forward together"
    }
  },
  {
    id: 7,
    title: "Adapting Communication to Audience Needs",
    path: "/audience-communication",
    category: "Communication Skills",
    difficulty: "easy",
    tags: ["Audience Analysis", "Technical Communication", "Documentation", "Client Enablement", "Training"],
    lastReviewed: "2024-01-08",
    content: {
      situation: "Supported U.S. Army marketing team migrating dynamic VAST video ad template from legacy creative tool to newer platform.",
      problem: "Overly detailed documentation overwhelmed non-technical marketers who couldn't complete migration independently despite step-by-step instructions.",
      solution: "Completed migration for them, then reflected and implemented two-path approach: self-serve guides for technical partners and asset submission workflow for non-technical teams.",
      impact: "Onboarding time reduced by 40%, eliminated migration-related escalations, clients felt supported rather than burdened",
      learning: "Effective communication isn't about how much you know—it's about how well you match your message to your audience's needs"
    }
  },
  {
    id: 8,
    title: "MRC Audit and Viewability Testing",
    path: "/mrc-audit",
    category: "Compliance & Audit",
    difficulty: "medium",
    tags: ["MRC Audit", "Viewability Testing", "Compliance", "Quality Assurance", "Ad Verification"],
    lastReviewed: "2024-01-05",
    content: {
      situation: "Participated in MRC annual audit for accreditation renewal, covering impressions and viewability testing for desktop and mobile devices.",
      problem: "Needed to ensure all ad serving and measurement systems complied with MRC standards, providing accurate viewability data and reporting.",
      solution: "Coordinated cross-team preparation of audit materials, implemented testing protocols, ensured technical implementation met industry standards.",
      impact: "Successfully passed audit maintaining accreditation, enhanced client trust in data accuracy",
      learning: "Continuous compliance monitoring and quality assurance form the foundation of market trust"
    }
  }
];

// 难度颜色配置
const DIFFICULTY_COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444'
};

// const CATEGORIES = ['全部', '算法', 'JavaScript', 'React', '计算机网络', 'CSS'];
// Categories configuration
const CATEGORIES = ['All', 'Process Optimization', 'Technical Innovation', 'Process Standardization', 'Technical Governance', 'Team Collaboration', 'Technical Transformation', 'Communication Skills', 'Compliance & Audit'];

export default function InterviewDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  //const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedCategories, setSelectedCategories] = useState([]); // 改為數組來存儲多個選擇
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');


 // 過濾題目
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // 修改類別匹配邏輯：如果沒有選擇任何類別，顯示所有；否則只顯示選中的類別
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(question.category);
      
      const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategories, selectedDifficulty]);

   // 切換類別選擇
  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // 如果已經選中，移除它
        return prev.filter(c => c !== category);
      } else {
        // 如果未選中，添加它
        return [...prev, category];
      }
    });
  };

  // 清空所有筛选
//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('全部');
//     setSelectedDifficulty('全部');
//   };

// 選擇所有類別
  const selectAllCategories = () => {
    setSelectedCategories([...CATEGORIES]);
  };

  // 清空類別選擇
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  // 清空所有篩選
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedDifficulty('All');
  };


return (
    <div className="interview-dashboard">
      {/* 頭部搜索區 */}
      <header className="dashboard-header">
        <h1>💼 Interview Notes</h1>
        <p>Do Your Best and You Will Be Blessed</p>
        
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Use keyword to filter, e.g., cross functional..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
          
          <button 
            className="clear-filters-btn"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </header>

      {/* 篩選器 */}
      <div className="filters">
        <div className="filter-group">
          <div className="filter-header">
            <label>CATEGORIES:</label>
            <div className="category-actions">
              <button 
                className="category-action-btn"
                onClick={selectAllCategories}
              >
                Select All
              </button>
              <button 
                className="category-action-btn"
                onClick={clearAllCategories}
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="category-tabs">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategories.includes(category) ? 'active' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
                {selectedCategories.includes(category) && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
          {selectedCategories.length > 0 && (
            <div className="selected-categories-info">
              Selected: {selectedCategories.join(', ')}
            </div>
          )}
        </div>
        
        <div className="filter-group">
          <label>DIFFICULTY:</label>
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="difficulty-select"
          >
            <option value="All">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* 結果統計 */}
      <div className="results-info">
        <span>Found {filteredQuestions.length} questions</span>
        {searchTerm && (
          <span>Search: "{searchTerm}"</span>
        )}
        {selectedCategories.length > 0 && (
          <span>Categories: {selectedCategories.length} selected</span>
        )}
        {selectedDifficulty !== 'All' && (
          <span>Difficulty: {selectedDifficulty}</span>
        )}
      </div>

      {/* 題目列表 */}
      <div className="questions-grid">
        {filteredQuestions.map(question => (
          <div key={question.id} className="question-card">
            <div className="card-header">
              <h3 className="question-title">
                <a 
                  href={`/finn1219${question.path}`}
                  className="question-link"
                >
                  {question.title}
                </a>
              </h3>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: DIFFICULTY_COLORS[question.difficulty] }}
              >
                {question.difficulty === 'easy' ? 'Easy' : 
                 question.difficulty === 'medium' ? 'Medium' : 'Hard'}
              </span>
            </div>
            
            <div className="card-meta">
              <span className="category">{question.category}</span>
              <span className="last-reviewed">Last reviewed: {question.lastReviewed}</span>
            </div>
            
            <div className="tags">
              {question.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 無結果狀態 */}
      {filteredQuestions.length === 0 && (
        <div className="empty-state">
          <h3>No matching questions found</h3>
          <p>Try adjusting your search terms or filter criteria</p>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}