const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../Utils/catchAsync');
const Review = require('../Models/Review')
const Campgroud = require('../Models/Campgroud');
const ExpressError = require('../Utils/ExpressError');
const { isLoggedIn } = require('../middleware');

router.post('/', isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campgroud.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'New Review Created Successfully !')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    await Campgroud.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Review Successfully Deleted !')
    res.redirect(`/campgrounds/${req.params.id}`);
}))

module.exports = router;
