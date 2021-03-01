import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Vector3, Raycaster,Vector2, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Cube from './objects/Cube'
import Sunflower from './objects/sunflower/Sunflower'

export default class Webgl {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.select = this.select.bind(this)
    this.elementOnScene = this.elementOnScene.bind(this)
    this.flowerInFlowers = this.flowerInFlowers.bind(this)
    this.deselectFlowers = this.deselectFlowers.bind(this)
    //this.selectPlant = this.selectPlant.bind(this)

    this.scene = new Scene()
    this.scene.background = new Color(0xa9cfe3)
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

    this.camera.position.x = 260
    this.camera.position.y = 400
    this.camera.position.z = 400

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()

    this.currentlySelected = null

    const geometry = new BoxGeometry( 500, 40, 500 )
    const material = new MeshBasicMaterial( {color: 0x85bea0} )
    const ground = new Mesh( geometry, material )
    ground.position.y -= 20 
    this.scene.add( ground )

    this.allFlowers = []
    this.sunflower = new Sunflower('sunflower1',0,0,0)
    this.allFlowers.push(this.sunflower)
    this.sunflower2 = new Sunflower('sunflower2',100,0,0)
    this.allFlowers.push(this.sunflower2)
    
    //Axiome + nombre d'itérations
    this.sunflower.Lsystem("B",2,this.scene)
    this.sunflower2.Lsystem("B",2,this.scene)

    this.time = 0
    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false )
    window.addEventListener( 'click', this.select, false )
  }
  onMouseMove( event ) {  
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  select(event){
    this.deselectFlowers()
    this.raycaster.setFromCamera( this.mouse, this.camera )
    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    let id = ''
    let currentFlowerOnScene = ''
    let type = ''
    for ( let i = 0; i < intersects.length; i ++ ) {
      id = intersects[ i ].object.idFlower
      currentFlowerOnScene = this.elementOnScene(id)
      type = intersects[ i ].object.type
    }
    this.currentlySelected = id
    const flower = this.flowerInFlowers(id)
    if(type === 'flower'){
      flower.setIsSelected(true)
      document.querySelector('#infoSelected').classList.remove('hidden')
      document.querySelector('#wateringLevel').value = flower.wateringLevel
      document.querySelector('#watering').innerHTML = flower.wateringLevel + '%'
      document.querySelector('#sunshineLevel').value = flower.sunshineLevel
      document.querySelector('#sunshine').innerHTML = flower.sunshineLevel + '%'
      document.querySelector('#growthLevel').value = flower.growthLevel
      document.querySelector('#growth').innerHTML = flower.growthLevel + '%'

      currentFlowerOnScene.forEach( element => {
        if(element.isSelected != true){
          element.material.color.set( 0xff0000 )
          element.isSelected = true
        }
      })
    }  
  }
  deselectFlowers () {
    this.scene.children.forEach(element => {
      if(element.type === 'flower'){
        element.material.color.setHex(element.trueColor.replace('#','0x').toLowerCase())
        element.isSelected = false
        document.querySelector('#infoSelected').classList.add('hidden')
      }
    })
    this.allFlowers.forEach(flower => flower.isSelected = false)
  }
  elementOnScene (idElement) {
    let elements = []
    this.scene.children.forEach(element => {
      if(element.idFlower === idElement){
        elements.push(element)
      }
    })
    return elements    
  }
  flowerInFlowers(idFlower){
    let currentFlower =''
    this.allFlowers.forEach(flower => {
      if(flower.idFlower === idFlower){
        currentFlower = flower
      }
    })
    return currentFlower
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
