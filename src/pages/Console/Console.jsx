import React, {useEffect, useMemo, useState} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import './Console.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Console = () => {
  const [storeKey, setStoreKey] = useState("version");
  const [userAnswersIpt, setUserAnswersIpt] = useState("");
  const navigate = useNavigate();
  const storeValue = useMemo(() => {
    return localStorage.getItem(`ddt-${storeKey}`)
  }, [storeKey])
  const storeKeys = ["version", "questions", "filterQuestions", "currQuestionIdx", "questionConfig", "answers",
    "notification", "lang", "exam", "exam-countdown", "exam-history"];

  useEffect(() => {
    setUserAnswersIpt(storeValue);
  }, [storeValue])

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const saveStoreData = () => {
    const newStoreData = userAnswersIpt;
    if (canStoreNewData(newStoreData)) {
      saveToLocalStorage(`ddt-${storeKey}_BAK`, JSON.parse(storeValue));
      saveToLocalStorage(`ddt-${storeKey}`, JSON.parse(newStoreData));
    } else {
      alert("Data is illegal!");
    }
  }

  const canStoreNewData = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const clearAllData = () => {
    localStorage.clear();
    alert("Clear all data!");
  }

  // const isAnswersValid = (input) => {
  //   if (!Array.isArray(input)) {
  //     return false;
  //   }
  //
  //   for (let i = 0; i < input.length; i++) {
  //     const element = input[i];
  //     if (typeof element !== 'object' || !('questionId' in element) || !('userAnswer' in element)) {
  //       console.error('Invalid element:', element);
  //       return false;
  //     }
  //
  //     if (typeof element.questionId !== 'number' || element.questionId < 0 || element.questionId > 792) {
  //       console.error('Invalid question id:', element);
  //       return false;
  //     }
  //
  //     if (typeof element.userAnswer !== 'number' || element.userAnswer < -1 || element.userAnswer > 3) {
  //       console.error('Invalid user answer:', element);
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  return (
    <div className='console'>
      <PageHeader pageTitle="Back"
                  handleBack={() => navigate('/')}
                  rightIcons={[]}
      />

      <div className="body">
        <div className="local-storage-ipt">
          <select placeholder="Input localstorage key:" onChange={(e) => setStoreKey(e.target.value)}>
            {
              storeKeys.map((key) => (
                <option value={key} key={key}>{key}</option>
              ))
            }
          </select>

          <CopyToClipboard text={storeValue} onCopy={() => alert("Copied!")}>
            <button className="rect-round-button btn">Copy</button>
          </CopyToClipboard>
        </div>


        <div className="store-data-ipt">
          <textarea value={userAnswersIpt} onChange={e => setUserAnswersIpt(e.target.value)}/>
        </div>

        <div className="btn-group">
          <div className="rect-round-button btn" onClick={saveStoreData}>Save</div>
          <div className="rect-round-button btn danger" onClick={() => clearAllData()}>Clear All</div>
        </div>

      </div>

    </div>
  );
};

export default Console;
