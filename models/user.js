const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false
  },
  isLock: {
    type: Boolean,
    required: false,
    default: false
  },
  verify_token: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
