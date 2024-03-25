import React from 'react';
import {
  OPTION_LABELS,
  THEME_COLOR,
} from '../../common/common';

const QuestionContent = ({
                           currQuestion,
                           chosenAnswerIndex,
                           handleOptionClick
                         }) => {

  const chosenOptionStyle = {
    border: `1px solid ${THEME_COLOR}`,
    color: THEME_COLOR
  }

  const getOptionLabel = (idx) => {
    return OPTION_LABELS[idx] + ": "
  }

  return (
    <div className="question-content">
      <div className="question-text">
        Q: {currQuestion.question}

        {currQuestion.question_img_url ?
          <p className="question-img"><img src={currQuestion.question_img_url} alt=""/></p> : <></>}
      </div>

      <div className="options">
        {currQuestion.options?.map((option, idx) => (
          <div className={`btn rect-round-button ${chosenAnswerIndex === idx ? " active" : ""}`}
               key={option + idx}
               style={chosenAnswerIndex === idx ? chosenOptionStyle : {}}
               onClick={() => handleOptionClick(idx)}
          >
            <span>{getOptionLabel(idx)}</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionContent;
