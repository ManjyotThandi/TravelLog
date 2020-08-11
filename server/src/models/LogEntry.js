const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredDate = {
  required: true,
  type: Date,
};

const logEntrySchema = new Schema({
  title: requiredString,
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: [0, 'Rating lower than 0 is not allowed'],
    max: 10,
    default: 0,
  },
  image: String,
  latitude: {
    ...requiredNumber,
  },
  longitude: {
    ...requiredNumber,
  },
  visitDate: requiredDate,
},
{
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
