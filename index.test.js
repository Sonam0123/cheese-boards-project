const {sequelize} = require('./db');
const {Board, Cheese, User} = require('./models/Index');

describe('All models', () => {

    //Start off with a new table every time we run the file
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a User', async () => {
        let user = await User.create({
            name: 'Sonam Tsering',
            email: "Sonam.Tsering@baboon.com"
        })
        expect(user.name).toEqual("Sonam Tsering")
    })

    test('can create Board', async () => {
        let board = await Board.create({
            type: 'Cheese Board',
            Description: 'A cheese board with a variety of cheeses',
            rating: 4.5
        })
        expect(board.rating).toEqual(4.5)
    })
    
    test('can create Cheese', async () => {
        let cheese = await Cheese.create({
            type: 'Mozzerella',
            Description: 'Mot-ze-rella',
        })
        expect(cheese.type).toEqual('Mozzerella')
    })



})