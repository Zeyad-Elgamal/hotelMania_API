const { Router } = require('express');
const RoomController = require('../controllers/roomController');
// HotelController
const router = Router();

router.get('/', (req, res) => {
  RoomController.getAllRooms(req, res);
});

router.get('/:roomID', (req, res) => {
  RoomController.getOneRoom(req, res);
});

router.get('/:roomID/amenities', (req, res) => {
  // get all the rooms in the hotel
  RoomController.getRoomAmenities(req, res);
});

module.exports = router;
