const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const Sorter = require('../models/Sorter');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();
  // eslint-disable-next-line handle-callback-err
  form.parse(req, (error, fields, files) => {
    const readStream = fs.createReadStream(files.file[0].path, 'utf8');
    const sorter = new Sorter();
    readStream
      .on('data', chunk => {
        sorter.setDomains(chunk.split('\n'));
        sorter.sortDomains();
      })
      .on('end', function() {
        res.send({ result: sorter.getSortResult() });
      });
  });
});

module.exports = router;
