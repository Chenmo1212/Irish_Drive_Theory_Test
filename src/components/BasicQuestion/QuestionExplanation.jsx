import React from 'react';
import {CLICK_SOUND, CORRECT_COLOR, ERROR_COLOR, OPTION_LABELS, playSound, THEME_COLOR} from '../../utils/helper';
import {getIcon} from "../../styles/icons";
import {useLang, useQuestionConfig} from "../../store";

const QuestionExplanation = ({
  currQuestion,
  isExplain = false,
  isAnswerError = false,
  isEdit = true
}) => {
  const {isCN} = useLang();
  const {isCheck, isStick, update} = useQuestionConfig();

  const color = isExplain ? (isAnswerError ? ERROR_COLOR : CORRECT_COLOR) : THEME_COLOR;
  const answerStyle = {
    border: `1px solid ${color}`,
    color: color
  }

  const handleQuestionConfig = (config = {}) => {
    update(config);
    playSound(CLICK_SOUND);
  };

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
                <div className={isCheck ? 'active' : ''}
                     onClick={() => handleQuestionConfig({isCheck: !isCheck})}
                >
                  {getIcon('check')}
                </div>
                <div className={isStick ? 'active' : ''}
                     onClick={() => handleQuestionConfig({isStick: !isStick})}
                >
                  {getIcon('thumb_tack')}
                </div>
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
