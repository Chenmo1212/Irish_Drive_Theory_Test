import React, {useEffect, useState, useRef} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {
  CORRECT_COLOR,
  ERROR_COLOR,
  loadExamFromLocalStorage,
  loadFromLocalStorage, NORMAL_SOUND, playSound,
  saveToLocalStorage
} from "../../common/common";
import ExamResultChart from "../../components/Chart/Chart";
import LineChart from "../../components/LineChart/LineChart";
import {getIcon} from "../../styles/icons";
import BasicAlert from "../../components/BasicAlert/BasicAlert";

const initializeLocalStorage = () => {
  const exam = loadExamFromLocalStorage();
  const userAnswers = loadFromLocalStorage('userAnswers', []);
  const examHistory = loadFromLocalStorage('examHistory', []);

  return {
    exam,
    userAnswers,
    examHistory,
  };
};

const ExamResult = () => {
  const [score, setScore] = useState(0);
  const [isPass, setIsPass] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [examAnswers, setExamAnswers] = useState([]);
  const [chartData, setChartData] = useState([]);

  const alertRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const {exam, userAnswers, examHistory} = initializeLocalStorage();
    const {score, answers: examAnswers} = exam;

    setUserAnswers(userAnswers);
    setExamAnswers(examAnswers);
    setChartData(examHistory.map((i,_) => i.score));
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

  const saveWrongQuestions = () => {
    let newUserAnswers = [...userAnswers];
    examAnswers.forEach(examAnswer => {
      if (!examAnswer.isCorrect) {
        const index = newUserAnswers.findIndex(userAnswer => userAnswer.questionId === examAnswer.questionId);
        if (index !== -1) {
          delete examAnswer.isCorrect
          newUserAnswers[index] = {...newUserAnswers[index], ...examAnswer};
        } else {
          const {questionId, userAnswer} = examAnswer
          newUserAnswers.push({questionId, userAnswer});
        }
      }
    });
    saveToLocalStorage('userAnswers', newUserAnswers);
    playSound(NORMAL_SOUND);

    alertRef.current.handleAlert();
  }

  return (
    <div className="exam-result mock">
      <BasicAlert ref={alertRef} warning="Something important!"/>

      <PageHeader
        pageTitle="Exam Result"
        handleBack={() => navigate('/')}
        rightIcons={[]}
        leftIcon="home"
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

        <LineChart data={chartData}/>

        <div className="btn check-btn" onClick={() => navigate('/examOverview')}>
          {getIcon('rocket')}&nbsp; Check incorrect answers
        </div>
        <div className="btn save-btn" onClick={() => saveWrongQuestions()}>
          {getIcon('save')}&nbsp; Save all wrong questions
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
