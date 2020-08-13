/* eslint-disable no-console */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    maxLength: 50,
    unique: 1,
  },

  password: {
    type: String,
    minLength: 5,
  },

  token: {
    type: String,
  },
});

// add in a presave method that will hash the password, if it has been modified

userSchema.pre('save', (next) => {
  // This is the user that you are saving
  const user = this;

  if (user.isModified('password')) {
    console.log('Hey');
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
