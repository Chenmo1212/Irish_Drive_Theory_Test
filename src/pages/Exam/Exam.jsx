import React, {useEffect, useState} from 'react';
import {getIcon} from "../../styles/icons";
import {loadFromLocalStorage} from "../../common/common";
import "./index.css"
import ExamCover from '../../assets/svg/exam.svg'
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const isCN = loadFromLocalStorage('isCN', false);

  return {
    isCN
  };
};


function Exam() {
  const [isCN, setIsCN] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {isCN} = initializeLocalStorage();

    setIsCN(isCN);
  }, []);

  const backHome = () => {
    navigate(-1);
  };

  const toExamDetail = () => {
    navigate('/exam');
  };

  return (
    <div className='beforeExam mock'>
      <div className="header">
        <div className="return">
          <div className="circle" onClick={backHome}>
            {getIcon('arrow_left')}
          </div>
          <div className="page-title">
            {isCN ? "模拟考试" : "Mock Exam"}
          </div>
        </div>
      </div>
      <div className="main">
        <div className="main-container">
          <div className="card-cover">
            <img src={ExamCover} alt=""/>
          </div>

          <div className="content">
            <div className="content-hd">考前须知</div>
            <div className="content-bd">
              <p>
                1. 试题来源：模拟考试中的题目均从现有题库中随机抽取，题目总数为 <strong>40</strong>道，您需要答对35道以上才能通过考试。
              </p>
              <p>
                2. 题型分布：模拟考试的数量分布为：<strong>2:8:7:22:1</strong>。<br/>
              </p>
              <p>
                3. 试题答案：模拟考试中的试题答案仅作为参考，若答案有误，务必进行反馈。
              </p>
            </div>
          </div>

          <div className="start-exam">
            <div className="card-btn" onClick={toExamDetail}>
              <button className="btn begin">
                <span>
                  {getIcon('rocket')}
                </span>
                <span>开始考试</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exam;
