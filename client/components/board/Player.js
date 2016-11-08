const Renderable = require('./util/Renderable.js');
const CardGroup = require('./CardGroup.js');

class Player extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			field: [
				{},
				{},
				{},
				{},
				{},
			],
			hand: [],
			deck: [],
		})

		this.field = new CardGroup({
			groupType: 'field',
			children: this.field
		})

		this.hand = new CardGroup({
			groupType: 'hand',
			children: this.hand,
		})

		this.deck = new CardGroup({
			groupType: 'deck',
			children: this.deck,
		})

		this.setChildren([this.hand, this.deck, this.field]);
	}

}

module.exports = Player;