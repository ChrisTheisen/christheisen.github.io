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
	const e = UIElement[input];
	if(e===null){return;}
	e.parentNode.removeChild(e);
	delete UIElement[input];
}

function createUIElement({type='div', id=null, parent=null, cssClasses=[], style={}, title=null, attr={}, textContent=null, onclick=null, onchange=null, oninput=null}){
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
	if(oninput){ addUIEventListener(e, oninput, 'input'); }
	
	return e;
}

function addUIEventListener(element, func, event='click'){
	if(element === null || func === null){ return; }
	
	element.addEventListener(event, func);
}

function isUnlocked(input){
	if(!input.u){return false;}
	const P = ParentMap[input.n];
	if(!P){return true;}
	if(P.every(x => !x.u)){return false;}
	return P.some(x => isUnlocked(x));
}

function unlock(input){
	if(!input){return;}
	input.u = true;
	input.menu.forEach(x => x.children[input.n].b.classList.remove('hide'));

	ParentMap[input.n]?.forEach(x => unlock(x));
}

function arraysOverlap(a,b){
	const m = a.every(x => b.some(y => x.n === y.n));
	const n = b.every(x => a.some(y => x.n === y.n));
	return m&&n;
}

function unlockedFlavors(){
	return Object.values(AllFlavors).filter(x => x.f.u);
}

function generateDiscoverHint(){
	//locked items that have all components unlocked
	const a = Object.values(AllFlavors).filter(x => !x.f.u).filter(y => y.i.every(z => z.inv.f.u));
	if(!a.length){return ' None left, try again later.';}

	const index = Math.floor(Math.random() * a.length);
	const b = a[index];
	
	const c = b.i.map(x => x.inv.f.n);
	return ` ${c.join()} `;
}

function findLockedFlavorsByComponents(input){
	const output = [];
	if(!input?.length){return output;}
	
	Object.values(AllFlavors).filter(x => !x.f.u).forEach(x => {
		if(arraysOverlap(x.i.map(x => x.inv.f), input)){
			output.push(x);
		}
    });
	return output;
}

function buildMaps(input, parent) {
	input.forEach(x => {
		if(parent){
			//add to parentMap
			if(!ParentMap[x.n]){ParentMap[x.n] = [];}
			ParentMap[x.n].push(parent);
		}
		if(x.i){
			const inv = game.inventory.getInvByFlavor(x);
			x.i.forEach(y => {
				if (!ComponentMap[y.f.n]) {ComponentMap[y.f.n] = [];}
				ComponentMap[y.f.n].push({inv: inv, a:y.a, b:y.b});
			});
		}
		if(x.c){
			buildMaps(x.c, x);
		}
	});
	
}

function resetSettings(){
	game.settings.c = false;
	game.settings.h = true;
	game.settings.i = true;
	game.settings.u = true;
	game.settings.d.o = false;
	game.settings.d.s = null;
	game.settings.m.c = false;
	game.settings.m.d = false;
	game.settings.m.m = false;
	game.settings.m.s = false;
	game.settings.m.t = false;
	game.settings.m.u = false;

	getUIElement('chkSettingsC').checked = game.settings.c;
	getUIElement('chkSettingsI').checked = game.settings.i;
	getUIElement('chkSettingsU').checked = game.settings.u;
}

function loadSaveData(){
	localStorage.setItem('Q', getUIElement('txtLoad').value);
	load();
}

function load() {
	const temp = localStorage.getItem('Q');
	if(!temp){return;}
	const data = JSON.parse(temp);
	
	game.settings.c = data.s?.c ?? false;
	game.settings.h = data.s?.h ?? false;
	game.settings.i = data.s?.i ?? true;
	game.settings.u = data.s?.u ?? true;
	game.settings.d.o = data.s?.d?.o ?? false;
	game.settings.d.s = data.s?.d?.s ?? null;
	game.settings.m.c = data.s?.m?.c ?? false;
	game.settings.m.d = data.s?.m?.d ?? false;
	game.settings.m.m = data.s?.m?.m ?? false;
	game.settings.m.l = data.s?.m?.l ?? false;
	game.settings.m.n = data.s?.m?.n ?? false;
	game.settings.m.s = data.s?.m?.s ?? false;
	game.settings.m.t = data.s?.m?.t ?? false;
	game.settings.m.u = data.s?.m?.u ?? false;
	
	game.enhancements.e = data.e?.e ?? 0;
	game.enhancements.g = data.e?.g ?? 0;
	game.enhancements.k = data.e?.k ?? 0;

	//getUIElement('chkSettingsC').checked = game.settings.c;
	//getUIElement('chkSettingsI').checked = game.settings.i;
	//getUIElement('chkSettingsU').checked = game.settings.u;
	
	Array.from(document.getElementsByClassName('info')).forEach(x => x.classList.toggle('hide', !game.settings.i) );
	//hide green border tips
	if(Object.keys(data.i).length > 5 || !game.settings.h){
		game.settings.h = false;
		Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.add('hide'));
	}
	
	game.clock.duration = Date.now() - data.c;
	Object.entries(data.i).forEach(([key, value], index) => {
		if(!game.inventory.children[key]){return;}
	
		game.inventory.children[key].a = value?.a ?? 0;
		game.inventory.children[key].b = value?.b ?? new Amount();
		game.inventory.children[key].e = value?.e ?? true;
		game.inventory.children[key].d = value?.d ?? false;
		game.inventory.children[key].k = value?.k ?? 0;
		game.inventory.children[key].l = value?.l ?? 0;
		game.inventory.children[key].q = value?.q ?? false;
		game.inventory.children[key].s = value?.s ?? 0;
		game.inventory.children[key].t = value?.t ?? false;
		if(value.u){
			game.inventory.children[key].unlock();
		}
	});
}

function save() {
	const data = {
		i:{}, 
		e:{
			e:game.enhancements.e,
			g:game.enhancements.g,
			k:game.enhancements.k
		}, 
		s:game.settings, 
		c:Date.now()
	};
	Object.entries(game.inventory.children).forEach(([key, value], index) => {
		//has default values, don't save.
		if(!value.a && !value.d && value.e && !value.k && !value.l && !value.q && !value.s && !value.t && !value.f.u){
			return;
		}
		
		data.i[key] = {}
		//only save non-default values
		if(!!value.a){ data.i[key].a = value.a; }
		if(!value.b.isZero()){ data.i[key].b = value.b; }
		if(value.d){ data.i[key].d = value.d; }
		if(!value.e){ data.i[key].e = value.e; }
		if(!!value.k){ data.i[key].k = value.k; }
		if(!!value.l){ data.i[key].l = value.l; }
		if(value.q){ data.i[key].q = value.q; }
		if(!!value.s){ data.i[key].s = value.s; }
		if(value.t){ data.i[key].t = value.t; }
		if(value.f.u){ data.i[key].u = value.f.u; }
	});
	
	const temp = JSON.stringify(data);
	localStorage.setItem('Q', temp);
	setElementText(getUIElement('txtSave'), temp);
	
	
	setElementText(getUIElement('lastSave'), new Date().toLocaleString());
}

function saveBeforeUnload(e) {
	save();
}

function hardReset(){
	localStorage.removeItem('Q');
	window.removeEventListener("beforeunload", saveBeforeUnload);
	window.location.reload(false);
}