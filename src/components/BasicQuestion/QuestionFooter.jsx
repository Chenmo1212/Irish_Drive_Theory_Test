import React from 'react';
import {getIcon} from "../../styles/icons";
import {CLICK_SOUND, playSound, THEME_COLOR} from '../../common/common';
import {useNavigate} from "react-router-dom";

const QuestionFooter = ({
                          isExplain,
                          currQuestion,
                          changeQuestion,
                          toggleExplanation
                        }) => {
  const {isPrev, isNext} = currQuestion;
  const navigate = useNavigate();

  const toOverview = () => {
    navigate('/overview');
    playSound(CLICK_SOUND);
  }

  const MENU_ITEM = [{
    name: 'all',
    action: toOverview,
    activeIcon: 'fa_th',
  }, {
    name: 'explanation',
    action: toggleExplanation,
    activeIcon: 'eye_slash',
    inactiveIcon: 'eye',
    active: isExplain
  }, {
    name: 'prev',
    action: () => {
      if (isPrev) changeQuestion(-1)
    },
    activeIcon: 'arrow_left',
    disabled: !isPrev
  }, {
    name: 'next',
    action: () => {
      if (isNext) changeQuestion(1)
    },
    activeIcon: 'arrow_right',
    disabled: !isNext
  }]

  return (
    <div className="question-footer">
      <div className="menu-card" style={{color: THEME_COLOR}}>
        {MENU_ITEM.map((item, index) => (
          <div key={index} onClick={item.action}
               className={`menu-item ${item.name} ${item.disabled ? "disable" : ""}`}>
            {getIcon(item.active ? item.activeIcon : (item.inactiveIcon || item.activeIcon))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionFooter;
