import express from 'express';
import multiparty from 'multiparty';
import es from 'event-stream';
import fs from 'fs';

import { Sorter } from '../models/Sorter';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.send({ result: 'server is working...' });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (error, fields, files) => {
    if (error) {
      res.status(400);
      res.send({ error: new Error(error) });
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
            res.send({ err: new Error(err) });
          })
          .on('end', () => {
            res.status(200);
            res.send({ result: sorter.getSortResult() });
          })
      );
  });
});

module.exports = router;
