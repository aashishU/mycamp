const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


// Register new user
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

// Login existing user
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);
// passport.authenticate is a Passport Middleware which does Authentication(ie. taking typed password, converting into Hash then comparing it with Hash present in our Database) and if Failed, show failure message and redirect.

// Logout Route
router.get('/logout', users.logout);

module.exports = router;