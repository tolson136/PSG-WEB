const HttpError = require('http-errors');

module.exports = function () {
    return async function authentication (req, res) {
        if (!req.user) {
            throw new HttpError.Unauthorized();
        }
        return 'next';
    };
};
