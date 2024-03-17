import React, {useEffect, useState} from "react"
import './Home.css'
import {QUESTIONS_EN} from "../../data/questions_data";
import DRIVER from '../../assets/svg/driver.svg'
import {Link} from "react-router-dom";
import {
  DEFAULT_VERSION,
  loadFromLocalStorage,
  NEW_VERSION,
  saveToLocalStorage,
  THEME_COLOR,
  updateDataIfNewVersion
} from '../../common/common';
import {getIcon} from "../../styles/icons";

const initializeLocalStorage = () => {
  const currentVersion = loadFromLocalStorage('appVersion', DEFAULT_VERSION);
  const currQuestionIdx = loadFromLocalStorage('currQuestionIdx', 0);
  const isCN = loadFromLocalStorage('isCN', false);
  const isUpdate = updateDataIfNewVersion(currentVersion, NEW_VERSION);
  let allQuestions = loadFromLocalStorage('allQuestions', QUESTIONS_EN);
  const userAnswers = loadFromLocalStorage('userAnswers', []);

  if (isUpdate) {
    console.info(`App Updated: ${currentVersion} => ${NEW_VERSION}`);
    allQuestions = QUESTIONS_EN;
    saveToLocalStorage("allQuestions", QUESTIONS_EN);
  } else {
    console.info(`App Current Version: ${currentVersion}`);
  }

  return {isCN, allQuestions, userAnswers, currQuestionIdx};
};

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(1);
  const [isCN, setIsCN] = useState(false);

  useEffect(() => {
    const {isCN, allQuestions, userAnswers, currQuestionIdx} = initializeLocalStorage();
    setIsCN(isCN);
    setAllQuestions(allQuestions);
    setUserAnswers(userAnswers);
    setCurrQuestionIdx(currQuestionIdx);
  }, []);

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
          <span> {isCN ? "题目总数:" : "Question Amount:"} <span
            className="text-blue">{allQuestions.length}</span></span>
        </div>
        <div className="progress">
          <div className="card-progress__back"></div>
          <div className="card-progress__line" style={{
            width: getProgressWidth(),
            backgroundColor: THEME_COLOR
          }}></div>
        </div>

        <Link to={`/question/${currQuestionIdx}`}>
          <div className="btn">
            <button className="btn begin text-blue">
              <span className="icon-container">
                <span>{getIcon('rocket')}</span>
                <span>{isCN ? "开始" : "Start"}</span>
              </span>
            </button>
          </div>
        </Link>
      </div>

      <Footer/>
    </div>
  </div>
}

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <footer>
      <p className="footer">All rights reserved ©{currYear} <a
        href="https://chenmo1212.cn?f=irish-questions">ChenMo1212</a>
      </p>
    </footer>
  )
}

export default Home