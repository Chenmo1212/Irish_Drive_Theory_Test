import React from 'react';
import {CORRECT_COLOR, ERROR_COLOR, OPTION_LABELS, THEME_COLOR,} from '../../common/common';

const QuestionContent = ({
                           isExplain,
                           isAnswerError,
                           currQuestion,
                           chosenAnswerIndex,
                           handleOptionClick
                         }) => {

  const color = isExplain ? (isAnswerError ? ERROR_COLOR : CORRECT_COLOR) : THEME_COLOR;
  const chosenOptionStyle = {
    border: `1px solid ${color}`,
    color: color
  }

  const getOptionLabel = (idx) => {
    return OPTION_LABELS[idx] + ": "
  }

  return (
    <div className="question-content">
      <div className="question-text">
        Q: {currQuestion?.question}

        {currQuestion?.image_name ?
          <p className="question-img"><img src={require(`../../assets/images/${currQuestion?.image_name}`)} alt=""/>
          </p> : <></>}
      </div>

      <div className="options">
        {currQuestion?.options?.map((option, idx) => (
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
