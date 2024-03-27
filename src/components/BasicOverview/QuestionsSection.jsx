import React from 'react';
import {getIcon} from "../../styles/icons";
import {CORRECT_COLOR, ERROR_COLOR, THEME_COLOR} from '../../common/common';

const QuestionsSection = ({questionTypes, filteredQuestions, userAnswers, isCN, handleDetailPage, isCheckAnswer=true}) => {
  const getFavStatus = (question) => {
    if (!filteredQuestions.length) return {};

    const {id} = question;
    const userAnswerObj = userAnswers.find((answer) => answer.questionId === id);
    return userAnswerObj && userAnswerObj.isFavorite;
  }

  const getIsAnswered = (id) => {
    const userAnswerObj = userAnswers.find(answer => answer.questionId === id);
    return userAnswerObj && userAnswerObj.userAnswer !== -1;
  }

  const getStyle = (question) => {
    if (!filteredQuestions.length) return {};

    const {id, correct_answer} = question;
    const userAnswerObj = userAnswers.find(answer => answer.questionId === id);
    const isAnswered = userAnswerObj && userAnswerObj.userAnswer !== -1;
    let bgColor = isAnswered ? THEME_COLOR : "";
    let textColor = isAnswered ? '#fff' : '#000';

    if (isCheckAnswer) {
      const isError = userAnswerObj && userAnswerObj.userAnswer !== correct_answer;
      bgColor = isAnswered ? (isError ? ERROR_COLOR : CORRECT_COLOR) : "";
    }

    return {
      background: bgColor,
      color: textColor
    };
  };

  const toDetail = (idx) => {
    const index = filteredQuestions.findIndex(q => q.index === idx);
    handleDetailPage(index + 1);
  }

  return (
    <div className="page-body">
      {questionTypes.map((section, sectionIdx) => (
        <div className="section" key={sectionIdx}>
          {section.sectionName && <div className="title" style={{color: THEME_COLOR}}>
            <span>{isCN ? section.sectionNameCN : section.sectionName}</span>
          </div>}
          <div className="content">
            {section.questions.map(question => (
              <div className="circle-box" key={question.id}>
                <div className={`circle ${getIsAnswered(question.id) ? 'active' : ''}`}
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
