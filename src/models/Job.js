import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  budget: {
    type: Number,
    required: [true, 'Please provide a budget'],
    min: [0, 'Budget cannot be negative'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a duration'],
    min: [1, 'Duration must be at least 1 day'],
  },
  skillsRequired: [{
    type: String,
    required: [true, 'Please provide at least one required skill'],
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', JobSchema);
export default Job; 