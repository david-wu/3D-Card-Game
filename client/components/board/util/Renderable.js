const Placeable = require('./Placeable.js');
const Renderer = require('./Renderer.js');

const renderer = new Renderer()
renderer.startRendering()

const components = renderer.components;

class Renderable extends Placeable{

	constructor(options){
		super(options);
		_.extend(this, options)
		_.defaults(this, {
			components: components
		})
	}

	setMeshPositionDeep(){
		this.setRelativePositionDeep();
		this.setAbsolutePositionDeep();
		this.depthFirstTraverse(function(node){
			node.setMeshPosition();
		})
	}
	setMeshPosition(){}

}

module.exports = Renderable;

