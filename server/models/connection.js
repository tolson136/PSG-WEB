const Sequelize = require('sequelize');

const getConfig = require('../../config');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: getConfig('db.database'),
    username: getConfig('db.username'),
    password: getConfig('db.password'),
    host: getConfig('db.host'),
    port: getConfig('db.port'),
    // logging: ''
    define: {
        paranoid: true
    }
});

module.exports = sequelize;
