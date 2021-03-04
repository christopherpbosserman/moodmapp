const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  date: { type: String, required: true },
  mood: { type: Number, required: true },
  desc: { type: String, required: true },
});

module.exports = mongoose.model('Entry', entrySchema);
