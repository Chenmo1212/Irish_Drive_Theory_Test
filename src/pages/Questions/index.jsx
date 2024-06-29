import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './index.css'
import {loadFromLocalStorage, NEW_VERSION, questionsCN, questionsEN, saveToLocalStorage} from '../../common/common';
import BasicQuestion from "../../components/BasicQuestion";

const CURR_QUESTION_CONFIG = {
  questionId: 1, userAnswer: -1, isFavorite: false,
}

const QUESTIONS_CONFIG = {
  appVersion: NEW_VERSION,
  isCN: false,
  isExplain: false,
  isStick: false,
  isCheck: false,
  filterByError: false,
  filterByFavorite: false,
  filteredQuestions: []
}

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [currQuestion, setCurrQuestion] = useState({});
  const [currQuestionConfig, setCurrQuestionConfig] = useState(CURR_QUESTION_CONFIG); // TODO: Seems like it could be merged into userAnswers
  const [questionsConfig, setQuestionsConfig] = useState(QUESTIONS_CONFIG);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const index = searchParams.get("i") || "0"

  useEffect(() => {
    const setting = initSetting();
    const questions = initQuestions(setting);
    const idx = initCurrQuestionIdx();
    const curr = initCurrQuestion(questions, idx);
    const userAnswers = initUserAnswers();
    initCurrQuestionConfig(curr, userAnswers);
    // eslint-disable-next-line
  }, [index]);

  useEffect(() => {
    if (!questions.length || currQuestionIndex < 0) return;

    const index = currQuestionIndex < questions.length ? currQuestionIndex : 0;
    const question = questions[index];
    const allQuestions = questionsConfig.isCN ? questionsCN : questionsEN;
    const curr = allQuestions.find(e => e.id === question.id);
    setCurrQuestion({
      ...curr,
      isPrev: index > 0,
      isNext: index < questions.length - 1
    })
  }, [currQuestionIndex, questions, questionsConfig.isCN])

  const initSetting = () => {
    const storedQuestionsConfig = loadFromLocalStorage('questionsConfig', QUESTIONS_CONFIG);
    const updatedConfig = {...questionsConfig, ...storedQuestionsConfig}
    setQuestionsConfig(updatedConfig);
    return updatedConfig;
  }

  const initQuestions = (setting) => {
    const {isCN, filteredQuestions} = setting;
    let questions;

    if (filteredQuestions && filteredQuestions.length > 0) questions = filteredQuestions;
    else questions = isCN ? questionsCN : questionsEN;

    setQuestions(questions);
    return questions;
  }

  const initCurrQuestionIdx = () => {
    const idx = parseInt(index) - 1;
    if (idx <= 0) navigate('/question?i=1');
    setCurrQuestionIndex(idx);
    return idx
  }

  const initCurrQuestion = (questions, idx) => {
    const currQuestion = {
      ...questions[idx], isPrev: idx > 0, isNext: idx < questions.length - 1
    }
    setCurrQuestion(currQuestion);
    return currQuestion;
  }

  const initUserAnswers = () => {
    const storedUserAnswers = loadFromLocalStorage('userAnswers', []);
    setUserAnswers(storedUserAnswers);
    return storedUserAnswers;
  }

  const initCurrQuestionConfig = (curr, userAnswers) => {
    const answer = userAnswers.find(answer => answer.questionId === curr.id);
    const config = {
      questionId: curr.id, isFavorite: false, userAnswer: -1, ...answer
    };
    setCurrQuestionConfig(config);
  }

  const updateQuestionsConfig = (data) => {
    const updated = {...questionsConfig, ...data};
    setQuestionsConfig(updated);
    saveToLocalStorage('questionsConfig', updated);
  }

  const updateCurrQuestionConfig = (data) => {
    const updated = {...currQuestionConfig, ...data};
    setCurrQuestionConfig(updated);
    saveUserAnswersToLocal(updated);
  }

  const saveUserAnswersToLocal = (updatedCurrQuestionConfig) => {
    let newUserAnswers = [...userAnswers];
    const idx = newUserAnswers.findIndex(answer => answer.questionId === currQuestion.id);
    if (idx > -1) {
      newUserAnswers[idx] = updatedCurrQuestionConfig;
    } else {
      newUserAnswers.push(updatedCurrQuestionConfig);
    }
    saveToLocalStorage('userAnswers', newUserAnswers);
  }

  const handleQuestionLanguage = (isCN) => {
    const questions = isCN ? questionsCN : questionsEN;
    const curr = questions[currQuestionIndex]
    setCurrQuestion({...currQuestion, ...curr});
  }

  return (<div className="normal-mode">
    <BasicQuestion
      questions={questions}
      currQuestion={currQuestion}
      currQuestionIndex={currQuestionIndex}
      currQuestionConfig={currQuestionConfig}
      updateCurrQuestionConfig={updateCurrQuestionConfig}
      questionsConfig={questionsConfig}
      updateQuestionsConfig={updateQuestionsConfig}
      setSearchParams={setSearchParams}
      handleQuestionLanguage={(isCN) => handleQuestionLanguage(isCN)}
    />
  </div>);
};


export default Question
