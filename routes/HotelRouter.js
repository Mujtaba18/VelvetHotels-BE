const express = require("express")
const router = express.Router()
const hotelController = require("../controllers/hotelController")

// Search Hotels Route
router.get("/search", hotelController.searchHotels)
// Hotel detalis Route
router.get("/details/:hotelId", hotelController.getHotelDetails)

// Hotle Booking Rotute
router.post("/booking", hotelController.newBooking)

module.exports = router
