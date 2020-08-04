/* eslint-disable indent */
const express = require('express');
// morgan is a logger. Logs all incoming requests
const morgan = require('morgan');
const helmet = require('helmet');
// adds cross origin resource sharing header
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./middleware');
const logs = require('./api/logs');

require('dotenv').config();

// create mongo connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});

const app = express();

// for logging purposes
app.use(morgan('common'));

// allows use to secure our headers just a little bit more
app.use(helmet());

// This will allow our react app to send requests to our backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

// JSON body parsing middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'In index.js',
    });
});

// Like middleware as well. Allows us to seperate our code.
app.use('/api/logs', logs);

// This needs to be the last route so it doesn't always get activated
app.use(middleware.notFound);

app.use(middleware.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log('Listening on port 1337');
});
