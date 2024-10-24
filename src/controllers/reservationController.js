const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class ReservationController {
  static async getAllReservations(request, response) {
    // console.log(request.userID);

    if (request.userID) {
      if (request.userID) {
        const reservationsArray = await prisma.reservation.findMany({
          where: {
            userID: request.userID,
          },
        });

        if (reservationsArray.length === 0) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(reservationsArray);
        }
      } else if (request.userID && request.roomID) {
        const userRoomReservation = await prisma.reservation.findUnique({
          where: {
            userID: request.userID,
            roomID: request.roomID,
          },
        });

        if (!userRoomReservation) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(userRoomReservation);
        }
      }
    } else {
      const allReservations = await prisma.reservation.findMany();
      // pagination still under construction
      if (allReservations.length === 0) {
        response.status(500).json({ Error: 'Server Error' });
      } else {
        response.json(allReservations);
      }
      // response.send('Under construction');
    }
  }

  // static async getReservationByHotel(request, response) {
  //   const reservationResult = await prisma.reservation.findMany({
  //     where: {
  //       hotelID: request.params.hotelID,
  //     },
  //   });
  //   if (reservationResult.length === 0) {
  //     response.status(404).json({ Error: 'Not Found' });
  //   } else {
  //     response.json(reservationResult);
  //   }
  //   // response.json('Under construction');
  // }

  static async addValidatedUserReservation(req, res) {
    const {
      dateFrom,
      dateTo,
      roomID,
      hotelID,
    } = req.body;

    const roomResult = await prisma.findUnique({
      where: {
        id: roomID,
      },
    });
    const jsDateFrom = dayjs(dateFrom);
    const jsDateTo = dayjs(dateTo);

    const paymentAmount = jsDateTo.diff(jsDateFrom, 'day') * roomResult.price;
    try {
      const newReservation = await prisma.reservation.create({
        data: {
          paymentAmount,
          dateFrom,
          dateTo,
          userID: req.userID,
          roomID,
          hotelID,
        },
      });
      res.json(newReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: 'Server Failure' });
    }
  }
  //   static async getreservationByUser(request, response) {
  //     const reservationResult = await prisma.reservation.findUnique({
  //       where: {
  //         user: {
  //           id: request.params.userID,
  //         },
  //       },
  //     });
  //     if (reservationResult.length === 0) {
  //       response.status(404).json({ Error: 'Not Found' });
  //     } else {
  //       response.json(reservationResult);
  //     }
  //     // pagination still under construction
  //     // response.send('Under construction');
  //   }
}

module.exports = ReservationController;
