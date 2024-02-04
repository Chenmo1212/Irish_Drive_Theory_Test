import React, {useEffect, useState} from "react"
import {QUESTIONS_EN} from "../../data/questions_data";
import {loadFromLocalStorage, THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";
import "./Overview.css"
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const questions = QUESTIONS_EN;
  const favorites = Array.from({length: questions.length}, () => false);
  const answers = Array.from({length: questions.length}, () => -1);
  const isCN = loadFromLocalStorage('isCN', false);

  return {
    isCN,
    questions: loadFromLocalStorage('allQuestions', questions),
    favorites: loadFromLocalStorage('allFavorites', favorites),
    answers: loadFromLocalStorage('allAnswers', answers),
  };
};

const Overview = () => {
  const [allFavorites, setAllFavorites] = useState([])
  const [allQuestions, setAllQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isCN, setIsCN] = useState(false);
  const navigate = useNavigate();

  const questionTypes = [{
    "sectionName": "Control of Vehicle",
    "sectionNameCN": "车辆控制",
    "amount": 13,
  }, {
    "sectionName": "Legal Matters/Rules of the Road",
    "sectionNameCN": "法律事务/交通规则",
    "amount": 235,
  }, {
    "sectionName": "Managing Risk",
    "sectionNameCN": "管理风险",
    "amount": 97,
  }, {
    "sectionName": "Safe and Responsible Driving",
    "sectionNameCN": "安全和负责任的驾驶",
    "amount": 419,
  }, {
    "sectionName": "Technical Matters",
    "sectionNameCN": "技术问题",
    "amount": 28,
  },]

  useEffect(() => {
    const {isCN, questions, favorites, answers} = initializeLocalStorage();
    setIsCN(isCN);
    setAllAnswers(answers);
    setAllQuestions(questions);
    setAllFavorites(favorites);
  }, []);

  const getStyle = (questionNumber) => {
    return {
      background: allAnswers[questionNumber - 1] === -1 ? "" : THEME_COLOR,
      color: allAnswers[questionNumber - 1] !== -1 ? '#fff' : '#000'
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
        return index + 1;
      case 1:
        return questionTypes[0].amount + index + 1
      case 2:
        return questionTypes[0].amount + questionTypes[1].amount + index + 1
      case 3:
        return questionTypes[0].amount + questionTypes[1].amount + questionTypes[2].amount + index + 1
      case 4:
        return questionTypes[0].amount + questionTypes[1].amount + questionTypes[2].amount + questionTypes[3].amount + index + 1
      default:
        return index + 1
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
            {isCN ? "总览" : "Overview"}
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
                <span>{isCN ? section.sectionNameCN : section.sectionName}</span>
              </div>
              <div className="content">
                {Array.from({length: section.amount}, (_, index) => (
                  <div className="circle-box" key={index}>
                    <div className={`circle ${allQuestions[index] !== -1 ? 'active' : ''}`}
                         style={getStyle(getQuestionNumber(index, sectionIdx))}
                         onClick={() => toDetail(getQuestionNumber(index, sectionIdx))}
                    >
                      {getQuestionNumber(index, sectionIdx)}
                      {allFavorites[getQuestionNumber(index, sectionIdx) - 1] &&
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