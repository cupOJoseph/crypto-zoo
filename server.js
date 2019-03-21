const express = require('express');

var app = express();
// app.set('port', process.env.PORT || 3001);

//use this so we can read certs and have httpS
const https = require('https');
const http = require('http');
const fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const BigNumber = require('bignumber.js');


var jsonParser = bodyParser.json({ type: 'application/*+json' });

//DB setup
var mongodb = require('mongodb');
var mongoose = require('mongoose');
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
          { $set: { owner: "0xc50a111db3d5e72927339771aa7181396eb0628f", type: "206", amount: "10000000000000" } },
          {
            upsert: true,
            new: true
          },
          function() {
            console.log('Transfer complete.');
          }
    );
});

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/dapp.heritage.aero/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/dapp.heritage.aero/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dapp.heritage.aero/chain.pem', 'utf8');
console.log("using certs via: /etc/letsencrypt/live/dapp.heritage.aero" );

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// if (process.env.NODE_ENV === 'production') {
app.set('port', 80);
app.use(express.static('build'));
//app.use('*', express.static('build'));
// }

// Starting both http & https servers
//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

/**
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});**/
httpsServer.on('listening',function(){
    console.log('Use listening server 443');
});


httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443.');
});

/**
app.listen(app.get('port'), () => {
  console.log(
    `_______________________________________________________________`
  );
  console.log(` `);
  console.log(`################# Server Started ####################`);
  console.log(` `);
  console.log(`Started on port ${app.get('port')}`);
  console.log(`______________________________________________________________`);
  console.log(` `);
});
**/
module.exports = { app };


// ============== //
// API            //
// ============== //
var router = express.Router();
app.use('/api', router);

// Return contract in via API
router.get('/contract', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify({
      network: 'Mainnet',
      address: '0xf30fe881912d8b0c5453048683fc5c91c107461d'
    })
  );
});

// API handle POST of events
router.post('/31c01e25f4db50d00a47a379d3d64c98', urlencodedParser, function(req, response) {
	try {
		console.log("got a post: ", req.query);
		//try to add to db
		//example {"id":"288","type":"201","amount":"100000000000000000"}
		//save to mongo
		tokenModal.findOneAndUpdate(
	          { token_id: req.query["id"] },
	          { $set: { owner: req.query["owner"], type: "201", amount: req.query["amount"] } },
	          {
	            upsert: true,
	            new: true
	          },
	          function() {
	            console.log('Transfer complete.');
	          }
	    );

	}
		// POST ERRORS
	catch (err) {
    console.log(err);
    response.status(399).send();
		//console.log(request);
  }
  response.status(200).send("hi");
});

router.get('/', urlencodedParser, function(request, response) {
	var userAddress = request.param('address');

  response.status(200).send("sent");
});
