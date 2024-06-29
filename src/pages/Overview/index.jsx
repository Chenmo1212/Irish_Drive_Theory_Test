import React, {useEffect, useState} from "react"
import {
  getQuestionTypes,
  loadFromLocalStorage,
  QUESTIONS_CONFIG,
  questionsEN,
  saveToLocalStorage
} from '../../common/common';
import "./index.css"
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import {useNavigate} from "react-router-dom";
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";

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
    return userAnswers
      .filter((obj, index) => index === userAnswers.findIndex(item => item.questionId === obj.questionId))  // Remove duplicates
      .filter(answer => (filterByError && answer.userAnswer !== -1 && getUserAnswerStatus(questions, answer.questionId, answer.userAnswer))
        || (filterByFavorite && answer.isFavorite))  // Filter answers by Error or Favorite
      .map(answer => questions.find(question => question.id === answer.questionId)) // Get questionId
      .sort((a, b) => a.index - b.index);  // Sort
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
