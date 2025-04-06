import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SD.css';

const SettingsDropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    setOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout();
  };

  const handleDeleteAccount = () => {
    setOpen(false);
    alert('🔐 Delete Account logic goes here (future feature)');
  };

  return (
    <div className="settings-dropdown">
      <button onClick={() => setOpen(!open)} className="settings-icon">⚙️</button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={handleProfile}>👤 Profile</button>
          <button onClick={handleLogout}>❌ Logout</button>
          <button onClick={handleDeleteAccount}>🗑️ Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
