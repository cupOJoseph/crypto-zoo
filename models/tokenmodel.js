var mongoose = require('mongoose');

var Tokenmodel = mongoose.model('Tokenmodel', {
  TokenID: {
    type: Number
  },
  fundraiser_id: {
    type: Number
  },
  amount: {
    type: Number
  },
  owner: {
    type: String
  },
  is_fundraiser: {
    type: Boolean
  },
  minter: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = { Tokenmodel };
