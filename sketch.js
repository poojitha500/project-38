var road, roadImg, car, carImg, wood, woodImg, obstracle, obstracleImg, coin, coinImg, restartImg, restart, gameoverImg, gameover, carsound, gameoversound;
var PLAY=1;
var END=1;
var gameState=1;
var coinG, obstracleG, woodG;
var score;


function preload(){
roadImg = loadImage("road.jpg");
  carImg = loadImage("car.jpg");
    woodImg = loadImage("wood.jpg");
    obstracleImg = loadImage("obstracle.jpg");
    coinImg = loadImage("coin.png");
    restartImg = loadImage("restart.jpg");
  gameoverImg = loadImage("gameover.jpg");
  carsound = loadSound("car sound.wav");
  gameoversound = loadSound("gameover sound.wav");
}

function setup() {
 createCanvas(displayWidth,displayHeight);
  coinG=new Group();
  obstracleG=new Group();
  woodG=new Group();
  road = createSprite(displayWidth/7,displayHeight/6);
  road.addImage("background",roadImg);
  road.scale=7;

  car = createSprite(150,displayHeight/1.5,10,10);
  car.addImage(carImg);
  car.scale=1;
   
  score=0;
}

function draw() {
 background(0);
  if(gameState===1){
  var rand= Math.round(random(1,2));
  if(rand===1){
    wood();
  }
  if(rand===2){
    obstracle();
  }
  coin();
    road.velocityX=-2;
     if (road.x < displayWidth/7){
      road.x = road.x+100;
      camera.position.x = displayWidth/2;
      camera.position.y = displayHeight/2;
    }
   
  
     if(keyDown("UP_ARROW")){
     car.y=car.y-5;
       carsound.play();
     }
     if(keyDown("DOWN_ARROW")){
     car.y=car.y+5;
       carsound.play();
     }
     if(coinG.isTouching(car)){
        
        coinG.destroyEach();
        
       score=score+1;
       
        
        
      }
     
  }
  
 if(woodG.isTouching(car)|| obstracleG.isTouching(car)){
   gameState=0;
   gameoversound.play();
        woodG.destroyEach();
        road.velocityX=0;
       obstracleG.destroyEach();
        obstracleG.setVelocityYEach(0);
          woodG.setVelocityYEach (0);
   gameover=createSprite(displayWidth/2,displayHeight/4,10,10);
   gameover.addImage(gameoverImg);
  
   restart=createSprite(displayWidth/2,displayHeight/2, 10, 10);
   restart.addImage(restartImg);
   restart.scale=0.5;
   
    score=0;
   
  
 }
       if(keyDown("R")){
     gameState=1;
          gameover.visible=false;
         restart.visible=false;
   }
      woodG.velocityY=(8+(score/10));
   obstracleG.velocityY=(8+(score/10));
 
  drawSprites();
  fill("black");
   textSize(25);
  text("Score : "+ score,displayWidth/2,50); 

}

function wood(){
  if(frameCount%200===0){
 var   wood=createSprite(displayWidth+10,Math.round(random(displayHeight/2,displayHeight/2+70)),10,10);
 camera.x = wood.x;
 //camera.wood.y = cars[index-1].y;
    wood.addImage(woodImg);
    wood.scale=0.7;
    wood.shapeColor=("red");
    wood.velocityX=-10;
    wood.lifetime=500;
    woodG.add(wood);
  }
  
}
function obstracle(){
  if(frameCount%200===0){
 var   obstracle=createSprite(displayWidth+10,Math.round(random(displayHeight/2,displayHeight/2+100)),10,10);
 camera.x = obstracle.x;
    obstracle.addImage(obstracleImg);
    obstracle.scale=0.3
    obstracle.shapeColor=("black");
    obstracle.velocityX=-10;
    obstracle.lifetime=500;
    obstracleG.add(obstracle);
  }
  
}

function coin(){
  if(frameCount%300===0){
 var   coin=createSprite(displayWidth+10,Math.round(random(displayHeight/2,displayHeight/2+70)),10,10);
 camera.x = coin.x;
    coin.addImage(coinImg);
    coin.scale=0.3;
    coin.shapeColor=("yellow");
    coin.velocityX=-20;
    coin.lifetime=500;
    coinG.add(coin);
  }

}

