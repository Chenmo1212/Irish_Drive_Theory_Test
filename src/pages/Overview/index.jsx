import React, {useEffect, useState} from "react"
import {getQuestionTypes, loadFromLocalStorage, questionsEN, saveToLocalStorage} from '../../common/common';
import "./index.css"
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import {useNavigate} from "react-router-dom";
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";

const QUESTIONS_CONFIG = {
  appVersion: "",
  isCN: false,
  isExplain: false,
  isStick: false,
  isCheck: false,
  filterByError: false,
  filterByFavorite: false,
  filteredQuestions: []
}

const Overview = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionsConfig, setQuestionsConfig] = useState(QUESTIONS_CONFIG);
  const [questionTypes, setQuestionTypes] = useState([]);

  const [filterByError, setFilterByError] = useState(false);
  const [filterByFavorite, setFilterByFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const questions = initQuestions();
    const questionsConfig = initQuestionsConfig(questions);
    initQuestionTypes(questionsConfig.filteredQuestions);
    initUserAnswers();
    // eslint-disable-next-line
  }, [questions]);

  const initQuestions = () => {
    const questions = questionsEN;
    setQuestions(questions);
    return questions
  }

  const initQuestionsConfig = (questions) => {
    const storedQuestionsConfig = loadFromLocalStorage('questionsConfig', QUESTIONS_CONFIG);
    let updatedConfig = {...questionsConfig, ...storedQuestionsConfig};
    const filteredQuestions = getFilteredQuestions(questions, updatedConfig);
    updatedConfig = {...updatedConfig, filteredQuestions};
    setFilterByError(updatedConfig.filterByError);
    setFilterByFavorite(updatedConfig.filterByFavorite);
    setQuestionsConfig(updatedConfig);
    saveToLocalStorage('questionsConfig', updatedConfig);
    return updatedConfig;
  }

  const initQuestionTypes = (questions) => {
    const questionTypes = getQuestionTypes(questions);
    setQuestionTypes(questionTypes);
    return questionTypes;
  }

  const getFilteredQuestions = (questions, questionsConfig) => {
    const {filterByError, filterByFavorite} = questionsConfig;
    if (!filterByError && !filterByFavorite) {
      return questions;
    }
    let filteredQuestions = userAnswers
      .filter(answer => {
        return (filterByError && answer.userAnswer !== -1 && getUserAnswerStatus(questions, answer.questionId, answer.userAnswer))
          || (filterByFavorite && answer.isFavorite);
      })
      .map(answer => {
        return questions.find(question => question.id === answer.questionId);
      })
      .sort((a, b) => a.index - b.index)
    filteredQuestions = filteredQuestions.filter((question, index, self) =>
      index === self.findIndex((t) => t.id === question.id));

    return filteredQuestions;
  }

  const getUserAnswerStatus = (questions, id, answer) => {
    if (!id) return false;
    const question = questions.find(q => q.id === id);
    return question && question.correct_answer !== answer;
  }

  const initUserAnswers = () => {
    const storedUserAnswers = loadFromLocalStorage('userAnswers', []);
    setUserAnswers(storedUserAnswers);
    return storedUserAnswers;
  }

  const handleDetailPage = (index) => {
    navigate(`/question?i=${index}`);
  }

  const handleFilteredQuestions = (type) => {
    if (type === 'error') setFilterByError(!filterByError);
    if (type === 'favorite') setFilterByFavorite(!filterByFavorite);
    let updatedConfig = {...questionsConfig}
    if (type === 'error') {
      updatedConfig.filterByError = !filterByError;
    } else {
      updatedConfig.filterByFavorite = !filterByFavorite;
    }

    const filteredQuestions = getFilteredQuestions(questions, updatedConfig);

    const questionsType = getQuestionTypes(filteredQuestions);
    setQuestionTypes(questionsType)

    updatedConfig.filteredQuestions = filteredQuestions;
    updateQuestionsConfig(updatedConfig);
  }

  const updateQuestionsConfig = (data) => {
    const updated = {...questionsConfig, ...data};
    setQuestionsConfig(updated);
    saveToLocalStorage('questionsConfig', updated);
  }

  return (
    <div className="overview">
      <HeaderSection
        isShowWrong={questionsConfig.filterByError}
        setShowWrong={() => handleFilteredQuestions('error')}
        isShowFavorite={questionsConfig.filterByFavorite}
        setShowFavorite={() => handleFilteredQuestions('favorite')}
        isCN={questionsConfig.isCN}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        filteredQuestions={questionsConfig.filteredQuestions}
        userAnswers={userAnswers}
        isCN={questionsConfig.isCN}
        handleDetailPage={handleDetailPage}
      />
    </div>
  )
}

export default Overview;