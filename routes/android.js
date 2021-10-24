const express = require('express');
const router = express.Router();
const passport = require('passport');
const Campgroud = require('../Models/Campgroud');
const catchAsync = require('../Utils/catchAsync');

router.post('/login', passport.authenticate('local', { failureFlash: true}), (req, res) => {
    res.send("Authenticated !");
})

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campgroud.find();
    res.send(JSON.stringify(campgrounds));
}));

module.exports = router