const mongoose = require('mongoose');
const { MONGODB_PASTE_URI } = process.env;
const { MONGODB_USERS_URI } = process.env;

const pasteDB = mongoose.createConnection(MONGODB_PASTE_URI);
const userDB = mongoose.createConnection(MONGODB_USERS_URI);

// const Schema = new mongoose.Schema({});

// const pasteModel = pasteDB.model('paste', Schema);
// const userModel = userDB.model('user', Schema);

exports.connectUser = () => {
  mongoose.createConnection(MONGODB_USERS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Connected to Users Database!');
//   .then(() => {
//     console.log('Connected to Users Database!');
//   })
//     .catch(err => {
//       console.error('Could not Connect to Database!', err);
//       console.error(error);
//       process.exit(1);
//     });
}

exports.connectPaste = () => {
    mongoose.createConnection(MONGODB_PASTE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to Paste Database!');
    // .then(() => {
    //   console.log('Connected to Users Database!');
    // })
    //   .catch(err => {
    //     console.error('Could not Connect to Database!', err);
    //     console.error(error);
    //     process.exit(1);
    //   });
  }

// // init DB
// mongoose
//   .connect(MONGODB_PASTE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('Connected to Pasting Database!');
//   })
//   .catch(err => {
//     console.error('Could not Connect to Database!', err);
// });