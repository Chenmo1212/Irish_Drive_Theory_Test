import React from 'react';
import Timer from "../../components/Timer/Timer";
import {THEME_COLOR} from "../../common/common";

const ExamHeader = ({handleSubmit}) => {
  const submitBtnStyle = {
    background: THEME_COLOR,
    color: '#fff'
  }

  return (
    <div className="exam-header header">
      <div className="timer">
        <Timer/>
      </div>
      <div className={`submit rect-round-button`}
           style={submitBtnStyle}
           onClick={() => handleSubmit()}
      >
        Submit
      </div>
    </div>
  );
};

export default ExamHeader;
