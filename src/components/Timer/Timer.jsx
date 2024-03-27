import React, {useEffect, useState} from 'react';

const ExamTimer = ({isActive, totalSeconds}) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [timerActive, setTimerActive] = useState(isActive);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const storedSeconds = localStorage.getItem('secondsLeft');
    const isActive = localStorage.getItem('timerActive') === 'true';

    setSecondsLeft(storedSeconds ? parseInt(storedSeconds, 10) : totalSeconds);
    setTimerActive(isActive);

    return () => clearInterval(intervalId);
  }, [intervalId]);

  useEffect(() => {
    let intervalId;

    if (isActive && timerActive && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          localStorage.setItem('secondsLeft', newSeconds.toString());
          return newSeconds;
        });
      }, 1000);
    }

    localStorage.setItem('timerActive', (isActive && timerActive).toString());
    setIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [timerActive, secondsLeft]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  // const resetTimer = () => {
  //   setSecondsLeft(totalSeconds);
  //   setTimerActive(false);
  //   localStorage.setItem('secondsLeft', totalSeconds.toString());
  //   localStorage.setItem('timerActive', 'false');
  // };

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
