'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "passwordSalt" on table "Passwords"
 * changeColumn "passwordHash" on table "Passwords"
 * changeColumn "email" on table "Users"
 * changeColumn "name" on table "Users"
 * changeColumn "role" on table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "null-constraints",
    "created": "2018-05-27T23:57:55.797Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Passwords",
            "passwordSalt",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Passwords",
            "passwordHash",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "email",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        }).then(() => queryInterface.sequelize.query('ALTER TABLE "Users" ALTER COLUMN "role" SET NOT NULL'));
    },
    info: info
};
