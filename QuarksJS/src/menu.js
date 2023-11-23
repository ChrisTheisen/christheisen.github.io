function Menu(parent, input){
	this.children = {};
	this.content = {};
	this.f = [];
	this.current = null;
	
	const m = createUIElement({parent:parent, cssClasses:['menuButtons']});
	const c = createUIElement({parent:parent, cssClasses:['menuContentWrapper']});

	input?.forEach(x => {
		const btnClass = x.u ? [] : ['hide']
		const btn = createUIElement({type:'button', parent:m, textContent:x.n, cssClasses:btnClass, 
			onclick:()=>{this.current=x.n; this.update()} });
		x.mb = btn;
		const div = createUIElement({parent:c, cssClasses:['hide', 'content']});
		
		if(x.info?.length){
			x.info.forEach(info => createUIElement({type:'p', parent:div, textContent:info, cssClasses:['info']}));
		}
		if(x.intro){
			createUIElement({type:'p', parent:div, textContent:x.intro, cssClasses:['tutorial']})
		}
		
		this.content[x.n] = {b:btn, d:div};
		
		if(x?.c){
			//if it has children make the sub-menu.
			this.children[x.n] = new Menu(div, x.c);

			if(x?.m){//if it has mass it is an individual flavor aka end of the sub-menus
				game.inventory.getInvByFlavor(x).renderCreate(div);
			}
			return;
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
			case 'Settings': {
				this.renderSettings(div);
				break;
			}
			case 'Help': {
				this.renderHelp(div);
				break;
			}
		}
		
	});
}
Menu.prototype.gotoLeaf = function(input){
	const f = input.n
	const i = FlavorMap[f].n;
	const g = ItemMap[i].n;
	
	console.log(f,i,g);
	
	game.menu.current = 'Create';
	let temp = game.menu.children.Create;
	temp.current = g;
	temp = temp.children[g];
	temp.current = i;
	temp = temp.children[i];
	temp.current = f;
	game.menu.update();
}
Menu.prototype.gotoRoot = function(input){
	game.menu.current = input;
	game.menu.update()
}
Menu.prototype.gotoScale = function(input){
	game.menu.current = 'Create';
	let temp = game.menu.children.Create;
	temp.current = input;
	game.menu.update();
}
Menu.prototype.gotoNode = function(input){
	//TODO: this sometime
}

Menu.prototype.update = function(){
		Object.values(this.content).forEach(x => {
			x.b.classList.remove('selected');
			x.d.classList.add('hide');
		});
		if(!this.current){return;}
		
		this.content[this.current].b.classList.add('selected');
		this.content[this.current].d.classList.remove('hide');
		
		this.children[this.current]?.update();//needed for gotoLeaf to work.
		game.inventory.update();//updates the content quick when tab changes.
}
Menu.prototype.updateTable = function(){
	const table = getUIElement('table');
	const newTable = [];
	const names = game.table.map(x => x.fullName).sort();
	newTable.push(createUIElement({type:'h3', textContent:'Matter Mutator'}));
	names.forEach(x => {
		const item = createUIElement({cssClasses:['tableItem', 'nowrap']});
		
		createUIElement({type:'span', parent:item, textContent:x});
		createUIElement({type:'button', parent: item, cssClasses:['circleButton', 'del'], textContent:'--', title:'Remove From Table',
			onclick:() => {
				for(let i=0;i<game.table.length;i++){
					if(game.table[i].fullName === x){
						game.table.splice(i,1);
						game.menu.updateTable();
						return;
					}
				}
			}
		});
		
		newTable.push(item);
	});
	
	table.replaceChildren(...newTable);
}

Menu.prototype.updateResults = function(input){
	const table = getUIElement('table');
	const newTable = [];

	newTable.push(createUIElement({type:'h3', textContent:'Scan Results'}));
	input.forEach(x => {
		const n = `${x.g.n}.${x.i.n}.${x.f.n}`
		newTable.push(createUIElement({textContent:n}));
	});
	
	table.replaceChildren(...newTable);
}

Menu.prototype.renderDiscover = function(parent){
	const filter = createUIElement({parent:parent});
	
	createUIElement({type:'label', parent:filter, textContent:'Filter: ', attr:{htmlFor:'discoverFilter'}});
	const search = createUIElement({type:'input', parent:filter, id:'discoverFilter', attr:{type:'search', list:'filterSuggestions'}});

	addUIEventListener(search, (e) => {
		game.settings.d.s = search.value.toLowerCase(); 
		game.inventory.update();
		}, 'keyup');
	
	createUIElement({type:'label', parent:filter, textContent:'Only in stock: ', style:{paddingLeft:'15px'}, attr:{htmlFor:'filterChk'}});
	createUIElement({type:'input', parent:filter, title:'Filter out of stock',
		attr:{type:'checkbox'}, id:'filterChk',
		onclick:(e) => {
			game.settings.d.o = !game.settings.d.o;
			game.inventory.update();
		}});
	
	createUIElement({type:'button', textContent:'Scan', parent:filter, style:{marginLeft:'15px'},
		onclick:()=>{
			const results = findLockedFlavorsByComponents(game.table.map(x => x.f));
			
			if(results.length){
				game.table.length = 0;
				results.forEach(x => {
					game.inventory.getInvByFlavor(x.f).unlock();
				});
				this.updateResults(results);
			}
			else{
				alert('No new items discovered');
			}
		}});
	
	const w = createUIElement({parent:parent, cssClasses:['discover', 'center']});
	const bags = createUIElement({parent:w, cssClasses:['cell'], style:{minWidth:'300px'}});
	game.inventory.renderDiscover(bags);
	
	const table = createUIElement({id:'table', cssClasses:['table', 'cell'], parent:w});
	createUIElement({type:'h3', parent:table, textContent:'Matter Mutator'});
}

Menu.prototype.renderManage = function(parent){
	const filter = createUIElement({parent:parent});
	
	createUIElement({type:'label', parent:filter, textContent:'Filter: ', attr:{htmlFor:'manageFilter'}});
	const search = createUIElement({type:'input', parent:filter, id:'manageFilter', attr:{type:'search', list:'filterSuggestions'}});

	addUIEventListener(search, (e) => {
		game.settings.m.s = search.value.toLowerCase(); 
		game.inventory.update();
		}, 'keyup');

	const select = createUIElement({type:'select', parent:filter});
	createUIElement({type:'option', parent:select, textContent:'Show All', attr:{value:'a'}});
	createUIElement({type:'option', parent:select, textContent:'Show Deficit', attr:{value:'d'}});
	createUIElement({type:'option', parent:select, textContent:'Show Balanced', attr:{value:'b'}});
	createUIElement({type:'option', parent:select, textContent:'Show Surplus', attr:{value:'s'}});
	
	addUIEventListener(select, (e) => {
			game.settings.m.d = select.value;
			game.inventory.update();
		}, 'change');
	
	game.inventory.renderManage(createUIElement({parent:parent, cssClasses:['manage', 'center']}));
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


	createUIElement({type:'button', parent:parent, textContent:'Hide tutorial messages', 
		cssClasses:['tutorial'], style:{marginLeft:'15px'},
		onclick:() => Array.from(document.getElementsByClassName('tutorial')).forEach(x => x.classList.add('hide'))
	});

	const i = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'label', parent:i, textContent:'Show Info', attr:{htmlFor:'chkSettingsI'}});
	createUIElement({type:'input', parent:i, title:'Toggle Info Snippets',
		attr:{type:'checkbox', checked:game.settings.i}, id:'chkSettingsI',
		onclick:() => {
			game.settings.i = !game.settings.i
			Array.from(document.getElementsByClassName('info'))
				.forEach(x => x.classList.toggle('hide', !game.settings.i) );
		}});
		
	const u = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'label', parent:u, textContent:'Show Used-In Spoiler Warning', attr:{htmlFor:'chkSettingsU'}});
	createUIElement({type:'input', parent:u, title:'Show Used-In Warning',
		attr:{type:'checkbox', checked:game.settings.u}, id:'chkSettingsU',
		onclick:() => game.settings.u = !game.settings.u});

	const c = createUIElement({parent:parent, cssClasses:['settingsRow']});
	createUIElement({type:'label', parent:c, textContent:'Cheater Level:', attr:{htmlFor:'numSettingsc'}});
	const num = createUIElement({type:'input', parent:c, title:'Cheater Level (-1 to disable)',
		attr:{type:'number', min:-1, max:7, value:game.settings.c}, id:'numSettingsD'});
	addUIEventListener(num, (e) => {
		game.settings.c = parseInt(e.target.value);
		game.inventory.update();
	}, 'change');
	
}