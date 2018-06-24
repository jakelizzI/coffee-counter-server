import mongoose from 'mongoose';

const paymentHistorySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('paymentHistory', paymentHistorySchema);
