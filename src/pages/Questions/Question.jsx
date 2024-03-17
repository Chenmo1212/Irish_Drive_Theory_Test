import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './Question.css'
import {getIcon} from "../../styles/icons";
import {
  CLICK_SOUND,
  CORRECT_SOUND,
  DEFAULT_VERSION,
  ERROR_COLOR,
  loadFromLocalStorage,
  NEW_VERSION,
  NORMAL_SOUND,
  OPTION_LABELS,
  playSound,
  saveToLocalStorage,
  THEME_COLOR,
  updateDataIfNewVersion,
  WRONG_SOUND,
  questionsCN,
  questionsEN
} from '../../common/common';

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
    userAnswers: loadFromLocalStorage('userAnswers', []),
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
  const [displayedQuestions, setDisplayedQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [chosenAnswerIndex, setAnswerIndex] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isStick, setIsStick] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCN, setIsCN] = useState(false);

  const {index} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const {isCN, questions_EN, questions_CN, userAnswers, isAnswerCheck, isAnswerStick} = initializeQuestions();
    if (parseInt(index) <= 0) navigate('/question/1')
    const idx = initializeCurrQuestionIndex(parseInt(index));
    const {id, correct_answer: correctAnswer} = questions_EN[idx];
    const userAnswer = userAnswers.find(answer => answer.questionId === id);

    setDisplayedQuestions(isCN ? questions_CN : questions_EN);
    setCurrQuestion(isCN ? questions_CN[idx] : questions_EN[idx]);
    setQuestionsCN(questions_CN);
    setQuestionsEN(questions_EN);
    setUserAnswers(userAnswers);
    setCurrQuestionIndex(idx);
    setAnswerIndex(userAnswer ? userAnswer.userAnswer : -1);
    setIsFavourite(userAnswer ? userAnswer.isFavorite : false);
    setIsCheck(isAnswerCheck);
    setIsStick(isAnswerStick);
    setIsShowAnswer(isAnswerStick);
    setIsCN(isCN);
    setIsError(userAnswer ? userAnswer.userAnswer !== correctAnswer : false);
    // eslint-disable-next-line
  }, [index, currQuestionIndex]);

  const toOverview = () => {
    navigate('/overview');
    playSound(CLICK_SOUND);
  }

  const getOptionLabel = (idx) => {
    return OPTION_LABELS[idx] + ": "
  }

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

    let newIndex = currQuestionIndex + 1 + increment;
    newIndex = newIndex <= 0 ? 0 : newIndex;
    newIndex = newIndex >= questionsCN.length ? questionsCN.length : newIndex;
    navigate(`/question/${newIndex}`);
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

  const answerStyle = {
    border: `1px solid ${isError ? ERROR_COLOR : THEME_COLOR}`,
    color: isError ? ERROR_COLOR : THEME_COLOR
  }

  const chosenOptionStyle = {
    border: `1px solid ${THEME_COLOR}`,
    color: THEME_COLOR
  }

  const handlerBack = () => {
    navigate('/');
  }

  return (
    <div className="question">
      <div className="header">
        <div className="return">
          <div className="circle" onClick={handlerBack}>
            {getIcon('back')}
          </div>
          <div className="page-title">
            {isCN ? "问题" : "Question"}
          </div>
        </div>
        <div className="icon-group">
          <div className={`language ${isCN ? 'active' : ''}`}
               onClick={toggleLanguage}>
            {getIcon('language')}
          </div>
          <div className={`favourite ${isFavourite ? 'active' : ''}`}
               onClick={toggleFavourite}>
            {getIcon(`${isFavourite ? 'fav_fill' : 'fav'}`)}
          </div>
        </div>
      </div>

      <div className="content">
        <div className="content-head">
          <div className="question-type" style={{color: THEME_COLOR}}>
            <span>{currQuestion.section}</span>
          </div>
          <div className="question-num">
            <span className="question-index" style={{color: THEME_COLOR}}>
              {currQuestionIndex + 1}
            </span>
            /
            <span className="question-num-item">
              {displayedQuestions.length}
            </span>
          </div>
        </div>

        <div className="content-container">
          <div className="question-text">
            Q: {currQuestion.question}

            {currQuestion.question_img_url ?
              <p className="question-img"><img src={currQuestion.question_img_url} alt=""/></p> : <></>}
          </div>

          <div className="options">
            {currQuestion.options?.map((option, idx) => (
              <div className={`btn c-button ${chosenAnswerIndex === idx ? " active" : ""}`}
                   key={option + idx}
                   style={chosenAnswerIndex === idx ? chosenOptionStyle : {}}
                   onClick={() => handleOptionClick(idx)}
              >
                <span>{getOptionLabel(idx)}</span>
                <span>{option}</span>
              </div>
            ))}
          </div>

          {isShowAnswer ? (<div className="answer" style={answerStyle}>
            <div className="answer-content">
              <div className="answer-text">
                <span>{isCN ? "正确答案：" : "Answer: "}</span>
                <span>{OPTION_LABELS[currQuestion.correct_answer]}</span>
              </div>
              <div className="stick-box">
                <div className={isCheck ? 'active' : ''} onClick={handleCheck}>{getIcon('check')}</div>
                <div className={isStick ? 'active' : ''} onClick={handleStick}>{getIcon('thumb_tack')}</div>
              </div>
            </div>

            <div className="explanation">
              {currQuestion.explanation}
            </div>
          </div>) : ""}
        </div>
      </div>

      <div className="question-footer">
        <div className="menu-card" style={{color: THEME_COLOR}}>
          <div className="menu-item all-question" onClick={toOverview}>
            {getIcon('fa_th')}
          </div>
          <div className="menu-item show-answer" onClick={toggleShowAnswer}>
            {getIcon(isShowAnswer ? 'eye_slash' : 'eye')}
          </div>
          <div className={`menu-item pre-question ${currQuestionIndex <= 0 ? 'disable' : ''}`}
               onClick={() => changeQuestion(-1)}>
            {getIcon('arrow_left')}
          </div>
          <div
            className={`menu-item next-question ${currQuestionIndex >= displayedQuestions.length - 1 ? 'disable' : ''}`}
            onClick={() => changeQuestion(1)}>
            {getIcon('arrow_right')}
          </div>
        </div>
      </div>
    </div>
  )
    ;
};


export default Question