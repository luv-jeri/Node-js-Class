const express = require('express');
const { signin, signup, whoami } = require('../controller/AuthContoller');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/whoami', whoami);

module.exports = router;
