import React, {useEffect} from 'react';
import {THEME_COLOR} from '../../common/common';

const QuestionInfo = ({
                        currQuestion,
                        filteredQuestions,
                      }) => {

  const [questionIndex, setQuestionIndex] = React.useState(0);

  useEffect(() => {
    const idx = filteredQuestions.findIndex(q => q.id === currQuestion?.id);
    setQuestionIndex(idx);
  }, [filteredQuestions, currQuestion])

  return (
    <div className="content-head">
      <div className="question-type rect-round-button active" style={{color: THEME_COLOR}}>
        <span>{currQuestion?.section}</span>
      </div>
      <div className="question-num rect-round-button">
        <span className="question-index" style={{color: THEME_COLOR}}>
          {questionIndex + 1}
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
