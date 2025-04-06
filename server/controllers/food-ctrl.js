const Food = require('../models/food-models');


const addFood = async (req, res) => {
    const body = req.body;
  
    if (!body.name || !body.location || !body.rating || !body.nutrition) {
      return res.status(400).json({ success: false, error: 'Missing food fields' });
    }
  
    try {
      const food = new Food({
        ...body,
        user: req.user.id, // 👈 add this!
      });
  
      await food.save();
  
      return res.status(201).json({
        success: true,
        id: food._id,
        message: "Food created"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Food not created'
      });
    }
  };
  
  

const updateFood = async (req, res) => {
    const body = req.body;
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'Must provide a food to update',
      });
    }
  
    try {
      const food = await Food.findOne({ _id: req.params.id });
  
      if (!food) {
        return res.status(404).json({
          success: false,
          error: 'Food not found',
        });
      }
  
      // Update only if value exists
      food.name = body.name ?? food.name;
      food.location = body.location ?? food.location;
      food.rating = body.rating ?? food.rating;
      food.nutrition = body.nutrition ?? food.nutrition;
  
      await food.save();
  
      return res.status(200).json({
        success: true,
        id: food._id,
        message: 'Food updated',
      });
    } catch (error) {
      console.error('Update error:', error.message); // 🔍 Debug log
      return res.status(400).json({
        success: false,
        error: error.message || 'Food not updated',
      });
    }
  };
  

  const deleteFood = async (req, res) => {
    try {
      const food = await Food.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id, // ✅ match only if user owns it
      });
  
      if (!food) {
        return res.status(404).json({
          success: false,
          error: 'Food not found or not authorized to delete',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: food,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Food not deleted',
      });
    }
  };
  
const getFoodById = async (req, res) => {
    try{
        const food  = await Food.findOne({_id: req.params.id});

        if(!food){
            return res.status(404).json({
                success: false,
                error: 'Food not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: food,
        });
    } catch (error){
        return res.status(400).json({
            success: false,
            error: 'Food not found by ID'
        });
    }
};

const getFood = async (req, res) => {
    try {
      const food = await Food.find({ user: req.user.id }); // 🔒 only current user's foods
  
      return res.status(200).json({
        success: true,
        data: food,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Can’t find food'
      });
    }
  };
  
  

module.exports = {
    addFood,
    updateFood,
    deleteFood,
    getFoodById,
    getFood,
}




