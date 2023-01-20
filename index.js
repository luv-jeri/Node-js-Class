require('./database');

const express = require('express');
const morgan = require('morgan');

const router = require('./routes');

const app = express();

app.use(express.json());

var logger = morgan('tiny');
app.use(logger);

app.use(router);

app.listen('3000', () => {
  console.log('Server is running on port 3000');
});
