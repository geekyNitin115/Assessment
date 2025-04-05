import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createBid,
  getBids,
  acceptBid,
  rejectBid,
} from '../controllers/bidController.js';

const router = express.Router();

router.get('/:jobId', protect, getBids);
router.post('/:jobId', protect, authorize('freelancer'), createBid);
router.patch('/:bidId/accept', protect, authorize('employer'), acceptBid);
router.patch('/:bidId/reject', protect, authorize('employer'), rejectBid);

export default router; 