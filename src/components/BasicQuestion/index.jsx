import React, {useEffect, useState} from 'react';
import './index.css'
import QuestionHeader from "./QuestionHeader";
import {CLICK_SOUND, CORRECT_SOUND, NORMAL_SOUND, playSound, WRONG_SOUND} from "../../common/common";
import QuestionFooter from "./QuestionFooter";
import QuestionInfo from "./QuestionInfo";
import QuestionContent from "./QuestionContent";
import QuestionExplanation from "./QuestionExplanation";

const BasicQuestion = ({
                         questions,
                         currQuestion,
                         currQuestionIndex,
                         currQuestionConfig,
                         updateCurrQuestionConfig,
                         questionsConfig,
                         updateQuestionsConfig,
                         setSearchParams,
                         handleQuestionLanguage,
                       }) => {

  const [isAnswerError, setIsAnswerError] = useState(false);
  const [isExplain, setIsExplain] = useState(false);
  const {isCN, isStick, isCheck} = questionsConfig;
  const {isFavorite, userAnswer} = currQuestionConfig;
  const {correct_answer: correctAnswer} = currQuestion;

  useEffect(() => {
    setIsAnswerError(userAnswer !== correctAnswer);
  }, [correctAnswer, userAnswer]);

  useEffect(() => {
    if (isStick) setIsExplain(true);
  }, [isStick, currQuestionIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '1':
        case 'A':
        case 'a':
          handleOptionClick(0);
          break;
        case '2':
        case 'B':
        case 'b':
          handleOptionClick(1);
          break;
        case '3':
        case 'C':
        case 'c':
          handleOptionClick(2);
          break;
        case '4':
        case 'D':
        case 'd':
          handleOptionClick(3);
          break;
        case 'F':
        case 'f':
          toggleFavourite();
          break;
        case 'T':
        case 't':
          toggleLanguage();
          break;
        case 'ArrowLeft':
          changeQuestion(-1);
          break;
        case 'ArrowRight':
          changeQuestion(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [currQuestionIndex]);

  const toggleExplanation = () => {
    setIsExplain(!isExplain);
    playSound(CLICK_SOUND);
  }

  const toggleLanguage = () => {
    updateQuestionsConfig({isCN: !isCN});
    handleQuestionLanguage(!isCN);
    playSound(CLICK_SOUND);
  }

  const toggleFavourite = () => {
    updateCurrQuestionConfig({isFavorite: !isFavorite})
    playSound(CLICK_SOUND);
  }

  const handleStick = () => {
    updateQuestionsConfig({isStick: !isStick})
    playSound(CLICK_SOUND);
  };
  const handleCheck = () => {
    updateQuestionsConfig({isCheck: !isCheck})
    playSound(CLICK_SOUND);
  };

  const handleOptionClick = (idx) => {
    const isError = idx !== correctAnswer;
    setIsAnswerError(isError);
    updateCurrQuestionConfig({userAnswer: idx})
    if (isCheck) setIsExplain(true);

    let sound = NORMAL_SOUND;
    if (isCheck || isExplain) {
      sound = isError ? WRONG_SOUND : CORRECT_SOUND;
    }
    playSound(sound);
  }

  const changeQuestion = (increment) => {
    setIsExplain(false);
    if (currQuestionIndex <= 0 && increment === -1) return;
    let newIndex = currQuestionIndex + increment;
    setSearchParams({i: (newIndex + 1).toString()});
    playSound(CLICK_SOUND);
  };

  return (
    <div className="question normal">
      <QuestionHeader
        isCN={isCN}
        toggleLanguage={toggleLanguage}
        toggleFavourite={toggleFavourite}
        isFavorite={isFavorite}
      />

      <div className="content">
        <QuestionInfo
          currQuestion={currQuestion}
          currQuestionIndex={currQuestionIndex}
          questions={questions}
        />

        <div className="content-container">
          <QuestionContent
            isExplain={isExplain}
            isAnswerError={isAnswerError}
            currQuestion={currQuestion}
            chosenAnswerIndex={userAnswer}
            handleOptionClick={handleOptionClick}
          />

          <QuestionExplanation
            isCN={isCN}
            currQuestion={currQuestion}
            isAnswerError={isAnswerError}
            isExplain={isExplain}
            isCheck={isCheck}
            handleCheck={handleCheck}
            isStick={isStick}
            handleStick={handleStick}
          />
        </div>
      </div>

      <QuestionFooter
        isExplain={isExplain}
        currQuestion={currQuestion}
        changeQuestion={changeQuestion}
        toggleExplanation={toggleExplanation}
      />
    </div>
  );
}

export default BasicQuestion;
