import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/users', protect, getUsersForSidebar);
router.get('/:id', protect, getMessages);
router.post('/send/:id', protect, sendMessage);

export default router; 