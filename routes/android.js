const express = require("express");
const router = express.Router();
const passport = require("passport");
const Campgroud = require("../Models/Campgroud");
const catchAsync = require("../Utils/catchAsync");
const { isLoggedIn } = require("../middleware-android");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(JSON.stringify(req.user));
});

router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campgroud.find({}).sort({ _id: -1 });
    res.send(JSON.stringify(campgrounds));
  })
);

router.get(
  "/session",
  isLoggedIn,
  catchAsync(async (req, res) => {
    res.send("Authorized");
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged Out");
});

module.exports = router;
