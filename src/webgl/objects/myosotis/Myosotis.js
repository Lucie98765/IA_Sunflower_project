import Flower from '../flower/Flower'

const sentence = 'TB'

export default class Myosotis extends Flower{
    constructor(id,x,y,z,creationTime,scene){
        super(id,x,y,z,creationTime,scene)
        this.flower = this.flower.bind(this)
        this.grid = new Array()

        this.string = sentence

        this.state = 0
    }

    createCube(x,y,z,c,scene){
      super.createCube(x,y,z,c,scene)
      this.cube.type = 'flower'
    }
    // bleu : 3179E7
    // vert : 008528
    // jaune : FFD000

    flower(x, y, z,scene,coeffRotation,rotation){
        super.createCube(x,y,z,'#008528', scene)
        if(rotation === 0 ){
          super.createCube(5*(1+coeffRotation)+x,y,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x+5,y,z,'#FFD000', scene)
          super.createCube(5*(1+coeffRotation)+x+5,y+5,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x+5,y-5,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x+5,y,z+5,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x+5,y,z-5,'#3179E7', scene)
        } else if (rotation === 2){
          super.createCube(5*(1+coeffRotation)+x,y,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x-5,y,z,'#FFD000', scene)
          super.createCube(5*(1+coeffRotation)+x-5,y+5,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x-5,y-5,z,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x-5,y,z+5,'#3179E7', scene)
          super.createCube(5*(1+coeffRotation)+x-5,y,z-5,'#3179E7', scene)
        } else if(rotation === 1){
          super.createCube(x,y,5*(1+coeffRotation)+z,'#3179E7', scene)
          super.createCube(x,y+5,5*(1+coeffRotation)+z+5,'#3179E7', scene)
          super.createCube(x,y-5,5*(1+coeffRotation)+z+5,'#3179E7', scene)
          super.createCube(x,y,5*(1+coeffRotation)+z+5,'#FFD000', scene)
          super.createCube(x+5,y,5*(1+coeffRotation)+z+5,'#3179E7', scene)
          super.createCube(x-5,y,5*(1+coeffRotation)+z+5,'#3179E7', scene)
        } else {
          super.createCube(x,y,5*(1+coeffRotation)+z,'#3179E7', scene)
          super.createCube(x,y+5,5*(1+coeffRotation)+z-5,'#3179E7', scene)
          super.createCube(x,y-5,5*(1+coeffRotation)+z-5,'#3179E7', scene)
          super.createCube(x,y,5*(1+coeffRotation)+z-5,'#FFD000', scene)
          super.createCube(x+5,y,5*(1+coeffRotation)+z-5,'#3179E7', scene)
          super.createCube(x-5,y,5*(1+coeffRotation)+z-5,'#3179E7', scene)
        } 
    }

    // B = T [ > T > B > T > F ] | > T > T > B > T > F ] - > T > T > T > B > T > F ] | > T > T > T > T > B > T > F ]
    /*
      B : bouture; T : tige; F : fleur
      Angle α : 90°
      - : tourner à droite d’un angle α
      | : tourner sur soi même de 180° (= 2 rotations de α)
      [ : sauvegarder la position du cube
      ] : retourner à la position du cube sauvegardé
      > : avancer de 1 dans la direction vers laquelle le cube est tourné (genre x + 1 si tourné vers la droite, z + 1 si vers le fond, x - 1, z - 1)
    */
    Lsystem(init,n,scene){
      let string = ""
      let position = []
        if(this.state === 0 ){
          string = this.string
          console.log("state : O, string : "+string)
        }
        if(this.state === 1 ){
          string = this.string.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
          console.log("state : 1, string : "+string)
        }
        if(this.state === 2 ){
          const phase1 = this.string.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
          string = phase1.replace(/B/g, "T[>T>T>B>T>F]|>T>T>B>T>F]->T>T>B>T>F]|>T>T>B>T>F]")
        }
        //pour faire la rotation
        let rotation = Math.floor(Math.random() * (4 - 0) + 0)
        console.log("rotation"+rotation)
        let x =-10
        let y =-10
        let z=0
        x+= this.position.x
        y+= this.position.y
        z+= this.position.z
        let instruction=init;
        let str = string
        //for(let i=0;i<1;i++){
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
        //}
        instruction.split('').forEach((c) => {
          if (c=="[") {
            position = [x, y, z]
            console.log(position)
          } else if(c=="T"){
            c=str
            super.createCube(x,y,z,'#008528',scene)
            y+=5
          } else if(c=="F"){
            c=str
            if(rotation === 0 ){ //là j'ai modifié un truc, si ça marche pas récup la ligne dans sunflower
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