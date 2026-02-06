function Menu(parent, parentDiv, input, id, name, b){
	this.b = b;
	this.d = parentDiv;
	this.n = name;
	this.id = id;
	this.p = parent;
	if(!input){return;}
	this.children = {};
	this.current = null;
	
	const m = createUIElement({parent:parentDiv, cssClasses:['menuButtons']});
	const c = createUIElement({parent:parentDiv, cssClasses:['menuContentWrapper']});
	
	input?.forEach(x => {
		this.children[x.id||x.n] = {};
		const btnClass = x.u ? [] : ['hide']
		const div = createUIElement({parent:c, cssClasses:['hide', 'content']});
		const btn = createUIElement({type:'button', parent:m, textContent:x.n, cssClasses:btnClass, 
			onclick:()=>{
				this.current=this.current!==x.id?x.id:null; 
				this.route();
				if(game.h){game.intro();}//noob messages
				} 
			});
		if(!x.menu){x.menu = [];}
		x.menu.push(this);
		
		if(x.info?.length){
			x.info.forEach(info => createUIElement({type:'p', parent:div, textContent:info, cssClasses:['info']}));
		}
	
		const intro = createUIElement({type:'p', parent:div, textContent:x.intro, cssClasses:['tutorial']});
		intro.classList.toggle('hide', x.intro && !game.settings.h)

		this.children[x.id||x.n] = new Menu(this, div, x.c, x.id, x.n, btn);
	});
}

Menu.prototype.route = function(addHistory = true){
	const root = getUIElement('divRoot');
	const div = createUIElement({});
	let replaceDiv = true;
	if(addHistory && this.current && !this.children[this.current].current){
		history.splice(0, historyIndex);
		historyIndex = 0;
	
		if(history[0] !== this.current){history.unshift(this.current);}
	}

	Object.values(game.inventory.children).forEach(x => {
		x.content.a.length = 0;
		x.content.g.length = 0;
	});
	switch(this.current){
		case 'M_1': {
			this.renderDiscover(div);
			break;
		}
		case 'M_2': {
			game.transmuters.forEach(x => x.content.f = null);
			this.renderManage(div);
			break;
		}
		case 'M_3':{
			this.renderEnhance(div);
			break;
		}
		case 'M_4': {
			this.renderSettings(div);
			break;
		}
		case 'M_5': {
			this.renderHelp(div);
			break;
		}
		default:{
			if(AllFlavors[this.current]){
				game.transmuters.forEach(x => x.content.f = null);
				//if it has mass it is a creatable item
				AllFlavors[this.current].renderCreate(div);
			}
			else if(this.current){
				this.children[this.current].route(addHistory);
				replaceDiv = false;
			}
			break;
		}
	}
	if(replaceDiv){
		for([key, value] of Object.entries(UIElement)){
			if(root.id !== key && root.contains(value)){removeUIElement(key);}
		}

		root.replaceChildren(div);
	}
	this.update(); 
}

Menu.prototype.containsChild = function(input, parent = null, addHistory=true){
	if(Object.keys(this.children ?? {}).includes(input)){
		return this.children[input];
	}
	for(let [key, value] of Object.entries(this.children ?? {})){
		const temp = value?.containsChild(input, this, addHistory);
		if(temp){
			return temp;
		}
	}
	return null;
}
Menu.prototype.gotoNode = function(input, parent = null, addHistory=true){
	if(Object.keys(this.children ?? {}).includes(input)){
		this.current = input;
		this.children[this.current].current = null;
		this.route(addHistory);
		return true;
	}
	for(let [key, value] of Object.entries(this.children ?? {})){
		if(value?.gotoNode(input, this, addHistory)){
			this.current = key;
			this.route(addHistory);
			return true;
		}
	}
	
	return false;
}

Menu.prototype.Left = function(){
	if(!this.children){return;}
	const keys = Object.keys(this.children)
					.filter(x => !this.children[x].b.classList.contains('hide'));
	if(!keys.length || !this.current){return;}
	if(this.children[this.current].current){
		this.children[this.current].Left();
		return;
	}
	let i = keys.indexOf(this.current) + keys.length - 1;
	i %= keys.length;
	this.current = keys[i];
	this.route();
}
Menu.prototype.Right = function(){
	if(!this.children){return;}
	const keys = Object.keys(this.children)
					.filter(x => !this.children[x].b.classList.contains('hide'));
	if(!keys.length || !this.current){return;}
	if(this.children[this.current].current){
		this.children[this.current].Right();
		return;
	}
	let i = keys.indexOf(this.current) + 1;
	i %= keys.length;
	this.current = keys[i];
	this.route();
}
Menu.prototype.Up = function(){
	if(!this.children || !Object.keys(this.children)?.length){return;}
	if(!this.current){return;}
	if(this.children[this.current].current){
		this.children[this.current].Up();
		return;
	}
	this.current = null;
	this.route();
}
Menu.prototype.Down = function(){
	if(!this.children || !Object.keys(this.children)?.length){return;}
	if(this.current){
		this.children[this.current].Down();
		return;
	}
	this.current = Object.keys(this.children)[0];
	this.route();
}


Menu.prototype.update = function(){
	if(!this.children){return;}
	Object.values(this.children).forEach(x => {
		x.b.classList.remove('selected');
		x.d.classList.add('hide');
	});
	if(!this.current){return;}
	
	Array.from(document.getElementsByClassName('menuFocus')).forEach(x => x.classList.remove('menuFocus'));
	const isFocus = !this.children || !(this.children[this.current]?.current ?? false);
	this.children[this.current].b.classList.toggle('menuFocus', isFocus);
	
	this.children[this.current].b.classList.add('selected');
	this.children[this.current].d.classList.remove('hide');
	this.children[this.current]?.update();//needed for gotoLeaf to work.

	switch(game.menu.current){
		case 'M_0':{
			game.inventory.update();//updates the content quick when tab changes.
			break;
		}
		case 'M_1': {
			game.inventory.update();//updates the content quick when tab changes.
			break;
		}
		case 'M_2': {
			game.inventory.update();//updates the content quick when tab changes.
			break;
		}
		case 'M_3': {
			game.enhancements.update();
			break;
		}
		case 'M_4':{
			
		}
	}
}
Menu.prototype.updateMM = function(){
	const newTable = [];
	const ff = game.mm.map(x => x.f).sort((a,b) => a.n.localeCompare(b.n));
	
	ff.forEach(x => {
		const item = createUIElement({cssClasses:['mmItem', 'nowrap', 'row']});
		
		createUIElement({type:'button', parent: item, cssClasses:['circleButton', 'del', 'cell'], textContent:'--', title:'Remove From Matter Mutator',
			onclick:() => {
				for(let i=0;i<game.mm.length;i++){
					if(game.mm[i].f.id === x.id){
						game.mm.splice(i,1);
						game.menu.updateMM();
						return;
					}
				}
			}
		});
		createUIElement({type:'span', parent:item, textContent:x.n, cssClasses:['cell'], style:{textAlign:'left', fontSize:'14px'}});
		
		newTable.push(item);
	});
	
	game.dContent.mm.replaceChildren(...newTable);
}
Menu.prototype.isDisplayed = function(input){
	if(this.current === input){return true;}
	if(!this.current || !this.children[this.current]){return false;}
	return this.children[this.current].isDisplayed(input);
}

Menu.prototype.updateResults = function(input){
	const newTable = [];

	input.forEach(x => {
		newTable.push(createUIElement({textContent:x}));
	});
	
	game.dContent.mm.replaceChildren(...newTable);
	game.inventory.update();
}

Menu.prototype.renderDiscover = function(parent){

	const top = createUIElement({parent:parent, cssClasses:['center', 'filterWrapperDiscover', 'flex'] });

	const filter = createUIElement({parent:top});
	const f0 = createUIElement({parent:filter});
	const f1 = createUIElement({parent:filter, style:{textAlign:'left'}});
	
	game.settings.content.d.s = createUIElement({type:'input', parent:createUIElement({type:'label', parent:f0, textContent:'Filter: '}), attr:{type:'search',tabindex:'0'}});
	addUIEventListener(game.settings.content.d.s, (e) => {
		game.settings.d.s = game.settings.content.d.s.value.toLowerCase(); 
		game.inventory.update();
		}, 'keyup');
	game.settings.content.d.s.value = game.settings.d.s;
	
	game.settings.content.d.o = createUIElement({type:'input', parent:createUIElement({type:'label', parent:f1, textContent:'Filter items below limit: '}), 
		title:'Filter below limit', attr:{type:'checkbox'}, style:{float:'left'},
		onclick:(e) => {
			game.settings.d.o = !game.settings.d.o;
			game.inventory.update();
		}});
	game.settings.content.d.o.checked = game.settings.d.o;
	game.settings.content.d.l = createUIElement({type:'input', parent:f1, attr:{type:'number', min:0, max:1000000000000, value:1}, style:{width:'50px'},
		onchange: (e) => { 
			game.settings.d.l = e.target.value;
			game.inventory.update();
		}});
	game.settings.content.d.l.value = game.settings.d.l;

	const hint = createUIElement({parent:top, cssClasses:['hintZone']});
	game.dContent.btnHint = createUIElement({type:'button', textContent:'Get Recipe', parent:hint, cssClasses:game.dinterval?['hide']:[], style:{marginLeft:'15px'},
		onclick:()=> getDiscoverHint()
		});
	createInfoElement({parent: hint, title:'Click "Get Recipe" to try to populate the Matter Mutator with items for a discoverable recipe.'});
	const houtText = game.discoverHint.map(x => x.f.n).join();
	game.dContent.hout = createUIElement({type:'span',parent:hint,textContent:houtText});
	game.dContent.hadd = createUIElement({type:'button', textContent:'+>', parent:hint, cssClasses:game.dinterval?['circleButton']:['circleButton','hide'], style:{marginLeft:'15px'},
		onclick:()=> {
			game.mm.length = 0;
			game.discoverHint.forEach(x=>{
				if(game.mm.includes(x)){return;}
				if(x.a<1) { makeToast(`Unable to add ${x.f.n} {${x.f.s}} to the Matter Mutator. You must have at least one in inventory.`);}
				else{ game.mm.push(x); }
			})
			game.menu.updateMM();
		}});
	

	const scan = createUIElement({parent:top});
	game.dContent.btnScan = createUIElement({type:'button', textContent:'Scan', parent:scan,
		onclick:()=>{
			const results = findLockedFlavorsByComponents(game.mm.map(x => x.f));
			game.mm.length = 0;
			if(!results.length){
				this.updateResults(['No new items discovered']);
				return;
			}

			const unlocked = [];
			results.forEach(x => {
				x.o.forEach(o => {
					o.inv.unlock();
					if(!isUnlocked(o.inv.f.n) && !unlocked.some(x => x === o.inv.f.n)){
						unlocked.push(o.inv.f.n);
					}
				})
			});
			
			this.updateResults(unlocked);
		}});
	createInfoElement({parent: scan, title: 'After adding items to the Matter Mutator click the "Scan" button to search for any recipes that match the added items.'});
	
	const w = createUIElement({parent:parent, cssClasses:['discover', 'center']});

	const bags = createUIElement({parent:w, id:'discovery_bags', cssClasses:['cell', 'discoverLeft']});
	game.inventory.renderDiscover(bags);
	
	const matterMutator = createUIElement({parent: w, cssClasses:['cell', 'discoverRight']});
	createUIElement({type:'h3', parent:matterMutator, textContent:'Matter Mutator'});
	game.dContent.mm = createUIElement({parent: matterMutator, cssClasses:['matterMutator']});

	this.updateMM();
}

Menu.prototype.renderManage = async function(parent){


	const collapser = createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['filterWrapperManage', 'center']}),
			cssClasses:['smallButton', 'filterCollapseButton'], textContent:'v',
			onclick:()=>{
				if(Array.from(filterTable.classList).includes('hide')){
					setElementText(collapser, 'v');
					filterTable.classList.remove('hide');
					filterColumns.classList.remove('hide');
				}
				else{
					setElementText(collapser, '^');
					filterTable.classList.add('hide');
					filterColumns.classList.add('hide');
				}
			}
	});
	const filterWrapper = createUIElement({parent:parent, cssClasses:['filterWrapperManage', 'center']});
	const tableWrapper = createUIElement({parent:parent, cssClasses:['manage', 'center']});

	const filterColumns = createUIElement({parent:filterWrapper, cssClasses:['center']});
	const filterTable = createUIElement({parent:filterWrapper, cssClasses:['center']});
	const f0 = createUIElement({parent:filterTable, cssClasses:['row', 'center']});
	const f1 = createUIElement({parent:filterTable, cssClasses:['row', 'center']});
	const f2 = createUIElement({parent:filterTable, cssClasses:['row', 'center']});
	const fa = createUIElement({parent:filterTable, cssClasses:['row', 'center']});
	const fc = createUIElement({parent:filterColumns, cssClasses:['row', 'center']});

	const wc0 = createUIElement({parent:fc, cssClasses:['filterChk']});
	game.settings.content.m.so = createUIElement({type:'input',
		parent:createUIElement({type:'label', parent:wc0, textContent:'Show Owned'}),
			title:'Toggle Owned', attr:{type:'checkbox'}, onclick:(e) => {
				game.settings.m.so = !game.settings.m.so;
				while(tableWrapper.firstChild){
					tableWrapper.removeChild(tableWrapper.firstChild);
				}
				game.inventory.renderManage(tableWrapper);
				game.inventory.update(true);
			}
	});
	game.settings.content.m.so.checked = game.settings.m.so;

	const wc1 = createUIElement({parent:fc, cssClasses:['filterChk']});
	game.settings.content.m.sd = createUIElement({type:'input',
		parent:createUIElement({type:'label', parent:wc1, textContent:'Show Demand'}),
			title:'Toggle Owned', attr:{type:'checkbox'}, onclick:(e) => {
				game.settings.m.sd = !game.settings.m.sd;
				while(tableWrapper.firstChild){
					tableWrapper.removeChild(tableWrapper.firstChild);
				}
				game.inventory.renderManage(tableWrapper);
				game.inventory.update(true);
			}
	});
	game.settings.content.m.sd.checked = game.settings.m.sd;

	const wc2 = createUIElement({parent:fc, cssClasses:['filterChk']});
	game.settings.content.m.ss = createUIElement({type:'input',
		parent:createUIElement({type:'label', parent:wc2, textContent:'Show Supply'}),
			title:'Toggle Owned', attr:{type:'checkbox'}, onclick:(e) => {
				game.settings.m.ss = !game.settings.m.ss;
				while(tableWrapper.firstChild){
					tableWrapper.removeChild(tableWrapper.firstChild);
				}
				game.inventory.renderManage(tableWrapper);
				game.inventory.update(true);
			}
	});
	game.settings.content.m.ss.checked = game.settings.m.ss;

	const wc3 = createUIElement({parent:fc, cssClasses:['filterChk']});
	game.settings.content.m.su = createUIElement({type:'input',
		parent:createUIElement({type:'label', parent:wc3, textContent:'Show Used'}),
			title:'Toggle Owned', attr:{type:'checkbox'}, onclick:(e) => {
				game.settings.m.su = !game.settings.m.su;
				while(tableWrapper.firstChild){
					tableWrapper.removeChild(tableWrapper.firstChild);
				}
				game.inventory.renderManage(tableWrapper);
				game.inventory.update(true);
			}
	});
	game.settings.content.m.su.checked = game.settings.m.su;




	const wa0 = createUIElement({parent:fa, cssClasses:['filterChk']});
	game.settings.content.m.a = createUIElement({type:'input', parent:createUIElement({type:'label', parent:wa0, textContent:'Live-Update'}), 
		title:'Live-Update', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.a = !game.settings.m.a; }
	});
	game.settings.content.m.a.checked = game.settings.m.a;
	const wa1 = createUIElement({parent:fa, cssClasses:['filterChk']});
	const wa2 = createUIElement({parent:fa, cssClasses:['filterChk']});
	createUIElement({type:'button', parent:wa2, textContent: 'Refresh Table', cssClasses:['smallButton'],
		onclick:() => game.inventory.update(true)
	});
	
	const w00 = createUIElement({parent:f0, cssClasses:['filterChk']});
	game.settings.content.m.c = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w00, textContent:'Hide Created = 0'}), 
		title:'Hide Created = 0', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.c = !game.settings.m.c; game.inventory.update(); }
	});
	game.settings.content.m.c.checked = game.settings.m.c;
	
	const w01 = createUIElement({parent:f0, cssClasses:['filterChk']});
	game.settings.content.m.m = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w01, textContent:'Hide Created < Demand'}), 
		title:'Hide Created < Setpoint', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.m = !game.settings.m.m; game.inventory.update(); }
	});
	game.settings.content.m.m.checked = game.settings.m.m;
	
	const w02 = createUIElement({parent:f0, cssClasses:['filterChk']});
	game.settings.content.m.l = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w02, textContent:'Hide Created < Used'}), 
		title:'Hide Created < Used', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.l = !game.settings.m.l; game.inventory.update(); }
	});
	game.settings.content.m.l.checked = game.settings.m.l;


	const w10 = createUIElement({parent:f1, cssClasses:['filterChk']});
	game.settings.content.m.n = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w10, textContent:'Hide Used = 0'}), 
		title:'Hide Used = 0', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.n = !game.settings.m.n; game.inventory.update(); }
	})
	game.settings.content.m.n.checked = game.settings.m.n;
	const w11 = createUIElement({parent:f1, cssClasses:['filterChk']});
	game.settings.content.m.t = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w11, textContent:'Hide Used < Demand'}), 
		title:'Hide Used < Demand', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.t = !game.settings.m.t; game.inventory.update(); }
	});
	game.settings.content.m.t.checked = game.settings.m.t;
	const w12 = createUIElement({parent:f1, cssClasses:['filterChk']});
	game.settings.content.m.u = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w12, textContent:'Hide Used < Created'}), 
		title:'Hide Used < Created', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.u = !game.settings.m.u; game.inventory.update(); }
	});
	game.settings.content.m.u.checked = game.settings.m.u;

	const w20 = createUIElement({parent:f2, cssClasses:['filterChk']});
	game.settings.content.m.x = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w20, textContent:'Hide Demand = 0'}), 
		title:'Hide Demand = 0', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.x = !game.settings.m.x; game.inventory.update(); }
	})
	game.settings.content.m.x.checked = game.settings.m.x;
	const w21 = createUIElement({parent:f2, cssClasses:['filterChk']});
	game.settings.content.m.y = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w21, textContent:'Hide Demand < Created'}), 
		title:'Hide Used < Demand', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.y = !game.settings.m.y; game.inventory.update(); }
	});
	game.settings.content.m.y.checked = game.settings.m.y;
	const w22 = createUIElement({parent:f2, cssClasses:['filterChk']});
	game.settings.content.m.z = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w22, textContent:'Hide Demand < Used'}), 
		title:'Hide Used < Created', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.z = !game.settings.m.z; game.inventory.update(); }
	});
	game.settings.content.m.z.checked = game.settings.m.z;

	await game.inventory.renderManage(tableWrapper);
	game.inventory.update(true);
}

Menu.prototype.renderEnhance = function(parent){
	game.enhancements.render(parent);
}

Menu.prototype.renderHelp = function(parent){
	help.forEach(x => {

		const topic = createUIElement({parent:parent, cssClasses:['helpTopic'], textContent:x.t});
		const content = createUIElement({parent:parent, cssClasses:['helpContent', 'hide']});
		addUIEventListener(topic, () => content.classList.toggle('hide'));
		
		let i = 0;
		x.c.forEach(y => {
			const css = [];
			if(y.length === 0){css.push('helpDivEmpty'); i=0;}
			else if(i++%2===0){css.push('helpDiv');}
			else{css.push('helpDivAlternate');}

			createUIElement({parent:content, cssClasses:css, textContent:y});
		});
	});
}

Menu.prototype.renderSettings = function(parent){
	const h = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.h = createUIElement({type:'input', parent:createUIElement({type:'label', parent:h, textContent:'Show Introduction Hints with a green border'}), 
		title:'Toggle Introduction Hints', attr:{type:'checkbox'},
		onclick:() => toggleSetting('h')});
	game.settings.content.s.h.checked = game.settings.h;

	const i = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.i = createUIElement({type:'input', parent:createUIElement({type:'label', parent:i, textContent:'Show Flavor text and bonus info'}), 
		title:'Toggle Info Snippets', attr:{type:'checkbox'},
		onclick:() => toggleSetting('i')});
	game.settings.content.s.i.checked = game.settings.i;

	const u = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.u = createUIElement({type:'input', parent:createUIElement({type:'label', parent:u, textContent:'Show Used-In Spoiler Warning'}), 
		title:'Show Used-In Warning',attr:{type:'checkbox'},
		onclick:() => toggleSetting('u')});
	game.settings.content.s.u.checked = game.settings.u;

	const c = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.c = createUIElement({type:'input', parent:createUIElement({type:'label', parent:c, textContent:'Cheater Mode'}),
		title:'Cheater Mode', attr:{type:'checkbox'},
		onclick:() => toggleSetting('c')});
	game.settings.content.s.c.checked = game.settings.c;
	createInfoElement({parent: c, title: 'When this is enabled transmuters no longer use items when transmuting items.'});

	const nb = createUIElement({parent:parent, cssClasses:['settingsRow']});
	const nbOptions = [{i:2,n:'Binary'},{i:3,n:'Ternary'},{i:4,n:'Quaternary'},
        {i:5,n:'Quinary'},{i:6,n:'Senary'},{i:7,n:'Septenary'},{i:8,n:'Octal'},
        {i:9,n:'Nonary'},{i:10,n:'Decimal'},{i:12,n:'Dozenal'},{i:16,n:'Hexadecimal'},
        {i:32,n:'Base32'},{i:64,n:'Base64'}];
	game.settings.content.s.n.b = createUIElement({type:'select', parent:createUIElement({type:'label', parent:nb, textContent:'Number Base: '}),
		onchange:() => toggleSetting('nb')});
	createInfoElement({parent:nb, title: 'The default is Decimal also known as base ten, meaning there are ten unique symbols (0,1,2,3,4,5,6,7,8,9). Computers use binary but some early prototypes used ternary. Some people prefer dozenal. Doesn\'t effect hardcoded help values or number inputs.'});
	nbOptions.forEach((x) => { createUIElement({type:'option', parent:game.settings.content.s.n.b, attr:{value:x.i, label:x.n}}); }); 
	game.settings.content.s.n.b.value = game.settings.n.b;

	const ns = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.n.s = createUIElement({type:'input', parent:createUIElement({type:'label', parent:ns, textContent:'Significant Digits: '}),
		onchange:() => toggleSetting('ns'), attr:{type:'number', min:3, max:15, value:6}
	});
	createInfoElement({parent:ns, title:'Doesn\'t effect hardcoded help values or number inputs.'});
	game.settings.content.s.n.s.value = game.settings.n.s;
	
	const ne = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s.e = createUIElement({type:'input', parent:createUIElement({type:'label', parent:ne, textContent:'Enhancement Scaling: '}),
		onchange:() => toggleSetting('e'), attr:{type:'number', min:0, max:1024, value:12}
	});
	createInfoElement({parent:ne, title:'Larger number = larger TMB. Check Help > Enhance for more details. Check the Enhance tab for the current bonus.' });
	game.settings.content.s.e.value = game.settings.e;
	
	createUIElement({type: 'hr', parent: parent});

	const l = createUIElement({parent: parent, cssClasses:['settingsRow','pointer'], onclick:()=>{save(); this.route();}})
	createUIElement({type: 'span', parent:l, title:'Click to save', textContent:'Last save at: '});
	createUIElement({type: 'span', parent:l, title:'Click to save', textContent:new Date(new Date() - game.clock.lastSave).toLocaleString()});

	const n = createUIElement({parent: parent, cssClasses:['settingsRow','pointer'] })
	createUIElement({type: 'button', parent: n, textContent: 'Click to save', 
		title:'Click to save', cssClasses:['pointer'],
		onclick:()=>{save(); this.route();}
	})
	createUIElement({type: 'button', parent: n, textContent: 'Click to copy save to clipboard', 
		title:'Click to copy save data', cssClasses:['pointer'],
		onclick: () => copyText(localStorage.getItem('Q'))

	})
	
	const m = createUIElement({parent: parent, cssClasses:['settingsRow']	})
	createUIElement({type: 'textarea', parent: m, textContent: localStorage.getItem('Q'), 
		attr:{rows:'10', cols:'80', readonly:'true'}
	})

	
	createUIElement({parent:m, textContent:'Input Load Data:'});
	game.settings.content.s.s = createUIElement({type: 'textarea', parent: m, attr:{rows:'10', cols:'80'}})
	createUIElement({type:'button', parent:createUIElement({parent: parent, cssClasses:['settingsRow']}), textContent:'Load Data',
		style:{marginLeft:'15px'}, onclick:() => loadSaveData()
	});

	createUIElement({type: 'hr', parent: parent});

	const s = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'button', parent:s, textContent:'Restore Default Settings', 
		style:{marginLeft:'15px'}, onclick:() => resetSettings()
	});

	const z = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'button', parent:z, textContent:'HARD RESET', 
		style:{marginLeft:'15px', backgroundColor:'red', fontWeight:'bold'}, onclick:() => { if(window.confirm("Confirm: clear save data and reset game?")){hardReset();} }
	});

}
