import React from 'react';
import {ERROR_COLOR, OPTION_LABELS, THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";

const QuestionExplain = ({
                           isCN,
                           currQuestion,
                           isShowAnswer,
                           isCheck,
                           handleCheck,
                           isStick,
                           isError,
                           handleStick,
                           isShowAnswerInErrorMode,
                           handleIsShowAnswerInErrorMode,
                         }) => {
  const answerStyle = {
    border: `1px solid ${isError ? ERROR_COLOR : THEME_COLOR}`,
    color: isError ? ERROR_COLOR : THEME_COLOR
  }

  return (
    <>
      {isShowAnswer ? (<div className="answer" style={answerStyle}>
        <div className="answer-content">
          <div className="answer-text">
            <span>{isCN ? "正确答案：" : "Answer: "}</span>
            <span>{OPTION_LABELS[currQuestion.correct_answer]}</span>
          </div>
          <div className="stick-box">
            <div className={isShowAnswerInErrorMode ? 'active' : ''}
                 onClick={handleIsShowAnswerInErrorMode}>{getIcon('eye_slash')}</div>
            <div className={isCheck ? 'active' : ''} onClick={handleCheck}>{getIcon('check')}</div>
            <div className={isStick ? 'active' : ''} onClick={handleStick}>{getIcon('thumb_tack')}</div>
          </div>
        </div>

        <div className="explanation">
          {currQuestion.explanation}
        </div>
      </div>) : ""}
    </>
  );
};

export default QuestionExplain;
