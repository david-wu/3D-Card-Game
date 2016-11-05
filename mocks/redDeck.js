const allCards = require('./allCards.js');
const CardGroup = require('../models/CardGroup.js');

// mono color decks should be local maxes
const redCards = _.filter(allCards.cards, function(card){
	return card.colors.red;
});

module.exports = new CardGroup({
	cards: redCards
});