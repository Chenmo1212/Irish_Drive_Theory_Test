import React from "react"
import './Home.css'
import DRIVER from '../../assets/svg/driver.svg'
import {Link} from "react-router-dom";
import Notification from '../../components/Notification/Notification'
import {THEME_COLOR} from '../../common/common';
import {getIcon} from "../../styles/icons";
import {useAnswers, useCurrQuestionIdx, useLang, useQuestions} from "../../store";

const Home = () => {
  const {isCN} = useLang();
  const {allQuestions} = useQuestions();
  const {userAnswers} = useAnswers();
  const {currQuestionIdx} = useCurrQuestionIdx()

  const getProgressWidth = () => {
    let userAnswerAmount = userAnswers.length;
    userAnswerAmount = userAnswerAmount <= 3 ? 3 : userAnswerAmount;
    return (userAnswerAmount / allQuestions.length) * 97 + "%";
  }

  return <div className="home">
    <div className="project">
      <div className="content">
        <div className="cover">
          <img src={DRIVER} alt=""/>
        </div>
        <div className="title">{isCN ? "爱尔兰驾照理论测试题" : "Irish Theory Test"}</div>
        <div className="question_type">
          <span> {isCN ? "题目总数:" : "Index Amount:"} <span
            className="text-blue">{allQuestions.length}</span></span>
        </div>
        <div className="progress">
          <div className="card-progress__back"></div>
          <div className="card-progress__line" style={{
            width: getProgressWidth(), backgroundColor: THEME_COLOR
          }}></div>
        </div>

        <Link to={`/question?i=${currQuestionIdx + 1}`}>
          <div className="btn">
            <button className="btn round-action-button begin text-blue">
              <span className="icon-container">
                <span>{getIcon('rocket')}</span>
                <span>{isCN ? "开始" : "Start"}</span>
              </span>
            </button>
          </div>
        </Link>

        <Link to={`/beforeExam`}>
          <div className="btn">
            <button className="btn round-action-button begin text-blue">
              <span className="icon-container">
                <span>{getIcon('rocket')}</span>
                <span>{isCN ? "模拟考试" : "Mock Exam"}</span>
              </span>
            </button>
          </div>
        </Link>
      </div>

      <Notification/>
    </div>
  </div>
}

export default Home