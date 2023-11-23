function Inventory(){
	this.children = {};
	
	//default starting items.
	// const items = {};
	// items['Up'] = {a:50,f:saQ_Up};
	// items['Down'] = {a:0,f:saQ_Down};
	// items['Electron'] = {a:0,f:saL_Electron};
	
	// Object.values(items).forEach(item => {
	// this.children[item.f.n] = new InventoryItem(item);
	// });
}
Inventory.prototype.getInvByFlavor = function(input){
	if(!input){return;}
	const f = this.children[input.n];
	if(f){
		return f
	}
	
	const newItem = new InventoryItem({a:0, f:input});
	this.children[input.n] = newItem;
	return newItem;
}

Inventory.prototype.renderCreate = function(parent, input){
	this.getInvByFlavor(input).renderCreate(parent);
}
Inventory.prototype.renderDiscover = function(parent){
	createUIElement({type:'h3', parent:parent, textContent:'Inventory'});
	const center = createUIElement({parent:parent});
	
	Object.values(this.children).forEach(x => {
		const row = createUIElement({parent: parent, cssClasses:['row']});
		row.classList.toggle('hide', !x.isUnlocked());
		x.content.p = row;
		x.renderDiscover(row);
	});
}
Inventory.prototype.renderManage = function(parent){
	
	const hRow = createUIElement({parent: parent, cssClasses:['row']});
	createUIElement({parent:parent, cssClasses:['cell'], style:{width:'10%'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Name', style:{width:'30%', textAlign:'left'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Owned', style:{width:'20%', textAlign:'left'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Supply', style:{width:'20%', textAlign:'left'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Demand', style:{width:'20%', textAlign:'left'}});
	
	Object.values(this.children).forEach(x => {
		const row = createUIElement({parent: parent, cssClasses:['row']});
		row.classList.toggle('hide', !x.isUnlocked());
		x.content.m = row;
		x.renderManage(row);
	});
}

Inventory.prototype.update = function(){
	Object.values(this.children).forEach(child => child.update());
	
	//show progress bar when a generator is over level 0.
	const showProgress = Object.values(game.inventory.children).some(x => x.l > 0);
	game.clock.content.p.classList.toggle('hide', !showProgress);
	
	//can discover when a generator is over level 3.
	const canDiscover = Object.values(game.inventory.children).some(x => x.l > 3);
	game.menu.content.Discover.b.classList.toggle('hide', !canDiscover);
	
	//can manage when a generator is over level 9;
	const canManage = Object.values(game.inventory.children).some(x => x.l > 9);
	game.menu.content.Manage.b.classList.toggle('hide', !canManage);
}

function InventoryItem(input){
	this.f = input.f;//flavor
	this.a = input.a;//amout
	this.p = FlavorMap[input.f.n];//parent item
	//child components needed to generate
	this.c = input.f.c.map(x => ({a:x.a, inv:game.inventory.getInvByFlavor(x.f)}));
	
	this.l = 0;//generator level
	this.s = 0;//generator set-point
	this.e = true;//generator enabled
	
	this.u = false;//show used in
	this.r = recipeSearch(this.f);// [];//used in results
	
	const i = FlavorMap[this.f.n];
	const g = ItemMap[i.n];
	this.fullName = `${g.n}.${i.n}.${this.f.n}`;
	
	this.content = {
		a:[], //amount label
		b:[], //generate button (for Generate disabled)
		c:[], //create flavor sub-components (for update need)
		d:null, //discover add buttons (for disabled)
		e:null, //enabled (for checkbox checked)
		g:null, //generator cost label
		l:[], //level label
		m:null, //manage parent row(for hiding locked/filtered)
		p:null, //discover parent row(for hiding locked/filtered)
		r:null, //used in list container
		s:[], //set-level
		u:null, //generator upgrade buttons
		w:null, //spoiler warning
		y:null, //supply label
		z:null //demand label
	};
}
InventoryItem.prototype.generatorCost = function(){
	const scale = Math.max(.5, this.p.t)/4;
	const a = scale*this.l**3;
	const b = scale*4*this.l**2;
	const c = scale*2*this.l;
	//return Math.ceil((2**tier)**this.l);
	return Math.ceil(a+b+c+1);
}
InventoryItem.prototype.generatorGo = function(){
	if(!this.canCreate()){return false;}
	
	this.c.forEach(x => x.inv.a -= x.a);
	this.a++;
	return true;
}
InventoryItem.prototype.generatorClick = function(){
	if(this.p.t <= game.settings.d){
		this.a++;
		return;
	}
	
	if(!this.generatorGo()){return;}
	
	//If this is a new item it needs to be unlocked. 
	//This is different than the generator's generate.
	this.unlock();
	//this.a+=999;//TESTING line to gain a bunch of stuff.
}
InventoryItem.prototype.generate = function(){
	if(!this.e || !this.s){return;}
	if(this.p.t <= game.settings.d){
		this.a += this.s;
		return;
	}
	let amount = this.s;
	while(amount-- > 0 && this.generatorGo()){}
	game.inventory.update();
}
InventoryItem.prototype.upgrade = function(){
	const cost = this.generatorCost();
	if(this.a < cost){return;}
	
	this.l++;
	this.s++;
	
	this.a -= cost;
	this.update();
}
InventoryItem.prototype.calculateDemand = function(){
	let output = 0;
	this.r.forEach(x => {
		if(!x.inv){ x.inv = game.inventory.getInvByFlavor(x.f); }
		
		output += x.inv.s * x.a;
	});
	return output;
}

InventoryItem.prototype.canCreate = function(){
	return this.p.t <= game.settings.d || !this.c.some(x => x.inv.a < x.a );
}
InventoryItem.prototype.isUnlocked = function(){
	const i = FlavorMap[this.f.n];
	const g = ItemMap[i?.n];
	
	return i?.u && g?.u;
}
InventoryItem.prototype.unlock = function(){
	if(this.isUnlocked()){return;}
	const i = FlavorMap[this.f.n];
	i.u = true;
	const g = ItemMap[i.n];
	g.u = true;
	
	i.mb.classList.toggle('hide', !i.u);
	g.mb.classList.toggle('hide', !g.u);
}

InventoryItem.prototype.renderCreate = function(parent){
	this.renderCreate0(createUIElement({parent: parent, cssClasses:['block', 'flex', 'center']}));
	this.renderCreate1(createUIElement({parent: parent, cssClasses:['block', 'center']}));
	const w = createUIElement({parent: parent, cssClasses:['hide']});
	this.content.v = w;
	this.renderCreate2(createUIElement({parent: w, cssClasses:['block', 'center']}));
}
InventoryItem.prototype.renderCreate0 = function(parent){
	
	const inv = createUIElement({parent: parent, 
	style:{width:'30%', paddingRight:'10px'}})
	createUIElement({parent:inv, cssClasses:['title'], textContent:'Inventory'});
	
	const create_gen = createUIElement({type:'button', parent: inv, cssClasses:['circleButton', 'gains'], textContent:'++', 
		style:{float:'right', marginTop:'14px'}, title:'Generate',
	onclick:() => { this.generatorClick(); this.update(); } });
	
	const row = createUIElement({parent:inv, style:{display:'flex', paddingTop:'17px'}});
	
	createUIElement({type:'div', parent:row, textContent:'Owned:'});
	const create_own = createUIElement({type:'div', parent:row, textContent:this.a});
	
	create_gen.classList.toggle('disabled', !this.canCreate());
	
	const gen = createUIElement({parent: parent, cssClasses:['bLeft'], 
	style:{width:'70%'}})
	this.renderGeneratorCreate(gen);
	
	this.content.a.push(create_own);
	this.content.b.push(create_gen);
}
InventoryItem.prototype.renderCreate1 = function(parent){
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Components'});
	if(this.f.c.length === 0){
		createUIElement({parent:parent, textContent:'This is an elementary particle, it does not have components.'});
		createUIElement({parent:parent, textContent:'(Creating this item is free)'});
	}
	else{
		this.renderComponents(parent);
	}
}
InventoryItem.prototype.renderCreate2 = function(parent){
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Used In'});
	const alert = createUIElement({parent: parent});
	this.content.w = alert;
	
	createUIElement({parent:alert, textContent:"Spoiler Alert: This will show all items this item is a component for; including ones you have not unlocked yet."});
	createUIElement({type:'button', cssClasses:['circleButton', 'goto'], parent:alert, textContent:'✔', title:'Accept',
	onclick:() => {this.u = true; this.update();}});
	
	const results = createUIElement({parent: parent, cssClasses:['hide']});
	
	this.r.forEach(x => {
		const inv = game.inventory.getInvByFlavor(x.f);
		const root = createUIElement({parent: results});
		const row = createUIElement({parent: root, cssClasses:['flex']});
		inv.renderUsedIn(row, x);
	});
	
	this.content.r = results;
}
InventoryItem.prototype.renderComponents = function(parent){
	this.f.c.forEach(x => {
		const row = createUIElement({id:`${this.f.n}_${x.f.n}`, parent: parent, cssClasses:['flex']});
		this.renderComponent(row, x);
	});
}
InventoryItem.prototype.renderComponent = function(parent, input){
	const inv = game.inventory.getInvByFlavor(input.f);
	const i = FlavorMap[inv.f.n];
	const g = ItemMap[i.n];
	
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoLeaf(inv.f)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:`${g.n}.${i.n}.${inv.f.n}`,
	style:{width:'40%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], 
	style:{width:'40%', textAlign:'left'}})
	createUIElement({type:'span', parent:ow, textContent:'Owned:'});
	const own = createUIElement({type:'span', parent:ow, textContent:inv.a});
	createUIElement({type:'span', parent:ow, textContent:` / Need:${input.a}`});
	
	const gen = createUIElement({type:'button', parent: createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'gains'], textContent:'++', title:'Generate',
	onclick:() => { inv.generatorClick(); this.update(); } });
	
	gen.classList.toggle('disabled', !inv.canCreate());
	
	this.content.c.push(inv);
	inv.content.a.push(own);
	inv.content.b.push(gen);
}
InventoryItem.prototype.renderGeneratorCreate = function(parent){
	const row0 = createUIElement({parent:parent, style:{float:'right'}});
	this.content.e = createUIElement({type:'input', parent:row0, title:'Generator Enabled',
		attr:{type:'checkbox', checked:this.e},
	onclick:() => this.e = !this.e});
	
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Generator'});
	const root = createUIElement({parent:parent, cssClasses:['generator']});
	
	const w = createUIElement({parent:root, cssClasses:['cell']});
	const row1 = createUIElement({parent:w, cssClasses:['nowrap']});
	createUIElement({type:'span', parent:row1, textContent:'Level: '});
	this.content.l.push(createUIElement({type:'span', parent:row1, textContent:'0'}));
	this.content.u = createUIElement({type:'button', parent: row1, cssClasses:['circleButton', 'gains'], textContent:'++', 
		style:{marginLeft:'15px',marginRight:'15px'}, title:'Upgrade Generator',
	onclick:() => this.upgrade()});
	
	createUIElement({type:'span', parent:row1, textContent:'Cost: '});
	this.content.g = createUIElement({type:'span', parent:row1, textContent:`${this.generatorCost()}`});
	
	
	const row2 = createUIElement({parent: parent, cssClasses:['nowrap'],
	style:{marginTop:'15px'}});
	createUIElement({type:'span', parent:row2, textContent:'Create up to '});
	this.content.s.push(createUIElement({type:'input', parent:row2, 
		style:{width:'40px'}, attr:{type:'number', min:0, max:this.l, value:0},
		onchange:(x) => { this.s = parseInt(x.target.value); this.update(); }}));
	createUIElement({type:'span', parent:row2, textContent:' every tick'});
}

InventoryItem.prototype.renderDiscover = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoLeaf(this.f)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.fullName,
	style:{width:'50%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'30%', textAlign:'left'}})
	createUIElement({type:'span', parent:ow, textContent:'Owned:'});
	const own = createUIElement({type:'span', parent:ow, textContent:this.a});
	
	const add = createUIElement({type:'button', parent: createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'add'], textContent:'+>', title:'Add To Matter Mutator',
	onclick:() => { if(this.a){game.table.push(this); game.menu.updateTable();}} });
	
	add.classList.toggle('disabled', !this.a);
	
	this.content.a.push(own);
	this.content.d = add;
}
InventoryItem.prototype.renderUsedIn = function(parent, input){
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoLeaf(this.f)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.fullName,
	style:{width:'50%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'30%', textAlign:'left'}})
	createUIElement({type:'span', parent:ow, textContent:'Need:'});
	createUIElement({type:'span', parent:ow, textContent:input.a});
}
InventoryItem.prototype.renderManage = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
		onclick:() => game.menu.gotoLeaf(this.f)});
	
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.fullName, style:{textAlign:'left'}});
	
	this.content.a.push(createUIElement({parent:parent, textContent:this.a, style:{textAlign:'center'}}));
	
	this.content.s.push(createUIElement({type:'input', 
		parent:createUIElement({parent:parent, cssClasses:['cell'], style:{textAlign:'right'}}), 
		style:{width:'40px'}, attr:{type:'number', min:0, max:this.l, value:0},
		onchange:(x) => { this.s = parseInt(x.target.value); game.inventory.update(); }}));
		
	this.content.z = createUIElement({parent:parent, textContent:this.calculateDemand(), style:{textAlign:'center'}});
}

InventoryItem.prototype.update = function(){
	//update the UI elements that exist for this inventory item
	const cost = this.generatorCost();
	const canCreate = this.canCreate();
	const isUnlocked = this.isUnlocked();
	const canUpgrade = this.a >= cost;
	
	switch(game.menu.current){
		case 'Create': {
			this.content.a.forEach(x => setElementText(x, this.a));
			this.content.b.forEach(x => x.classList.toggle('disabled', !canCreate));
			this.content.c.forEach(x => x.update());
			this.content.e.checked = this.e;
			setElementText(this.content?.g, cost);
			this.content.l.forEach(x => setElementText(x, this.l??0));
			this.content.r?.classList.toggle('hide', !this.u && game.settings.u);
			this.content.s.forEach(x => { x.max = this.l; x.value = this.s; x.disabled = this.l === 0;});
			this.content.u?.classList.toggle('disabled', !canUpgrade);
			this.content.v?.classList.toggle('hide', this.l < 4);
			this.content.w?.classList.toggle('hide', this.u || !game.settings.u);
			break;
		}
		case 'Discover': {
			const filterDiscoverStock = game.settings.d.o && !this.a;
			const filterDiscoverSearch = game.settings.d.s && !this.fullName.toLowerCase().includes(game.settings.d.s);
	
			this.content.a.forEach(x => setElementText(x, this.a));
			this.content.b.forEach(x => x.classList.toggle('disabled', !canCreate));
			this.content.d?.classList.toggle('disabled', !this.a);
			this.content.p?.classList.toggle('hide', !isUnlocked || filterDiscoverStock || filterDiscoverSearch);
			break;
		}
		case 'Manage': {
			let filterManage = true;
			const demand = this.calculateDemand();
			switch(game.settings.m.d){
				case 'd':{
					filterManage = this.s < demand;
					break;
				}
				case 'b':{
					filterManage = this.s === demand;
					break;
				}
				case 's':{
					filterManage = this.s > demand;
					break;
				}
			}
			
			const filterManageSearch = game.settings.m.s && !this.fullName.toLowerCase().includes(game.settings.m.s);
			
			this.content.a.forEach(x => setElementText(x, this.a));
			this.content.l.forEach(x => setElementText(x, this.l??0));
			this.content.m?.classList.toggle('hide', !isUnlocked || !filterManage || filterManageSearch);
			this.content.s.forEach(x => { x.max = this.l; x.value = this.s; x.disabled = this.l === 0; });
			setElementText(this.content.z, demand);
			break;
		}
	}
	
	this.c.forEach(x => x.inv.update());
}
