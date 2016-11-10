const Renderable = require('./util/Renderable.js');
const CardGroup = require('./CardGroup.js');
const Player = require('./Player.js');
const TWEEN = require('tween.js');

class Board extends Renderable{

	constructor(options){
		super()

		_.extend(this, options);

		const dimensions = [1800, 1800];
		_.defaults(this, {
			dimensions: dimensions,
			players: [],
			centerGroup: {
				groupType: 'center',
				children: [],
			},
			playerSlots: [
				{
					startingPos: {
						x: 0,
						y: -dimensions[1]/2,
						z: 0,
						angle: 0,							
					},
					cameraPos: {
						x: 0,
						y: -2000,
						z: 500,
					}
				},
				{
					startingPos: {
						x: 0,
						y: -dimensions[1]/2,
						z: 0,
						angle: 90,							
					},
					cameraPos: {
						x: 2000,
						y: 0,
						z: 500,							
					}
				},
				{
					startingPos: {
						x: 0,
						y: -dimensions[1]/2,
						z: 0,
						angle: 180,							
					},
					cameraPos: {
						x: 0,
						y: 2000,
						z: 500,							
					}
				},
				{
					startingPos: {
						x: 0,
						y: -dimensions[1]/2,
						z: 0,
						angle: 270,							
					},
					cameraPos: {
						x: -2000,
						y: 0,
						z: 500,							
					}
				},
			],
		})

		this.players = _.map(this.players, (player, i)=>{
			_.extend(player, this.playerSlots[i]);
			return new Player(player);
		});
		this.centerGroup = new CardGroup(this.centerGroup);
		this.setChildren(this.players.concat(this.centerGroup));

		this.dramaticEntry();
	}

	setRelativePosition(){
		this.positionPlayers();
		this.positionCenterGroup();
	}

	positionPlayers(){
		_.each(this.players, (player)=>{
			player.moveTo(player.startingPos);
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

	setCameraOnPlayer(player){
		this.components.camera.up.set(0,0,1);
		new TWEEN.Tween(this.components.camera.position)
			.to(player.cameraPos, 1000)
			.easing(TWEEN.Easing.Cubic.InOut)
			.start();
	}

	dramaticEntry(){
		this.components.camera.position.z = 4000
		this.components.camera.position.y = -4000

		new TWEEN.Tween(this.components.camera.position)
			.to({
				x: 0,
				y: -2000,
				z: 500,
			}, 3000)
			.easing(TWEEN.Easing.Cubic.InOut)
			.start();

	}

}


module.exports = Board;

