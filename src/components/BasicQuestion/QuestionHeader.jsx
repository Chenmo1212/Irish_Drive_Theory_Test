import React, {useEffect, useState} from 'react';
import PageHeader from "../Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {useIntro} from "../../store/config.store";
import {setQuestionIntro} from "../../utils/intro";
import {useQuestionConfig} from "../../store";

const QuestionHeader = ({
  isCN = false,
  toggleLanguage = () => {
  },
  toggleFavourite = () => {
  },
  isFavorite = false,
}) => {
  const navigate = useNavigate();

  const [isHandleIntro, setHandleIntro] = useState(false);
  const {isQuestionIntro: isQuestionIntroFinished, update: updateIntro} = useIntro();
  const {isExplain, update: updateQuestionConfig} = useQuestionConfig();

  const handleQuestionIntro = (isCompleted) => {
    if (!isCompleted) {
      setHandleIntro(true);
      updateQuestionConfig({isExplain: true});
    }
  }

  useEffect(() => {
    if (isExplain && isHandleIntro) {
      setQuestionIntro(isCN, updateIntro);
      setHandleIntro(false);
    }
  }, [isExplain, isHandleIntro]);

  useEffect(() => {
    handleQuestionIntro(isQuestionIntroFinished)
  }, [isQuestionIntroFinished]);

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
