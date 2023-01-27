const express = require('express');
const {
  getStars,
  createStar,
  deleteStar,
  updateStar,
} = require('../controller/StarsController');
const { verify } = require('../controller/AuthContoller');

const router = express.Router();

// router.get('/', getStars);
// router.post('/', createStar);
// router.delete('/', deleteStar);
// router.patch('/', updateStar);

router.use(verify);

router.route('/').get(getStars).post(createStar).patch(updateStar).delete(deleteStar);

module.exports = router;
