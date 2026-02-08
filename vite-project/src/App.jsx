import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Ab ye sahi jagah dhundega kyunki App.jsx aur components/ dono src ke andar hain
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Drive from "./pages/Drive";

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
        <Link to="/">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/dashboard">Dashboard</Link> | 
        <Link to="/drive">Google Drive</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drive" element={<Drive />} />
      </Routes>
    </Router>
  );
}

export default App;