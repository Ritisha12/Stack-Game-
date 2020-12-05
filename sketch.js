var backgroundImg
var ground
var blockCount=0
var blockYPos
var blockGroup
var firstBlock
var breakOff=0
var score=0
var gameState="play"
var edges=[]
function preload(){
  backgroundImg=loadImage("Images/sky background.jpg")
}
function setup() {
  createCanvas(600,700);
  ground=createSprite(width/2,height-115,350,25)
  ground.shapeColor="black"
  blockYPos=height*0.8
  blockGroup=new Group()
  firstBlock=createSprite(0,560,350,25)
  firstBlock.shapeColor="red"
  firstBlock.velocityX=2
  blockGroup.add(ground)
  blockGroup.add(firstBlock)
  //edges=createEdgeSprites()
}
function draw() {
  background(backgroundImg);  
  if(gameState==="play"){
  if(keyWentDown("space")){
    if(blockGroup.get(blockGroup.length-1).x === blockGroup.get(blockGroup.length-2).x){
      console.log("on top")
      blockGroup.get(blockGroup.length-1).velocityX=0
      var blockWidth= blockGroup.get(blockGroup.length-1).width
      if (gameState!=="over"){
        
        spawnBlocks(blockWidth)}
    }
    else{
      console.log("not on top")
      var direction=findDirection( blockGroup.get(blockGroup.length-1).velocityX)
     console.log(direction)
     if(direction){
       if((blockGroup.get(blockGroup.length-1).width/2+blockGroup.get(blockGroup.length-1).x)<(blockGroup.get(blockGroup.length-2).x-blockGroup.get(blockGroup.length-2).width/2))
        { console.log("pressedbefore")
        blockGroup.get(blockGroup.length-1).remove()
        gameState="over"

       }else if((blockGroup.get(blockGroup.length-2).width/2+blockGroup.get(blockGroup.length-2).x)<(blockGroup.get(blockGroup.length-1).x-blockGroup.get(blockGroup.length-1).width/2)) {
        console.log("pressedafter")
        blockGroup.get(blockGroup.length-1).remove()
        gameState="over"
       }
       
       else{
        console.log("pressedoverlap")
       
       if(blockGroup.get(blockGroup.length-1).x>blockGroup.get(blockGroup.length-2).x){
         breakOff=blockGroup.get(blockGroup.length-1).width-(blockGroup.get(blockGroup.length-1).x - blockGroup.get(blockGroup.length-2).x)
       }else{
        breakOff=blockGroup.get(blockGroup.length-1).width-(blockGroup.get(blockGroup.length-2).x - blockGroup.get(blockGroup.length-1).x)
       }
       }
     }
     else{
      console.log("rightside")
      if((blockGroup.get(blockGroup.length-1).width/2+blockGroup.get(blockGroup.length-1).x)<(blockGroup.get(blockGroup.length-2).x-blockGroup.get(blockGroup.length-2).width/2))
      { console.log("pressedbefore")
      blockGroup.get(blockGroup.length-1).remove()
      gameState="over"

     }else if((blockGroup.get(blockGroup.length-2).width/2+blockGroup.get(blockGroup.length-2).x)<(blockGroup.get(blockGroup.length-1).x-blockGroup.get(blockGroup.length-1).width/2)) {
      console.log("pressedafter")
      blockGroup.get(blockGroup.length-1).remove()
      gameState="over"
     }
else{
  if(blockGroup.get(blockGroup.length-1).x>blockGroup.get(blockGroup.length-2).x){
    breakOff=blockGroup.get(blockGroup.length-1).width-(blockGroup.get(blockGroup.length-1).x - blockGroup.get(blockGroup.length-2).x)
  }else{
   breakOff=blockGroup.get(blockGroup.length-1).width-(blockGroup.get(blockGroup.length-2).x - blockGroup.get(blockGroup.length-1).x)
  
  }
}

     
     }
    

     // var breakOff= blockGroup.get(blockGroup.length-1).x - blockGroup.get(blockGroup.length-2).x
     blockGroup.get(blockGroup.length-1).width=breakOff
     blockGroup.get(blockGroup.length-1).velocityX=0
     blockGroup.get(blockGroup.length-1).x=blockGroup.get(blockGroup.length-2).x
      //var blockWidth= blockGroup.get(blockGroup.length-1).width
      if (gameState!=="over"){
        spawnBlocks(breakOff)}
  }
  }
  
  if (blockYPos<0){
    blockYPos=height*0.85
  }

  drawSprites();
  textSize(15)
  fill("black")
text("Score:"+score,80,50)
}
else if(gameState==="over"){
  textSize(25)
  fill("black")
  text("Game Over",width/2-50,height/2)

 }
  drawSprites();
}

function spawnBlocks(blockWidth){
  var randX=Math.round(random(1,2))
  blockYPos-=25
  var block=createSprite(0,blockYPos,blockWidth,25)
  blockCount++
  score++
  if(blockCount<=5){
    block.shapeColor="red"
  }
  else if(blockCount>5&&blockCount<=10){
    block.shapeColor="orange"
  }
  else if(blockCount>10&&blockCount<=15){
    block.shapeColor="yellow"
  }
  else if(blockCount>15&&blockCount<=20){
    block.shapeColor="green"
  }
  else if(blockCount>20&&blockCount<=25){
    block.shapeColor="lightBlue"
  }
  else if(blockCount>25&&blockCount<=30){
    block.shapeColor="darkBlue"
  }
  else if(blockCount>35&&blockCount<=40){
    block.shapeColor="purple"
  }
  else if(blockCount>45&&blockCount<=50){
    block.shapeColor="pink"
  }
  
  if (randX===1){
    block.x=0
    block.velocityX=2
  }
 else{
   block.x=600
  block.velocityX=-2
  }
  blockGroup.add(block)
}
function findDirection(vl){
  if(vl*(-1)<0){
    return true
  }
  else{
    return false
  }
}