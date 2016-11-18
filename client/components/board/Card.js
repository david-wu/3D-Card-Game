const TWEEN = require('tween.js');
const THREE = require('three-js')();
const Renderable = require('./util/Renderable.js');

class Card extends Renderable{

	constructor(options){
		super();
		_.extend(this, options);
		_.defaults(this, {
			width: 65,
			height: 100,
			tweenStyle: 'dramatic',
		})
	}

	flip(isFaceUp){
		this.faceUp = _.isUndefined(isFaceUp) ? !this.faceUp : isFaceUp;
	}

	clickHandler(){
		this.getRoot('Board')
			.emit('cardClick', this);
	}

	hoverHandler(){
	}

	swapPosition(target){
		const parent = this.parent;
		const targetParent = target.parent;

		const index = parent.getChildIndex(this);
		const targetIndex = targetParent.getChildIndex(target);

		if(parent===targetParent){
			parent.children[targetIndex] = this;
			parent.children[index] = target;
		}else{
			parent.removeChild(this);
			targetParent.removeChild(target);
			parent.addChild(target, index);
			targetParent.addChild(this, targetIndex);
		}
	}

	makeMesh(){
		const element = document.createElement('div');

		_.extend(element.style, {
			'width': this.width+'px',
			'height': this.height+'px',
			'border': '2px solid black',
			'border-radius': '4px',
			'background-color': this.color,
			'cursor': 'pointer',
		})

		element.addEventListener('click', this.clickHandler.bind(this));
		element.addEventListener('mouseover', this.hoverHandler.bind(this));

		var number = document.createElement( 'div' );
		number.textContent = this.name;
		element.appendChild(number);
		const mesh = new THREE.CSS3DObject(element)

		const board = this.getRoot('Board');
		board.emit('newMesh', mesh);

		return mesh;
	}

	getFlipAxis(){
		if(45 < this.absPos.angle && this.absPos.angle < 135){
			return 'x'
		}
		if(225 < this.absPos.angle && this.absPos.angle < 315){
			return 'x'
		}
		return 'y'
	}

	tweenToAbsPos(){
		// TODO: For shuffling, should still animate
		if(_.isMatch(this.absPos, this.mesh.position)){
			return;
		}

		const tweenNames = {
			dramatic: this.tweenToAbsPosDramatic,
			shuffle: this.tweenToAbsPosShuffle
		}
		return tweenNames[this.tweenStyle].call(this);
	}

	tweenToAbsPosShuffle(){
		const leftOrRight = (_.random()*2)-1;
		const halfPoint = {
			x: (30*leftOrRight) + this.mesh.position.x+(this.absPos.x-this.mesh.position.x)/2,
			y: this.mesh.position.y+(this.absPos.y-this.mesh.position.y)/2,
			z: this.mesh.position.z+(this.absPos.z-this.mesh.position.z)/2,
		};
		return this.tweenTo(halfPoint, 'Sinusoidal.In')
			.then(this.tweenTo.bind(this, this.absPos, 'Sinusoidal.Out'));
	}

	tweenToAbsPosDramatic(){
		const halfPoint = {
			x: this.mesh.position.x+(this.absPos.x-this.mesh.position.x)/2,
			y: this.mesh.position.y+(this.absPos.y-this.mesh.position.y)/2,
			z: 100+this.mesh.position.z+(this.absPos.z-this.mesh.position.z)/2,
		};
		return this.tweenTo(halfPoint, 'Sinusoidal.In')
			.then(this.tweenTo.bind(this, this.absPos, 'Sinusoidal.Out'));
	}

	tweenTo(position, easing){
		const tweenTime = 400+(Math.random()*100);
		return new Promise((resolve, reject)=>{
			new TWEEN.Tween(this.mesh.position)
				.to(position, tweenTime)
				.easing(_.get(TWEEN.Easing, easing))
				.onComplete(resolve)
				.start();
		})
	}

	tweenRotation(){
		const tweenTime = 400+(Math.random()*100);
		setTimeout(()=>{
			const targetRotation = {
				z: this.absPos.angle*Math.PI/180,
			}
			targetRotation[this.getFlipAxis()] = this.faceUp ? 0 : (Math.PI);

			new TWEEN.Tween(this.mesh.rotation)
				.to(targetRotation, tweenTime)
				.easing(TWEEN.Easing.Linear.None)
				.start();
		}, tweenTime/2)
	}

	// @override
	setMeshPosition(){
		this.mesh = this.mesh || this.makeMesh();
		this.tweenToAbsPos();
		this.tweenRotation();
	}

}

module.exports = Card;