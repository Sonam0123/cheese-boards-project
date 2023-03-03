const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model
const Board = sequelize.define('board', {
    type: DataTypes.STRING,
    Description: DataTypes.STRING,
    rating: DataTypes.INTEGER,
})

module.exports = {Board};