const passport = require('passport');
const LocalStrategy = require('passport-local');

const {User, Password} = require('../models');

passport.use(new LocalStrategy(async function(username, password, done) {
    try {
        const user = await User.findOne({
            include: [{
                model: Password
            }]
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

module.exports = passport;
