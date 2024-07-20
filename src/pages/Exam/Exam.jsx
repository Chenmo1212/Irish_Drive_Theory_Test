import React, {useEffect, useMemo, useState} from 'react';
import {CLICK_SOUND, playSound} from "../../common/common";
import "./Exam.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import ExamHeader from "./ExamHeader";
import QuestionInfo from "../../components/BasicQuestion/QuestionInfo";
import QuestionContent from "../../components/BasicQuestion/QuestionContent";
import BasicModal from "../../components/BasicModal/BasicModal";
import {useExam, useExamCountdown, useExamHistory, useQuestions} from "../../store";
import ExamFooter from "./ExamFooter";
import QuestionExplanation from "../../components/BasicQuestion/QuestionExplanation";

function Exam() {
  const {allQuestions} = useQuestions();
  const {secondsLeft, updateCountdownStatus} = useExamCountdown();
  const {add: addExamToHistory} = useExamHistory();
  const {
    createdTime,
    questionIds,
    answers,
    isCompleted,
    isExplain,
    currIdx,
    setExamCurrIdx,
    setExamAnswers,
    setExamScore,
    setExamStatus,
    setExamIsExplain
  } = useExam();
  const [isModalShow, setIsModalShow] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchIndex = parseInt(searchParams.get("i") || "0");
  const toggleModal = () => setIsModalShow(!isModalShow);

  const questions = useMemo(() => {
    return questionIds.map(id => allQuestions.find(question => question.id === id));
  }, [questionIds, allQuestions]);

  const currQuestion = useMemo(() => {
    return questions[currIdx];
  }, [questions, currIdx])

  const answer = useMemo(() => {
    return answers.filter(answer => answer.questionId === currQuestion?.id)[0];
  }, [answers, currQuestion]);

  const isAnswerError = useMemo(() => {
    return answer?.userAnswer !== currQuestion?.correct_answer
  }, [answer, currQuestion])

  useEffect(() => {
    if (searchIndex) {
      const newIndex = searchIndex - 1;
      if (newIndex <= 0 || newIndex >= 40) {
        navigate(`/exam?i=${newIndex <= 0 ? 1 : 40}`);
      }
      setExamCurrIdx(newIndex);
    } else {
      navigate('/exam?i=1');
    }
    // eslint-disable-next-line
  }, [searchIndex])

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '1':
        case 'A':
        case 'a':
          updateAnswer({userAnswer: 0});
          break;
        case '2':
        case 'B':
        case 'b':
          updateAnswer({userAnswer: 1});
          break;
        case '3':
        case 'C':
        case 'c':
          updateAnswer({userAnswer: 2});
          break;
        case '4':
        case 'D':
        case 'd':
          updateAnswer({userAnswer: 3});
          break;
        case 'ArrowLeft':
          changeQuestion(-1);
          break;
        case 'ArrowRight':
          changeQuestion(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [searchIndex, currIdx]);

  useEffect(() => {
    if (isCompleted) setExamIsExplain(true);
    // eslint-disable-next-line
  }, [currIdx, isCompleted]);

  const updateAnswer = (newAnswer) => {
    const updatedAnswers = [...answers];
    const answerIndex = answers.findIndex(answer => answer.questionId === currQuestion.id);

    if (answerIndex === -1) {
      updatedAnswers.push({
        questionId: currQuestion.id,
        ...newAnswer
      });
    } else {
      updatedAnswers[answerIndex] = {...updatedAnswers[answerIndex], ...newAnswer};
    }

    setExamAnswers(updatedAnswers);
    playSound(CLICK_SOUND);
  }

  const changeQuestion = (increment) => {
    if (isExplain) setExamIsExplain(false);
    if (currIdx <= 0 && increment === -1) return;
    if (currIdx >= questionIds.length - 1 && increment === 1) return;
    setExamCurrIdx(currIdx + increment);
    playSound(CLICK_SOUND);
  };

  const handleSubmit = () => {
    if (!isCompleted) toggleModal();
    else navigate('/afterExam');
  }

  const handleExamSubmit = () => {
    const newAnswers = questions.map((q, _) => {
      const userAnswer = answers.find(a => a.questionId === q.id)?.userAnswer;
      return {
        questionId: q.id,
        userAnswer: userAnswer !== -1 ? userAnswer : -1,
        isCorrect: q.correct_answer === userAnswer
      }
    });
    const score = newAnswers.filter(a => a.isCorrect).length;
    setExamAnswers(newAnswers);
    setExamScore(score);
    setExamStatus(true);
    updateCountdownStatus(false);

    const exam = {
      createdTime: createdTime,
      answers: newAnswers,
      score: score,
      questionIds: questionIds,
      usedTime: 60 * 40 - secondsLeft,
    }
    addExamToHistory(exam);
    navigate('/afterExam');
  }

  return (
    <div className='exam mock'>
      <ExamHeader handleSubmit={handleSubmit} submitLabel={isCompleted ? 'Result' : 'Submit'}/>
      <div className="main question">
        <div className="content">
          <QuestionInfo
            currQuestion={currQuestion}
            currQuestionIndex={currIdx}
            questions={questions}
          />

          <div className="content-container">
            <QuestionContent
              isExplain={isExplain}
              isAnswerError={isAnswerError}
              currQuestion={currQuestion}
              chosenAnswerIndex={answer?.userAnswer}
              handleOptionClick={(idx) => updateAnswer({userAnswer: idx})}
            />

            {isCompleted
              ? <QuestionExplanation
                currQuestion={currQuestion}
                isAnswerError={isAnswerError}
                isExplain={true}
                isEdit={false}
              />
              : ""}
          </div>
        </div>
      </div>

      <ExamFooter
        answer={answer}
        changeQuestion={changeQuestion}
        updateFavorite={(bool) => updateAnswer({isFavorite: bool})}
      />

      <BasicModal
        title='Warning'
        text="Do you want to submit all your answers? This will end the exam!"
        submitText='Submit'
        cancelText='Cancel'
        show={isModalShow}
        onClose={toggleModal}
        onSubmit={handleExamSubmit}
      />
    </div>
  );
}

export default Exam;
