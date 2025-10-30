import React, { useState, useMemo } from 'react';
import './FactorQuiz.css';

const FactorQuiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

  // Calculate all factors for a number
  const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  // Check if a number is prime
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
    if (!input || input.trim() === '') return [];
    return input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));
  };

  const checkAnswer = (num, correctFactors) => {
    const userInput = parseUserInput(userAnswers[num] || '');
    const correctSet = new Set(correctFactors);
    const userSet = new Set(userInput);

    const correct = userInput.filter((f) => correctSet.has(f));
    const incorrect = userInput.filter((f) => !correctSet.has(f));
    const missing = correctFactors.filter((f) => !userSet.has(f));

    return { correct, incorrect, missing };
  };

  return (
    <div className="factor-quiz-container">
      {/* <h1 className="quiz-title">Number Factor Quiz</h1> */}
       <h1 className="quiz-title">1-100 因數挑戰  - 基礎級</h1>
      <p className="quiz-subtitle">
        {/* Enter all factors for each number (separated by commas), then click Submit */}
        輸入每個數字的所有因數（以逗號分隔），然後點擊提交
      </p>

      <div className="number-grid">
        {numbers.map(({ number, factors, isPrime: prime }) => {
          const isSubmitted = submitted[number];
          const result = isSubmitted ? checkAnswer(number, factors) : null;

          return (
            <div
              key={number}
              className={`number-card ${prime ? 'prime' : ''}`}
            >
              <div className="number-header">
                <h3 className="number-title">{number}</h3>
                {/* {prime && <span className="prime-badge">PRIME</span>} */}
                {prime && <span className="prime-badge">質數</span>}
              </div>

              <input
                type="text"
                placeholder="e.g., 1, 2, 4"
                value={userAnswers[number] || ''}
                onChange={(e) => handleInputChange(number, e.target.value)}
                disabled={isSubmitted}
                className="factor-input"
              />

              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmit(number, factors)}
                  className="btn btn-submit"
                >
                  提交
                </button>
              ) : (
                <div className="result-section">
                  {result.correct.length > 0 && (
                    <div className="result-correct">
                      {/* ✓ Correct: {result.correct.join(', ')} */}
                        ✅ <strong>正確因數</strong>：{result.correct.join('、')}
                    </div>
                  )}
                  {result.incorrect.length > 0 && (
                    <div className="result-incorrect">
                      {/* ✗ Incorrect: {result.incorrect.join(', ')} */}
                        ❌ <strong>錯誤因數</strong>：{result.incorrect.join('、')}（請移除）
                    </div>
                  )}
                  {result.missing.length > 0 && (
                    <div className="result-missing">
                      {/* ⚠ Missing: {result.missing.join(', ')} */}
                        ⚠ 缺少的因數: {result.missing.join(', ')}（請補充）
                    </div>
                  )}
                  {result.correct.length === factors.length &&
                    result.incorrect.length === 0 && (
                    //   <div className="result-perfect">🎉 Perfect!</div>
                        <div className="result-perfect">🎉 全部正確！太棒了！</div>
                    )}

                  <button
                    onClick={() => {
                      setSubmitted((prev) => ({ ...prev, [number]: false }));
                      setUserAnswers((prev) => ({ ...prev, [number]: '' }));
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
          <li>Enter all factors of each number separated by commas (e.g., "1, 2, 4")</li>
          <li>Prime numbers are highlighted in yellow</li>
          <li>Click "Submit" to check your answer</li>
          <li>Green shows correct factors, red shows incorrect ones, orange shows missing factors</li>
          <li>Click "Try Again" to reset and try again</li>
        </ul>
      </div> */}
    </div>
  );
};

export default FactorQuiz;


