var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score = 0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneImg = loadImage("stone.png");
  bananaImg = loadImage('banana.png');
  over = loadImage('gameOver.png');
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,10,10);
  gameOver.addImage(over);
  gameOver.visible = false

  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")&&player.y>300) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    
    spawnObstacle();
    spawnBanana();
  }
  player.collide(ground);
  drawSprites();
  if(gameState===END){
    player.visible = false;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    backgr.velocityX = 0;
    gameOver.visible = true;
    textSize(20);
    fill('red');
    text('Press r to reset game',300,350);
    
    if(keyWentDown('r')){
      gameState = PLAY;
      score = 0;
      player.visible = true;
      gameOver.visible = false;
      backgr.velocityX = -4;
    }
    
  }

  
  textSize(20);
  fill('red');
  text('Score: '+score,50,50);
  
}

function spawnObstacle(){
  if(frameCount%80===0){
    var stone = createSprite(850,320,10,10);
    stone.addImage(stoneImg);
    stone.velocityX= -5;
    stone.scale = 0.2;
    
    obstacleGroup.add(stone);
    obstacleGroup.setColliderEach('circle',0,0,150);
    stone.debug = true;
  }
  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
}
function spawnBanana(){
  if(frameCount%60===0){
    var banana = createSprite(850,Math.round(random(200,300)),10,10);
    banana.addImage(bananaImg);
    banana.velocityX = -4.5;
    banana.scale = 0.06;

    bananaGroup.add(banana);
    banana.debug = true;
  }
  
    //if(bananaGroup.isTouching(player)){
      //score += 10;
      for(var i=0; i<bananaGroup.length; i++ ){
        if(bananaGroup.get(i).isTouching(player)){
          bananaGroup.get(i).destroy();
          score +=10
        }
      }
    //}
  
}
