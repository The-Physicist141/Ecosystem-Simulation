

class CommandRunner {
	
	constructor() {
		this.averages= {
			"speed" : [],
			"sight" : [],
			"size" : [],
		}
	}
	
	runCommand(command) {
		let parts= command.split(" ");
		let outputString= "";
		
		switch(parts[0]) {
			
			case "pause":
				pauseSimulation= true;
				outputString += "\nSimulation Paused. Everyone is stuck in limbo!";
				break;
				
			case "continue":
				pauseSimulation= false;
				outputString += "\nContinuing to run simulation.";
				break;
			
			case "freeze_dirtbag!":
				outputString += "\nOkay okay, I'm sorry!";
				this.runCommand("pause");
				break;
			
			case "keepAllAlive":
				keepAllAlive= parseInt(parts[1]);
				outputString += "Immortality set to: " + parts[1];
				break;
			
			case "teleport":
				for(let i= 0; i < cornEaters.length; i ++) {
					cornEaters[i].pos.x= mouseX;
					cornEaters[i].pos.y= mouseY;
				}
				break;
			
			case "difference": {
				let average= Averager.getAverage(cornEaters, parts[1]);
				
				try {
					this.averages[parts[1]].push(cornEaters, average);
					
					let ar= this.averages[parts[1]];
					
					if(this.averages[parts[1]].length > 1) {
						if(ar[ar.length - 1] > ar[ar.length - 2]) {
							outputString += "\nAverage " + parts[1] + " increased by " + ar[ar.length - 1] - ar[ar.length - 2] + ".";
						} else {
							outputString += "\nAverage " + parts[1] + " decreased by " + abs(ar[ar.length - 1] - ar[ar.length - 2]) + ".";
						}
					}
					
				} catch(e) {
					this.averages[parts[1]]= [];
					this.averages[parts[1]].push(Averager.getAverage(cornEaters, parts[1]));
				}
				
			break;}
			
			case "average":
				let average= Averager.getAverage(cornEaters, parts[1]);
				
				outputString += "\nAverage " + parts[1] + ": " + average + ".";
				
				break;
			
			case "setpopulation":
				outputString += "\nReloading population.";
				cornEaters= [];
				createLife(parseInt(parts[1]));
				
				this.runCommand("difference speed");
				this.runCommand("difference sight");
				this.runCommand("difference size");
				
				break;
			
			case "focus":
				grapher.object= cornEaters[parseInt(parts[1])];
				
				outputString += "\nFocusing on object " + parts[1];
				break;
				
			case "read":
				if(grapher.object.beam[parts[1]]) {
					outputString += "\n" + parts[1] + ": " + grapher.object.beam[parts[1]];
				} else {
					outputString += "\n" + parts[1] + ": " + grapher.object[parts[1]];
				}
				break;
			
			case "clear":
				consoleOutput.innerHTML= "Cleared Console.";
				break;
			
			case "runfor":
				for(let i= 0; i < parseInt(parts[1]); i ++) {
					runMainSimulation();
					console.log("Cycle " + i);
				}
				break;
			
			default:
				outputString= "\nYou think you could pass that by me? Invalid command.";
				break;
		}
		consoleOutput.innerHTML += "\n\n";
		consoleOutput.innerHTML += outputString;
	}
}



























// End