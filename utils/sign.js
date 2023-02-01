const jwt = require('jsonwebtoken');

const sign = (
  payload,
  secret = 'ITS_VERY_IMP',
  options = {
    expiresIn: '1h',
  },
  res
) => {
  if (!payload) {
    throw new Error('Payload is required');
  }

  const token = jwt.sign(payload, secret, options);

  if (res) {
    res.cookie('authorization', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: true,
    });
  }

  return token;
};

module.exports = sign;
