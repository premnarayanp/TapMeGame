import '../styles/ProgressBar.css';
import React from 'react';

interface ProgressBarProps {
  progressPercentage: number;
  burn: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage, burn }) => {
  return (
    <div className="progress-bar-container">
      {/* Progress bar with percentage inside */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="progress-text">{progressPercentage.toFixed(2)}%</span>
        </div>
      </div>
      {/* Burn count below the progress bar */}
      <div className="burn-count">
        🔥 {burn}/1000
      </div>
    </div>
  );
};

export default ProgressBar;
