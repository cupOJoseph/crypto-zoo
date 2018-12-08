// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const Web3 = require('web3');
const parser = require('body-parser');
const BigNumber = require('bignumber.js');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// mongoose
require('./db/config');
var { db } = require('./db/mongoose');
var { Tokenmodel } = require('./models/tokenmodel');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var jsonParser = bodyParser.json(); //I added this to parse the body

// http://expressjs.com/en/starter/basic-routing.html
app.get('/' + process.env.loc, function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*
app.get('/api/', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(
    {

    }
  ));
});
*/

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//=========================== Mongo ============================= //
var mongouri =
  'mongodb://' +
  process.env.USER +
  ':' +
  process.env.PASS +
  '@' +
  process.env.HOST +
  ':' +
  process.env.mongoport +
  '/' +
  process.env.DB;
//moved to when we need it, so connect is not inturupted later.
// =========================== API ============================== //

var router = express.Router();
app.use('/api', router);

router.get('/', function(req, res) {
  res.json({ choices: ['contract', 'user', 'token'] });
});

//get contract data
router.get('/contract', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify({
      network: 'Rinkbey',
      address: '0xbca55e153d08d77bfac33e7153dc6ec12e42bd49'
    })
  );
});

//return options

//use infura for future calls
//store infura key in enviorment safe

//TODO infura setup
var infura_endpoint =
  'https://rinkeby.infura.io/v3/8235d0efb49f4a8eaacdb0544078d834';
// process.env.InfuraSECRET
//var web3js = new web3(new web3.providers.WebsocketProvider(infura_endpoint));
var token_json = [
  {
    token_id: 0,
    fundraiser_id: 0,
    amount: 0,
    donor: '0x0000000000000000000000000000000000000000',
    is_fundraiser: 'TRUE'
  },
  {
    token_id: 1,
    fundraiser_id: 1,
    amount: 0,
    donor: '0x0000000000000000000000000000000000000000',
    is_fundraiser: 'TRUE'
  },
  {
    token_id: 2,
    fundraiser_id: 1,
    amount: 0.01,
    donor: '0x5d2364ebcdfb5f64eea3600aad4c054d30900d82',
    is_fundraiser: 'FALSE'
  },
  {
    token_id: 3,
    fundraiser_id: 1,
    amount: 0.01,
    donor: '0xe4b420f15d6d878dcd0df7120ac0fc1509ee9cab',
    is_fundraiser: 'FALSE'
  },
  {
    token_id: 4,
    fundraiser_id: 1,
    amount: 0.033,
    donor: '0xe4b420f15d6d878dcd0df7120ac0fc1509ee9cab',
    is_fundraiser: 'FALSE'
  }
];

//TODO return user info based on address
router.route('/user').get(function(request, response) {
  var userAddress = request.param('address');
  console.log('getting data for ' + userAddress);
  // var userdata = {};
  // var data;
  //
  // mongodb.MongoClient.connect(
  //   mongouri,
  //   { useNewUrlParser: true },
  //   function(err, client) {
  //     //NOT RETURNING EXPECTED FIX!!!
  //     if (err) {
  //       response.json({ error: 'db client problem' });
  //     }
  //     var db = client.db('the_zoo');
  //     var collect = db.collection('tokenmodels');
  //     data = collect.find({ owner: userAddress });
  //   }
  // );
  //
  // console.log(data);
  // response.json(data);
  Tokenmodel.find({ owner: userAddress })
    .sort({ _id: -1 })
    .then(tokenArray => {
      if (tokenArray.length > 0) {
        response.send({ tokenArray });
      } else {
        response.status(404).send(`User does not have any tokens`);
      }
    })
    .catch(err => {
      response.status(404).send(`User does not have any tokens`);
      console.log(err.err);
    });
});

//TODO return token info from ID
router.route('/token').get(function(request, response) {
  var token_id = request.param('id');
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify(
      token_json[token_id] // replace with db
    )
  );
});

//not using router for this.

//console.log("address" + post_location);
//================Event Processor==================//
app.post('/', jsonParser, (req, res) => {
  //console.log("=======body:=========");
  // console.log(req.body);
  //console.log("=======Events======");
  // console.log(req.body.events);
  //console.log("=============");

  //handle multiple events in 1 block
  try {
    var events = req.body.events;
    for (var i in events) {
      //event here is each full event
      var event = events[i];

      var type = event.event; //bad naming but what ever.

      if (type == 'Transfer') {
        console.log('transfer event recieved');
        console.log('=======ret values=======');
        console.log(event.returnValues);
        console.log('==============');

        // Solidity Event: Transfer (
        // index_topic_1 address _from,
        // index_topic_2 address _to,
        // index_topic_3 uint256 _tokenId)
        //update owner of that token for transfer.
        var to = event.returnValues['1'];
        var tokenID = event.returnValues['2'];

        Tokenmodel.findOneAndUpdate(
          { TokenID: tokenID },
          { $set: { owner: to } },
          {
            upsert: true,
            new: true
          },
          function() {
            console.log('Transfer complete.');
          }
        );

        if (typeof to !== 'undefined' && typeof tokenID !== 'undefined') {
          console.log('transfer log is good.');
        }
      } else if (type == 'MakeDonation') {
        console.log('MakeDonation event recieved');
        console.log('=======ret values=======');
        console.log(event.returnValues);
        console.log('==============');

        // Solidity Event: MakeDonation(
        //uint256 donationId,
        //uint256 amount,
        //address donor,
        //address sender)
        var tokenID = event.returnValues['0'];
        var amount = event.returnValues['1'];
        var to = event.returnValues['2'];
        var sender = event.returnValues['3'];

        value = new BigNumber(amount);
        decimal = new BigNumber(10);
        decimal = decimal.exponentiatedBy(-18);
        value = value.multipliedBy(decimal);

        Tokenmodel.findOneAndUpdate(
          { TokenID: tokenID },
          { $set: { owner: to, amount: value, minter: sender } },
          {
            upsert: true,
            new: true
          },
          (err, token) => {
            console.log('Donation complete.');
            console.log(token);
          }
        ).catch(err => {
          console.log(err);
        });
      } else {
        //event type unknown
        res.json({ status: '2', error: 'event type unknown' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(200).send();
  }
  res.status(200).send();
  //TODO validate the resp has stuff we like
});
app.get('/' + process.env.loc, function(req, res) {
  //console.log(JSON.stringify(req));
  res.json({ status: 1 });
});
