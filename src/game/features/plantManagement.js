import {removeElement, elementOnScene, flowerAtPosition} from './sceneManagement'
import Sunflower from '../objects/sunflower/Sunflower'
import Myosotis from '../objects/myosotis/Myosotis'
import {stayIll} from './illness'


let flowerNames = ['Marguerite','Simone','Georgette','Jeanine','Monique','Ginette','Odette','Germaine','Paulette','Yvette','Berthe','Danielle','Josiane','Michelle','Yvonne','Marcelle','Annie','Jacqueline','Josette','Huguette','Micheline','Claudette','Raymonde','Henriette']

export const plantSeed = (raycaster, mouse, camera, clock ,scene, allFlowers) => {
    window.addEventListener( 'click', () => {
      if(document.querySelector('#plant').classList.value === 'selected'){
        raycaster.setFromCamera( mouse, camera )
        const intersects = raycaster.intersectObjects( scene.children )
        if(intersects[ 0 ]) {
          if(intersects[ 0 ].object.name === 'ground'){
            if(document.querySelector('#plant').disabled != true){
              if(flowerAtPosition(intersects[ 0 ].point.x,intersects[ 0 ].point.z, allFlowers) === false){
                let newFlower
                let randomFlower = Math.floor(Math.random() * (2 - 0) + 0)
                if(randomFlower === 0) {
                  newFlower = new Myosotis(flowerNames[0],intersects[ 0 ].point.x,-5,intersects[ 0 ].point.z,clock.getElapsedTime())
                } else if (randomFlower === 1) {
                  newFlower = new Sunflower(flowerNames[0],intersects[ 0 ].point.x,-5,intersects[ 0 ].point.z,clock.getElapsedTime())
                }
                flowerNames = flowerNames.filter(item => item !== flowerNames[0])
                allFlowers.push(newFlower)
                newFlower.Lsystem("B",1,scene)
                let stateInterval = setInterval(() => {
                  nextState(newFlower,scene, document.querySelector('#flowerName').innerHTML)
                  if(newFlower.growthLevel >= 100){
                    clearInterval(stateInterval)
                  }
                },4000)
                if(flowerNames.length === 0){
                  document.querySelector('#plant').classList.add('hidden')
                  document.body.classList.remove('plantSeed')
                  document.querySelector('#error').innerHTML = "Tu ne peux plus planter de graine mais tu en as déjà bien assez à t'occuper, tu ne crois pas ?"
                  setTimeout(() => { document.querySelector('#error').innerHTML = ""}, 3000)
                }
              } else {
                document.querySelector('#error').innerHTML = "Une fleur est déjà plantée à cette position (ou à proximité) !"
                setTimeout(() => {
                  document.querySelector('#error').innerHTML = ""
                }, 2000)
              }
            } 
          }
        }
      }
    }, false )
  }

export const nextState = (flower,scene, currentlySelected) => {
    if(flower.growthLevel >=5 && flower.growthLevel<=10){
      flower.state =0
    }
    if(flower.growthLevel >= 20 && flower.growthLevel<=50){
      flower.state = 1
    }
    if(flower.growthLevel >= 55 && flower.growthLevel<=100){
      flower.state = 2
    }
    const cubeIll = elementOnScene(flower.idFlower, scene).filter(element => element.ill ===true)
    if(flower.growthLevel >=5 && flower.growthLevel<10){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",1,scene)
    }
    if(flower.growthLevel >=10 && flower.growthLevel<15){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",2,scene)
    }
    if(flower.growthLevel >=15 && flower.growthLevel<20){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",3,scene)
    }
    if(flower.growthLevel >=20 && flower.growthLevel<35){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",1,scene)
    }
    if(flower.growthLevel >=35 && flower.growthLevel<50){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",2,scene)
    }
    if(flower.growthLevel >=50 && flower.growthLevel<70){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",2,scene)
    }
    if(flower.growthLevel >=70 && flower.growthLevel<100){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",3,scene)
    }
    if(flower.growthLevel >= 100){
      removeElement(flower.idFlower, scene)
      flower.Lsystem("B",4,scene)
    }
    stayIll(flower,cubeIll, scene)
    if(currentlySelected === flower.idFlower){
        elementOnScene(flower.idFlower, scene).forEach( item =>{
        item.material.color.set("#f23d3d")
      })
    }
  }