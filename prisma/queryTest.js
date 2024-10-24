require('dotenv').config();
// const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
// const SALT_ROUNDS = 5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomDate(date, days) {
  const returnDate = new Date(date);
  returnDate.setDate(date.getDate() + days);
  return returnDate;
}

async function retrieveRooms() {
  const roomArray = await prisma.room.findMany();
  const userReservationID = await prisma.room.findMany({
    where: {
      // id: roomArray[getRandomInt(0, roomArray.length - 1)].id,
      isReserved: true,
    },
    include: {
      hotel: {
        select: {
          name: true,
          city: {
            include: {
              governate: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  console.log(userReservationID);
}

retrieveRooms()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
