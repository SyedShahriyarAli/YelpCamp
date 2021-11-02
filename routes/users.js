const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const catchAsync = require('../Utils/catchAsync');
const passport = require('passport');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', upload.single('image'), catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        user.image = { url: req.file.path, filename: req.file.filename };
        const registereduser = await User.register(user, password);
        req.login(registereduser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('seccess', 'Good Bye');
    res.redirect('/login')
})

module.exports = router;