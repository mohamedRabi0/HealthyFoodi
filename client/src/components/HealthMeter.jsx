import React from 'react';
import './HealthMeter.css';

const HealthMeter = ({ food }) => {
  const { sugar, protein, calories } = food;
  const score = Math.max(0, 100 - (parseInt(sugar) + parseInt(calories) / 10) + parseInt(protein) * 2);

  return (
    <div className="health-meter">
      <div className="meter-bar" style={{ width: `${score}%` }}> 
      <p>Health Score: {score}/100</p>
      </div>
      
    </div>
  );
};

export default HealthMeter;