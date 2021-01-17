const mongoose = require("mongoose");
require("dotenv/config");
require("./index");

mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (req, res) => {
    console.log("database connected ");
  }
);
