import mongoose from 'mongoose';

const purchaseHistorySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('purchaseHistory', purchaseHistorySchema);
