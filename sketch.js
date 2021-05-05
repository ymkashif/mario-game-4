var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var background, invisibleBackground, backgroundImage;

var obstaclesGroup, monster1, raquaza2, dialga3, venusaur4, secptile5

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  mario_running =   loadAnimation("mario1.png","running2.png");
  
  backgroundImage = loadImage("background2.png");
  
  monster1 = loadImage("monster1.png");
  raquaza2 = loadImage("raquaza2.png");
  dialga3 = loadImage("dialga3.png");
  venusaur4 = loadImage("venusaur4.png");
  spectile5 = loadImage("sceptile5.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  mario = createSprite(50,180,20,50);
  
  mario.addAnimation("running", mario_running);
  mario.scale = 0.5;
  
  background = createSprite(200,180,400,20);
  background.addImage("background",backgroundImage);
  background.x = background.width /2;
  background.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleBackground = createSprite(200,190,400,10);
  invisibleBackground.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //mario.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    background.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && mario.y >= 159) {
      mario.velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY + 0.8
  
    if (background.x < 0){
      background.x = background.width/2;
    }
  
    mario.running(invisiblebackground);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    background.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the mario animation
    mario.changeAnimation("mario",mario_running);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


  
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: monster.addImage(monster1);
              break;
      case 2: raquaza.addImage(raquaza2);
              break;
      case 3: dialga.addImage(dialga3);
              break;
      case 4: venusaur.addImage(venusaur4);
              break;
      case 5: spectile.addImage(spectile5);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  mario.changeAnimation("running",mario_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}