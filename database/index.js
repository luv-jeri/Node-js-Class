const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/space', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to database', err);
});
