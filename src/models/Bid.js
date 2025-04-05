import mongoose from 'mongoose';

const BidSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bidAmount: {
    type: Number,
    required: [true, 'Please provide a bid amount'],
    min: [0, 'Bid amount cannot be negative'],
  },
  timeline: {
    type: Number,
    required: [true, 'Please provide a timeline'],
    min: [1, 'Timeline must be at least 1 day'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model('Bid', BidSchema);
export default Bid; 