import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Question from "./pages/Questions";
import Overview from "./pages/Overview";
import BeforeExam from "./pages/Exam/BeforeExam";
import Exam from "./pages/Exam/Exam";
import ExamOverview from "./pages/Exam/ExamOverview";
import ExamResult from "./pages/Exam/ExamResult";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/question" element={<Question/>}/>
            <Route path="/overview" element={<Overview/>}/>
            <Route path="/beforeExam" element={<BeforeExam/>}/>
            <Route path="/exam" element={<Exam/>}/>
            <Route path="/examOverview" element={<ExamOverview/>}/>
            <Route path="/afterExam" element={<ExamResult/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
