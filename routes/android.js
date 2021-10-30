const express = require("express");
const router = express.Router();
const passport = require("passport");
const Campgroud = require("../Models/Campgroud");
const catchAsync = require("../Utils/catchAsync");
const ExpressError = require('../Utils/ExpressError');
const { isLoggedIn } = require("../middleware-android");
const { campgroundSchema } = require('../Schemas');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400);
  } else {
      next();
  }
}

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(JSON.stringify(req.user));
});

router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campgroud.find({}).sort({ _id: -1 });
    res.send(JSON.stringify(campgrounds));
  })
);

router.get( "/session", isLoggedIn, catchAsync(async (req, res) => {
    res.send("Authorized");
  })
);

router.get("/logout", (req, res) => { 
  req.logout();
  res.send("Logged Out");
});

router.post('/', upload.array('image'), validateCampground, catchAsync(async (req, res, next) => {
  const campground = new Campgroud(req.body.campground);
  campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.body.user._id;
  await campground.save();

  res.sendStatus(200);
}));

module.exports = router;
