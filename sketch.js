//Create variables here
var dog, happydog;

var database;
var foodS, foodStock;;
var feeddog, addfood;
var fedTime, lastFed
var foodObj;


function preload() {
    dog = loadImage("dogImg.png");
    happydog = loadImage("dogImg1.png");
    panting = loadSound("dogpanting.wav");
    barking = loadSound("barking.mp3");
}

function setup() {

    createCanvas(1000, 1000);
    
    foodObj = new Food();
    Doggie = createSprite(850, 240, 10, 10);
    Doggie.addImage(dog);
    Doggie.scale = 0.2;

    

    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);



    feed = createButton("Feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);

    if(feed.mousePressed(feedDog)){
      barking.play();
    }

    addFood = createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);


}


function draw() {
    background(46, 139, 87);

    foodObj.display();

    
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

    drawSprites();

    
}

function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

    function feedDog (){
      Doggie.addImage(happydog);
    barking.play();
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
       
      })
    }

    function addFoods(){
      Doggie.addImage(dog);
      panting.play();
      foodS++;
      database.ref('/').update({
        Food:foodS,
       
      })

    }

