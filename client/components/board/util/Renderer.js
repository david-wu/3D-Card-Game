const TWEEN = require('tween.js');
const THREE = require('three-js')();

class Renderer{

	constructor(options={}){
		_.defaults(options, {
			WIDTH: window.innerWidth,
			HEIGHT: window.innerHeight,
		})

		_.defaults(options, {
			VIEW_ANGLE: 45,
			ASPECT: options.WIDTH / options.HEIGHT,
			NEAR: 0.1,
			FAR: 2000,
			context: document.getElementById('root'),
		});

		const components = this.components = {
			renderer: new THREE.CSS3DRenderer(),
			camera: new THREE.PerspectiveCamera(options.VIEW_ANGLE, options.ASPECT, options.NEAR, options.FAR),
			scene: new THREE.Scene(),
			tween: TWEEN,
		};

		options.context.appendChild(components.renderer.domElement);
		components.scene.add(components.camera)
		components.camera.position.z = 4000
		// components.camera.position.x = 4000
		components.camera.position.y = -4000

		new TWEEN.Tween(components.camera.position)
			.to({
				x: 0,
				y: -2000,
				z: 500,
			}, 3000)
			.easing(TWEEN.Easing.Cubic.InOut)
			.start();


		components.renderer.setSize(options.WIDTH, options.HEIGHT)
		components.controls = new THREE.TrackballControls(components.camera, components.renderer.domElement );
		components.controls.rotateSpeed = 0.5;
	}

	startRendering(){
		const components = this.components;
		setInterval(function(){
			components.controls.update();
			components.tween.update();
			components.renderer.render(components.scene, components.camera);
		}, 16);
	}

}

module.exports = Renderer;