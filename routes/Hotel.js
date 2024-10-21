const express = require('express')
const router = express.Router()
const hotelCtrl = require('../controllers/Hotel')

// Route to get all hotels
router.get('/getHotels', hotelCtrl.getHotels)

// Route to get all amenities
router.get('/getAmenities', hotelCtrl.getAmenities)

// Route to add a new hotel
router.post('/addHotel', hotelCtrl.addHotel)

// Route to delete a hotel by id
router.delete('/deleteHotel/:hotelId', hotelCtrl.deleteHotel)

module.exports = router
