var car, carimg;
var trackimg;
var mud, mudimg;
var gameState;
var button1;
var button2;
var button3;
var mudGroup;
var coin;
var coinimg;
var coinGroup;
var c = 0;
var t = 0;
var d = 0;

function preload() {
  carimg = loadImage("car1.png");
  trackimg = loadImage("track.jpg");
  mudimg = loadImage("mud-.png");
  coinimg = loadImage("coin.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  car = createSprite(width/2+380, 250);
  car.addImage(carimg);

  button1 = createButton("Start");
  button1.position(width/2+380, 250);

  mudGroup = new Group();
  coinGroup = new Group();

  gameState = "start";

}

function draw() {
  background(0);
  image(trackimg, width/2, -7000, 0, 0);

  console.log(windowWidth+","+windowHeight);

  console.log(gameState);
  console.log(d);

  if (gameState === "start") {
    textSize(50);
    text("Car Racing Game", width/2+280, 100);

    button1.mousePressed(function(){
      gameState = "play";
    });
  }

  if (gameState === "play") {
    button1.hide();
    t++;

    if (keyDown("up")) {
      car.y-=10;
    }
    if(keyDown("left")) {
      car.x-=10;
    }
    
    if(keyDown("right")) {
      car.x+=10;
    }
  }

   if (mudGroup.isTouching(car)) {
     gameState = "end2";
   }

   if (coinGroup.isTouching(car)) {
     c = c+1;
     coinGroup.destroyEach();
   }

   if (gameState === "end2") {
     car.velocityY = 0;
     text("YOU LOSE!", 200, 250);
   }

   if (d === 708) {
     gameState = "end1";
   }

    //car.y-=10;


   camera.position.y = car.y;

  drawSprites();
  spawnMud();
  spawnCoin();
  text(mouseX+","+mouseY, mouseX, mouseY);

  if (gameState === "end1") {
    textSize(5000);
    text("Coins Collected: "+c, 200, 350);
    text("Time Taken: "+ t+ "sec", 200, 370);
  }
}

function spawnMud() {
if (keyDown("up")) {
 if (frameCount % 50 === 0) {
  mud = createSprite(random(100, 700), car.y-500, 5, 5);
  mud.addImage(mudimg);
  mud.scale = 0.4;
  mudGroup.add(mud);
  //mud.velocityY = 10;
 }
}
}

function spawnCoin() {
  if (keyDown("up")) {
    if (frameCount % 50 === 0) {
      coin = createSprite(random(100, 700), car.y-500, 5, 5);
      coin.addImage(coinimg);
      coin.scale = 0.1;
      coinGroup.add(coin);
    }
    d++;
  }
}