import React, { useState, useMemo } from "react";
import "./FactorQuiz.css";

const FullQuizLevel = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);

  const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) if (num % i === 0) factors.push(i);
    return factors;
  };

  const isPrime = (num) => {
    if (num < 2) return false;
    const factors = getFactors(num);
    return factors.length === 2;
  };

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

  const handleInputChange = (num, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  const handleCheckAll = () => {
    if(!checked) {
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
    } else {
      setUserAnswers({});
      setResults({});
      setScore(0);
      setChecked(false);
    }
  };

  return (
    <div className="factor-quiz-container">
      {/* <h1 className="quiz-title">Ultimate Factor Challenge</h1> */}
        <h1 className="quiz-title">1-100 因數大考驗</h1>
       
        <h1 className="quiz-title">- 終極高手挑戰</h1>

      <p className="quiz-subtitle">
        {/* Enter all factors for each number (separated by commas). When you’re
        ready, click “Check All Answers” to see your score! */}
        輸入每個數字的所有因數（以逗號分隔）。準備好後，點擊「檢查所有答案」以查看您的分數！
      </p>

      <div className="button-bar">
        <button className={`btn ${checked ? "btn-retry" : "btn-checkall"}`} onClick={handleCheckAll}>
          {checked ? "再試一次" : "檢查所有答案"}
        </button>
      </div>


      {checked && (
        <div className="score-display">
          {/* Your Score: {score} / {numbers.length} */}
            您的分數：{score} / {numbers.length}
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

          // ✅ Show PRIME badge only if user got it all correct
          const showPrimeBadge = prime && isPerfect;

          return (
            <div key={number} className={`number-card ${cardClass}`}>
              <div className="number-header">
                <h3 className="number-title">{number}</h3>
                {showPrimeBadge && (
                //   <span className="prime-badge">PRIME</span>
                    <span className="prime-badge">質數</span>
                )}
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
                    // <span className="result-perfect">✅ Perfect!</span>
                    <span className="result-perfect">🎉 完美！全部正確！</span>
                  ) : (
                    <>
                      {/* <div>✅ {result.correct.length} correct</div>
                      <div>⚠ {result.missing.length} missing</div> */}
                        <div>✅ 答對 {result.correct.length} 個因數</div>
                        <div>⚠ 尚缺 {result.missing.length} 個因數 （請補充）</div>
                    </>
                  )}
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
          <li>
            Prime numbers will be revealed as <strong>“PRIME”</strong> only after
            you find all their factors correctly.
          </li>
          <li>You can change your answers anytime.</li>
          <li>Click “Check All Answers” again to update your score.</li>
          <li>Green cards are perfect; red cards need more work.</li>
        </ul>
      </div> */}
    </div>
  );
};

export default FullQuizLevel;
