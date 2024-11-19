

class Plant {
	
	constructor(x, y) {
		this.id= PLANT;
		this.beam= new PlantBeam();
		
		this.pos= createVector(x, y);
		this.ripe= true;
		
		this.size= this.beam.maxSize;
	}
	
	beingEatenBy(cornEater) {
		
		if(this.size > this.beam.maxSize) {
			this.size= this.beam.maxSize;
		}
		
		if(this.contact(cornEater)) {
			cornEater.hunger += this.beam.gain;
			this.size -= this.beam.gain;
		}
		
	}
	
	contact(object) {
		return object.pos.x < this.pos.x + this.size && object.pos.x > this.pos.x - this.size && object.pos.y < this.pos.y + this.size && object.pos.y > this.pos.y - this.size;
	} // Same function as in ponds
	
	draw() {	
		strokeWeight(this.size/2);
		
		if(this.ripe) {
			stroke(255, 255, 0);
		} else {
			stroke(0, 255, 255);
		}
		
		line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.size/2);
		
		if(this.size < this.beam.maxSize) {
			this.size += this.beam.growthSpeed;
		}
	}
}

