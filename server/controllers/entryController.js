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
  console.log(req.body);
  const { date, mood, desc, note } = req.body;
  Entry.create({
    date,
    mood,
    desc,
    note,
  })
    .then((data) => {
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
