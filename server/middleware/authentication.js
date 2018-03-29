module.exports = function () {
    return async function authentication (req, res) {
        try {
            if (!req.isAuthenticated()) {
                throw new Unauthorized();
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
