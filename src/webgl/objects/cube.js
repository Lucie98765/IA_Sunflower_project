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
    this.illColor = "#211a01"

  }

  setIll(value){
    this.ill = value
    this.checkIll()
  }

  checkIll(){
    if(this.ill){
      this.material.color.set("#211a01")
    } else {
      this.material.color.set(this.trueColor)
    }
  }

}