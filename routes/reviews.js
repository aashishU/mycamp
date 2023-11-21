const express = require('express');
// to share the campground params(campground_id) from routes/campgrounds.js to here, we need to add {mergeParams: true}
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// Create Review and associate them with the Campground
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Delete a Review and its association with the Campground as well
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;