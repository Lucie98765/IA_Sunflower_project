import { Vector3 } from 'three'
import Cube from '../Cube'

export default class Sunflower {
    constructor(id,x,y,z,creationTime){
        this.createCube = this.createCube.bind(this)
        this.flower = this.flower.bind(this)
        this.leaf = this.leaf.bind(this)
        this.idFlower = id
        this.position = new Vector3(x,y,z)
        this.isSelected = false

        this.creationTime = creationTime

        this.wateringLevel = 10
        this.sunshineLevel = 10
        this.growthLevel = 0

        this.grid = new Array()
    }

    createCube(x,y,z,c,scene){
        this.cube = new Cube(x, y, z, c, false)
        this.cube.type = 'flower'
        this.cube.idFlower = this.idFlower
        this.cube.trueColor = c
        scene.add(this.cube)
        this.grid.push(this.cube)
        this.cube.isSelected = false
    }

    flower(x, y, z,scene,coeffRotation,rotation){
        const c= '#0000FF'
        this.createCube(x,y,z,'#00FF00', scene)
        if(rotation === 0 || rotation === 2){
            this.createCube(5*(1+coeffRotation)+x,y,z,'#00FF00', scene)
            this.createCube(5*(1+coeffRotation)+x,y+5,z,'#00FF00', scene)
            this.createCube(x+10+coeffRotation*10,y+5,z,'#00FF00', scene)

            this.createCube(15*(1+coeffRotation)+x,y+5,z,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y,z,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y+10,z,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y+5,z+5,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y,z+5,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y+10,z+5,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y+5,z-5,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y,z-5,'#3f2204', scene)
            this.createCube(15*(1+coeffRotation)+x,y+10,z-5,'#3f2204', scene)

            this.createCube(20*(1+coeffRotation)+x,y+10,z-15,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z-15,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z-15,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+15,z-10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+10,z-10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z-10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z-10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-5,z-10,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+20,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+15,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+10,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-5,z-5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-10,z-5,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+20,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+15,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+10,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-5,z,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-10,z,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+20,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+15,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+10,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-5,z+5,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-10,z+5,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+15,z+10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+10,z+10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z+10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z+10,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y-5,z+10,'#fef058', scene)

            this.createCube(20*(1+coeffRotation)+x,y+10,z+15,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y+5,z+15,'#fef058', scene)
            this.createCube(20*(1+coeffRotation)+x,y,z+15,'#fef058', scene)

            this.createCube(25*(1+coeffRotation)+x,y+5,z,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y,z,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y-5,z,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+10,z,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+15,z,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+5,z+5,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+5,z+10,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+5,z-10,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y,z+5,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+10,z+5,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+5,z-5,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y,z-5,'#3f2204', scene)
            this.createCube(25*(1+coeffRotation)+x,y+10,z-5,'#3f2204', scene)
        }
        if(rotation === 1 || rotation === 3){
            this.createCube(+x,y,5*(1+coeffRotation)+z,'#00FF00', scene)
            this.createCube(+x,y+5,5*(1+coeffRotation)+z,'#00FF00', scene)
            this.createCube(x,y+5,z+10+coeffRotation*10,'#00FF00', scene)

            this.createCube(x,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y+5,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y+10,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y,z+15*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y,z+15*(1+coeffRotation),'#3f2204', scene)
            

            this.createCube(x-15,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-15,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-15,y,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x-10,y+15,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-10,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-10,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-10,y,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-10,y-5,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x-5,y+20,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y+15,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y-5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x-5,y-10,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x,y+20,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y+15,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y-5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x,y-10,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x+5,y+20,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y+15,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y-5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+5,y-10,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x+10,y+15,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+10,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+10,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+10,y,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+10,y-5,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x+15,y+10,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+15,y+5,z+20*(1+coeffRotation),'#fef058', scene)
            this.createCube(x+15,y,z+20*(1+coeffRotation),'#fef058', scene)

            this.createCube(x,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y-5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x,y+15,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+10,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-10,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x+5,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y+5,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y,z+25*(1+coeffRotation),'#3f2204', scene)
            this.createCube(x-5,y+10,z+25*(1+coeffRotation),'#3f2204', scene)
        }    
    }

    leaf(x, y, z,scene,coeffRotation,rotation){
        this.createCube(x,y,z,'#00FF00', scene)
        if(rotation === 0 || rotation === 2){
            this.createCube(x+5*(1+coeffRotation),y,z,'#00FF00', scene)
            this.createCube(x+5*(1+coeffRotation),y+5,z,'#00FF00', scene)

            this.createCube(x+10*(1+coeffRotation),y+5,z,'#00FF00', scene)
            this.createCube(x+10*(1+coeffRotation),y+10,z,'#00FF00', scene)
            this.createCube(x+10*(1+coeffRotation),y+5,z+5,'#00FF00', scene)
            this.createCube(x+10*(1+coeffRotation),y+10,z+5,'#00FF00', scene)
            this.createCube(x+10*(1+coeffRotation),y+5,z-5,'#00FF00', scene)
            this.createCube(x+10*(1+coeffRotation),y+10,z-5,'#00FF00', scene)   
            
            this.createCube(x+15*(1+coeffRotation),y+5,z,'#00FF00', scene)
            this.createCube(x+15*(1+coeffRotation),y+10,z,'#00FF00', scene)
            this.createCube(x+15*(1+coeffRotation),y+5,z+5,'#00FF00', scene)
            this.createCube(x+15*(1+coeffRotation),y+10,z+5,'#00FF00', scene)
            this.createCube(x+15*(1+coeffRotation),y+5,z-5,'#00FF00', scene)
            this.createCube(x+15*(1+coeffRotation),y+10,z-5,'#00FF00', scene)
            
            this.createCube(x+20*(1+coeffRotation),y+10,z,'#00FF00', scene)
            this.createCube(x+20*(1+coeffRotation),y+15,z,'#00FF00', scene)
            this.createCube(x+20*(1+coeffRotation),y+10,z+5,'#00FF00', scene)
            this.createCube(x+20*(1+coeffRotation),y+15,z+5,'#00FF00', scene)
            this.createCube(x+20*(1+coeffRotation),y+10,z-5,'#00FF00', scene)
            this.createCube(x+20*(1+coeffRotation),y+15,z-5,'#00FF00', scene)

            this.createCube(x+25*(1+coeffRotation),y+10,z,'#00FF00', scene)
            this.createCube(x+25*(1+coeffRotation),y+15,z,'#00FF00', scene)
            this.createCube(x+25*(1+coeffRotation),y+10,z+5,'#00FF00', scene)
            this.createCube(x+25*(1+coeffRotation),y+15,z+5,'#00FF00', scene)
            this.createCube(x+25*(1+coeffRotation),y+10,z-5,'#00FF00', scene)
            this.createCube(x+25*(1+coeffRotation),y+15,z-5,'#00FF00', scene)
            
            this.createCube(x+30*(1+coeffRotation),y+15,z,'#00FF00', scene) 
            this.createCube(x+30*(1+coeffRotation),y+20,z,'#00FF00', scene)
            this.createCube(x+30*(1+coeffRotation),y+15,z+5,'#00FF00', scene) 
            this.createCube(x+30*(1+coeffRotation),y+20,z+5,'#00FF00', scene)
            this.createCube(x+30*(1+coeffRotation),y+15,z-5,'#00FF00', scene) 
            this.createCube(x+30*(1+coeffRotation),y+20,z-5,'#00FF00', scene)
            
            this.createCube(x+35*(1+coeffRotation),y+15,z,'#00FF00', scene) 
            this.createCube(x+35*(1+coeffRotation),y+20,z,'#00FF00', scene)
            
            this.createCube(x+40*(1+coeffRotation),y+20,z,'#00FF00', scene) 
        }
        if(rotation === 1 || rotation === 3){
            this.createCube(x,y,z+5*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x,y+5,z+5*(1+coeffRotation),'#00FF00', scene)

            this.createCube(x,y+5,z+10*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x,y+10,z+10*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+5,z+10*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+10,z+10*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+5,z+10*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+10,z+10*(1+coeffRotation),'#00FF00', scene)   
            
            this.createCube(x,y+5,z+15*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x,y+10,z+15*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+5,z+15*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+10,z+15*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+5,z+15*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+10,z+15*(1+coeffRotation),'#00FF00', scene)
            
            this.createCube(x,y+10,z+20*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x,y+15,z+20*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+10,z+20*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+15,z+20*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+10,z+20*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+15,z+20*(1+coeffRotation),'#00FF00', scene)

            this.createCube(x,y+10,z+25*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x,y+15,z+25*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+10,z+25*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+15,z+25*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+10,z+25*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+15,z+25*(1+coeffRotation),'#00FF00', scene)
            
            this.createCube(x,y+15,z+30*(1+coeffRotation),'#00FF00', scene) 
            this.createCube(x,y+20,z+30*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x+5,y+15,z+30*(1+coeffRotation),'#00FF00', scene) 
            this.createCube(x+5,y+20,z+30*(1+coeffRotation),'#00FF00', scene)
            this.createCube(x-5,y+15,z+30*(1+coeffRotation),'#00FF00', scene) 
            this.createCube(x-5,y+20,z+30*(1+coeffRotation),'#00FF00', scene)
            
            this.createCube(x,y+15,z+35*(1+coeffRotation),'#00FF00', scene) 
            this.createCube(x,y+20,z+35*(1+coeffRotation),'#00FF00', scene)
            
            this.createCube(x,y+20,z+40*(1+coeffRotation),'#00FF00', scene) 
        }    
    }
    
    Lsystem(init,n,scene){
        //pour faire la rotation
        let rotation = 0
        let x =-10
        let y =-10
        let z=0
        x+= this.position.x
        y+= this.position.y
        z+= this.position.z
        //let r=0
        let instruction=init;
        let str = "TTTF-TTTS-TTTF-TTTF-TTTS-TB";
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
            this.createCube(x,y,z,'#00FF00',scene)
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
            this.createCube(x,y,z,'#582900',scene)
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

    setIsSelected (isSelected){
      this.isSelected = isSelected
    }
}