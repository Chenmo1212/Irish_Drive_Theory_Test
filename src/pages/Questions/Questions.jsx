import React, {useEffect, useMemo} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './Questions.css'
import BasicQuestion from "../../components/BasicQuestion";
import {useCurrQuestionIdx, useFilterQuestions, useLang, useQuestions} from "../../store";


const Questions = () => {
  const {allQuestions, allQuestions_CN} = useQuestions();
  const {filterQuestionIds} = useFilterQuestions()
  const {currQuestionIdx, update: updateCurrQuestionIdx} = useCurrQuestionIdx();
  const {isCN} = useLang();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchIndex = parseInt(searchParams.get("i") || "0");

  useEffect(() => {
    if (searchIndex) {
      const idx = searchIndex - 1;
      if (idx < 0) navigate('/question?i=1');
      updateCurrQuestionIdx(idx);
    } else {
      navigate('/question?i=1')
    }
  }, [searchIndex])

  const questions = useMemo(() => {
    const questions = isCN ? allQuestions_CN : allQuestions;
    if (filterQuestionIds && filterQuestionIds.length > 0) {
      return questions.filter(question => filterQuestionIds.includes(question.questionId));
    }
    return questions
  }, [isCN, filterQuestionIds, allQuestions, allQuestions_CN]);

  const currQuestion = useMemo(() => {
    return questions[currQuestionIdx];
  }, [questions, currQuestionIdx, searchIndex]);

  return (<div className="normal-mode">
    <BasicQuestion
      questions={questions}
      currQuestion={currQuestion}
    />
  </div>);
};


export default Questions
