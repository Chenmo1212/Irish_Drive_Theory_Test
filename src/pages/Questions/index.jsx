import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css'
import {
  CLICK_SOUND,
  CORRECT_SOUND,
  DEFAULT_VERSION,
  loadFromLocalStorage,
  NEW_VERSION,
  NORMAL_SOUND,
  playSound,
  questionsCN,
  questionsEN,
  saveToLocalStorage,
  updateDataIfNewVersion,
  WRONG_SOUND
} from '../../common/common';
import QuestionFooter from "./QuestionFooter";
import QuestionContent from "./QuestionContent";
import QuestionExplain from "./QuestionExplain";
import QuestionInfo from "./QuestionInfo";
import QuestionHeader from "./QuestionHeader";

const initializeQuestions = () => {
  const currentVersion = loadFromLocalStorage('appVersion', DEFAULT_VERSION);
  const isCN = loadFromLocalStorage('isCN', false);
  let questions_EN = loadFromLocalStorage('allQuestions', questionsEN);
  let questions_CN = loadFromLocalStorage('allQuestions_CN', questionsCN);
  const isUpdate = updateDataIfNewVersion(currentVersion, NEW_VERSION);

  if (isUpdate) {
    console.info(`App Updated: ${currentVersion} => ${NEW_VERSION}`)
    questions_EN = questionsEN;
    saveToLocalStorage("allQuestions", questionsEN);
    saveToLocalStorage("allQuestions_CN", questionsCN);
  } else {
    console.info(`App Current Version: ${currentVersion}`);
  }

  return {
    isCN,
    questions_EN,
    questions_CN,
    questionsConfig: loadFromLocalStorage('questionsConfig', {}),
    userAnswers: loadFromLocalStorage('userAnswers', []),
    isShowAnswerInErrorMode: loadFromLocalStorage('isShowAnswerInErrorMode', true),
    isAnswerCheck: loadFromLocalStorage('isAnswerCheck', false),
    isAnswerStick: loadFromLocalStorage('isAnswerStick', false),
  };
};

const initializeCurrQuestionIndex = (pageIdx) => {
  const storedCurrQuestionIdx = loadFromLocalStorage('currQuestionIdx');
  if (pageIdx) {
    saveToLocalStorage('currQuestionIdx', pageIdx - 1);
    return pageIdx - 1;
  } else {
    return storedCurrQuestionIdx >= 0 ? storedCurrQuestionIdx : 0;
  }
};

const Question = () => {
  const [currQuestion, setCurrQuestion] = useState({})
  const [questionsCN, setQuestionsCN] = useState([])
  const [questionsEN, setQuestionsEN] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [displayedQuestions, setDisplayedQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [chosenAnswerIndex, setAnswerIndex] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isShowAnswerInErrorMode, setIsShowAnswerInErrorMode] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isStick, setIsStick] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCN, setIsCN] = useState(false);

  const {index} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      isCN,
      questions_EN,
      questions_CN,
      questionsConfig,
      userAnswers,
      isShowAnswerInErrorMode,
      isAnswerCheck,
      isAnswerStick
    } = initializeQuestions();
    if (parseInt(index) <= 0) navigate('/question/1')
    const idx = initializeCurrQuestionIndex(parseInt(index));
    const {id, correct_answer: correctAnswer} = questions_EN[idx];
    const userAnswer = userAnswers.find(answer => answer.questionId === id);
    const {filteredQuestions} = questionsConfig;

    setDisplayedQuestions(isCN ? questions_CN : questions_EN);
    setCurrQuestion(isCN ? questions_CN[idx] : questions_EN[idx]);
    setQuestionsCN(questions_CN);
    setQuestionsEN(questions_EN);
    setFilteredQuestions(filteredQuestions);
    setUserAnswers(userAnswers);
    setCurrQuestionIndex(idx);
    setAnswerIndex(isShowAnswerInErrorMode ? (userAnswer ? userAnswer.userAnswer : -1) : -1);
    setIsFavourite(userAnswer ? userAnswer.isFavorite : false);
    setIsCheck(isAnswerCheck);
    setIsStick(isAnswerStick);
    setIsShowAnswer(isAnswerStick);
    setIsCN(isCN);
    setIsError(userAnswer ? userAnswer.userAnswer !== correctAnswer : false);
    // eslint-disable-next-line
  }, [index, currQuestionIndex]);

  const updateUserAnswers = (newValue, isFavoriteUpdate = false) => {
    const questionId = currQuestion.id;
    const answerIndex = userAnswers.findIndex(answer => answer.questionId === questionId);
    if (answerIndex > -1) {
      if (!isFavoriteUpdate) {
        userAnswers[answerIndex].userAnswer = newValue;
      } else {
        userAnswers[answerIndex].isFavorite = newValue;
      }
    } else {
      userAnswers.push({
        questionId: questionId,
        userAnswer: isFavoriteUpdate ? -1 : newValue,
        isFavorite: isFavoriteUpdate ? newValue : isFavourite,
      });
    }
    setUserAnswers(userAnswers);
    saveToLocalStorage('userAnswers', userAnswers);
  }

  const toggleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
    playSound(CLICK_SOUND);
  }
  const toggleFavourite = () => {
    updateUserAnswers(!isFavourite, true);
    setIsFavourite(!isFavourite);
    playSound(CLICK_SOUND);
  }
  const toggleLanguage = () => {
    setIsCN(!isCN);
    setDisplayedQuestions(!isCN ? questionsCN : questionsEN);
    setCurrQuestion(!isCN ? questionsCN[currQuestionIndex] : questionsEN[currQuestionIndex]);
    saveToLocalStorage('isCN', !isCN);
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

  const handleIsShowAnswerInErrorMode = () => {
    setIsShowAnswerInErrorMode(!isShowAnswerInErrorMode);
    saveToLocalStorage('isShowAnswerInErrorMode', !isShowAnswerInErrorMode);
    playSound(CLICK_SOUND);
  }

  const handleOptionClick = (idx) => {
    setAnswerIndex(idx);
    const isError = idx !== currQuestion.correct_answer;
    setIsError(isError);
    updateUserAnswers(idx);
    if (isCheck) setIsShowAnswer(true);

    playSound(isCheck ? (isError ? WRONG_SOUND : CORRECT_SOUND) : NORMAL_SOUND);
  }

  const changeQuestion = (increment) => {
    if (index <= 0 && increment === -1) return;

    setAnswerIndex(-1);
    setIsShowAnswer(false);

    const filteredIndex = filteredQuestions.findIndex(q => q.index === (currQuestionIndex + 1));
    let newIndex = filteredIndex + increment;
    newIndex = newIndex <= 0 ? 0 : newIndex;
    newIndex = newIndex >= filteredQuestions.length ? filteredQuestions.length : newIndex;
    navigate(`/question/${filteredQuestions[newIndex].index}`);
  };

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
        case ' ':
          toggleShowAnswer();
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
          currQuestionIndex={currQuestionIndex}
          displayedQuestions={displayedQuestions}
        />

        <div className="content-container">
          <QuestionContent
            currQuestion={currQuestion}
            chosenAnswerIndex={chosenAnswerIndex}
            handleOptionClick={handleOptionClick}
          />

          <QuestionExplain
            isCN={isCN}
            currQuestion={currQuestion}
            isShowAnswer={isShowAnswer}
            isCheck={isCheck}
            handleCheck={handleCheck}
            isStick={isStick}
            isError={isError}
            handleStick={handleStick}
            isShowAnswerInErrorMode={isShowAnswerInErrorMode}
            handleIsShowAnswerInErrorMode={handleIsShowAnswerInErrorMode}
          />
        </div>
      </div>

      <QuestionFooter
        toggleShowAnswer={toggleShowAnswer}
        changeQuestion={changeQuestion}
        isShowAnswer={isShowAnswer}
        filteredQuestions={filteredQuestions}
        currQuestionIndex={currQuestionIndex}
      />
    </div>
  );
};


export default Question