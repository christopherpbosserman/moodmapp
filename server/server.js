const path = require('path');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;
const MONGO_URI =
  'mongodb+srv://christopherpbosserman:PfOjsMfSszUceFLU@cluster0.p5ccs.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'moods',
  })
  .then(() => console.log('Connected to Mongo Db.'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '..', 'build')));

const apiRouter = require(path.resolve(__dirname, 'routes', 'api'));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
