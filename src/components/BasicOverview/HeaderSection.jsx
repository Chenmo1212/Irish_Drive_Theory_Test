import React from 'react';
import {useNavigate} from "react-router-dom";
import PageHeader from "../Header/PageHeader";
import {DELETE_SOUND, playSound, removeFromLocalStorage} from "../../common/common";

const HeaderSection = ({isShowWrong, setShowWrong, isShowFavorite, setShowFavorite, isCN, isShowRight=true}) => {
  const navigate = useNavigate();

  const backDetail = () => {
    navigate(-1);
  }

  const clearLocalAnswers = () => {
    playSound(DELETE_SOUND);
    const myConfirm = window.confirm;
    if (myConfirm("Do you want to clear user data? This operation is irreversible.")) {
      removeFromLocalStorage(['userAnswers'])
      alert("All your answers have been cleared!");
      window.location.reload();
    }
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
    }
  ]

  return (
    <PageHeader
      pageTitle={isCN ? '答题概览' : 'Overview'}
      handleBack={backDetail}
      rightIcons={isShowRight ? rightIcons : []}
    />
  );
}

export default HeaderSection;
