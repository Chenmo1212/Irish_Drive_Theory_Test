import React, {useEffect, useState} from 'react';
import {loadExamFromLocalStorage} from "../../common/common";
import HeaderSection from "../../components/BasicOverview/HeaderSection";
import QuestionsSection from "../../components/BasicOverview/QuestionsSection";
import {useNavigate} from "react-router-dom";

const initializeLocalStorage = () => {
  const exam = loadExamFromLocalStorage()
  return {
    exam
  };
};

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
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const {exam} = initializeLocalStorage();
    const {questions, answers} = exam;
    const updatedQuestions = updateQuestionIndex(questions);
    const questionTypes = getQuestionTypes(updatedQuestions);

    setQuestions(updatedQuestions);
    setAnswers(answers);
    setQuestionTypes(questionTypes);
  }, []);

  const handleDetailPage = (index) => {
    navigate(`/exam?i=${index}`);
  }

  return (
    <div className="exam overview">
      <HeaderSection
        isShowWrong={false}
        setShowWrong={() => {}}
        isShowFavorite={false}
        setShowFavorite={() => {}}
        isCN={false}
        isShowRight={false}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        filteredQuestions={questions}
        userAnswers={answers}
        isCN={false}
        handleDetailPage={handleDetailPage}
      />
    </div>
  );
};

export default ExamOverview;
