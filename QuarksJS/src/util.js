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

function makeToast(input){
	const id = `TOAST_${Date.now()}`;
	createUIElement({id: id, parent:getUIElement('toaster'), textContent:input, cssClasses:['toast'], title:'Click to dismiss',
		onclick:()=>document.getElementById(id)?.remove()});
	setTimeout(()=>document.getElementById(id)?.remove(),30000);
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
	input.menu?.forEach(x => x.children[input.id].b.classList.remove('hide'));

	ParentMap[input.id]?.forEach(x => unlock(x));
}

function formatItemSymbols(input, parent){
	let s = input.s.replaceAll('[', '<sup>').replaceAll(']', '</sup>')
	s = s.replaceAll('(', '<sub>').replaceAll(')', '</sub>');
	s = s.replaceAll('{', '(').replaceAll('}', ')');
	parent.title = input.n;
	parent.innerHTML = s;
}

function arraysOverlap(a,b){
	const m = a.every(x => b.some(y => x.n === y.n));
	const n = b.every(x => a.some(y => x.n === y.n));
	return m&&n;
}

function unlockedFlavors(){
	return Object.values(AllFlavors).filter(x => x.f.u);
}

function toggleSetting(input){
	const a = [...input];
	const z = a.pop();
	let s = game.settings;
	let c = game.settings.content;
	a.forEach(x => {s = s[x]; c = c[x];});
	s[z] = !s[z];
	c[z].checked = s[z];
	switch(input){
		case'c':{ break; }
		case'h':{ 
			Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.toggle('hide', !s[z]));
			break; 
		}
		case'i':{ 
			Array.from(document.getElementsByClassName('info')).forEach(x => x.classList.toggle('hide', !s[z]) );
			break; 
		}
		case'u':{ break; }
		case'mc':{
			game.inventory.update();
			break;
		}
	}
}

function getDiscoverHint(hout, btnHint, hadd){
	const d = game.menu.children.M_1.content;
	
	setElementText(game.dContent.hout, generateDiscoverHint()); 
	game.dContent.btnHint.classList.add('hide');  
	game.dContent.hadd.classList.remove('hide');
	game.dinterval = setTimeout(() => {
		game.dContent.btnHint.classList.remove('hide');
		game.discoverHint.length = 0;
		setElementText(game.dContent.hout, null);
		game.dContent.hadd.classList.add('hide');
		
		clearInterval(game.dinterval);
		game.dinterval = null;
	}, 30000);
}

function generateDiscoverHint(){
	//locked items that have all components unlocked
	const lockedGenerators = game.generators.filter(x => x.o.some(o => !o.inv.f.u));
	const canUnlock = lockedGenerators.filter(x => x.i.every(z => z.inv.f.u));
	if(!canUnlock.length){return ' None left, try again later.';}

	const index = Math.floor(Math.random() * canUnlock.length);
	game.discoverHint = [...canUnlock[index].i].map(x => x.inv);
	return ` ${game.discoverHint.map(x => x.f.n).join()} `;
}

function findLockedFlavorsByComponents(input){
	const output = [];
	if(!input?.length){return output;}
	
	const lockedGenerators = game.generators.filter(x => x.o.some(o => !o.inv.f.u));
	lockedGenerators.forEach(x => {
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
			if(!ParentMap[x.id]){ParentMap[x.id] = [];}
			ParentMap[x.id].push(parent);
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

	Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.toggle('hide', !game.settings.h));
	Array.from(document.getElementsByClassName('info')).forEach(x => x.classList.toggle('hide', !game.settings.i) );
}

function loadSaveData(){
	localStorage.setItem('Q', game.settings.content.s.txtLoad.value);
	load();
}

function load() {
	let temp = localStorage.getItem('Q');
	if(!temp){return;}
	
	if(!temp.includes('"')){
		temp = temp.replaceAll('{', '{"');
		temp = temp.replaceAll(',', ',"');
		temp = temp.replaceAll(':', '":');
		temp = temp.replaceAll('{"}', '{}');
	}

	const data = JSON.parse(temp);
	
	game.settings.c = data.s?.c ?? false;
	game.settings.h = data.s?.h ?? false;
	game.settings.i = data.s?.i ?? true;
	game.settings.u = data.s?.u ?? true;
	game.settings.d.l = data.s?.dl ?? 0;
	game.settings.d.o = data.s?.do ?? false;
	game.settings.d.s = data.s?.ds ?? null;
	game.settings.m.c = data.s?.mc ?? false;
	game.settings.m.m = data.s?.mm ?? false;
	game.settings.m.l = data.s?.ml ?? false;
	game.settings.m.n = data.s?.mn ?? false;
	game.settings.m.t = data.s?.mt ?? false;
	game.settings.m.u = data.s?.mu ?? false;
	
	game.enhancements.d = data.e?.d ?? 0;
	game.enhancements.e = data.e?.e ?? 0;
	game.enhancements.g = data.e?.g ?? 0;
	game.enhancements.m = data.e?.m ?? 0;

	Array.from(document.getElementsByClassName('info')).forEach(x => x.classList.toggle('hide', !game.settings.i) );
	//hide green border tips
	if(Object.keys(data.i).length > 5 || !game.settings.h){
		game.settings.h = false;
		Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.add('hide'));
	}
	
	game.clock.duration = Date.now() - data.c;
	Object.entries(data.i).forEach(([key, value], index) => {
		const inv = Object.values(game.inventory.children).find(x => x.f.id === key);
		if(!inv){return;}
	
		inv.a = value?.a ?? 0;
		inv.b = new Amount();
		for([k,v] of Object.entries(value?.b ?? {})){
			if(typeof v !== 'number'){continue;}
			inv.b[k] = v;
		}
		
		inv.q = value?.q ?? false;
		if(value.u){
			inv.unlock();
		}
	});
	
	Object.entries(data.g).forEach(([key, value], index) => {
		const g = game.generators.find(x => x.id === key);
		if(!g){return;}
		
		g.l = value.l ?? 0;
		g.e = !!value.e;
		g.a = !!value.a;
		g.f = value.f ?? 0;
	});
}

function save() {
	const data = {
		i:{}, 
		g:{},
		e:{
			d:game.enhancements.d,
			e:game.enhancements.e,
			g:game.enhancements.g,
			m:game.enhancements.m
		}, 
		s:{}, 
		c:Date.now()
	};
	
	data.s.c = game.settings.c?1:0;
	data.s.h = game.settings.h?1:0;
	data.s.i = game.settings.i?1:0;
	data.s.u = game.settings.u?1:0;
	data.s.dl = game.settings.d.l??0;
	data.s.do = game.settings.d.o?1:0;
	//if(game.settings.d.s){data.s.ds = game.settings.d.s;}
	data.s.mc = game.settings.m.c?1:0;
	data.s.mm = game.settings.m.m?1:0;
	data.s.ml = game.settings.m.l?1:0;
	data.s.mn = game.settings.m.n?1:0;
	data.s.mt = game.settings.m.t?1:0;
	data.s.mu = game.settings.m.u?1:0;
	
	Object.entries(game.inventory.children).forEach(([key, value], index) => {
		//has default values, don't save.
		if(!value.a && !value.q && !value.f.u){
			return;
		}
		const n = value.f.id;
		data.i[n] = {}
		//only save non-default values
		if(!!value.a){ data.i[n].a = value.a; }
		if(!value.b.isZero()){
			data.i[n].b = {};
			for([k, v] of Object.entries(value.b)){
				if(typeof v !== 'number' || v === 0){continue;}
				data.i[n].b[k] = v;
			}
		}
		if(value.q){ data.i[n].q = value.q; }
		if(value.f.u){ data.i[n].u = value.f.u?1:0; }
	});
	game.generators.forEach(x => {
		if(x.e && !x.a && !x.f && !x.l){ return; }
		
		data.g[x.id] = {};
		if(x.l){data.g[x.id].l = x.l;}
		data.g[x.id].e = x.e?1:0;
		data.g[x.id].a = x.a?1:0;
		if(x.f){data.g[x.id].f = x.f;}
	});
	
	const temp = JSON.stringify(data).replaceAll('"','');
	localStorage.setItem('Q', temp);
}

function saveBeforeUnload(e) {
	save();
}

function hardReset(){
	localStorage.removeItem('Q');
	window.removeEventListener("beforeunload", saveBeforeUnload);
	window.location.reload(false);
}

function test(){
	makeToast("TEST MESAGE FROM CLICKER BUTTON");
}

function benchmark(){
	const a = [];
	const b = [];

	for(let i=0;i<100000;i++){
		a.push(new Amount({
				Da: Math.floor(Math.random() * MassUnits.Da.c),
				g:Math.floor(Math.random() * MassUnits.g.c),
				Tg: Math.floor(Math.random() * MassUnits.Tg.c),
				MO: Math.floor(Math.random() * MassUnits.MO.c),
				
			})
		);		
		b.push(new Amount({
				Da: Math.floor(Math.random() * MassUnits.Da.c),
				pg: Math.floor(Math.random() * MassUnits.pg.c),
				Tg: Math.floor(Math.random() * MassUnits.Tg.c),
				GM: Math.floor(Math.random() * MassUnits.GM.c),
			})
		);
	}
	
	const start = performance.now();
	
	for(let i=0;i<100000;i++){
		a[i].divide(b[i]);
	}
	
	const stop = performance.now();
	
	console.log('BENCHMARK', start, stop, stop-start);
}