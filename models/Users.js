const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});
module.exports = mongoose.model("Users", UserSchema);
