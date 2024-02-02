import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/questions/:index" element={<Questions/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
