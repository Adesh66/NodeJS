const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("user", user_schema);
