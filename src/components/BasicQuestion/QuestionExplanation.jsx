import React from 'react';
import {CORRECT_COLOR, ERROR_COLOR, OPTION_LABELS, THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";

const QuestionExplanation = ({
                               currQuestion,
                               isCN=false,
                               isAnswerError=false,
                               isExplain=false,
                               isCheck=false,
                               handleCheck=()=>{},
                               isStick=false,
                               handleStick=()=>{},
                               isEdit = true
                             }) => {

  const color = isExplain ? (isAnswerError ? ERROR_COLOR : CORRECT_COLOR) : THEME_COLOR;
  const answerStyle = {
    border: `1px solid ${color}`,
    color: color
  }

  return (
    <>
      {isExplain ? (<div className="answer" style={answerStyle}>
        <div className="answer-content">
          <div className="answer-text">
            <span>{isCN ? "正确答案：" : "Answer: "}</span>
            <span>{OPTION_LABELS[currQuestion.correct_answer]}</span>
          </div>
          {
            isEdit ? (
              <div className="stick-box">
                <div className={isCheck ? 'active' : ''} onClick={handleCheck}>{getIcon('check')}</div>
                <div className={isStick ? 'active' : ''} onClick={handleStick}>{getIcon('thumb_tack')}</div>
              </div>
            ) : ""
          }
        </div>

        <div className="explanation">
          {currQuestion.explanation}
        </div>
      </div>) : ""}
    </>
  );
};

export default QuestionExplanation;
