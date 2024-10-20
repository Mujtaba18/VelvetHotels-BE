const express = require('express')
const router = express.Router()
const hotelCtrl = require('../controllers/Hotel')

// Route to get all hotels
router.get('/getHotels', hotelCtrl.getHotels)
// Route to add a new hotel
router.post('/addHotel', hotelCtrl.addHotel)

module.exports = router
