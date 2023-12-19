function Menu(parent, input, b){
	this.b = b;
	this.d = parent;
	if(!input){return;}
	this.children = {};
	this.current = null;
	
	const m = createUIElement({parent:parent, cssClasses:['menuButtons']});
	const c = createUIElement({parent:parent, cssClasses:['menuContentWrapper']});

	input?.forEach(x => {
		this.children[x.n] = {};
		const btnClass = x.u ? [] : ['hide']
		const btn = createUIElement({type:'button', parent:m, textContent:x.n, cssClasses:btnClass, 
			onclick:()=>{this.current=x.n; this.update(); game.hint();} });
		x.mb = btn;
		const div = createUIElement({parent:c, cssClasses:['hide', 'content']});
		
		if(x.info?.length){
			x.info.forEach(info => createUIElement({type:'p', parent:div, textContent:info, cssClasses:['info']}));
		}
		if(x.intro){
			createUIElement({type:'p', parent:div, textContent:x.intro, cssClasses:['tutorial']})
		}
		
		//special tabs
		switch(x.n){
			case 'Discover': {
				this.renderDiscover(div);
				break;
			}
			case 'Manage': {
				this.renderManage(div);
				break;
			}
			case 'Enhance':{
				this.renderEnhance(div);
				break;
			}
			case 'Settings': {
				this.renderSettings(div);
				break;
			}
			case 'Help': {
				this.renderHelp(div);
				break;
			}
			default:{
				if(x?.m){
					//if it has mass it is an individual flavor aka end of the sub-menus
					game.inventory.getInvByFlavor(x).renderCreate(div);
				}
				break;
			}
		}
		this.children[x.n] = new Menu(div, x.c, btn);
	});
}
Menu.prototype.gotoNode = function(input, parent = null){
	if(Object.keys(this.children ?? {}).includes(input)){
		this.current = input;
		this.update();
		return true;
	}
	for(let [key, value] of Object.entries(this.children ?? {})){
		if(value?.gotoNode(input, this)){
			this.current = key;
			this.update();
			return true;
		}
	}
	
	return false;
}

Menu.prototype.update = function(){
	if(!this.children){return;}
	Object.values(this.children).forEach(x => {
		x.b.classList.remove('selected');
		x.d.classList.add('hide');
	});
	if(!this.current){return;}
	
	this.children[this.current].b.classList.add('selected');
	this.children[this.current].d.classList.remove('hide');
	this.children[this.current]?.update();//needed for gotoLeaf to work.

	switch(game.menu.current){
		case 'Create':{
			game.inventory.update();//updates the content quick when tab changes.
			break;
		}
		case 'Discover': {
			game.inventory.update();//updates the content quick when tab changes.
			getUIElement('filterChkD').checked = game.settings.d.o;
			break;
		}
		case 'Manage': {
			game.inventory.update();//updates the content quick when tab changes.
			getUIElement('filterChkMC').checked = game.settings.m.c;
			getUIElement('filterChkMD').checked = game.settings.m.d;
			getUIElement('filterChkMM').checked = game.settings.m.m;
			getUIElement('filterChkML').checked = game.settings.m.l1;
			getUIElement('filterChkMN').checked = game.settings.m.n;
			getUIElement('filterChkMS').checked = game.settings.m.s;
			getUIElement('filterChkMT').checked = game.settings.m.t;
			getUIElement('filterChkMU').checked = game.settings.m.u;
			break;
		}
		case 'Enhance': {
			game.enhancements.update();
			break;
		}
	}
}
Menu.prototype.updateTable = function(){
	const table = getUIElement('table');
	const newTable = [];
	const names = game.table.map(x => x.f.n).sort();
	
	names.forEach(x => {
		const item = createUIElement({cssClasses:['tableItem', 'nowrap', 'row']});
		
		createUIElement({type:'button', parent: item, cssClasses:['circleButton', 'del', 'cell'], textContent:'--', title:'Remove From Table',
			onclick:() => {
				for(let i=0;i<game.table.length;i++){
					if(game.table[i].f.n === x){
						game.table.splice(i,1);
						game.menu.updateTable();
						return;
					}
				}
			}
		});
		createUIElement({type:'span', parent:item, textContent:x, cssClasses:['cell'], style:{textAlign:'left', fontSize:'14px'}});
		
		newTable.push(item);
	});
	
	table.replaceChildren(...newTable);
}

Menu.prototype.updateResults = function(input){
	const table = getUIElement('table');
	const newTable = [];

	input.forEach(x => {
		newTable.push(createUIElement({textContent:x.f?.n??x}));
	});
	
	table.replaceChildren(...newTable);
}

Menu.prototype.renderDiscover = function(parent){

	createUIElement({type:'button', id:'btnScan', textContent:'Scan', parent:parent, style:{marginRight:'75px', float:'right'},
		onclick:()=>{
			const results = findLockedFlavorsByComponents(game.table.map(x => x.f));
			
			game.table.length = 0;
			if(results.length){
				results.forEach(x => {
					game.inventory.getInvByFlavor(x.f).unlock();
				});
				this.updateResults(results);
			}
			else{
				this.updateResults(['No new items discovered']);
			}
		}});

	const hint = createUIElement({parent:parent, cssClasses:['hintZone', 'center']});
	createUIElement({type:'button', id:'btnHint', textContent:'Generate Discoverable Recipe', parent:hint, style:{marginLeft:'15px'},
		onclick:()=> {
			setElementText(hout, generateDiscoverHint()); 
			getUIElement('btnHint').classList.add('hide');  
			setTimeout(() => {
				getUIElement('btnHint').classList.remove('hide');
				setElementText(hout, null); 
			}, 10000);
		}});
	const hout = createUIElement({type:'span',parent:hint});
	
	const filter = createUIElement({parent:parent, cssClasses:['filterWrapper', 'center']});

	const f0 = createUIElement({parent:filter, cssClasses:['row', 'center']});
	const f1 = createUIElement({parent:filter, cssClasses:['row'], style:{textAlign:'left'}});
	
	const search = createUIElement({type:'input', parent:createUIElement({type:'label', parent:f0, textContent:'Filter: '}), attr:{type:'search', list:'filterSuggestions'}});

	addUIEventListener(search, (e) => {
		game.settings.d.s = search.value.toLowerCase(); 
		game.inventory.update();
		}, 'keyup');
	
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:f1, textContent:'Only in stock: '}), 
		title:'Filter out of stock', attr:{type:'checkbox'},  id:'filterChkD',
		onclick:(e) => {
			game.settings.d.o = !game.settings.d.o;
			game.inventory.update();
		}});

	const w = createUIElement({parent:parent, cssClasses:['discover', 'center']});

	const bags = createUIElement({parent:w, cssClasses:['cell', 'discoverLeft']});
	game.inventory.renderDiscover(bags);
	
	const matterMutator = createUIElement({parent: w, cssClasses:['cell', 'discoverRight']});
	createUIElement({type:'h3', parent:matterMutator, textContent:'Matter Mutator'});
	const table = createUIElement({id:'table', parent: matterMutator, cssClasses:['matterMutator']});

	
}

Menu.prototype.renderManage = function(parent){
	const filter = createUIElement({parent:parent, cssClasses:['filterWrapper', 'center'], style:{display:'table'}});

	const f0 = createUIElement({parent:filter, cssClasses:['row', 'center']});
	const f1 = createUIElement({parent:filter, cssClasses:['row', 'center']});

	const w00 = createUIElement({parent:f0, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w00, textContent:'Hide Created = 0', style:{paddingLeft:'15px'}}), 
		title:'Hide Created = 0', attr:{type:'checkbox'}, id:'filterChkMC',
		onclick:(e) => { game.settings.m.c = !game.settings.m.c; game.inventory.update(); }
	});
	const w01 = createUIElement({parent:f0, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w01, textContent:'Hide Created = Setpoint', style:{paddingLeft:'15px'}}), 
		title:'Hide Created = Setpoint', attr:{type:'checkbox'}, id:'filterChkMD',
		onclick:(e) => { game.settings.m.d = !game.settings.m.d; game.inventory.update(); }
	});
	const w02 = createUIElement({parent:f0, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w02, textContent:'Hide Created < Setpoint', style:{paddingLeft:'15px'}}), 
		title:'Hide Created < Setpoint', attr:{type:'checkbox'}, id:'filterChkMM',
		onclick:(e) => { game.settings.m.m = !game.settings.m.m; game.inventory.update(); }
	});
	const w03 = createUIElement({parent:f0, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w03, textContent:'Hide Created < Used', style:{paddingLeft:'15px'}}), 
		title:'Hide Created < Used', attr:{type:'checkbox'}, id:'filterChkML',
		onclick:(e) => { game.settings.m.l = !game.settings.m.l; game.inventory.update(); }
	});


	const w10 = createUIElement({parent:f1, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w10, textContent:'Hide Used = 0', style:{paddingLeft:'15px'}}), 
		title:'Hide Used = 0', attr:{type:'checkbox'}, id:'filterChkMN',
		onclick:(e) => { game.settings.m.n = !game.settings.m.n; game.inventory.update(); }
	});
	const w11 = createUIElement({parent:f1, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w11, textContent:'Hide Used = Demand', style:{paddingLeft:'15px'}}), 
		title:'Hide Used = Demand', attr:{type:'checkbox'}, id:'filterChkMS',
		onclick:(e) => { game.settings.m.s = !game.settings.m.s; game.inventory.update(); }
	});
	const w12 = createUIElement({parent:f1, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w12, textContent:'Hide Used < Demand', style:{paddingLeft:'15px'}}), 
		title:'Hide Used < Demand', attr:{type:'checkbox'}, id:'filterChkMT',
		onclick:(e) => { game.settings.m.t = !game.settings.m.t; game.inventory.update(); }
	});
	const w13 = createUIElement({parent:f1, cssClasses:['filterChk']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:w13, textContent:'Hide Used < Created', style:{paddingLeft:'15px'}}), 
		title:'Hide Used < Created', attr:{type:'checkbox'}, id:'filterChkMU',
		onclick:(e) => { game.settings.m.u = !game.settings.m.u; game.inventory.update(); }
	});

	game.inventory.renderManage(createUIElement({parent:parent, cssClasses:['manage', 'center']}));
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
	createUIElement({type:'button', parent:parent, textContent:'Hide "Helpful Tips" with a green border.', 
		cssClasses:['tutorial'], style:{marginLeft:'15px'},
		onclick:() => Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.add('hide'))
	});

	const i = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:i, textContent:'Show Info'}), 
		title:'Toggle Info Snippets', attr:{type:'checkbox', checked:game.settings.i}, id:'chkSettingsI',
		onclick:() => {
			game.settings.i = !game.settings.i
			Array.from(document.getElementsByClassName('info'))
				.forEach(x => x.classList.toggle('hide', !game.settings.i) );
		}});

	const u = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'input', parent:createUIElement({type:'label', parent:u, textContent:'Show Used-In Spoiler Warning'}), 
		title:'Show Used-In Warning',attr:{type:'checkbox', checked:game.settings.u}, id:'chkSettingsU',
		onclick:() => game.settings.u = !game.settings.u});

	const c = createUIElement({parent:parent, cssClasses:['settingsRow']});
	const num = createUIElement({type:'input', parent:createUIElement({type:'label', parent:c, textContent:'Cheater Level:'}), title:'Cheater Level (-1 to disable)',
		attr:{type:'number', min:-1, max:7, value:game.settings.c}, id:'numSettingsC'});
	addUIEventListener(num, (e) => {
		game.settings.c = parseInt(e.target.value);
		game.inventory.update();
	}, 'change');

	createUIElement({type: 'hr', parent: parent});

	const l = createUIElement({parent: parent, cssClasses:['settingsRow']})
	createUIElement({type: 'span', parent:l, textContent:'Last save at: '});
	createUIElement({type: 'span', parent:l, id:'lastSave'});

	const m = createUIElement({parent: parent, cssClasses:['settingsRow']})
	const n = createUIElement({type: 'textarea', parent: m, id:'txtSave', attr:{rows:'10', cols:'80', disabled:'true'}})
	createUIElement({parent:m, textContent:'Input Load Data:'});
	const o = createUIElement({type: 'textarea', parent: m, id:'txtLoad', attr:{rows:'10', cols:'80'}})
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
		style:{marginLeft:'15px'}, onclick:() => { if(window.confirm("Really lose all data and reset the whole game?")){hardReset();} }
	});

}