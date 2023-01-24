const StarModel = require('../models/StarModel');

const createStar = async (req, res) => {
  try {
    const doc = await StarModel.create(req.body);
    res.json({
      status: 'success',
      data: doc,
      message: 'Data saved 🔥🔥',
    });
  } catch (e) {
    res.json({
      status: 'error',
      data: e,
      message: 'Error saving data 🔥🔥',
    });
  }
};

const getStars = async (req, res) => {
  const docs = await StarModel.find();

  res.json({
    status: 'success',
    data: docs,
    message: `Welcome `,
  });
};

const deleteStar = async (req, res) => {
  const doc = await StarModel.findByIdAndDelete(req.query.id);
  res.json({
    status: 'success',
    data: doc,
    message: 'Data deleted 🔥🔥',
  });
};

const updateStar = async (req, res) => {
  try {
    const doc = await StarModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });

    res.json({
      status: 'success',
      data: doc,
      message: 'Data updated 🔥🔥',
    });
  } catch (e) {
    res.json({
      status: 'error',
      data: e,
      message: 'Error updating data 🔥🔥',
    });
  }
};

module.exports = {
  createStar,
  getStars,
  deleteStar,
  updateStar,
};
