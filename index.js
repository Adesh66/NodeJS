const express = require("express");
const app = express();
const port = 9096;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//databse connection
require("./mongo");

//Middleware
app.use(bodyParser.json());

const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handle
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
