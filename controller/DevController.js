const UserModel = require('../database/modals/user.modal');
const StarModel = require('../database/modals/star.modal');

const getAllUser = async (req, res, next) => {
  const users = await UserModel.find();
  res.json({
    status: 'success',
    data: users,
    message: 'All users',
  });
};

const getAllStars = async (req, res, next) => {
  const stars = await StarModel.find();
  res.json({
    status: 'success',
    data: stars,
    message: 'All stars',
  });
};

const deleteAllUser = async (req, res, next) => {
  const users = await UserModel.deleteMany();
  res.json({
    status: 'success',
    data: users,
    message: 'All users deleted',
  });
};

const deleteAllStars = async (req, res, next) => {
  const stars = await StarModel.deleteMany();
  res.json({
    status: 'success',
    data: stars,
    message: 'All stars deleted',
  });
};

module.exports = {
  getAllUser,
  getAllStars,
  deleteAllUser,
  deleteAllStars,
};
