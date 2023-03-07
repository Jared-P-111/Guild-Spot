// const dotenv = require('dotenv');
// dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(`${MONGO_URI}`, {
      retryWrites: true,
    })
    .then(() => console.log('Established a connection to the database'))
    .catch((err) => console.log('Something went wrong with connection to the database', err));
};

module.exports = connectDb;
