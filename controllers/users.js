const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });         // creating new user with User Schema
        const registeredUser = await User.register(user, password);     // make Hash from Password and save it with username & email
        req.login(registeredUser, err => {          // after Registration automatically Login the new user
            if (err) return next(err);
            req.flash('success', 'Welcome to MyCamp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);  // error and error message is coming from Passport
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}