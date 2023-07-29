const { DataTypes } = require('sequelize');
const { sequelizeConn } = require('./conn');

const Auto = sequelizeConn.define('auto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true 
});

module.exports = Auto;