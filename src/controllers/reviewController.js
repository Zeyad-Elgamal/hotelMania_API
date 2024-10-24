const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class ReviewController {
  static async getAllReviews(request, response) {
    console.log(request.query);

    if (Object.entries(request.query).length > 0) {
      if (request.query.hotelName) {
        const reviewsArray = await prisma.review.findMany({
          where: {
            hotel: {
              name: request.query.hotelName,
            },
          },
        });

        if (reviewsArray.length === 0) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(reviewsArray);
        }
      } else if (request.query.userEmail) {
        const userReviewsArray = await prisma.review.findMany({
          where: {
            user: {
              email: request.query.userEmail,
            },
          },
        });

        if (userReviewsArray.length === 0) {
          response.status(404).json({ Error: 'Not Found' });
        } else {
          response.json(userReviewsArray);
        }
      }
    } else {
      const allReviews = await prisma.review.findMany();
      // pagination still under construction
      if (allReviews.length === 0) {
        response.status(500).json({ Error: 'Server Error' });
      } else {
        response.json(allReviews);
      }
      // response.send('Under construction');
    }
  }

  static async getReviewByHotel(request, response) {
    const reviewResult = await prisma.review.findUnique({
      where: {
        hotel: {
          id: request.params.hotelID,
        },
      },
    });
    if (reviewResult.length === 0) {
      response.status(404).json({ Error: 'Not Found' });
    } else {
      response.json(reviewResult);
    }
    // pagination still under construction
    // response.send('Under construction');
  }

  static async getReviewByUser(request, response) {
    const reviewResult = await prisma.review.findUnique({
      where: {
        user: {
          id: request.params.userID,
        },
      },
    });
    if (reviewResult.length === 0) {
      response.status(404).json({ Error: 'Not Found' });
    } else {
      response.json(reviewResult);
    }
    // pagination still under construction
    // response.send('Under construction');
  }
}

module.exports = ReviewController;
