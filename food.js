function Food() {
	
  var cols = floor((width)/scl);
  var rows = floor((height-score_box)/scl);
  luck = random(1);
  if (luck >= 0.95){
	  this.weight = Food_limit;
  } else if (luck >=0.1) {
	   this.weight = floor(luck * Food_limit/2);
  }
  else {
	  this.weight = 20;
	  
  }
  
  this.toDelete = false;
  this.locat = createVector(floor(random(1,cols+1))-1/2, floor(score_box/scl) + floor(random(1,rows+1))-1/2);
  this.locat.mult(scl);
  
 this.show = function(){
  fill(255+0*this.weight, 255-2*this.weight, 255-2*this.weight);
  textSize(ceil(scl*2/3));
  textAlign(CENTER,CENTER);
  text(ceil(this.weight),this.locat.x, this.locat.y);
  noFill(255, 0, 100);
  //rectMode(CENTER);
  rect(this.locat.x, this.locat.y,scl,scl);
  
   }
  
  this.die = function(){
	this.toDelete = true;
  
}
}
