import React from 'react';
import {getIcon} from "../../styles/icons";
import {CLICK_SOUND, playSound, THEME_COLOR} from '../../common/common';
import {useNavigate} from "react-router-dom";

const QuestionFooter = ({
                          toggleShowAnswer,
                          changeQuestion,
                          isShowAnswer,
                          filteredQuestions,
                          currQuestionIndex
                        }) => {
  const navigate = useNavigate();

  const toOverview = () => {
    navigate('/overview');
    playSound(CLICK_SOUND);
  }

  const isFirstQuestion = () => {
    let filteredIndex = filteredQuestions.findIndex(q => q.index === (currQuestionIndex + 1));
    return filteredIndex === 0;
  }

  const isLastQuestion = () => {
    let filteredIndex = filteredQuestions.findIndex(q => q.index === (currQuestionIndex + 1));
    return filteredIndex === filteredQuestions.length - 1;
  }

  return (
    <div className="question-footer">
      <div className="menu-card" style={{color: THEME_COLOR}}>
        <div className="menu-item all-question" onClick={toOverview}>
          {getIcon('fa_th')}
        </div>
        <div className="menu-item show-answer" onClick={toggleShowAnswer}>
          {getIcon(isShowAnswer ? 'eye_slash' : 'eye')}
        </div>
        <div className={`menu-item pre-question ${isFirstQuestion() ? 'disable' : ''}`}
             onClick={() => {
               if (!isFirstQuestion()) changeQuestion(-1)
             }}>
          {getIcon('arrow_left')}
        </div>
        <div
          className={`menu-item next-question ${isLastQuestion() ? 'disable' : ''}`}
          onClick={() => {
            if (!isLastQuestion()) changeQuestion(1)
          }}>
          {getIcon('arrow_right')}
        </div>
      </div>
    </div>
  );
};

export default QuestionFooter;
