import React, {useEffect, useState} from 'react';
import Timer from "../../components/Timer/Timer";
import {loadExamFromLocalStorage, loadFromLocalStorage, THEME_COLOR} from "../../common/common";

const ExamHeader = ({handleSubmit, submitLabel}) => {
  const [isActive, setIsActive] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(true);

  useEffect(() => {
    const exam = loadExamFromLocalStorage();
    const secondsLeft = loadFromLocalStorage('secondsLeft', 0);
    setSecondsLeft(secondsLeft);
    const {completed} = exam;
    setIsActive(!completed);
  }, [])

  const submitBtnStyle = {
    background: THEME_COLOR,
    color: '#fff'
  }

  return (
    <div className="exam-header header">
      <div className="timer">
        <Timer isActive={isActive} totalSeconds={secondsLeft}/>
      </div>
      <div className={`submit rect-round-button`}
           style={submitBtnStyle}
           onClick={() => handleSubmit()}
      >
        {submitLabel}
      </div>
    </div>
  );
};

export default ExamHeader;
