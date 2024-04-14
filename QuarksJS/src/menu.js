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
			game.generators.forEach(x => x.content.f = null);
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
				game.generators.forEach(x => x.content.f = null);
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
}

Menu.prototype.renderDiscover = function(parent){

	const top = createUIElement({parent:parent, cssClasses:['center', 'filterWrapper', 'flex'] });

	const filter = createUIElement({parent:top});
	const f0 = createUIElement({parent:filter});
	const f1 = createUIElement({parent:filter, style:{textAlign:'left'}});
	
	game.settings.content.d.s = createUIElement({type:'input', parent:createUIElement({type:'label', parent:f0, textContent:'Filter: '}), attr:{type:'search',tabindex:'0'}});
	addUIEventListener(game.settings.content.d.s, (e) => {
		game.settings.d.s = game.settings.content.d.s.value.toLowerCase(); 
		game.inventory.update();
		}, 'keyup');
	game.settings.content.d.s.value = game.settings.d.s;
	
	game.settings.content.d.o = createUIElement({type:'input', parent:createUIElement({type:'label', parent:f1, textContent:'Filter items below threshold: '}), 
		title:'Filter below threshold', attr:{type:'checkbox'}, style:{float:'left'},
		onclick:(e) => {
			game.settings.d.o = !game.settings.d.o;
			game.inventory.update();
		}});
	game.settings.content.d.o.checked = game.settings.d.o;
	game.settings.content.d.l = createUIElement({type:'input', parent:f1, attr:{type:'number', min:0, max:1000000000000}, style:{width:'50px'},
		onchange: (e) => { game.settings.d.l = e.target.value;}});
	game.settings.content.d.l.value = game.settings.d.l;

	const hint = createUIElement({parent:top, cssClasses:['hintZone']});
	game.dContent.btnHint = createUIElement({type:'button', textContent:'Get Recipe', parent:hint, cssClasses:game.dinterval?['hide']:[], style:{marginLeft:'15px'},
		onclick:()=> getDiscoverHint()
		});
	const houtText = game.discoverHint.map(x => x.f.n).join();
	game.dContent.hout = createUIElement({type:'span',parent:hint,textContent:houtText});
	game.dContent.hadd = createUIElement({type:'button', textContent:'+>', parent:hint, cssClasses:game.dinterval?['circleButton']:['circleButton','hide'], style:{marginLeft:'15px'},
		onclick:()=> {
			game.mm.length = 0;
			game.discoverHint.forEach(x=>{
				if(game.mm.includes(x)){return;}
				if(x.a<1) { makeToast(`Unable to add ${x.f.n} (${x.f.s}) to the Matter Mutator.`);}
				else{ game.mm.push(x); }
			})
			game.menu.updateMM();
		}});
	

	game.dContent.btnScan = createUIElement({type:'button', textContent:'Scan', parent:top,
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
					if(!unlocked.some(x => x === o.inv.f.n)){
						unlocked.push(o.inv.f.n);
					}
				})
			});
			
			this.updateResults(unlocked);
		}});
	
	const w = createUIElement({parent:parent, cssClasses:['discover', 'center']});

	const bags = createUIElement({parent:w, cssClasses:['cell', 'discoverLeft']});
	game.inventory.renderDiscover(bags);
	
	const matterMutator = createUIElement({parent: w, cssClasses:['cell', 'discoverRight']});
	createUIElement({type:'h3', parent:matterMutator, textContent:'Matter Mutator'});
	game.dContent.mm = createUIElement({parent: matterMutator, cssClasses:['matterMutator']});

	this.updateMM();
}

Menu.prototype.renderManage = async function(parent){
	const filter = createUIElement({parent:parent, cssClasses:['filterWrapper', 'center'], style:{display:'table'}});

	const f0 = createUIElement({parent:filter, cssClasses:['row', 'center']});
	const f1 = createUIElement({parent:filter, cssClasses:['row', 'center']});

	const w00 = createUIElement({parent:f0, cssClasses:['filterChk']});
	game.settings.content.m.c = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w00, textContent:'Hide Created = 0'}), 
		title:'Hide Created = 0', attr:{type:'checkbox'},
		onclick:(e) => { game.settings.m.c = !game.settings.m.c; game.inventory.update(); }
	});
	game.settings.content.m.c.checked = game.settings.m.c;
	
	const w01 = createUIElement({parent:f0, cssClasses:['filterChk']});
	game.settings.content.m.m = createUIElement({type:'input', parent:createUIElement({type:'label', parent:w01, textContent:'Hide Created < Σ(Flow)'}), 
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

	await game.inventory.renderManage(createUIElement({parent:parent, cssClasses:['manage', 'center']}));
}

Menu.prototype.renderEnhance = function(parent){
	game.enhancements.render(parent);
}

Menu.prototype.renderHelp = function(parent){
	help.forEach(x => {
		const topic = createUIElement({parent:parent, cssClasses:['helpTopic'], textContent:x.t});
		const content = createUIElement({parent:parent, cssClasses:['helpContent', 'hide']});
		addUIEventListener(topic, () => content.classList.toggle('hide'));
		
		x.c.forEach(y => {
			createUIElement({parent:content, cssClasses:['helpDiv'], textContent:y});
		});
	});
}

Menu.prototype.renderSettings = function(parent){
	const h = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.h = createUIElement({type:'input', parent:createUIElement({type:'label', parent:h, textContent:'Show Introduction Hints with a green border'}), 
		title:'Toggle Introduction Hints', attr:{type:'checkbox'},
		onclick:() => toggleSetting('h', this)});
	game.settings.content.h.checked = game.settings.h;

	const i = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.i = createUIElement({type:'input', parent:createUIElement({type:'label', parent:i, textContent:'Show Flavor text and bonus info'}), 
		title:'Toggle Info Snippets', attr:{type:'checkbox'},
		onclick:() => toggleSetting('i', this)});
	game.settings.content.i.checked = game.settings.i;

	const u = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.u = createUIElement({type:'input', parent:createUIElement({type:'label', parent:u, textContent:'Show Used-In Spoiler Warning'}), 
		title:'Show Used-In Warning',attr:{type:'checkbox'},
		onclick:() => toggleSetting('u')});
	game.settings.content.u.checked = game.settings.u;

	const c = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.c = createUIElement({type:'input', parent:createUIElement({type:'label', parent:c, textContent:'Cheater Mode (creating items has no cost)'}), 
		title:'Cheater Mode', attr:{type:'checkbox'},
		onclick:() => toggleSetting('c', this)});
	game.settings.content.c.checked = game.settings.c;

	createUIElement({type: 'hr', parent: parent});

	const l = createUIElement({parent: parent, cssClasses:['settingsRow','pointer'], onclick:()=>{save(); this.route();}})
	createUIElement({type: 'span', parent:l, textContent:'Last save at: '});
	createUIElement({type: 'span', parent:l, textContent:new Date(new Date() - game.clock.lastSave).toLocaleString()});

	const m = createUIElement({parent: parent, cssClasses:['settingsRow']})
	createUIElement({type: 'textarea', parent: m, textContent: localStorage.getItem('Q'), attr:{rows:'10', cols:'80', disabled:'true'}})
	
	
	createUIElement({parent:m, textContent:'Input Load Data:'});
	game.settings.content.s.txtLoad = createUIElement({type: 'textarea', parent: m, attr:{rows:'10', cols:'80'}})
	createUIElement({type:'button', parent:createUIElement({parent: parent, cssClasses:['settingsRow']}), textContent:'Load Data',
		style:{marginLeft:'15px'}, onclick:() => loadSaveData()
	});

	createUIElement({type: 'hr', parent: parent});

	const s = createUIElement({parent:parent, cssClasses:['settingsRow']});
	game.settings.content.s = createUIElement({type:'button', parent:s, textContent:'Restore Default Settings', 
		style:{marginLeft:'15px'}, onclick:() => resetSettings()
	});

	const z = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'button', parent:z, textContent:'HARD RESET', 
		style:{marginLeft:'15px'}, onclick:() => { if(window.confirm("Really lose all data and reset the whole game?")){hardReset();} }
	});

}