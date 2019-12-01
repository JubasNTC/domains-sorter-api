import { Router } from 'express';
import multiparty from 'multiparty';
import es from 'event-stream';
import fs from 'fs';
import _ from 'lodash';
import { Sorter } from '../models/Sorter';
import { MAX_SIZE_FILE, TEXT_PLAN } from './constants';

const router = Router();

router.get('/', (req, res) => {
  res.status(200);
  res.send({ result: 'server is working...' });
});

router.post('/sort-domains', (req, res) => {
  const form = new multiparty.Form();

  form.on('error', error => {
    return res.status(400).json({
      message: error,
    });
  });

  // eslint-disable-next-line consistent-return
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    if (_.isEmpty(files)) {
      return res.status(400).json({
        message: 'error',
      });
    }

    if (files.file[0].size > MAX_SIZE_FILE) {
      return res.status(400).json({
        message: 'Big size file',
      });
    }

    if (files.file[0].headers['content-type'] !== TEXT_PLAN) {
      return res.status(400).json({
        message: 'No support content type',
      });
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
            return res.status(500).json({
              message: err,
            });
          })
          .on('end', () => {
            return res.status(200).json({
              result: sorter.getSortResult(),
            });
          })
      );
  });
});

export { router };
