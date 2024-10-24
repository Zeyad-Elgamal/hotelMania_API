require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword, checkPassword } = require('../utils/hashPasswordHelper');

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

class UserController {
  static SALT_ROUNDS = 5

  // constructor() {
  //   this.SALT_ROUNDS = 5;
  // }

  static async addCurrentValidatedUser(request, response, next) {
    const {
      firstname: firstName,
      email,
      lastname: lastName,
      password: plainPassword,
    } = request.body;
    const hashedPassword = await hashPassword(plainPassword, UserController.SALT_ROUNDS);
    console.log(request.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      response.status(409).json({ Error: 'User already exists' });
    } else {
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      if (!newUser) {
        response.status(500).send('Failure to create new user');
      } else {
        response.userCredentials = newUser.id;
        next();
      }
    }
    // will later redirect after testing
  }

  static async getCurrentUser(request, response, next) {
    try {
      const userResult = await prisma.user.findUnique({
        where: {
          email: request.body.email,
        },
      });
      console.log(request.body);
      const { password } = request.body;

      if (!userResult) throw new Error('Invalid user email');
      const hashedPassword = userResult.password;
      const isValidPassword = await checkPassword(password, hashedPassword);
      if (!isValidPassword) throw new Error('Invalid Password');
      response.userCredentials = userResult.id;

      next();
    } catch (error) {
      response.status(401).json({ error: 'Invalid credentials' });
    }
  }
}

module.exports = UserController;
