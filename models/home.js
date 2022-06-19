const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  homeName: {
    type: String,
    required: true
  },
  homeId: {
    type: String,
    required: true
  },
  homeIndex: {
    type: Number,
    require: true
  }
});

const Home = mongoose.model('Home', userSchema);
module.exports = Home;
