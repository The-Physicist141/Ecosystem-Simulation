

class Puddle {
	constructor(x, y, size, gain) {
		this.id= WATER;
		this.gain= 5;
		this.size= 50;
		
		this.pos= createVector(x, y);
		this.ripe= true;
	}
	
	beingEatenBy(cornEater) {
		if(this.contact(cornEater)) {
			cornEater.thirst += this.gain;
			this.size -= this.gain;
		}
	}
	
	contact(object) {
		return object.pos.x < this.pos.x + this.size && object.pos.x > this.pos.x - this.size && object.pos.y < this.pos.y + this.size && object.pos.y > this.pos.y - this.size;
	} // Same function as in plants.
	
	draw() {
		fill(0, 255, 255);
		stroke(0, 0, 0);
		strokeWeight(1);
		circle(this.pos.x, this.pos.y, this.size);
		
		if(this.size < 40) {
			this.size += 0.25;
		}
	}
}