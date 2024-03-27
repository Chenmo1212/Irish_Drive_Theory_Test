import React, {useEffect, useState} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {CORRECT_COLOR, ERROR_COLOR, loadExamFromLocalStorage, loadFromLocalStorage} from "../../common/common";
import ExamResultChart from "../../components/Chart/Chart";
import {getIcon} from "../../styles/icons";

const ExamResult = () => {
  const [score, setScore] = useState(0);
  const [isPass, setIsPass] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const exam = loadExamFromLocalStorage();
    const {score} = exam;
    setScore(score);
    setIsPass(score >= 35);
  }, []);

  const getUsedTime = () => {
    const secondsLeft = loadFromLocalStorage('secondsLeft', 0);
    const secondsUsed = 40 * 60 - secondsLeft;
    return formatTime(secondsUsed);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="exam-result mock">
      <PageHeader
        pageTitle="Exam Result"
        handleBack={() => navigate('/')}
        rightIcons={[]}
      />

      <div className="body">
        <ExamResultChart title="Result" score={score}/>

        <div className="section">
          <div className="result">
            <div className="text"
                 style={{color: isPass ? CORRECT_COLOR : ERROR_COLOR}}
            >{score >= 35 ? 'PASS' : 'FAIL'}</div>
            <div className="label">Your Result</div>
          </div>
          <div className="divider"/>
          <div className="time">
            <div className="text">{getUsedTime()}</div>
            <div className="label">Time Used</div>
          </div>
        </div>

        <div className="btn">
          {getIcon('socket')}
          Save all wrong questions
        </div>
        <div className="btn">
          Save all wrong questions
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
