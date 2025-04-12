import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    axios.get('http://localhost:3001/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUser(res.data);
      setWeeklyData(res.data.weeklyNutrition); // assuming your API sends this
    })
    .catch((err) => {
      console.error('Error fetching user profile', err);
    });
  }, []);

  if (!user) return <div>Loading...</div>;

  const pieData = weeklyData
    ? Object.entries(weeklyData).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
      }))
    : [];

    console.log("📊 Weekly Nutrition:", weeklyData);


  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Tip:</strong> Try balancing your sugar and protein intake!</p>

      {pieData.length > 0 && (
        <div className="nutrition-chart">
          <h3>🧮 Weekly Nutrition Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Profile;
