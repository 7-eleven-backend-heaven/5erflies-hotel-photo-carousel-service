const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const connectionUrl = 'mongodb://localhost:27017';
// Database Name
const database_name = 'sdc_galley';
// Use connect method to connect to the server
const getProperties = (id, callback) => {
  MongoClient.connect(connectionUrl, (err, client) => {
    console.log(id);
    const db = client.db(database_name);
    const properties = db.collection('properties');
    properties.find({ id: id }).toArray((error, doc) => {
      if (error) {
        console.log('Error retrieveing docement')
        callback(error);
      } else {
        callback(null, doc)
      }
    });
  });
};

module.exports.getProperties = getProperties;