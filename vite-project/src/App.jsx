import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Login</Link> | <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<h1>Welcome to Dashboard (Logged In)</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;