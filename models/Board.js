
class Board{

	constructor(options){
		_.extend(this, options);
		_.defaults(this, {
			players: [],
			permanents: [],
		});
	}

	addPermanent(permanent){
		this.permanents.push(permanent);
	}

	runEffects(){

	}

	alterCard(card){

	}

}

module.exports = Board;