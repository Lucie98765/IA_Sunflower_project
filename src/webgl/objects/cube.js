import { BoxGeometry, MeshPhysicalMaterial, Mesh } from 'three'

export default class Cube extends Mesh {

  constructor(x,y,z,c, ill) {
    const geometry = new BoxGeometry( 5,5,5);
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    //ill : true = bloc malade, false = bloc sain
    
    this.ill = ill
    this.trueColor = c; 
    this.illColor = "#0000FF"

  }

  update() {
  }

  setIll(value){
    this.ill = value
    this.checkIll()
  }

  checkIll(){
    if(this.ill){
      //console.log(this.ill, this)
      this.material.color.set("#0000FF")
      //console.log(this.material.color)
    } else {
      this.material.color.set(this.trueColor)
    }
  }

}