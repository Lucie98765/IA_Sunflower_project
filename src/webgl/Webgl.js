import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Raycaster,Vector2, BoxGeometry, MeshBasicMaterial, Mesh, Clock, TextureLoader } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Cube from './objects/Cube'
import Sunflower from './objects/sunflower/Sunflower'
import Myosotis from './objects/myosotis/Myosotis'

export default class Webgl {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.select = this.select.bind(this)
    this.update = this.update.bind(this)
    this.flowerInFlowers = this.flowerInFlowers.bind(this)
    this.water =this.water.bind(this)
    this.sun =this.sun.bind(this)
    this.love =this.love.bind(this)

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

    document.querySelector('#water').addEventListener('click',this.water,false)
    document.querySelector('#sun').addEventListener('click',this.sun,false)
    document.querySelector('#love').addEventListener('click',this.love,false)

    document.querySelector('.levelManagement').addEventListener('click',this.levelManagement,false) 
    this.i = 0

    const loader = new TextureLoader();
    const bgTexture = loader.load('../styles/images/flowers.jpg');
    this.scene.background = bgTexture;
    
    setInterval( () => {
      this.allFlowers.forEach( flower => {
        this.checkIllness(flower)
      })
      if(this.currentlySelected != null){
        this.elementOnScene(this.currentlySelected).forEach( item =>{
          item.material.color.set("#f23d3d")
        })
      }
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
          if(flowerElements[k + j]) {
            if(flowerElements[k + j].ill){
              illNeighbour = illNeighbour + 1
            }   
          }
        }
      }
      if (illNeighbour >= 1 && illNeighbour <= 8){
        if(flowerElements[k]){
          flowerElements[k].setIll(true)
        } 
      }
      if (illNeighbour > 9){
        if(flowerElements[k]){
          flowerElements[k].setIll(false)
        } 
      }
    }
  }
  // Rétablissement de la plante
  recover (flowerId, max) {
    let flowerElements = this.elementOnScene(flowerId)
    for(let i = 0; i<max; i++){
      if(flowerElements[i]) {
        if(flowerElements[i].ill){
          setTimeout( () => {
            flowerElements[i].setIll(false)
            if(this.currentlySelected === flowerElements[i].idFlower){
              flowerElements[i].material.color.set("#f23d3d")
            }
          }, 500 )
        }
      }
    }
  }
  stayIll(flower,cubeIll){
    this.elementOnScene(flower.idFlower).forEach( cube => {
      cubeIll.forEach( cubeIll => {
        if(cubeIll.position.x === cube.position.x && cubeIll.position.y === cube.position.y && cubeIll.position.z === cube.position.z){
          cube.setIll(true)
        }
      })
    })
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
        this.updateGrowthLevel(flower)
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
  flowerAtPosition (x,z) {
    let result = false
    this.allFlowers.forEach ( flower => {
      if((x >= flower.position.x - 15 &&  x < flower.position.x + 15) && (z >= flower.position.z - 15 &&  z < flower.position.z + 15)){
        result =true
      }
    })
    return result
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
    this.interactionAnimation(this.flowerInFlowers(idFlower).position.x, this.flowerInFlowers(idFlower).position.z, this.highestPoint(idFlower), '#2fc7ea', idFlower)
    this.updateWateringLevel(currentFlower)
  }
  sun() {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = this.flowerInFlowers(idFlower)
    if(currentFlower.sunshineLevel < 100){
      currentFlower.sunshineLevel += 5
    }
    this.interactionAnimation(this.flowerInFlowers(idFlower).position.x, this.flowerInFlowers(idFlower).position.z, this.highestPoint(idFlower), '#F7FF3C', idFlower)
    this.updateSunshineLevel(currentFlower)
  }
  love() {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = this.flowerInFlowers(idFlower)
    if(currentFlower.growthLevel < 100){
      if((currentFlower.growthLevel + 1) > 100){
        currentFlower.growthLevel = 100
      } else {
        currentFlower.growthLevel += 1
      }
    }
    this.interactionAnimation(this.flowerInFlowers(idFlower).position.x, this.flowerInFlowers(idFlower).position.z, this.highestPoint(idFlower), '#F3C4CF', idFlower)
    this.updateGrowthLevel(currentFlower)
    document.querySelector('#love').disabled = true
    setTimeout(() => {
      document.querySelector('#love').disabled = false
    },5000)
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
    window.addEventListener( 'click', () => {
      if(document.querySelector('#plant').classList.value === 'selected'){
        this.raycaster.setFromCamera( this.mouse, this.camera )
        const intersects = this.raycaster.intersectObjects( this.scene.children )
        if(intersects[ 0 ]) {
          if(intersects[ 0 ].object.name === 'ground'){
            if(document.querySelector('#plant').disabled != true){
              if(this.flowerAtPosition(intersects[ 0 ].point.x,intersects[ 0 ].point.z) === false){
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
        this.updateWateringLevel(flower)
        this.updateSunshineLevel(flower)
        this.updateGrowthLevel(flower)
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
  updateGrowthLevel(flower){
    document.querySelector('#growthLevel').value = flower.growthLevel
    if (flower.growthLevel > 100) {
      document.querySelector('#growth').innerHTML = '100%'
    } else {
      document.querySelector('#growth').innerHTML = flower.growthLevel + '%'
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
    const cubeIll = this.elementOnScene(flower.idFlower).filter(element => element.ill ===true)
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
    if(flower.growthLevel >=20 && flower.growthLevel<35){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",1,this.scene)
    }
    if(flower.growthLevel >=35 && flower.growthLevel<50){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=50 && flower.growthLevel<70){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",2,this.scene)
    }
    if(flower.growthLevel >=70 && flower.growthLevel<100){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",3,this.scene)
    }
    if(flower.growthLevel >= 100){
      this.removeElement(flower.idFlower)
      flower.Lsystem("B",4,this.scene)
    }
    this.stayIll(flower,cubeIll)
    if(this.currentlySelected === flower.idFlower){
      this.elementOnScene(flower.idFlower).forEach( item =>{
        item.material.color.set("#f23d3d")
      })
    }
  }
  highestPoint (idFlower){
    let temporary = this.elementOnScene(idFlower)[0].position.y
    this.elementOnScene(idFlower).forEach( item => {
      if(temporary < item.position.y){
        temporary = item.position.y
      }
    })
    return temporary
  }
  interactionAnimation (x,z,y,c,idFlower) {
      let cube = new Cube (x-10,y+35,z,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x-10,y+30,z+10,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x-10,y+40,z-10,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x-20,y+45,z,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x-20,y+50,z+10,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x-20,y+35,z-10,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x,y+30,z,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x,y+35,z+20,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      cube = new Cube (x,y+40,z-20,c, false)
      cube.type = 'animation'
      cube.idAnim = idFlower
      this.scene.add(cube)
      this.scene.children.forEach( item => {
        if (item.idAnim === cube.idAnim){
          let i = 0
          const animation = setInterval(() => {
            i++
            item.position.y -= 15
            if(item.position.y < y ){
              this.scene.remove(item)
            }
            if(i === 5){
              this.scene.remove(item)
              clearInterval(animation)
            }
          }, 50)
        }
      })
  }
  start () {
    requestAnimationFrame( this.start )

    let d = new Date(this.clock.getElapsedTime() * 1000)
    document.querySelector('#timer').innerHTML = d.getMinutes() + ' min ' +  d.getSeconds() + ' s'
    
    this.controls.update()
	  this.renderer.render( this.scene, this.camera )
  }
}
