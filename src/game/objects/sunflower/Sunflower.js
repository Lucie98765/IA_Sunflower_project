import Flower from '../flower/Flower'

const sentences = [
  ['TTT-B','TTTF-TTTT-TTTF-TB','TTTF-TTTS-TTTF-TB'],
  ['TTT-B','TTFT-TTTT-TTTT--TB','TTFT-TSTT-TFTT--TB'],
  ['TTT-B','TTTT-TTFTT-TTTTT-TB','TTTTS-TTFTT-TTTTS-TB'],
  ['TTT-B','TT-TF-TT-TB','TT-TF-TS-TB']
]

export default class Sunflower extends Flower{
  constructor(id,x,y,z,creationTime,scene){
    super(id,x,y,z,creationTime,scene)
    this.flower = this.flower.bind(this)
    this.leaf = this.leaf.bind(this)
    this.grid = new Array()
    const min=0 
    const max=4 
    const random = Math.random() * (max - min) + min
    this.string = sentences[Math.floor(random)]

    this.state = 0
  }

  createCube(x,y,z,c,scene){
    super.createCube(x,y,z,c,scene)
    this.cube.type = 'flower'
  }

  flower(x, y, z,scene,coeffRotation,rotation){
    super.createCube(x,y,z,'#008528', scene)
    if(rotation === 0 || rotation === 2){
      super.createCube(5*(1+coeffRotation)+x,y,z,'#008528', scene)
      super.createCube(5*(1+coeffRotation)+x,y+5,z,'#008528', scene)
      super.createCube(x+10+coeffRotation*10,y+5,z,'#008528', scene)

      super.createCube(15*(1+coeffRotation)+x,y+5,z,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y,z,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y+10,z,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y+5,z+5,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y,z+5,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y+10,z+5,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y+5,z-5,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y,z-5,'#3f2204', scene)
      super.createCube(15*(1+coeffRotation)+x,y+10,z-5,'#3f2204', scene)

      super.createCube(20*(1+coeffRotation)+x,y+10,z-15,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z-15,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z-15,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+15,z-10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+10,z-10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z-10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z-10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-5,z-10,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+20,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+15,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+10,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-5,z-5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-10,z-5,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+20,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+15,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+10,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-5,z,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-10,z,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+20,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+15,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+10,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-5,z+5,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-10,z+5,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+15,z+10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+10,z+10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z+10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z+10,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y-5,z+10,'#fef058', scene)

      super.createCube(20*(1+coeffRotation)+x,y+10,z+15,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y+5,z+15,'#fef058', scene)
      super.createCube(20*(1+coeffRotation)+x,y,z+15,'#fef058', scene)

      super.createCube(25*(1+coeffRotation)+x,y+5,z,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y,z,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y-5,z,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+10,z,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+15,z,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+5,z+5,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+5,z+10,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+5,z-10,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y,z+5,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+10,z+5,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+5,z-5,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y,z-5,'#3f2204', scene)
      super.createCube(25*(1+coeffRotation)+x,y+10,z-5,'#3f2204', scene)
  }
  if(rotation === 1 || rotation === 3){
    super.createCube(+x,y,5*(1+coeffRotation)+z,'#008528', scene)
    super.createCube(+x,y+5,5*(1+coeffRotation)+z,'#008528', scene)
    super.createCube(x,y+5,z+10+coeffRotation*10,'#008528', scene)

    super.createCube(x,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y,z+15*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y,z+15*(1+coeffRotation),'#3f2204', scene)
    

    super.createCube(x-15,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-15,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-15,y,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x-10,y+15,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-10,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-10,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-10,y,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-10,y-5,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x-5,y+20,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y+15,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y-5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x-5,y-10,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x,y+20,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y+15,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y-5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x,y-10,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x+5,y+20,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y+15,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y-5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+5,y-10,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x+10,y+15,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+10,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+10,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+10,y,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+10,y-5,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x+15,y+10,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+15,y+5,z+20*(1+coeffRotation),'#fef058', scene)
    super.createCube(x+15,y,z+20*(1+coeffRotation),'#fef058', scene)

    super.createCube(x,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y-5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x,y+15,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+10,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-10,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x+5,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y,z+25*(1+coeffRotation),'#3f2204', scene)
    super.createCube(x-5,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
    }    
  }

  leaf(x, y, z,scene,coeffRotation,rotation){
    super.createCube(x,y,z,'#008528', scene)
    if(rotation === 0 || rotation === 2){
      super.createCube(x+5*(1+coeffRotation),y,z,'#008528', scene)
      super.createCube(x+5*(1+coeffRotation),y+5,z,'#008528', scene)

      super.createCube(x+10*(1+coeffRotation),y+5,z,'#008528', scene)
      super.createCube(x+10*(1+coeffRotation),y+10,z,'#008528', scene)
      super.createCube(x+10*(1+coeffRotation),y+5,z+5,'#008528', scene)
      super.createCube(x+10*(1+coeffRotation),y+10,z+5,'#008528', scene)
      super.createCube(x+10*(1+coeffRotation),y+5,z-5,'#008528', scene)
      super.createCube(x+10*(1+coeffRotation),y+10,z-5,'#008528', scene)   
      
      super.createCube(x+15*(1+coeffRotation),y+5,z,'#008528', scene)
      super.createCube(x+15*(1+coeffRotation),y+10,z,'#008528', scene)
      super.createCube(x+15*(1+coeffRotation),y+5,z+5,'#008528', scene)
      super.createCube(x+15*(1+coeffRotation),y+10,z+5,'#008528', scene)
      super.createCube(x+15*(1+coeffRotation),y+5,z-5,'#008528', scene)
      super.createCube(x+15*(1+coeffRotation),y+10,z-5,'#008528', scene)
      
      super.createCube(x+20*(1+coeffRotation),y+10,z,'#008528', scene)
      super.createCube(x+20*(1+coeffRotation),y+15,z,'#008528', scene)
      super.createCube(x+20*(1+coeffRotation),y+10,z+5,'#008528', scene)
      super.createCube(x+20*(1+coeffRotation),y+15,z+5,'#008528', scene)
      super.createCube(x+20*(1+coeffRotation),y+10,z-5,'#008528', scene)
      super.createCube(x+20*(1+coeffRotation),y+15,z-5,'#008528', scene)

      super.createCube(x+25*(1+coeffRotation),y+10,z,'#008528', scene)
      super.createCube(x+25*(1+coeffRotation),y+15,z,'#008528', scene)
      super.createCube(x+25*(1+coeffRotation),y+10,z+5,'#008528', scene)
      super.createCube(x+25*(1+coeffRotation),y+15,z+5,'#008528', scene)
      super.createCube(x+25*(1+coeffRotation),y+10,z-5,'#008528', scene)
      super.createCube(x+25*(1+coeffRotation),y+15,z-5,'#008528', scene)
      
      super.createCube(x+30*(1+coeffRotation),y+15,z,'#008528', scene) 
      super.createCube(x+30*(1+coeffRotation),y+20,z,'#008528', scene)
      super.createCube(x+30*(1+coeffRotation),y+15,z+5,'#008528', scene) 
      super.createCube(x+30*(1+coeffRotation),y+20,z+5,'#008528', scene)
      super.createCube(x+30*(1+coeffRotation),y+15,z-5,'#008528', scene) 
      super.createCube(x+30*(1+coeffRotation),y+20,z-5,'#008528', scene)
      
      super.createCube(x+35*(1+coeffRotation),y+15,z,'#008528', scene) 
      super.createCube(x+35*(1+coeffRotation),y+20,z,'#008528', scene)
      
      super.createCube(x+40*(1+coeffRotation),y+20,z,'#008528', scene) 
    }
    if(rotation === 1 || rotation === 3){
      super.createCube(x,y,z+5*(1+coeffRotation),'#008528', scene)
      super.createCube(x,y+5,z+5*(1+coeffRotation),'#008528', scene)

      super.createCube(x,y+5,z+10*(1+coeffRotation),'#008528', scene)
      super.createCube(x,y+10,z+10*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+5,z+10*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+10,z+10*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+5,z+10*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+10,z+10*(1+coeffRotation),'#008528', scene)   
      
      super.createCube(x,y+5,z+15*(1+coeffRotation),'#008528', scene)
      super.createCube(x,y+10,z+15*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+5,z+15*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+10,z+15*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+5,z+15*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+10,z+15*(1+coeffRotation),'#008528', scene)
      
      super.createCube(x,y+10,z+20*(1+coeffRotation),'#008528', scene)
      super.createCube(x,y+15,z+20*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+10,z+20*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+15,z+20*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+10,z+20*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+15,z+20*(1+coeffRotation),'#008528', scene)

      super.createCube(x,y+10,z+25*(1+coeffRotation),'#008528', scene)
      super.createCube(x,y+15,z+25*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+10,z+25*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+15,z+25*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+10,z+25*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+15,z+25*(1+coeffRotation),'#008528', scene)
      
      super.createCube(x,y+15,z+30*(1+coeffRotation),'#008528', scene) 
      super.createCube(x,y+20,z+30*(1+coeffRotation),'#008528', scene)
      super.createCube(x+5,y+15,z+30*(1+coeffRotation),'#008528', scene) 
      super.createCube(x+5,y+20,z+30*(1+coeffRotation),'#008528', scene)
      super.createCube(x-5,y+15,z+30*(1+coeffRotation),'#008528', scene) 
      super.createCube(x-5,y+20,z+30*(1+coeffRotation),'#008528', scene)
      
      super.createCube(x,y+15,z+35*(1+coeffRotation),'#008528', scene) 
      super.createCube(x,y+20,z+35*(1+coeffRotation),'#008528', scene)
      
      super.createCube(x,y+20,z+40*(1+coeffRotation),'#008528', scene) 
    }    
  }
    
  Lsystem(init,n,scene){
    let string = ""
    if(this.state === 0 ){
      string = this.string[0]
    }
    if(this.state === 1 ){
      string = this.string[1]
    }
    if(this.state === 2 ){
      string = this.string[2]
    }
    //pour faire la rotation
    let rotation = 0
    let x =-10
    let y =-10
    let z=0
    x+= this.position.x
    y+= this.position.y
    z+= this.position.z
    let instruction=init
    let str = string
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
        if(rotation === 0){
          this.leaf(x,y,z,scene,0,rotation)
        }
        if(rotation === 1){
          this.leaf(x,y,z,scene,0,rotation)
        }
        if(rotation === 2){
          this.leaf(x,y,z,scene,-2,rotation)
        }
        if(rotation === 3){
          this.leaf(x,y,z,scene,-2,rotation)
        }
        y+=5
      } else if(c=="T"){
        c=str
        super.createCube(x,y,z,'#008528',scene)
        y+=5
      } else if(c=="S"){
        c=str
        if(rotation === 0){
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
        super.createCube(x,y,z,'#582900',scene)
        y+=5
      }
      else if(c=="-"){
        rotation++
        if(rotation ===4){
          rotation = 0
        }
      }
      else if(c=="+"){
        rotation--
        if(rotation<0){
          rotation = 0
        }
      }
    })
  }
}