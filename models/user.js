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
  email: {
    type: String,
    required: false
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false
  },
  verify_token: {
    type: String,
    required: false
  },
  homeModel: [
    {
      homeName: {
        type: String,
        required: false
      },
      homeId: {
        type: String,
        required: false
      }
    }
  ],
  homeNameCurrent: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
