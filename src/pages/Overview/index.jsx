import React, {useCallback, useMemo} from "react"
import "./index.css"
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import {useAnswers, useFilterQuestions, useLang, useQuestions} from "../../store";
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";
import {useNavigate} from "react-router-dom";

const Overview = () => {
  const {allQuestions, allQuestions_CN} = useQuestions();
  const {
    filterByError,
    filterByFavorite,
    updateQuestionIds,
    updateTypeByError,
    updateTypeByFavorite
  } = useFilterQuestions()
  const {isCN} = useLang();
  const {userAnswers} = useAnswers();
  const navigate = useNavigate();

  const questions = useMemo(() => {
    return isCN ? allQuestions_CN : allQuestions;
  }, [isCN, allQuestions_CN, allQuestions])

  const getUserAnswerStatus = useCallback((id, answer) => {
    if (!id) return false;
    const question = questions.find(q => q.id === id);
    return question && question.correct_answer !== answer;
  }, [questions]);

  const getFilteredQuestions = useCallback((filterByError, filterByFavorite, userAnswers, questions) => {
    if (!filterByError && !filterByFavorite) {
      return questions;
    }
    return userAnswers
      .filter((obj, index) => index === userAnswers.findIndex(item => item.questionId === obj.questionId))  // Remove duplicates
      .filter(answer => (filterByError && answer.userAnswer !== -1 && getUserAnswerStatus(answer.questionId, answer.userAnswer))
        || (filterByFavorite && answer.isFavorite))  // Filter answers by Error or Favorite
      .map(answer => questions.find(question => question.id === answer.questionId)) // Get questionId
      .sort((a, b) => a.index - b.index);  // Sort
  }, [getUserAnswerStatus]);

  const filteredQuestions = useMemo(() => {
    const tmpFilteredQuestions = getFilteredQuestions(filterByError, filterByFavorite, userAnswers, questions);
    updateQuestionIds(tmpFilteredQuestions.map(q => q.id));
    return tmpFilteredQuestions;
  }, [filterByError, filterByFavorite, userAnswers, questions, getFilteredQuestions, updateQuestionIds]);

  const getQuestionTypes = (questions) => {
    const res = questions.reduce((acc, question) => {
      const section = question.section;
      if (!acc[section]) {
        acc[section] = {
          sectionName: section, amount: 0, questions: []
        };
      }
      acc[section].amount++;
      acc[section].questions.push(question);
      return acc;
    }, {});
    return Object.values(res);
  };

  const questionTypes = useMemo(() => {
    return getQuestionTypes(filteredQuestions);
  }, [filteredQuestions])

  const handleFilteredQuestions = (type) => {
    if (type === 'error') updateTypeByError(!filterByError);
    if (type === 'favorite') updateTypeByFavorite(!filterByFavorite);
  }

  const handleDetailPage = (index) => {
    navigate(`/question?i=${index}`);
  }

  return (
    <div className="overview">
      <HeaderSection
        isShowWrong={filterByError}
        setShowWrong={() => handleFilteredQuestions('error')}
        isShowFavorite={filterByFavorite}
        setShowFavorite={() => handleFilteredQuestions('favorite')}
        isCN={isCN}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        userAnswers={userAnswers}
        filteredQuestions={filteredQuestions}
        handleDetailPage={handleDetailPage}
      />
    </div>
  )
}

export default Overview;
