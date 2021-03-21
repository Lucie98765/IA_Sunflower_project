import {elementOnScene} from './sceneManagement'
// Vérification taux des jauges
export const checkIllness = (flower,currentlySelected, scene) => {
    const max = flower.grid.length
    if(flower.sunshineLevel <= 10 || flower.sunshineLevel >= 90 || flower.wateringLevel <= 10 || flower.wateringLevel >= 90){
        flower.grid[max-1].setIll(true)
        let i = 0;
        spreadIllness(flower.idFlower, max, scene)
        i++
    } else {
        recover (flower.idFlower, max,currentlySelected,scene)
    }
}
// Propagation maladie
export const spreadIllness = (flowerId, max, scene) => {
    let flowerElements = elementOnScene(flowerId, scene)
    for (let k = 0; k < max; k++) {
        let illNeighbour = 0
        for(let j = -5; j <6; j++){
        if ((k + j >= 0) && (k + j < max) && j!=k ){ // pour ne pas sortir du tableau + ne pas comptabiliser le cube malade comme un voisin malade
            if(flowerElements[k + j]) {
            if(flowerElements[k + j].ill){
                illNeighbour = illNeighbour + 1
            }   
            }
        }
        }
        if (illNeighbour >= 1 && illNeighbour <= 8){
        if(flowerElements[k]){
            flowerElements[k].setIll(true)
        } 
        }
        if (illNeighbour > 9){
        if(flowerElements[k]){
            flowerElements[k].setIll(false)
        } 
        }
    }
}
// Rétablissement de la plante
export const recover = (flowerId, max, currentlySelected, scene) => {
    let flowerElements = elementOnScene(flowerId, scene)
    for(let i = 0; i<max; i++){
        if(flowerElements[i]) {
        if(flowerElements[i].ill){
            setTimeout( () => {
            flowerElements[i].setIll(false)
            if(currentlySelected === flowerElements[i].idFlower){
                flowerElements[i].material.color.set("#f23d3d")
            }
            }, 500 )
        }
        }
    }
}

export const stayIll = (flower,cubeIll,scene) => {
    elementOnScene(flower.idFlower, scene).forEach( cube => {
        cubeIll.forEach( cubeIll => {
        if(cubeIll.position.x === cube.position.x && cubeIll.position.y === cube.position.y && cubeIll.position.z === cube.position.z){
            cube.setIll(true)
        }
        })
    })
}