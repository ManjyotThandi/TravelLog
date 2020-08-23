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

userSchema.pre('save', function (next) {
  // This is the user that you are saving
  const user = this;
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

// This is to compare passwords when the user tries to log in

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // this.password is the user that came back from the findone method
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

// This is to generate a jwt and set it in the cokie via the response
userSchema.methods.generateToken = function (cb) {
  const user = this;
  // here we are using the user id from this instance and converting that into a token. In findByToken we need to search by userId as
  // when we decode it will essentially return a user id
  const token = jwt.sign(user._id.toHexString(), 'secret');
  // assign the user instance a token
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
};

userSchema.statics.findByToken = (token, cb) => {
  const user = this;
  
  // refer to comment in generateToken method to understand why we are searching by userid
  // decode the token. We used secret above^, so pass that in, and we signed the user._id. When we decode this we should get a user id back
  jwt.verify(token, 'secret', (err, decode) => {
    console.log('Inside the findByToken method!!');
    user.findOne({ _id: decode, token }, (err, user) => {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
