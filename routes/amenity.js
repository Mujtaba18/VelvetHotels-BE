const express = require('express');

const router = express.Router();

const amenityCtrl = require('../controllers/amenity');

// Add a new amenity
router.post('/', amenityCtrl.addAmenity);

// Get all amenities
router.get('/', amenityCtrl.getAmenities);

module.exports = router;
