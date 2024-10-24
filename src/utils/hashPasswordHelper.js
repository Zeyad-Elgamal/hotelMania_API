const bcrypt = require('bcrypt');

async function hashPassword(plainPassword, saltRounds) {
  return bcrypt.hash(plainPassword, saltRounds);
}

async function checkPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { hashPassword, checkPassword };
