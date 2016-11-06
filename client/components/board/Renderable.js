
const TWEEN = require('tween.js');
const THREE = require('three-js')();
require('./TrackBallControls.js')(THREE);
const Placeable = require('./Placeable.js');



function initComponents(options={}){

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

	const components = {
		renderer: new THREE.CSS3DRenderer(),
		// renderer: new THREE.WebGLRenderer(),
		camera: new THREE.PerspectiveCamera(options.VIEW_ANGLE, options.ASPECT, options.NEAR, options.FAR),
		scene: new THREE.Scene(),
	};

	options.context.appendChild(components.renderer.domElement);

	components.scene.add(components.camera)
	components.camera.position.z = 4000
	// components.camera.position.x = 500
	// components.camera.position.y = 500

	components.renderer.setSize(options.WIDTH, options.HEIGHT)

	linkComponents(components)

	components.controls = new THREE.TrackballControls(components.camera, components.renderer.domElement );
	components.controls.rotateSpeed = 0.5;

	return components;
}


function pointLight(){
	const pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	return pointLight;
}

function linkComponents(components){
	// components.scene.add(boxMesh());
	// components.scene.add(pointLight());

	setInterval(function(){
		components.controls.update();
		// components.camera.rotation.z+=0.01;

		components.renderer.render(components.scene, components.camera);		
		TWEEN.update();
	},16)
}


const components = initComponents();

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

	// This will return some container that the implementer can super like in PIXI
	// Or use my own container
	render(context){

		// if(!this.container){
		// 	this.container = new THREE.Object3D();
		// 	components.scene.add(this.container);
		// 	// components.scene.add(boxMesh());
		// }

		// const pos = this.absPos

		// _.extend(this.container.position, {
		// 	x: pos.x,
		// 	y: pos.y,
		// 	z: pos.z,
		// })
		// _.extend(this.container.rotation, {
		// 	z: pos.angle
		// })

		// 	this.container.add(boxMesh())
		// return this.container;

		// if(!this.el){
		// 	this.el = document.createElement('div');
		// 	_.extend(this.el.style, {
		// 		transition: '0.2s',
		// 		position: 'absolute'
		// 	})
		// 	context.appendChild(this.el);
		// }

		// const pos = this.absPos
		// _.extend(this.el.style, {
		// 	'transform': `translate3d(${pos.x}px,${-pos.y}px,${pos.z}px)rotate(${pos.angle}deg)`,
		// 	'z-index': pos.z
		// })

		// return this.el;
	}

}

module.exports = Renderable;

