/* eslint-disable indent */
const express = require('express');
// morgan is a logger. Logs all incoming requests
const morgan = require('morgan');
const helmet = require('helmet');
// adds cross origin resource sharing header
const cors = require('cors');
const middleware = require('./middleware');

const app = express();

app.use(morgan('common'));

// allows use to secure our headers just a little bit more
app.use(helmet());

// This will allow our react app to send requests to our backend
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

// This needs to be the last route so it doesn't always get activated
app.use(middleware.notFound);

app.use(middleware.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening on port 5000');
});
