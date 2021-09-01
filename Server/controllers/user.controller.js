const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

// Contorollers route:

// Register User
module.exports.register = (req, res, next) => {
    var user = new User();

    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.birthdate = req.body.birthdate;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });

    user.up
}

// Authenticate User when login and got JWT token
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info)
    })(req, res);
}

// Get User profile for wellcome page
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
        }
    );
}

// Update User Email & Fullname
module.exports.userUpdate = (req, res, next) => {
    var query = { _id: req._id };
    var update = {
        'fullName': req.body.fullName,
        'email': req.body.email
    };
    debugger;
    User.findOneAndUpdate(query, update, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully updated.');
    });

}