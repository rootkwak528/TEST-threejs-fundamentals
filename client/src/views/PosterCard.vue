<template>
  <div id="container">

  </div>
</template>

<script>
import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'

let container
let camera, controls, scene, renderer
let pickingTexture, pickingScene
let highlightBox
let navbarHeight

// 마우스 가리키는 카드 판별 목적
const pickingData = []

const pointer = new THREE.Vector2()
const offset = new THREE.Vector3( 10, 10, 10 )

let pointedCardId = null
let clicked = false
let shiftDown = false

// Fly Controls
const clock = new THREE.Clock()

export default {
  name: 'PosterCard',
  mounted () {

    const navbar = document.getElementById( 'nav' )
    navbarHeight = navbar.offsetHeight

    this.main()

  },

  methods: {

    main () {

			this.init()
			this.animate()

    },

    init () {

      container = document.getElementById( 'container' );

      // 카메라
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 1000;

      // 씬
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );

      // 마우스 가리키는 씬
      pickingScene = new THREE.Scene();
      pickingTexture = new THREE.WebGLRenderTarget( 1, 1 );

      // 재질 로더
      // loader = new THREE.TextureLoader()

      // 조명 1
      scene.add( new THREE.AmbientLight( 0x555555 ) );

      // 조명 2
      const light = new THREE.SpotLight( 0xffffff, 1.5 );
      light.position.set( 0, 500, 2000 );
      scene.add( light );

      // 영화 데이터 확인
      const movies = []
      for ( let i=0; i < 50; i++ ) {
        movies[i] = {
          id: i
        }
      }

      // 포스터 카드 geometry 추가
      this.updateGeometriesToScene( movies )

      // 포인터 가르키는 박스에 씌울 하이라이트 박스도 Scene에 추가
      highlightBox = new THREE.Mesh(

        this.getCubeGeometry(),
        new THREE.MeshLambertMaterial( { color: 0xffff00 }

        ) );
      scene.add( highlightBox );

      // 렌더러 화면에 추가
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );

      // 컨트롤러 추가
      controls = new FlyControls( camera, renderer.domElement )
      controls.movementSpeed = 1000
      controls.rollSpeed = Math.PI / 5
      controls.dragToLook = true

      // 이벤트리스너 추가
      renderer.domElement.addEventListener( 'pointermove', this.onPointerMove ) // 마우스 이동
      renderer.domElement.addEventListener( 'pointerdown', this.onPointerDown ) // 마우스 클릭
      document.addEventListener( 'keydown', this.onKeyDown ) // 키보드 down
      document.addEventListener( 'keyup', this.onKeyUp ) // 키보드 up

    },

    updateGeometriesToScene ( movies ) {

      // pickingScene 의 재질
      const pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

      // Scene 의 재질
      // const defaultMaterial = new THREE.MeshPhongMaterial( { 

      //   color: 0xffffff, 
      //   flatShading: true, 
      //   vertexColors: true, 
      //   shininess: 0	
        
      //   } );

      // Scene 의 재질 - texture image 적용
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);
      const posterMaterial = new THREE.MeshBasicMaterial({

        map: loader.load('https://www.themoviedb.org/t/p/w500/v0nlHB0wDevL54Me9V9lB6QdPk2.jpg'),

        })
      // const plainMaterial = new THREE.MeshPhongMaterial({

      //   color: 0xaaaaaa, 
      //   flatShading: true, 
      //   vertexColors: true, 
      //   shininess: 0,
        
      //   })

      // const materials = [
      //   plainMaterial,
      //   plainMaterial,
      //   plainMaterial,
      //   plainMaterial,
      //   posterMaterial,
      //   posterMaterial,
      // ];

      loadManager.onLoad = () => {
        
        // geometry 배열
        const geometriesDrawn = [];
        const geometriesPicking = [];

        // 그외 변수
        const matrix = new THREE.Matrix4();
        const quaternion = new THREE.Quaternion();
        const color = new THREE.Color();

        movies.forEach(movie => {
          
          // geometry 원형
          let geometry = this.getCubeGeometry()

          // 위치 설정
          const position = new THREE.Vector3();
          position.x = Math.random() * 10000 - 5000;
          position.y = Math.random() * 6000 - 3000;
          position.z = Math.random() * 8000 - 4000;

          // 방향 설정
          const rotation = new THREE.Euler();
          rotation.x = 0;
          rotation.y = 0;
          rotation.z = 0;

          // 스케일 설정
          const scale = new THREE.Vector3();
          scale.x = 100;
          scale.y = 100;
          scale.z = 100;

          // 위치, 방향, 스케일 적용
          quaternion.setFromEuler( rotation );
          matrix.compose( position, quaternion, scale );
          geometry.applyMatrix4( matrix );

          // case: 카드가 카메라 바라보게 하려면
          // matrix.compose( position, camera.quaternion, scale );

          // 컬러 적용
          // this.applyVertexColors( geometry, color.setHex( Math.random() * 0xffffff ) );

          // geometry를 geometry 배열에 추가
          geometriesDrawn.push( geometry );

          // geometry를 마우스 가리키는 씬에 사용할 geometry 배열에 추가
          // 단, 컬러를 "id" (movie.id) 값으로 설정한다.
          geometry = geometry.clone();
          this.applyVertexColors( geometry, color.setHex( movie.id ) );
          geometriesPicking.push( geometry );

          // 각 카드 별 데이터 저장
          pickingData[ movie.id ] = {

            position: position,
            rotation: rotation,
            scale: scale,

          };

        });

        // Scene에 포스터 카드 추가
        const objects = new THREE.Mesh( 

          BufferGeometryUtils.mergeBufferGeometries( geometriesDrawn ), 
          posterMaterial 

          );
        scene.add( objects );

        // 포인터 바라보는 Scene에도 포스터 카드 추가
        const pickingObejcts = new THREE.Mesh( 

          BufferGeometryUtils.mergeBufferGeometries( geometriesPicking ),
          pickingMaterial 
          
          )
        pickingScene.add( pickingObejcts )

      };

    },

    getCubeGeometry () {

      const boxWidth = 2;
      const boxHeight = 3;
      const boxDepth = 0.02;

      return new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    },

    // 카드 geometry 생성
    getCardGeometry () {

      const width = 2, height = 3;

      const shape = new THREE.Shape();
      shape.moveTo( 0,0 );
      shape.lineTo( 0, height );
      shape.lineTo( width, height );
      shape.lineTo( width, 0 );
      shape.lineTo( 0, 0 );

      const extrudeSettings = {

        steps: 1,
        depth: 0.01,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.06,
        bevelSegments: 1

      };
      
      return new THREE.ExtrudeGeometry(shape, extrudeSettings)

    },

    // 컬러 적용
    applyVertexColors ( geometry, color ) {

      const position = geometry.attributes.position; // geometry.attributes 속성으로 위치 등에 접근할 수 있나보다.
      const colors = [];

      for ( let i = 0; i < position.count; i ++ ) {

        colors.push( color.r, color.g, color.b );

      }

      geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    },

    onPointerMove ( e ) {

      pointer.x = e.clientX;
      pointer.y = e.clientY;

    },

    onPointerDown ( ) {

      clicked = true

    },

    onKeyDown ( e ) {
      
      shiftDown = e.shiftKey

    },

    onKeyUp ( e ) {

      shiftDown = e.shiftKey

    },

    animate () {

      // 비동기 함수
      requestAnimationFrame( this.animate );

      this.render();

    },

    pick () {

      //render the picking scene off-screen

      // set the view offset to represent just a single pixel under the mouse

      camera.setViewOffset( renderer.domElement.width,
                            renderer.domElement.height, 
                            pointer.x * window.devicePixelRatio | 0, 
                            // pointer.y * window.devicePixelRatio | 0, 
                            (pointer.y - navbarHeight) * window.devicePixelRatio | 0, // navbar 사이즈만큼 위치 조절
                            1, 
                            1 );

      // render the scene

      renderer.setRenderTarget( pickingTexture );
      renderer.render( pickingScene, camera );

      // clear the view offset so rendering returns to normal

      camera.clearViewOffset();

      //create buffer for reading single pixel

      const pixelBuffer = new Uint8Array( 4 );

      //read the pixel

      renderer.readRenderTargetPixels( pickingTexture, 0, 0, 1, 1, pixelBuffer );

      //interpret the pixel as an ID

      pointedCardId = ( pixelBuffer[ 0 ] << 16 ) | ( pixelBuffer[ 1 ] << 8 ) | ( pixelBuffer[ 2 ] );
      const data = pickingData[ pointedCardId ];

      if ( data ) {

        //move our highlightBox so that it surrounds the picked object

        if ( data.position && data.rotation && data.scale ) {

          highlightBox.position.copy( data.position );
          highlightBox.rotation.copy( data.rotation );
          highlightBox.scale.copy( data.scale ).add( offset );
          highlightBox.visible = true;

        } 

      } else {

        highlightBox.visible = false;

      }

    },

    choice () {

      if ( clicked ) {

        if ( pointedCardId ) {

          if ( shiftDown ) {

            console.log( 'shift +', pointedCardId )

          } else {

            console.log( pointedCardId )

          }

          const movies = []
          for ( let i=0; i < 50; i++ ) {
            movies[i] = {
              id: Math.floor(Math.random() * 100000)
            }
          }
          this.updateGeometriesToScene( movies )

        }
        
        clicked = false

      }

    },

    render () {

      // Fly Controls
      controls.update( clock.getDelta() );

      this.pick();
      this.choice()

      renderer.setRenderTarget( null );
      renderer.render( scene, camera );

    }
  }
}
</script>

<style>

</style>