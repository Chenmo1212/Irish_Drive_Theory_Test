import React, {useMemo} from 'react';
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";
import {useNavigate} from "react-router-dom";
import {useExam, useQuestions} from "../../store";

const updateQuestionIndex = (questions) => {
  return questions.map((e, i) => {
    return {
      ...e,
      index: i + 1
    }
  })
}
const getQuestionTypes = (questions) => {
  return [{
    sectionName: '',
    questions: questions
  }];
}

const ExamOverview = () => {
  const {allQuestions} = useQuestions();
  const navigate = useNavigate();

  const {
    answers,
    questionIds,
    isCompleted,
  } = useExam();

  const questions = useMemo(() => {
    const tmpQuestions = questionIds.map(id => allQuestions.find(question => question.id === id)) || [];
    return updateQuestionIndex(tmpQuestions);
  }, [questionIds, allQuestions]);

  const questionTypes = useMemo(() => {
    return getQuestionTypes(questions);
  }, [questions])

  const handleDetailPage = (index) => {
    navigate(`/exam?i=${index}`);
  }

  return (
    <div className="exam overview">
      <HeaderSection
        isShowWrong={false}
        setShowWrong={() => {
        }}
        isShowFavorite={false}
        setShowFavorite={() => {
        }}
        isCN={false}
        isShowRight={false}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        filteredQuestions={questions}
        userAnswers={answers}
        handleDetailPage={handleDetailPage}
        isCheckAnswer={isCompleted}
      />
    </div>
  );
};

export default ExamOverview;
