const bodyParser = require('body-parser');
const router = require('express-promise-router')();
const authentication = require('./middleware/authentication');
const errorHandler = require('./middleware/errorHandler');

router.use(bodyParser.json());

router.use('/auth', require('./controllers/auth'));

router.use(authentication());

router.use('/session', require('./controllers/session'));

router.use(errorHandler);

module.exports = router;
