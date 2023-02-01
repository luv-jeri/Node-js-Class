const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 80,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false,
  },
  token: {
    type: String,
  },
});



module.exports = userSchema;
