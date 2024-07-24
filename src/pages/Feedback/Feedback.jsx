import React, {useRef, useState} from 'react';
import "./Feedback.css"
import PageHeader from "../../components/Header/PageHeader";
import {useLang} from "../../store";
import {useNavigate} from "react-router-dom";
import {getIcon} from "../../styles/icons";
import {submitFeedback} from "../../api/index"
import BasicAlert from "../../components/BasicAlert/BasicAlert";

const FEEDBACK_TYPE = {
  "advice": {
    "en": "Advice",
    "cn": "改进建议"
  },
  "bug": {
    "en": "Bug",
    "cn": "Bug提交"
  },
  "developer": {
    "en": "Developer",
    "cn": "对开发者的话"
  }
}

const Feedback = () => {
  const [type, setType] = useState('advice');
  const [feedCont, setFeedCont] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');
  const [warningIpt, setWarningIpt] = useState([]);

  const {isCN} = useLang();
  const navigate = useNavigate();
  const alertRef = useRef();

  const removeWarning = () => {
    document.getElementById('content').classList.remove('warning');
    document.getElementById('mail').classList.remove('warning');
  };

  const checkMail = () => {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (reg.test(email)) {
      const updatedWarningIpt = warningIpt.filter(item => item !== 'email');
      setWarningIpt(updatedWarningIpt);
      return true;
    } else {
      setWarningIpt([...warningIpt, 'email']);
      setWarning(isCN ? '邮箱格式不正确' : 'Invalid email format');
      alertRef.current.handleAlert();
      return false;
    }
  };

  const checkContent = () => {
    if (feedCont) {
      const updatedWarningIpt = warningIpt.filter(item => item !== 'content');
      setWarningIpt(updatedWarningIpt);
      return true;
    } else {
      setWarningIpt([...warningIpt, 'content']);
      setWarning(isCN ? '反馈内容为空' : 'Feedback content is empty!');
      alertRef.current.handleAlert();
      return false;
    }
  };

  const submitBug = () => {
    if (!checkMail()) return;
    if (!checkContent()) return;


    const data = {
      type: 'ddt',
      name: name,
      content: `#### 类型：\n\n${FEEDBACK_TYPE[type][isCN ? 'cn' : 'en']}\n\n\n#### 内容：\n\n${feedCont}\n\n\n#### 称呼：\n\n${name}\n\n\n#### 联系方式：\n\nEmail: ${email}\n\n\n#### Agent：\n\nAgent: ${navigator.userAgent} DWAPI/7.0`,
      email: email,
      website: "",
      agent: navigator.userAgent + ' DWAPI/7.0'
    };

    submitFeedback(data)
      .then(() => {
        setWarning(isCN ? '提交成功！感谢您的反馈！' : 'Thank you for your feedback!');
        alertRef.current.handleAlert();
      })
      .catch(() => {
        setWarning(isCN ? '提交失败了，请重试' : 'Submission failed, please try again');
        alertRef.current.handleAlert();
      })
      .finally(() => {
        setType('advice');
        setFeedCont('');
        setEmail('');
        setName('');
      })
  };

  return (
    <div className="feedback">
      <BasicAlert ref={alertRef} warning={warning}/>

      <PageHeader pageTitle={isCN ? "意见反馈" : "Feedback"}
                  rightIcons={[]} handleBack={() => navigate('/')}/>
      <div className="main">
        <div className="title mt-0"><span className="text">{isCN ? "反馈类型" : "Type"}</span></div>
        <div className="type-content">
          {Object.keys(FEEDBACK_TYPE).map((key) => (
            <label key={key} className="radio" onClick={() => setType(key)}>
              <span className="radio-bg"/>
              <input
                checked={type === key}
                id={key}
                name="type"
                type="radio"
                value={key}
                readOnly
              /> {FEEDBACK_TYPE[key][isCN ? 'cn' : 'en']}
              <span className="radio-on"/>
            </label>
          ))}
        </div>
        <div className="title"><span className="text">{isCN ? '反馈内容' : 'Content'}</span></div>
        <textarea
          value={feedCont}
          className={`content ${warningIpt.includes('content') ? 'warning' : ''}`}
          id="content"
          onFocus={removeWarning}
          onChange={(e) => setFeedCont(e.target.value)}
        />
        <div className="title"><span className="text">{isCN ? '称呼（选填）' : 'Name (Optional)'}</span></div>
        <input
          type="text"
          className="input name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="title"><span className="text">{isCN ? '邮箱' : 'Email'}</span></div>
        <input
          type="text"
          className={`input email ${warningIpt.includes('email') ? 'warning' : ''}`}
          value={email}
          id="mail"
          onFocus={removeWarning}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn submit" onClick={submitBug}>
          <span className="icon-container">
            <span>{getIcon("rocket")}</span>
            <span>{isCN ? '立即提交' : 'Submit'}</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;
