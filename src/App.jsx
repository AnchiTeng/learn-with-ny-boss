import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FactorQuiz from "./Components/Factors.jsx";
import HigherLevelPractice from "./Components/LevelPractice.jsx";
import FullQuizLevel from "./Components/FullQuizLevel.jsx";
import EnLevel1 from "./Components/En-level1.jsx";
import EnLevel2 from "./Components/En-level2.jsx";
import EnLevel3 from "./Components/En-level3.jsx";

function App() {
  const [english, setEnglish] = useState(false);

  const toggleLanguage = () => {
    setEnglish((prev) => !prev);
  };

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/level1" style={styles.link}>
          {english ? "Basic" : "基礎"}
        </Link>
        <Link to="/level2" style={styles.link}>
           {english ? "Advanced" : "進階"}
        </Link>
        <Link to="/level3" style={styles.link}>
          {english ? "Master" : "高手"}
        </Link>
        <button onClick={toggleLanguage}>
          {!english ? "English Version" : "中文版"}
        </button>
      </nav>

      <div style={styles.content}>
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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#4a90e2",
    padding: "10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
  },
  content: {
    marginTop: "20px",
    padding: "10px",
  },
};

export default App;