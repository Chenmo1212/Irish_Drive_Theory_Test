import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PageHeader from "../Header/PageHeader";
import {DELETE_SOUND, playSound, removeFromLocalStorage} from "../../utils/helper";
import BasicModal from "../BasicModal/BasicModal";
import BasicAlert from "../BasicAlert/BasicAlert";
import {useIntro} from "../../store/config.store";
import {setOverviewIntro} from "../../utils/intro";

const HeaderSection = ({
  isShowWrong,
  setShowWrong,
  isShowFavorite,
  setShowFavorite,
  isCN,
  isShowRight = true,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const alertRef = useRef();
  const navigate = useNavigate();
  const {isOverviewIntro: isOverviewIntroFinished, update: updateIntro} = useIntro();

  const handleOverviewIntro = (isCompleted) => {
    if (!isCompleted) {
      setOverviewIntro(isCN, updateIntro);
    }
  }

  useEffect(() => {
    handleOverviewIntro(isOverviewIntroFinished)
  }, [isOverviewIntroFinished, handleOverviewIntro]);

  const toggleModal = () => setModalShow(!modalShow);
  const backDetail = () => {
    navigate(-1);
  }

  const handleClear = () => {
    toggleModal();
  }
  const clearLocalAnswers = () => {
    removeFromLocalStorage(['ddt-answers']);
    alertRef.current.handleAlert();
    playSound(DELETE_SOUND);
    toggleModal();
    setTimeout(() => window.location.reload(), 3000);
  }

  const rightIcons = [
    {
      name: 'question',
      action: () => handleOverviewIntro(false),
      active: false,
    }, {
      name: 'wrong',
      action: () => setShowWrong(!isShowWrong),
      active: isShowWrong,
    }, {
      name: 'fav',
      action: () => setShowFavorite(!isShowFavorite),
      active: isShowFavorite,
    }, {
      name: 'clear',
      action: handleClear,
    }
  ]

  return (
    <>
      <PageHeader
        pageTitle={isCN ? '答题概览' : 'Overview'}
        handleBack={backDetail}
        rightIcons={isShowRight ? rightIcons : []}
      />
      <BasicAlert ref={alertRef} warning={isCN ? "你的所有数据都已被清除！" : "All your answers have been cleared!"}/>
      <BasicModal
        title={isCN ? '警告' : 'Warning'}
        text={isCN ? '您想清除用户数据吗？此操作是不可逆的!' : "Do you want to clear user data? This operation is irreversible."}
        submitText={isCN ? '确定' : 'Confirm'}
        cancelText={isCN ? '取消' : 'Cancel'}
        show={modalShow}
        onClose={toggleModal}
        onSubmit={clearLocalAnswers}
      />
    </>
  );
}

export default HeaderSection;
