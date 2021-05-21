<template>
  <div>

  </div>
</template>

<script>
import * as THREE from 'three';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let container;

let camera, scene1, scene2, renderer;

let mouseX = 0, mouseY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

let image, geometry
let meshCanvas1, meshCanvas2

export default {
  name: 'ImageMipmaps',

  mounted () {

    this.init();
    this.animate();

  },

  methods: {

    init () {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
      camera.position.z = 1500;

      scene1 = new THREE.Scene();
      scene1.background = new THREE.Color( 0x000000 );
      scene1.fog = new THREE.Fog( 0x000000, 1500, 4000 );

      scene2 = new THREE.Scene();
      scene2.background = new THREE.Color( 0x000000 );
      scene2.fog = new THREE.Fog( 0x000000, 1500, 4000 );

      // GROUND

      const canvas = this.mipmap( 128, '#f00' );
      const textureCanvas1 = new THREE.CanvasTexture( canvas );
      textureCanvas1.mipmaps[ 0 ] = canvas;
      textureCanvas1.mipmaps[ 1 ] = this.mipmap( 64, '#0f0' );
      textureCanvas1.mipmaps[ 2 ] = this.mipmap( 32, '#00f' );
      textureCanvas1.mipmaps[ 3 ] = this.mipmap( 16, '#400' );
      textureCanvas1.mipmaps[ 4 ] = this.mipmap( 8, '#040' );
      textureCanvas1.mipmaps[ 5 ] = this.mipmap( 4, '#004' );
      textureCanvas1.mipmaps[ 6 ] = this.mipmap( 2, '#044' );
      textureCanvas1.mipmaps[ 7 ] = this.mipmap( 1, '#404' );
      textureCanvas1.repeat.set( 1000, 1000 );
      textureCanvas1.wrapS = THREE.RepeatWrapping;
      textureCanvas1.wrapT = THREE.RepeatWrapping;

      const textureCanvas2 = textureCanvas1.clone();
      textureCanvas2.magFilter = THREE.NearestFilter;
      textureCanvas2.minFilter = THREE.NearestMipmapNearestFilter;

      const materialCanvas1 = new THREE.MeshBasicMaterial( { map: textureCanvas1 } );
      const materialCanvas2 = new THREE.MeshBasicMaterial( { color: 0xffccaa, map: textureCanvas2 } );

      geometry = new THREE.PlaneGeometry( 100, 100 );

      meshCanvas1 = new THREE.Mesh( geometry, materialCanvas1 );
      meshCanvas1.rotation.x = - Math.PI / 2;
      meshCanvas1.scale.set( 1000, 1000, 1000 );

      meshCanvas2 = new THREE.Mesh( geometry, materialCanvas2 );
      meshCanvas2.rotation.x = - Math.PI / 2;
      meshCanvas2.scale.set( 1000, 1000, 1000 );


      // PAINTING

      const callbackPainting = function () {

        image = texturePainting1.image;

        texturePainting2.image = image;
        texturePainting2.needsUpdate = true;

        scene1.add( meshCanvas1 );
        scene2.add( meshCanvas2 );

        const geometry = new THREE.PlaneGeometry( 100, 100 );
        const mesh1 = new THREE.Mesh( geometry, materialPainting1 );
        const mesh2 = new THREE.Mesh( geometry, materialPainting2 );

        this.addPainting( scene1, mesh1 );
        this.addPainting( scene2, mesh2 );

      };

      const texturePainting1 = new THREE.TextureLoader().load( "textures/758px-Canestra_di_frutta_(Caravaggio).jpg", callbackPainting );
      const texturePainting2 = new THREE.Texture();
      const materialPainting1 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting1 } );
      const materialPainting2 = new THREE.MeshBasicMaterial( { color: 0xffccaa, map: texturePainting2 } );

      texturePainting2.minFilter = texturePainting2.magFilter = THREE.NearestFilter;
      texturePainting1.minFilter = texturePainting1.magFilter = THREE.LinearFilter;
      texturePainting1.mapping = THREE.UVMapping;

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      renderer.autoClear = false;

      renderer.domElement.style.position = "relative";
      container.appendChild( renderer.domElement );

      document.addEventListener( 'mousemove', this.onDocumentMouseMove );

    },

    mipmap ( size, color ) {

      const imageCanvas = document.createElement( "canvas" );
      const context = imageCanvas.getContext( "2d" );

      imageCanvas.width = imageCanvas.height = size;

      context.fillStyle = "#444";
      context.fillRect( 0, 0, size, size );

      context.fillStyle = color;
      context.fillRect( 0, 0, size / 2, size / 2 );
      context.fillRect( size / 2, size / 2, size / 2, size / 2 );
      return imageCanvas;

    },

    addPainting( zscene, zmesh ) {

      zmesh.scale.x = image.width / 100;
      zmesh.scale.y = image.height / 100;

      zscene.add( zmesh );

      const meshFrame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
      meshFrame.position.z = - 10.0;
      meshFrame.scale.x = 1.1 * image.width / 100;
      meshFrame.scale.y = 1.1 * image.height / 100;
      zscene.add( meshFrame );

      const meshShadow = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.75, transparent: true } ) );
      meshShadow.position.y = - 1.1 * image.height / 2;
      meshShadow.position.z = - 1.1 * image.height / 2;
      meshShadow.rotation.x = - Math.PI / 2;
      meshShadow.scale.x = 1.1 * image.width / 100;
      meshShadow.scale.y = 1.1 * image.height / 100;
      zscene.add( meshShadow );

      const floorHeight = - 1.117 * image.height / 2;
      meshCanvas1.position.y = meshCanvas2.position.y = floorHeight;

    },

    onDocumentMouseMove ( event ) {

      mouseX = ( event.clientX - windowHalfX );
      mouseY = ( event.clientY - windowHalfY );

    },

    animate () {

      requestAnimationFrame( this.animate );

      this.render();

    },

    render () {

      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.position.y += ( - ( mouseY - 200 ) - camera.position.y ) * .05;

      camera.lookAt( scene1.position );

      renderer.clear();
      renderer.setScissorTest( true );

      renderer.setScissor( 0, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
      renderer.render( scene1, camera );

      renderer.setScissor( SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT );
      renderer.render( scene2, camera );

      renderer.setScissorTest( false );

    }
  }
}
</script>

<style>

</style>