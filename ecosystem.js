// Do not be fooled by the others, this file is the REAL ecosystem.


let plants= [];
let testPlants= [];

let water= [];
let testWater= [];

let obstacles= [];
let testObstacles= [];

let cornEaters= [];

let toggleUtil= 0;

let stop= false;

let debugMode= false;

let showGraphs= true;
let showAverager= false;
let doNotDraw= false;
let informationalView= false;
let pauseSimulation= false;

let keepAllAlive= false;

let modeValue;

// let beam;

let testJohn;
let grapher;
let averager;
let commandRunner;
let lineGraph;
let graphs;

let waitForNextSecond= 1;

function setup() {
	
	
	let scale= 1 + 1/4;
	
	createCanvas(window.windowWidth * scale, window.windowHeight * scale);
	textAlign(CENTER);
	
	let params= location.href.split("?");
	
	if(params[1]) {
		modeSelect.value= params[1];
	}
	
	createWater(50); // 50
	createPlantLife(20); // 50
	createLife(40); // 40
	// Create all of the vital everything.
	
	/* cornEaters[0].gender= false;
	cornEaters[1].gender= true; */
	
	testJohn= new CornEater(width/2, height/2, null);

	
	testJohn.gender= true;
	testJohn.pregnancyDuration= 1;
	
	grapher= new Grapher(cornEaters[0], 100, 100, 4, 20);
	// Grapher
	
	commandRunner= new CommandRunner();
	// Command runner
	
	speedLineGraph= new LineGraph(200, height, 10, "speed");
	sizeLineGraph= new LineGraph(200, height, 100, "size");
	sightLineGraph= new LineGraph(200, height, 100, "sight");
	mutProbLineGraph= new LineGraph(200, height, 0.8, "mutationProbability");
	
	graphs= [speedLineGraph, sizeLineGraph, sightLineGraph, mutProbLineGraph];
	
	consoleOutput.style.height= "270px";
	
	let inspectProperties= [
		"speed",
		"size",
		"sight",
		"emergencyThreshold",
		"hungerLimit",
		"thirstLimit",
		"mutationAmount",
		"mutationProbability",
	];
	
	averager= new Averager(cornEaters, inspectProperties, 100, 100);
	
	commandRunner.runCommand("difference speed");
	commandRunner.runCommand("difference sight");
	commandRunner.runCommand("difference size");
	
	frameRate(1000);
}

function draw() {
	
	if(pauseSimulation) {
		return;
	}
	
	modeValue= parseFloat(modeSelect.value);
	
	if(stop) {
		noLoop();
	}
	
	if(!modeValue && modeValue != 0) {
		throw new Error("Mode value is " + modeValue + ". Not A Number!");
		noLoop();
	}
	
	switch(modeValue) {
		case 0:
			runMainSimulation();
			
			addItem.classList.add("hide");
			logs.classList.add("hide");
			
			consoleInput.classList.remove("hide");
			consoleOutput.classList.remove("hide");
			break;
		
		case 1:
			runTestWindow();
			
			addItem.classList.remove("hide");
			logs.classList.remove("hide");
			
			consoleInput.classList.add("hide");
			consoleOutput.classList.add("hide");
			break;
			
		default:
			showWindow= 0;
			break;
	}
	
	if(keepAllAlive) {
		for(cornEater of cornEaters) {
			if(cornEater) {
				cornEater.hunger= cornEater.beam.hungerLimit;
				cornEater.thirst= cornEater.beam.thirstLimit;
			}
		}
	}
	
	// exit(); // Debug thingy
}


function keyPressed() {
	
	
	if(document.activeElement == consoleInput || pauseSimulation) {
		return;
	}
	
	if(keyCode == ENTER || key == "s") {
		stop= confirm("You are about to stop the program. Are you sure about that?");
		
		if(!stop) return;
		
		inspectGeneticProperty();
	}
	
	if(key == 'c') {
		testPlants= [];
		testObstacles= [];
		testWater= [];
	}
	
	if(key == "f") {
		doNotDraw= !doNotDraw;
	}
	
	if(key == "d") {
		debugMode= !debugMode;
	}
	
	if(key == "u") {
		informationalView= !informationalView;
		console.log("Informational view set to " + informationalView);
	}
	
	if(key == "p") {
		console.clear();
		cleanMemory();
	}
	
	if(key == "g") {
		toggleUtil ++;
		
		if(toggleUtil > 2) {
			toggleUtil= 0;
		}
		
		showGraphs= toggleUtil == 0;
		showAverager= toggleUtil == 1;
	}
	
	if(key == "a") {
		try {
			grapher.object= grapher.object.targetMate;
		} catch(e) {
			alert("They're dead. Either that or this:\n" + e);
		}
	}
	
	
	if(key == "q") {
		alert("Simulation Paused. Press OK to continue.");
	}
	
	if(key == "m") {
		keepAllAlive= !keepAllAlive;
	}
}

function keyReleased() {
	if(document.activeElement == consoleInput) {
		
		if(keyCode == 13) {
			commandRunner.runCommand(consoleInput.value);
			consoleInput.value= "";
		}
	}
}

function mouseClicked() {
	testWindowInput();
}





















