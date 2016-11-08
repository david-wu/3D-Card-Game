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

	tweenPos(){
		const tweenTime = 400+(Math.random()*100);
		const halfPoint = {
			x: this.mesh.position.x+(this.absPos.x-this.mesh.position.x)/2,
			y: this.mesh.position.y+(this.absPos.y-this.mesh.position.y)/2,
			z: 100+this.mesh.position.z+(this.absPos.z-this.mesh.position.z)/2,
		};
		new TWEEN.Tween(this.mesh.position)
			.to(halfPoint, tweenTime)
			.easing(TWEEN.Easing.Sinusoidal.In)
			.onComplete(()=>{

				new TWEEN.Tween(this.mesh.position)
					.to({
						x: this.absPos.x,
						y: this.absPos.y,
						z: this.absPos.z,
					}, tweenTime)
					.easing(TWEEN.Easing.Sinusoidal.Out)
					.onComplete(function(){

					})
					.start();			
			})
			.start();

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

	setMeshPosition(){
		this.mesh = this.mesh || this.makeMesh();
		if(!_.isMatch(this.absPos, this.mesh.position)){
			this.tweenPos();			
		}
		this.tweenRotation();
	}

}

module.exports = Card;