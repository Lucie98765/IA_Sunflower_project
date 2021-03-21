export const elementOnScene = (idElement, scene) => {
    let elements = []
    scene.children.forEach(element => {
      if(element.idFlower === idElement){
        elements.push(element)
      }
    })
    return elements    
}

export const flowerAtPosition = (x,z, allFlowers) => {
    let result = false
    allFlowers.forEach ( flower => {
      if((x >= flower.position.x - 15 &&  x < flower.position.x + 15) && (z >= flower.position.z - 15 &&  z < flower.position.z + 15)){
        result =true
      }
    })
    return result
}

export const removeElement = (idElement, scene) => {
    const flower = elementOnScene(idElement, scene)
    flower.forEach(element => scene.remove(element) )
}
  
export const flowerInFlowers = (idFlower, allFlowers) => {
    let currentFlower =''
    allFlowers.forEach(flower => {
        if(flower.idFlower === idFlower){
        currentFlower = flower
        }
    })
    return currentFlower
}

export const highestPoint = (idFlower, scene) => {
    let temporary = elementOnScene(idFlower, scene)[0].position.y
    elementOnScene(idFlower, scene).forEach( item => {
      if(temporary < item.position.y){
        temporary = item.position.y
      }
    })
    return temporary
  }