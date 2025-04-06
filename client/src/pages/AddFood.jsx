import React, { useState } from 'react';
import { insertFood } from '../api';
import './AddFood.css';

const AddFood = () => {
  const [food, setFood] = useState({
    name: '',
    location: '',
    rating: '',
    sugar: '',
    protein: '',
    calories: '',
    fat: '',
    fiber: '',
  });

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: food.name,
      location: food.location,
      rating: parseFloat(food.rating),
      nutrition: {
        sugar: parseFloat(food.sugar),
        protein: parseFloat(food.protein),
        calories: parseFloat(food.calories),
        fat: parseFloat(food.fat),
        fiber: parseFloat(food.fiber),
      },
    };

    try {
      await insertFood(payload);
      alert('✅ Food added!');
      setFood({
        name: '',
        location: '',
        rating: '',
        sugar: '',
        protein: '',
        calories: '',
        fat: '',
        fiber: '',
      });
    } catch (err) {
      console.error('Error adding food:', err);
      alert('❌ Failed to add food');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="add-food-container">
        <h2>Add New Food</h2>
        <form onSubmit={handleSubmit} className="food-form">
          <div className="form-columns">
            <div className="form-left">
              <div className="form-section">
                <label>Name</label>
                <input type="text" name="name" value={food.name} onChange={handleChange} required />
              </div>

              <div className="form-section">
                <label>Location</label>
                <input type="text" name="location" value={food.location} onChange={handleChange} required />
              </div>

              <div className="form-section">
                <label>Rating (1-10)</label>
                <input type="number" name="rating" value={food.rating} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-right">
              <h4>Nutrition Facts</h4>
              <div className="form-grid">
                <div className="form-section">
                  <label>Sugar (g)</label>
                  <input type="number" name="sugar" value={food.sugar} onChange={handleChange} required />
                </div>

                <div className="form-section">
                  <label>Protein (g)</label>
                  <input type="number" name="protein" value={food.protein} onChange={handleChange} required />
                </div>

                <div className="form-section">
                  <label>Calories</label>
                  <input type="number" name="calories" value={food.calories} onChange={handleChange} required />
                </div>

                <div className="form-section">
                  <label>Fat (g)</label>
                  <input type="number" name="fat" value={food.fat} onChange={handleChange} required />
                </div>

                <div className="form-section">
                  <label>Fiber (g)</label>
                  <input type="number" name="fiber" value={food.fiber} onChange={handleChange} />
                </div>
              </div>
            </div>
            <p>@2024</p>
          </div>

          <button type="submit">Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
