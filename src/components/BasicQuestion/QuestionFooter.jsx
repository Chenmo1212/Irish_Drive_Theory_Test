import React, {useMemo} from 'react';
import {getIcon} from "../../styles/icons";
import {CLICK_SOUND, playSound, THEME_COLOR} from '../../utils/helper';
import {useNavigate} from "react-router-dom";
import {useCurrQuestionIdx, useQuestionConfig} from "../../store";

const QuestionFooter = ({questions, changeQuestion}) => {
  const navigate = useNavigate();
  const {isExplain, update} = useQuestionConfig();
  const {currQuestionIdx} = useCurrQuestionIdx();

  const isPrev = useMemo(() => {
    return currQuestionIdx > 0
  }, [currQuestionIdx]);
  const isNext = useMemo(() => {
    return currQuestionIdx < questions.length - 1
  }, [questions, currQuestionIdx]);

  const toggleExplanation = () => {
    update({isExplain: !isExplain});
    playSound(CLICK_SOUND);
  }

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
