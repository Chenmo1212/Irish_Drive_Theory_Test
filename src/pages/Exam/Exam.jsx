import React, {useEffect, useState} from 'react';
import {getIcon} from "../../styles/icons";
import {loadFromLocalStorage} from "../../common/common";
import "./index.css"
import {useNavigate} from "react-router-dom";

import Timer from "../../components/Timer/Timer";

const initializeLocalStorage = () => {
  const isCN = loadFromLocalStorage('isCN', false);

  return {
    isCN
  };
};


function Exam() {
  const [isCN, setIsCN] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {isCN} = initializeLocalStorage();

    setIsCN(isCN);
  }, []);

  const backHome = () => {
    navigate(-1);
  };

  return (
    <div className='beforeExam mock'>
      <div className="header">
        <div className="return">
          <div className="circle" onClick={backHome}>
            {getIcon('arrow_left')}
          </div>
          <div className="page-title">
            {isCN ? "模拟考试" : "Mock Exam"}
          </div>
        </div>
      </div>
      <div className="main">
        <Timer />
      </div>
    </div>
  );
}

export default Exam;
