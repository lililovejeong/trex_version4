var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running;
var groundImage;

var cloud, cloudGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

function preload(){

    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
    trex_collided = loadAnimation("trex_collided.png");

    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    

}

function setup(){
    createCanvas(600, 200);

    trex = createSprite(50, 100, 20, 50);
    trex.addAnimation("running", trex_running)

    edges = createEdgeSprites();

    trex.scale = 0.5;
    trex.x = 50;

    ground = createSprite(200, 180, 400, 20);
    ground.addAnimation("running", groundImage);
    ground.x = ground.width/2;

    invisibleGround = createSprite(200, 190, 400, 20);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();
    cloudGroup = new Group();

    //console.log("Hola" + " Mundo");

    //var rand = Math.round(random(1,100))

}

function draw(){
    background(180);

    text("Score: " + score, 500, 50);

    if(gameState == PLAY){
        ground.velocityX = -2;

        score= score + Math.round(frameCount/60);

        if(ground.x < 0){
            ground.x = ground.width/2;
        }

        if(keyDown("space")){
            trex.velocityY = -10;
        }
    
        if(keyDown("space") && trex.y >= 100){
            trex.velocityY = -10
        }
    
        spawnClouds();

        spawnObstacles();

        if(obstaclesGroup.isTouching(trex)){
            gameState = END;
        }

        trex.velocityY = trex.velocityY + 0.5;

    } else if(gameState == END){
        ground.velocityX = 0;

        trex.changeAnimation("collided", trex_collided);

        obstaclesGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
    }

    //console.log(trex.y)

    //trex.collide(edges[0]);
    //trex.collide(edges[1]);
    //trex.collide(edges[2]);
    //trex.collide(edges[3]);

    trex.collide(invisibleGround);
    //console.log(ground.x)


    //var rand = Math.round(random(1,100));
    //console.log(rand);

    drawSprites();
}

function spawnObstacles(){
    if(frameCount % 150 == 0){
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -3;
    
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
                
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 150;

    obstaclesGroup.add(obstacle);
    }
}

function spawnClouds(){
    if(frameCount % 60 == 0){
        cloud = createSprite(600, 100, 40, 10);
        cloud.addImage(cloudImage);
        cloud.y = Math.round(random(10, 60));
        cloud.velocityX = -3;
        cloud.scale = 0.4;
        //console.log(frameCount);

        cloud.lifetime = 200;

        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;

        cloudGroup.add(cloud);
    }
}
  