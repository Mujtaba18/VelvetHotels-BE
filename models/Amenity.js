const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    amenity_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    amenity_name: { type: String, required: true },
    amenity_description: { type: String, required: true },
    amenity_icon: { type: String }
});

module.exports = mongoose.model('Amenity', amenitySchema);
