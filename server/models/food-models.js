const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NutritionFacts Schema
const NutritionFacts = new Schema({
  calories: { type: Number, required: true },
  sugar: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number },
});

// Food Schema
const Food = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  nutrition: { type: NutritionFacts, required: true }, // embed the subdocument
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 🔗 Connect to user
}, { timestamps: true });

module.exports = mongoose.model('Food', Food);
