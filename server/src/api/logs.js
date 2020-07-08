const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Here',
  });
});

module.exports = router;
