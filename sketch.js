var s;
var scl = 50;
var food = [];
var score_box = 100;
var high_Score = 0;
var Food_limit = 100;
var density = 30;
 var config = {
    apiKey: "AIzaSyCiqaO16HQCvYoDXJ0f8W4kMSfRQ7pTCnY",
    authDomain: "snake-1-d72e5.firebaseapp.com",
    databaseURL: "https://snake-1-d72e5.firebaseio.com",
    storageBucket: "snake-1-d72e5.appspot.com",
    messagingSenderId: "81753668910"
  };
  firebase.initializeApp(config);
  //console.log(firebase);
  var database = firebase.database();
  var ref = database.ref('scores');
  ref.on('value', gotData, errData);
  var GLobal_High_score = 0;
  var best_player = " ";
  var player;
 
 function gotData(data){
	 var scorelistings = selectAll('.scorelisting');
  for (var i = 0; i < scorelistings.length; i++) {
    scorelistings[i].remove();
  }
 var scores = data.val();
 var keys = Object.keys(scores);
 max_sc = 0;
 max_sc_k = 0;

 for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var Namex = scores[k].Name;
    var scorex = scores[k].Score;
	if (scorex > max_sc){
	GLobal_High_score = scorex;
	best_player = Namex;
	
	}
	}
 }
 
  
 
 function errData(){
	 var data = {
				Name:"Player",
			    Score:0
			}
			ref.push(data);
 }
 
function setup() {
  //slider = createSlider(1,30,10);
  player = createInput('Player Name');
  player.position(20, 60);
  createCanvas(windowWidth-100, windowHeight-100);
  s = new Snake();
  frameRate(10);
  food[0]= new Food();
  food[0].show();
  //cc = createButton('Score: ',0,0);
  //aa = createButton(s.score,0,0);
  var new_food;
  var add = true;
   // gui = createGui('P5 GUI');
	//gui.addGlobals('Food_limit', 'density', 'scl');
	//noLoop();
	
  
}


function draw() {
  background(50);
	// score box
  stroke(100)
  noFill();
  rectMode(CENTER);
  rect(width/2, score_box/2 ,width,score_box);
  fill(255, 0, 100);
  textSize(30);
  textAlign(RIGHT,TOP);
  text('Current Score: ',width/2-100,50);
  textAlign(LEFT,TOP);
  text(s.score,width/2-100,50);
  // High Score
  fill(255, 120, 150,155);
  textSize(25);
  textAlign(RIGHT,TOP);
  text('your Top Score: ',width/2-100,10);
  textAlign(LEFT,TOP);
  text(high_Score,width/2-100,10);
  // AHMED HASSAN
  fill(0, 128, 0);
  textSize(10);
  textAlign(RIGHT,BASELINE);
  text('AHMED HASSAN, 1.1.2017' ,width-10,score_box-3);
// global high score
  fill(255, 120, 150,155);
  textSize(20);
  textAlign(RIGHT,TOP);
  text('Global Top Score: ',width-250,10);
  textAlign(LEFT,TOP);
  text(GLobal_High_score,width-250,10);
  textAlign(RIGHT,TOP);
  text('Saved for: ',width-250,50);
  textAlign(LEFT,TOP);
  text(best_player,width-250,50);
  
  fill(255, 0, 100);
  add = true;
  foodgenerate = random(1);
  //density = slider.value();
  
  if (foodgenerate >= 0.3 && food.length < density){ 
	new_food = new Food();
  
	for (var i = food.length-1; i >= 0; i--) { 
	if (abs(new_food.locat.x - food[i].locat.x) < scl || abs(new_food.locat.y - food[i].locat.y) < scl ){
		add = false;		
	}
  }
  
  if (add == true){
	  food.push(new_food);
  }
  }
  
    for (var i = food.length-1; i >= 0; i--) { 
	if (food[i].toDelete){
	food.splice(i,1);
	} else if (!food[i].toDelete){
      food[i].show();
	  food[i].weight-= 1/2;
	}
  }
  for (var i = food.length-1; i >= 0; i--) { 
    if (s.eat(food[i]) || (food[i].weight==0) ) {
      food[i].die();
    }
  }

  s.death();
  s.update();
  s.show();
  
}





function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed != 1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW  && s.yspeed != -1) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && s.xspeed != -1) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && s.xspeed != 1) {
    s.dir(-1, 0);
  }else if (key === ' ') {
    //s.dir(0, 0);
  }
}


function touchStarted() {
	if (s.xspeed == 0  && pmouseY > score_box ){    // means it moves vertically 
	  if (pmouseX > s.x){
		  s.dir(1, 0); // right
		} else { 
		s.dir(-1, 0); // left
		}
	  } else if ( s.yspeed == 0  && pmouseY > score_box ){
		  if (pmouseY > s.y){
			 s.dir(0, 1);  // downword
		  } else{
			  
			 s.dir(0, -1);  // upward   
		  }
		  
	  }  
}
