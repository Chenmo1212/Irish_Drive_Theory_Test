import React, {useEffect, useState} from "react"
import {
  DELETE_SOUND,
  ERROR_COLOR,
  loadFromLocalStorage,
  playSound,
  questionsEN,
  saveToLocalStorage,
  THEME_COLOR
} from '../../common/common';
import {getIcon} from "../../styles/icons";
import "./Overview.css"
import {useNavigate} from "react-router-dom";

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

  const getStyle = (question) => {
    if (!filteredQuestions.length) return {};

    const {id, correct_answer} = question;
    const userAnswerObj = userAnswers.find(answer => answer.questionId === id);

    const isAnswered = userAnswerObj && userAnswerObj.userAnswer !== -1;
    const isError = userAnswerObj && userAnswerObj.userAnswer !== correct_answer;

    return {
      background: isAnswered ? (isError ? ERROR_COLOR : THEME_COLOR) : "",
      color: isAnswered ? '#fff' : '#000'
    };
  };

  const getFavStatus = (question) => {
    if (!filteredQuestions.length) return {};

    const {id} = question;
    const userAnswerObj = userAnswers.find((answer) => answer.questionId === id);
    return userAnswerObj && userAnswerObj.isFavorite;
  }
  const backDetail = () => {
    navigate(-1);
  }

  const toDetail = (idx) => {
    navigate(`/question/${idx}`);
  }

  const clearLocalAnswers = () => {
    localStorage.removeItem("allAnswers");
    alert("All your answers have been cleared!");
    window.location.reload();
    playSound(DELETE_SOUND);
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("isAnswerStick");
    localStorage.removeItem("isAnswerCheck");
    localStorage.removeItem("currQuestionIdx");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("allQuestions");
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
      });
    filteredQuestions = filteredQuestions.filter((question, index, self) =>
      index === self.findIndex((t) => t.id === question.id));

    return filteredQuestions;
  }

  const getUserAnswerStatus = (id, answer) => {
    if (!id) return false;
    const question = allQuestions.find(q => q.id === id);
    return question && question.correct_answer !== answer;
  }

  return (
    <div className="overview">
      <div className="header">
        <div className="return">
          <div className="circle" style={{color: THEME_COLOR}} onClick={backDetail}>
            {getIcon('arrow_left')}
          </div>
          <div className="page-title">
            {isCN ? "总览" : "Overview"}
          </div>
        </div>

        <div className={`wrong icon ${isShowWrong ? 'active' : ''}`} onClick={() => setShowWrong(!isShowWrong)}>
          {getIcon('wrong')}
        </div>
        <div className={`favorite icon ${isShowFavorite ? 'active' : ''}`}
             onClick={() => setShowFavorite(!isShowFavorite)}>
          {getIcon('fav')}
        </div>
        <div className="clear icon" onClick={clearLocalAnswers}>
          {getIcon('clear')}
        </div>
        <div className="trash icon" onClick={clearLocalStorage}>
          {getIcon('trash')}
        </div>
      </div>

      <div className="container">
        {questionTypes.map((section, sectionIdx,) => (
            <div className="section" key={sectionIdx}>
              <div className="title" style={{color: THEME_COLOR}}>
                <span>{isCN ? section.sectionNameCN : section.sectionName}</span>
              </div>
              <div className="content">
                {section.questions.map(question => (
                  <div className="circle-box" key={question.id}>
                    <div className={`circle active`}
                         style={getStyle(question)}
                         onClick={() => toDetail(question.index)}
                    >
                      {question.index}
                      {getFavStatus(question) &&
                        <div className='svg-box'>{getIcon('fav_fill')}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Overview;