const { Schema } = require('mongoose');

const starSchema = new Schema({
  name: String,
  temperature: Number,
  mass: Number,
  color: String,
  radius: Number,
});

module.exports = starSchema;
