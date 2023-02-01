require('./database');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:9000'],
  })
);

var logger = morgan('tiny');
app.use(logger);

const StarRouter = require('./routes/StarRouter');
const AuthRouter = require('./routes/AuthRoutes');
const DevRouter = require('./routes/DevRoutes');

app.use('/api/v1/stars', StarRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/dev/api/v1', DevRouter);

app.listen('9000', () => {
  console.log('Server is running on port 3000');
});
