import React, {useEffect, useState} from 'react';
import Mine from "../Mine/Mine";
import Home from "./Home";
import './Layout.css'
import {getIcon} from "../../styles/icons";
import {useNavigate} from "react-router-dom";
import {useLang} from "../../store";
import {useIntro} from "../../store/config.store";
import {setHomeIntro, setMineIntro} from "../../utils/intro";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const {isCN} = useLang();
  const {isMineIntro: isMineIntroFinished, isHomeIntro: isHomeIntroFinished, update: updateIntro} = useIntro();

  useEffect(() => {
    if (!isMineIntroFinished && isActive) {
      setMineIntro(isCN, updateIntro);
    }
  }, [isMineIntroFinished, isActive]);

  useEffect(() => {
    if (!isHomeIntroFinished) {
      setHomeIntro(isCN, updateIntro);
    }
  }, [isHomeIntroFinished]);

  const handleHomeIntro = (isCompleted) => {
    if (!isCompleted) {
      setHomeIntro(isCN, updateIntro);
    }
  }

  const navigate = useNavigate();

  return (<>
    <div className="layout">
      <div className={`menu-nav ${isActive ? "" : 'inactive'}`}>
        <Mine/>
      </div>
      <div className={`main ${isActive ? "" : 'inactive'}`}>
        <div className="menu-icons">
          <div className={`menu-circle icon-settings m_button ${isActive ? 'active' : ""}`}
               onClick={() => setIsActive(!isActive)}
               id="m_button">
            <span/>
            <span/>
            <span/>
          </div>
          <div className="title">
            <span>Little Cookies</span>
            <span className="question-icon"
                  onClick={() => handleHomeIntro(false)}>{getIcon('question')}</span>
          </div>
          <div className='menu-circle icon-about' onClick={() => navigate('/about')}>
            {getIcon('reg_bell')}
          </div>
        </div>
        <Home/>
      </div>
    </div>
  </>)
}

export default Layout
