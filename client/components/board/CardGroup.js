const Renderable = require('./util/Renderable.js');
const Card = require('./Card.js');

class CardGroup extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
		})

		this.setChildren(_.map(this.children, function(child){
			return new Card(child);
		}))

	}

	setRelativePosition(){
		if(groupTypeIndex[this.groupType]){
			groupTypeIndex[this.groupType].positionChildren(this.children);
		}
	}


	shuffle(){
		this.children = _.shuffle(this.children);
	}

}

const groupTypeIndex = {

	center: {
		positionChildren: function(cards){
			_.each(cards, function(card, i){
				card.moveTo({
					x: 0,
					y: 0,
					z: 0,
				});
				card.faceUp = true;
			});
		}
	},

	field:{
		positionChildren: function(cards){
			_.each(cards, function(card, i){
				card.moveTo({
					x: (i*75)-187.5,
					y: 55,
					z: i,
				});
				card.faceUp = true;
			});
		},
	},

	hand:{
		positionChildren: function(cards){
			_.each(cards, function(card, i){
				card.moveTo({
					x: (i*75)-187.5,
					y: -55,
					z: i,
				});
				card.faceUp = true;
			});
		},
	},

	deck:{
		positionChildren: function(cards){
			_.each(cards, function(card, i){
				card.moveTo({
					x: -262.5,
					y: 0,
					z: i,
				});
				card.faceUp = false;
			});
		},
	},


}

module.exports = CardGroup