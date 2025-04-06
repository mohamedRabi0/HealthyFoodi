const express = require('express')

const FoodCtrl = require('../controllers/food-ctrl')

const router = express.Router()
const auth = require('../middleware/auth');

router.post('/food', auth, FoodCtrl.addFood); // ✅ Protected route
router.put('/food/:id', auth, FoodCtrl.updateFood)
router.delete('/food/:id', auth,  FoodCtrl.deleteFood)
router.get('/food/:id', auth, FoodCtrl.getFoodById)
router.get('/food', auth, FoodCtrl.getFood)


module.exports = router