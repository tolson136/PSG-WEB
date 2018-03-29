const router = require('express-promise-router')();
const authentication = require('./middleware/authentication');
const errorHandler = require('./middleware/errorHandler');

router.use('/api/auth', require('./controllers/auth'));

router.use(authentication());

router.use('/api/session', require('./controllers/session'));

router.use(errorHandler);

module.exports = router;
