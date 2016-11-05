const _ = require('lodash');

const Game = require('./models/Game.js')
const Player = require('./models/Player.js')

const redDeck = require('./mocks/redDeck.js');

const game = new Game({
	players: [
		new Player({
			name: 'bilbo',
			deck: redDeck,
		}),
		new Player({
			name: 'gandalf',
			deck: redDeck,
		})
	]
});

console.log(redDeck)


const CardGroup = require('./models/CardGroup.js')

module.exports = game;
