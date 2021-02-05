import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Vector3, Raycaster,Vector2 } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Cube from './objects/Cube'
import Sunflower from './objects/sunflower/Sunflower'

export default class Webgl {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.select = this.select.bind(this)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.light = new AmbientLight( 0x404040, 1 ) // soft white light
    this.scene.add(this.light)
    this.spotlight = new SpotLight( 0xffffff, 1 )
    this.spotlight.position.set(200, 200, 200)
    this.scene.add(this.spotlight)

    this.camera.position.z = 200
    this.camera.position.y = 400

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()

    this.allFlower = []
    this.sunflower = new Sunflower('sunflower1',0,0,0)
    this.allFlower.push(this.sunflower)
    this.sunflower2 = new Sunflower('sunflower2',100,0,0)
    this.allFlower.push(this.sunflower2)
    
    //Axiome + nombre d'itérations
    this.sunflower.Lsystem("B",2,this.scene)
    this.sunflower2.Lsystem("B",2,this.scene)

    this.time = 0
    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false );
    window.addEventListener( 'click', this.select, false );

  }
  
  onMouseMove( event ) {  
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  }
  select(event){
    this.raycaster.setFromCamera( this.mouse, this.camera )
    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    let id = ''
    let info = ''
    for ( let i = 0; i < intersects.length; i ++ ) {
      id = intersects[ i ].object.idFlower
      this.scene.children.forEach(element => {
        if(element.idFlower === id){
          if(element.isSelected){
            element.material.color.setHex(element.trueColor.replace('#','0x').toLowerCase())
            element.isSelected = false
            info = 'unselected'
          }
          else{
            element.material.color.set( 0xff0000 )
            element.isSelected = true
            info = 'selected'
          }
        }
      })
    }
    this.allFlower.forEach(element => {
      if(element.idFlower === id){
        if (info === 'selected'){
          element.setIsSelected(true)
        }
        else{
          element.setIsSelected(false)
        }
      }
    })
  }
  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }


  start () {
    requestAnimationFrame( this.start )
    this.time += 0.01

    this.controls.update()

	  this.renderer.render( this.scene, this.camera )
  }
}
