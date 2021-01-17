const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: String,
  age: Number,
});
module.exports = mongoose.model("User", user_schema);
