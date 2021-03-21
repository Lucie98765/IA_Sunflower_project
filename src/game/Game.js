import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, DirectionalLight, Raycaster,Vector2, BoxGeometry, MeshBasicMaterial, Mesh, Clock, TextureLoader } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import {checkIllness} from './features/illness'
import {elementOnScene, flowerInFlowers} from './features/sceneManagement'
import {water, sun, love, updateSunshineLevel, updateWateringLevel, updateGrowthLevel, update} from './features/dipsticks'
import {plantSeed} from './features/plantManagement'

export default class Game {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.select = this.select.bind(this)

    this.scene = new Scene()
    this.scene.background = new Color(0xa9cfe3)
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.renderer = new WebGLRenderer({ antialias: false, alpha:true })
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.ambientLight = new AmbientLight (0xffffff, 1)
    this.scene.add(this.ambientLight)
    this.spotlight1 = new SpotLight( 0xffffff, 0.5 )
    this.spotlight1.position.set(0, 600, 0)
    this.spotlight1.focus = 1
    this.scene.add(this.spotlight1)

    this.clock = new Clock()
    this.clock.start()

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
    this.ground.receiveShadow = true;
    this.scene.add( this.ground )

    this.allFlowers = []

    setInterval(() => { update(this.allFlowers, this.clock, this.levelCoeff, this.currentlySelected) }, 1000)
    plantSeed(this.raycaster, this.mouse, this.camera, this.clock, this.scene, this.allFlowers, this.currentlySelected)
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
            document.querySelector('#flowerName').innerHTML = ''
            if(element.ill) {
              element.material.color.set("#211a01") // change color if ill
            } 
          }
        })
      } else {
        document.querySelector('#flowerName').innerHTML = ''
        this.currentlySelected = null
      }
    } else {
      document.querySelector('#flowerName').innerHTML = ''
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

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  levelManagement(e){
    const choice = e.target.innerHTML
    document.querySelectorAll('.levelManagement button').forEach(element => { element.classList.remove('selected')})
    document.querySelectorAll('.levelManagement button').forEach( element => {
      if(element === e.target){
        e.target.classList.add('selected')
      }
    })
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

  start () {
    requestAnimationFrame( this.start )

    let d = new Date(this.clock.getElapsedTime() * 1000)
    document.querySelector('#timer').innerHTML = d.getMinutes() + ' min ' +  d.getSeconds() + ' s'
    
    this.controls.update()
	  this.renderer.render( this.scene, this.camera )
  }
}
