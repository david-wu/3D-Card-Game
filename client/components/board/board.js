const cardGroupMarginTop = 15;
const THREE = require('three-js')();

class TreeNode{
	constructor(options){
		_.extend(this, options)
		_.defaults(this, {
			children: []
		})
		this.setChildren(this.children);
	}

	setChildren(children=[]){
		this.children = children;
		_.each(this.children, (child)=>{
			child.parent = this;
		});
	}

	getLeaves(){
		const leaves = [];
		this.depthFirstTraverse(function(){
			if(!node.children){
				leaves.push(node);
			}
		})
		return leaves;
	}

	iterateUpReversed(iteratee){
		const nodes = [];
		this.iterateUp(function(node){
			nodes.push(node);
		});
		for(var i=nodes.length-1; i>=0; i--){
			iteratee(nodes[i], nodes[i+1]);
		}
	}

	iterateUp(iteratee){
		iteratee(this);
		let pointer = this;
		while(pointer.parent){
			pointer = pointer.parent
			iteratee(pointer);
		}
	}

	depthFirstTraverse(iteratee){
		iteratee(this);
		_.each(this.children, function(child){
			child.depthFirstTraverse(iteratee);
		})
	}

	breadthFirstTraverse(iteratee){
		iteratee(this);

		const stack = this.children.slice();
		const otherStack = [];
		while(stack.length){
			for(var i=0; i<stack.length; i++){
				iteratee(stack[i]);
				[].push.apply(otherStack, stack[i].children);
			}
			stack.length = 0;
			[].push.apply(stack, otherStack);
			otherStack.length=0;
		}
	}

}



function getRotationMatrix(angle){
	const theta = -angle*Math.PI/180;
	const sinTheta = Math.sin(theta);
	const cosTheta = Math.cos(theta);
	return [
		[cosTheta, -sinTheta],
		[sinTheta, cosTheta]
	];
}

function rotatePos(pos, rotationMatrix, target={}){
	const x = pos.x*rotationMatrix[0][0] + pos.y*rotationMatrix[0][1];
	const y = pos.x*rotationMatrix[1][0] + pos.y*rotationMatrix[1][1];
	target.x = x;
	target.y = y;
	return target;
}

function sumPos(pos1, pos2){
	pos1.x += pos2.x || 0;
	pos1.y += pos2.y || 0;
	pos1.z += pos2.z || 0;
}

class Placeable extends TreeNode{

	constructor(options){
		super();
		_.extend(this, options)
		_.defaults(this, {
			pos: {
				x: 0,
				y: 0,
				z: 0,
				angle: 0,
			},
		})
		this.setChildren(this.children);
	}

	moveTo(location){
		_.extend(this.pos, location);
	}

	layoutDeep(){

		this.depthFirstTraverse(function(node){
			node.absPos = {
				x: 0,
				y: 0,
				z: 0,
				angle: node.parent ? node.parent.absPos.angle+node.pos.angle : node.pos.angle,
				rotationMatrix: 0
			};
		});

		this.depthFirstTraverse(function(node){
			node.absPos.rotationMatrix = node.absPos.rotationMatrix || getRotationMatrix(node.absPos.angle);
			rotatePos(node.pos, node.absPos.rotationMatrix, node.absPos);
			if(node.parent){
				sumPos(node.absPos, node.parent.absPos);
			}
		})
	}

	renderDeep(context){
		this.layoutDeep();
		this.depthFirstTraverse(function(node){
			node.render(context);
		})
	}

	render(context){

		if(!this.el){
			this.el = document.createElement('div');
			_.extend(this.el.style, {
				transition: '0.2s',
				position: 'absolute'
			})
			context.appendChild(this.el);
		}

		const pos = this.absPos
		_.extend(this.el.style, {
			// 'transform': 'translate3d('+pos.x+'px, '+pos.y+'px,'+pos.z+'px)',
			// angle rotates each individual element not around the right point
			'transform': 'translate3d('+pos.x+'px, '+ (-pos.y) +'px,'+pos.z+'px)rotate('+pos.angle+'deg)',
			'z-index': pos.z
		})

		return this.el;
	}

	// getRotationMatrix(angle){
	// 	const theta = -angle*Math.PI/180;
	// 	const sinTheta = Math.sin(theta);
	// 	const cosTheta = Math.cos(theta);
	// 	return [
	// 		[cosTheta, -sinTheta],
	// 		[sinTheta, cosTheta]
	// 	];
	// }

	// rotatedPos(rotationMatrix){
	// 	return {
	// 		x: this.pos.x*rotationMatrix[0][0] + this.pos.y*rotationMatrix[0][1],
	// 		y: this.pos.x*rotationMatrix[1][0] + this.pos.y*rotationMatrix[1][1],
	// 	};
	// }

	getAbsPos(){

		const absPos = {
			x: 0,
			y: 0,
			z: 0,
			angle: 0,
		};

		this.iterateUpReversed(function(obj, prevObj){

			let adjustedPos;
			if(prevObj){
				absPos.angle += obj.pos.angle;

				const theta = absPos.angle*Math.PI/180;
				const sinTheta = Math.sin(theta);
				const cosTheta = Math.cos(theta);
				const rotationMatrix = [
					[cosTheta, -sinTheta],
					[sinTheta, cosTheta]
				];

				adjustedPos = obj.rotatedPos(rotationMatrix);

			}else{
				adjustedPos = obj.pos
			}

			absPos.x += adjustedPos.x;
			absPos.y += adjustedPos.y;
			absPos.z += adjustedPos.z || 0;

		})

		// this.iterateUp(function(obj){
		// 	absPos.x += obj.pos.x;
		// 	absPos.y += obj.pos.y;
		// 	absPos.z += obj.pos.z;
		// 	absPos.angle += obj.pos.angle;
		// });
		return absPos;
	}
}


class Card extends Placeable{

	constructor(options){
		super();
		_.extend(this, options);
	}

	flip(){
		this.faceUp = !this.faceUp;
	}

	render(context){
		const placedEl = super.render(context)
		if(!this.innerEl){
			this.innerEl = document.createElement('div');
			placedEl.appendChild(this.innerEl);
			// this.innerEl.className = 'card';
			_.extend(this.innerEl.style, {
				'width': '65px',
				'height': '100px',
				'border': '2px solid black',
				'border-radius': '4px',
			})
		}

		_.extend(this.innerEl.style, {
			'background-color': this.color,
		})
	}
}


class CardGroup extends Placeable{

	constructor(options){
		super()
		_.extend(this, options);
		_.defaults(this, {
			// cardMargin: 15
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

class Player extends Placeable{

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

class Board extends Placeable{

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
					name: 'blur',
					color: 'orange',
				},
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
					name: 'blur',
					color: 'orange',
				},
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
					name: 'blur',
					color: 'orange',
				},
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
					name: 'blur',
					color: 'orange',
				},
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
	]
});


// module.exports = Board;