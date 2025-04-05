import Job from '../models/Job.js';

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Employer)
export const createJob = async (req, res) => {
  try {
    // Add the employer's ID to the job data
    req.body.employer = req.user.id;
    
    // Create new job in database
    const job = await Job.create(req.body);
    
    // Send success response with created job data
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    // Find all jobs in the database
    const jobs = await Job.find();
    
    // Send success response with jobs data
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
  try {
    // Find job by ID
    const job = await Job.findById(req.params.id);
    
    // Check if job exists
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    
    // Send success response with job data
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 