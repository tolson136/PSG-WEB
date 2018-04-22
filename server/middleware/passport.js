const util = require('util');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const {User, Password} = require('../../models');

passport.use(new LocalStrategy(util.callbackify(async function(username, password) {
    return User.findOne({
        include: [{
            model: Password
        }]
    });
})));

module.exports = passport;
