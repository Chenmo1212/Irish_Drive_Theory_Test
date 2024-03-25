import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './index.css'
import {
  DEFAULT_VERSION,
  loadFromLocalStorage,
  NEW_VERSION,
  questionsCN,
  questionsEN,
  saveToLocalStorage,
  updateDataIfNewVersion
} from '../../common/common';
import BasicQuestion from "../../components/BasicQuestion";

const initializeQuestions = () => {
  const currentVersion = loadFromLocalStorage('appVersion', DEFAULT_VERSION);
  const isCN = loadFromLocalStorage('isCN', false);
  let questions_EN = loadFromLocalStorage('allQuestions', questionsEN);
  let questions_CN = loadFromLocalStorage('allQuestions_CN', questionsCN);
  const isUpdate = updateDataIfNewVersion(currentVersion, NEW_VERSION);

  if (isUpdate) {
    console.info(`App Updated: ${currentVersion} => ${NEW_VERSION}`)
    questions_EN = questionsEN;
    saveToLocalStorage("allQuestions", questionsEN);
    saveToLocalStorage("allQuestions_CN", questionsCN);
  } else {
    console.info(`App Current Version: ${currentVersion}`);
  }

  return {
    isCN,
    questions_EN,
    questions_CN,
    questionsConfig: loadFromLocalStorage('questionsConfig', {}),
    userAnswers: loadFromLocalStorage('userAnswers', []),
    isShowAnswerInErrorMode: loadFromLocalStorage('isShowAnswerInErrorMode', true),
    isAnswerCheck: loadFromLocalStorage('isAnswerCheck', false),
    isAnswerStick: loadFromLocalStorage('isAnswerStick', false),
  };
};

const initializeCurrQuestionIndex = (pageIdx) => {
  const storedCurrQuestionIdx = loadFromLocalStorage('currQuestionIdx');
  if (pageIdx) {
    saveToLocalStorage('currQuestionIdx', pageIdx - 1);
    return pageIdx - 1;
  } else {
    return storedCurrQuestionIdx >= 0 ? storedCurrQuestionIdx : 0;
  }
};

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsCN, setQuestionsCN] = useState([]);
  const [questionsEN, setQuestionsEN] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [chosenAnswerIndex, setChosenAnswerIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isExplain, setIsExplain] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isStick, setIsStick] = useState(false);
  const [isCN, setIsCN] = useState(false);

  const {index} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      isCN,
      questions_EN,
      questions_CN,
      questionsConfig,
      userAnswers,
      isAnswerCheck,
      isAnswerStick
    } = initializeQuestions();
    if (parseInt(index) <= 0) navigate('/question/1')
    const idx = initializeCurrQuestionIndex(parseInt(index));
    const {id} = questions_EN[idx];
    const userAnswer = userAnswers.find(answer => answer.questionId === id);
    const {filteredQuestions} = questionsConfig;

    setQuestions(isCN ? questions_CN : questions_EN);
    setQuestionsCN(questions_CN);
    setQuestionsEN(questions_EN);
    setFilteredQuestions(filteredQuestions);
    setUserAnswers(userAnswers);
    setCurrQuestionIndex(idx);
    setChosenAnswerIndex(userAnswer ? userAnswer.userAnswer : -1);
    setIsFavourite(userAnswer ? userAnswer.isFavorite : false);
    setIsCheck(isAnswerCheck);
    setIsStick(isAnswerStick);
    setIsExplain(isAnswerStick);
    setIsCN(isCN);
    // eslint-disable-next-line
  }, [index, currQuestionIndex]);

  const updateUserAnswers = (id, newValue, isFavoriteUpdate = false) => {
    const answerIndex = userAnswers.findIndex(answer => answer.questionId === id);
    if (answerIndex > -1) {
      if (!isFavoriteUpdate) {
        userAnswers[answerIndex].userAnswer = newValue;
      } else {
        userAnswers[answerIndex].isFavorite = newValue;
      }
    } else {
      userAnswers.push({
        questionId: id,
        userAnswer: isFavoriteUpdate ? -1 : newValue,
        isFavorite: isFavoriteUpdate ? newValue : isFavourite,
      });
    }
    setUserAnswers(userAnswers);
    saveToLocalStorage('userAnswers', userAnswers);
  }

  const handleQuestions = (isCN) => {
    setQuestions(isCN ? questionsCN : questionsEN);
  }

  return (
    <div className="normal-mode">
      <BasicQuestion
        isCN={isCN}
        setIsCN={setIsCN}
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
        questions={questions}
        handleQuestions={handleQuestions}
        currQuestionIndex={currQuestionIndex}
        updateUserAnswers={updateUserAnswers}
        chosenAnswerIndex={chosenAnswerIndex}
        setChosenAnswerIndex={setChosenAnswerIndex}
        isExplain={isExplain}
        setIsExplain={setIsExplain}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        isStick={isStick}
        setIsStick={setIsStick}
        filteredQuestions={filteredQuestions}
      />
    </div>
  );
};


export default Question