
const Card = require('./Card.js');

class CardGroup{

	constructor(options){
		_.extend(this, options);
		_.defaults(this, {
			cards: [],
		});
	}

	shuffle(){

	}

	static fromOptions(options){
		return new CardGroup({
			cards: _.map(options.cards, function(cardObj){
				return new Card(cardObj);
			}),
		});
	}

}

module.exports = CardGroup;