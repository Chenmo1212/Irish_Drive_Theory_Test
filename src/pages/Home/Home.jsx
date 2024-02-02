import React, {useEffect, useState} from "react"
import './Home.css'
import {QUESTIONS} from "../../questions_data";
import DRIVER from '../../assets/svg/driver.svg'
import {Link} from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    if (QUESTIONS) setProjects(QUESTIONS);
  }, QUESTIONS)

  return <div className="home">
    <div className="project">
      <div className="content">
        <div className="cover">
          <img src={DRIVER} alt=""/>
        </div>
        <div className="title">Test</div>
        <div className="question_type">
          <span> Question Amount: <span className="text-blue">{projects.length}</span></span>
        </div>
        <div className="progress">
          <div className="card-progress__back"></div>
          <div className="card-progress__line" style={{width: '2%', backgroundColor: 'rgb(83, 109, 254)'}}></div>
        </div>

        <Link to={`/questions/0`}>
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