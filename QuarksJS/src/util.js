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

function recipeSearch(input){
	const output = [];

	ComponentMap[input?.n]?.forEach(x => {
		const f = x.f;
		const i = FlavorMap[f.n];
		const g = ItemMap[i.n];
		output.push({ g: g, i: i, f: f, a: x.a});
	});
	
	return output;
}

function arraysOverlap(a,b){
	const m = a.every(x => b.some(y => x.n === y.n));
	const n = b.every(x => a.some(y => x.n === y.n));
	return m&&n;
}

function findLockedFlavorsByComponents(input){
	const output = [];
	data.forEach(g => {
        g.c.forEach(i => {
			if(i.u){return;}
            i.c.forEach(f => {
				if(arraysOverlap(f.c.map(x => x.f), input)){
					output.push({g:g,i:i,f:f});
				}
            });
        });
    });
	return output;
}

function buildMaps() {
    data.forEach(g => {
        g.c.forEach(i => {
            if (ItemMap[i.n]) {
                console.error('Item already exists: ' + i.n);
            }
            ItemMap[i.n] = g;
            i.c.forEach(f => {
                if (FlavorMap[f.n]) {
                    console.error('Flavor already exists: ' + f.n);
                }
                FlavorMap[f.n] = i;
                f.c.forEach(c => {
                    if (!ComponentMap[c.f.n]) {
                        ComponentMap[c.f.n] = [];
                    }
                    ComponentMap[c.f.n].push({f:f, a:c.a});
                });
            });
        });
    });
}

function load() {
}

function save() {
}
