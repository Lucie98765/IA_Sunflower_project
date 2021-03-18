import Flower from '../flower/Flower'

const sentence = 'TTB'
const sentences = [
  ['TTT-B','TTTF-TTTT-TTTF-TB','TTTF-TTTS-TTTF-TB'],
  ['TTT-B','TTFT-TTTT-TTTT--TB','TTFT-TSTT-TSTT--TB'],
  ['TTT-B','TTTT-TTFTT-TTTTT-TB','TTTTS-TTFTT-TTTTS-TB'],
  ['TTT-B','TT-TF-TT-TB','TT-TF-TS-TB']
]

export default class Myosotis extends Flower{
    constructor(id,x,y,z,creationTime,scene){
        super(id,x,y,z,creationTime,scene)
        this.flower = this.flower.bind(this)
        this.leaf = this.leaf.bind(this)
        this.grid = new Array()
        this.string = sentences[Math.floor(random)]

        //this.string = sentence

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
        const c= '#0000FF'
        super.createCube(x,y,z,'#00FF00', scene)
        if(rotation === 0 || rotation === 2){
            super.createCube(5*(1+coeffRotation)+x,y,z,'#FF0000', scene)
            super.createCube(5*(1+coeffRotation)+x,y+5,z,'#FF0000', scene)
            super.createCube(x+10+coeffRotation*10,y+5,z,'#FF0000', scene)

            super.createCube(15*(1+coeffRotation)+x,y+5,z,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y,z,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y+10,z,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y+5,z+5,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y,z+5,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y+10,z+5,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y+5,z-5,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y,z-5,'#FF0000', scene)
            super.createCube(15*(1+coeffRotation)+x,y+10,z-5,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+10,z-15,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z-15,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z-15,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+15,z-10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+10,z-10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z-10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z-10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-5,z-10,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+20,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+15,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+10,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-5,z-5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-10,z-5,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+20,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+15,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+10,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-5,z,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-10,z,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+20,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+15,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+10,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-5,z+5,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-10,z+5,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+15,z+10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+10,z+10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z+10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z+10,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y-5,z+10,'#FF0000', scene)

            super.createCube(20*(1+coeffRotation)+x,y+10,z+15,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y+5,z+15,'#FF0000', scene)
            super.createCube(20*(1+coeffRotation)+x,y,z+15,'#FF0000', scene)

            super.createCube(25*(1+coeffRotation)+x,y+5,z,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y,z,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y-5,z,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+10,z,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+15,z,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+5,z+5,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+5,z+10,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+5,z-10,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y,z+5,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+10,z+5,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+5,z-5,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y,z-5,'#FF0000', scene)
            super.createCube(25*(1+coeffRotation)+x,y+10,z-5,'#FF0000', scene)
        }
        if(rotation === 1 || rotation === 3){
            super.createCube(+x,y,5*(1+coeffRotation)+z,'#00FF00', scene)
            super.createCube(+x,y+5,5*(1+coeffRotation)+z,'#00FF00', scene)
            super.createCube(x,y+5,z+10+coeffRotation*10,'#00FF00', scene)

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
        //let r=0
        let instruction=init;
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
            super.createCube(x,y,z,'#00FF00',scene)
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