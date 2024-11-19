

function crashBrowser() {
	let num= 1;
	
	for(let i= 0; true; i * num) {
		for(let j= 0; j < 100; j ++) {
			num= num * num * j;
		}
		num= num * num;
		
		console.log(i);
		console.log(num);
	}
}