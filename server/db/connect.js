const mongoose = require('mongoose');

const DB = process.env.DATABASE;
console.log(DB);

const connect = () => {
  return mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
