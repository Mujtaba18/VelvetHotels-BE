const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    hotel_name: { type: String, required: true },
    hotel_location: { type: String, required: true }, 
    hotel_description: { type: String },
    hotel_price: { type: Number, required: true },
    hotel_rating: { type: Number, default: 0 }, 
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }]
});

module.exports = mongoose.model('Hotel', hotelSchema);
