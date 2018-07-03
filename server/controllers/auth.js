const HttpError = require('http-errors');
const router = require('express-promise-router')();
const passport = require('../middleware/passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    try {
      if (err) {
        next(err);
      } else if (!user) {
        next(new HttpError.Unauthorized());
      } else {
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          return res.json({
            data: user,
            metadata: {}
          });
        });
      }
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

router.post('/logout', function (req, res) {
  // @todo: clear session
  res.json({
    data: {},
    metadata: {}
  });
});

module.exports = router;
