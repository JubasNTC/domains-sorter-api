const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const es = require('event-stream');
const Sorter = require('../models/Sorter');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();
  // eslint-disable-next-line handle-callback-err
  form.parse(req, (error, fields, files) => {
    const sorter = new Sorter();
    // eslint-disable-next-line no-unused-vars
    const readStream = fs
      .createReadStream(files.file[0].path)
      .pipe(es.split('\n'))
      .pipe(
        es
          .mapSync(line => {
            sorter.setLine(line);
          })
          .on('error', function(err) {
            res.send({ status: 500, errro: err });
          })
          .on('end', function() {
            res.send({ status: 200, result: sorter.getSortResult() });
          })
      );
  });
});

module.exports = router;
