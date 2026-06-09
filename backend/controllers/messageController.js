const db = require('../config/database');

// Send message
const sendMessage = async (req, res) => {
  try {
    const { booking_id, message } = req.body;
    const user_id = req.user.id;
    const is_admin = req.user.is_admin ? 1 : 0;

    if (!booking_id || !message) {
      return res.status(400).json({ message: 'Booking ID and message are required' });
    }

    // Verify booking exists and user has access
    const [bookings] = await db.query(
      'SELECT * FROM bookings WHERE id = ?',
      [booking_id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If not admin, verify booking belongs to user
    if (!req.user.is_admin && bookings[0].user_id !== user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Insert message
    const [result] = await db.query(
      'INSERT INTO messages (booking_id, user_id, is_admin, message, created_at) VALUES (?, ?, ?, ?, NOW())',
      [booking_id, user_id, is_admin, message]
    );

    res.status(201).json({ message: 'Message sent successfully', id: result.insertId });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages for a booking
const getBookingMessages = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const user_id = req.user.id;

    // Verify booking exists and user has access
    const [bookings] = await db.query(
      'SELECT * FROM bookings WHERE id = ?',
      [booking_id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If not admin, verify booking belongs to user
    if (!req.user.is_admin && bookings[0].user_id !== user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get messages
    const [messages] = await db.query(`
      SELECT m.*, u.name as sender_name 
      FROM messages m 
      JOIN users u ON m.user_id = u.id 
      WHERE m.booking_id = ? 
      ORDER BY m.created_at ASC
    `, [booking_id]);

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  sendMessage,
  getBookingMessages
};
