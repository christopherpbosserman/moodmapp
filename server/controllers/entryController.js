const path = require('path');

const Entry = require(path.resolve(__dirname, '..', 'models', 'entryModel'));

const entryController = {};

entryController.getEntry = (req, res, next) => {
  console.log('getEntry fired');
  Entry.find()
    .sort({ date: 1 })
    .then((data) => {
      res.locals.entries = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getEntry middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

entryController.postEntry = (req, res, next) => {
  console.log('postEntry fired');
  const { date, mood, desc } = req.body;
  Entry.create({
    date,
    mood,
    desc,
  })
    .then((data) => {
      console.log(data);
      res.locals.data = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in postEntry middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

entryController.getDetails = (req, res, next) => {
  console.log('getDetails fired');
  const date = req.query.id;
  console.log('id: ', date);
  Entry.find({
    date,
  })
    .then((data) => {
      res.locals.details = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getEntries middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = entryController;
