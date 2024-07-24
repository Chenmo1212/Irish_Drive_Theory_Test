import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from "./pages/Home/Layout";
import Questions from "./pages/Questions/Questions";
import Overview from "./pages/Overview";
import BeforeExam from "./pages/Exam/BeforeExam";
import Exam from "./pages/Exam/Exam";
import ExamOverview from "./pages/Exam/ExamOverview";
import ExamResult from "./pages/Exam/ExamResult";
import About from "./pages/About/About";
import Console from "./pages/Console/Console";
import {useVersion} from "./store/config.store";
import {useQuestions} from "./store";
import {useEffect} from "react";

const CURRENT_VERSION = "2.0.0.240724";

function App() {
  const {version, update: updateVersion} = useVersion();
  const {reset: resetQuestions} = useQuestions();

  useEffect(() => {
    if (version.localeCompare(CURRENT_VERSION) < 0) {
      updateVersion(CURRENT_VERSION);
      resetQuestions();
    }
  }, [version, updateVersion, resetQuestions]);

  return (<Router>
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Layout/>}/>
          <Route path="/question" element={<Questions/>}/>
          <Route path="/overview" element={<Overview/>}/>
          <Route path="/beforeExam" element={<BeforeExam/>}/>
          <Route path="/exam" element={<Exam/>}/>
          <Route path="/examOverview" element={<ExamOverview/>}/>
          <Route path="/afterExam" element={<ExamResult/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/console" element={<Console/>}/>
        </Routes>
      </main>
    </div>
  </Router>);
}

export default App;
