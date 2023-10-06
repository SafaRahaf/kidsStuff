const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');

// dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('Token found');
  }

  try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('not authorized, token failed ');
  }

  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token ');
  }
});

module.exports = protect;
