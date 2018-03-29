const {DataTypes} = require('sequelize');
const connection = require('./connection');
const User = require('./user');

const Password = connection.define('password', {
    passwordSalt: {
        type: DataTypes.STRING
    },
    passwordHash: {
        type: DataTypes.STRING
    }
}, {
    defaultScope: {
        attributes: {
            exclude: ['passwordSalt', 'passwordHash']
        }
    }
});

Password.belongsTo(User);

module.exports = Password;
