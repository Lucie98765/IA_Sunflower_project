export const elementOnScene = (idElement, scene) => {
    let elements = []
    scene.children.forEach(element => {
      if(element.idFlower === idElement){
        elements.push(element)
      }
    })
    return elements    
  }