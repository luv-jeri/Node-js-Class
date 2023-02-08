const errorHandler = (err, req, res, next) => {
  // check if error is a object
  if (typeof err !== 'object') {
    return res.status(500).json({
      status: 'error',
      data: null,
      message: 'Something went wrong',
    });
  }

  if (err.isOperational) {
    //* Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      status: 'error',
      data: null,
      message: err.message,
    });
  } else {
    //* Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      data: null,
      message: 'Something went wrong',
    });
  }

  res.status(500).json({
    status: 'error',
    data: null,
    message: 'Something went wrong',
  });
};

module.exports = errorHandler;