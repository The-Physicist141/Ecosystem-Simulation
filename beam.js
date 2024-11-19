
'use strict';

class Beam { // binary evolution algorithm
	
	constructor() {
		this.mutationProbability= random(0.5, 1);
	}
	
	setMutationAmount(m) {
		this.mutationAmount= m;
	}
	
	setMate(obj) {
		this.mate= obj;
	}
	
	setHungerLimit(h) {
		this.hungerLimit= h;
	}
	
	setThirstLimit(t) {
		this.thirstLimit= t;
	}
	
	setMaxPD(pd) {
		this.maxPregnancyDuration= pd;
	}
	
	setSpeed(s) {
		this.speed= s;
	}
	
	setSight(s) {
		this.sight= s;
	}
	
	setChildWear() {
		this.childWear= 1;
	}
	
	setSize(s) {
		this.size= s;
	}
	
	setEmergencyThreshold(t) {
		this.emergencyThreshold= t;
	}
	
	setReproductionUrgeLimit(s) {
		this.reproductionUrgeLimit= s;
	}
	
	setMemoryLimit(s) {
		this.memorySize= s;
	}
	
	// This sets the properties using methods so we don't accidentally create a new property.
	
	geneticCopy() {
		let copy= new Beam();
		let splicedGenes= new Beam();
		
		let motherProperties= Object.keys(this);
		let fatherProperties= Object.keys(this.mate);
		
		for(let i in motherProperties) {
			if(random(1) < 0.5) {
				splicedGenes[motherProperties[i]]= this[motherProperties[i]];
			} else {
				splicedGenes[motherProperties[i]]= this.mate[fatherProperties[i]];
			}
		}
		
		// Splices genes between parents
		
		
		for(let property of Object.keys(splicedGenes)) {
			if(typeof splicedGenes[property] == 'object') {
				continue;
			}
			
			if(property == "index") {
				continue;
			}
			
			
			if(random(1) < this["mutationProbability"]) {
				copy[property]= splicedGenes["mutationAmount"] + splicedGenes[property];
				console.log("Mutation!");
			} else {
				
				// This else makes sure to set the property if the mutation doesn't happen. This took several weeks to devise.
				// No wait, about two months.
				
				copy[property]= parseFloat(splicedGenes[property]);
				console.log("No mutation.")
			}
			
			if(copy[property] <= 0) {
				copy[property]= 1;
				console.error("Cannot have property less than or equal to zero, adjusted.");
			}
			
		}
		
		copy.mother= this.directCopy();
		copy.father= this.mate.directCopy();
		
		
		
		
		return copy;
	}
	
	getProperties() {
		let testCopy= new Beam();
		
		for(let property of Object.keys(this)) {
			console.log("this." + property + "= " + this[property]);
			testCopy[property]= this[property] + 1;
		}
		
		console.log("Next: ");
		
		for(let property of Object.keys(testCopy)) {
			console.log("this." + property + "= " + testCopy[property]);
		}
	}
	
	directCopy() {
		let copy= new Beam();
		
		for(let property in this) {
			copy[property]= this[property]; // When it's iterating, it must be in brackets.
		}
		
		return copy;
	}
}


class PlantBeam extends Beam {
	
	constructor() {
		super();
		
		this.maxSize= random(20, 40);
		this.stickyFactor= random(0, 1);
		this.gain= 10;
		this.growthSpeed= random(0.5, 2);
	}
}







/*geneticCopy() {
		let copy= new Beam();
		
		for(let property of Object.keys(this)) {
			if(typeof this[property] == 'object') continue;
			if(property == "mutationProbability") continue;
		
			
			if(random(1) < this.mutationProbability) {
				
				copy[property]= this[property];
				
				
				if(random(1) > 0.5) {
					copy[property] += this.mutationamount;
				} else {
					copy[property] -= this.mutationamount;
				}
				
				if(copy[property] < 1) {
					copy[property]= this.mutationamount;
				}
				
				if(isNaN(copy[property])) {
					console.log(this.mutationamount);
					console.log(this[property]);
					throw new Error("'" + property + "' doesn't have a valid value: " + copy[property]);
				}
			}
		}
		
		copy.father= this.mate.directCopy();
		copy.mother= this.directCopy();
		copy.mate= null;
		
		return copy;
	} */







