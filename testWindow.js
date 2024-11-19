

let testWindowLogObjects= [
	null,
	null,
	null,
	null,
	null,
	null,
	null
];



function runTestWindow() { // Welcome to the testing grounds
	background(100);
	
	testJohn.update();
	testJohn.draw();
	testJohn.warp();
}

function updateTestPlants() {
	for(let i in testPlants) {
		let plant= testPlants[i];
		
		//plant.update();
		plant.draw();
	}
}






function testWindowInput() {
	if(modeValue == 1) {
		switch(parseFloat(addItem.value)) {
			case 1:
					testPlants.push(new Plant(mouseX, mouseY, 40));
				break;
		}
	}
}



