const { model } = require('mongoose');
const userSchema = require('../schemas/user.schema');

const UserModel = model('user', userSchema);

module.exports = UserModel;
