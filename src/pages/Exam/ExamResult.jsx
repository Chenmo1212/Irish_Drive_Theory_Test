import React, {useEffect, useMemo, useRef} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {CORRECT_COLOR, ERROR_COLOR, NORMAL_SOUND, playSound} from "../../utils/helper";
import ExamResultChart from "../../components/Chart/Chart";
import LineChart from "../../components/LineChart/LineChart";
import {getIcon} from "../../styles/icons";
import BasicAlert from "../../components/BasicAlert/BasicAlert";
import {useAnswers, useExam, useExamCountdown, useExamHistory, useLang} from "../../store";
import {setExamResultIntro} from "../../utils/intro";
import {useIntro} from "../../store/config.store";

const ExamResult = () => {
  const {isCN} = useLang();
  const {secondsLeft} = useExamCountdown();
  const {answers, score} = useExam();
  const {userAnswers, reset: resetAnswers} = useAnswers();
  const {examHistory} = useExamHistory();
  const {isExamResultIntro: isExamResultIntroFinished, update: updateIntro} = useIntro();
  const chartData = useMemo(() => {
    return examHistory.map((i, _) => i.score);
  }, [examHistory])

  const alertRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isExamResultIntroFinished) {
      setExamResultIntro(isCN, updateIntro);
    }
  }, [isExamResultIntroFinished]);

  const getUsedTime = () => {
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
    answers.forEach(examAnswer => {
      if (!examAnswer.isCorrect || examAnswer.isFavorite) {
        const index = newUserAnswers.findIndex(userAnswer => userAnswer.questionId === examAnswer.questionId);
        if (index !== -1) {
          delete examAnswer.isCorrect
          newUserAnswers[index] = {...newUserAnswers[index], ...examAnswer, isFavorite: examAnswer.isFavorite};
        } else {
          const {questionId, userAnswer} = examAnswer
          newUserAnswers.push({questionId, userAnswer, isFavorite: examAnswer.isFavorite});
        }
      }
    });
    resetAnswers(newUserAnswers);
    playSound(NORMAL_SOUND);

    alertRef.current.handleAlert();
  }

  return (
    <div className="exam-result mock">
      <BasicAlert ref={alertRef} warning="Saved all wrongs questions to favorite!"/>

      <PageHeader
        pageTitle="Exam Result"
        handleBack={() => navigate('/')}
        rightIcons={[{name: 'question', action: () => updateIntro("isExamResultIntro", false)}]}
        leftIcon="home"
      />

      <div className="body">
        <ExamResultChart title="Result" score={score}/>

        <div className="section">
          <div className="result">
            <div className="text"
                 style={{color: score >= 35 ? CORRECT_COLOR : ERROR_COLOR}}
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
