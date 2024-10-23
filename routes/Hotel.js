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
router.post('/addHotel', upload.fields([
  { name: 'hotel_image', maxCount: 1 },
  { name: 'hotel_images', maxCount: 10 }
]), hotelCtrl.addHotel);

// Search Hotels Route
router.get("/search", hotelCtrl.searchHotels)

// Hotel detalis Route
router.get("/details/:hotelId", hotelCtrl.getHotelDetails)

router.post("/:hotelId/rate", hotelCtrl.addRating)

module.exports = router
