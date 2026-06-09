const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  getBookingById
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

// Create booking (user only)
router.post('/', auth, createBooking);

// Get current user's bookings
router.get('/my-bookings', auth, getUserBookings);

// Get single booking
router.get('/:id', auth, getBookingById);

// Get all bookings (admin only)
router.get('/', adminAuth, getAllBookings);

// Update booking status (admin only)
router.patch('/:id/status', adminAuth, updateBookingStatus);

module.exports = router;
