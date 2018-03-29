const {DataTypes} = require('sequelize');
const connection = require('./connection');

const User = connection.define('user', {
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM(['admin'])
    }
});

module.exports = User;
