'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(['admin']),
            allowNull: false
        }
    });

    User.associate = function ({Password}) {
        this.hasOne(Password);
    };

    return User;
};
