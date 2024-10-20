<<<<<<< HEAD
const mongoose = require('mongoose')
=======
const mongoose = require("mongoose")
>>>>>>> f78c5bb766ab7d49a0bf8e58bb79b6d7963c2103

const hotelSchema = new mongoose.Schema({
  hotel_name: { type: String, required: true },
  hotel_location: { type: String, required: true },
  hotel_description: { type: String },
  hotel_price: { type: Number, required: true },
  hotel_rating: { type: Number, default: 0 },
<<<<<<< HEAD
  hotel_image: { type: String },
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }]
})

const Hotel = mongoose.model('Hotel', hotelSchema)
=======
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
})

const Hotel = mongoose.model("Hotel", hotelSchema)
>>>>>>> f78c5bb766ab7d49a0bf8e58bb79b6d7963c2103

module.exports = Hotel
