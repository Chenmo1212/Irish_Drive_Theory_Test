import React from 'react';
import {useNavigate} from "react-router-dom";
import PageHeader from "../../components/Header/PageHeader";
import {DELETE_SOUND, playSound, removeFromLocalStorage} from "../../common/common";

const HeaderSection = ({isShowWrong, setShowWrong, isShowFavorite, setShowFavorite, isCN}) => {
  const navigate = useNavigate();

  const backDetail = () => {
    navigate(-1);
  }

  const clearLocalAnswers = () => {
    removeFromLocalStorage(['allAnswers', 'userAnswers'])
    alert("All your answers have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

  const clearLocalStorage = () => {
    removeFromLocalStorage(['isAnswerStick', 'isAnswerCheck', 'currQuestionIdx',
      'userAnswers', 'allQuestions', 'questionsConfig']);
    alert("All data have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

  const rightIcons = [
    {
      name: 'wrong',
      action: () => setShowWrong(!isShowWrong),
      active: isShowWrong,
    }, {
      name: 'fav',
      action: () => setShowFavorite(!isShowFavorite),
      active: isShowFavorite,
    }, {
      name: 'clear',
      action: clearLocalAnswers,
    }, {
      name: 'trash',
      action: clearLocalStorage,
    }
  ]

  return (
    <PageHeader
      pageTitle={isCN ? '答题概览' : 'Overview'}
      handleBack={backDetail}
      rightIcons={rightIcons}
    />
  );
}

export default HeaderSection;
