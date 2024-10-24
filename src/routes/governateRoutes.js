const { Router } = require('express');
// const express = require('express');
const GovernateController = require('../controllers/governateController');

const router = Router();

router.get('/', (req, res) => {
  // get all governates
  GovernateController.getAllGovernates(req, res);
});

router.get('/:govID/cities', (req, res) => {
  GovernateController.getGovernateCities(req, res);
  // get all the states in the governate
});

// router.get('/', (req, res) => {
// });
//
module.exports = router;
