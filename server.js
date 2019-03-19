const express = require('express');

var app = express();
// app.set('port', process.env.PORT || 3001);

//use this so we can read certs and have httpS
const https = require('https');
const http = require('http');
const fs = require('fs');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

//DB setup
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.promise = global.Promise;

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


// =============== //
// mongoose setup //
// ============== //
//schema model for each token tracked in db
var tokenmodel = new mongoose.Schema({
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
var Token = mongoose.model('Token', tokenmodel);

//connect to local mongodb
const mongouri = "mongodb://localhost:27017/heritage";
mongoose.connect(mongouri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
	console.log("connected to the db successfully");
});



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
router.post('/31c01e25f4db50d00a47a379d3d64c98', jsonParser, function(request, response) {
	try {
		console.log("got a post: ", req.body);
		//try to add to db
		//example {"id":"288","type":"201","amount":"100000000000000000"}
		var donation = new Token({
			token_id: req.body["id"],
			type: 201,
			owner: req.body["owner"],
			amount: req.body["amount"]
		});
		//save to mongo
		donation.save(function (err, donation) {
	    if (err){
				return console.error(err);
			}
			else{
				console.log("donation saved successfully.");
			}
  	});

	}
		// POST ERRORS
	catch (err) {
    console.log(err);
    response.status(400).send();
		console.log(request);
  }
  response.status(200).send("hi");

});
