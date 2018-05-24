import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model('users', usersSchema);
