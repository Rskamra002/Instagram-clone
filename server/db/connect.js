const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connect = () => {
  return mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
