import React from 'react';
import {THEME_COLOR} from '../../common/common';

const QuestionInfo = ({
                        currQuestion,
                        currQuestionIndex,
                        filteredQuestions,
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
        /
        <span className="question-num-item">
          {filteredQuestions.length}
        </span>
      </div>
    </div>
  );
};

export default QuestionInfo;
