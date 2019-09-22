const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  cellId: {
    type: String,
    required: true
  },  
  sa: {
    type: String,
    required: true
  },
  sales: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  monthId: {
    type: Number,
    required: true
  },
  yearId: {
    type: Number,
    required: true
  },
  keyValue: {
    type: String,
    required: false
  },
  extension: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
