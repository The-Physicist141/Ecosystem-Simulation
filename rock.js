

class Rock {
	constructor(x, y, w, h) {
		this.pos= createVector(x, y);
		this.w= w;
		this.h= h;
		
		this.id= OBSTACLE;
	}
	
	contact(object) {
		return object.pos.x < this.pos.x + this.w && object.pos.x > this.pos.x - this.w && object.pos.y < this.pos.y + this.h && object.pos.y > this.pos.y - this.h;
	}
	
	
	draw() {
		fill(100);
		strokeWeight(1);
		stroke(0);
		rect(this.pos.x, this.pos.x, this.w, this.h);
	}
}