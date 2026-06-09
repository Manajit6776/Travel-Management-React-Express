const db = require('../config/database');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { package_id, booking_date, comments } = req.body;
    const user_id = req.user.id;

    if (!package_id || !booking_date) {
      return res.status(400).json({ message: 'Package ID and booking date are required' });
    }

    // Check if package exists
    const [packages] = await db.query('SELECT id FROM packages WHERE id = ?', [package_id]);
    if (packages.length === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Insert booking
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, package_id, booking_date, comments, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, package_id, booking_date, comments || null, 'Pending']
    );

    res.status(201).json({ message: 'Booking created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for current user
const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [bookings] = await db.query(`
      SELECT b.*, p.package_name, p.price, p.image 
      FROM bookings b 
      JOIN packages p ON b.package_id = p.id 
      WHERE b.user_id = ? 
      ORDER BY b.booking_date DESC
    `, [user_id]);

    res.json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT b.*, u.name as user_name, u.email as user_email, p.package_name, p.price 
      FROM bookings b 
      JOIN users u ON b.user_id = u.id 
      JOIN packages p ON b.package_id = p.id 
      ORDER BY b.booking_date DESC
    `);

    res.json(bookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status (admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    await db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);

    res.json({ message: 'Booking status updated successfully' });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const [bookings] = await db.query(`
      SELECT b.*, u.name as user_name, u.email as user_email, p.package_name, p.price, p.image 
      FROM bookings b 
      JOIN users u ON b.user_id = u.id 
      JOIN packages p ON b.package_id = p.id 
      WHERE b.id = ?
    `, [id]);

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(bookings[0]);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  getBookingById
};
