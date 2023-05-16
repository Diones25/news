const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');

const Users = db.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
}
);

module.exports = Users;