const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
const User = require('./User.js');

const News = db.define('News', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    timestamps: true
}
);

News.belongsTo(User);
User.hasMany(News);

module.exports = News;