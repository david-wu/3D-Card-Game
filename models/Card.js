
class Card{

	constructor(options){
		_.extend(this, options)
		_.defaults(this, {
			name: 'name'
		})
	}

	canPlay(board, mode){
		return true;
	}

	play(board, mode){

	}

}

module.exports = Card;