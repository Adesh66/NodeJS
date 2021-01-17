const express = require("express");
const app = express();
const port = 9096;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//databse connection
require("./mongo");

//models
require("./model/user");

//Middleware
app.use(bodyParser.json());

const User = mongoose.model("User");

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500);
  }
});

app.get("/getuser/:userID", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userID });
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500);
  }
});
app.post("/create_user", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.send(userData);
  } catch (error) {
    res.send({ message: error });
  }
});
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
