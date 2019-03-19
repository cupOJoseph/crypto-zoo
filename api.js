const BigNumber = require('bignumber.js');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jsonParser = bodyParser.json();

// mongoose
//require('./db/config');
var tokenmodel =  mongoose.model('Tokenmodel', {
  token_id: {
    type: Number
  },
  type: {
    type: Number
  },
  owner: {
    type: Number
  },
  amount: {
    type: String
  }
});

const mongouri = "mongodb://localhost:27017/heritage";
var db = mongoose.connect(
  mongouri,
  { useNewUrlParser: true }
);
console.log("db: ", db);
