const catcher = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res);
    } catch (e) {
      console.log(e);
      next({
        code: 500,
        message: 'Something went wrong',
      });
    }
  };
};

module.exports = catcher;
