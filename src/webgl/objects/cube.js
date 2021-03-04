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
    
    this.trueColor = c; 
    this.illColor = "#0000FF"

    if(this.ill){
      material.color.set(this.illColor)
    } else {
      material.color.set(this.trueColor)
    }
  }

  update() {
  }

}