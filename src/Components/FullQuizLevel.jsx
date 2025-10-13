import React, { useState, useMemo } from "react";
import "./FactorQuiz.css";

const FullQuizLevel = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);

  // Get all factors of a number
  const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) factors.push(i);
    }
    return factors;
  };

  // Check if number is prime
  const isPrime = (num) => {
    if (num < 2) return false;
    const factors = getFactors(num);
    return factors.length === 2;
  };

  // Generate 1–100 numbers
  const numbers = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const num = i + 1;
      return {
        number: num,
        factors: getFactors(num),
        isPrime: isPrime(num),
      };
    });
  }, []);

  // Parse user input into number array
  const parseUserInput = (input) => {
    if (!input || input.trim() === "") return [];
    return input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));
  };

  // Compare user's factors with correct ones
  const checkAnswer = (num, correctFactors) => {
    const userInput = parseUserInput(userAnswers[num] || "");
    const correctSet = new Set(correctFactors);
    const userSet = new Set(userInput);

    const correct = userInput.filter((f) => correctSet.has(f));
    const missing = correctFactors.filter((f) => !userSet.has(f));

    return { correct, missing };
  };

  const handleInputChange = (num, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  const handleCheckAll = () => {
    let newResults = {};
    let totalScore = 0;

    numbers.forEach(({ number, factors }) => {
      const result = checkAnswer(number, factors);
      const isPerfect = result.correct.length === factors.length;
      newResults[number] = { ...result, isPerfect };

      if (isPerfect) totalScore++;
    });

    setResults(newResults);
    setScore(totalScore);
    setChecked(true);
  };

  return (
    <div className="factor-quiz-container">
      <h1 className="quiz-title">Ultimate Factor Challenge</h1>
      <p className="quiz-subtitle">
        Enter all factors for each number (separated by commas). When you’re
        ready, click “Check All Answers” to see your score!
      </p>

      <div className="button-bar">
        <button className="btn btn-submit" onClick={handleCheckAll}>
          Check All Answers
        </button>
      </div>

      {checked && (
        <div className="score-display">
          Your Score: {score} / {numbers.length}
        </div>
      )}

      <div className="number-grid">
        {numbers.map(({ number, factors, isPrime: prime }) => {
          const result = results[number];
          const isPerfect = result?.isPerfect;
          const cardClass = checked
            ? isPerfect
              ? "correct-card"
              : "wrong-card"
            : "";

          return (
            <div
              key={number}
              className={`number-card ${prime ? "prime" : ""} ${cardClass}`}
            >
              <div className="number-header">
                <h3 className="number-title">{number}</h3>
                {prime && <span className="prime-badge">PRIME</span>}
              </div>

              <input
                type="text"
                placeholder="e.g., 1, 2, 4"
                value={userAnswers[number] || ""}
                onChange={(e) => handleInputChange(number, e.target.value)}
                className="factor-input"
              />

              {checked && result && (
                <div className="result-summary">
                  {isPerfect ? (
                    <span className="result-perfect">✅ Perfect!</span>
                  ) : (
                    <>
                      <div>✅ {result.correct.length} correct</div>
                      <div>⚠ {result.missing.length} missing</div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="instructions">
        <h2>Instructions:</h2>
        <ul>
          <li>Type all factors separated by commas (e.g., "1, 2, 4").</li>
          <li>Prime numbers are highlighted in yellow.</li>
          <li>You can change your answers anytime.</li>
          <li>Click “Check All Answers” again to update your score.</li>
          <li>Green cards are perfect; red cards need more work.</li>
        </ul>
      </div>
    </div>
  );
};

export default FullQuizLevel;
