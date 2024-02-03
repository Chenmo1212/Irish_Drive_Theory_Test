import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {QUESTIONS} from "../../questions_data";
import './Question.css'
import {getIcon} from "../../styles/icons";
import {loadFromLocalStorage, saveToLocalStorage} from '../../common/common'

const initializeQuestions = () => {
  const questions = QUESTIONS;
  const favorites = Array.from({length: questions.length}, () => false);
  const answers = Array.from({length: questions.length}, () => -1);

  return {
    questions: loadFromLocalStorage('allQuestions', questions),
    favorites: loadFromLocalStorage('allFavorites', favorites),
    answers: loadFromLocalStorage('allAnswers', answers),
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

const OPTION_LABELS = ['A', "B", "C", "D"]
const Question = () => {
  const [currQuestion, setCurrQuestion] = useState({})
  const [allQuestions, setAllQuestions] = useState([])
  const [allFavorites, setAllFavorites] = useState([])
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [chosenAnswerIndex, setAnswerIndex] = useState(0);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isStick, setIsStick] = useState(false);
  const [isError, setIsError] = useState(false);
  const [themeColor] = useState('rgb(83, 109, 254)');
  const [errorColor] = useState('rgb(245, 108, 108)');

  const {index} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const {questions, favorites, answers, isAnswerCheck, isAnswerStick} = initializeQuestions();
    if (parseInt(index) <= 0) navigate('/question/1')
    const idx = initializeCurrQuestionIndex(parseInt(index));

    setAllQuestions(questions);
    setAllFavorites(favorites);
    setCurrQuestionIndex(idx);
    setAnswerIndex(answers[idx + 1]);
    setCurrQuestion(questions[idx]);
    setIsFavourite(favorites[idx]);
    setIsCheck(isAnswerCheck);
    setIsStick(isAnswerStick);
    setIsShowAnswer(isAnswerStick);
    setIsError(answers[idx] !== questions[idx].correct_answer);
  }, [index]);

  const toOverview = () => {
    navigate('/overview')
  }

  const getOptionLabel = (idx) => {
    return OPTION_LABELS[idx] + ": "
  }

  const toggleShowAnswer = () => setIsShowAnswer(!isShowAnswer);
  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    let updatedFavorites = [...allFavorites];
    updatedFavorites[currQuestionIndex] = !isFavourite;
    saveToLocalStorage('allFavorites', updatedFavorites);
  }
  const handleStick = () => {
    setIsStick(!isStick);
    saveToLocalStorage('isAnswerStick', !isStick);
  };
  const handleCheck = () => {
    setIsCheck(!isCheck);
    saveToLocalStorage('isAnswerCheck', !isCheck);
  };

  const handleOptionClick = (idx) => {
    setAnswerIndex(idx);
    setIsError(idx !== currQuestion.correct_answer);
    let updatedAnswers = loadFromLocalStorage('allAnswers', []);
    updatedAnswers[currQuestionIndex + 1] = idx;
    saveToLocalStorage('allAnswers', updatedAnswers);

    if (isCheck) setIsShowAnswer(true);
  }

  const changeQuestion = (Increment) => {
    if (currQuestionIndex <= 0 && Increment === -1) return;

    setAnswerIndex(-1);
    setIsShowAnswer(false);
    navigate(`/question/${currQuestionIndex + 1 + Increment}`);
  };

  const answerStyle = {
    border: `1px solid ${isError ? errorColor : themeColor}`,
    color: isError ? errorColor : themeColor
  }

  const chosenOptionStyle = {
    border: `1px solid ${themeColor}`,
    color: themeColor
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
            Question
          </div>
        </div>
        <div className={`favourite ${isFavourite ? 'active' : ''}`}
             onClick={toggleFavourite}>
          {getIcon(`${isFavourite ? 'fav_fill' : 'fav'}`)}
        </div>
      </div>

      <div className="content">
        <div className="content-head">
          <div className="question-type" style={{color: themeColor}}>
            <span>{currQuestion.section}</span>
          </div>
          <div className="question-num">
            <span className="question-index" style={{color: themeColor}}>
              {currQuestionIndex + 1}
            </span>
            /
            <span className="question-num-item">
              {allQuestions.length}
            </span>
          </div>
        </div>

        <div className="content-container">
          <div className="question-text">
            Q: {currQuestion.question}

            {currQuestion.question_img_url ? <p className="question-img"><img src={currQuestion.question_img_url} alt=""/></p> : <></>}
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
                <span>正确答案：</span>
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
        <div className="menu-card" style={{color: themeColor}}>
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
          <div className={`menu-item next-question ${currQuestionIndex >= allQuestions.length - 1 ? 'disable' : ''}`}
               onClick={() => changeQuestion(1)}>
            {getIcon('arrow_right')}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Question