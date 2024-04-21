import React, {useEffect, useState} from 'react';
import {
  CLICK_SOUND,
  loadFromLocalStorage, NORMAL_SOUND,
  playSound,
  saveExamToLocalStorage,
  saveToLocalStorage,
  stopTimer
} from "../../common/common";
import "./Exam.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import ExamHeader from "./ExamHeader";
import QuestionInfo from "../../components/BasicQuestion/QuestionInfo";
import QuestionContent from "../../components/BasicQuestion/QuestionContent";
import ExamFooter from "./ExamFooter";
import QuestionExplanation from "../../components/BasicQuestion/QuestionExplanation";

const CURR_QUESTION_CONFIG = {
  questionId: 1, userAnswer: -1
}

const EXAM_CONFIGS = {
  answers: [],
  completed: false,
  createTime: "",
  currIdx: 0,
  questions: [],
  score: 0
}

function Exam() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [isAnswerError, setIsAnswerError] = useState(false);
  const [isExplain, setIsExplain] = useState(false);

  const [currQuestion, setCurrQuestion] = useState({});
  const [currQuestionConfig, setCurrQuestionConfig] = useState(CURR_QUESTION_CONFIG);
  const [examConfig, setExamConfig] = useState(EXAM_CONFIGS)

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const index = searchParams.get("i") || "0";

  useEffect(() => {
    const newIndex = parseInt(index);
    if (newIndex <= 0 || newIndex >= 40) {
      navigate(`/exam?i=${newIndex <= 0 ? 1 : 40}`);
    }
    // eslint-disable-next-line
  }, [index])

  useEffect(() => {
    const setting = initExamConfigs();
    const {answers, questions} = setting;
    setQuestions(questions);
    setUserAnswers(answers);

    const idx = initCurrQuestionIdx();
    const curr = initCurrQuestion(questions, idx);
    initCurrQuestionConfig(curr, answers);
    // eslint-disable-next-line
  }, [index])

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

  useEffect(() => {
    const {correct_answer} = currQuestion;
    const {userAnswer} = currQuestionConfig;
    setIsAnswerError(userAnswer !== correct_answer);
    // eslint-disable-next-line
  }, [currQuestionConfig, currQuestion]);

  useEffect(() => {
    if (examConfig.completed) setIsExplain(true);
    // eslint-disable-next-line
  }, [currQuestionIndex, examConfig.completed]);

  const initExamConfigs = () => {
    const storeExamConfigs = loadFromLocalStorage('examResults', EXAM_CONFIGS);
    const updatedConfig = {...examConfig, ...storeExamConfigs}
    setExamConfig(updatedConfig);
    return updatedConfig;
  }

  const initCurrQuestionIdx = () => {
    const idx = parseInt(index) - 1;
    if (idx <= 0) navigate('/exam?i=1');
    setCurrQuestionIndex(idx);
    return idx;
  }

  const initCurrQuestion = (questions, idx) => {
    const currQuestion = {
      ...questions[idx], isPrev: idx > 0, isNext: idx < questions.length - 1
    }
    setCurrQuestion(currQuestion);
    return currQuestion;
  }

  const initCurrQuestionConfig = (curr, userAnswers) => {
    const answer = userAnswers.find(answer => answer.questionId === curr.id);
    const config = {
      questionId: curr.id, userAnswer: -1, ...answer
    };
    setCurrQuestionConfig(config);
  }

  const handleOptionClick = (idx) => {
    const updated = {...currQuestionConfig, userAnswer: idx};
    setCurrQuestionConfig(updated);

    let newAnswers = [...userAnswers];
    const answerIdx = newAnswers.findIndex(answer => answer.questionId === currQuestion.id);
    if (answerIdx > -1) {
      newAnswers[answerIdx] = updated;
    } else {
      newAnswers.push(updated);
    }

    saveExamConfigToLocal({answers: newAnswers});
    playSound(NORMAL_SOUND);
  }

  const saveExamConfigToLocal = (data) => {
    const updated = {...examConfig, ...data};
    setExamConfig(updated);
    saveToLocalStorage("examResults", updated);
  }

  const changeQuestion = (increment) => {
    setIsExplain(false);
    if (currQuestionIndex <= 0 && increment === -1) return;
    let newIndex = currQuestionIndex + increment;
    setSearchParams({i: (newIndex + 1).toString()});
    playSound(CLICK_SOUND);
  };

  const updateCurrQuestionConfig = () => {
    const updated = {...currQuestionConfig, isFavorite: !currQuestionConfig?.isFavorite};
    setCurrQuestionConfig(updated);
    saveUserAnswersToLocal(updated);
    playSound(CLICK_SOUND);
  }

  const saveUserAnswersToLocal = (updatedCurrQuestionConfig) => {
    let newAnswers = [...userAnswers];
    const idx = newAnswers.findIndex(answer => answer.questionId === currQuestion.id);
    if (idx > -1) {
      newAnswers[idx] = updatedCurrQuestionConfig;
    } else {
      newAnswers.push(updatedCurrQuestionConfig);
    }
    saveExamConfigToLocal({answers: newAnswers})
  }

  const handleSubmit = () => {
    const {completed, answers} = examConfig;
    if (!completed) {
      let newAnswers = [...answers];
      newAnswers.map(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        answer.isCorrect = question && question.correct_answer === answer.userAnswer
        return answer
      });
      const exam = {
        ...examConfig,
        answers: newAnswers,
        score: calcScore(newAnswers),
        completed: true
      }
      saveExamToLocalStorage(exam);
      const examHistory = loadFromLocalStorage("examHistory") || [];
      examHistory.push(exam);
      saveToLocalStorage("examHistory", examHistory);
      stopTimer();
    }
    navigate('/afterExam');
  }

  const calcScore = (answers) => {
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
      <ExamHeader handleSubmit={handleSubmit} submitLabel={examConfig.completed ? 'Result' : 'Submit'}/>
      <div className="main question">
        <div className="content">
          <QuestionInfo
            currQuestion={currQuestion}
            currQuestionIndex={currQuestionIndex}
            questions={questions}
          />

          <div className="content-container">
            <QuestionContent
              isExplain={isExplain}
              isAnswerError={isAnswerError}
              currQuestion={currQuestion}
              chosenAnswerIndex={currQuestionConfig.userAnswer}
              handleOptionClick={handleOptionClick}
            />

            {examConfig.completed
              ? <QuestionExplanation currQuestion={currQuestion}
                                     isExplain={true} isEdit={false}
                                     isAnswerError={isAnswerError}/>
              : ""}
          </div>
        </div>
      </div>

      <ExamFooter
        changeQuestion={changeQuestion}
        filteredQuestions={questions}
        updateCurrQuestionConfig={updateCurrQuestionConfig}
        currQuestionConfig={currQuestionConfig}
        currQuestionIndex={currQuestionIndex}
      />
    </div>
  );
}

export default Exam;
