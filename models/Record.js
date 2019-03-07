const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const recordSchema = new mongoose.Schema({
  owner:String,
  donator:String,
  timestamp_created:{
    type: Date,
    default: Date.now
  },
  local_link_to_image:String,
  amount:Number
});

// Define our indexes
recordSchema.index({
  owner: 'text',
  donator: 'text'
});


module.exports = mongoose.model('Record', recordSchema);
