require('dotenv').config({ path: '.env' });
const express = require('express');

const app = express();

app.get('/', (req, res) => (
  res.status(200).json({
    message: 'It works',
  })
));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
