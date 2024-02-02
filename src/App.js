import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Question from "./pages/Questions/Question";
import Overview from "./pages/Overview/Overview";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/question/:index" element={<Question/>}/>
            <Route path="/overview" element={<Overview/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
