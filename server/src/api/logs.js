/* eslint-disable no-console */
const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allResults = await LogEntry.find();
    res.json({
      results: allResults,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    // .save returns a promise document so we are able to use async await
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    // passes the error on to the next error handler.
    next(error);
  }
});

module.exports = router;
