import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {QUESTIONS} from "../../questions_data";
import './Question.css'
import {getIcon} from "../../styles/icons";
import {loadFromLocalStorage, saveToLocalStorage} from '../../common/common'

const initializeQuestions = () => {
  const questions = QUESTIONS;
  const favorites = Array.from({ length: questions.length }, () => false);

  return {
    questions: loadFromLocalStorage('allQuestions', questions),
    favorites: loadFromLocalStorage('allFavorites', favorites),
  };
};

const initializeCurrQuestionIndex = (index) => {
  const storedCurrQuestionIdx = loadFromLocalStorage('currQuestionIdx');
  if (index) {
    const idx = parseInt(index) - 1;
    saveToLocalStorage('currQuestionIdx', idx);
    return idx;
  } else {
    return storedCurrQuestionIdx ? storedCurrQuestionIdx : 0;
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

  useEffect(() => {
    const { questions, favorites } = initializeQuestions();
    const idx = initializeCurrQuestionIndex(index);

    setAllQuestions(questions);
    setAllFavorites(favorites);
    setCurrQuestionIndex(idx);
    setCurrQuestion(questions[idx]);
    setIsFavourite(favorites[idx]);
  }, [index]);

  const projectName = "123"
  const chapterName = "123"
  const toOverview = () => {
    console.log("123")
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
  const handleStick = () => setIsStick(!isStick);
  const handleCheck = () => setIsCheck(!isCheck);

  const handleOptionClick = (idx) => {
    setAnswerIndex(idx);
    setIsError(idx !== currQuestion.correct_answer);
  }

  const changeQuestion = () => {
    setIsStick(!isStick);
  };

  const answerStyle = {
    border: `1px solid ${isError ? errorColor : themeColor}`,
    color: isError ? errorColor : themeColor
  }

  const chosenOptionStyle = {
    border: `1px solid ${themeColor}`,
    color: themeColor
  }

  return (
    <div className="question">
      <div className="header">
        <div className="return">
          <div className="circle">
            {getIcon('back')}
          </div>
          <div className="page-title">
            章节背题 |
            <span style={{color: themeColor}} className="pageName">
              &nbsp;{projectName} - {chapterName}
            </span>
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
            <span>单选题</span>
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