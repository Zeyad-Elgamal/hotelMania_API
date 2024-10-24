require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken, decodeTokenToUserCredentials } = require('./src/utils/jwtHelpers');

async function main() {
  const sentence = 'sentence';
  const token = await generateToken(sentence, process.env.SECRET_KEY);

  console.log(token);
  // console.log(jwt.decode(token));
  console.log(await decodeTokenToUserCredentials(token, process.env.SECRET_KEY));
}

main();
