import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('users', usersSchema);
