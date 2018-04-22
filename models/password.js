'use strict';

module.exports = function (sequelize, DataTypes) {
    const Password = sequelize.define('Password', {
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

    return Password;
};
