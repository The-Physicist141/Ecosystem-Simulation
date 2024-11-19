


class Averager {
	constructor(list, properties, x, y) {
		this.list= list;
		this.properties= properties;
		
		this.x= x;
		this.y= y;
	}
	
	static getAverage(objectList, property) {
		let quantityAlive= 0;
		
		let sum= 0;
		
		for(let object of objectList) {
			
			if(object) {
				sum += parseFloat(object.beam[property]);
				quantityAlive ++;
			}
		}
		
		return sum / quantityAlive;
	}
	
	run() {
		let quantityAlive= 0;
		let values= new Object();
		
		for(let property of this.properties) {
			values[property]= 0;
			
			if(typeof property != 'string') {
				throw new Error("Property is not string!", property);
			}
		}
		
		for(let object of this.list) {
			
			if(object) {
				for(let property of this.properties) {
					values[property] += parseFloat(object.beam[property]);
				}
				
				quantityAlive ++;
			}
		}
		
		// console.log(values["speed"]);
		
		for(let property of Object.keys(values)) {
			values[property] /= quantityAlive;
		}
		
		let y= 0;
		
		fill(0);
		textSize(15);
		textAlign(LEFT);
		
		for(let property of Object.keys(values)) {
			
			text(property + ": " + values[property], this.x, this.y + 20 * y);
			y ++;
		}
	}
}







