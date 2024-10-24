const { Router } = require('express');
const CityController = require('../controllers/cityController');

const router = Router();

router.get('/', (req, res) => {
  CityController.getAllCities(req, res);
});

router.get('/:cityID/hotels', (req, res) => {
  // get all the hotels in the city
  CityController.getAllHotelsOfCity(req, res);
});

module.exports = router;
