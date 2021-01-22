import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Vector3 } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Cube from './objects/Cube'
import Sunflower from './objects/sunflower/Sunflower'

export default class Webgl {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)

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
    this.scene.add(this.spotlight2)

    this.camera.position.z = 200
    this.camera.position.y = 400

    this.sunflower = new Sunflower('sunflower1')
    
    //Axiome + nombre d'itérations
    this.runKoch("B",4)

    this.time = 0

    window.addEventListener('resize', this.onResize)
  }

  createCube(x,y,z,c){
    this.cube = new Cube(x, y, z, c)
    this.scene.add(this.cube)
  }

  runKoch(init,n){
    //pour faire la rotation
    let rotation = 0
    let x =-10
    let y =-10
    let z=0
    //let r=0
    let instruction=init;
    let str = "TTTF-TTTF-TTTF-TTTS-TB";
    for(let i=0;i<n;i++){
      let tmp=''
      instruction.split('').forEach((c) => {
        if(c=="B"){
          tmp+=str
        }
        else{
          tmp+=c
        }
      })
      instruction=tmp;
    }
    instruction.split('').forEach((c) => {
      if(c=="F"){
        c=str
        //this.createCube(x,y,z,'#FF0000')
        if(rotation === 0){
          //this.createCube(x+5,y,z,'#FF0000')
          console.log('coucou')
          this.sunflower.leaf(x,y,z,this.scene,0,rotation)
        }
        if(rotation === 1){
          //this.createCube(x,y,z+5,'#FF0000')
          //this.createCube(x,y,z+10,'#FF0000')
          this.sunflower.leaf(x,y,z,this.scene,0,rotation)
        }
        if(rotation === 2){
          //this.createCube(x-5,y,z,'#FF0000')
          this.sunflower.leaf(x,y,z,this.scene,-2,rotation)
        }
        if(rotation === 3){
          //this.createCube(x,y,z-5,'#FF0000')
          this.sunflower.leaf(x,y,z,this.scene,-2,rotation)
        }
        /*x+=5*Math.cos(r);*/
        y+=5
      } else if(c=="T"){
        c=str
        this.createCube(x,y,z,'#00FF00')
        y+=5
      } else if(c=="S"){
        c=str
        //this.createCube(x,y,z,'#0000FF')
        if(rotation === 0){
          //this.createCube(x+5,y,z,'#0000FF')
          this.sunflower.flower(x,y,z,this.scene,0,rotation)
        }
        if(rotation === 1){
          //this.createCube(x,y,z+5,'#0000FF')
          this.sunflower.flower(x,y,z,this.scene,0,rotation)
        }
        if(rotation === 2){
          //this.createCube(x-5,y,z,'#0000FF')
          this.sunflower.flower(x,y,z,this.scene,-2,rotation)
        }
        if(rotation === 3){
          //this.createCube(x,y,z-5,'#0000FF')
          this.sunflower.flower(x,y,z,this.scene,-2,rotation)
        }
        y+=5
      } else if(c=="B"){
        c=str
        this.createCube(x,y,z,'#582900')
        y+=5
      }
      else if(c=="-"){
        if(rotation ===3){
          rotation = 0
        }
        rotation++
        //r+=Math.PI/2
      }
      else if(c=="+"){
        rotation--
        if(rotation<0){
          rotation = 0
        }
        //r+=-(Math.PI/2)
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
