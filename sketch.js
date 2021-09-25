var runner, road, obs, invisibleGround, life = 3, points = 0, coins;
var runnerImg, roadImg, obsImg, coinsImg; 
var obsGroup, coinsGroup;
var PLAY = 1
var END = 0;
var gameState = PLAY;

function preload(){
   runnerImg = loadAnimation("Images/running1.PNG","Images/running2.PNG","Images/running3.PNG","Images/running4.PNG","Images/running5.PNG","Images/running6.PNG","Images/running7.PNG","Images/running8.PNG")
   roadImg = loadImage("Images/bg img.jpg")
   obsImg = loadImage("Images/redbubble.png")
   coinsImg = loadImage("Images/coin.png")
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  
  road = createSprite(width/2 + 200,height/2,5000,600)
  road.addImage(roadImg)
  road.scale = 2.5
  road.velocityX = -2

  runner = createSprite(250,500)
  runner.addAnimation("running",runnerImg)

  invisibleGround = createSprite(width/2,690,width,10)
  invisibleGround.visible = false

  life = 3;

  obsGroup = new Group();

  coinsGroup = new Group();

}
function draw(){

  if(gameState === PLAY){
  if(road.x < 680 ){
    road.x = width/2 
  }
  

  createObs();
  createCoins();
  if(keyDown('space')){
    runner.velocityY = -10
    console.log("Working")
  }
  
 runner.velocityY = runner.velocityY + 1


  if(obsGroup.isTouching(runner)){
    life -= 1
    //console.log(life);
    //obsGroup.destroyEach();
    for(var i = 0; i < obsGroup.length; i++){
      if(obsGroup.get(i).isTouching(runner)){
        obsGroup.get(i).destroy();
      }
    }
  }

  
  if(coinsGroup.isTouching(runner)){
     points += 1
    //console.log(life);
    coinsGroup.destroyEach();
  }
 

  runner.collide(invisibleGround)

  if (life === 0){
    gameState = END ;
  }

  //console.log(road.x)
  drawSprites();
  }
  text("Score:"+ points, 700, 50)
  text("Lives:"+ life, 500, 50) 

  if(gameState === END){
    obsGroup.destroyEach();
    coinsGroup.destroyEach();
    runner.destroy();
    road.velocityX = 0
    gameOver();

  }

  if(points === 10){
    obsGroup.destroyEach();
    coinsGroup.destroyEach();
    runner.destroy();
    road.velocityX = 0
    win();
  }
}

function createObs(){
  if(frameCount % 100 === 0){
    var rand = Math.round(random(0,1))
    if(rand === 0){
      obs = createSprite(0,Math.round(random(600,700)))
      obs.velocityX = 6
      obsGroup.add(obs);
    //  obs.velocityY = 4

    }else{
      obs = createSprite(width,Math.round(random(150,200)))
      obs.velocityX = -10
      //obs.velocityY = 2
      obsGroup.add(obs);
      
    }
     obs.addImage(obsImg)
     obs.lifetime = 300
     obs.scale = 0.3
    // obs.collide(invisibleGround)
  }
  //obs.collide(invisibleGround)
  //obs.bounceOff(invisibleGround)
  

}
function createCoins(){
  if(frameCount % 200 === 0){
    var rand = Math.round(random(0,1))
    
      coins = createSprite(0,Math.round(random(0,400)))
      coins.addImage(coinsImg)
      coins.velocityX = 4
      coins.lifetime = 300
      coinsGroup.add(coins);
  }

}
function win() {
  swal({
    title: `Congratulations, You are Rank 1`,
    text: "You won the Game",
    imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops You Lost, To Restart the game Reload the page",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}