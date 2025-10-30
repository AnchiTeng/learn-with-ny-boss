import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FactorQuiz from "./Components/Factors.jsx";
import HigherLevelPractice from "./Components/LevelPractice.jsx";
import FullQuizLevel from "./Components/FullQuizLevel.jsx";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        {/* <Link to="/level1" style={styles.link}>Level 1</Link>
        <Link to="/level2" style={styles.link}>Level 2</Link>
         <Link to="/level3" style={styles.link}>Level 3</Link> */}
         <Link to="/level1" style={styles.link}>基礎</Link>
        <Link to="/level2" style={styles.link}>進階</Link>
         <Link to="/level3" style={styles.link}>高手</Link>
      </nav>

      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<FactorQuiz />} />
          <Route path="/level1" element={<FactorQuiz />} />
          <Route path="/level2" element={<HigherLevelPractice />} />
           <Route path="/level3" element={<FullQuizLevel />} />
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
// App.js
// import React, { useState } from "react";
// import "./App.css";

// const MAX_NUMBER = 100;

// function getFactors(n) {
//   const factors = [];
//   for (let i = 1; i <= n; i++) {
//     if (n % i === 0) factors.push(i);
//   }
//   return factors;
// }

// function isPrime(n) {
//   if (n < 2) return false;
//   for (let i = 2; i <= Math.sqrt(n); i++) {
//     if (n % i === 0) return false;
//   }
//   return true;
// }

// function App() {
//   const [selectedNumber, setSelectedNumber] = useState(null);
//   const [userInput, setUserInput] = useState("");
//   const [results, setResults] = useState({});
//   const [score, setScore] = useState(0);

//   const handleNumberClick = (num) => {
//     setSelectedNumber(num);
//     setUserInput("");
//   };

//   const handleCheck = () => {
//     if (!selectedNumber) return;
//     const correctFactors = getFactors(selectedNumber);
//     const userFactors = userInput
//       .split(",")
//       .map((x) => parseInt(x.trim()))
//       .filter((x) => !isNaN(x));

//     const correctCount = userFactors.filter((x) =>
//       correctFactors.includes(x)
//     ).length;

//     const isComplete =
//       userFactors.length === correctFactors.length &&
//       correctCount === correctFactors.length;

//     setResults({
//       ...results,
//       [selectedNumber]: {
//         userFactors,
//         isComplete,
//         correctFactors,
//       },
//     });

//     if (isComplete) setScore(score + 10); // award points
//     setUserInput(""); // reset input
//     setSelectedNumber(null); // close modal
//   };

//   return (
//     <div className="App">
//       <h1>Factor Quiz Game</h1>
//       <p>Score: {score}</p>

//       {/* Number Grid */}
//       <div className="grid">
//         {Array.from({ length: MAX_NUMBER }, (_, i) => i + 1).map((num) => {
//           const prime = isPrime(num);
//           const attempted = results[num]?.isComplete;
//           return (
//             <button
//               key={num}
//               className={`grid-item ${prime ? "prime" : ""} ${
//                 attempted ? "done" : ""
//               }`}
//               onClick={() => handleNumberClick(num)}
//             >
//               {num}
//             </button>
//           );
//         })}
//       </div>

//       {/* Modal for selected number */}
//       {selectedNumber && (
//         <div className="modal">
//           <h2>Number: {selectedNumber}</h2>
//           <p>
//             Enter all factors of {selectedNumber} separated by commas:
//           </p>
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//           />
//           <button onClick={handleCheck}>Check</button>
//           <button onClick={() => setSelectedNumber(null)}>Cancel</button>
//         </div>
//       )}

//       {/* Display results */}
//       <div className="results">
//         {Object.keys(results).map((num) => (
//           <div key={num}>
//             <strong>{num}</strong>: 
//             {results[num].userFactors.map((f, idx) => {
//               const correct = results[num].correctFactors.includes(f);
//               return (
//                 <span
//                   key={idx}
//                   className={correct ? "correct" : "incorrect"}
//                 >
//                   {f}
//                 </span>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
