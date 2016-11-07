const TWEEN = require('tween.js');
const THREE = require('three-js')();

const Renderable = require('./Renderable.js');

class Card extends Renderable{

	constructor(options){
		super();
		_.extend(this, options);
		_.defaults(this, {
			width: 65,
			height: 100,
		})
	}

	flip(){
		this.faceUp = !this.faceUp;
	}

	clickHandler(){
		console.log(this);
	}

	hoverHandler(){
		console.log(this);
	}

	setPosition(){

		if(!this.mesh){
			const element = document.createElement( 'div' );

			_.extend(element.style, {
				'width': this.width+'px',
				'height': this.height+'px',
				'border': '2px solid black',
				'border-radius': '4px',
				'background-color': this.color,
			})

			element.addEventListener('click', this.clickHandler.bind(this));
			element.addEventListener('hover', this.hoverHandler.bind(this));

			var number = document.createElement( 'div' );
			number.textContent = this.name;
			element.appendChild(number);
			this.mesh = new THREE.CSS3DObject(element)
			this.components.scene.add(this.mesh);
		}

		const pos = this.absPos

		const duration = 500

		new TWEEN.Tween(this.mesh.position)
			.to({
				x: pos.x,
				y: pos.y,
				z: pos.z,
			}, duration*Math.random() + duration)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();

		new TWEEN.Tween(this.mesh.rotation)
			.to({
				y: 0,//this.faceUp ? (Math.PI) : 0,
				z: pos.angle*Math.PI/180,
			}, duration)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();

	}
}


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

	positionAsField(){
		_.each(this.children, function(card, i){
			card.moveTo({
				x: (i*75)-187.5,
				y: 55,
				z: i
			});
			card.faceUp = false;
		});
		return this;
	}

	positionAsHand(){
		_.each(this.children, function(card, i){
			card.moveTo({
				x: (i*75)-187.5,
				y: -55,
				z: i
			});
			card.faceUp = true;
		});
		return this;
	}

	positionAsDeck(){
		_.each(this.children, function(card, i){
			card.moveTo({
				x: -262.5,
				y: 0,
				z: i
			});
			card.faceUp = false;
		});
		return this;
	}

	shuffle(){
		this.children = _.shuffle(this.children);
	}

}

class Player extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			field: [],
			hand: [],
			deck: [],
		})

		_.defaults(this.field, {
			0: {},
			1: {},
			2: {},
			3: {},
			4: {},
		});

		this.field = new CardGroup({
			name: 'field',
			children: this.field
		})
			.positionAsField();

		this.hand = new CardGroup({
			name: 'hand',
			children: this.hand,
		})
			.positionAsHand();

		this.deck = new CardGroup({
			name: 'deck',
			children: this.deck,
		})
			.positionAsDeck();

		this.setChildren([this.hand, this.deck, this.field]);
	}

}

class Board extends Renderable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			centerGroup: [],
			players: [],
			dimensions: [0, 0]
		})

		this.players = _.map(this.players, function(player){
			return new Player(player);
		});

		this.centerGroup = new CardGroup(this.centerGroup)

		this.setChildren(this.players.concat(this.centerGroup));
	}

	positionPlayers(){
		const slots = [
			{
				x: 0,
				y: -this.dimensions[1]/2,
				angle: 0,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				angle: 90,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				angle: 180,
			},
			{
				x: 0,
				y: -this.dimensions[1]/2,
				angle: 270,
			},
		]
		_.each(this.players, (player, i)=>{
			player.moveTo(slots[i]);
		});
	}

	positionCenterGroup(){
		this.centerGroup.moveTo({
			x: 0,
			y: 0,
			angle: 0,
		});
	}

}


module.exports = Board;

module.exports = new Board({
	dimensions: [1000, 1000],
	centerGroup: {
		name: 'centerGroup',
		children: [
			{
				name: 'fireball'
			},
		]
	},
	players: [
		{
			name: 'bill1',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'red',
				},
				{
					name: 'bloop2',
					color: 'red',
				},
				{
					name: 'bloop3',
					color: 'red',
				},
				{
					name: 'bloop4',
					color: 'red',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill2',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'green',
				},
				{
					name: 'bloop3',
					color: 'green',
				},
				{
					name: 'bloop4',
					color: 'green',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill3',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'blue',
				},
				{
					name: 'bloop3',
					color: 'yellow',
				},
				{
					name: 'bloop4',
					color: 'orange',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill4',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'blue',
				},
				{
					name: 'bloop3',
					color: 'yellow',
				},
				{
					name: 'bloop4',
					color: 'orange',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
	]
});

