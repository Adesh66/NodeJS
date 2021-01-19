const mongoose = require("mongoose");
require("./index");
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));
