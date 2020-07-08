const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Here',
  });
});

router.post('/', async (req, res) => {
  try {
    const logEntry = new LogEntry(req.body);
    await logEntry.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
