const Hotel = require("../models/Hotel")
const Amenity = require("../models/Amenity")
const Booking = require("../models/Booking")

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
    const hotelImages =
      req.files["hotel_images"]?.map((file) => file.path) || []
    const newHotel = new Hotel({
      hotel_name: req.body.hotel_name,
      hotel_location: req.body.hotel_location,
      hotel_description: req.body.hotel_description,
      hotel_price: req.body.hotel_price,
      hotel_stars: req.body.hotel_stars,
      hotel_rooms: req.body.hotel_rooms,
      hotel_image: req.files["hotel_image"][0].path,
      hotel_images: hotelImages,
      amenities: req.body.amenities,
    })

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
      rooms,
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
    console.log("Booking", req.params)

    const BookingData = await Booking.find({
      user: req.params.userId,
    }).populate("hotel")
    res.status(200).json(BookingData)
  } catch (error) {
    throw error
  }
}

// END

// Delete hotel
const deleteHotel = async (req, res) => {
  const { hotelId } = req.params
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" })
    }
    res.json({ message: "Hotel deleted successfully" })
  } catch (error) {
    console.error("Error deleting hotel:", error)
    res.status(500).json({ message: "Server error" })
  }
}
// END

// hotel detalis
const getHotelDetails = async (req, res) => {
  const { hotelId } = req.params
  console.log(req.params)
  try {
    const HotelDetails = await Hotel.findById(hotelId)
      .populate("amenities")
      .populate("hotel_rating.user")
    if (!HotelDetails) {
      return res.status(400).send({ message: "HotelDetails not found" })
    }
    res.status(200).json(HotelDetails)
  } catch (error) {
    throw error
  }
}

// Add Rating
const addRating = async (req, res) => {
  const { hotelId } = req.params
  const { userId, rating, comment } = req.body

  try {
    const hotel = await Hotel.findById(hotelId)
    if (!hotel) {
      return res.status(404).send({ message: "Hotel not found" })
    }

    const newRating = {
      user: userId,
      rating,
      comment,
    }

    hotel.hotel_rating.push(newRating)
    await hotel.save()
    res.status(201).send({ message: "Rating added successfully", hotel })
  } catch (error) {
    res.status(500).send({ message: "Error adding rating", error })}
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
  getAmenities,
  getHotels,
  addHotel,
  searchHotels,
  getHotelDetails,
  updateHotelById,
  addRating,
  getBooking,
  newBooking,
  deleteHotel,
}
