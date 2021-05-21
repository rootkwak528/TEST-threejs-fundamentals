<template>
  <div id="container">
    <div id="loading">
      <div class="progress"><div class="progressbar"></div></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let container
let renderer, camera, scene, controls
let cubes

export default {
  name: 'TextureCube',
  mounted () {
    this.main()
  },
  methods: {
    main () {
      container = document.getElementById( 'container' );
      
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      
      const fov = 75;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 50;
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;
      
      scene = new THREE.Scene();
      
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      
      cubes = [];  // just an array we can use to rotate the cubes
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);

      const materials = [
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg')}),
      ];

      const loadingElem = document.querySelector('#loading');
      const progressBarElem = loadingElem.querySelector('.progressbar');

      loadManager.onLoad = () => {
        loadingElem.style.display = 'none';
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubes.push(cube);  // add to our list of cubes to rotate
      };

      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        progressBarElem.style.transform = `scaleX(${progress})`;
      };

      controls = new OrbitControls( camera, renderer.domElement );
			controls.maxPolarAngle = Math.PI * 0.5;
			controls.minDistance = 1;
			controls.maxDistance = 100;
			controls.addEventListener( 'change', this.render );

      requestAnimationFrame(this.render);
    },

    resizeRendererToDisplaySize (renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    },

    render () {

      if (this.resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(this.render);
    }
  }

}
</script>

<style>

</style>