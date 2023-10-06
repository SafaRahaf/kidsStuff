const express = require('express');
const asyncHadler = require('express-async-handler');
const User = require('../Models/UserModel');
// const generateToken = require('../path-to-your/generateToken');
const generateToken = require('../utils/generateToken');
const protect = require('../middleweres/AuthMiddlewere');

// Route definitions...

const userRouter = express.Router();

userRouter.post(
  '/login',
  asyncHadler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt
      });
    } else {
      res.status(401);
      throw new Error('Invalid Email or password');
    }
  })
);

userRouter.get(
  '/profile',
  protect,
  asyncHadler(async (req, res) => {
    // res.send('User Profile');
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      });
    } else {
      res.status(404);
      throw new Error('user not found');
    }
  })
);

module.exports = userRouter;
