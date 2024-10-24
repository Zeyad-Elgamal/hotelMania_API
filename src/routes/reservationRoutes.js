const { Router } = require('express');
const ReservationController = require('../controllers/reservationController');
const validateClass = require('../middleware/validatorClass');
const AuthenticationClass = require('../middleware/authenticationClass');
// HotelController
const router = Router();

router.get('/',
  // AuthenticationClass.requiresAuthentication,
  ReservationController.getAllReservations);

router.post('/',
  AuthenticationClass.requiresAuthentication,
  ReservationController.addValidatedUserReservation);

router.post('/', (req, res) => {
  ReservationController.addValidatedUserReservation(req, res);
});

router.get('/:userID', (req, res) => {
  // get all the Reservations in the hotel
  ReservationController.getReservationByUser(req, res);
});

module.exports = router;
