const Hotel = require("../models/Hotel")
const Booking = require("../models/Booking")
// Search Hotels
exports.searchHotels = async (req, res) => {
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
exports.getHotelDetails = async (req, res) => {
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
exports.newBooking = async (req, res) => {
  try {
    console.log(req.body)
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

//
