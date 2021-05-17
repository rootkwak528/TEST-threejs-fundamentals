<template>
  <canvas id="c">
  </canvas>
</template>

<script type="module">
import * as THREE from 'three'

export default {
  name: 'RotatingCube',
  methods: {
    main () {
      const canvas = document.querySelector('#c')
      const renderer = new THREE.WebGLRenderer({ canvas })

      // canvas 크기가 기본 300x150이니, aspect=2로 설정
      const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 5)
      camera.position.z = 2

      const scene = new THREE.Scene()

      const geometry = new THREE.BoxGeometry( 1, 1, 1 )

      const light = new THREE.DirectionalLight( 0xffffff, 1 ) // 색, 강도
      light.position.set( -1, 2, 4 )
      scene.add( light )

      function makeCube ( geometry, color, x ) {
        const material = new THREE.MeshPhongMaterial({ color })
        const cube = new THREE.Mesh( geometry, material )
        scene.add(cube)

        cube.position.x = x
        return cube
      }

      const cubes = [
        makeCube( geometry, 0x44aa88, 0 ),
        makeCube( geometry, 0x8844aa, -2 ),
        makeCube( geometry, 0xaa8844, 2 ),
      ]

      function render( time ) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, idx) => {
          const speed = 1 + idx * 0.1
          const rot = time * speed
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        })

        renderer.render( scene, camera );
        requestAnimationFrame( render );
      }
      requestAnimationFrame( render );
    },
  },
  mounted () {
    this.main()
  }
}
</script>

<style>

</style>