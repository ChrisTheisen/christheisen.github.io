'use strict';

//practice
	//pass all equations from level

//quiz
	//3 hearts
	//lose a heart when you get one wrong
	//fill progress bar to pass

//Levels based on what my teacher wife told me to do.

let difficulty = 0;
let score = 0;
let current = null;
let practiceDone = 0;
let hearts = 3;

const eqs = [];
const missed = [];

const wrapper = document.getElementById('wrapper');
const eq = document.getElementById('equation');
const ans = document.getElementById('answer');
const lvl = document.getElementById('difficulty');
const prog = document.getElementById('progress');
const rem = document.getElementById('remaining');
const quiz = document.getElementById('quiz');
const heart = document.getElementById('hearts');
const practice = document.getElementById('practice');
const header = document.getElementById('header');

const levels = [
	{//0: addition 1
		name: 'Addition 1',
		op: 'A',
		lhsMin: 0,
		lhsMax: 5,
		rhsMin: 0,
		rhsMax: 5
	},
	{//1: addition 2
		name: 'Addition 2',
		op: 'A',
		lhsMin: 0,
		lhsMax: 10,
		rhsMin: 0,
		rhsMax: 10
	},
	{//2: addition 3
		name: 'Addition 3',
		op: 'A',
		lhsMin: 0,
		lhsMax: 10,
		rhsMin: 0,
		rhsMax: 20
	},
	{//3: subtraction 1
		name: 'Subtraction 1',
		op: 'S',
		lhsMin: 0,
		lhsMax: 5,
		rhsMin: 0,
		rhsMax: 5
	},
	{//4: subtraction 2
		name: 'Subtraction 2',
		op: 'S',
		lhsMin: 0,
		lhsMax: 10,
		rhsMin: 0,
		rhsMax: 10
	},
	{//5: subtraction 3
		name: 'Subtraction 3',
		op: 'S',
		lhsMin: 0,
		lhsMax: 20,
		rhsMin: 0,
		rhsMax: 10
	},
	{//6: multiplication 1
		name: 'Multiplication 1',
		op: 'M',
		lhsMin: 0,
		lhsMax: 5,
		rhsMin: 0,
		rhsMax: 25
	},
	{//7: multiplication 2
		name: 'Multiplication 2',
		op: 'M',
		lhsMin: 0,
		lhsMax: 7,
		rhsMin: 0,
		rhsMax: 49
	},
	{//8: multiplication 3
		name: 'Multiplication 3',
		op: 'M',
		lhsMin: 0,
		lhsMax: 12,
		rhsMin: 0,
		rhsMax: 144
	},
	{//9: division 1
		name: 'Division 1',
		op: 'D',
		lhsMin: 1,
		lhsMax: 5,
		rhsMin: 0,
		rhsMax: 5
	},
	{//10: division 2
		name: 'Division 2',
		op: 'D',
		lhsMin: 1,
		lhsMax: 10,
		rhsMin: 0,
		rhsMax: 10
	},
	{//11: division 3
		name: 'Division 3',
		op: 'D',
		lhsMin: 1,
		lhsMax: 12,
		rhsMin: 0,
		rhsMax: 12
	}
];

function levelUp(){
	difficulty = Math.min(levels.length-1,difficulty+1);
	lvl.value=difficulty+'';
	generatePracticeEquations();

	wrapper.classList.add('hide');
	showEncourage(300);
	for(let i=0;i<10;i++){
		setTimeout(()=> {launchFirework(2);}, 500*i);
	}
}
function levelDown(){
	difficulty = Math.max(0,difficulty-1);
	lvl.value=difficulty+'';
	generatePracticeEquations();
}
function correct(){
	launchFirework(3);
	updateEquation();
	score+=practiceDone;
	prog.value = score-1;
	if(practiceDone && score > 10){
		levelUp();
	}
}
function incorrect(){
	eq.classList.add('wrong');
	if(practiceDone){
		hearts--;
		heart.textContent = '♥'.repeat(hearts);
		if(!hearts){
			levelDown();
		}
	}
	else{
		missed.push({s:current.s, a:current.a, b:current.b, c:current.c});
		rem.textContent = eqs.length + missed.length + 1;
	}	
}

function checkAnswer(){
	if(!ans.value.trim()){return;}
	const x = Number(ans.value);
	eq.classList.remove('wrong');

	if(x===current.c){
		correct();
	}
	else{
		incorrect();
	}
	
	ans.value = '';
	ans.focus();
}

const ALLOWED_KEYS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete']);

ans.addEventListener('keydown', (e) => {
	const key = e.key;
	
	if (key === 'Enter') {
		checkAnswer();
		return;
	}
	
	if (!ALLOWED_KEYS.has(key) || 
		(key >= '0' && key <= '9' && ans.value.length > 3)) {
		e.preventDefault();
	}
});

function randomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max)+1;//makes the max inclusive
	return Math.floor(Math.random() * (max - min)) + min;
}

function buildA(lhsMin, lhsMax, rhsMin, rhsMax){
	const addendA = randomInt(lhsMin, lhsMax);
	const sum = randomInt(Math.max(rhsMin, addendA), Math.min(addendA+lhsMax, rhsMax));
	const addendB = sum - addendA;
	return {s:'+', a:addendA, b:addendB, c:sum};
}

function buildS(lhsMin, lhsMax, rhsMin, rhsMax){
	const difference = randomInt(rhsMin, rhsMax);
	const minuend = randomInt(Math.max(lhsMin, difference), lhsMax);
	const subtrahend = minuend - difference;
	return {s:'-', a:minuend, b:subtrahend, c:difference};
}

function buildM(lhsMin, lhsMax, rhsMin, rhsMax){
	const multiplicandA = randomInt(lhsMin, lhsMax);
	const minb = multiplicandA ? Math.max(rhsMin / multiplicandA, lhsMin) : lhsMin;
	const maxb = multiplicandA ? Math.min(rhsMax / multiplicandA, lhsMax) : lhsMax;
	const multiplicandB = randomInt(minb, maxb);
	const product = multiplicandA * multiplicandB;
	return {s:'x', a:multiplicandA, b:multiplicandB, c:product};
}

function buildD(lhsMin, lhsMax, rhsMin, rhsMax){
	const divisor = randomInt(Math.max(1, rhsMin), rhsMax); // Ensure no division by zero
	const quotient = randomInt(lhsMin, lhsMax);
	const dividend = divisor * quotient;
	return {s:'÷', a:dividend, b:divisor, c:quotient};
}

function updateEquation(){
	eq.classList.remove('wrong');

	if(!eqs.length){
		if(missed.length){
			while(missed.length){eqs.push(missed.pop());}
		}
		else{
			practiceDone=1;
			generateRandomEquation();
		}
	}
	current = eqs.pop();
	equation.textContent = `${current.a}${current.s}${current.b}`;
	
	if(practiceDone){
		rem.parentNode.classList.add('hide');
		quiz.classList.remove('hide');
		header.textContent = 'Quiz Time';
		setBgColor('#87CE87'); // Green for quiz mode
		heart.textContent = '♥'.repeat(hearts);
	}
	else{
		rem.textContent = eqs.length + missed.length + 1;
		rem.parentNode.classList.remove('hide');
		quiz.classList.add('hide');
		header.textContent = "Let's Practice";
		setBgColor('#87CEEB'); // Blue for practice mode
	}
}
function generateRandomEquation(){
	const level = levels[difficulty];
	const { op, lhsMin, lhsMax, rhsMin, rhsMax } = level;

	switch(op){
		case 'A':{
			eqs.push(buildA(lhsMin, lhsMax, rhsMin, rhsMax));
			break;
		}
		case 'S':{
			eqs.push(buildS(lhsMin, lhsMax, rhsMin, rhsMax));
			break;
		}
		case 'M':{
			eqs.push(buildM(lhsMin, lhsMax, rhsMin, rhsMax));
			break;
		}
		case 'D':{
			eqs.push(buildD(lhsMin, lhsMax, rhsMin, rhsMax));
			break;
		}
		default:{
			eqs.push({s:'+', a:1, b:1, c:2});
			break;
		}
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function generatePracticeEquations() {
	difficulty = Number(lvl.value);
	generateLevelEquations(difficulty);
}

function generateLevelEquations(difficulty){
	hearts = 3;
	score = 0;
	eqs.length = 0;
	practiceDone = 0;
	
	const level = levels[difficulty];
	const { op, lhsMin, lhsMax, rhsMin, rhsMax } = level;
	
	const equations = new Set();
	
	const addEquation = (s, a, b, c) => {
		//add equation as a string to the set to verify uniqueness
		equations.add(JSON.stringify({a, b, c, s}));
	};
	
	switch(op) {
		case 'A': {
			for(let addendA = lhsMin; addendA <= lhsMax; addendA++) {
				for(let sum = Math.max(rhsMin, addendA); sum <= Math.min(addendA+lhsMax, rhsMax); sum++) {
					const addendB = sum - addendA;
					addEquation('+', addendA, addendB, sum);
				}
			}
			break;
		}
		case 'S': {
			for(let difference = rhsMin; difference <= rhsMax; difference++) {
				for(let minuend = Math.max(lhsMin, difference); minuend <= lhsMax; minuend++) {
					const subtrahend = minuend - difference;
					addEquation('-', minuend, subtrahend, difference);
				}
			}
			break;
		}
		case 'M': {
			for(let multiplicandA = lhsMin; multiplicandA <= lhsMax; multiplicandA++) {
				const minb = multiplicandA ? Math.ceil(rhsMin / multiplicandA) : lhsMin;
				const maxb = multiplicandA ? Math.min(Math.floor(rhsMax / multiplicandA), lhsMax) : lhsMax;
				for(let multiplicandB = minb; multiplicandB <= maxb; multiplicandB++) {
					const product = multiplicandA * multiplicandB;
					addEquation('x', multiplicandA, multiplicandB, product);
				}
			}
			break;
		}
		case 'D': {
			for(let divisor = lhsMin; divisor <= lhsMax; divisor++) {
				if(divisor === 0) continue;
				for(let quotient = rhsMin; quotient <= rhsMax; quotient++) {
					const dividend = divisor * quotient;
					addEquation('÷', dividend, divisor, quotient);
				}
			}
			break;
		}
		default: {
			addEquation('+', 1, 1, 2);
			break;
		}
	}
	
	//convert to equation objects
	const eqsArray = Array.from(equations).map(eq => JSON.parse(eq));
	//shuffle the equations
	eqs.push(...shuffleArray(eqsArray));
	//update the current equation
	updateEquation();
	//focus on the answer input
	ans.focus();
}

function populateSelectOptions() {
	const select = lvl;
	levels.forEach((level, index) => {
		const option = document.createElement('option');
		option.value = index;
		option.textContent = level.name;
		select.appendChild(option);
	});
}

populateSelectOptions();
generatePracticeEquations();
ans.focus();

// Instructions overlay handling
function showInstructions() {
    document.getElementById('instructionsOverlay').classList.add('show');
}

function hideInstructions() {
    document.getElementById('instructionsOverlay').classList.remove('show');
    localStorage.setItem('instructionsShown', 'true');
    ans.focus();
}

// Show instructions on first visit
if (!localStorage.getItem('instructionsShown')) {
    showInstructions();
}
