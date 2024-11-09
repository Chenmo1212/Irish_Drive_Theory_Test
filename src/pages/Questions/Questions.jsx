import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './Questions.css'
import BasicQuestion from "../../components/BasicQuestion";
import {useCurrQuestionIdx, useFilterQuestions, useLang, useQuestionConfig, useQuestions} from "../../store";
import {setQuestionIntro} from "../../utils/intro";
import {useIntro} from "../../store/config.store";
import {flushSync} from "react-dom";


const Questions = () => {
  const {allQuestions, allQuestions_CN} = useQuestions();
  const {filterQuestionIds} = useFilterQuestions()
  const {currQuestionIdx, update: updateCurrQuestionIdx} = useCurrQuestionIdx();
  const {isCN} = useLang();
  const {update: updateQuestionConfig} = useQuestionConfig();
  const {isQuestionIntro: isQuestionIntroFinished, update: updateIntro} = useIntro();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchIndex = parseInt(searchParams.get("i") || "0");

  const [isShowIntro, setIsShowIntro] = useState(!isQuestionIntroFinished);

  useEffect(() => {
    if (searchIndex) {
      const idx = searchIndex - 1;
      if (idx < 0) navigate('/question?i=1');
      updateCurrQuestionIdx(idx);
    } else {
      navigate('/question?i=1')
    }
    // eslint-disable-next-line
  }, [searchIndex])

  useEffect(() => {
    if (isShowIntro) {
      updateIntro("isQuestionIntro", false);
    }
  }, [isShowIntro])

  useEffect(() => {
    if (isShowIntro && !isQuestionIntroFinished) {
      flushSync(() => updateQuestionConfig({isExplain: true}));
      setQuestionIntro(isCN, updateIntro, handleIntroAfterClose);
    }
  }, [isQuestionIntroFinished, isShowIntro]);

  const handleIntroAfterClose = () => {
    updateQuestionConfig({isExplain: false});
    setIsShowIntro(false);
  }

  const questions = useMemo(() => {
    const questions = isCN ? allQuestions_CN : allQuestions;
    if (filterQuestionIds && filterQuestionIds.length > 0) {
      return questions.filter(question => filterQuestionIds.includes(question.id));
    }
    return questions
  }, [isCN, filterQuestionIds, allQuestions, allQuestions_CN]);

  const currQuestion = useMemo(() => {
    return questions[currQuestionIdx];
  }, [questions, currQuestionIdx]);

  return (<div className="normal-mode">
    <BasicQuestion
      questions={questions}
      currQuestion={currQuestion}
      setIsShowIntro={setIsShowIntro}
    />
  </div>);
};


export default Questions
