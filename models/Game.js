const Board = require('./Board.js')


class Game{

	constructor(options){
		_.extend(this, options);
		_.defaults(this, {
			board: new Board({}),
			players: [],
		});
	}

	async run(){
		while(!this.gameOver()){
			for(let i=0; i<this.players.length; i++){
				await this.players[i].takeTurn(this);
			}
		}
	}

	gameOver(){
		if(this.players.length===1){
			return this.players[0]
		}
	}
}


module.exports = Game;