import React from 'react';
import './LineGraph.css';

const LineGraph = () => {
  return (
    <svg className="line-graph" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        className="line"
        points="0,50 10,40 20,60 30,30 40,70 42,60 50,20 60,80 70,40 80,60 90,30 100,50"
        fill="none"
        stroke="rgba(255, 165, 0, 0.3)" /* Lighter shade of orange */
        strokeWidth="0.3" /* Make the line thinner */
      />
    </svg>
  );
};

export default LineGraph;
