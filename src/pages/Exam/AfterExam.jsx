import React, {useEffect} from 'react';
import PageHeader from "../../components/Header/PageHeader";
import {useNavigate} from "react-router-dom";
import {loadExamFromLocalStorage} from "../../common/common";

const AfterExam = () => {
  const [score, setScore] = React.useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const exam = loadExamFromLocalStorage();
    const {score} = exam;
    setScore(score);
  }, []);

  return (
    <div className="after-exam">
      <PageHeader
        pageTitle="Exam Result"
        handleBack={() => navigate('/')}
        rightIcons={[]}
      />

      <div className="body">
        <div className="result rect-round-button">
          {score} / 40
        </div>
      </div>
    </div>
  );
};

export default AfterExam;
