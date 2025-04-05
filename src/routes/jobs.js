import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createJob,
  getJobs,
  getJob,
} from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer'), createJob);

export default router; 