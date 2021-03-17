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
    this.updateSunshineLevel = this.updateSunshineLevel.bind(this)
    this.updateWateringLevel = this.updateWateringLevel.bind(this)
    this.timeManagement = this.timeManagement.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.nextState = this.nextState.bind(this)
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
    //this.delta = 0
    //this.globalTime = this.clock.getElapsedTime()
    //this.trueTime = 0
    this.timeCoeff = 1

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

    this.allFlowers = []
    this.nbSunFlower = 0
    this.sunflower = new Sunflower('sunflower'+this.nbSunFlower,0,0,0,this.clock.getElapsedTime())
    this.nbSunFlower++
    this.allFlowers.push(this.sunflower)
    
    /*this.nbSunFlower++
    this.sunflower2 = new Sunflower('sunflower'+this.nbSunFlower,100,0,0,this.clock.getElapsedTime())
    this.nbSunFlower++
    this.sunflower2.wateringLevel = 50
    this.allFlowers.push(this.sunflower2) */
    
    //Axiome + nombre d'itérations
    this.sunflower.state = 2
    this.sunflower.Lsystem("B",3,this.scene)
    //this.sunflower2.state = 2
    //this.sunflower2.Lsystem("B",4,this.scene)

    setInterval(this.update, 1000)

    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false )
    document.querySelector('canvas').addEventListener( 'click', this.select, false )
    document.querySelector('#plant').addEventListener( 'click', this.plantSeed, false )

    document.querySelector('#water').addEventListener('click',this.water,false)
    document.querySelector('#sun').addEventListener('click',this.sun,false)

    document.querySelector('.timeManagement').addEventListener('click',this.timeManagement,false) 
    this.i = 0
    
    setInterval( () => {
      this.allFlowers.forEach( flower => {
        this.checkIllness(flower)
      })
    }, 1000)

  }

  // Vérification taux des jauges
  checkIllness(flower) {
    const max = flower.grid.length
    if(flower.sunshineLevel <= 10 || flower.sunshineLevel >= 90 || flower.wateringLevel <= 10 || flower.wateringLevel >= 90){
      flower.grid[max-1].setIll(true)
      let i = 0;
        this.spreadIllness(flower.idFlower, max)
        i++
    } else {
      this.recover (flower.idFlower, max)
    }
  }

  // Propagation maladie
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

  // Rétablissement de la plante
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
    let id = null
    let currentFlowerOnScene = null
    let type = null
    if(typeof intersects[0] === 'object'){
      id = intersects[0].object.idFlower
      currentFlowerOnScene = this.elementOnScene(id)
      type = intersects[0].object.type
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
        this.updateSunshineLevel(flower)
        this.updateWateringLevel(flower)
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
    if(currentFlower.wateringLevel < 100){
      currentFlower.wateringLevel += 5
    }
    this.updateWateringLevel(currentFlower)
  }
  sun() {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = this.flowerInFlowers(idFlower)
    if(currentFlower.sunshineLevel < 100){
      currentFlower.sunshineLevel += 5
    }
    this.updateSunshineLevel(currentFlower)
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
  removeElement (idElement) {
    const flower = this.elementOnScene(idElement)
    flower.forEach(element => this.scene.remove(element) )
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
            let sunflower = new Sunflower('sunflower'+this.nbSunFlower,intersects[ i ].point.x,-5,intersects[ i ].point.z,this.clock.getElapsedTime())
            this.nextState(sunflower)
            this.allFlowers.push(sunflower)
            this.nbSunFlower++
            sunflower.Lsystem("B",1,this.scene)
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
      if(Math.floor(this.timeCoeff*this.clock.getElapsedTime() - this.timeCoeff*flower.creationTime)%6 ===0){
        if(flower.wateringLevel > 0 ){
          flower.wateringLevel -= 5
        }
        if(flower.sunshineLevel > 0 ){
          flower.sunshineLevel -= 5
        }
        if(this.currentlySelected === flower.idFlower){
          this.updateWateringLevel(flower)
          this.updateSunshineLevel(flower)
        }
      }
    })
  }
  timeManagement(e){
    const choice = e.target.innerHTML
    switch (choice) {
      case 'Lente' : 
        this.timeCoeff = 0.5
        //this.trueTime = this.globalTime
        break
      case 'Normale' : 
        this.timeCoeff = 1
        //this.trueTime = this.globalTime
        break;
      case 'Rapide' :
        this.timeCoeff = 2
        //this.trueTime = this.globalTime
        break;
    }

  }
  updateSunshineLevel(flower){
    document.querySelector('#sunshineLevel').value = flower.sunshineLevel
    document.querySelector('#sunshine').innerHTML = flower.sunshineLevel + '%'
    if(flower.sunshineLevel <= 10 || flower.sunshineLevel >= 90){
      document.querySelector('#sunshineLevel').classList.add('ill')
    } else{
      document.querySelector('#sunshineLevel').classList.remove('ill')
    }
    if(flower.sunshineLevel <= 80 && flower.sunshineLevel >= 60){
      document.querySelector('#sunshineLevel').classList.add('good')
    }else{
      document.querySelector('#sunshineLevel').classList.remove('good')
    }
  }
  updateWateringLevel(flower){
    document.querySelector('#wateringLevel').value = flower.wateringLevel
    document.querySelector('#watering').innerHTML = flower.wateringLevel + '%'
    if(flower.wateringLevel <= 10 || flower.wateringLevel >= 90){
      document.querySelector('#wateringLevel').classList.add('ill')
    } else{
      document.querySelector('#wateringLevel').classList.remove('ill')
    }
    if(flower.wateringLevel <= 80 && flower.wateringLevel >= 60){
      document.querySelector('#wateringLevel').classList.add('good')
    }else{
      document.querySelector('#wateringLevel').classList.remove('good')
    }
  }
  nextState(flower){
    if(flower.growthLevel >=5 && flower.growthLevel<=15){
      flower.state =0
    }
    if(flower.growthLevel >= 20 && flower.growthLevel<=50){
      flower.state = 1
    }
    if(flower.growthLevel >= 55 && flower.growthLevel<=100){
      flower.state = 2
    }
    if(flower.growthLevel >=5 && flower.growthLevel<10){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",1,this.scene)
    }
    if(flower.growthLevel >=10 && flower.growthLevel<15){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=15 && flower.growthLevel<20){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >=20 && flower.growthLevel<25){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",1,this.scene)
    }
    if(flower.growthLevel >=25 && flower.growthLevel<35){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=35 && flower.growthLevel<50){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >=50 && flower.growthLevel<70){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >=70 && flower.growthLevel<90){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",4,this.scene)
    }
    if(flower.growthLevel >=90 && flower.growthLevel<100){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",5,this.scene)
    }
  }
  start () {
    requestAnimationFrame( this.start )
    //this.delta = this.timeCoeff * this.clock.getElapsedTime()
    //this.curentTime = this.globalTime
    //this.globalTime = this.trueTime + this.delta
    
    document.querySelector('#timer').innerHTML = Math.floor(this.timeCoeff*this.clock.getElapsedTime()) + 's'
    this.allFlowers.forEach( flower =>{
      this.nextState(flower)
    })

    this.controls.update()
	  this.renderer.render( this.scene, this.camera )
  }
}
