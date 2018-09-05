const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  firstName: String,
  lastName: String,
  positions: [String]
});

module.exports = mongoose.model('Player', PlayerSchema);