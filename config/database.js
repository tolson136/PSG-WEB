// this file is used by the sequelize cli
const getConfig = require('.');

module.exports = {
    development: getConfig('db')
};
