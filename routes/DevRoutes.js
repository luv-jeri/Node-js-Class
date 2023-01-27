const express = require('express');
const {
  getAllUser,
  getAllStars,
  deleteAllUser,
  deleteAllStars,
} = require('../controller/DevController');
const router = express.Router();

router.get('/user', getAllUser);
router.get('/stars', getAllStars);

router.delete('/user', deleteAllUser);
router.delete('/stars', deleteAllStars);

module.exports = router;
