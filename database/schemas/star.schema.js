const { Schema } = require('mongoose');

const starSchema = new Schema({
  name: String,
  temperature: Number,
  mass: Number,
  color: String,
  radius: Number,
  user : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = starSchema;
