import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Raycaster,Vector2, BoxGeometry, MeshBasicMaterial, Mesh, Clock, TextureLoader } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Sunflower from './objects/sunflower/Sunflower'
import Myosotis from './objects/myosotis/Myosotis'
import {checkIllness, stayIll} from './features/illness'
import {elementOnScene, flowerAtPosition, removeElement, flowerInFlowers} from './features/sceneManagement'
import {water, sun, love, updateSunshineLevel, updateWateringLevel, updateGrowthLevel} from './features/dipsticks'

export default class Game {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.select = this.select.bind(this)
    this.update = this.update.bind(this)

    this.scene = new Scene()
    this.scene.background = new Color(0xa9cfe3)
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.renderer = new WebGLRenderer({ antialias: false, alpha:true })
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.spotlight1 = new SpotLight( 0xffffff, 0.7 )
    this.spotlight1.position.set(300, 600, 300)
    this.scene.add(this.spotlight1)
    this.spotlight2 = new SpotLight( 0xffffff, 0.7 )
    this.spotlight2.position.set(-300, 600, -300)
    this.scene.add(this.spotlight2)
    this.spotlight4 = new SpotLight( 0xffffff, 0.7 )
    this.spotlight4.position.set(400, 700, -400)
    this.scene.add(this.spotlight4)
    this.spotlight5 = new SpotLight( 0xffffff, 0.7 )
    this.spotlight5.position.set(-400, 700, 400)
    this.scene.add(this.spotlight5)

    this.clock = new Clock()
    this.clock.start()

    this.flowerNames = ['Marguerite','Simone','Georgette','Jeanine','Monique','Ginette','Odette','Germaine','Paulette','Yvette','Berthe','Danielle','Josiane','Michelle','Yvonne','Marcelle','Annie','Jacqueline','Josette','Huguette','Micheline','Claudette','Raymonde','Henriette']

    this.levelCoeff = 1

    this.camera.position.x = 260
    this.camera.position.y = 400
    this.camera.position.z = 400

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()

    this.currentlySelected = null

    let geometry = new BoxGeometry( 500, 40, 500 )
    let material = new MeshBasicMaterial( {color: 0x88a56f} )
    this.ground = new Mesh( geometry, material )
    this.ground.position.y = -30
    this.ground.name = 'ground'
    this.scene.add( this.ground )

    this.allFlowers = []

    setInterval(this.update, 1000)
    this.plantSeed()
    window.addEventListener('resize', this.onResize)
    window.addEventListener( 'mousemove', this.onMouseMove, false )
    document.querySelector('canvas').addEventListener( 'click', this.select, false )
    document.querySelector('#plant').addEventListener( 'click', () => {
      document.body.classList.toggle('plantSeed')
      document.querySelector('#plant').classList.toggle('selected')
    }, false )

    document.querySelector('#water').addEventListener('click',() => {water(this.allFlowers, this.scene)},false)
    document.querySelector('#sun').addEventListener('click',() => {sun(this.allFlowers, this.scene)},false)
    document.querySelector('#love').addEventListener('click',() => {love(this.allFlowers, this.scene)},false)

    document.querySelector('.levelManagement').addEventListener('click',this.levelManagement,false) 
    this.i = 0

    const loader = new TextureLoader();
    const bgTexture = loader.load('../styles/images/flowers.jpg');
    this.scene.background = bgTexture;
    
    setInterval( () => {
      this.allFlowers.forEach( flower => {
        checkIllness(flower, this.currentlySelected, this.scene)
      })
      if(this.currentlySelected != null){
        elementOnScene(this.currentlySelected, this.scene).forEach( item =>{
          item.material.color.set("#f23d3d")
        })
      }
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
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    let id = null
    let currentFlowerOnScene = null
    let type = null
    if(typeof intersects[0] === 'object'){
      id = intersects[0].object.idFlower
      currentFlowerOnScene = elementOnScene(id, this.scene)
      type = intersects[0].object.type
      if(this.currentlySelected === id ){
        currentFlowerOnScene.forEach(element => {
          element.isSelected = true
        })
      }
      this.currentlySelected = id
      const flower = flowerInFlowers(id, this.allFlowers)
      if(type === 'flower'){
        document.querySelector('#infoSelected').classList.remove('hidden')
        document.querySelector('#flowerName').innerHTML = flower.idFlower
        updateSunshineLevel(flower)
        updateWateringLevel(flower)
        updateGrowthLevel(flower)
        document.querySelector('#growthLevel').value = flower.growthLevel
        document.querySelector('#growth').innerHTML = flower.growthLevel + '%'
        currentFlowerOnScene.forEach( element => {
          if(element.isSelected != true){
            element.material.color.set( 0xf23d3d )
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

  
  plantSeed(){
    window.addEventListener( 'click', () => {
      if(document.querySelector('#plant').classList.value === 'selected'){
        this.raycaster.setFromCamera( this.mouse, this.camera )
        const intersects = this.raycaster.intersectObjects( this.scene.children )
        if(intersects[ 0 ]) {
          if(intersects[ 0 ].object.name === 'ground'){
            if(document.querySelector('#plant').disabled != true){
              if(flowerAtPosition(intersects[ 0 ].point.x,intersects[ 0 ].point.z, this.allFlowers) === false){
                let newFlower
                let randomFlower = Math.floor(Math.random() * (2 - 0) + 0)
                if(randomFlower === 0) {
                  newFlower = new Myosotis(this.flowerNames[0],intersects[ 0 ].point.x,-5,intersects[ 0 ].point.z,this.clock.getElapsedTime())
                } else if (randomFlower === 1) {
                  newFlower = new Sunflower(this.flowerNames[0],intersects[ 0 ].point.x,-5,intersects[ 0 ].point.z,this.clock.getElapsedTime())
                }
                this.flowerNames = this.flowerNames.filter(item => item !== this.flowerNames[0])
                this.allFlowers.push(newFlower)
                newFlower.Lsystem("B",1,this.scene)
                let stateInterval = setInterval(() => {
                  this.nextState(newFlower)
                  if(newFlower.growthLevel >= 100){
                    clearInterval(stateInterval)
                  }
                },4000)
                if(this.flowerNames.length === 0){
                  document.querySelector('#plant').classList.add('hidden')
                  document.body.classList.remove('plantSeed')
                  document.querySelector('#error').innerHTML = "Tu ne peux plus planter de graine mais tu en as déjà bien assez à t'occuper, tu ne crois pas ?"
                  setTimeout(() => { document.querySelector('#error').innerHTML = ""}, 3000)
                }
              } else {
                document.querySelector('#error').innerHTML = "Une fleur est déjà plantée à cette position (ou à proximité) !"
                setTimeout(() => {
                  document.querySelector('#error').innerHTML = ""
                }, 2000)
              }
            } 
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
      if(Math.floor(this.clock.getElapsedTime() - flower.creationTime)% (4*this.levelCoeff) ===0){
        if(flower.wateringLevel > 0 ){
          flower.wateringLevel -= 5
        }
      }
      if(Math.floor(this.clock.getElapsedTime() - flower.creationTime)% (6*this.levelCoeff) ===0){
        if(flower.sunshineLevel > 0 ){
          flower.sunshineLevel -= 5
        }
      }  
      if(this.currentlySelected === flower.idFlower){
        updateWateringLevel(flower)
        updateSunshineLevel(flower)
        updateGrowthLevel(flower)
      }

    })
  }
  levelManagement(e){
    const choice = e.target.innerHTML
    document.querySelectorAll('.levelManagement button').forEach(element => { element.classList.remove('selected')})
    e.target.classList.add('selected')
    switch (choice) {
      case 'Facile' : 
        this.levelCoeff = 2
        break
      case 'Normal' : 
        this.levelCoeff = 1
        break;
      case 'Difficile' :
        this.levelCoeff = 0.5
        break;
    }

  }

  nextState(flower){
    if(flower.growthLevel >=5 && flower.growthLevel<=10){
      flower.state =0
    }
    if(flower.growthLevel >= 20 && flower.growthLevel<=50){
      flower.state = 1
    }
    if(flower.growthLevel >= 55 && flower.growthLevel<=100){
      flower.state = 2
    }
    const cubeIll = elementOnScene(flower.idFlower, this.scene).filter(element => element.ill ===true)
    if(flower.growthLevel >=5 && flower.growthLevel<10){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",1,this.scene)
    }
    if(flower.growthLevel >=10 && flower.growthLevel<15){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=15 && flower.growthLevel<20){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >=20 && flower.growthLevel<35){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",1,this.scene)
    }
    if(flower.growthLevel >=35 && flower.growthLevel<50){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=50 && flower.growthLevel<70){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=70 && flower.growthLevel<100){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >= 100){
      removeElement(flower.idFlower, this.scene)
      flower.Lsystem("B",4,this.scene)
    }
    stayIll(flower,cubeIll, this.scene)
    if(this.currentlySelected === flower.idFlower){
      elementOnScene(flower.idFlower, this.scene).forEach( item =>{
        item.material.color.set("#f23d3d")
      })
    }
  }
  start () {
    requestAnimationFrame( this.start )

    let d = new Date(this.clock.getElapsedTime() * 1000)
    document.querySelector('#timer').innerHTML = d.getMinutes() + ' min ' +  d.getSeconds() + ' s'
    
    this.controls.update()
	  this.renderer.render( this.scene, this.camera )
  }
}
