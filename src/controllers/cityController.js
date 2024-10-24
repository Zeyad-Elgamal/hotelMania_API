const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class cityController {
  static async getAllCities(request, response) {
    if (request.query.governate) {
      const cityGovernateArray = await prisma.city.findMany({
        where: {
          governate: {
            name: request.query.governate,
          },
        },
      });
      response.send(cityGovernateArray);
    } else {
      const allCities = await prisma.city.findMany();
      response.json(allCities);
    }
  }

  static async getAllHotelsOfCity(request, response) {
    const allHotelsCity = prisma.city.findMany({
      where: {
        cityID: request.params.cityID,
      },
      select: {
        hotels: true,
      },
    });
    response.json(allHotelsCity[0]);
  }
}

module.exports = cityController;
