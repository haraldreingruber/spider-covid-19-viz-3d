/* globals THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

//let mesh, meshGroup;

let THR = {};

THR.group = new THREE.Group();



THR.init = function () {

	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 100, 0, 100 );
	camera.up.set( 0, 0, 1 );

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	//scene.fog = new THREE.Fog( 0xcce0ff, 9999, 999999 );
	scene.add( camera );

	//const distance = 25;
	//scene.fog.near = distance * 1.8;
	//scene.fog.far = distance * 2.5;

	const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild( renderer.domElement );

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.maxPolarAngle = Math.PI * 0.5;
	controls.enablePan = false;
	controls.minDistance = 60;
	controls.maxDistance = 300;
	controls.autoRotate = true;

	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );

	window.addEventListener( 'keydown', THR.onStart );
	renderer.domElement.addEventListener( 'wheel', THR.onStart );
	renderer.domElement.addEventListener( 'mousedown', THR.onStart );
	renderer.domElement.addEventListener( 'touchstart', THR.onStart );

	THR.camera = camera; THR.scene = scene; THR.renderer = renderer; THR.controls = controls;

	let event = new Event( "onloadthree", { "bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( "onloadthree", THR.onLoad, false );

	window.dispatchEvent( event );

};



THR.onLoad = function ( event ) {

	console.log( 'event thr', event );

};


THR.onStart = function () {

	controls.autoRotate = false;

	window.removeEventListener( 'keydown', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'heel', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'mousedown', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'touchstart', THR.onStart );

};



THR.onWindowResize = function () {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	//THR.controls.handleResize(); // Trackball only

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();

};