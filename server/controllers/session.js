const router = require('express-promise-router')();

router.get('/', async function (req, res) {
    res.json({
        data: {
            user: req.user
        },
        metadata: {}
    });
});

module.exports = router;
