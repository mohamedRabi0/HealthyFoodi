const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cinema';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 

module.exports = mongoose.connection;
