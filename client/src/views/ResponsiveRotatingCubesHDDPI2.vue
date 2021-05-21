<template>
  <canvas id="rc">
  </canvas>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'ResponsiveRotatingCubesHDDPI2',
  methods: {
    main () {
      const canvas = document.querySelector('#rc')
      const renderer = new THREE.WebGLRenderer({ canvas })

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

      function resizeRendererToDisplaySize ( renderer ) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight

        renderer.setPixelRatio( window.devicePixelRatio );
        
        // HD-DPI 기기 최적화 (스마트폰)
        // const pixelRatio = window.devicePixelRatio
        // const width = canvas.clientWidth * pixelRatio | 0
        // const height = canvas.clientHeight * pixelRatio | 0

        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize( width, height, false )
        }
        return needResize
      }

      function render( time ) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize( renderer )) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

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
html, body {
  margin: 0; /* body는 기본 margin 5px */
  height: 100%;
}
#rc {
  width: 100%;
  height: 100%;
  display: block; /* canvas의 display는 기본 inline */
}
</style>