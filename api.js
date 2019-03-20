const BigNumber = require('bignumber.js');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jsonParser = bodyParser.json();

// mongoose
//require('./db/config');
var tokenModal =  new mongoose.model("Tokenmodel", {
  token_id: {
    type: Number
  },
  type: {
    type: Number
  },
  owner: {
    type: String
  },
  amount: {
    type: String
  }
});

const mongouri = "mongodb://localhost:27017/heritagedb";
mongoose.connect(
  mongouri,
  { useNewUrlParser: true }
).then(function(value) {
  //console.log("db: ", value.Mongoose);
  //var collections = value.collection.find("heritage");
  //console.log(collections);
  //console.log("mongo uri connected.");
});
var db = mongoose.connection
db.on('error', console.error.bind(console, '==============connection error===============:'));

db.once('open', function(){
  tokenModal.findOneAndUpdate(
          { token_id: "286" },
          { $set: { owner: "0xc50a111db3d5e72927339771aa7181396eb0628f", type: "205", amount: "10000000000000" } },
          {
            upsert: true,
            new: true
          },
          function() {
            console.log('Transfer complete.');
          }
    );
});
