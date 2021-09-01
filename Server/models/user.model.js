const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define MongoDB schema 
var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    birthdate: {
        type: Date,
        required: 'Birthdate can\'t be empty',
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password must be atleast 8 character long']
    },
    saltSecret: String
});

// Custom validation for email with regex.
userSchema.path('email').validate((val) => {

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Custom validation for password with regex.
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
userSchema.path('password').validate((val) => {
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(val);
}, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');

// Events before save salt password
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Compare password
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

// Generate JWT authentication.
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
};

mongoose.model('User', userSchema);