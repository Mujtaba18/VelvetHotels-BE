const Amenity = require('../models/Amenity')

// Add Amenities
exports.addAmenity = async (req, res) => {
  console.log('Received body:', req.body);
  try {
      const newAmenity = new Amenity(req.body);
      await newAmenity.save();
      res.status(201).json({ message: 'Amenity added successfully', amenity: newAmenity });
  } catch (error) {
      res.status(400).json({ message: 'Error adding amenity', error: error.message });
  }
};

// Get Amenities
exports.getAmenities = async (req, res) => {
  try {
      const amenities = await Amenity.find();
      res.status(200).json(amenities);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving amenities', error: error.message });
  }
};