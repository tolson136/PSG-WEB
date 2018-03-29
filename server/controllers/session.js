const router = require('express-promise-router')();

router.get('/', async function (req, res) {
    res.json({
        user: req.currentUser
    });
});

module.exports = router;
