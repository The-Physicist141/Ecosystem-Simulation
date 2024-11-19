




function graveDigger() {
	for(let i in cornEaters) {
		if(cornEaters[i]) {
			if(cornEaters[i].thirst <= 0 || cornEaters[i].hunger <= 0 || cornEaters[i].lifeSpan <= 0) {
				if(cornEaters[i].thirst < cornEaters[i].hunger) {
					console.log("Corn Eater " + i + " died from thirst and was buried.");
				} else {
					console.log("Corn Eater " + i + " died from hunger and was buried.");
				}
				cornEaters[i]= null;
				continue;
			}
			
			
		}
		
		if(i > Infinity) { // I don't remember what this is for.
			cornEaters.splice(i, 1);
		}

	}
}

function cleanMemory() {
	let j= 0;
	
	for(let i in cornEaters) {
		if(cornEaters[i] == null) {
			cornEaters.splice(i, 1);
			j ++;
		}
	}
	
	
	console.log("Removed " + j + " spots.");
}





