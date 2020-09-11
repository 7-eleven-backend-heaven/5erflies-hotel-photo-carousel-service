const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../sdc_database/index.js');
var morgan = require('morgan');
const PORT = 5000;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const connectionUrl = 'mongodb://localhost:27017';
// Database Name
const database_name = 'sdc_galley';

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use('/property/:id', express.static(path.join((__dirname, './client/public'))));

app.get('/properties/:id', (req, res) => {
  console.log('this is working')
  let id = Number(req.params.id);
  db.getProperties(id, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(data)
    }
  });
});

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON ${PORT}`)
});
