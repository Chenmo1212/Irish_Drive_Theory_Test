import React, {useEffect, useState} from "react"
import {QUESTIONS_EN} from "../../data/questions_data";
import {ERROR_COLOR, loadFromLocalStorage, THEME_COLOR} from '../../common/common';
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
    const isAnswered = allAnswers.length && allAnswers[questionNumber - 1] !== -1;
    const isError = allAnswers.length && allAnswers[questionNumber - 1] !== allQuestions[questionNumber - 1].correct_answer;

    return {
      background: isAnswered ? (isError ? ERROR_COLOR : THEME_COLOR) : "",
      color: isAnswered ? '#fff' : '#000'
    };
  };

  const backDetail = () => {
    navigate(-1);
  }

  const toDetail = (idx) => {
    navigate(`/question/${idx}`);
  }

  const clearLocalAnswers = () => {
    localStorage.removeItem("allAnswers");
    alert("All your answers have been cleared!");
    window.location.reload();
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("isAnswerStick");
    localStorage.removeItem("isAnswerCheck");
    localStorage.removeItem("currQuestionIdx");
    localStorage.removeItem("allAnswers");
    localStorage.removeItem("allQuestions");
    localStorage.removeItem("allFavorites");
    alert("All data have been cleared!");
    window.location.reload();
  }

  const getQuestionNumber = (index, sectionIdx) => {
    let accumulatedAmount = 0;
    for (let i = 0; i < sectionIdx; i++) {
      accumulatedAmount += questionTypes[i].amount;
    }
    return accumulatedAmount + index + 1;
  };

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
        <div className="clear icon" onClick={clearLocalAnswers}>
          {getIcon('clear')}
        </div>
        <div className="trash icon" onClick={clearLocalStorage}>
          {getIcon('trash')}
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