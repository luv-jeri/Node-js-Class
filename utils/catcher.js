const catcher = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
};

module.exports = catcher;
