const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    res.json({
      status: 'success',
      data: JSON.parse(data),
      message: 'Data retrieved 🔥🔥',
      length: JSON.parse(data).length,
    });
  });
});

app.post('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    const database = JSON.parse(data);
    const { name, temperature, mass, color, radius } = req.body;

    const duplicate = database.find((item) => item.name === name);

    if (duplicate)
      return res.json({
        status: 'failed',
        message: 'WE ALREADY HAVE THAT DATA',
      });

    const dataToBeAdded = {
      name,
      temperature,
      mass,
      color,
      radius,
    };

    if (
      typeof name !== 'string' ||
      typeof temperature !== 'number' ||
      typeof mass !== 'number' ||
      typeof color !== 'string' ||
      typeof radius !== 'number'
    )
      return res.json({
        status: 'error',
        message: 'Invalid data',
      });

    database.push(dataToBeAdded); // # ADDING DATA TO THE DATABASE

    fs.writeFile('./database.json', JSON.stringify(database), (err) => {
      res.json({
        status: 'success',
        data: dataToBeAdded,
        message: 'Data added 🔥🔥',
      });
    });
  });
});

app.patch('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    const database = JSON.parse(data);
    const index = database.findIndex((item) => item.name === req.query.name);
    database[index] = { ...database[index], ...req.body };
    fs.writeFile('./database.json', JSON.stringify(database), (err) => {
      res.json({
        status: 'success',
        data: database[index],
        message: 'Data updated 🔥🔥',
      });
    });
  });
});

app.delete('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    const database = JSON.parse(data);
    const index = database.findIndex((item) => item.name === req.query.name);
    database.splice(index, 1);
    fs.writeFile('./database.json', JSON.stringify(database), (err) => {
      res.json({
        status: 'success',
        data: database[index],
        message: 'Data deleted 🔥🔥',
      });
    });
  });
});

app.listen('3000', () => {
  console.log('Server is running on port 3000');
});
