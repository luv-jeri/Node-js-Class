const express = require('express');
const UserModel = require('../database/modals/user.modal');

const router = express.Router();

router
  .post('/join', async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const new_user = await UserModel.create({
        name,
        email,
        password,
      });

      res.json({
        status: 'success',
        data: new_user,
        message: 'Welcome to the club!',
      });
    } catch (e) {
      res.json({
        status: 'error',
        data: e,
        message: 'Sorry we could not create your account',
      });
    }
  })
  .post('/login', async (req, res) => {
    try {
      // Verify email and password
      const { email, password } = req.body;
      const user = await UserModel.findOne({
        email,
        password,
      });

      if (!user) {
        return res.json({
          status: 'error',
          data: null,
          message: 'Please register first , or check your email and password',
        });
      }
      //  Generate a token of 32 characters
      const token = Math.random().toString(36).substr(2, 32);

      await UserModel.findByIdAndUpdate(
        user._id,
        {
          token,
        },
        {
          new: true,
        }
      );

      res.json({
        status: 'success',
        data: token,
        message: 'You are logged in',
      });
    } catch (e) {
      res.json({
        status: 'error',
        data: e,
        message: 'Sorry we could not login you in',
      });
    }
  });

module.exports = router;
