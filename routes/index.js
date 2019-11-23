const express = require('express');
const router = express.Router();

router.post('/sort-domains', (req, res) => {
  res.status(200);
  res.send({ work: req.body.fileName });
});

module.exports = router;
