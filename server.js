// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const Web3 = require('web3');
const parser = require("body-parser");
var bodyParser = require('body-parser');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var jsonParser = bodyParser.json()//I added this to parse the body

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
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

// =========================== API ============================== //


var router = express.Router(); 
app.use('/api', router);


router.get('/', function(req, res) {
    res.json({ "choices": ["contract", "user", "token"] });   
});

//get contract data
router.get('/contract', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(
    { 
      "network": "Rinkbey",
      "address": "0xbca55e153d08d77bfac33e7153dc6ec12e42bd49"
    }
  ));
});

//return options

//use infura for future calls
//store infura key in enviorment safe

//TODO infura setup
var infura_endpoint = "https://rinkeby.infura.io/v3/8235d0efb49f4a8eaacdb0544078d834";
// process.env.InfuraSECRET
//var web3js = new web3(new web3.providers.WebsocketProvider(infura_endpoint));
var token_json = [{"token_id": 0,"fundraiser_id": 0,"amount": 0,"donor": "0x0000000000000000000000000000000000000000","is_fundraiser": "TRUE"},{"token_id": 1,"fundraiser_id": 1,"amount": 0,"donor": "0x0000000000000000000000000000000000000000","is_fundraiser": "TRUE"},{"token_id": 2,"fundraiser_id": 1,"amount": 0.01,"donor": "0x5d2364ebcdfb5f64eea3600aad4c054d30900d82","is_fundraiser": "FALSE"},{"token_id": 3,"fundraiser_id": 1,"amount": 0.01,"donor": "0xe4b420f15d6d878dcd0df7120ac0fc1509ee9cab","is_fundraiser": "FALSE"},{"token_id": 4,"fundraiser_id": 1,"amount": 0.033,"donor": "0xe4b420f15d6d878dcd0df7120ac0fc1509ee9cab","is_fundraiser": "FALSE"}];

//TODO return user info based on address
router.route('/user').get(function(req, res) {
    res.json({ "choices": ["contract", "user", "token"] });   
});

//TODO return token info from ID
router.route('/token').get( function(request, response) {
  var token_id = request.param('id');
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(
    token_json[token_id] // replace with db
  ));
});


//not using router for this.

//console.log("address" + post_location);
app.post('/' + process.env.loc, jsonParser, function(req, res) {

  console.log("=======body:=========");
  console.log(req.body);
  console.log("=======raw=======");
  console.log(req.body.events[0].raw);
  console.log("=======ret values=======");
  console.log(req.body.events[0].returnValues);
  console.log("==============");
    
  //TODO validate the resp has 
  
    res.json({ "status": 1 });   
});
app.get('/' + process.env.loc, function(req, res) {
    //console.log(JSON.stringify(req));
    res.json({ "status": 1 });   
});














