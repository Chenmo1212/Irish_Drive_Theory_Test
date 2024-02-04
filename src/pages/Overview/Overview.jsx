import React, {useEffect, useState} from "react"
import {QUESTIONS} from "../../data/questions_data";
import {loadFromLocalStorage, THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";
import "./Overview.css"
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const questions = QUESTIONS;
  const favorites = Array.from({length: questions.length}, () => false);
  const answers = Array.from({length: questions.length}, () => -1);

  return {
    questions: loadFromLocalStorage('allQuestions', questions),
    favorites: loadFromLocalStorage('allFavorites', favorites),
    answers: loadFromLocalStorage('allAnswers', answers),
  };
};

const Overview = () => {
  const [allFavorites, setAllFavorites] = useState([])
  const [allQuestions, setAllQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const navigate = useNavigate();

  const questionTypes = [{
    "sectionName": "Control of Vehicle",
    "amount": 13,
  }, {
    "sectionName": "Legal Matters/Rules of the Road",
    "amount": 235,
  }, {
    "sectionName": "Managing Risk",
    "amount": 97,
  }, {
    "sectionName": "Safe and Responsible Driving",
    "amount": 419,
  }, {
    "sectionName": "Techincal Matters",
    "amount": 28,
  },]

  useEffect(() => {
    const {questions, favorites, answers} = initializeLocalStorage();
    setAllAnswers(answers);
    setAllQuestions(questions);
    setAllFavorites(favorites);
}, []);

  const getStyle = (idx) => {
    return {
      background: allAnswers[idx] === -1 ? "" : THEME_COLOR,
      color: allAnswers[idx] !== -1 ? '#fff' : '#000'
    };
  }

  const backDetail = () => {
    navigate(-1);
  }

  const toDetail = (idx) => {
    navigate(`/question/${idx}`);
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("isAnswerStick");
    localStorage.removeItem("isAnswerCheck");
    localStorage.removeItem("currQuestionIdx");
    localStorage.removeItem("allAnswers");
    localStorage.removeItem("allQuestions");
    localStorage.removeItem("allFavorites");
    alert("LocalStorage has been cleared!")
  }

  const getQuestionNumber = (index, sectionIdx) => {
    switch (sectionIdx) {
      case 0:
        return index;
      case 1:
        return questionTypes[0].amount + index
      case 2:
        return questionTypes[0].amount + questionTypes[1].amount + index
      case 3:
        return questionTypes[0].amount + questionTypes[1].amount + questionTypes[2].amount + index
      case 4:
        return questionTypes[0].amount + questionTypes[1].amount + questionTypes[2].amount + questionTypes[3].amount + index
      default:
        return index
    }
  }

  return (
    <div className="overview">
      <div className="header">
        <div className="return">
          <div className="circle" style={{color: THEME_COLOR}} onClick={backDetail}>
            {getIcon('arrow_left')}
          </div>
          <div className="page-title">
            Overview
          </div>
        </div>
        <div className="clear" onClick={clearLocalStorage}>
          {getIcon('clear')}
        </div>
      </div>

      <div className="container">
        {questionTypes.map((section, sectionIdx,) => (
            <div className="section" key={sectionIdx}>
              <div className="title" style={{color: THEME_COLOR}}>
                <span>{section.sectionName}</span>
              </div>
              <div className="content">
                {Array.from({length: section.amount}, (_, index) => (
                  <div className="circle-box" key={index}>
                    <div className={`circle ${allQuestions[index] !== -1 ? 'active' : ''}`}
                         style={getStyle(getQuestionNumber(index + 1, sectionIdx))}
                         onClick={() => toDetail(getQuestionNumber(index + 1, sectionIdx))}
                    >
                      {getQuestionNumber(index + 1, sectionIdx)}
                      {allFavorites[getQuestionNumber(index + 1, sectionIdx) - 1] &&
                        <div className='svg-box'>{getIcon('fav_fill')}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Overview;