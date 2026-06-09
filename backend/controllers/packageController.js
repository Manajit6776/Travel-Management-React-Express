const db = require('../config/database');

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const [packages] = await db.query('SELECT * FROM packages ORDER BY created_at DESC');
    res.json(packages);
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get limited packages (for home page)
const getLimitedPackages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const [packages] = await db.query(
      'SELECT * FROM packages ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    res.json(packages);
  } catch (error) {
    console.error('Get limited packages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single package by ID
const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [packages] = await db.query('SELECT * FROM packages WHERE id = ?', [id]);

    if (packages.length === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(packages[0]);
  } catch (error) {
    console.error('Get package error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new package (admin only)
const createPackage = async (req, res) => {
  try {
    const { package_name, description, price, package_type, location, features } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!package_name || !description || !price) {
      return res.status(400).json({ message: 'Package name, description, and price are required' });
    }

    const [result] = await db.query(
      'INSERT INTO packages (package_name, description, price, image, package_type, location, features, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [package_name, description, price, image, package_type || 'Family Package', location || 'Unknown', features || 'Free Breakfast, Free Wi-Fi']
    );

    res.status(201).json({ message: 'Package created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update package (admin only)
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { package_name, description, price, package_type, location, features } = req.body;
    const image = req.file ? req.file.filename : null;

    // Build update query dynamically
    let updateQuery = 'UPDATE packages SET package_name = ?, description = ?, price = ?';
    let params = [package_name, description, price];

    if (image) {
      updateQuery += ', image = ?';
      params.push(image);
    }

    if (package_type) {
      updateQuery += ', package_type = ?';
      params.push(package_type);
    }

    if (location) {
      updateQuery += ', location = ?';
      params.push(location);
    }

    if (features) {
      updateQuery += ', features = ?';
      params.push(features);
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    await db.query(updateQuery, params);

    res.json({ message: 'Package updated successfully' });
  } catch (error) {
    console.error('Update package error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete package (admin only)
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM packages WHERE id = ?', [id]);

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPackages,
  getLimitedPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
