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
    this.plantSeed = this.plantSeed.bind(this)
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

    let geometry = new BoxGeometry( 500, 40, 500 )
    let material = new MeshBasicMaterial( {color: 0x85bea0} )
    this.ground = new Mesh( geometry, material )
    this.ground.position.y = -30
    this.ground.name = 'ground'
    this.scene.add( this.ground )

    
    //this.scene.add( seed )

    //console.log(this.scene)

    this.allFlowers = []
    this.sunflower = new Sunflower('sunflower1',0,0,0)
    this.allFlowers.push(this.sunflower)
    this.sunflower2 = new Sunflower('sunflower2',100,0,0)
    this.sunflower2.wateringLevel = 50
    this.allFlowers.push(this.sunflower2)
    
    //Axiome + nombre d'itérations
    this.sunflower.Lsystem("B",2,this.scene)
    this.sunflower2.Lsystem("B",2,this.scene)

    this.time = 0
    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false )
    window.addEventListener( 'click', this.select, false )
    document.querySelector('#plant').addEventListener( 'click', this.plantSeed, false )

    //his.launchSimulation(this.sunflower)
    // A appeler en boucle quand les jauges sont mauvaises 
    const illCube = Math.floor(Math.random() * (110 - 10) + 10)
    this.fallIll("sunflower1", illCube) 

  }

  fallIll (flowerId, illCube) {
    console.log("fall ill random nb : "+illCube)
    let flowerElements = this.elementOnScene(flowerId)
    flowerElements[illCube].setIll(true)
    const max = flowerElements.length
    let illNeighbour = 0
    let i = 0
    for (let k = 0; k < max; k++) {
      // console.log("boucle 1 - tour " + k)
      for(let j = -5; j <6; j++){
        if ((k + j >= 0) && (k + j < max) && j!=k ){ // pour ne pas sortir du tableau + ne pas comptabiliser le cube malade comme un voisin malade
          //console.log("hey " + (k + j))
          //console.log(flowerElements[j])
          if(flowerElements[k + j].ill) {
            illNeighbour += 1
          }
        }
      }
      if (illNeighbour >= 1 && illNeighbour <= 10){
        flowerElements[k].setIll(true)
      }
    }
    // console.log("ill neighbour : "+illNeighbour)
  }

  launchSimulation (sunflower) {
    console.log('launchSimulation : ')
    //console.log(sunflower.grid[6])
    //sunflower.grid[6].setIll(true) 
    let i = 6;
    //let flowerElements = this.elementOnScene("sunflower1")
    //console.log("elements on screen")
    //console.log(flowerElements)
    //flowerElements[6].setIll(true)
    console.log(flowerElements[6])
    setInterval( () => {
      //flowerElements[i].setIll(true)
      i++
    }, 1000)
    
  }
  
  onMouseMove( event ) {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  select(event){
    if(this.currentlySelected != null){
      this.deselectFlowers()
    }
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
    if(this.currentlySelected === id ){
      currentFlowerOnScene.forEach(element => {
        element.isSelected = true
      })
    }
    this.currentlySelected = id
    const flower = this.flowerInFlowers(id)
    if(type === 'flower'){
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
        } else {
          element.material.color.setHex(element.trueColor.replace('#','0x').toLowerCase())
          element.isSelected = false
          document.querySelector('#infoSelected').classList.add('hidden')
          this.currentlySelected = null
          if(element.ill) {
            element.material.color.set("#0000ff") // change color if ill
          } 
        }
      })
    } else {
      this.currentlySelected = null
    }
  }
  
  deselectFlowers () {
    this.scene.children.forEach(element => {
      if(element.type === 'flower'){
        element.material.color.setHex(element.trueColor.replace('#','0x').toLowerCase())
        element.isSelected = false
        document.querySelector('#infoSelected').classList.add('hidden')
        if(element.ill) { // change color if ill
          element.material.color.set("#0000ff")
        } 
      }
    })
    this.allFlowers.forEach(flower => {
      flower.isSelected = false
    })
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
  plantSeed(){
    document.body.classList.toggle('plantSeed')
    document.querySelector('#plant').classList.toggle('selected')
    window.addEventListener( 'click', () => {
      if(document.querySelector('#plant').classList.value === 'selected'){
        this.raycaster.setFromCamera( this.mouse, this.camera )
        const intersects = this.raycaster.intersectObjects( this.scene.children )
        for ( let i = 0; i < intersects.length; i ++ ) {
          if(intersects[ i ].object.name === 'ground'){
            const geometry = new BoxGeometry( 10, 10, 10 )
            const material = new MeshBasicMaterial( {color: 0xff0000} )
            let seed = new Mesh( geometry, material )
            seed.name = 'seed'
            seed.position.x= intersects[ i ].point.x
            seed.position.y= -5
            seed.position.z= intersects[ i ].point.z
            this.scene.add(seed)
          }
        }
      }  
    }, false )
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
