import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight, Vector3 } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import Cube from './objects/Cube'

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

    this.camera.position.z = 100

    //Axiome + nombre d'itérations
    this.runKoch("B",3)

    this.time = 0

    window.addEventListener('resize', this.onResize)
  }

  createCube(x,y,z,r,c){
    this.line = new Cube(x, y, z, r, c)
    this.scene.add(this.line)
  }

  runKoch(init,n){
    let x =-10
    let y =-10
    let z=0
    let r=0
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
        this.createCube(x,y,z,r,'#FF0000')
        this.createCube(x+5,y,z,r,'#FF0000')
        /*x+=5*Math.cos(r);*/
        y+=5
      } else if(c=="T"){
        c=str
        this.createCube(x,y,z,r,'#00FF00')
        y+=5
      } else if(c=="S"){
        c=str
        this.createCube(x,y,z,r,'#0000FF')
        this.createCube(x+5,y,z,r,'#0000FF')
        y+=5
      } else if(c=="B"){
        c=str
        this.createCube(x,y,z,r,'#582900')
        y+=5
      }
      else if(c=="-"){
        r+=Math.PI/2
      }
      else if(c=="+"){
        r+=-(Math.PI/2)
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
