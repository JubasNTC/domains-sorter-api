const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const Sorter = require('../models/Sorter');

router.get('/', (req, res) => {
  res.send({ server: 'work' });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();
  // eslint-disable-next-line handle-callback-err
  form.parse(req, (error, fields, files) => {
    // eslint-disable-next-line handle-callback-err
    fs.readFile(files.file[0].path, (_error, data) => {
      res.send({ lines: data.toString().split('\n') });
      const lines = data.toString().split('\n');
      const sorter = new Sorter(lines);
      sorter.sortDomains();
      res.send({ result: sorter.getSortResult() });
    });
  });
});

module.exports = router;
