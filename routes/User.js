const express = require("express");
const { nextTick } = require("process");
const router = express.Router();

const User = require("../model/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, { __v: 0 });
    res.send(users);
  } catch (error) {
    res.status(500);
  }
});
router.post("/", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.send(userData);
  } catch (error) {
    res.send({ message: error });
  }
});

router.get("/:userID", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userID });
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500);
  }
});

router.put("/:userID", async (req, res) => {
  try {
    const userdata = await User.findByIdAndUpdate(
      {
        _id: req.params.userID,
      },
      req.body,
      {
        new: true,
      }
    );
    res.send(userdata);
  } catch (error) {
    res.status(500);
  }
  console.log(req.body);
});

router.delete("/:userID", async (req, res) => {
  try {
    const userdata = await User.findByIdAndRemove({
      _id: req.params.userID,
    });
    res.send(userdata);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
