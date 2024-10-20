const Hotel = require('../models/Hotel')

// get all hotels with amenities
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// add a new hotel with amenities
const addHotel = async (req, res) => {
  const {
    hotel_name,
    hotel_location,
    hotel_description,
    hotel_price,
    hotel_rating,
    hotel_image,
    amenities
  } = req.body

  try {
    const newHotel = new Hotel({
      hotel_name,
      hotel_location,
      hotel_description,
      hotel_price,
      hotel_rating,
      hotel_image,
      amenities
    })

    const savedHotel = await newHotel.save()
    res.status(201).json(savedHotel)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getHotels,
  addHotel
}
