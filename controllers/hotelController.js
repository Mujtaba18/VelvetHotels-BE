const Hotel = require("../models/Hotel") // Adjust the path as needed

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
    const HotelDetails = await Hotel.findById(hotelId).populate("amenities").populate("hotel_rating.user");
    if (!HotelDetails) {
      return res.status(400).send({ message: "HotelDetails not found" })
    }
    res.status(200).json(HotelDetails)
  } catch (error) {
    throw error
  }
}

// Add Rating
exports.addRating = async (req, res) => {
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
    res.status(500).send({ message: "Error adding rating", error })
  }
}

