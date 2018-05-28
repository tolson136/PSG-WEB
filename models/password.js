'use strict';

module.exports = function (sequelize, DataTypes) {
    const Password = sequelize.define('Password', {
        passwordSalt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.VIRTUAL,
            set (value) {
                // use in the update password workflow
                // not implemented yet
            }
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
