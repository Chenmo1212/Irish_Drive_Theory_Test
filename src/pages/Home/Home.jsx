import React, {useEffect, useState} from "react"
import './Home.css'
import {QUESTIONS} from "../../questions_data";
import DRIVER from '../../assets/svg/driver.svg'
import {Link} from "react-router-dom";
import {loadFromLocalStorage, saveToLocalStorage, updateDataIfNewVersion} from '../../common/common';

const initializeLocalStorage = (newVersion) => {
  const currentVersion = loadFromLocalStorage('appVersion', '1.2.1.240204');
  const currQuestionIdx = loadFromLocalStorage('currQuestionIdx', 0);
  const isUpdate = updateDataIfNewVersion(currentVersion, newVersion);
  let allQuestions = loadFromLocalStorage('allQuestions', QUESTIONS);

  if (isUpdate) {
    allQuestions = QUESTIONS;
    saveToLocalStorage("allQuestions", QUESTIONS);
    console.info(`App Updated: ${currentVersion} => ${newVersion}`)
  }

  return {allQuestions, currQuestionIdx};
};

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(1);
  const newVersion = "1.2.2.240204";

  useEffect(() => {
    const {allQuestions, currQuestionIdx} = initializeLocalStorage(newVersion);
    setAllQuestions(allQuestions);
    setCurrQuestionIdx(currQuestionIdx);
  }, []);

  return <div className="home">
    <div className="project">
      <div className="content">
        <div className="cover">
          <img src={DRIVER} alt=""/>
        </div>
        <div className="title">Irish Theory Test</div>
        <div className="question_type">
          <span> Question Amount: <span className="text-blue">{allQuestions.length}</span></span>
        </div>
        <div className="progress">
          <div className="card-progress__back"></div>
          <div className="card-progress__line" style={{width: '2%', backgroundColor: 'rgb(83, 109, 254)'}}></div>
        </div>

        <Link to={`/question/${currQuestionIdx}`}>
          <div className="btn">
            <button className="btn begin text-blue">
          <span className="icon-container">
            <i className="fa fa-rocket"></i>
            Start
          </span>
            </button>
          </div>
        </Link>

        <div className="btn">
          <button className="btn mock text-blue">
          <span className="icon-container">
            <i className="fa fa-flag"></i>
            Mock Exam
          </span>
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default Home