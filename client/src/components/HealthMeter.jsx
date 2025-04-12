import React from 'react';
import './HealthMeter.css';

const HealthMeter = ({ food }) => {
  const { sugar, protein, calories } = food;

  let rawScore = 100 - parseInt(sugar) - (parseInt(calories) / 10) + parseInt(protein) * 2;
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  let comment = '';
  if (score >= 70) {
    comment = "Looks healthy!";
  } else if (score >= 40) {
    comment = "Moderately healthy, keep an eye on sugar or calories.";
  } else {
    comment = "Unhealthy. Try cutting back on sugar or calories.";
  }

  return (
    <div className="health-meter-container">
      <div className="health-meter">
        <div className="meter-bar" style={{ width: `${score}%` }} />
        <span className="score-text">Health Score: {score}/100</span>
      </div>
      <p className="health-comment">{comment}</p>
    </div>
  );
};

export default HealthMeter;
