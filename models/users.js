const mongoose = require("mongoose");
const { MONGODB_USERS_URI } = process.env;
const Schema = mongoose.Schema;
const pastingDB = mongoose.createConnection(MONGODB_USERS_URI);

const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const UserReg = pastingDB.model('User', userSchema);

module.exports = UserReg;