import Cube from '../Cube'

export default class Sunflower {
    constructor(id){
        this.createCube = this.createCube.bind(this)
        //this.position = new Vector3(x+rotation*5,y,z)
        this.idFlower = id
        //this.scene = scene
    }

    createCube(x,y,z,c,scene){
        this.cube = new Cube(x, y, z, c)
        this.cube.idFlower = this.idFlower
        scene.add(this.cube)
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
}