require('./database');

const morgan = require('morgan');

const express = require('express');
const app = express();
app.use(express.json());

var logger = morgan('tiny');
app.use(logger);

const StarRouter = require('./routes/StarRouter');
const AuthRouter = require('./routes/AuthRoutes');

app.use('/api/v1/stars', StarRouter);
app.use('/api/v1/auth', AuthRouter);

app.listen('3000', () => {
  console.log('Server is running on port 3000');
});
