const express = require('express');
const router = express.Router();
const passport = require('passport');
const Campgroud = require('../Models/Campgroud');
const catchAsync = require('../Utils/catchAsync');
const { isLoggedIn } = require('../middleware-android');

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.setHeader("Access-Control-Expose-Headers", "*")
    res.send("Authenticated !");    
})

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const campgrounds = await Campgroud.find();
    res.send(JSON.stringify(campgrounds));
}));

router.get('/session', isLoggedIn, catchAsync(async (req, res) => {
    res.send('Authorized')
}));

module.exports = router