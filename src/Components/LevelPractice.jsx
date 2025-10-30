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
      {/* <h1 className="quiz-title">Factor Master Challenge</h1> */}
        <h1 className="quiz-title">1-100 因數挑戰  - 進階級</h1>
      <p className="quiz-subtitle">
        {/* Enter all factors for each number (separated by commas). You’ll only see
        how many are correct or missing. */}
        請輸入每個數字的所有因數（以逗號分隔）。您只會看到答對與遺漏的「數量」
      </p>

      <div className="number-grid">
        {numbers.map(({ number, factors, isPrime: prime }) => {
          const isSubmitted = submitted[number];
          const result = isSubmitted ? checkAnswer(number, factors) : null;

          return (
            <div key={number} className={`number-card ${prime ? "prime" : ""}`}>
              <div className="number-header">
                <h3 className="number-title">{number}</h3>
                {/* {prime && <span className="prime-badge">PRIME</span>} */}
                {prime && <span className="prime-badge">質數</span>}
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
                  {/* Submit */}
                    提交
                </button>
              ) : (
                <div className="result-section">
                  {result.correct.length === factors.length ? (
                    <div className="result-perfect">🎉 Perfect! All correct!</div>
                  ) : (
                    <>
                      <div className="result-summary">
                        {/* ✅ {result.correct.length} correct */}
                        ✅ 答對 {result.correct.length} 個因數
                      </div>
                      <div className="result-summary">
                        {/* ⚠ {result.missing.length} missing */}
                        ⚠ 尚缺{result.missing.length} 個因數 （請補充）
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
                    {/* Try Again */}
                        再試一次
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* <div className="instructions">
        <h2>Instructions:</h2>
        <ul>
          <li>Type all factors separated by commas (e.g., "1, 2, 4").</li>
          <li>Prime numbers are highlighted in yellow.</li>
          <li>
            You will only see how many are correct and how many are missing.
          </li>
          <li>Try to reach a perfect score for each number!</li>
        </ul>
      </div> */}
    </div>
  );
};

export default HigherLevelPractice;
