let passport = require('passport');
let Localstrategy = require('passport-local').Strategy;
let User = require('../db/models/UserSchema');


let newStrategy = new Localstrategy({
    usernameField: 'Email',
    passwordField:'Password'
},
    function (email, password, cb) {
        User.findOne({ Email: email, Password: password }, function (err, user) {
            if (user) {
                cb(null, user);
            }
            else {
                cb(null, null);
            }
        });
    }
);

passport.use(newStrategy);

module.exports = passport;  