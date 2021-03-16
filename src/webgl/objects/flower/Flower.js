import { Vector3 } from 'three'
import Cube from '../Cube'


export default class Flower {
    constructor(id,x,y,z,creationTime,scene){
        this.createCube = this.createCube.bind(this)
        this.isGrowing = this.isGrowing.bind(this)

        this.idFlower = id
        this.position = new Vector3(x,y,z)
        this.isSelected = false

        this.creationTime = creationTime

        this.wateringLevel = 10
        this.sunshineLevel = 10
        this.growthLevel = 0

        setInterval(this.isGrowing, 5000)
    }

    setIsSelected (isSelected){
        this.isSelected = isSelected
    }

    isGrowing(){
        if (this.sunshineLevel <= 80 && this.sunshineLevel >= 60){
          if(this.wateringLevel <= 80 && this.wateringLevel >= 60){
            if(this.growthLevel < 100){
              this.growthLevel += 5
            }
          }
        }
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
}