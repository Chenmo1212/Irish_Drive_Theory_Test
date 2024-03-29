import React from 'react';
import {THEME_COLOR} from '../../common/common';

const QuestionInfo = ({
                        currQuestion,
                        currQuestionIndex,
                        questions,
                      }) => {

  return (
    <div className="content-head">
      <div className="question-type rect-round-button active" style={{color: THEME_COLOR}}>
        <span>{currQuestion?.section}</span>
      </div>
      <div className="question-num rect-round-button">
        <span className="question-index" style={{color: THEME_COLOR}}>
          {currQuestionIndex + 1}
        </span>
        &nbsp;/&nbsp;
        <span className="question-num-item">
          {questions.length}
        </span>
      </div>
    </div>
  );
};

export default QuestionInfo;
