// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

function Snake() {
  this.x = scl/2;
  this.y = score_box;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = 0;
  
  this.eat = function(food) {
    var d = dist(this.x, this.y, food.locat.x, food.locat.y);
    if (d < 1) {
		this.score += ceil(food.weight);
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
		this.x = scl/2;
		this.y = score_box;
		
        this.total = 0;
        this.tail = [];
		this.xspeed = 0;
        this.yspeed = 0;
		
		if (this.score > GLobal_High_score){
			//console.log(GLobal_High_score);
			var data = {
				Name:player.value(),
			    Score:this.score
			}
			ref.push(data);
		}
		high_Score = max([high_Score, this.score]);
		this.score = 0;
      }
    }
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, scl/2, width - scl/2);
    this.y = constrain(this.y, score_box + scl/2, height - scl/2);
  }

  this.show = function() {
    fill(230,50,50,200);

    for (var i = 0; i < this.tail.length; i++) {
		//rectMode(CENTER);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
	//rectMode(CENTER);
    rect(this.x, this.y, scl, scl);

  }
}