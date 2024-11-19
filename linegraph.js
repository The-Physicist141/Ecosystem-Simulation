
// Code retrofitted by me of course
	// Original code created by aferriss (https://editor.p5js.org/aferriss/sketches/S1UTHZBHm)
	
	// Original code:
	
	/* 
	let randomY = [];
let numPts = 25;

function setup() {
  createCanvas(400, 400);
  
  for(let i =0; i< numPts; i++){
   randomY.push(random(100,300)); 
  }
}

function draw() {
  background(220);
  
  drawLines();
  drawEllipses();
}

function drawEllipses(){
  noStroke();
    // draw ellipses
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1));
    let y = randomY[i];
    ellipse(x, y, 7);
  }
}

function drawLines(){
  stroke(0);
 // draw lines
  let px = 0;
  let py = randomY[0];
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1));
    let y = randomY[i];
    line(px, py, x, y);
    
  	//store the last position
    px = x;
    py = y;
  } 
}
	
	
	
	*/

class LineGraph {
	
	constructor(x, y, scale, property) {
		this.x= x;
		this.y= y;
		
		this.w= width;
		
		this.data= [];
		this.scale= scale;
		
		this.greatestValue= 10;
		
		this.property= property;
	}
	
	addData(cornEatersInstance) {
		let average= Averager.getAverage(cornEatersInstance, this.property);
		this.data.push(average);
		
		console.log("Data pushed: " + average);
		console.log("Position of next ellipse: " + map(average, 0, this.greatestValue, this.y, this.h));
	}
	
	
	drawEllipses(){
		noStroke();
		
		switch(this.property) {
			case "speed": fill(255, 0, 0); break;
			case "size": fill(0, 0, 255); break;
			case "sight": fill(255, 0, 255); break;
			case "mutationProbability": fill(255, 255, 255); break;
		}
		
		// draw ellipses
		for(let i =0; i < this.data.length; i++){
			let x = i * (this.w / (this.data.length-1));
			
			// let y = this.y - this.data[i] * this.scale;
			
			let y= map(this.data[i], 0, this.greatestValue, this.y, this.y - height);
			
			//fill(255);
			ellipse(x, y, 7);
		}
		stroke(0);
	}

	drawLines(){
		switch(this.property) {
			case "speed": stroke(255, 0, 0); break;
			case "size": stroke(0, 0, 255); break;
			case "sight": stroke(255, 0, 255); break;
			case "mutationProbability": stroke(255, 255, 255); break;
		}
		// draw lines
		let px = this.x;
		let py = map(this.data[0], 0, this.greatestValue, this.y, this.y - height);
		
		let firstPointX= px;
		let firstPointY= py;
	
		
		for(let i= 0; i < this.data.length; i++){
			let x = i * (this.w / (this.data.length-1));
			// let y = this.y - this.data[i] * this.scale;
			
			let y= map(this.data[i], 0, this.greatestValue, this.y, this.y - height);
			
			line(px, py, x, y);
		
			//store the last position
			px = x;
			py = y;
			
			if(i + 1 == this.data.length) {
				stroke(0, 0, 0);
				// line(firstPointX, firstPointY, x, y); // Trend line
			}
		}
	}
	
	draw() {
		this.drawLines();
		this.drawEllipses();
		
		// this.greatestValue= Math.max.apply(this.data);
		
		for(let i= 0; i < this.data.length; i ++) {
			if(this.data[i] > this.greatestValue) {
				this.greatestValue= this.data[i];
			}
		}
	}
}














