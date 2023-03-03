const {sequelize} = require('./db');
const {Board, Cheese, User} = require('./models/Index');
const seedCheese = require('./seedData')
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

    test('Boards can be added to a User', async () => {
        const foundUser = await User.findOne({where: {name : 'Sonam Tsering'}})
        const foundBoard = await Board.findOne({where: {rating: 4.5}})
        await foundUser.addBoard(foundBoard)
        const boards = await foundUser.getBoards()
        expect(boards.length).toEqual(1)
    })

    test('Board can have many Cheese', async () => {
        const cheeses = await Cheese.bulkCreate(seedCheese)
        const foundBoard = await Board.findOne({where: {rating: 4.5}})
        await foundBoard.addCheese(cheeses)
        const boardCheeses = await foundBoard.getCheeses()
        expect(boardCheeses.length).toEqual(3)
    })
    
    test('cheese can be on many boards', async () => {
        const foundCheese = await Cheese.findOne({where: {type: 'Mozzerella'}})
        const foundBoard = await Board.findOne({where: {rating: 4.5}})
        await foundCheese.addBoard(foundBoard)
        const cheeseBoards = await foundCheese.getBoards()
        expect(cheeseBoards.length).toEqual(1)
    })


    test('A user can be loaded with its boards', async () => {
        const foundUser = await User.findOne({where: {name : 'Sonam Tsering'}, include: Board})
        expect(foundUser.boards.length).toEqual(1)
    })

    test('cheese can be loaded with its boards', async () => {
        const foundCheese = await Cheese.findOne({where: {type: 'Mozzerella'}, include: Board})
        expect(foundCheese.boards.length).toEqual(1)
    })

    test('board can be loaded with its cheeses', async () => {

        const foundBoard = await Board.findOne({where: {rating: 4.5}, include: Cheese})
        console.log(foundBoard.cheeses)
        expect(foundBoard.cheeses.length).toEqual(4)
    })


})