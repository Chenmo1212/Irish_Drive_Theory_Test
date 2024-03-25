import React from 'react';
import {getIcon} from "../../styles/icons";
import {ERROR_COLOR, THEME_COLOR} from '../../common/common';
import {useNavigate} from "react-router-dom";

const QuestionsSection = ({questionTypes, filteredQuestions, userAnswers, isCN}) => {
  const navigate = useNavigate();
  const getFavStatus = (question) => {
    if (!filteredQuestions.length) return {};

    const {id} = question;
    const userAnswerObj = userAnswers.find((answer) => answer.questionId === id);
    return userAnswerObj && userAnswerObj.isFavorite;
  }

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


  const toDetail = (idx) => {
    navigate(`/question/${idx}`);
  }

  return (
    <div className="page-body">
      {questionTypes.map((section, sectionIdx) => (
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
                    <div className='svg-box'>{getIcon('fav')}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsSection;
