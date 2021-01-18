const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user_schema = new Schema({
  name: String,
  age: Number,
});
module.exports = mongoose.model("user", user_schema);
