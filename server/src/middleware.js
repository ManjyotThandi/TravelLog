require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('./models/User');

// Check if a user has a token (is logged in)
const auth = (req, res, next) => {
  const token = req.cookies.userToken;
  // refer to comment in generateToken method to understand why we are searching by userid
  // decode the token. We used secret above^, so pass that in, and we signed the user._id. When we decode this we should get a user id back
  jwt.verify(token, 'secret', (err, decode) => {
    User.findOne({ _id: decode, token })
      .then((user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true, message: 'Token not found' });
        // set the token in the request, now that we have verified the token coming in
        // from the cookie matches a user and token in the db
        req.token = token;
        req.user = user;
        next();
      })
      .catch((error) => next(error));
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Error!' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
  auth,
};
