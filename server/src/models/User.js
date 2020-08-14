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

userSchema.pre('save', function(next) {
  // This is the user that you are saving
  const user = this;
  console.log('Hey1');
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next;
      // eslint-disable-next-line no-shadow
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next;
        // if there is no error, set the second value of the cb to our user.password
        user.password = hash;
        next();
      });
    });
  } else next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
