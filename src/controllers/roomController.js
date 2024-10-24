const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class RoomController {
  static async getAllRooms(request, response) {
    console.log(request.query);

    if (Object.entries(request.query).length > 0) {
      if (request.query.city) {
        const cityRoomsArray = await prisma.room.findMany({
          where: {
            hotel: {
              city: {
                name: request.query.city,
              },
            },
            isReserved: false,
          },
        });

        if (cityRoomsArray.length === 0) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(cityRoomsArray);
        }
      } else if (request.query.governate) {
        const governateRoomsArray = await prisma.room.findMany({
          where: {
            hotel: {
              city: {
                governate: {
                  name: request.query.governate,
                },
              },
            },
            isReserved: false,
          },
        });

        if (governateRoomsArray.length === 0) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(governateRoomsArray);
        }
      }
    } else {
      const allRooms = await prisma.room.findMany();
      // pagination still under construction
      if (allRooms.length === 0) {
        response.status(500).json({ Error: 'Server Error' });
      } else {
        response.json(allRooms);
      }
      // response.send('Under construction');
    }
  }

  static async getOneRoom(request, response) {
    const roomResult = await prisma.room.findUnique({
      where: {
        id: request.params.roomID,
      },
    });
    // pagination still under construction
    response.json(roomResult);
    // response.send('Under construction');
  }

  static async getRoomAmenities(request, response) {
    const roomAmenities = await prisma.amenity.findMany({
      where: {
        rooms: {
          some: {
            id: request.params.roomID,
          },
        },
      },
    });
    response.json(roomAmenities);

    // const roomAmenities = await prisma.room.findMany({
    //   where: {
    //     id: request.params.roomID,
    //   },
    //   select: {
    //     amenities: {
    //       select: {
    //         id: true,
    //         iconURL: true,
    //         name: true,
    //       },
    //     },
    //   },
    // });

    // response.json(roomAmenities[0]);
  }
}

module.exports = RoomController;
