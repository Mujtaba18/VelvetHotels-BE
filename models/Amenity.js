const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    amenity_name: { type: String, required: true },
    amenity_description: { type: String, required: true },
    amenity_icon: { type: String }
});

const Amenity = mongoose.model('Amenity', amenitySchema)

module.exports = Amenity;

