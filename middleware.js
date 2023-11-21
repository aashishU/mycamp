const { campgroundSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

// Middleware to protect routes by checking if user is Logged In or not.
// will be used for Campground Routes and Reviews Routes.

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //next line store the url they are requesting!, after login, take them to stored url
        req.session.returnTo = req.originalUrl;
        req.flash('error', "Not Authorized!! You must Log In first!");
        return res.redirect('/login');
    }
    next();
}

// Stores link to the page the UnLoggedIn user is on, then after Login, we redirect to that page
// Hence in above Middleware we took that url from 'req.originalUrl' saved it in 'req.session.returnTo'(in session).
// But after Login the "passport.authenticate()" function clears the session and also the 'req.session.returnTo'.
// So, in this Middleware, we will take url from 'req.session.returnTo' and save it in "res.locals.returnTo".

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

// Express Middleware to Validate Campground data using Joi before sending it to Mongo DB
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

/**
 * Middleware to checks if the current user is the author of a campground and redirects them if they are
 * not authorized to edit it.
 **/
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Not Authorized to edit this Campground!!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

/**
 * Middleware to checks if the current user is the author of a review and don't let them delete a review if they are
 * not authorized to delete it.
 **/
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Not Authorized to edit this Campground!!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// Express Middleware to Validate Review data using Joi before sending it to Mongo DB
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}