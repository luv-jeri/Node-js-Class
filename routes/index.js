const express = require('express');
const authRouter = require('./auth.routes');
const baseRouter = require('./base.routes');
const router = express.Router();


router.use('/auth', authRouter);
router.use('/', baseRouter);

module.exports = router;