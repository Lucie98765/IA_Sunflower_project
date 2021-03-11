import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Vector3, Raycaster,Vector2, BoxGeometry, MeshBasicMaterial, Mesh, Clock } from 'three'

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
    this.water =this.water.bind(this)
    this.sun =this.sun.bind(this)
    this.update = this.update.bind(this)
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

    this.clock = new Clock()
    this.clock.start()
    this.delta = 0

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
    this.sunflower = new Sunflower('sunflower1',0,0,0,this.clock.getElapsedTime())
    this.allFlowers.push(this.sunflower)
    this.sunflower2 = new Sunflower('sunflower2',100,0,0,this.clock.getElapsedTime())
    this.sunflower2.wateringLevel = 50
    this.allFlowers.push(this.sunflower2)
    
    //Axiome + nombre d'itérations
    this.sunflower.Lsystem("B",2,this.scene)
    this.sunflower2.Lsystem("B",2,this.scene)

    setInterval(this.update, 1000)

    this.time = 0
    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false )
    document.querySelector('canvas').addEventListener( 'click', this.select, false )
    document.querySelector('#plant').addEventListener( 'click', this.plantSeed, false )

    document.querySelector('#water').addEventListener('click',this.water,false)
    document.querySelector('#sun').addEventListener('click',this.sun,false)

    const play_gol = document.getElementById('bouton_jeu_vie')
    play_gol.addEventListener('click', this.launchSimulation(this.sunflower)) // ça se lance sans le clic je sais pas pourquoi 
    // A appeler en boucle quand les jauges sont mauvaises 
    let illFlower = this.elementOnScene("sunflower1")
    const max = illFlower.length
    //const illCube = Math.floor(Math.random() * (max - 10) + 10)
    illFlower[max-1].setIll(true)
    let i = 0;
    const illInterval = setInterval ( () => {
      this.spreadIllness("sunflower1", max)
      i++
      if(i>40) {
        clearInterval(illInterval)
        this.recover("sunflower1", max)
      }
    }, 500 )

  }

  spreadIllness (flowerId, max) {
    let flowerElements = this.elementOnScene(flowerId)
    for (let k = 0; k < max; k++) {
      let illNeighbour = 0
      for(let j = -5; j <6; j++){
        if ((k + j >= 0) && (k + j < max) && j!=k ){ // pour ne pas sortir du tableau + ne pas comptabiliser le cube malade comme un voisin malade
          if(flowerElements[k + j].ill) {
            illNeighbour = illNeighbour + 1
          }
        }
      }
      if (illNeighbour >= 1 && illNeighbour <= 8){
        flowerElements[k].setIll(true)
      }
      
      if (illNeighbour > 9){
        flowerElements[k].setIll(false)
      }
    }
  }

  // A revoir
  recover (flowerId, max) {
    let flowerElements = this.elementOnScene(flowerId)
    for(let i = 0; i<max; i++){
      if(flowerElements[i].ill) {
        setTimeout( () => {
          flowerElements[i].setIll(false)
        }, 500 )
      }
    }
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
      document.querySelector('#flowerName').innerHTML = flower.idFlower
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
            element.material.color.set("#211a01") // change color if ill
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
          element.material.color.set("#211a01")
        } 
      }
    })
    this.allFlowers.forEach(flower => {
      flower.isSelected = false
    })
  }
  water() {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = this.flowerInFlowers(idFlower)
    currentFlower.wateringLevel += 5
    //console.log(currentFlower.wateringLevel)
    document.querySelector('#wateringLevel').value = currentFlower.wateringLevel
    document.querySelector('#watering').innerHTML = currentFlower.wateringLevel + '%'
  }
  sun() {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = this.flowerInFlowers(idFlower)
    currentFlower.sunshineLevel += 5
    //console.log(currentFlower.sunshineLevel)
    document.querySelector('#sunshineLevel').value = currentFlower.sunshineLevel
    document.querySelector('#sunshine').innerHTML = currentFlower.sunshineLevel + '%'
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
  update(){
    this.allFlowers.forEach( flower => {
      if(Math.floor(this.clock.getElapsedTime() - flower.creationTime)%3 ===0){
        if(flower.wateringLevel > 0 ){
          flower.wateringLevel -= 5
        }
        if(flower.sunshineLevel > 0 ){
          flower.sunshineLevel -= 5
        }
        if(this.currentlySelected === flower.idFlower){
          document.querySelector('#wateringLevel').value = flower.wateringLevel
          document.querySelector('#watering').innerHTML = flower.wateringLevel + '%'
          document.querySelector('#sunshineLevel').value = flower.sunshineLevel
          document.querySelector('#sunshine').innerHTML = flower.sunshineLevel + '%'
        }
      }
    })
  }
  start () {
    requestAnimationFrame( this.start )
    this.time += 0.01
    
    document.querySelector('#timer').innerHTML = Math.floor(this.clock.getElapsedTime()) + 's'
    this.controls.update()
	  this.renderer.render( this.scene, this.camera )
  }
}
