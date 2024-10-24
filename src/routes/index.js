const express = require('express');
const AuthenticationClass = require('../middleware/authenticationClass');
const governateRouter = require('./governateRoutes');
const cityRouter = require('./cityRoutes');
const hotelRouter = require('./hotelRoutes');
const roomRouter = require('./roomRoutes');
const userRouter = require('./userRoutes');
const reviewRouter = require('./reviewRoutes');
const reservationRouter = require('./reservationRoutes');

const allRouter = express.Router();

// Filters all routes based on whether it needs authentication or not
allRouter.use(AuthenticationClass.requiresAuthentication);

allRouter.use('/', governateRouter);
allRouter.use('/governates', governateRouter);
allRouter.use('/cities', cityRouter);
allRouter.use('/hotels', hotelRouter);
allRouter.use('/rooms', roomRouter);
allRouter.use('/user', userRouter);
allRouter.use('/reviews', reviewRouter);
allRouter.use('/reservation', reservationRouter);

module.exports = allRouter;
