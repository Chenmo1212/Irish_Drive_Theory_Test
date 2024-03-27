import React, {useEffect, useState} from 'react';
import './Chart.css'
import {THEME_COLOR} from "../../common/common";

const ExamResultChart = ({title, score}) => {
  const r = 40;
  const circumference = 2 * r * Math.PI;
  const initialState = `0 ${circumference}`;
  const [endState, setEndState] = useState(initialState);

  useEffect(() => {
    setEndState(`${score / 40 * circumference} ${circumference}`)
  }, [score])

  return (
    <div className="chart">
      <div className="chart-label">
        <span className="t2">{title}</span>
        <span className="text-muted">{score}</span>
      </div>
      <svg className="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           preserveAspectRatio="xMidYMid meet">
        <linearGradient id="svg-gradient" gradientUnits="userSpaceOnUse" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor: '#3592c4'}}/>
          <stop offset="100%" style={{stopColor: THEME_COLOR}}/>
        </linearGradient>
        <circle r={r} cx="50" cy="50" strokeWidth="7" fill="transparent" stroke="#E2E8F0"/>
        <circle id="chart_fill" r={r} cx="50" cy="50" strokeWidth="7" strokeDasharray='0 251'
                strokeDashoffset="0" transform="rotate(-90 50 50)"
                fill="transparent" stroke="url(#svg-gradient)" strokeLinecap="round" className="meter">
          <animate attributeName="stroke-dasharray"
                   from={initialState}
                   to={endState}
                   dur="2s"
                   fill="freeze"
                   begin="0.3s"/>
        </circle>
      </svg>
    </div>
  );
}

export default ExamResultChart;