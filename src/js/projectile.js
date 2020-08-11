import * as PIXI from "pixi.js";
import blueGradient from "../assets/Clouds.png";
import spaceGround from "../assets/SpaceGround.png";
import Mountains from "../assets/Mountains.png";
import spaceShipWindow from "../assets/SpaceShipWindow.png";
import nightBackground from "../assets/NightBackground.png";
import SnowCannon from "../assets/SnowCannon.png";
import Snowman from "../assets/Snowman.png";
import Snowball from "../assets/Snowball.png";
import {BLUE,RED,GREEN,ORANGE,PURPLE,PINK,NUMERAL,BALLS,BUTTONS} from "../AssetManager.js"
import * as CONST from "./const.js";
import { Fraction, Draggable, distance, FractionFrame, UltimateNumberLine, Cannon } from "./api.js";
import {
  TweenMax,
  TimelineLite,
  Power2,
  Elastic,
  CSSPlugin,
  TweenLite,
  TimelineMax,
  Power4,
  Linear
} from "gsap";

export const init = (app, setup) => {


  // Constants 
  const WINDOW_WIDTH = setup.width
  const WINDOW_HEIGHT = setup.height
  const CANNON_ANCHOR = {x:0.05*WINDOW_WIDTH,y: 0.90*WINDOW_HEIGHT }
  const VELOCITY_MULTIPLIER = 1



  let backGround;
  let features;
  let cannon;
  let snowballs = []
  let snowman;
  let numberline;
  let gravity;
  let ballSize;
  
  
  let V = new PIXI.Graphics()
  let Vy = new PIXI.Graphics()
  let Vx = new PIXI.Graphics()

  function drawVectors(e){
    let centerZero = numberline.centerZero()
    let x0 = centerZero.x 
    let y0 = centerZero.y
    let x1 = e.data.global.x
    let y1 =  e.data.global.y
    let dX = x1 - x0
    let dY = y1 - y0
    let magV = Math.sqrt(dX*dX + dY*dY)

    let theta = Math.acos(dX/magV)

    if (y1 < y0) {
      V.clear()
      V.moveTo(x0,y0)
      V.lineStyle(3,0x000000)
      V.lineTo(e.data.global.x,e.data.global.y)

      Vx.clear()
      Vx.moveTo(x0,y0)
      V.lineStyle(3,0x000000)
      V.lineTo(e.data.global.x,e.data.global.y)

      Vy.clear()
      Vy.moveTo(x0,y0)
      V.lineStyle(3,0x000000)
      V.lineTo(e.data.global.x,e.data.global.y)

      fire(magV,theta)
    }
  }

  class Arc extends PIXI.Container {
    constructor(){
      super()
      this.dot = new PIXI.Graphics()

    }
  }


  // Function vector


  function fire(v,theta){

    console.log("firing")

    let newSnowball = new PIXI.Sprite.from(Snowball)
    app.stage.addChild(newSnowball)
    snowballs.push(newSnowball)
    newSnowball.anchor.set(0.5)
    newSnowball.landed = false
    newSnowball.x = WINDOW_WIDTH/2
    newSnowball.y = CANNON_ANCHOR.y
    console.log("ballsize",ballSize)
    newSnowball.width = ballSize
    newSnowball.height = ballSize

    let time = {t: 0}

    let v0Y = v*Math.sin(theta)
    let v0X = v*Math.cos(theta)

    let totalTime = 2*v0Y/gravity

    const onUpdate = ()=> {
      let t = time.t
      newSnowball.y = CANNON_ANCHOR.y + 1/2*gravity*t*t - v0Y*t
      newSnowball.x = WINDOW_WIDTH/2 + v0X*t
      numberline.interactive = false
    }

    const onComplete = ()=> {
      newSnowball.value = numberline.getNumberLineFloatValueFromPosition(newSnowball.x)
      newSnowball.landed = true
      let allLanded = true
      numberline.interactive = true
    }


    TweenLite.to(time,{duration: totalTime,t: totalTime,onUpdate: onUpdate,ease: Linear.easeNone,onComplete: onComplete})
  }
 
 
  function load() {
    if (setup.props.features) {
      features = setup.props.features;
    }


    backGround = new PIXI.Sprite.from(Mountains);
    backGround.width = WINDOW_WIDTH
    backGround.height = WINDOW_HEIGHT
    backGround.interactive = true
    backGround.on('pointerdown',drawVectors)
    app.stage.addChild(backGround);


    numberline = new UltimateNumberLine(-30,30,WINDOW_WIDTH,app)
    let range = numberline.maxFloat - numberline.minFloat
    ballSize = numberline.width/range
    numberline.interactive = true
    numberline.y = CANNON_ANCHOR.y
    numberline.onUpdate = ()=> {
      snowballs.forEach(s=>{
        let range = numberline.maxFloat - numberline.minFloat
        ballSize = numberline.width/range
        s.width = ballSize
        s.height = ballSize
        s.x = numberline.getNumberLinePositionFromFloatValue(s.value)
        gravity = WINDOW_WIDTH/(numberline.maxFloat - numberline.minFloat)*9.8
      })
      backGround.x = numberline.getNumberLinePositionFromFloatValue(-50)
      backGround.width = numberline.getNumberLinePositionFromFloatValue(50) - backGround.x
      backGround.height = WINDOW_HEIGHT/WINDOW_WIDTH*backGround.width
      backGround.y = WINDOW_HEIGHT - backGround.height

    }  
    numberline.draw(-30,30)
    app.stage.addChild(numberline)

    gravity = WINDOW_WIDTH/(numberline.maxFloat - numberline.minFloat)*9.8

    app.stage.addChild(V)
    app.stage.addChild(Vy)
    app.stage.addChild(Vx)

    let snowball = new PIXI.Sprite.from(Snowball)
    app.stage.addChild(snowball)
    snowballs.push(snowball)
    snowball.value = 0
    snowball.anchor.set(0.5)
    snowball.x = WINDOW_WIDTH/2
    snowball.y = CANNON_ANCHOR.y
    snowball.width = ballSize
    snowball.height = ballSize
  
    snowman = new PIXI.Sprite.from(Snowman)
    //app.stage.addChild(snowman)
    snowman.height = 100
    snowman.width = 75
    snowman.x = WINDOW_WIDTH/2 + (-1 + 2*Math.random())*WINDOW_WIDTH/2
    snowman.y = CANNON_ANCHOR.y - snowman.height


  }

  // Call load script
  load();

};
