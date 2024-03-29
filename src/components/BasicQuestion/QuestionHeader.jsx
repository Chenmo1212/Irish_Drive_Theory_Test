import React from 'react';
import PageHeader from "../Header/PageHeader";
import {useNavigate} from "react-router-dom";

const QuestionHeader = ({
                        isCN=false,
                        toggleLanguage=()=>{},
                        toggleFavourite=()=>{},
                        isFavorite=false,
                      }) => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  }

  const rightIcons = [
    {
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
