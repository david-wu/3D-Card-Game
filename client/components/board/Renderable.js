const Placeable = require('./Placeable.js');

class Renderable extends Placeable{

	constructor(options){
		super(options);
		_.extend(this, options)
		_.defaults(this, {

		})
	}

	renderDeep(context){
		this.layoutDeep();
		this.depthFirstTraverse(function(node){
			node.render(context);
		})
	}

	// This will return some container that the implementer can super like in PIXI
	// Or use my own container
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
			'transform': `translate3d(${pos.x}px,${-pos.y}px,${pos.z}px)rotate(${pos.angle}deg)`,
			'z-index': pos.z
		})

		return this.el;
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

function rotatePos(pos, rotationMatrix, recycle={}){
	const x = pos.x*rotationMatrix[0][0] + pos.y*rotationMatrix[0][1];
	const y = pos.x*rotationMatrix[1][0] + pos.y*rotationMatrix[1][1];
	recycle.x = x;
	recycle.y = y;
	return recycle;
}

function sumPos(pos1, pos2){
	pos1.x += pos2.x || 0;
	pos1.y += pos2.y || 0;
	pos1.z += pos2.z || 0;
}

module.exports = Renderable;