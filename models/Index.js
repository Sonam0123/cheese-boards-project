const {Board} = require('./Board');
const {Cheese} = require('./Cheese');
const {User} = require('./User');

User.hasMany(Board)
Board.belongsTo(User)


Cheese.belongsToMany(Board, {through: 'BoardCheese'})
Board.belongsToMany(Cheese, {through: 'BoardCheese'})


module.exports = {Board, Cheese, User}