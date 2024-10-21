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
    console.log('hotel:' + newHotel)
    await newHotel.save()
    res.json(newHotel)
  } catch (error) {
    res.status(500).json({ error: 'Error adding hotel' })
  }
}

// Delete hotel
const deleteHotel = async (req, res) => {
  const { hotelId } = req.params

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId)

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    res.json({ message: 'Hotel deleted successfully' })
  } catch (error) {
    console.error('Error deleting hotel:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getHotels,
  getAmenities,
  addHotel,
  deleteHotel
}
