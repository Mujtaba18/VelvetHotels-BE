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
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addHotel = async (req, res) => {
  const {
    hotel_name,
    hotel_location,
    hotel_description,
    hotel_price,
    hotel_rating,
    amenities
  } = req.body

  try {
    const newHotel = new Hotel({
      hotel_name,
      hotel_location,
      hotel_description,
      hotel_price,
      hotel_rating,
      amenities
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
