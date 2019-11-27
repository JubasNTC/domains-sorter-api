const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const Sorter = require('../models/Sorter');

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();
  // eslint-disable-next-line handle-callback-err
  form.parse(req, (error, fields, files) => {
    const sorter = new Sorter();
    const instream = fs.createReadStream(files.file[0].path);
    const outstream = new Stream();
    const rl = readline.createInterface(instream, outstream);

    rl.on('line', line => {
      sorter.addLine(line);
    });

    rl.on('close', () => {
      res.send({ status: 200, result: sorter.getSortResult() });
    });
  });
});

module.exports = router;
