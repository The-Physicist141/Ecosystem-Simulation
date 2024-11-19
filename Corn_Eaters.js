
'use strict';


// The Big Boy Class, also the first being in this dimension to ever reproduce.

/*

- Speed
- Sight
- Size
- HungerLimit
- ThirstLimit
- PregnancyDuration
- mutationamount


*/


class CornEater {
	
	constructor(x, y, beam) {
		this.beam= beam;
		
		// IMPORTANT! Some errors may occur in outside scripts because I renamed these properties!
		
		if(!this.beam) {
			this.beam= new Beam();
			
			this.beam.setHungerLimit(random(600, 1000));
			this.beam.setThirstLimit(random(600, 1000));
			this.beam.setMaxPD(50);
			
			/* this.beam.setSpeed(3);
			this.beam.setSight(100);
			this.beam.setSize(20);
			this.beam.setEmergencyThreshold(random(0.75, 1));
			this.beam.setMutationamount(random(0.1, 1)); */
			
			this.beam.setSpeed(random(1, 10));
			this.beam.setSight(random(5, 100));
			this.beam.setSize(random(10, 70));
			this.beam.setEmergencyThreshold(random(1));
			this.beam.setMutationAmount(random(0, 1));
			
			
			
			console.log("Generation 0 created");
		}
		
		this.beam.index= -1;
		this.mateRefresh;
		
		
		this.pos= createVector(x, y);
		this.vel= createVector(random(5), random(5));
		this.acc= PZero();
		
		this.nearestObject;
		this.currentAction;
		this.memory= new Array(this.beam.memorySize);
		
		this.feelers= [];
		this.attractors= [];
		
		this.emergency= false;
		this.beam.mate= null;
		this.targetMate= null;
		
		
		this.hunger= this.beam.hungerLimit;
		this.thirst= this.beam.thirstLimit;
		this.pregnancyDuration= this.beam.maxPregnancyDuration;
		
		this.id= CORN_EATER;
		this.colour= color(255, 255, 0);
		this.gender= random(1) < 0.5;
		this.pregnant= false;
		this.childrenWear= 0;
		
		this.unimpressed= [];
		this.occupied= false;
		this.inventory= [];
	}
	
	
	contact(object) {
		try {
			let distance= dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y) < this.beam.size;
			
			return distance;
		} catch(e) {
			console.error("Index: " + this.beam.index);
			throw e;
		}
	}
	
	eat() {
		if(this.nearestObject) {
			if((this.nearestObject.id == PLANT || this.nearestObject.id == WATER) && this.nearestObject.ripe) {
				this.nearestObject.beingEatenBy(this);
			} else {
				this.nearestObject= null;
			}
		}
	}


	isMale() {
		return this.gender;
	}
	
	isFemale() {
		return !this.gender;
	}
	// Pretty much useless, they're just nice to have.
	
	updateReproduction() {
		
		if(this.pregnant) {
			this.colour= color(204, 143, 29);
			
			if(this.pregnancyDuration > 0) {
				this.pregnancyDuration -= 0.5;
			} else {
				this.createChild();
				this.pregnancyDuration += 0.5;
				this.pregnant= false;
			}
		} else if(this.pregnancyDuration <= this.beam.maxPregnancyDuration) {
			this.pregnancyDuration += 0.5;
		}
		
		
		if(this.isMale() && this.pregnant) {
			throw new Error("Males cannot be pregnant.");
			this.pregnant= false;
		}
	}
	
	getPregnant() {
		if(this.pregnancyDuration >= this.beam.maxPregnancyDuration) {
			this.pregnant= true;
			console.log(this.beam.index + " is pregnant!");
		}
	}
	
	setMate(obj) {
		this.beam.setMate(obj);
	}		
	
	// RIP old code.
	// You served me well, but not well enough.
	
	matingRitual() {
		if(!this.targetMate) {
			return;
		}
		
		if(!this.emergency && !this.targetMate.emergency) {
			this.gotoObject(this.targetMate);
			
			if(this.contact(this.targetMate)) {
				if(this.isFemale()) {
					this.getPregnant();
					this.beam.mate= this.targetMate.beam.directCopy();
				}
			}
		}
	}
	
	
	
	detectMate(cornEaterObject) { // New function for mate detection
		if(this.targetMate || this.isFemale()) {
			return;
		}
		// SIMP
		
		for(let object of cornEaters) {
			if(cornEaterObject) {
				object= cornEaterObject;
			}
			
			if(!object) {
				continue;
			}
			
			if(this.unimpressed.includes(object)) {
				continue;
			}
			
			if(this.contact(object)) {
				
				if(object == this) {
					this.unimpressed.push(this);
					console.log("Can't date yourself.");
				}
				
				
				if(object.beam.mother && this.beam.mother) {
					if(object.beam.index == this.beam.mother.index || object.beam.index == this.beam.father.index) {
						this.unimpressed.push(object);
						console.log("No incest");
						
						if(cornEaterObject) {
							break;
						}
						
						continue;
					}
				} // No.
				
				
				if(object.targetMate) {
					console.log("On1y one mate possib1e.");
					this.unimpressed.push(object);
					
					if(cornEaterObject) {
						break;
					}
					
					continue;
				} // You already have a mate.
				
				if(object.gender == this.gender) {
					console.log("Sexes are equal, not suitable.");
					
					this.unimpressed.push(object);
					
					if(cornEaterObject) {
						break;
					}
					
					continue;
				}
				
				
				this.targetMate= object;
				object.targetMate= this;
				
				break;
			}
		}
	}
	
	createChild() { // Yes, that's what it does.
		let beam= this.beam.geneticCopy();
		
		let child= new CornEater(this.pos.x, this.pos.y, beam);
		
		cornEaters.push(child);
		child.beam.index= cornEaters['length'] - 1; // Very important.
		
		console.log(this.beam.index + " had a child!");
		
		this.beam.mate= null;
	}
	
	// --------------------------------------------------- REPRODUCTION STUFF ABOVE ---------------------------------------------------
	
	decide() {
		
		this.emergency= this.hunger < this.beam.emergencyThreshold * this.beam.hungerLimit || this.thirst < this.beam.emergencyThreshold * this.beam.hungerLimit;
		
		
		if(this.hunger < this.thirst) {
			this.currentAction= FIND_FOOD;
		} else {
			this.currentAction= FIND_WATER;
		}
	}
	
	findNearest(type) { // Finding food is different from finding mates.
		
		if(this.feelers.length) {
			for(let i in this.feelers) {
				let feeler= this.feelers[i];
				
				
				if(!feeler.isAlive) {
					let object= feeler.getData();
					
					if(object) {
						this.nearestObject= object;
					}
					
					// this.appendToMemory(object);
				}
			}
		}
		
		if(this.nearestObject) {
			let isPlant= this.currentAction == FIND_FOOD && this.nearestObject.id != PLANT;
			let isWater= this.currentAction == FIND_WATER && this.nearestObject.id != WATER;
			
			if(isPlant || isWater) {
				this.nearestObject= null;
			}
		}
	}
	
	gotoObject(objectInQuestion) { // Move to object
		if(objectInQuestion) {
			let loc= createVector(objectInQuestion.pos.x, objectInQuestion.pos.y);
			// current location
			
			let difference= p5.Vector.sub(loc, this.pos);
			// difference between location and position
			
			this.acc= difference;
			// Set acceleration to difference
			
		} else {
			this.acc= createVector(random(-0.5, 0.5), random(-0.5, 0.5));
			// If no object, just move randomly.
		}
	}
	
	takeAction() {
		
		switch(this.currentAction) {
			case IDLE:
				
				break;
			
			case FIND_FOOD:
				this.findNearest(PLANT);
				this.gotoObject(this.nearestObject);
				this.colour= color(255, 0, 0);
				
				break;
			
			case FIND_WATER:		
				this.findNearest(WATER);
				this.gotoObject(this.nearestObject);
				this.colour= color(0, 0, 255);
				
				break;
		}
	}
	
	// ------------------------------------------- DECISION CENTER ------------------------------------------------
	
	updateFeelers() { // update feelers
		
		if(this.feelers.length < 8) {
			for(let i= 0; i < 8; i ++) {
				this.feelers[i]= new Feeler(this, 2 * PI * 0.125 * i);
				// Create feelers
			}
		}
		
		
		for(let i in this.feelers) {
			let feeler= this.feelers[i];
			
			if(!feeler.isAlive) {
				this.feelers.splice(i, 1);
				continue;
			}
			
			feeler.update();
			feeler.draw();
			// Animate / Get data from feelers
		}
	}
	
	
	feelerReport() {
		for(let i in this.feelers) {
			if(!this.feelers[i].isAlive && this.feelers[i].contactWith != null) {
				if(this.feelers[i].contactWith.id == CORN_EATER) {
					console.log(this.feelers[i].contactWith);
				}
			}
		}
	}
	
	warp() { // It is what it says it is.
		if(this.pos.x > width) {
			this.pos.x= 0;
		} else if(this.pos.x < 0) {
			this.pos.x= width;
		}
		
		if(this.pos.y > height) {
			this.pos.y= 0;
		} else if(this.pos.y < 0) {
			this.pos.y= height;
		}
		
		
	}
	
	subtractHealth() {
		if(this.hunger > 0) {
			this.hunger -= this.beam.speed * 0.04; // For speed usage
			// this.hunger -= this.beam.sight * 0.004; // For sight usage
			this.hunger -= this.beam.size * 0.001; // Size
		}
		
		if(this.thirst > 0) {
			this.thirst -= 0.1/3 * 2 * this.beam.speed;
		}
		
		
	}
	
	antiFat() {
		if(this.hunger > this.beam.hungerLimit) {
			this.hunger= this.beam.hungerLimit;
		}
		
		if(this.thirst > this.beam.thirstLimit) {
			this.thirst= this.beam.thirstLimit;
		}
	} // Now you can loose weight without any effort!
	
	update() {
		
		if(this.index) {
			throw new Error("Index property shouldn't exist!");
		}
		
		if(this.unimpressedFemales) {
			throw new Error("unimpressed should be gender neutral!");
		}
		
		if(isNaN(this.beam.speed)) {
			throw new Error("Speed must be a number! Index: " + this.beam.index);
		}
		// Fixing JavaScript for them.
		
		
		
		if(this.nearestObject) {
			
			let isPlant= this.currentAction == FIND_FOOD && this.nearestObject.id == PLANT;
			let isWater= this.currentAction == FIND_WATER && this.nearestObject.id == WATER;
			
			if(isPlant && isWater) {
				this.nearestObject= null;
			}
		}
		
		
		
		this.acc.normalize();
		this.acc.mult(this.beam.speed / (this.beam.size / 20));
		// these calculations should be in the gotoObject function.
		
		
		this.detectMate();
		this.matingRitual();
		// Nintendo won't exist forever, you're going to have to find a girlfriend.
		
		this.vel.limit(this.beam.speed);
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		// Motor Center
		
		this.eat();
		this.updateFeelers();
		this.subtractHealth();
		this.antiFat();
		// Simulate Life
		
		this.updateReproduction();
		// Reproduction
		
		this.decide();
		this.takeAction();
		// Brain
		
		if(this.targetMate) {
			if(!cornEaters[this.targetMate.beam.index]) {
				console.error(this.beam.index + " can't let go of the past.");
				this.targetMate= null;
			}
		}
		
	}
	
	
	draw() {
		
		strokeWeight(1);
		stroke(0);
		fill(this.colour);
		
		if(this.pregnant) {
			fill(156, 108, 25);
		}
		
		circle(this.pos.x, this.pos.y, this.beam.size);
		
		if(debugMode) {
			noFill();
			circle(this.pos.x, this.pos.y, this.beam.sight * 2);
		}
		
		
		let g= "Female";
		
		
		if(this.isMale()) {
			g= "Male";
		}
		
		fill(0);
		textSize(15);
		text(g, this.pos.x, this.pos.y - this.beam.size/2);
	}
	
}















