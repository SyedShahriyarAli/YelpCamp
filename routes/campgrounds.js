const express = require('express');
const router = express.Router();
const catchAsync = require('../Utils/catchAsync');
const ExpressError = require('../Utils/ExpressError');
const Campgroud = require('../Models/Campgroud');
const { campgroundSchema } = require('../Schemas');
const { isLoggedIn } = require('../middleware');
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

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campgroud.find();
    res.render('campground/index.ejs', { campgrounds })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campground/new');
});

router.post('/', upload.array('image'), validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campgroud(req.body.campground);
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    
    req.flash('success', 'Campground Successfully Saved !')
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campgroud.findById(req.params.id).populate({
        path: 'reviews', populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that Campground')
        return res.redirect('/campgrounds');
    }
    res.render('campground/show.ejs', { campground });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campgroud.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that Campground')
        return res.redirect('/campgrounds');
    }
    res.render('campground/edit.ejs', { campground });
}));

router.put('/:id', upload.array('image'), catchAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campgroud.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.image.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        // for (let filename of req.body.deleteImages) {
        //     await storage.uploader.destroy(filename);
        // }
        await campground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Campground Successfully Updated !')
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campgroud.findByIdAndDelete(id);
    req.flash('success', 'Campground Successfully Deleted !')
    res.redirect('/campgrounds')
}));

module.exports = router