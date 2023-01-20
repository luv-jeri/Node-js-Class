const express = require('express');
const StarModel = require('../database/modals/star.modal');
const UserModel = require('../database/modals/user.modal');

const router = express.Router();

router.use(async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.json({
      status: 'error',
      data: null,
      message: 'Please login first',
    });
  }

  const user = await UserModel.findOne({
    token,
  });

  if (!user) {
    return res.json({
      status: 'error',
      data: null,
      message: 'You are not logged in , or your token is invalid',
    });
  }

  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const docs = await StarModel.find();

    res.json({
      status: 'success',
      data: docs,
      message: `Welcome `,
    });
  })
  .post(async (req, res) => {
    try {
      const doc = await StarModel.create(req.body);
      res.json({
        status: 'success',
        data: doc,
        message: 'Data saved 🔥🔥',
      });
    } catch (e) {
      res.json({
        status: 'error',
        data: e,
        message: 'Error saving data 🔥🔥',
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const doc = await StarModel.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
      });

      res.json({
        status: 'success',
        data: doc,
        message: 'Data updated 🔥🔥',
      });
    } catch (e) {
      res.json({
        status: 'error',
        data: e,
        message: 'Error updating data 🔥🔥',
      });
    }
  })
  .delete(async (req, res) => {
    const doc = await StarModel.findByIdAndDelete(req.query.id);
    res.json({
      status: 'success',
      data: doc,
      message: 'Data deleted 🔥🔥',
    });
  });

module.exports = router;
