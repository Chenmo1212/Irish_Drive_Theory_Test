import React, {useEffect} from 'react';
import Timer from "../../components/Timer/Timer";
import {useExam, useExamCountdown} from "../../store";

const TOTAL_EXAM_SECONDS = 60 * 40;
const ExamHeader = ({handleSubmit, submitLabel}) => {
  const {countdownActive, updateCountdownStatus} = useExamCountdown();
  const {isCompleted} = useExam();

  useEffect(() => {
    updateCountdownStatus(!isCompleted);
  }, [isCompleted, updateCountdownStatus])

  return (
    <div className="exam-header header">
      <div className="timer">
        <Timer isActive={countdownActive} totalSeconds={TOTAL_EXAM_SECONDS}/>
      </div>
      <div className={`submit rect-round-button`}
           onClick={() => handleSubmit()}
      >
        {submitLabel}
      </div>
    </div>
  );
};

export default ExamHeader;
