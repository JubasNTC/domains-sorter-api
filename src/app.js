import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';
const app = express();

const PORT = process.env.PORT || 80;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port...`);
});
