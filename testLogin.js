require('dotenv').config();
const dayjs = require('dayjs');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword, checkPassword } = require('./src/utils/hashPasswordHelper');

const prisma = new PrismaClient();

const userEmail = 'Jibril_Emad_6@yahoo.com';
const password = 'Jibril_Emad_6@yahoo.com';

async function main() {
  // const userResult = await prisma.reservation.findMany({
  //   where: {
  //     userID: '',
  //   },
  // });
  // console.log(userResult);

  const userID = '304c7f3b-6f08-4086-a054-27730da58c43';
  const hotelID = '014c6d5d-24f9-40ff-aa73-8603f2536c58';
  const roomID = '14f346dc-afc1-4b6f-bd8b-488d6f7159b8';
  // 304c7f3b-6f08-4086-a054-27730da58c43    014c6d5d-24f9-40ff-aa73-8603f2536c58

  const userRes = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  const roomRes = await prisma.room.findUnique({
    where: {
      id: roomID,
    },
  });

  const userReservations = await prisma.reservation.findMany({
    where: {
      roomID,
    },
  });

  const newDateFrom = dayjs(userReservations[0].dateFrom);
  const newDateTo = dayjs(userReservations[0].dateTo);
  const paymentAmount = newDateTo.diff(newDateFrom, 'day') * roomRes.price;
  // const paymentAmount = newDateTo.diff(newDateFrom, 'day') * userReservations[0].price;
  console.log(userReservations);
  console.log(userRes);
  console.log(paymentAmount);

  // const reservation = await prisma.reservation.findUnique({
  //   where: {
  //   },
  // });

  // const { password } = request.body;
}

main();
