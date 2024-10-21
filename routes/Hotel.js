const express = require('express')
const router = express.Router()
const hotelCtrl = require('../controllers/Hotel')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/hotels/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route to get all hotels
router.get('/getHotels', hotelCtrl.getHotels)

// Route to get all amenities
router.get('/getAmenities', hotelCtrl.getAmenities)

// Route to add a new hotel
router.post('/addHotel', upload.single('hotel_image'), hotelCtrl.addHotel)

module.exports = router
