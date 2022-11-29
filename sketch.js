//Help me in line 80,81,82



//variable here
var pc, pcImg;
var gamestate = 0
var play, quit, btn;
var fireballs, ballImg;
var enemy, enemyImg, boomImg;
var enemysGroup, funsGroup;
var score = 0;
var fun, funImg;
var lifeX, lifeXImg;
var he2, he1, he3, heImg
var hearts = 2
var dg;
var shoots;
var blast, blastImg;
var rl, rlImg;
var shootbtn, shootImg;
var canW,canH

var fireballsGroup;
function preload() {
  bg = loadImage("images/bg.jpg");
  pcImg = loadImage("images/ufo.png");
  ballImg = loadImage("images/fireball.png");
  enemyImg = loadImage("images/enemy.png");
  boomImg = loadImage("images/boom.png");
  funImg = loadImage("images/gift.png");
  lifeXImg = loadImage("images/life.png");
  heImg = loadImage("images/heart.png");
  mainImg = loadImage("images/bg0.jpg");
  blastImg = loadImage("images/boom.png");
  btn = loadImage("images/btn.png");
  rlImg = loadImage("images/rel.jpg");
  shootImg = loadImage("images/shootbtn.png");

  dg = loadSound("dialogs.mp3");
  shoots = loadSound("shoo.mp3")
}
function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile === true) {
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(canW, canH);
    shootbtn.visible = true;
  } else {
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(canW, canH);
  }

  dg.play()



  pc = createSprite(canW/ 2, 650, 20, 20);
  pc.addImage(pcImg);
  pc.scale = 0.5;
  pc.visible = false

  shootbtn = createSprite(canW- 300, 500, 20, 20);
  shootbtn.addImage(shootImg);
  shootbtn.scale = 0.5;
  shootbtn.visible = false;

  he1 = createSprite(100, 200);
  he1.addImage(heImg);
  he1.scale = 0.2
  he1.visible = false

  he2 = createSprite(100, 300);
  he2.addImage(heImg);
  he2.scale = 0.2
  he2.visible = false

  he3 = createSprite(100, 400);
  he3.addImage(heImg);
  he3.scale = 0.2
  he3.visible = false

  blast = createSprite(2000, 100,);
  blast.addImage(blastImg);
  blast.scale = 0.5

  play = createButton("play");
  play.position(canW/ 2 - 120, 425);
  play.size(300, 60)

  rl = createSprite(100, 100)
  rl.addImage(rlImg);
  rl.scale = 0.3

  quit = createButton("quit");
  quit.position(canW/ 2 - 120, 515);
  quit.size(300, 60)

  quit.mousePressed(() => {
    window.location.reload()
  });


  play.mousePressed(() => {
    play.hide();
    quit.hide();
    gamestate = 1
  });

  enemysGroup = new Group();
  funsGroup = new Group();
  fireballsGroup = new Group();

  dg.play();
  dg.setVolume(0.5);
}



function draw() {
  background(bg);
  if (gamestate === 0) {
    background(mainImg);
    textSize(30);
    fill("black");
    stroke("white");
    strokeWeight(2);
    text("use your mouse to move the player", canW/ 3, 600);
    text("use left mouse button to shoot enemy and collect treasure", canW/ 3 - 175, 650);
  }


  if (gamestate === 1) {


    pc.visible = true
    he1.visible = true
    he2.visible = true
    he3.visible = true

    pc.x = World.mouseX;
    pc.y = World.mouseY;

    shoot();
    spawnEnemy()
    spawnfun()

    textSize(30);
    text("Score: " + score, 1500, 100)


    for (var i = 0; i < enemysGroup.length; i++) {
      for (var j = 0; j < fireballsGroup.length; j++) {
        if (enemysGroup.get(i).isTouching(fireballsGroup.get(j))) {
          score += 5;
          enemysGroup.get(i).changeImage("blast");
          enemysGroup.get(i).scale = 0.5;
          enemysGroup.get(i).velocityY = 0;
          enemysGroup.get(i).lifetime = 20;
          fireballsGroup.get(j).destroy();

        }
      }
    }



    if (mousePressedOver(rl)) {
      window.location.reload();
    }




    for (var i = 0; i < funsGroup.length; i++) {
      for (var j = 0; j < fireballsGroup.length; j++) {
        if (funsGroup.get(i).isTouching(fireballsGroup.get(j))) {
          score += 70;
          funsGroup.get(i).destroy();
          fireballsGroup.get(j).destroy();

        }
      }
    }

    if (enemysGroup.collide(pc)) {
      he3.destroy();
      enemysGroup.destroyEach();
      hearts = hearts - 1
      console.log("game over")


        ;


    }

    if (hearts < 1) {
      he2.destroy()
    }

    if (hearts < 0) {
      he1.destroy();
      pc.destroy();
      enemysGroup.setVelocityYEach(0);
      swal({
        title: `Awesome! you have got a score of ` + score,
        text: "You Have ben robbed by enemy's",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Play Again"
      }, function (isConfirm) {
        if (isConfirm === true) {
          window.location.reload();
        }
      })
    }
  }

  //pc.depth += fireballs.depth


  drawSprites();
}
function shoot() {
  if (mouseWentDown("leftButton") || touches.length > 0) {
    spawnfireballs();
    shoots.play();
    shoots.setVolume(0.3);
    touches = [];
  }
}
function spawnEnemy() {
  if (frameCount % Math.round(random(10, 100)) === 0) {
    x = random(200, 1400);
    y = random(-20, -100)

    var enemy = createSprite(x, y);
    enemy.addImage("enemy", enemyImg);
    enemy.addImage("blast", blastImg);
    enemy.velocityY += (5 + getFrameRate() / 60)
    enemy.lifetime = 300
    enemysGroup.add(enemy)
    enemy.setCollider("rectangle", 0, 1, 80, 130);
  }

}
function spawnfun() {
  if (frameCount % 700 === 0) {
    x = random(200, 1400);
    y = random(-20, -100)

    var fun = createSprite(x, y);
    fun.addImage(funImg);
    fun.velocityY += (5 + getFrameRate() / 60)
    fun.lifetime = 300
    funsGroup.add(fun)
  }
}

function spawnfireballs() {

  x = pc.x;
  y = pc.y;

  var fireball = createSprite(x, y);
  fireball.addImage(ballImg);
  fireball.velocityY = -150;
  fireball.lifetime = 300;
  fireball.scale = 0.2;
  fireballsGroup.add(fireball);

}