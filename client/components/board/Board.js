const Renderable = require('./util/Renderable.js');
const CardGroup = require('./CardGroup.js');
const Player = require('./Player.js');

class Board extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			dimensions: [1800, 1800],
			players: [],
			centerGroup: {
				groupType: 'center',
				children: [],
			},
		})

		this.players = _.map(this.players, function(player){
			return new Player(player);
		});
		this.centerGroup = new CardGroup(this.centerGroup);
		this.setChildren(this.players.concat(this.centerGroup));
	}

	setRelativePosition(){
		this.positionPlayers();
		this.positionCenterGroup();
	}

	positionPlayers(){
		const playerSlots = [
			{
				x: 0,
				y: -this.dimensions[1]/2,
				z: 0,
				angle: 0,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				z: 0,
				angle: 90,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				z: 0,
				angle: 180,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				z: 0,
				angle: 270,
			},
		]
		_.each(this.players, (player, i)=>{
			player.moveTo(playerSlots[i]);
		});
	}

	positionCenterGroup(){
		this.centerGroup.moveTo({
			x: 0,
			y: 0,
			z: 200,
			angle: 0,
		});
	}

}


module.exports = Board;

