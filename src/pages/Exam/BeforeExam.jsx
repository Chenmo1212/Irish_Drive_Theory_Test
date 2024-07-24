import React from 'react';
import {getIcon} from "../../styles/icons";
import "./Exam.css"
import ExamCover from '../../assets/svg/exam.svg'
import {useNavigate} from "react-router-dom";
import {useExam, useExamCountdown, useQuestions} from "../../store";

const generateMockExamQuestionIds = (questions, sectionDistribution) => {
  const questionsBySection = questions.reduce((acc, question) => {
    const {section} = question;
    if (!acc[section]) acc[section] = [];
    acc[section].push(question);
    return acc;
  }, {});

  let mockExam = [];
  Object.keys(sectionDistribution).forEach(section => {
    const count = sectionDistribution[section];
    const questionsInSection = questionsBySection[section] || [];
    const selectedQuestions = questionsInSection.length > count
      ? selectRandomQuestions(questionsInSection, count)
      : questionsInSection;
    mockExam.push(...selectedQuestions);
  });
  // Make mockExam randomly
  mockExam = selectRandomQuestions(mockExam, mockExam.length);
  return mockExam.map(question => question.id);
}

const selectRandomQuestions = (questions, count) => {
  const shuffled = questions
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);

  return shuffled.slice(0, count);
}

const sectionDistribution = {
  "Control of Vehicle": 2,
  "Legal Matters/Rules of the Road": 8,
  "Managing Risk": 7,
  "Safe and Socially Responsible Driving": 22,
  "Technical Matters": 1,
};

const BeforeExam = () => {
  const navigate = useNavigate();
  const {allQuestions: questions} = useQuestions();
  const {reset: resetExam, setExamQuestionIds} = useExam();
  const {start: startCountdown} = useExamCountdown();

  const backHome = () => {
    navigate(-1);
  };

  const toExamDetail = () => {
    const mockExamQuestionIds = generateMockExamQuestionIds(questions, sectionDistribution);

    resetExam();
    setExamQuestionIds(mockExamQuestionIds);

    startCountdown();
    navigate('/exam?i=1');
  };

  return (
    <div className='before-exam mock'>
      <div className="header">
        <div className="return">
          <div className="circle" onClick={backHome}>
            {getIcon('arrow_left')}
          </div>
          <div className="page-title">
            {"Mock Exam"}
          </div>
        </div>
      </div>
      <div className="main">
        <div className="card-cover">
          <img src={ExamCover} alt=""/>
        </div>

        <div className="content">
          <div className="content-hd">Instructions</div>
          <div className="content-bd">
            <p>
              1. <b>Sources</b>: Questions are randomly selected from the available question bank.
              The total number of questions is <b>40</b>, and you need to get at least <b>35</b> correct to pass
              the exam.
            </p>
            <p>
              2. <b>Distribution</b>: The distribution of the number of mock exams
              is：<strong>2:8:7:22:1</strong>.<br/>
            </p>
            <p>
              3. <b>Answers</b>: The answers to the questions in the practice exams are for reference only. Be
              sure to provide feedback if the answer is incorrect.
            </p>
          </div>
        </div>

        <div className="start-exam">
          <div className="card-btn" onClick={toExamDetail}>
            <button className="btn begin">
                <span>
                  {getIcon('rocket')}
                </span>
              <span>Start</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeExam;
