import React, {useRef, useState} from 'react';
import './Mine.css'
import {useLang} from "../../store";
import {getIcon} from "../../styles/icons";
import {useNavigate} from "react-router-dom";
import {DELETE_SOUND, playSound, removeFromLocalStorage} from "../../utils/helper";
import BasicModal from "../../components/BasicModal/BasicModal";
import BasicAlert from "../../components/BasicAlert/BasicAlert";

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playBtnWave = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="header">
      <div className="bg">
        <div className="circle__avatar">
          <span className="circle__btn" onClick={playBtnWave}>
          <span className={isPlaying ? 'pause active' : 'pause'}/>
          <span className={isPlaying ? 'play' : 'play active'}/></span>
          <span className="circle__back-1"/>
          <span className="circle__back-2"/>
        </div>
        <div className="wrapper">
          <div className="typing-demo">
            DDT 2024 By ChenMo.
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [modalShow, setModalShow] = useState(false);
  const {isCN, update} = useLang();
  const alertRef = useRef();
  const navigate = useNavigate();
  const toggleModal = () => setModalShow(!modalShow);

  const clearLocalAnswers = () => {
    removeFromLocalStorage(['ddt-answers']);
    alertRef.current.handleAlert();
    playSound(DELETE_SOUND);
    toggleModal();
    setTimeout(() => window.location.reload(), 3000);
  }

  return (
    <>
      <div className="settings">
        <div className="item item-language">
          <span className="left">{getIcon('language')}</span>
          <span>{isCN ? '切换语言' : 'Switch language'}</span>
          <span className="switch-container">
            <label className="switch" onClick={() => update(!isCN)}>
              <input type="checkbox" checked={isCN} readOnly/>
            </label>
          </span>
        </div>
        <div className="item item-clear">
          <span className="left">{getIcon('clear')}</span>
          <span>{isCN ? '清空数据' : 'Clear data'}</span>
          <span className="right-icon" onClick={() => toggleModal()}>
            <span className="circle">
              {getIcon("arrow_right")}
            </span>
          </span>
        </div>
        <div className="item item-feedback">
          <span className="left">{getIcon('feedback')}</span>
          <span>{isCN ? '反馈！' : 'Feedback'}</span>
          <span className="right-icon" onClick={() => navigate('/feedback')}>
            <span className="circle">
              {getIcon("arrow_right")}
            </span>
          </span>
        </div>
        <div className="item item-coffee">
          <span className="left">{getIcon('coffee')}</span>
          <span>{isCN ? '给我买杯咖啡吧！' : 'Buy me a coffee!'}</span>
          <span className="right-icon" onClick={() => window.open("https://www.buymeacoffee.com/chenmo")}>
            <span className="circle">
              {getIcon("arrow_right")}
            </span>
          </span>
        </div>
      </div>

      <BasicAlert ref={alertRef} warning={isCN ? "你的所有数据都已被清除！" : "All your answers have been cleared!"}/>

      <BasicModal
        title={isCN ? '警告' : 'Warning'}
        text={isCN ? '您想清除用户数据吗？此操作是不可逆的!' : "Do you want to clear user data? This operation is irreversible."}
        submitText={isCN ? '确定' : 'Confirm'}
        cancelText={isCN ? '取消' : 'Cancel'}
        show={modalShow}
        onClose={toggleModal}
        onSubmit={clearLocalAnswers}
      />
    </>
  )
}

const Mine = () => {
  return (
    <>
      <div className="mine">
        <Header/>

        <Settings/>

        <Footer/>
      </div>
    </>
  )
}


const Footer = () => {
  const currYear = new Date().getFullYear();
  return (<footer>
    <p className="footer">All rights reserved ©{currYear} <a
      href="https://chenmo1212.cn?f=irish-questions">ChenMo1212</a>
    </p>
  </footer>)
}

export default Mine
