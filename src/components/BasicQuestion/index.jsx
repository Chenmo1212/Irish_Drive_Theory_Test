import React, {useEffect, useMemo} from 'react';
import './index.css'
import QuestionHeader from "./QuestionHeader";
import {CLICK_SOUND, CORRECT_SOUND, NORMAL_SOUND, playSound, WRONG_SOUND} from "../../common/common";
import QuestionFooter from "./QuestionFooter";
import QuestionInfo from "./QuestionInfo";
import QuestionContent from "./QuestionContent";
import QuestionExplanation from "./QuestionExplanation";
import {useAnswers, useCurrQuestionIdx, useLang, useQuestionConfig} from "../../store";

const BasicQuestion = ({
  questions,
  currQuestion
}) => {
  const {isCN, update: toggleTranslation} = useLang();
  const {isStick, isCheck, isExplain, update: updateQuestionConfig} = useQuestionConfig();
  const {currQuestionIdx, update: updateCurrQuestionIdx} = useCurrQuestionIdx();
  const {userAnswers, update: updateAnswers} = useAnswers();

  const userAnswer = useMemo(() => {
    return userAnswers.find(answers => answers.questionId === questions[currQuestionIdx].id) || {};
  }, [userAnswers, questions, currQuestionIdx]);

  const isAnswerError = useMemo(() => {
    return currQuestion.correct_answer !== userAnswer.userAnswer;
  }, [currQuestion.correct_answer, userAnswer.userAnswer])

  useEffect(() => {
    if (isStick) updateQuestionConfig({isExplain: true});
  }, [isStick, updateQuestionConfig]);

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
  }, [currQuestionIdx]);

  const toggleLanguage = () => {
    toggleTranslation(!isCN);
    playSound(CLICK_SOUND);
  }

  const toggleFavourite = () => {
    updateAnswers({questionId: currQuestion.id, isFavorite: !(userAnswer?.isFavorite)})
    playSound(CLICK_SOUND);
  }

  const handleOptionClick = (idx) => {
    updateAnswers({questionId: currQuestion.id, userAnswer: idx})

    if (isCheck) updateQuestionConfig({isExplain: true});
    let sound = NORMAL_SOUND;
    if (isCheck || isExplain) {
      sound = idx !== currQuestion.correct_answer ? WRONG_SOUND : CORRECT_SOUND;
    }
    playSound(sound);
  }

  const changeQuestion = (increment) => {
    updateQuestionConfig({isExplain: false});
    if (currQuestionIdx <= 0 && increment === -1) return;
    updateCurrQuestionIdx(currQuestionIdx + increment);
    playSound(CLICK_SOUND);
  };

  return (
    <div className="question normal">
      <QuestionHeader
        isCN={isCN}
        toggleLanguage={toggleLanguage}
        toggleFavourite={toggleFavourite}
        isFavorite={userAnswer?.isFavorite}
      />

      <div className="content">
        <QuestionInfo
          currQuestion={currQuestion}
          currQuestionIndex={currQuestionIdx}
          questions={questions}
        />

        <div className="content-container">
          <QuestionContent
            isExplain={isExplain}
            isAnswerError={isAnswerError}
            currQuestion={currQuestion}
            chosenAnswerIndex={userAnswer?.userAnswer}
            handleOptionClick={handleOptionClick}
          />

          <QuestionExplanation
            currQuestion={currQuestion}
            isExplain={isExplain}
            isAnswerError={isAnswerError}
          />
        </div>
      </div>

      <QuestionFooter
        questions={questions}
        changeQuestion={changeQuestion}
      />
    </div>
  );
}

export default BasicQuestion;
