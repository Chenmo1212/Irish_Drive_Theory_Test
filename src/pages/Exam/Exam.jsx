import React, {useEffect, useState} from 'react';
import {
  CLICK_SOUND,
  loadExamFromLocalStorage,
  // loadFromLocalStorage,
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

const initializeLocalStorage = () => {
  // const isCN = loadFromLocalStorage('isCN', false);
  const exam = loadExamFromLocalStorage()

  return {
    exam
  };
};


function Exam() {
  // const [isCN, setIsCN] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [currQuestionIndex, setCurrQuestionIndex] = useState({});
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const index = searchParams.get("i") || "0";

  useEffect(() => {
    const {exam} = initializeLocalStorage();
    const {questions, answers, currIdx} = exam;
    const idx = getQuestionIdx(questions, currIdx);
    if (parseInt(index) <= 0) navigate('/exam?i=1');
    if (parseInt(index) >= 40) navigate('/exam?i=40');

    setQuestions(questions);
    setCurrQuestionIndex(idx);
    setCurrQuestion(questions[idx]);
    setAnswers(answers);
    // setIsCN(isCN);
  }, [index, currQuestionIndex]);

  const getQuestionIdx = (questions, storedIdx) => {
    let idx = parseInt(index) - 1;
    if (!idx) idx = storedIdx
    if (idx < 0) idx = 0;
    if (idx > questions.length - 1) idx = questions.length - 1;
    return idx
  }

  const handleOptionClick = (idx) => {
    let newAnswers = [...answers];
    newAnswers[currQuestionIndex] = idx;
    setAnswers(newAnswers);

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

  return (
    <div className='exam mock'>
      <ExamHeader/>
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
              chosenAnswerIndex={answers[currQuestionIndex]}
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
