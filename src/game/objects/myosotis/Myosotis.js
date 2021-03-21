import Flower from '../flower/Flower'

const sentence = 'TB'

export default class Myosotis extends Flower{
  constructor(id,x,y,z,creationTime,scene){
    super(id,x,y,z,creationTime,scene)
    this.flower = this.flower.bind(this)
    this.grid = new Array()

    this.string = sentence

    this.state = 0
    this.rotation = Math.floor(Math.random() * (4 - 0) + 0)

    this.randomForColor = Math.floor(Math.random() * (2 - 0) + 0)
    if (this.randomForColor === 0) this.randomColor = "#e0a6a3"
    if (this.randomForColor === 1) this.randomColor = "#3179e7"
  }

  createCube(x,y,z,c,scene){
    super.createCube(x,y,z,c,scene)
    this.cube.type = 'flower'
  }

  flower(x, y, z,scene,coeffRotation,rotation){
    super.createCube(x,y,z,'#008528', scene)
    if(rotation === 0 ){
      super.createCube(5*(1+coeffRotation)+x,y,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x+5,y,z,'#FFD000', scene)
      super.createCube(5*(1+coeffRotation)+x+5,y+5,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x+5,y-5,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x+5,y,z+5,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x+5,y,z-5,this.randomColor, scene)
    } else if (rotation === 2){
      super.createCube(5*(1+coeffRotation)+x,y,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x-5,y,z,'#FFD000', scene)
      super.createCube(5*(1+coeffRotation)+x-5,y+5,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x-5,y-5,z,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x-5,y,z+5,this.randomColor, scene)
      super.createCube(5*(1+coeffRotation)+x-5,y,z-5,this.randomColor, scene)
    } else if(rotation === 1){
      super.createCube(x,y,5*(1+coeffRotation)+z,this.randomColor, scene)
      super.createCube(x,y+5,5*(1+coeffRotation)+z+5,this.randomColor, scene)
      super.createCube(x,y-5,5*(1+coeffRotation)+z+5,this.randomColor, scene)
      super.createCube(x,y,5*(1+coeffRotation)+z+5,'#FFD000', scene)
      super.createCube(x+5,y,5*(1+coeffRotation)+z+5,this.randomColor, scene)
      super.createCube(x-5,y,5*(1+coeffRotation)+z+5,this.randomColor, scene)
    } else {
      super.createCube(x,y,5*(1+coeffRotation)+z,this.randomColor, scene)
      super.createCube(x,y+5,5*(1+coeffRotation)+z-5,this.randomColor, scene)
      super.createCube(x,y-5,5*(1+coeffRotation)+z-5,this.randomColor, scene)
      super.createCube(x,y,5*(1+coeffRotation)+z-5,'#FFD000', scene)
      super.createCube(x+5,y,5*(1+coeffRotation)+z-5,this.randomColor, scene)
      super.createCube(x-5,y,5*(1+coeffRotation)+z-5,this.randomColor, scene)
    } 
  }

  Lsystem(init,n,scene){
    let string = ""
    let position = []
    if(this.state === 0 ){
      string = this.string
    }
    if(this.state === 1 ){
      string = this.string.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
    }
    if(this.state === 2 ){
      const phase1 = this.string.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
      string = phase1.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
      if(n===4){
        string = string + "TTTTF-F-F-F" // juste pour "finir" un peu la plante
      }
    }
    //pour faire la rotation
    let rotation = this.rotation
    let x =-10
    let y =-10
    let z=0
    x+= this.position.x
    y+= this.position.y
    z+= this.position.z
    let instruction=init;
    let str = string
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
    instruction.split('').forEach((c) => {
      if (c=="[") {
        position = [x, y, z]
      } else if(c=="T"){
        c=str
        super.createCube(x,y,z,'#008528',scene)
        y+=5
      } else if(c=="F"){
        c=str
        if(rotation === 0 ){
          this.flower(x,y,z,scene,0,rotation)
        }
        if(rotation === 1){
          this.flower(x,y,z,scene,0,rotation)
        }
        if(rotation === 2){
          this.flower(x,y,z,scene,-2,rotation)
        }
        if(rotation === 3){
          this.flower(x,y,z,scene,-2,rotation)
        }
        y+=5
      } else if(c=="B"){
        c=str
        super.createCube(x,y,z,'#008528',scene)
        y+=5
      } else if(c=="-"){
        rotation++
        if(rotation ===4){
          rotation = 0
        }
      } else if (c=="|"){
        if (rotation === 0) {
          rotation = 2
        } else if (rotation === 1) {
          rotation = 3
        }else if (rotation === 2) {
          rotation = 0
        }else if (rotation === 3) {
          rotation = 1
        }
      } else if (c==">"){
        if (rotation === 0) {
          x+=5
        } else if (rotation === 1) {
          z+=5
        }else if (rotation === 2) {
          x-=5
        }else if (rotation === 3) {
          z-=5
        }
      } else if (c=="]"){
        x = position[0]
        y = position[1]
        z = position[2]
      }
    })
  }
}