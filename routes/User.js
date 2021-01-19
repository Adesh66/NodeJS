const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");

const User = require("../model/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, { __v: 0 });
    res.send(users);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.send(userData);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});

router.get("/:userID", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userID });
    if (!user) {
      throw createError(404, "user not exist");
    }
    res.send(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid product Id"));
      return;
    }
    next(error);
  }
});

router.put("/:userID", async (req, res, next) => {
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
    if (!userdata) {
      throw createError(404, "user does not exist");
    }
    res.send(userdata);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid user Id"));
      return;
    }
    next(error);
  }
});

router.delete("/:userID", async (req, res, next) => {
  try {
    const userdata = await User.findByIdAndRemove({
      _id: req.params.userID,
    });
    if (!userdata) {
      throw createError(404, "user does not exist");
    }
    res.send(userdata);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid user Id"));
      return;
    }
    next(error);
  }
});

module.exports = router;
