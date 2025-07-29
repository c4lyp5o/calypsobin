const mongoose = require("mongoose");
const { MONGODB_USERS_URI } = process.env;
const Schema = mongoose.Schema;
const usersDB = mongoose.createConnection(MONGODB_USERS_URI);

const userSchema = new Schema({
  user_name: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});

const UserReg = usersDB.model('User', userSchema);

module.exports = UserReg;
