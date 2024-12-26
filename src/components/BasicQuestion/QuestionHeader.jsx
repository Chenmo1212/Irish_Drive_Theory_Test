import React, {useEffect} from 'react';
import PageHeader from "../Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {useIntro} from "../../store/config.store";
import {setQuestionIntro} from "../../utils/intro";

const QuestionHeader = ({
  isCN = false,
  toggleLanguage = () => {
  },
  toggleFavourite = () => {
  },
  isFavorite = false,
}) => {
  const navigate = useNavigate();
  const {isQuestionIntro: isQuestionIntroFinished, update: updateIntro} = useIntro();

  const handleQuestionIntro = (isCompleted) => {
    if (!isCompleted) {
      setQuestionIntro(isCN, updateIntro);
    }
  }

  useEffect(() => {
    handleQuestionIntro(isQuestionIntroFinished)
  }, [isQuestionIntroFinished, handleQuestionIntro]);
  const backHome = () => {
    navigate('/');
  }

  const rightIcons = [
    {
      name: 'question',
      action: () => handleQuestionIntro(false),
      active: false,
    }, {
      name: 'language',
      action: toggleLanguage,
      active: isCN,
    }, {
      name: 'fav',
      inactiveName: "fav_reg",
      action: toggleFavourite,
      active: isFavorite,
    }
  ]

  return (
    <PageHeader
      pageTitle={isCN ? "问题" : "Question"}
      handleBack={backHome}
      rightIcons={rightIcons}
    />
  );
};

export default QuestionHeader;
