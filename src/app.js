const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 80;

app.use(bodyParser.json());

app.use('/api', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port...`);
});
