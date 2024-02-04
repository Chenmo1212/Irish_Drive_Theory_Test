import React, {useEffect, useState} from "react"
import './Home.css'
import {QUESTIONS_EN} from "../../data/questions_data";
import DRIVER from '../../assets/svg/driver.svg'
import {Link} from "react-router-dom";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  updateDataIfNewVersion,
  THEME_COLOR,
  DEFAULT_VERSION,
  NEW_VERSION
} from '../../common/common';

const initializeLocalStorage = () => {
  const currentVersion = loadFromLocalStorage('appVersion', DEFAULT_VERSION);
  const currQuestionIdx = loadFromLocalStorage('currQuestionIdx', 0);
  const isCN = loadFromLocalStorage('isCN', false);
  const isUpdate = updateDataIfNewVersion(currentVersion, NEW_VERSION);
  let allQuestions = loadFromLocalStorage('allQuestions', QUESTIONS_EN);

  if (isUpdate) {
    allQuestions = QUESTIONS_EN;
    saveToLocalStorage("allQuestions", QUESTIONS_EN);
    console.info(`App Updated: ${currentVersion} => ${NEW_VERSION}`)
  }

  return {isCN, allQuestions, currQuestionIdx};
};

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(1);
  const [isCN, setIsCN] = useState(false);

  useEffect(() => {
    const {isCN, allQuestions, currQuestionIdx} = initializeLocalStorage();
    setIsCN(isCN);
    setAllQuestions(allQuestions);
    setAllQuestions(allQuestions);
    setCurrQuestionIdx(currQuestionIdx);
  }, []);

  return <div className="home">
    <div className="project">
      <div className="content">
        <div className="cover">
          <img src={DRIVER} alt=""/>
        </div>
        <div className="title">{isCN ? "爱尔兰驾照理论测试题" : "Irish Theory Test"}</div>
        <div className="question_type">
          <span> {isCN ? "题目总数:" : "Question Amount:"} <span className="text-blue">{allQuestions.length}</span></span>
        </div>
        <div className="progress">
          <div className="card-progress__back"></div>
          <div className="card-progress__line" style={{width: '2%', backgroundColor: THEME_COLOR}}></div>
        </div>

        <Link to={`/question/${currQuestionIdx}`}>
          <div className="btn">
            <button className="btn begin text-blue">
          <span className="icon-container">
            <i className="fa fa-rocket"></i>
            {isCN ? "开始" : "Start"}
          </span>
            </button>
          </div>
        </Link>

        {/*<div className="btn">*/}
        {/*  <button className="btn mock text-blue">*/}
        {/*  <span className="icon-container">*/}
        {/*    <i className="fa fa-flag"></i>*/}
        {/*    Mock Exam*/}
        {/*  </span>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </div>
  </div>
}

export default Home