const Hotel = require("../models/Hotel")

// Search Hotels
exports.searchHotels = async (req, res) => {
  const { name } = req.query // Get hotel name from query parameters

  // Validate the search term
  if (!name || name.trim() === "") {
    return res.status(400).send({ message: "Search term is required" })
  }

  const searchTerms = name
    .split(" ")
    .map((term) => term.trim())
    .filter((term) => term !== "")

  const regexConditions = searchTerms.map((term) => ({
    hotel_name: { $regex: term, $options: "i" },
  }))

  try {
    const hotels = await Hotel.find({
      $and: regexConditions,
    })

    res.status(200).send(hotels)
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message })
  }
}
