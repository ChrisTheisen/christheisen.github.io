function validateEquation(eq, level){
	// Check for integers and non-negative values
	if(!Number.isInteger(eq.a) || !Number.isInteger(eq.b) || !Number.isInteger(eq.c) ||
	   eq.a < 0 || eq.b < 0 || eq.c < 0){
		return false;
	}

	if(eq.a > level.lhsMax || eq.b > level.lhsMax || eq.c > level.rhsMax){
		return false;
	}
	if(eq.z < level.lhsMin || eq.b < level.lhsMin || eq.c < level.rhsMin){
		return false;
	}

	switch(eq.s){
		case '+':{
			if((eq.a+eq.b)!==eq.c){
				return false;
			}
			return true;
		}	
		case '-':{
			if((eq.a-eq.b)!==eq.c){
				return false;
			}
			return true;
		}			
		case 'x':{
			if((eq.a*eq.b)!==eq.c){
				return false;
			}
			return true;
		}
		case '÷':{
			if(eq.b===0){
				return false;
			}
			if((eq.a/eq.b)!==eq.c){
				return false;
			}
			return true;
		}
		default:{	
			return false;
		}
	}
}

function test(index){
	const level = levels[index];
	const { op, lhsMin, lhsMax, rhsMin, rhsMax, name } = level;

	console.log(`Testing ${name}`);
	let allValid = true;
    //just assume 100 of each level is enough
	for(let i=0;i<100;i++){
		let eq = null;
		switch(op){
			case 'A':{
				eq = buildA(lhsMin, lhsMax, rhsMin, rhsMax);
				break;
			}
			case 'S':{
				eq = buildS(lhsMin, lhsMax, rhsMin, rhsMax);
				break;
			}
			case 'M':{
				eq = buildM(lhsMin, lhsMax, rhsMin, rhsMax);
				break;
			}
			case 'D':{
				eq = buildD(lhsMin, lhsMax, rhsMin, rhsMax);
				break;
			}
			default:{
				eq = {s:'+', a:1, b:1, c:2};
				break;
			}
		}
		if(!validateEquation(eq, level)){
			console.log(level, eq);
			allValid = false;
		}
	}
	if(allValid){
		console.log('All valid');
	}
	else{
		console.log('Not all valid');
	}
}

function testAll(){
	for(let i=0;i<levels.length;i++){
		test(i);
	}
}

//testAll(); 
