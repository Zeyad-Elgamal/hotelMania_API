const { Router } = require('express');
const validateClass = require('../middleware/validatorClass');
const UserController = require('../controllers/userController');
const AuthenticationClass = require('../middleware/authenticationClass');

const router = Router();

router.post('/signup',
  validateClass.validateUserSignUp,
  UserController.addCurrentValidatedUser,
  AuthenticationClass.setAuthTokenCookie,
  (req, res) => {
    res.redirect('/');
  });

router.post('/login',
  validateClass.validateUserLogin,
  UserController.getCurrentUser,
  AuthenticationClass.setAuthTokenCookie,
  (req, res) => {
    res.redirect('/');
  // UserController.getCurrentUser(req, res);
  });

// router.get('/:userID/profile', (req, res) => {
//   // get all the user details relating to that user
// });

module.exports = router;
