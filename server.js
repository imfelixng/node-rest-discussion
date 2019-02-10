require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./api/routes/Auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}, (err) => {
  if (!err) {
    console.log('MongoDB connected');
  } else {
    console.log(err);
  }
});

app.use(auth);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
