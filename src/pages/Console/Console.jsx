import React, {useState} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import './Console.css'
import {useAnswers} from "../../store";

const Console = () => {
  const [userAnswersIpt, setUserAnswersIpt] = useState("");
  const {answers} = useAnswers();
  const navigate = useNavigate();

  const loadUserAnswers = () => {
    setUserAnswersIpt(JSON.stringify(answers));
  }

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const saveUserAnswers = () => {
    const newAnswers = JSON.parse(userAnswersIpt);

    if (isAnswersValid(newAnswers)) {
      saveToLocalStorage("ddt-answers_Bak", answers);
      saveToLocalStorage("ddt-answers", newAnswers);
    }
  }

  const isAnswersValid = (input) => {
    if (!Array.isArray(input)) {
      return false;
    }

    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      if (typeof element !== 'object' || !('questionId' in element) || !('userAnswer' in element)) {
        console.error('Invalid element:', element);
        return false;
      }

      if (typeof element.questionId !== 'number' || element.questionId < 0 || element.questionId > 792) {
        console.error('Invalid question id:', element);
        return false;
      }

      if (typeof element.userAnswer !== 'number' || element.userAnswer < -1 || element.userAnswer > 3) {
        console.error('Invalid user answer:', element);
        return false;
      }
    }

    return true;
  }

  const handleUserAnswers = (value) => {
    setUserAnswersIpt(value);
  }

  return (
    <div className='console'>
      <PageHeader pageTitle="Back"
                  handleBack={() => navigate('/')}
                  rightIcons={[]}
      />

      <div className="body">
        <div className="rect-round-button btn" onClick={loadUserAnswers}>
          Read User Answers
        </div>

        <div className="user-answers-ipt">
          <textarea value={userAnswersIpt} onChange={e => handleUserAnswers(e.target.value)}/>
        </div>

        <div className="save-btn">
          <div className="rect-round-button btn" onClick={saveUserAnswers}>Save</div>
        </div>
      </div>

    </div>
  );
};

export default Console;
