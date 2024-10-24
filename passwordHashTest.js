require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword, checkPassword } = require('./src/utils/hashPasswordHelper');

async function main() {
  const newPassword = await hashPassword('somepassword', 5);
  console.log(newPassword);
}

main();
