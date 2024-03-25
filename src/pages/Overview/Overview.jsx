import React, {useEffect, useState} from "react"
import {
  DELETE_SOUND,
  loadFromLocalStorage,
  playSound,
  questionsEN,
  removeFromLocalStorage,
  saveToLocalStorage
} from '../../common/common';
import "./Overview.css"
import {useNavigate} from "react-router-dom";
import PageHeader from "../../components/Header/PageHeader";
import QuestionsSection from "./QuestionsSection";

const initializeLocalStorage = () => {
  const questions = questionsEN;
  const isCN = loadFromLocalStorage('isCN', false);
  let questionsConfig = loadFromLocalStorage('questionsConfig', {
    isShowWrong: false, isShowFavorite: false, filteredQuestions: [], questionTypes: []
  });
  questionsConfig.filteredQuestions = questionsConfig.filteredQuestions.length ? questionsConfig.filteredQuestions : questions;
  questionsConfig.questionTypes = questionsConfig.questionTypes.length ? questionsConfig.questionTypes : getQuestionTypes(questions);

  return {
    isCN,
    questions: loadFromLocalStorage('allQuestions', questions),
    userAnswers: loadFromLocalStorage('userAnswers', []),
    questionsConfig
  };
};

const sectionTranslations = {
  "Control of Vehicle": "车辆控制",
  "Legal Matters/Rules of the Road": "法律事务/交通规则",
  "Managing Risk": "管理风险",
  "Safe and Responsible Driving": "安全和负责任的驾驶",
  "Technical Matters": "技术问题",
};

const getQuestionTypes = (questions) => {
  const res = questions.reduce((acc, question) => {
    const section = question.section;
    if (!acc[section]) {
      acc[section] = {
        sectionName: section,
        sectionNameCN: sectionTranslations[section] || "未知",
        amount: 0,
        questions: []
      };
    }
    acc[section].amount++;
    acc[section].questions.push(question);
    return acc;
  }, {});
  return Object.values(res);
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
    const {isShowWrong, isShowFavorite, filteredQuestions, questionTypes} = questionsConfig;

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

  const backDetail = () => {
    navigate(-1);
  }

  const clearLocalAnswers = () => {
    removeFromLocalStorage(['allAnswers', 'userAnswers'])
    alert("All your answers have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

  const clearLocalStorage = () => {
    removeFromLocalStorage(['isAnswerStick', 'isAnswerCheck', 'currQuestionIdx',
      'userAnswers', 'allQuestions', 'questionsConfig']);
    alert("All data have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

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

  const rightIcons = [
    {
      name: 'wrong',
      action: () => setShowWrong(!isShowWrong),
      active: isShowWrong,
    }, {
      name: 'fav',
      action: () => setShowFavorite(!isShowFavorite),
      active: isShowFavorite,
    }, {
      name: 'clear',
      action: clearLocalAnswers,
    }, {
      name: 'trash',
      action: clearLocalStorage,
    },
  ]

  return (
    <div className="overview">
      <PageHeader
        pageTitle="Overview"
        handleBack={backDetail}
        rightIcons={rightIcons}
      />

      <QuestionsSection
        questionTypes={questionTypes}
        filteredQuestions={filteredQuestions}
        userAnswers={userAnswers}
        isCN={isCN}
      />
    </div>
  )
}

export default Overview;