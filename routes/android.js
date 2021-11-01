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
const Review = require('../Models/Review')

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
    const campgrounds = await Campgroud.find({}).sort({ _id: -1 }).populate('author');
    res.send(JSON.stringify(campgrounds));
  })
);

router.post('/', upload.array('image'), validateCampground, catchAsync(async (req, res, next) => {
  const campground = new Campgroud(req.body.campground);
  campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.body.user._id;
  await campground.save();

  res.sendStatus(200);
}));

router.get("/:id/reviews", catchAsync(async (req, res) => {
  const reviews =  await Campgroud.findById(req.params.id).populate({
        path: 'reviews', populate: {
            path: 'author'
        }
    })
  res.send(JSON.stringify(reviews.reviews));
})
);

router.post('/:id/reviews', catchAsync(async (req, res) => {
  const campground = await Campgroud.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.body.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.send("Success");
}));

router.delete('/:id/reviews/:reviewId', catchAsync(async (req, res) => {
  await Campgroud.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } })
  await Review.findByIdAndDelete(req.params.reviewId);
  res.send('Success')
}))

module.exports = router;
