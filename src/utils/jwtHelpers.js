require('dotenv').config();
const jwt = require('jsonwebtoken');

async function generateToken(userObject, secretKey, duration = null) {
  return jwt.sign(userObject, secretKey, duration);
}

async function decodeTokenToUserCredentials(token, secretKey) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, decodeTokenToUserCredentials };
