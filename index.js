const express = require('express');
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

const app = express();

app.use(express.json());

const starSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  mass: Number,
  color: String,
  radius: Number,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 80,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const StarModel = mongoose.model('Star', starSchema);
const UserModel = mongoose.model('User', userSchema);

app.post('/join', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const new_user = await UserModel.create({
      name,
      email,
      password,
    });

    console.log(new_user);
    res.json({
      status: 'success',
      data: new_user,
      message: 'Welcome to the club!',
    });
  } catch (e) {
    res.json({
      status: 'error',
      data: e,
      message: 'Sorry we could not create your account',
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email, password: password });

    if (!user) {
      return res.json({
        status: 'error',
        data: null,
        message: 'Invalid credentials OR  User does not exist, Please signup',
      });
    }

    res.json({
      status: 'success',
      data: user,
      message: 'Welcome back!',
    });
  } catch (e) {
    res.json({
      status: 'error',
      data: e,
      message: 'Sorry we could not login you in',
    });
  }
});

app.get('/', async (req, res) => {
  const docs = await StarModel.find();

  res.json({
    status: 'success',
    data: docs,
    message: 'Data fetched 🔥🔥',
  });
});

app.post('/', async (req, res) => {
  try {
    const doc = await StarModel.create(req.body);
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
});

app.patch('/', async (req, res) => {
  try {
    const doc = await StarModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });

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
});

app.delete('/', async (req, res) => {
  const doc = await StarModel.findByIdAndDelete(req.query.id);
  res.json({
    status: 'success',
    data: doc,
    message: 'Data deleted 🔥🔥',
  });
});

app.listen('3000', () => {
  console.log('Server is running on port 3000');
});
