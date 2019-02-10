const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: Number,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
