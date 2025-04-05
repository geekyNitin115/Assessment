import User from '../models/User.js';
import Message from '../models/Message.js';

// @desc    Get users for sidebar
// @route   GET /api/messages/users
// @access  Private
export const getUsersForSidebar = async (req, res) => {
  try {
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('-password');
    
    // Send success response with users data
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get messages between users
// @route   GET /api/messages/:id
// @access  Private
export const getMessages = async (req, res) => {
  try {
    // Find all messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user.id }
      ]
    }).sort('createdAt');
    
    // Send success response with messages data
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Send a message
// @route   POST /api/messages/send/:id
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    // Create new message
    const message = await Message.create({
      sender: req.user.id,
      receiver: req.params.id,
      message: req.body.message
    });
    
    // Send success response with created message data
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 