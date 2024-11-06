import React, {useEffect, useState} from 'react';
import Mine from "../Mine/Mine";
import Home from "./Home";
import './Layout.css'
import {getIcon} from "../../styles/icons";
import {useNavigate} from "react-router-dom";
import {useLang} from "../../store";
import {useIntro} from "../../store/config.store";
import {setMineIntro} from "../../utils/intro";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const {isCN} = useLang();
  const {isMineIntro: isMineIntroFinished, update: updateIntro} = useIntro();

  useEffect(() => {
    if (!isMineIntroFinished && isActive) {
      setMineIntro(isCN, updateIntro);
    }
  }, [isMineIntroFinished, isActive]);

  const navigate = useNavigate();
  return (<>
    <div className="layout">
      <div className={`menu-nav ${isActive ? "" : 'inactive'}`}>
        <Mine/>
      </div>
      <div className={`main ${isActive ? "" : 'inactive'}`}>
        <div className="menu-icons">
          <div className={`menu-circle i-settings m_button ${isActive ? 'active' : ""}`}
               onClick={() => setIsActive(!isActive)}
               id="m_button">
            <span/>
            <span/>
            <span/>
          </div>
          <span>Little Cookies</span>
          <div className='menu-circle i-about' onClick={() => navigate('/about')}>
            {getIcon('reg_bell')}
          </div>
        </div>
        <Home/>
      </div>
    </div>
  </>)
}

export default Layout
