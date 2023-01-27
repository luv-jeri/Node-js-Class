const StarModel = require('../database/modals/star.modal');

const createStar = async (req, res) => {
  try {
    const doc = await StarModel.create({
      ...req.body,
      user: req.currentUser._id,
    });
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
    message: `Welcome to the club! ${docs.length}`,
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
    const docToBeUpdate = await StarModel.findById(req.query.id);

    if (docToBeUpdate.user.toString() !== req.currentUser._id.toString()) {
      return res.json({
        status: 'error',
        data: null,
        message: 'You are not authorized to update this star',
      });
    }

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
