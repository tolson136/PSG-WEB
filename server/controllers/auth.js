const router = require('express-promise-router')();
const passport = require('../middleware/passport');

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

router.post('/logout', function () {
});

module.exports = router;
