import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('📦 Retrieved token:', token); // <-- Debug log
  
    if (!token) {
      console.warn('⛔ No token found in localStorage');
      return;
    }
  
    axios.get('http://localhost:3001/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('✅ User data:', res.data);
      setUser(res.data);
    })
    .catch((err) => {
      console.error('❌ Error fetching user profile', err);
    });
  }, []);
  

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <img src={user.profilePic || 'https://via.placeholder.com/120'} alt="Profile" className="profile-pic" />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Tip:</strong> Try balancing your sugar and protein intake!</p>
    </div>
  );
};

export default Profile;
