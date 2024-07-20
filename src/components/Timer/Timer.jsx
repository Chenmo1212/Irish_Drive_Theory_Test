import React, {useEffect, useState} from 'react';
import {useExamCountdown} from "../../store";

const ExamTimer = ({isActive, totalSeconds}) => {
  const {secondsLeft, updateSecondsLeft, updateCountdownStatus} = useExamCountdown();
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    updateSecondsLeft(secondsLeft ? secondsLeft : totalSeconds);
    updateCountdownStatus(isActive);

    return () => clearInterval(intervalId);
  }, [intervalId, secondsLeft, totalSeconds, isActive, updateSecondsLeft, updateCountdownStatus]);

  useEffect(() => {
    let intervalId;

    if (isActive && secondsLeft > 0) {
      intervalId = setInterval(() => {
        updateSecondsLeft(secondsLeft - 1);
      }, 1000);
    }

    updateCountdownStatus(isActive);
    setIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [secondsLeft, isActive, updateSecondsLeft, updateCountdownStatus]);

  const toggleTimer = () => {
    updateCountdownStatus(!isActive);
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <span onClick={toggleTimer}>{formatTime()}</span>
    </div>
  );
};

export default ExamTimer;
