

class Feeler {
	constructor(owner, angle) {
		this.owner= owner;
		this.pos= createVector(this.owner.pos.x, this.owner.pos.y);
		
		this.currDist= 0;
		
		this.angleVector= p5.Vector.fromAngle(angle);
		this.isAlive= true;
		this.size= 5;
		
		this.contactWith= null;
	}
	
	getData() {
		return this.contactWith;
	}
	
	calculateMovement() {
		if(this.isAlive) {
			let x= this.angleVector.x * this.currDist;
			let y= this.angleVector.y * this.currDist;
			
			let nextPos= createVector(x, y);
			
			nextPos.add(this.owner.pos);
			
			this.pos= nextPos;
			
			this.currDist += 2;
			
			/*
				My main problem was getting the feelers to stay relative to their owners. Eventually, I just set the position to the
				unit velocity multiplied the distnace. Then, I added it to the position to stay relative.
			*/
		}
	}
	
	detectObstacles() {
		for(let i in obstacles) {
			
			let obstacle= obstacles[i];
			
			if(obstacle.contact(this)) {
				this.isAlive= false;
				
				this.contactWith= obstacle;
				
				return;
			}
			
			
		}
	}
	
	detect(objects) {
		for(let i in objects) {
			
			let obj= objects[i];
			
			if(!obj) {
				return;
			}
			
			if(obj.contact(this)) {
				
				let isPlant= this.owner.currentAction == FIND_FOOD && obj.id == PLANT && obj.ripe;
				let isWater= this.owner.currentAction == FIND_WATER && obj.id == WATER;
				
				// isMate= isMate && obj != this.owner;
				// This is to prevent the feelers from touching their owner, stopping reproduction.
				// This one got me stuck for a while.
				// I came back to look at it. This line hurts my brain.
				
				
				if(obj.id == OBSTACLE) {
					this.isAlive= false;
					this.contactWith= obj;
					return;
				}
				
				if(isPlant || isWater) {
					this.isAlive= false;
					this.contactWith= obj;
					
					return;
				} else {
					continue;
				}
			}
		}
	}
	
	
	
	disconnect() {
		if(dist(this.pos.x, this.pos.y, this.owner.pos.x, this.owner.pos.y) > this.owner.beam.sight) {
			this.isAlive= false;
			this.info= null;
		}
	}
	
	update() {
		
		let isSimWindow= modeValue == 0;
		let isTestWindow= modeValue == 1;
		
		this.calculateMovement(); // Uses advanced technology to calculate the movement of a feeler.
		
		if(isSimWindow) {
			this.detect(obstacles);
			this.detect(plants);
			this.detect(water);
			this.detect(cornEaters);
			
			//console.log("Sim Window");
			
		} else if(isTestWindow) {
			this.detect(testObstacles);
			this.detect(testPlants);
			this.detect(testWater);
			
			// console.log("Test Window");
		}
		
		this.disconnect();
	}
	
	draw() {
		
		if(debugMode) {
			fill(0, 0, 0);
			stroke(0, 0, 0);
			strokeWeight(1);
			circle(this.pos.x, this.pos.y, this.size);
		}
	}
}























