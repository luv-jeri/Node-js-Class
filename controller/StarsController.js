const StarModel = require('../database/modals/star.modal');
const catcher = require('../utils/catcher');

const createStar = catcher(async (req, res, next) => {
  const doc = await StarModel.create({
    ...req.body,
    user: req.currentUser._id,
  });

  res.json({
    status: 'success',
    data: doc,
    message: 'Data saved 🔥🔥',
  });
});

const getStars = catcher(async (req, res, next) => {
  const docs = await StarModel.find();

  res.json({
    status: 'success',
    data: docs,
    message: `Welcome to the club! ${docs.length}`,
  });
});

const deleteStar = catcher(async (req, res, next) => {
  if (!req.query.id) {
    return next({
      code: 400,
      message: 'Please provide an id to delete',
    });
  }

  const doc = await StarModel.findById(req.query.id);

  if (doc.user.toString() !== req.currentUser._id.toString()) {
    return next({
      code: 401,
      message: 'You are not authorized to delete this star',
    });
  }

  await StarModel.findByIdAndDelete(req.query.id);

  res.json({
    status: 'success',
    data: doc,
    message: 'Data deleted 🔥🔥',
  });
});

const updateStar = catcher(async (req, res) => {
  if (!req.query.id) {
    return next({
      code: 400,
      message: 'Please provide an id to update',
    });
  }

  const docToBeUpdate = await StarModel.findById(req.query.id);

  if (docToBeUpdate.user.toString() !== req.currentUser._id.toString()) {
    return next({
      code: 401,
      message: 'You are not authorized to update this star',
    });
  }

  const doc = await StarModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  });

  res.json({
    status: 'success',
    data: doc,
    message: 'Data updated 🔥🔥',
  });
});

module.exports = {
  createStar,
  getStars,
  deleteStar,
  updateStar,
};
