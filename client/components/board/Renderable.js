
const TWEEN = require('tween.js');
const THREE = require('three-js')();
require('./TrackBallControls.js')(THREE);
const Placeable = require('./Placeable.js');


class Drawer{

	constructor(options={}){
		_.defaults(options, {
			WIDTH: 1000,
			HEIGHT: 1000,
		})

		_.defaults(options, {
			VIEW_ANGLE: 45,
			ASPECT: options.WIDTH / options.HEIGHT,
			NEAR: 0.1,
			FAR: 10000,
			context: document.getElementById('root'),
		});

		const components = this.components = {
			// renderer: new THREE.WebGLRenderer(),
			renderer: new THREE.CSS3DRenderer(),
			camera: new THREE.PerspectiveCamera(options.VIEW_ANGLE, options.ASPECT, options.NEAR, options.FAR),
			scene: new THREE.Scene(),
			tween: TWEEN,
		};

		options.context.appendChild(components.renderer.domElement);
		components.scene.add(components.camera)
		components.camera.position.z = 4000
		components.renderer.setSize(options.WIDTH, options.HEIGHT)
		components.controls = new THREE.TrackballControls(components.camera, components.renderer.domElement );
		components.controls.rotateSpeed = 0.5;

		this.startRendering(components)
	}

	startRendering(components){
		setInterval(function(){
			components.controls.update();
			components.renderer.render(components.scene, components.camera);		
			components.tween.update();
		}, 16);
	}

	pointLight(){
		const pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;
		return pointLight;
	}

}

const components = new Drawer().components;

class Renderable extends Placeable{

	constructor(options){
		super(options);
		_.extend(this, options)
		_.defaults(this, {
			components: components
		})
	}

	renderDeep(context){
		this.layoutDeep();
		this.depthFirstTraverse(function(node){
			node.render(context);
		})
	}

	render(context){
	}

}

module.exports = Renderable;

