const _ = require('lodash');

const config = {
    sessionSecret: process.env.SESSION_SECRET,
    logger: {
        name: 'app'
    },
    port: process.env.PORT || 3000,
    db: {
        database: process.env.PG_DATABASE,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT
    }
};

module.exports = function getConfig (path) {
    const value = _.get(config, path);
    if (_.isUndefined(value)) {
        throw new Error(`Config value for ${path} not found.`);
    }
    return value;
};
