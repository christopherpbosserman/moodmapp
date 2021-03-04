const express = require('express');
const path = require('path');

const entryController = require(path.resolve(
  __dirname,
  '..',
  'controllers',
  'entryController'
));

const router = express.Router();

router.get('/', entryController.getEntry, (req, res) => {
  return res.status(200).json(res.locals.entries);
});

router.get('/details', entryController.getDetails, (req, res) => {
  return res.status(200).json(res.locals.details);
});

router.post('/', entryController.postEntry, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
