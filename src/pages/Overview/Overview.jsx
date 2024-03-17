import React, {useEffect, useState} from "react"
import {QUESTIONS_EN} from "../../data/questions_data";
import {DELETE_SOUND, ERROR_COLOR, loadFromLocalStorage, playSound, THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";
import "./Overview.css"
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const questions = QUESTIONS_EN;
  const isCN = loadFromLocalStorage('isCN', false);

  return {
    isCN,
    questions: loadFromLocalStorage('allQuestions', questions),
    userAnswers: loadFromLocalStorage('userAnswers', []),
  };
};

const Overview = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // const [currQuestionListType, setCurrQuestionListType] = useState("all");
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
    const {isCN, questions, userAnswers} = initializeLocalStorage();
    setIsCN(isCN);
    setAllQuestions(questions);
    setUserAnswers(userAnswers);
  }, []);

  const getStyle = (questionNumber) => {
    if(!allQuestions.length) return {};

    const {id, correct_answer} = allQuestions[questionNumber - 1];
    const userAnswerObj = userAnswers.find(answer => answer.questionId === id);

    const isAnswered = !!userAnswerObj;
    const isError = userAnswerObj && userAnswerObj.userAnswer !== correct_answer;

    return {
      background: isAnswered ? (isError ? ERROR_COLOR : THEME_COLOR) : "",
      color: isAnswered ? '#fff' : '#000'
    };
  };

  const getFavStatus = (questionNumber) => {
    const {id} = allQuestions[questionNumber - 1] || {};
    const userAnswerObj = userAnswers.find((answer) => answer.questionId === id);
    return userAnswerObj && userAnswerObj.isFavorite;
  }
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
    playSound(DELETE_SOUND);
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("isAnswerStick");
    localStorage.removeItem("isAnswerCheck");
    localStorage.removeItem("currQuestionIdx");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("allQuestions");
    alert("All data have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

  const getQuestionNumber = (index, sectionIdx) => {
    let accumulatedAmount = 0;
    for (let i = 0; i < sectionIdx; i++) {
      accumulatedAmount += questionTypes[i].amount;
    }
    return accumulatedAmount + index + 1;
  };

  const setQuestionList = (type) => {
    // if (type !== currQuestionListType) setCurrQuestionListType(type);
    // else setCurrQuestionListType("all");
    console.log(type)
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

        <div className="wrong icon" onClick={() => setQuestionList('wrong')}>
          {getIcon('wrong')}
        </div>
        <div className="fav icon" onClick={() => setQuestionList('fav')}>
          {getIcon('fav')}
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
                      {getFavStatus(getQuestionNumber(index, sectionIdx)) &&
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