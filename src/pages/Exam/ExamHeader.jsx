import React from 'react';
import Timer from "../../components/Timer/Timer";
import {THEME_COLOR} from "../../common/common";

const ExamHeader = ({answers, handleSubmit}) => {
  const isDisabled = answers.length !== 40;

  const submitBtnStyle = {
    background: isDisabled ? '#ccd1d2' : THEME_COLOR,
    color: '#fff'
  }

  return (
    <div className="exam-header header">
      <div className="timer">
        <Timer/>
      </div>
      <div className={`submit rect-round-button ${isDisabled ? 'disable' : ''}`}
           style={submitBtnStyle}
           onClick={() => isDisabled ? null : handleSubmit()}
      >
        Submit
      </div>
    </div>
  );
};

export default ExamHeader;
