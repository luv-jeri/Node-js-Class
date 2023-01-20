const { model } = require('mongoose');
const starSchema = require('../schemas/star.schema');

const StarModel = model('star', starSchema);

module.exports = StarModel;
