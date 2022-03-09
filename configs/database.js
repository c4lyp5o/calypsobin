const mongoose = require('mongoose');
const { MONGODB_USERS_URI } = process.env;

exports.connect = () => {
  mongoose.connect(MONGODB_USERS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Database!');
  })
    .catch(err => {
      console.error('Could not Connect to Database!', err);
      console.error(error);
      process.exit(1);
    });
}