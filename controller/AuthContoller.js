const UserModel = require('../database/modals/user.modal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sign = require('../utils/sign');

const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const new_user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ ...new_user._doc }, undefined, undefined, res);

    res.json({
      status: 'success',
      data: token,
      message: 'Welcome to the club!',
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 'error',
      data: e,
      message: 'Sorry we could not create your account',
    });
  }
};

const signin = async (req, res) => {
  try {
    // Verify email and password
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
    }).select('+password');

    if (!user) {
      return res.json({
        status: 'error',
        data: null,
        message: 'Please register first !',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        status: 'error',
        data: null,
        message: 'Password is incorrect',
      });
    }

    const token = sign({ ...user._doc }, undefined, undefined, res);

    res.json({
      status: 'success',
      data: token,
      message: 'You are logged in',
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 'error',
      data: e,
      message: 'Sorry we could not login you in',
    });
  }
};

const verify = async (req, res, next) => {
  let { authorization } = req.headers || req.cookies;

  if (!authorization) authorization = req.cookies.authorization;

  console.log(authorization);

  if (!authorization) {
    return res.json({
      status: 'error',
      data: null,
      message: 'You are not logged in',
    });
  }

  try {
    const decoded = jwt.verify(authorization, 'ITS_VERY_IMP');

    req.currentUser = decoded;
  } catch (e) {
    return res.json({
      status: 'error',
      data: null,
      message: 'Token is invalid',
    });
  }

  next();
};

module.exports = {
  signup,
  signin,
  verify,
};
