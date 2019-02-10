const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', UserSchema);
