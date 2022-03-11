const mongoose = require("mongoose");
const { MONGODB_USERS_URI } = process.env;
const Schema = mongoose.Schema;
const pastingDB = mongoose.createConnection(MONGODB_USERS_URI);

const userSchema = new Schema({
  user_name: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});

const UserReg = pastingDB.model('User', userSchema);

module.exports = UserReg;