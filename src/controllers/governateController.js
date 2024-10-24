const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class GovernateController {
  static async getAllGovernates(request, response) {
    const allGovernates = await prisma.governate.findMany();
    // const allGovernatesJson = res.json()
    response.send(allGovernates);
  }

  static async getGovernateCities(request, response) {
    const cityGovernates = await prisma.governate.findMany({
      where: {
        id: request.params.govID,
      },
      select: {
        cities: true,
      },
    });
    response.json(cityGovernates[0]);
  }
}

module.exports = GovernateController;
