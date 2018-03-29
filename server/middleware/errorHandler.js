const _ = require('lodash');
const log = require('../lib/log').create();

module.exports = function (err, req, res, next) {
    try {
        log.error({err});

        if (!res.headersSent) {
            const isHttpError = !_.isNil(err.status);
            const isDevelopment = process.env.NODE_ENV === 'development';

            let result = {
                message: 'Internal Server Error'
            };

            if (isDevelopment) {
                result.message = err.message;
                result.stack = err.stack.split('\n');
            }

            if (isHttpError) {
                res.status(err.status);
                result.message = err.message;
            } else {
                res.status(500);
            }

            res.json({
                metadata: result
            });
        }
    } catch (err) {
        next(err);
    }
}
