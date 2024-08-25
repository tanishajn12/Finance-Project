import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup";
import Quiz from "./components/Quiz/Quiz"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path ="/quiz" element={<Quiz/>} />
      </Routes>
    </Router>
  );
}

export default App;
