import React, { useEffect, useState } from 'react';
import { getAllFoods, deleteFoodById } from '../api';
import './FoodList.css';
import HealthMeter from '../components/HealthMeter';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await getAllFoods();
        setFoods(res.data.data);
      } catch (err) {
        console.error('Error fetching foods:', err);
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFoodById(id);
      setFoods(foods.filter((food) => food._id !== id));
    } catch (err) {
      console.error('Failed to delete food:', err);
    }
  };

  return (
    <div className="food-list">
      <h2>All Foods</h2>
      <div className="food-grid unique-food-grid"> {/* Added 'unique-food-grid' class */}
        {Array.isArray(foods) &&
          foods.map((food) => (
            <div key={food._id} className="food-card">
              <button className="delete-btn" onClick={() => handleDelete(food._id)}>❌</button>
              <h3>{food.name}</h3>
              <p><strong>Location:</strong> {food.location}</p>
              <p><strong>Rating:</strong> {food.rating}/10</p>
              <ul>
                <li>Calories: {food.nutrition?.calories}</li>
                <li>Sugar: {food.nutrition?.sugar}g</li>
                <li>Protein: {food.nutrition?.protein}g</li>
                <li>Fat: {food.nutrition?.fat}g</li>
                {food.nutrition?.fiber && <li>Fiber: {food.nutrition?.fiber}g</li>}
              </ul>
              <HealthMeter food={food.nutrition} />
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default FoodList;