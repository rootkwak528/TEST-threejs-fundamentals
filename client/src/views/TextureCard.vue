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
      const far = 5;
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;
      
      scene = new THREE.Scene();
      
      // const width = 2, height = 3;

      // const shape = new THREE.Shape();
      // shape.moveTo( 0,0 );
      // shape.lineTo( 0, height );
      // shape.lineTo( width, height );
      // shape.lineTo( width, 0 );
      // shape.lineTo( 0, 0 );

      // const extrudeSettings = {

      //   steps: 1,
      //   depth: 0.01,
      //   bevelEnabled: true,
      //   bevelThickness: 0.03,
      //   bevelSize: 0.06,
      //   bevelSegments: 1

      // };
      
      // const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

      const boxWidth = 1;
      const boxHeight = 1.5;
      const boxDepth = 0.02;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      // const cubes = [];  // just an array we can use to rotate the cubes
      // const loader = new THREE.TextureLoader();

      // const material = new THREE.MeshBasicMaterial({
      //   map: loader.load('https://www.themoviedb.org/t/p/w500/v0nlHB0wDevL54Me9V9lB6QdPk2.jpg'),
      // });
      // const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);
      // cubes.push(cube);
      
      cubes = [];  // just an array we can use to rotate the cubes
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);
      const posterImg = new THREE.MeshBasicMaterial({map: loader.load('https://www.themoviedb.org/t/p/w500/v0nlHB0wDevL54Me9V9lB6QdPk2.jpg')})
      const plainMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa})

      const materials = [
        plainMaterial,
        plainMaterial,
        plainMaterial,
        plainMaterial,
        posterImg,
        posterImg,
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