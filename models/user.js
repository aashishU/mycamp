const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Passport-Local Mongoose will add a username, Hash and Salt field to store the username, the Hashed password and the Salt value. It also provide some Methods for the Schema.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);