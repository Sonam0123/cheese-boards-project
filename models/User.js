const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model
const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
})

module.exports = {User};