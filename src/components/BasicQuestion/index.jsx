import React, {useEffect, useState} from 'react';
import QuestionFooter from "./QuestionFooter";
import QuestionContent from "./QuestionContent";
import QuestionExplanation from "./QuestionExplanation";
import QuestionInfo from "./QuestionInfo";
import QuestionHeader from "./QuestionHeader";
import {
  CLICK_SOUND,
  CORRECT_SOUND,
  NORMAL_SOUND,
  playSound,
  saveToLocalStorage,
  WRONG_SOUND
} from "../../common/common";
import {useNavigate, useParams} from "react-router-dom";
import './index.css'

const BasicQuestion = ({
                         isCN,
                         setIsCN,
                         isFavourite,
                         setIsFavourite,
                         questions,
                         handleQuestions,
                         currQuestionIndex,
                         updateUserAnswers,
                         chosenAnswerIndex,
                         setChosenAnswerIndex,
                         isExplain,
                         setIsExplain,
                         isCheck,
                         setIsCheck,
                         isStick,
                         setIsStick,
                         filteredQuestions
                       }) => {

  const [isAnswerError, setIsAnswerError] = useState(false);
  const [currQuestion, setCurrQuestion] = useState({});

  const {index} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let q = filteredQuestions.find(q => q.id === currQuestion?.id);
    if (q) setIsAnswerError(q['correct_answer'] !== chosenAnswerIndex);
  }, [filteredQuestions, chosenAnswerIndex, currQuestion])

  useEffect(() => {
    setCurrQuestion(questions[currQuestionIndex]);
  }, [currQuestionIndex, questions])

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
  }, [index, currQuestionIndex]);

  const toggleShowExplanation = () => {
    setIsExplain(!isExplain);
    playSound(CLICK_SOUND);
  }

  const toggleLanguage = () => {
    setIsCN(!isCN);
    setCurrQuestion(questions[currQuestionIndex]);
    saveToLocalStorage('isCN', !isCN);
    playSound(CLICK_SOUND);
    handleQuestions(!isCN);
  }

  const toggleFavourite = () => {
    updateUserAnswers(currQuestion.id, !isFavourite, true);
    setIsFavourite(!isFavourite);
    playSound(CLICK_SOUND);
  }

  const handleStick = () => {
    setIsStick(!isStick);
    saveToLocalStorage('isAnswerStick', !isStick);
    playSound(CLICK_SOUND);
  };
  const handleCheck = () => {
    setIsCheck(!isCheck);
    saveToLocalStorage('isAnswerCheck', !isCheck);
    playSound(CLICK_SOUND);
  };

  const handleOptionClick = (idx) => {
    setChosenAnswerIndex(idx);
    const isError = idx !== currQuestion.correct_answer;
    setIsAnswerError(isError);
    updateUserAnswers(currQuestion.id, idx);
    if (isCheck) setIsExplain(true);

    let sound = NORMAL_SOUND;
    if (isCheck || isExplain) {
      sound = isError ? WRONG_SOUND : CORRECT_SOUND;
    }
    playSound(sound);
  }

  const changeQuestion = (increment) => {
    if (index <= 0 && increment === -1) return;
    setChosenAnswerIndex(-1);
    setIsExplain(false);
    const filteredIndex = filteredQuestions.findIndex(q => q.index === (currQuestionIndex + 1));
    let newIndex = filteredIndex + increment;
    newIndex = newIndex <= 0 ? 0 : newIndex;
    newIndex = newIndex >= filteredQuestions.length ? filteredQuestions.length : newIndex;
    navigate(`/question/${filteredQuestions[newIndex].index}`);
    playSound(CLICK_SOUND);
  };

  return (
    <div className="question">
      <QuestionHeader
        isCN={isCN}
        toggleLanguage={toggleLanguage}
        toggleFavourite={toggleFavourite}
        isFavourite={isFavourite}
      />

      <div className="content">
        <QuestionInfo
          currQuestion={currQuestion}
          filteredQuestions={filteredQuestions}
        />

        <div className="content-container">
          <QuestionContent
            isExplain={isExplain}
            isAnswerError={isAnswerError}
            currQuestion={currQuestion}
            chosenAnswerIndex={chosenAnswerIndex}
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
        changeQuestion={changeQuestion}
        isExplain={isExplain}
        toggleShowExplanation={toggleShowExplanation}
        filteredQuestions={filteredQuestions}
        currQuestionIndex={currQuestionIndex}
      />
    </div>
  );
}

export default BasicQuestion;
