import React, { useState, useMemo } from "react";
import "./FactorQuiz.css";

const HigherLevelPractice = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

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

  // Generate numbers 1–100
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

  const handleInputChange = (num, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  const handleSubmit = (num) => {
    setSubmitted((prev) => ({
      ...prev,
      [num]: true,
    }));
  };

  const parseUserInput = (input) => {
    if (!input || input.trim() === "") return [];
    return input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));
  };

  const checkAnswer = (num, correctFactors) => {
    const userInput = parseUserInput(userAnswers[num] || "");
    const correctSet = new Set(correctFactors);
    const userSet = new Set(userInput);

    const correct = userInput.filter((f) => correctSet.has(f));
    const missing = correctFactors.filter((f) => !userSet.has(f));

    return { correct, missing };
  };

  return (
    <div className="factor-quiz-container">
      <h1 className="quiz-title">1-100 Factor Challenge - Advanced Level</h1>
      <p className="quiz-subtitle">
        Enter all factors for each number (separated by commas). You'll only see
        how many are correct or missing.
      </p>

      <div className="number-grid">
        {numbers.map(({ number, factors, isPrime: prime }) => {
          const isSubmitted = submitted[number];
          const result = isSubmitted ? checkAnswer(number, factors) : null;

          return (
            <div key={number} className={`number-card ${prime ? "prime" : ""}`}>
              <div className="number-header">
                <h3 className="number-title">{number}</h3>
                {prime && <span className="prime-badge">PRIME</span>}
              </div>

              <input
                type="text"
                placeholder="e.g., 1, 2, 4"
                value={userAnswers[number] || ""}
                onChange={(e) => handleInputChange(number, e.target.value)}
                disabled={isSubmitted}
                className="factor-input"
              />

              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmit(number, factors)}
                  className="btn btn-submit"
                >
                  Submit
                </button>
              ) : (
                <div className="result-section">
                  {result.correct.length === factors.length ? (
                    <div className="result-perfect">🎉 Perfect! All correct!</div>
                  ) : (
                    <>
                      <div className="result-summary">
                        ✅ {result.correct.length} correct
                      </div>
                      <div className="result-summary">
                        ⚠ {result.missing.length} missing
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted((prev) => ({ ...prev, [number]: false }));
                      setUserAnswers((prev) => ({ ...prev, [number]: "" }));
                    }}
                    className="btn btn-retry"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HigherLevelPractice;