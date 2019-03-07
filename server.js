const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var app = express();
// app.set('port', process.env.PORT || 3001);

//use this so we can read certs and have httpS
const https = require('https');
const http = require('http');
const fs = require('fs');

// initialize mongodb connection via mongoose
mongoose.connect("localhost:27017");
mongoose.Promise = global.Promise; // make mongoose use ES6
mongoose.connection.on('error', (err) => {console.error(`Error: ${err.message}`);});
//import model
require('./models/Record');
// begin controller
const Record = mongoose.model('Record');
// POST record, res record
createRecord = async (req, res) => {
  const record = await (new Record(req.body)).save();
  res.status(200).send();
};



// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/heritage.aero/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/heritage.aero/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/heritage.aero/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// if (process.env.NODE_ENV === 'production') {
app.set('port', 80);
app.use(express.static('cryptoreef'));
app.use('*', express.static('cryptoreef'));
// }

// Starting both http & https servers
//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

/**
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});**/

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
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
