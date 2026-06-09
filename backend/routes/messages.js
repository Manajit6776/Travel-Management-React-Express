const express = require('express');
const router = express.Router();
const { sendMessage, getBookingMessages } = require('../controllers/messageController');
const { auth } = require('../middleware/auth');

// Send message
router.post('/', auth, sendMessage);

// Get messages for a booking
router.get('/booking/:booking_id', auth, getBookingMessages);

module.exports = router;
