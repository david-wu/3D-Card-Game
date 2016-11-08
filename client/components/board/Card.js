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
		const targetParent = target.parent;
		const thisParent = this.parent;

		const targetIndex = targetParent.removeChild(target);
		const thisIndex = thisParent.removeChild(this);

		targetParent.addChild(this, targetIndex);
		thisParent.addChild(target, thisIndex);
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
		this.components.scene.add(mesh);
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

	setMeshPosition(){
		const tweenTime = 500;
		this.mesh = this.mesh || this.makeMesh();

		new TWEEN.Tween(this.mesh.position)
			.to({
				x: this.absPos.x,
				y: this.absPos.y,
				z: this.absPos.z,
			}, tweenTime*Math.random() + tweenTime)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();

		const targetRotation = {
			z: this.absPos.angle*Math.PI/180,
		}
		targetRotation[this.getFlipAxis()] = this.faceUp ? 0 : (Math.PI);

		new TWEEN.Tween(this.mesh.rotation)
			.to(targetRotation, tweenTime)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();

	}

}

module.exports = Card;