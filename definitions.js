

const FIND_FOOD= "find food";
const FIND_WATER= "find water";
const FIND_MATE= "find mate";
const IDLE= "idle";

const PLANT= "plant";
const OBSTACLE= "obstacle";
const CORN_EATER= "cornEater";
const WATER= "water";
const FEMALE= "female";
const MALE= "male";
const ATTRACTOR= "attractor";

let logs= document.getElementById("log");
let simulationWindow= document.getElementById("simulation");
let testWindow= document.getElementById("test");
let modeSelect= document.getElementById("mode-select");
let addItem= document.getElementById("place-item");

let consoleOutput= document.getElementById("console-output");
let consoleInput= document.getElementById("console-input");

function PZero() {
	return createVector(0, 0, 0);
}


function inspectGeneticProperty() {
	
	let property= prompt("Assuming you are the creator of this program, what genetic property would you like to inspect?");
	
	if(!property) return;
	
	for(let obj of cornEaters) {
		if(isNaN(obj.beam[property])) {
			console.log(obj.beam.index);
		}
	}

}

function runLineGraph() {
	if(floor(millis() / 1000) / waitForNextSecond == 1) {
		// lineGraph.addData(cornEaters);
		
		for(let i in graphs) {
			graphs[i].addData(cornEaters);
		}
		
		waitForNextSecond ++;
		
		console.log("Data added; " + waitForNextSecond);
	}
}


function runMainSimulation() {
	background(0, 100, 0);
	
	updatePlants();
	updateWater();
	// updateObstacles();
	updateCornEaters();
	
	runLineGraph();
	for(let i in graphs) {
		graphs[i].draw(cornEaters);
	}
	
	if(mouseIsPressed) {
		for(let cornEater of cornEaters) {
			
			if(!cornEater) {
				continue;
			}
			
			if(dist(mouseX, mouseY, cornEater.pos.x, cornEater.pos.y) < cornEater.beam.size / 2) {
				grapher.object= cornEater;
				break;
			}
		}
	}
	
	if(showAverager) {
		averager.run();
	}
	
	let alive= 0;
	
	for(cornEater of cornEaters) {
		if(cornEater) {
			alive ++;
		}
	}
	
	fill(0);
	strokeWeight(1);
	text("Population: " + alive, width/5 * 4, height/2);
	
	graveDigger();
}


function setLog(l) {
	
	if(!l) {
		logs.innerHTML= "";
	}
	
	logs.innerHTML= l;
}




function createLife(population) {
	for(let i= 0; i < population; i ++) {
		let being= new CornEater(random(width), random(height), null);
		being.beam.index= i;
		
		cornEaters.push(being);
	}
}

function createWater(population) {
	for(let i= 0; i < population; i ++) {
		water.push(new Puddle(random(width), random(height), 50, 40));
	}
}

function createPlantLife(plantPop) {
	for(let i= 0; i < plantPop; i ++) {
		plants.push(new Plant(random(width), random(height)));
	}
}

function updatePlants() {
	for(let plant of plants) {
		plant.draw();
	}
}

function updateObstacles() {
	for(let i in obstacles) {
		let obstacle= obstacles[i];
		obstacle.draw();
	}
}

function updateWater() {
	for(let pond of water) {
		pond.draw();
	}
}

function updateCornEaters() {
	
	textAlign(CENTER);
	
	for(let i in cornEaters) {
		let cornEater= cornEaters[i];
		
		if(cornEater) {
			cornEater.warp();
			cornEater.update();
			
			if(!doNotDraw) {
				cornEater.draw();
			}
		}
		
	}
	
	if(showGraphs) {
		grapher.run();
	}
}




















