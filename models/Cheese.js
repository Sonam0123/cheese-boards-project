const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model
const Cheese = sequelize.define('cheese', {
    type: DataTypes.STRING,
    Description: DataTypes.STRING,
})

module.exports = {Cheese};