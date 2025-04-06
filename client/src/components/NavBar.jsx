import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">HealthyFoodi</div>
      <ul className="navbar__links">
        <li><Link to="/">Add Food</Link></li>
        <li><Link to="/food">View Foods</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
