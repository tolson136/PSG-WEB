'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
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

    User.associate = function ({Password}) {
        this.hasOne(Password);
    };

    return User;
};
