const StarModel = require('../database/modals/star.modal');
const catcher = require('../utils/catcher');
const _Error = require('../utils/error_');
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

const deleteStar = async (req, res, next) => {
  try {
    if (!req.query.id) {
      return next(new _Error('Please provide an id to delete the star', 400));
    }

    const doc = await StarModel.findById(req.query.id);

    if (doc.user.toString() !== req.currentUser._id.toString()) {
      return next(new _Error('You are not authorized to delete this star', 401));
    }

    await StarModel.findByIdAndDelete(req.query.id);

    res.json({
      status: 'success',
      data: doc,
      message: 'Data deleted 🔥🔥',
    });
  } catch (e) {
    next(e);
  }
};

const updateStar = catcher(async (req, res) => {
  if (!req.query.id) {
    return next(new _Error('Please provide an id to update', 400));
  }

  const docToBeUpdate = await StarModel.findById(req.query.id);

  if (docToBeUpdate.user.toString() !== req.currentUser._id.toString()) {
    return next(new _Error('You are not authorized to update this star', 401));
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

const lookUp = catcher(async (req, res, next) => {
  const { str } = req.query;

  if (!str) {
    return next(new _Error('Please provide a string to search', 400));
  }

  if (str.length < 3) {
    return next(new _Error('Please provide a string with at least 3 characters', 400));
  }

  const regex = new RegExp(str, 'i');

  const docs = await StarModel.find({}).or([
    { name: regex },
    { constellation: regex },
    { distance: regex },
    { magnitude: regex },
    { diameter: regex },
    { temperature: regex },
    { type: regex },
    { description: regex },
  ]);

  res.json({
    status: 'success',
    data: docs,
    message: `Welcome to the club! ${docs.length}`,
  });
});

module.exports = {
  createStar,
  getStars,
  deleteStar,
  updateStar,
};
