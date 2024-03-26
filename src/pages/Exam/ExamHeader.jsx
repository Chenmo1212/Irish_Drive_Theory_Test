import React from 'react';
import Timer from "../../components/Timer/Timer";
import {THEME_COLOR} from "../../common/common";

const ExamHeader = ({totalSeconds}) => {
  const submitBtnStyle = {
    background: THEME_COLOR,
    color: '#fff'
  }

  return (
    <div className="exam-header header">
      <div className="timer">
        <Timer totalSeconds={totalSeconds}/>
      </div>
      <div className="submit rect-round-button" style={submitBtnStyle}>
        Submit
      </div>
    </div>
  );
};

export default ExamHeader;
