const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
  hotel_name: { type: String, required: true },
  hotel_location: { type: String, required: true },
  hotel_description: { type: String },
  hotel_price: { type: Number, required: true },
  hotel_rating: { type: Number, default: 0 },
  hotel_image: { type: String },
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
})

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel
