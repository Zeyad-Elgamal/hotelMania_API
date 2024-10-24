const { Router } = require('express');
const ReviewController = require('../controllers/reviewController');
// HotelController
const router = Router();

router.get('/', (req, res) => {
  ReviewController.getAllReviews(req, res);
});

router.get('/:hotelID', (req, res) => {
  ReviewController.getReviewByHotel(req, res);
});

router.get('/:userID', (req, res) => {
  // get all the Reviews in the hotel
  ReviewController.getReviewByUser(req, res);
});

module.exports = router;
