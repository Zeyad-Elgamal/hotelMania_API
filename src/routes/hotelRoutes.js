const { Router } = require('express');
const HotelController = require('../controllers/hotelController');
// HotelController
const router = Router();

router.get('/', (req, res) => {
  HotelController.getAllHotels(req, res);
});

router.get('/:hotelID/rooms', (req, res) => {
  // get all the rooms in the hotel
  HotelController.getHotelRooms(req, res);
});

router.get('/:hotelID/:roomID/amenities', (req, res) => {
  // get all the rooms in the hotel
  HotelController.getHotelRoomAmenities(req, res);
});

module.exports = router;
