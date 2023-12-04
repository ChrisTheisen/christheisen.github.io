//Not used too much, but here if a specific element needs to be referenced.
const UIElement = {}; 

function setElementText(element, text)  {
	if(!element){return;}
	if(text === 0){text = "0";}//silly js
	
	if(element.textContent === text){return;}
	element.textContent = text;
}
function getUIElement(input){
	let e = UIElement[input];
	if(!e){
		e = document.getElementById(input);
		if(e){ UIElement[input] = e; }
	}
	return e;
}
function removeUIElement(input){
	const e = UIElement(input);
	if(e===null){return;}
	e.parentNode.removeChild(e);
	delete UIElement[input];
}

function createUIElement({type='div', id=null, parent=null, cssClasses=[], style={}, title=null, attr={}, textContent=null, onclick=null, onchange=null}){
	if(id){
		let e = getUIElement(id);
		if(e){
			if(textContent){ setElementText(e, textContent); }
			return e;
		}
	}
	
	e = document.createElement(type);
	if(id){ e.id = id; }

	for([key, value] of Object.entries(style)){ e.style[key] = value; }
	for([key, value] of Object.entries(attr)){ e.setAttribute(key, value); }

	if(cssClasses.length){ cssClasses.forEach(x => e.classList.add(x)); }
	if(textContent) { e.textContent = textContent; }
	if(title){ e.title = title; }
	if(parent){ parent.appendChild(e); }
	if(onclick){ addUIEventListener(e, onclick); }
	if(onchange){ addUIEventListener(e, onchange, 'change'); }
	
	return e;
}

function addUIEventListener(element, func, event='click'){
	if(element === null || func === null){ return; }
	
	element.addEventListener(event, func);
}

function isUnlocked(input){
	if(!input){return true;}
	if(!input.u){return false;}
	return isUnlocked(ParentMap[input.n]);
}

function unlock(input){
	if(!input){return;}
	
	input.u = true;
	input.mb.classList.toggle('hide', false);
	
	unlock(ParentMap[input.n]);
}

function fullName(input, name){
	if(!input){return name;}
	return fullName(ParentMap[input.n], `${input?.n}.${name}`);
}

function arraysOverlap(a,b){
	const m = a.every(x => b.some(y => x.n === y.n));
	const n = b.every(x => a.some(y => x.n === y.n));
	return m&&n;
}

function findLockedFlavorsByComponents(input){
	const output = [];
	if(!input?.length){return output;}
	
	Object.values(AllFlavors).filter(x => !x.u).forEach(x => {
		if(arraysOverlap(x.c.map(x => x.inv.f), input)){
			output.push(x);
		}
    });
	return output;
}

function buildMaps(input, parent) {
	input.forEach(x => {
		if(parent){
			//add to parentMap
			ParentMap[x.n] = parent;
		}
		if(x.f){
			if (!ComponentMap[x.f.n]) {
				ComponentMap[x.f.n] = [];
			}
			const inv = game.inventory.getInvByFlavor(parent);
			ComponentMap[x.f.n].push({inv: inv, a:x.a, b:x.b});
		}
		if(x.c){
			buildMaps(x.c, x);
		}
	});
	
}

function load() {
}

function save() {
}
