const Hotel = require('../models/Hotel')
const Amenity = require('../models/Amenity')

const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({})
    res.status(200).json(amenities)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching amenities' })
  }
}

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('amenities')
    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addHotel = async (req, res) => {

  try {
    const newHotel = new Hotel({
      hotel_name: req.body.hotel_name,
      hotel_location: req.body.hotel_location,
      hotel_description: req.body.hotel_description,
      hotel_price: req.body.hotel_price,
      hotel_stars: req.body.hotel_stars,
      hotel_rooms: req.body.hotel_rooms,
      hotel_image: req.file.path,
      amenities: req.body.amenities
    })
    console.log('hotel:' + newHotel)
    await newHotel.save()
    res.json(newHotel)
  } catch (error) {
    res.status(500).json({ error: 'Error adding hotel' })
  }
}

module.exports = {
  getHotels,
  getAmenities,
  addHotel
}
