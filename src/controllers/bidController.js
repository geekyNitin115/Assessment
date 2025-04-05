import Bid from '../models/Bid.js';
import Job from '../models/Job.js';

// @desc    Create a bid
// @route   POST /api/bids/:jobId
// @access  Private (Freelancer)
export const createBid = async (req, res) => {
  try {
    const { bidAmount, timeline, message } = req.body;
    const jobId = req.params.jobId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if job is still open
    if (job.status === 'closed') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting bids',
      });
    }

    // Check if user has already bid on this job
    const existingBid = await Bid.findOne({
      job: jobId,
      freelancer: req.user.id
    });
    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this job'
      });
    }

    // Create bid
    const bid = await Bid.create({
      job: jobId,
      freelancer: req.user.id,
      bidAmount,
      timeline,
      message,
    });

    res.status(201).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all bids for a job
// @route   GET /api/bids/:jobId
// @access  Private
export const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({ job: req.params.jobId })
      .populate('freelancer', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Accept a bid
// @route   PATCH /api/bids/:bidId/accept
// @access  Private (Employer)
export const acceptBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found',
      });
    }

    // Find the job
    const job = await Job.findById(bid.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if user is the employer of this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to accept this bid',
      });
    }

    // Update bid status
    bid.status = 'accepted';
    await bid.save();

    // Update job status
    job.status = 'in-progress';
    await job.save();

    res.status(200).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Reject a bid
// @route   PATCH /api/bids/:bidId/reject
// @access  Private (Employer)
export const rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found',
      });
    }

    // Find the job
    const job = await Job.findById(bid.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if user is the employer of this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to reject this bid',
      });
    }

    // Update bid status
    bid.status = 'rejected';
    await bid.save();

    res.status(200).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 