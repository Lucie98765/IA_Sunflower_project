import { BoxGeometry, MeshPhysicalMaterial, Mesh } from 'three'

export default class Cube extends Mesh {

  constructor(x,y,z,r,c) {
    const geometry = new BoxGeometry( 5,5,5);
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.rotation.x = r;
  }

  update() {
  }

}