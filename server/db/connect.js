const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/instagram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
