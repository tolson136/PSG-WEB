const app = require('express')();
const session = require('express-session');
const config = require('../config');
const passport = require('./middleware/passport');
const api = require('./api');

app.use(session({
    secret: config('sessionSecret'),
    name: 'sessionCookie',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

module.exports = app;
