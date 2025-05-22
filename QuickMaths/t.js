//TODO: write some tests to check the practice mode eqution generation.

function validateEquation(eq, level){
	// Check for integers and non-negative values
	if(!Number.isInteger(eq.a) || !Number.isInteger(eq.b) || !Number.isInteger(eq.c)){
		return  {m: 'Violates integer', p: false};
	}

	if((eq.s !== '÷' && eq.a > level.lhsMax) || eq.b > level.lhsMax || eq.c > level.rhsMax){
		return {m: 'Violates max', p: false};
	}
	if(eq.a < level.lhsMin || eq.b < level.lhsMin || eq.c < level.rhsMin){
		return  {m: 'Violates min', p: false};
	}

	switch(eq.s){
		case '+':{
			if((eq.a+eq.b)!==eq.c){
				return  {m: 'Violates additon equals', p: false};
			}
			break;
		}	
		case '-':{
			if((eq.a-eq.b)!==eq.c){
				return {m: 'Violates subtraction equals', p: false};
			}
			break;
		}			
		case 'x':{
			if((eq.a*eq.b)!==eq.c){
				return {m: 'Violates multiplication equals', p: false};
			}
			break;
		}
		case '÷':{
			if(eq.b===0){
				return {m: 'Violates divide by zero', p: false};
			}
			if((eq.a/eq.b)!==eq.c){
				return {m: 'Violates division equals', p: false};
			}
			break;
		}
		default:{	
			return {m: 'Violates known equations', p: false};
		}
	}
	return {m: null, p: true};
}

function testPractice(){
	const violations = new Set();
	for(let i=0;i<levels.length;i++){
		const level = levels[i];
		generateLevelEquations(i);
		eqs.forEach(ex => {
			const isValid = validateEquation(eq, level);
			if(!isValid.p && !violations.has(isValid.m)){
				violations.add(isValid.m);
				console.log(level, eq, isValid.m);
				allValid = false;
			}
		});
	}
	return violations.size > 0;
}

function test(index){
	const level = levels[index];
	const { op, lhsMin, lhsMax, rhsMin, rhsMax, name } = level;

	console.log(`Testing ${name}`);
	let allValid = true;
	const violations = new Set();
    //just assume 1000 of each level is enough
	for(let i=0;i<1000;i++){
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
		const isValid = validateEquation(eq, level);
		if(!isValid.p && !violations.has(isValid.m)){
			violations.add(isValid.m);
			console.log(level, eq, isValid.m);
			allValid = false;
		}
	}
	return allValid
}

function testAll(){
	let allValid = testPractice();
	for(let i=0;i<levels.length;i++){
		allValid = test(i) && allValid;
	}
	if(allValid){
		console.log('All valid');
	}
}

//testAll(); 
