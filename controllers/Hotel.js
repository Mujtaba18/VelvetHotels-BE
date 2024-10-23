const Hotel = require("../models/Hotel")
const Amenity = require("../models/Amenity")

const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({})
    res.status(200).json(amenities)
  } catch (error) {
    res.status(500).json({ error: "Error fetching amenities" })
  }
}

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("amenities")
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
      amenities: req.body.amenities,
    })
    console.log("hotel:" + newHotel)
    await newHotel.save()
    res.json(newHotel)
  } catch (error) {
    res.status(500).json({ error: "Error adding hotel" })
  }
}
// Hussain controllers --------------------
// Search Hotels
const searchHotels = async (req, res) => {
  const { name } = req.query // Get hotel name from query parameters

  // Validate the search term
  if (!name || name.trim() === "") {
    return res.status(400).send({ message: "Search term is required" })
  }
  const searchTerm = name.trim().toLowerCase() //remove spaces
  // crate a Regular expressions that filter based on all letters
  const regexPattern = new RegExp(
    searchTerm
      .split("")
      .map((char) => `(?=.*${char})`)
      .join(""),
    "i"
  )

  try {
    const hotels = await Hotel.find({
      $or: [
        //  find hotels based on there names (.where("hotel_name").regex(regexPattern))
        { hotel_name: { $regex: regexPattern } },
        //  find hotels based on there location (.where("hotel_location").regex(regexPattern) )
        { hotel_location: { $regex: regexPattern } },
      ],
    })
    res.status(200).send(hotels)
  } catch (error) {
    throw error
  }
}

// hotel detalis
const getHotelDetails = async (req, res) => {
  const { hotelId } = req.params
  console.log(req.params)
  try {
    const HotelDetails = await Hotel.findById(hotelId).populate("amenities")
    if (!HotelDetails) {
      return res.status(400).send({ message: "HotelDetails not found" })
    }
    res.status(200).json(HotelDetails)
  } catch (error) {
    throw error
  }
}

//  hotel booking AND updating the hotel "hotel_rooms"
const newBooking = async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      checkIn,
      checkOut,
      numberOfGuests,
      rooms,
      hotelPrice,
    } = req.body

    // Validate required fields
    if (
      !userId ||
      !hotelId ||
      !checkIn ||
      !checkOut ||
      !numberOfGuests ||
      !rooms
    ) {
      return res.send({ error: "All fields are required." })
    }

    // Create a new booking
    const booking = new Booking({
      user: userId,
      hotel: hotelId,
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      numberOfGuests,
      totalPrice: rooms * hotelPrice,
    })

    // Save the booking to the database
    const savedBooking = await booking.save()

    // Update the hotel_rooms  in Hotel
    const hotel = await Hotel.findById(hotelId)
    if (hotel) {
      hotel.hotel_rooms -= rooms
      await hotel.save() // Save the updated
    }

    res.send(savedBooking)
  } catch (error) {
    throw error
  }
}

// display booking to user

const getBooking = async (req, res) => {
  try {
    console.log("Booking", req.query)

    const BookingData = await Booking.find({ user: req.params.userId })

    if (BookingData.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." })
    }

    res.status(200).json(BookingData)
  } catch (error) {
    throw error
  }
}
// Update a user by ID
const updateHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" })
    }

    res.status(200).json(hotel)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getHotels,
  getAmenities,
  addHotel,
  updateHotelById,
  getHotelDetails,
  searchHotels,
}
