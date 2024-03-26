import React, {useEffect, useState} from 'react';
import {
  CLICK_SOUND,
  loadExamFromLocalStorage,
  NORMAL_SOUND,
  playSound,
  saveExamToLocalStorage
} from "../../common/common";
import "./index.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import ExamHeader from "./ExamHeader";
import QuestionInfo from "../../components/BasicQuestion/QuestionInfo";
import QuestionContent from "../../components/BasicQuestion/QuestionContent";
import ExamFooter from "./ExamFooter";

function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [currQuestionIndex, setCurrQuestionIndex] = useState({});
  const [answers, setAnswers] = useState([]);
  const [chosenAnswerIdx, setChosenAnswerIdx]= useState(-1);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const index = searchParams.get("i") || "0";

  useEffect(() => {
    const exam = loadExamFromLocalStorage();
    const {questions, answers, currIdx} = exam;
    const idx = getQuestionIdx(questions, currIdx);
    if (parseInt(index) <= 0) navigate('/exam?i=1');
    if (parseInt(index) >= 40) navigate('/exam?i=40');

    setQuestions(questions);
    setCurrQuestionIndex(idx);
    setCurrQuestion(questions[idx]);

    const {id} = questions[idx];
    const answer = answers.find(e=>e.questionId === id);
    setChosenAnswerIdx(answer?.userAnswer || -1);
    setAnswers(answers);
  }, [index, currQuestionIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '1':
        case 'A':
        case 'a':
          handleOptionClick(0);
          break;
        case '2':
        case 'B':
        case 'b':
          handleOptionClick(1);
          break;
        case '3':
        case 'C':
        case 'c':
          handleOptionClick(2);
          break;
        case '4':
        case 'D':
        case 'd':
          handleOptionClick(3);
          break;
        case 'ArrowLeft':
          changeQuestion(-1);
          break;
        case 'ArrowRight':
          changeQuestion(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [index, currQuestionIndex]);

  const getQuestionIdx = (questions, storedIdx) => {
    let idx = parseInt(index) - 1;
    if (!idx) idx = storedIdx
    if (idx < 0) idx = 0;
    if (idx > questions.length - 1) idx = questions.length - 1;
    return idx
  }

  const handleOptionClick = (idx) => {
    const {id} = currQuestion;
    const answerIndex = answers.findIndex(answer => answer.questionId === id);
    let newAnswers = [...answers];

    if (answerIndex > -1) {
      newAnswers[answerIndex].userAnswer = idx;
    } else {
      newAnswers.push({
        questionId: id,
        userAnswer: idx
      });
    }
    setAnswers(newAnswers);
    setChosenAnswerIdx(idx);

    const exam = loadExamFromLocalStorage();
    saveExamToLocalStorage({
      ...exam,
      answers: newAnswers
    })
    playSound(NORMAL_SOUND);
  }

  const changeQuestion = (increment) => {
    if (index <= 0 && increment === -1) return;
    let newIndex = currQuestionIndex + increment;
    newIndex = newIndex <= 0 ? 0 : newIndex;
    newIndex = newIndex >= questions.length ? questions.length : newIndex;
    setSearchParams({i: (newIndex + 1).toString()});
    playSound(CLICK_SOUND);
  }

  const handleSubmit = () => {
    const exam = loadExamFromLocalStorage();
    saveExamToLocalStorage({
      ...exam,
      score: calcScore()
    })
    navigate('/afterExam')
  }

  const calcScore = () => {
    let score = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question && question.correct_answer === answer.userAnswer) {
        score += 1;
      }
    });
    return score;
  }

  return (
    <div className='exam mock'>
      <ExamHeader handleSubmit={handleSubmit}/>
      <div className="main question">
        <div className="content">
          <QuestionInfo
            currQuestion={currQuestion}
            currQuestionIndex={currQuestionIndex}
            filteredQuestions={questions}
          />

          <div className="content-container">
            <QuestionContent
              currQuestion={currQuestion}
              chosenAnswerIndex={chosenAnswerIdx}
              handleOptionClick={handleOptionClick}
            />
          </div>
        </div>

        <ExamFooter
          changeQuestion={changeQuestion}
          filteredQuestions={questions}
          currQuestionIndex={currQuestionIndex}
        />
      </div>
    </div>
  );
}

export default Exam;
