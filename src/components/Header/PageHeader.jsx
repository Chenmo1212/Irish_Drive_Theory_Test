import React from 'react';
import {THEME_COLOR} from '../../utils/helper';
import {getIcon} from "../../styles/icons";
import './PageHeader.css'

const PageHeader = ({pageTitle, handleBack, rightIcons, leftIcon = 'arrow_left'}) => {
  return (
    <div className="page-header header">
      <div className="return">
        <div className="circle" style={{color: THEME_COLOR}} onClick={handleBack}>
          {getIcon(leftIcon)}
        </div>
        <div className="page-title">
          {pageTitle}
        </div>
      </div>

      {rightIcons.map((icon, index) => (
        <div key={index} className={`icon ${icon.name} ${icon.active ? 'active' : ''}`} onClick={icon.action}>
          {getIcon(icon.active ? icon.name : (icon.inactiveName || icon.name))}
        </div>
      ))}
    </div>
  );
};

export default PageHeader;
