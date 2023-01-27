const UserModel = require('../database/modals/user.modal');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
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
};

const signin = async (req, res) => {
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

    console.log(user);

    const token = jwt.sign(
      {
        ...user._doc,
        loggedInAt: new Date().toISOString(),
      },
      'ITS_VERY_IMP',
      {
        expiresIn: '1h',
      }
    );

    res.cookie('authorization', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

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
};

const verify = async (req, res, next) => {
  let { authorization } = req.headers || req.cookies;

  if(!authorization) authorization = req.cookies.authorization;

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
