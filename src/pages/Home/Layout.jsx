import React, {useState} from 'react';
import Mine from "../Mine/Mine";
import Home from "./Home";
import './Layout.css'
import {getIcon} from "../../styles/icons";
import {useNavigate} from "react-router-dom";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  return (<>
    <div className="layout">
      <div className={`menu-nav ${isActive ? "" : 'inactive'}`}>
        <Mine/>
      </div>
      <div className={`main ${isActive ? "" : 'inactive'}`}>
        <div className="menu-icons">
          <div className={`menu-circle m_button ${isActive ? 'active' : ""}`}
               onClick={() => setIsActive(!isActive)}
               id="m_button">
            <span/>
            <span/>
            <span/>
          </div>
          <span>Little Cookies</span>
          <div className='menu-circle' onClick={() => navigate('/about')}>
            {getIcon('reg_bell')}
          </div>
        </div>
        <Home/>
      </div>
    </div>
  </>)
}

export default Layout
