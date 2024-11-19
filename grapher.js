



class Grapher { // Graphing tool I made.
	
	constructor(object, x, y, scale, width) {
		this.object= object;
		
		this.x= x;
		this.y= y;
		this.scale= scale;
		this.width= width;
	}
	
	setObject(i) {
		this.object= cornEaters[i];
	}
	
	run() {
		
		if(!this.object) {
			textSize(13);
		
			fill(0);
			text("The subject is dead. Click on somebody else?", this.x + 200, this.y);
			return;
		}
		
		
		if(this.object.emergency) {
			fill(255, 0, 0);
		} else {
			fill(255, 255, 0);
		}
		
		rect(this.x, (this.y + this.object.beam.hungerLimit - this.object.hunger) / this.scale, this.width, this.object.hunger / this.scale);
		// hunger
		
		if(this.object.emergency) {
			fill(255, 0, 0);
		} else {
			fill(0, 0, 255);
		}
		
		rect(this.x + this.width + 10, (this.y + this.object.beam.thirstLimit - this.object.thirst) / this.scale, this.width, this.object.thirst / this.scale);
		// thirst
		
		
		if(this.object.emergency) {
			fill(255, 0, 0);
		} else {
			fill(204, 143, 29);
		}
		
		rect(this.x + this.width * 2 + 10 * 2, (this.y + this.object.beam.maxPregnancyDuration - this.object.pregnancyDuration) / this.scale, this.width, this.object.pregnancyDuration / this.scale);
		// Reproduction Urge
		
		
		
		
		textSize(13);
		
		fill(0);
		text("Subject index: " + this.object.beam.index, this.x + 200, this.y);
		text("Current Action: " + this.object.currentAction, this.x + 200, this.y + 20);
		
		if(this.object.targetMate) {
			text("Mate: " + this.object.targetMate.beam.index, this.x + 200, this.y + 20 * 2);
		} else {
			text("Mate: null", this.x + 200, this.y + 20 * 2);
		}
		
		let ready= false;
		let mateReady= false
		
		try {
			ready= !this.object.emergency;
			mateReady= !this.object.targetMate.emergency;
		} catch(e) {
			
		}
		
		text("Ready to Reproduce: " + (ready && mateReady), this.x + 200, this.y + 20 * 3);
		
		if(this.object.nearestObject) {
			text("Nearest Object: " + this.object.nearestObject.id, this.x + 200, this.y + 20 * 4);
			text("Ripe: " + this.object.nearestObject.ripe, this.x + 200, this.y + 20 * 5);
		} else {
			text("Nearest Object: null", this.x + 200, this.y + 20 * 4);
		}
		
		strokeWeight(10);
		
		if(ready && mateReady) {
			line(this.object.pos.x, this.object.pos.y, this.object.targetMate.pos.x, this.object.targetMate.pos.y);
		} else if(this.object.nearestObject) {
			line(this.object.pos.x, this.object.pos.y, this.object.nearestObject.pos.x, this.object.nearestObject.pos.y);
		}
		
		strokeWeight(1);
		text("Observed Subject", this.object.pos.x, this.object.pos.y);
		
		
		/* if(informationalView) {
			for(let data of this.object.unimpressed) {
				if(data.obj == this.object) continue;
				
				data.obj.colour= color(255);
			}
		} */
	}
}












































