import React from 'react';
import {getIcon} from "../../styles/icons";
import {CLICK_SOUND, playSound, THEME_COLOR} from '../../common/common';
import {useNavigate} from "react-router-dom";

const QuestionFooter = ({
                          toggleShowExplanation,
                          changeQuestion,
                          filteredQuestions,
                          currQuestionIndex
                        }) => {
  const navigate = useNavigate();

  const toOverview = () => {
    navigate('/overview');
    playSound(CLICK_SOUND);
  }

  const isFirstQuestion = () => {
    return currQuestionIndex === 0;
  }

  const isLastQuestion = () => {
    return currQuestionIndex === filteredQuestions.length - 1;
  }

  const MENU_ITEM = [{
    name: 'all',
    action: toOverview,
    activeIcon: 'fa_th',
  }, {
    name: 'explanation',
    action: toggleShowExplanation,
    activeIcon: 'eye_slash',
    inactiveIcon: 'eye',
  }, {
    name: 'prev',
    action: () => {
      if (!isFirstQuestion()) changeQuestion(-1)
    },
    activeIcon: 'arrow_left',
    disabled: isFirstQuestion()
  }, {
    name: 'next',
    action: () => {
      if (!isLastQuestion()) changeQuestion(1)
    },
    activeIcon: 'arrow_right',
    disabled: isLastQuestion()
  }]

  return (
    <div className="question-footer">
      <div className="menu-card" style={{color: THEME_COLOR}}>
        {MENU_ITEM.map((item, index) => (
          <div key={index} onClick={item.action}
               className={`menu-item ${item.name} ${item.disabled ? "disable" : ""}`}>
            {getIcon(item.active ? item.activeIcon : (item.inactiveName || item.activeIcon))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionFooter;
