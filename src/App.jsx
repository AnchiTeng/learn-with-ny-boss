// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import FactorQuiz from "./Components/Factors.jsx";
// import HigherLevelPractice from "./Components/LevelPractice.jsx";
// import FullQuizLevel from "./Components/FullQuizLevel.jsx";
// import EnLevel1 from "./Components/En-level1.jsx";
// import EnLevel2 from "./Components/En-level2.jsx";
// import EnLevel3 from "./Components/En-level3.jsx";
// import "./App.css";

// function App() {
//   const [english, setEnglish] = useState(false);

//   const toggleLanguage = () => {
//     setEnglish((prev) => !prev);
//   };

//   return (
//     <Router>
//       {/* <nav style={styles.nav}> */}
//       <nav className="nav">
//          <a
//           href="https://www.facebook.com/nybossvshisboss"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Follow 紐約羅董 on Facebook"
//           title="Follow 紐約羅董vs媽咪老闆 NY Boss VS His Boss "
//           className="fb-link"
//         >
//           <svg className="fb-icon" viewBox="0 0 24 24" aria-hidden="true" role="img">
//             <path
//               fill="currentColor"
//               d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.45-4.94 8.45-9.94Z"
//             />
//           </svg>
//           <span className="fb-text">Follow 紐約羅董vs媽咪老闆 NY Boss VS His Boss</span>
//         </a>
//         <Link to="/level1" style={styles.link}>
//           {english ? "Basic" : "基礎"}
//         </Link>
//         <Link to="/level2" style={styles.link}>
//            {english ? "Advanced" : "進階"}
//         </Link>
//         <Link to="/level3" style={styles.link}>
//           {english ? "Master" : "高手"}
//         </Link>
//         <button onClick={toggleLanguage}>
//           {!english ? "English Version" : "中文版"}
//         </button>
//       </nav>

//       <div style={styles.content}>
//         <Routes>
//           {english ? (
//             <>
//               <Route path="/" element={<EnLevel1 />} />
//               <Route path="/level1" element={<EnLevel1 />} />
//               <Route path="/level2" element={<EnLevel2 />} />
//               <Route path="/level3" element={<EnLevel3 />} />
//             </>
//           ) : (
//             <>
//               <Route path="/" element={<FactorQuiz />} />
//               <Route path="/level1" element={<FactorQuiz />} />
//               <Route path="/level2" element={<HigherLevelPractice />} />
//               <Route path="/level3" element={<FullQuizLevel />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     backgroundColor: "#4a90e2",
//     padding: "10px",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "1.1rem",
//   },
//   content: {
//     marginTop: "20px",
//     padding: "10px",
//   },
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FactorQuiz from "./Components/Factors.jsx";
import HigherLevelPractice from "./Components/LevelPractice.jsx";
import FullQuizLevel from "./Components/FullQuizLevel.jsx";
import EnLevel1 from "./Components/En-level1.jsx";
import EnLevel2 from "./Components/En-level2.jsx";
import EnLevel3 from "./Components/En-level3.jsx";
import "./App.css";

function App() {
  const [english, setEnglish] = useState(false);

  const toggleLanguage = () => {
    setEnglish((prev) => !prev);
  };

  return (
    <Router>
      <nav className="nav">
        {/* Facebook Link - 靠左 */}
        <div className="nav-left">
          <a
            href="https://www.facebook.com/nybossvshisboss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow 紐約羅董 on Facebook"
            title="Follow 紐約羅董 on Facebook"
            className="fb-link"
          >
            <svg className="fb-icon" viewBox="0 0 24 24" aria-hidden="true" role="img">
              <path
                fill="currentColor"
                d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.45-4.94 8.45-9.94Z"
              />
            </svg>
            <span className="fb-text">Follow 紐約羅董</span>
          </a>
        </div>

        {/* 導航連結 - 置中 */}
        <div className="nav-center">
          <Link to="/level1" className="nav-link">
            {english ? "Basic" : "基礎"}
          </Link>
          <Link to="/level2" className="nav-link">
            {english ? "Advanced" : "進階"}
          </Link>
          <Link to="/level3" className="nav-link">
            {english ? "Master" : "高手"}
          </Link>
        </div>

        {/* 語言切換按鈕 - 靠右 */}
        <div className="nav-right">
          <button onClick={toggleLanguage} className="language-btn">
            {!english ? "English Version" : "中文版"}
          </button>
        </div>
      </nav>

      <div className="content">
        <Routes>
          {english ? (
            <>
              <Route path="/" element={<EnLevel1 />} />
              <Route path="/level1" element={<EnLevel1 />} />
              <Route path="/level2" element={<EnLevel2 />} />
              <Route path="/level3" element={<EnLevel3 />} />
            </>
          ) : (
            <>
              <Route path="/" element={<FactorQuiz />} />
              <Route path="/level1" element={<FactorQuiz />} />
              <Route path="/level2" element={<HigherLevelPractice />} />
              <Route path="/level3" element={<FullQuizLevel />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;