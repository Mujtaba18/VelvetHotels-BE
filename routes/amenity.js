const express = require('express');

const router = express.Router();

const amenityCtrl = require('../controllers/amenity');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/amenities/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Add a new amenity
router.post('/', upload.single('amenity_icon'), amenityCtrl.addAmenity);

// Get all amenities
router.get('/', amenityCtrl.getAmenities);

module.exports = router;
