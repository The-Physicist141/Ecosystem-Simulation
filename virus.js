

class Virus {
	constructor(x, y) {
		this.pos= createVector(x, y);
		this.vel= createVector(3, 0);
		this.acc= createVector(3, 0);
	}
	
	
	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.vel.limit(3);
	}
	
	draw() {
		fill(255, 0, 0);
		ellipse(this.pos.x, this.pos.y, 5, 5);
	}
}