import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddFood from './pages/AddFood';
import FoodList from './pages/FoodList';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';
import SettingsDropdown from './components/SettingsDropdown';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login'; // force redirect
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-logo">HealthyFoodi 🍎</div>
          <div className="navbar-links">
          {token ? (
                <>
                  <Link to="/add">Add Food</Link>
                  <Link to="/food">View Foods</Link>
                  <SettingsDropdown onLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
          )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/add" element={token ? <AddFood /> : <Login />} />
            <Route path="/food" element={token ? <FoodList /> : <Login />} />
            <Route path="/profile" element={token ? <Profile /> : <Login />} />
            <Route path="*" element={token ? <AddFood /> : <Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
