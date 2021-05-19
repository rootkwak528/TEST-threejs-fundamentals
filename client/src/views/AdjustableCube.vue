<template>
  <div>
    <label for="x">x: </label>
    <input type="text" name="x" v-model="input.x"><br>
    <label for="y">y: </label>
    <input type="text" name="y" v-model="input.y"><br>
    <label for="z">z: </label>
    <input type="text" name="z" v-model="input.z" @keyup.enter="adjustCube">
    <canvas id="rc">
    </canvas>    
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'AdjustableCube',
  data () {
    return {
      input : {
        x: 1,
        y: 1,
        z: 1,
      },
      cubeDimension : {
        x: 1,
        y: 1,
        z: 1,
      }
    }
  },
  methods: {
    adjustCube () {
      this.input.x = parseInt(this.input.x)
      this.input.y = parseInt(this.input.y)
      this.input.z = parseInt(this.input.z)

      if (!isNaN(this.input.x) & !isNaN(this.input.y) & !isNaN(this.input.z)) {
        this.cubeDimension = this.input
      }
      console.log(this.input)
      console.log(this.cubeDimension)
    },
    main () {
      const canvas = document.querySelector('#rc')
      const renderer = new THREE.WebGLRenderer({ canvas })

      const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 5)
      camera.position.z = 2

      const scene = new THREE.Scene()

      const light = new THREE.DirectionalLight( 0xffffff, 1 ) // 색, 강도
      light.position.set( -1, 2, 4 )
      scene.add( light )

      let geometry = new THREE.BoxGeometry( 1, 1, 1 )
      function makeCube ( geometry, color, x ) {
        const material = new THREE.MeshPhongMaterial({ color })
        const cube = new THREE.Mesh( geometry, material )
        scene.add(cube)

        cube.position.x = x
        return cube
      }
      let cube = makeCube( geometry, 0xaaaaaa, 0 )

      function resizeRendererToDisplaySize ( renderer ) {
        const canvas = renderer.domElement
        // const width = canvas.clientWidth
        // const height = canvas.clientHeight
        
        // HD-DPI 기기 최적화 (스마트폰)
        const pixelRatio = window.devicePixelRatio
        const width = canvas.clientWidth * pixelRatio | 0
        const height = canvas.clientHeight * pixelRatio | 0

        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize( width, height, false )
        }
        return needResize
      }

      function render( time ) {
        cube.scale.set( this.cubeDimension.x,
                        this.cubeDimension.y, 
                        this.cubeDimension.z )
        // cube.scale.y = this.cubeDimension.y
        // cube.scale.z = this.cubeDimension.z

        // geometry = new THREE.BoxGeometry( this.cubeDimension.x,
        //                                   this.cubeDimension.y, 
        //                                   this.cubeDimension.z )
        // cube = makeCube( geometry, 0xaaaaaa, 0 )

        if (resizeRendererToDisplaySize( renderer )) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }

        time *= 0.001  // convert time to seconds
        cube.rotation.x = time
        cube.rotation.y = time

        renderer.render( scene, camera )
        requestAnimationFrame( render )
      }
      requestAnimationFrame( render )
    }
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