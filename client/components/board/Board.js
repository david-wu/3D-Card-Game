const Renderable = require('./util/Renderable.js');
const CardGroup = require('./CardGroup.js');
const Player = require('./Player.js');
const TWEEN = require('tween.js');

class Board extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			players: [],
		})

		this.slotPlayers(options.players);
	}

	slotPlayers(players){
		this.players = _.map(players, (player, i)=>{
			_.extend(player, this.getPlayerSlot(i));
			return new Player(player);
		});
		this.setChildren(this.players);
	}

	// @override
	setRelativePosition(){
		_.each(this.players, (player)=>{
			player.moveTo(player.startingPos);
		});
	}

	setCameraOnPlayer(player){
		return Promise.all([this.setCameraUpright(), this.setCameraAtPlayer(player)])
	}

	setCameraUpright(){
		return new Promise((resolve)=>{
			new TWEEN.Tween(this.renderer.components.camera.up)
				.to({x:0, y: 0, z: 1}, 1000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onComplete(resolve)
				.start();
		});
	}

	setCameraAtPlayer(player){
		return new Promise((resolve)=>{
			new TWEEN.Tween(this.renderer.components.camera.position)
				.to(player.cameraPos, 1000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onComplete(resolve)
				.start();
		});
	}

	dramaticEntry(){
		this.renderer.components.camera.position.z = 4000
		this.renderer.components.camera.position.y = -4000

		this.renderer.components.camera.up.set(0, 0, 1);
		return new Promise((resolve)=>{
			new TWEEN.Tween(this.renderer.components.camera.position)
				.to({
					x: 0,
					y: -2000,
					z: 500,
				}, 3000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onComplete(resolve)
				.start();
		});
	}

	getPlayerSlot(index){
		const dimensions = this.getDimensions();
		const playerSlots = [
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
		];
		return playerSlots[index];
	}

	getDimensions(){
		return [1800, 1800];
	}

}


module.exports = Board;

