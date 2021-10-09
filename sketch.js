var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(width/2,height/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 2.75
  ghost =createSprite(width/2, height/2)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.5
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

}

function draw() {
  background(200);
  if (gameState === "play"){
    if(tower.y > height){
      tower.y = height/2
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY += 1
    spawnDoors();
  if(keyDown("right")){
    ghost.x += 50
  }
  if(keyDown("left")){
  ghost.x -= 50
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > height){
  ghost.destroy();
  gameState = "end"
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  drawSprites();
  }
    else if(gameState === "end"){
  textSize(30)
  text("Game Over", width/2, height/2)
    }
  
    
    
}

function spawnDoors(){
  if( frameCount % 350 === 0){
    door = createSprite(200, -50)
    door.addImage("door" , doorImg)
    door.x = Math.round(random(150, width - 150))
    door.velocityY = 1
    door.scale = 2
    doorsGroup.add(door)
    door.lifetime = height
    climber = createSprite(door.x, 50)
    climber.addImage("climber", climberImg)
    climber.velocityY = 1
    climber.scale = 2
    climber.lifetime = height
    climbersGroup.add(climber)
    invisibleBlock = createSprite(door.x, 70, climber.width*2, 20)
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = height
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.visible = false
    door.depth = ghost.depth++
  }
}

