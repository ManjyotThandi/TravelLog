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
const { User } = require('./models/User');

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

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err) {
            res.json({ success: false });
        }
        res.json({ success: true });
    });
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    // Username will have to be unique so we can search up on that user
    User.findOne({ username }, (err, user) => {
        if (!user) return res.json({ loginSuccess: false });

        // if we did come back with a result - check to see if the passwords match
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.json({ loginSuccess: false, message: 'Incorrect Password!' });
        });

        // if the passwords also match - send the user a jwt to attach to their name to keep them logged in. This token also gets saved in db
        user.generateToken((err, user) => {
            if (err) {
                return res.json({ loginSuccess: false, message: 'Incorrect Password. Not able to generate token!' });
            }
            // set the cookie. The db now has the token stored aganist the user as well. user.token was set in generateToken
            return res.cookie({ userToken: user.token }).json({ loginSuccess: 'true' });
        });
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
