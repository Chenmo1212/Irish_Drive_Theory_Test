import React, {useState} from 'react';
import Mine from "../Mine/Mine";
import Home from "./Home";
import './Layout.css'

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  return (<>
    <div className="layout">

      <div className={`menu-nav ${isActive ? "" : 'inactive'}`}>
        <Mine/>
      </div>
      <div className={`main ${isActive ? "" : 'inactive'}`}>
        <div className={`menu-circle m_button ${isActive ? 'active' : ""}`}
             onClick={() => setIsActive(!isActive)}
             id="m_button">
          <span/>
          <span/>
          <span/>
        </div>
        <Home/>
      </div>
    </div>
  </>)
}

export default Layout
