const Amenity = require('../models/Amenity')

// Add Amenities
exports.addAmenity = async (req, res) => {
  console.log('Received body:', req.body);
  console.log('File received:', req.file);
  try {
    const newAmenity = new Amenity({
        amenity_name: req.body.amenity_name,
        amenity_description: req.body.amenity_description,
        amenity_icon: req.file.path, 
    });

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