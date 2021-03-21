import {flowerInFlowers, highestPoint} from './sceneManagement'
import Cube from '../objects/Cube'

export const water = (allFlowers, scene) => {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = flowerInFlowers(idFlower, allFlowers)
    if(currentFlower.wateringLevel < 100){
      currentFlower.wateringLevel += 5
    }
    interactionAnimation(flowerInFlowers(idFlower, allFlowers).position.x, flowerInFlowers(idFlower, allFlowers).position.z, highestPoint(idFlower,scene), '#2fc7ea', idFlower,scene)
    updateWateringLevel(currentFlower)
  }

export const sun = (allFlowers, scene) => {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = flowerInFlowers(idFlower, allFlowers)
    if(currentFlower.sunshineLevel < 100){
      currentFlower.sunshineLevel += 5
    }
    interactionAnimation(flowerInFlowers(idFlower, allFlowers).position.x, flowerInFlowers(idFlower, allFlowers).position.z, highestPoint(idFlower,scene), '#F7FF3C', idFlower,scene)
    updateSunshineLevel(currentFlower)
  }

export const love = (allFlowers, scene) => {
    const idFlower = document.querySelector('#infoSelected').querySelector('#flowerName').innerHTML
    const currentFlower = flowerInFlowers(idFlower, allFlowers)
    if(currentFlower.growthLevel < 100){
      if((currentFlower.growthLevel + 1) > 100){
        currentFlower.growthLevel = 100
      } else {
        currentFlower.growthLevel += 1
      }
    }
    interactionAnimation(flowerInFlowers(idFlower, allFlowers).position.x, flowerInFlowers(idFlower, allFlowers).position.z, highestPoint(idFlower,scene), '#F3C4CF', idFlower,scene)
    updateGrowthLevel(currentFlower)
    document.querySelector('#love').disabled = true
    setTimeout(() => {
      document.querySelector('#love').disabled = false
    },5000)
}

export const updateSunshineLevel = (flower) => {
    document.querySelector('#sunshineLevel').value = flower.sunshineLevel
    document.querySelector('#sunshine').innerHTML = flower.sunshineLevel + '%'
    if(flower.sunshineLevel <= 10 || flower.sunshineLevel >= 90){
      document.querySelector('#sunshineLevel').classList.add('ill')
    } else{
      document.querySelector('#sunshineLevel').classList.remove('ill')
    }
    if(flower.sunshineLevel <= 80 && flower.sunshineLevel >= 60){
      document.querySelector('#sunshineLevel').classList.add('good')
    }else{
      document.querySelector('#sunshineLevel').classList.remove('good')
    }
}

export const updateWateringLevel = (flower) => {
    document.querySelector('#wateringLevel').value = flower.wateringLevel
    document.querySelector('#watering').innerHTML = flower.wateringLevel + '%'
    if(flower.wateringLevel <= 10 || flower.wateringLevel >= 90){
      document.querySelector('#wateringLevel').classList.add('ill')
    } else{
      document.querySelector('#wateringLevel').classList.remove('ill')
    }
    if(flower.wateringLevel <= 80 && flower.wateringLevel >= 60){
      document.querySelector('#wateringLevel').classList.add('good')
    }else{
      document.querySelector('#wateringLevel').classList.remove('good')
    }
}

export const updateGrowthLevel = (flower) => {
    document.querySelector('#growthLevel').value = flower.growthLevel
    if (flower.growthLevel > 100) {
      document.querySelector('#growth').innerHTML = '100%'
    } else {
      document.querySelector('#growth').innerHTML = flower.growthLevel + '%'
    }
}

export const interactionAnimation = (x, z, y,c , idFlower, scene) => {
    let cube = new Cube (x-10,y+35,z,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x-10,y+30,z+10,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x-10,y+40,z-10,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x-20,y+45,z,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x-20,y+50,z+10,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x-20,y+35,z-10,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x,y+30,z,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x,y+35,z+20,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    cube = new Cube (x,y+40,z-20,c, false)
    cube.type = 'animation'
    cube.idAnim = idFlower
    scene.add(cube)
    scene.children.forEach( item => {
      if (item.idAnim === cube.idAnim){
        let i = 0
        const animation = setInterval(() => {
          i++
          item.position.y -= 15
          if(item.position.y < y ){
            scene.remove(item)
          }
          if(i === 5){
            scene.remove(item)
            clearInterval(animation)
          }
        }, 50)
      }
    })
}

export const update = (allFlowers, clock, levelCoeff, currentlySelected) => {
    allFlowers.forEach( flower => {
      if(Math.floor(clock.getElapsedTime() - flower.creationTime)% (4*levelCoeff) ===0){
        if(flower.wateringLevel > 0 ){
          flower.wateringLevel -= 5
        }
      }
      if(Math.floor(clock.getElapsedTime() - flower.creationTime)% (6*levelCoeff) ===0){
        if(flower.sunshineLevel > 0 ){
          flower.sunshineLevel -= 5
        }
      }  
      if(currentlySelected === flower.idFlower){
        updateWateringLevel(flower)
        updateSunshineLevel(flower)
        updateGrowthLevel(flower)
      }
    })
}