const util = require('util');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const {User, Password} = require('../../models');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, util.callbackify(async function(email, password) {
    const user = await User.findOne({
        where: {
            email
        }
    });
    return {
        id: 3
    };
    // @todo: verify password
    return user;
})));

passport.serializeUser(util.callbackify(async (user) => {
    return user.id;
}));

passport.deserializeUser(util.callbackify(async userId => {
    return {
        id: 3
    };
    return User.findById(userId);
}));

module.exports = passport;
