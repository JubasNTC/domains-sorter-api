const express = require('express');
const multiparty = require('multiparty');
const es = require('event-stream');
const fs = require('fs');

const router = express.Router();
const Sorter = require('../models/Sorter');

router.get('/', (req, res) => {
  res.status(200);
  res.send({ result: 'server is working...' });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (error, fields, files) => {
    if (error) {
      res.status(400);
      res.send({ error: error });
    }

    const sorter = new Sorter();
    const fileStream = fs
      .createReadStream(files.file[0].path)
      .pipe(es.split())
      .pipe(
        es
          .mapSync(line => {
            fileStream.pause();
            sorter.addLine(line);
            fileStream.resume();
          })
          .on('error', err => {
            res.status(500);
            res.send({ error: err });
          })
          .on('close', () => {
            fileStream.destroy();
          })
          .on('end', () => {
            res.status(200);
            res.send({ result: sorter.getSortResult() });
          })
      );
  });
});

module.exports = router;
