import React, {useEffect, useState} from "react"
import {
  getQuestionTypes,
  loadFromLocalStorage,
  questionsEN,
  saveToLocalStorage
} from '../../common/common';
import "./index.css"
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const questions = questionsEN;
  const isCN = loadFromLocalStorage('isCN', false);
  let questionsConfig = loadFromLocalStorage('questionsConfig', {});
  questionsConfig.filteredQuestions = questionsConfig.filteredQuestions || questions;
  questionsConfig.questionTypes = questionsConfig.questionTypes || getQuestionTypes(questions);

  return {
    isCN,
    questions: loadFromLocalStorage('allQuestions', questions),
    userAnswers: loadFromLocalStorage('userAnswers', []),
    questionsConfig
  };
};

const Overview = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isShowWrong, setShowWrong] = useState(false);
  const [isShowFavorite, setShowFavorite] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [isCN, setIsCN] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {isCN, questions, userAnswers, questionsConfig} = initializeLocalStorage();
    const {isShowWrong=false, isShowFavorite=false, filteredQuestions, questionTypes} = questionsConfig;

    setIsCN(isCN);
    setAllQuestions(questions);
    setUserAnswers(userAnswers);
    setShowWrong(isShowWrong);
    setShowFavorite(isShowFavorite);
    setFilteredQuestions(filteredQuestions);
    setQuestionTypes(questionTypes);
  }, []);

  useEffect(() => {
    if (allQuestions.length) updateQuestionConfig();
    // eslint-disable-next-line
  }, [isShowWrong, isShowFavorite, allQuestions]);

  const updateQuestionConfig = () => {
    const filteredQuestions = getFilteredQuestions();
    const questionTypes = getQuestionTypes(filteredQuestions);
    const updatedConfig = {
      isShowWrong, isShowFavorite, filteredQuestions, questionTypes
    };
    setFilteredQuestions(filteredQuestions);
    setQuestionTypes(questionTypes);
    saveToLocalStorage('questionsConfig', updatedConfig);
  }

  const getFilteredQuestions = () => {
    if (!isShowWrong && !isShowFavorite) {
      return allQuestions;
    }
    let filteredQuestions = userAnswers
      .filter(answer => {
        return (isShowWrong && answer.userAnswer !== -1 && getUserAnswerStatus(answer.questionId, answer.userAnswer))
          || (isShowFavorite && answer.isFavorite);
      })
      .map(answer => {
        return allQuestions.find(question => question.id === answer.questionId);
      })
      .sort((a, b) => a.index - b.index)
    filteredQuestions = filteredQuestions.filter((question, index, self) =>
      index === self.findIndex((t) => t.id === question.id));

    return filteredQuestions;
  }

  const getUserAnswerStatus = (id, answer) => {
    if (!id) return false;
    const question = allQuestions.find(q => q.id === id);
    return question && question.correct_answer !== answer;
  }

  const handleDetailPage = (index) => {
    navigate(`/question?i=${index}`);
  }

  return (
    <div className="overview">
      <HeaderSection
        isShowWrong={isShowWrong}
        setShowWrong={setShowWrong}
        isShowFavorite={isShowFavorite}
        setShowFavorite={setShowFavorite}
        isCN={isCN}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        filteredQuestions={filteredQuestions}
        userAnswers={userAnswers}
        isCN={isCN}
        handleDetailPage={handleDetailPage}
      />
    </div>
  )
}

export default Overview;