const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllPackages,
  getLimitedPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { adminAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// Public routes
router.get('/', getAllPackages);
router.get('/limited', getLimitedPackages);
router.get('/:id', getPackageById);

// Admin routes
router.post('/', adminAuth, upload.single('image'), createPackage);
router.put('/:id', adminAuth, upload.single('image'), updatePackage);
router.delete('/:id', adminAuth, deletePackage);

module.exports = router;
