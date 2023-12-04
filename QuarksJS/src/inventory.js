function Amount({Da=0, ng=0, Kg=0, Eg=0, MO=0} = new Amount({})){
	this.Da = Da;
	this.ng = ng;
	this.Kg = Kg;
	this.Eg = Eg;
	this.MO = MO;
	
	this.content = {
		Da:null,
		ng:null,
		Kg:null,
		Eg:null,
		MO:null
	}
}
Amount.prototype.render = function(){

}
Amount.prototype.update = function(){

}

Amount.prototype.add = function(input){
	this.Da += input.Da;
	this.ng += input.ng;
	this.Kg += input.Kg;
	this.Eg += input.Eg;
	this.MO += input.MO;
	
	while(this.Da > MassUnits.Da.c){ this.Da -= MassUnits.Da.c; this.ng++; }
	while(this.ng > MassUnits.ng.c){ this.ng -= MassUnits.ng.c; this.Kg++; }
	while(this.Kg > MassUnits.Kg.c){ this.Kg -= MassUnits.Kg.c; this.Eg++; }
	while(this.Eg > MassUnits.Eg.c){ this.Eg -= MassUnits.Eg.c; this.MO++; }
	
	while(this.Da < 0){ this.Da += MassUnits.Da.c; this.ng--; }
	while(this.ng < 0){ this.ng += MassUnits.ng.c; this.Kg--; }
	while(this.Kg < 0){ this.Kg += MassUnits.Kg.c; this.Eg--; }
	while(this.Eg < 0){ this.Eg += MassUnits.Eg.c; this.MO--; }

}
Amount.prototype.addMass = function(qty, unit){
	switch(unit){//this could be more clever, but I'm feeling lazy.
		case MassUnits.Da.s:{
			this.Da += qty;
			break;
		}
		case MassUnits.ng.s:{
			this.ng += qty;
			break;
		}
		case MassUnits.Kg.s:{
			this.Kg += qty;
			break;
		}
		case MassUnits.Eg.s:{
			this.Eg += qty;
			break;
		}
		case MassUnits.MO.s:{
			this.MO += qty;
			break;
		}
	}
}
Amount.prototype.scale = function(input){
	const output = new Amount();
	
	output.Da = this.Da * input;
	output.ng = this.ng * input;
	output.Kg = this.Kg * input;
	output.Eg = this.Eg * input;
	output.MO = this.MO * input;
	
	return output;
}
Amount.prototype.compare = function(input){
	
	
}

function Inventory(){
	this.children = {};
	
}
Inventory.prototype.getInvByFlavor = function(input){
	if(!input){return;}
	const f = this.children[input.n];
	if(f){
		return f
	}
	
	const newItem = new InventoryItem(input);
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
	game.menu.children.Discover.b.classList.toggle('hide', !canDiscover);
	
	//can manage when a generator for an item with components is over level 1;
	const canManage = Object.values(game.inventory.children).some(x => x.l > 1 && x.c.length > 0);
	game.menu.children.Manage.b.classList.toggle('hide', !canManage);
}

function InventoryItem(input){
	//unused: novx
	
	this.a = 0;//amout
	this.b = new Amount({});//bulk storage
	//child components needed to create/generate
	this.c = input.c.map(x => ({a:x.a, inv:game.inventory.getInvByFlavor(x.f)}));
	this.e = true;//generator enabled
	this.f = input;//flavor
	this.i = false;//auto-upgrade enabled
	this.k = 0;//generator rank
	this.l = 0;//generator level

	this.p = ParentMap[input.n];//parent item
	this.q = false;//show used in
	this.s = 0;//generator set-point
	
	this.f.u = this.c.length === 0;
	
	this.fullName = fullName(ParentMap[this.f.n], this.f.n);
	AllFlavors[this.f.n]=this;
	this.content = {
		a:[], //amount label
		b:[], //generate button (for Generate disabled)
		c:[], //create flavor sub-components (for update need)
		d:null, //discover add buttons (for disabled)
		e:null, //enabled (for checkbox checked)
		f:null, //generator uprank cost label
		g:null, //generator upgrade cost label
		h:null, //auto-upgrade wrapper
		i:null, //auto-upgrade (for checkbox checked)
		j:null, //generator rank wrapper
		k:null, //generator rank label
		l:[], //level label
		m:null, //manage parent row(for hiding locked/filtered)
		p:null, //discover parent row(for hiding locked/filtered)
		r:null, //used in list container
		s:[], //set-level
		u:null, //generator upgrade button
		v:null, //generator uprank button
		w:null, //spoiler warning
		x:null, //results/spoiler wrapper
		y:null, //supply label
		z:null //demand label
	};
}
InventoryItem.prototype.generatorMax = function(){
	const s = Math.max(.5, this.p.t)/2*this.rankBonus();
	const a = s*this.l**2;
	const b = s*this.l;
	const c = this.l;
	return Math.floor(a+b+c);
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
InventoryItem.prototype.upgradeCost = function(){
	const s = Math.max(.5, this.p.t)/4*this.rankDiscount();
	const a = s*this.l**3;
	const b = s*this.l**2;
	const c = s*this.l;
	return Math.ceil(a+b+c+1);
}
InventoryItem.prototype.upgrade = function(){
	const cost = this.upgradeCost();
	if(this.a < cost){return;}
	
	const temp = this.s === this.generatorMax();
	this.l++;
	//if it was max, keep it max. If it was set to a different value leave it there.
	if(temp){ this.s = this.generatorMax();}
	
	this.a -= cost;
	this.update();
}
InventoryItem.prototype.calculateDemand = function(){
	let output = 0;
	ComponentMap[this.f.n]?.forEach(x => {
		output += x.inv.s * x.a;
	});
	return output;
}
InventoryItem.prototype.uprankCost = function(){
	const s = 1+(Math.max(.5, this.p.t)/4);
	const a = s**this.k;
	return Math.ceil(a);
}
InventoryItem.prototype.rankDiscount = function(){
	const a = .95**this.k;
	return a;
}
InventoryItem.prototype.rankBonus = function(){
	const a = 1.05**this.k;
	return a;
}
InventoryItem.prototype.uprank = function(){
	const cost = this.uprankCost();
	if(this.l < cost){return;}
	
	const temp = this.s === this.generatorMax();
	this.k++;
	this.l -= cost;

	//if it was max, keep it max. If it was set to a different value leave it there.
	if(temp){ this.s = this.generatorMax();}

	this.update();
}



InventoryItem.prototype.canCreate = function(){
	return this.p.t <= game.settings.d || !this.c.some(x => x.inv.a < x.a );
}
InventoryItem.prototype.isUnlocked = function(){
	return isUnlocked(this.f);
}
InventoryItem.prototype.unlock = function(){
	if(this.isUnlocked()){return;}
	unlock(this.f);
}

InventoryItem.prototype.renderCreate = function(parent){
	this.renderCreate0(createUIElement({parent: parent, cssClasses:['block', 'flex', 'center']}));
	this.renderCreate1(createUIElement({parent: parent, cssClasses:['block', 'center']}));
	const w = createUIElement({parent: parent, cssClasses:['hide']});
	this.content.x = w;
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
		onclick:() => {this.q = true; this.update();}});
	
	const results = createUIElement({parent: parent, cssClasses:['hide']});
	
	ComponentMap[this.f.n]?.forEach(x => {
		const root = createUIElement({parent: results});
		const row = createUIElement({parent: root, cssClasses:['flex']});
		x.inv.renderUsedIn(row, x);
	});
	
	this.content.r = results;
}
InventoryItem.prototype.renderComponents = function(parent){
	this.f.c.forEach(x => {
		const row = createUIElement({parent: parent, cssClasses:['flex']});
		this.renderComponent(row, x);
	});
}
InventoryItem.prototype.renderComponent = function(parent, input){
	const inv = game.inventory.getInvByFlavor(input.f);
	
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
		onclick:() => game.menu.gotoNode(this.f.n)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:inv.fullName,
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
	const r0 = createUIElement({parent:parent, style:{float:'right'}});
	createUIElement({type:'span', parent:r0, textContent:'Enabled'});
	this.content.e = createUIElement({type:'input', parent:r0, title:'Generator Enabled',
		attr:{type:'checkbox', checked:this.e}, onclick:() => this.e = !this.e});

	createUIElement({parent:parent, cssClasses:['title'], textContent:'Generator'});
	
	const row1 = createUIElement({parent:parent, cssClasses:['generator', 'nowrap', 'cell']});
	
	createUIElement({type:'span', parent:row1, textContent:'Level: '});
	this.content.l.push(createUIElement({type:'span', parent:row1, textContent:'0'}));
	this.content.u = createUIElement({type:'button', parent: row1, cssClasses:['circleButton', 'gains'], textContent:'++', 
		style:{marginLeft:'15px',marginRight:'15px'}, title:'Upgrade Generator',
	onclick:() => this.upgrade()});
	
	createUIElement({type:'span', parent:row1, textContent:'Cost: '});
	this.content.g = createUIElement({type:'span', parent:row1, textContent:`${this.upgradeCost()}`});
	createUIElement({type:'span', parent:row1, textContent:` ${this.f.n}`});

	const row2 = createUIElement({parent:parent});
	this.content.h = row2;
	createUIElement({type:'span', parent:row2, textContent:'Auto-Upgrade Level'});
	this.content.i = createUIElement({type:'input', parent:row2, title:'Auto-Upgrade',
		attr:{type:'checkbox', checked:this.i},onclick:() => this.i = !this.i});
		
	const row3 = createUIElement({parent:parent, cssClasses:['generator', 'nowrap', 'cell']});
	this.content.j = row3;
	createUIElement({type:'span', parent:row3, textContent:'Rank: '});
	this.content.k = createUIElement({type:'span', parent:row3, textContent:'0'});
	this.content.v = createUIElement({type:'button', parent: row3, cssClasses:['circleButton', 'gains'], textContent:'++', 
		style:{marginLeft:'15px',marginRight:'15px'}, title:'Uprank Generator',
		onclick:() => this.uprank()});
	
	createUIElement({type:'span', parent:row3, textContent:'Cost: '});
	this.content.f = createUIElement({type:'span', parent:row3, textContent:`${this.uprankCost()}`});
	createUIElement({type:'span', parent:row3, textContent:` ${this.f.n} Generators`});
	
	
	const row4 = createUIElement({parent:parent, cssClasses:['generator', 'nowrap', 'cell']});
		
	
	const row5 = createUIElement({parent: parent, cssClasses:['nowrap'],
	style:{marginTop:'15px'}});
	createUIElement({type:'span', parent:row5, textContent:'Create up to '});
	this.content.s.push(createUIElement({type:'input', parent:row5,
		attr:{type:'number', min:0, max:this.l, value:0},
		oninput:(x) => { this.s = parseInt(x.target.value); this.update(); } }));
	createUIElement({type:'span', parent:row5, textContent:' every tick'});
}

InventoryItem.prototype.renderDiscover = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoNode(this.f.n)});
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
	onclick:() => game.menu.gotoNode(this.f.n)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.fullName,
	style:{width:'50%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'30%', textAlign:'left'}})
	createUIElement({type:'span', parent:ow, textContent:'Need:'});
	createUIElement({type:'span', parent:ow, textContent:input.a});
}
InventoryItem.prototype.renderManage = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
		onclick:() => game.menu.gotoNode(this.f.n)});
	
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.fullName, style:{textAlign:'left'}});
	
	this.content.a.push(createUIElement({parent:parent, textContent:this.a, style:{textAlign:'center'}}));
	
	this.content.s.push(createUIElement({type:'input', 
		parent:createUIElement({parent:parent, cssClasses:['cell'], style:{textAlign:'right'}}), 
		attr:{type:'number', min:0, max:this.l, value:0},
		oninput:(x) => { this.s = parseInt(x.target.value); game.inventory.update(); }}));
		
	this.content.z = createUIElement({parent:parent, textContent:this.calculateDemand(), style:{textAlign:'center'}});
}

InventoryItem.prototype.update = function(){
	//update the UI elements that exist for this inventory item
	const upgradeCost = this.upgradeCost();
	const uprankCost = this.uprankCost();
	const canCreate = this.canCreate();
	const isUnlocked = this.isUnlocked();
	const canUpgrade = this.a >= upgradeCost;
	const canUprank = this.l >= uprankCost;
	
	if(canUpgrade && this.i){
		this.upgrade();
	}
	
	switch(game.menu.current){
		case 'Create': {
			this.content.a.forEach(x => setElementText(x, this.a));
			this.content.b.forEach(x => x.classList.toggle('disabled', !canCreate));
			this.content.c.forEach(x => x.update());
			this.content.e.checked = this.e;
			setElementText(this.content?.f, uprankCost);
			setElementText(this.content?.g, upgradeCost);
			this.content.h?.classList.toggle('hide', this.l < 19 && this.k < 1);
			this.content.i.checked = this.i;
			this.content.j?.classList.toggle('hide', this.l < 29 && this.k < 1);
			setElementText(this.content?.k, this.k??0);
			this.content.l.forEach(x => setElementText(x, this.l??0));
			this.content.r?.classList.toggle('hide', !this.q && game.settings.u);
			this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0;});
			this.content.u?.classList.toggle('disabled', !canUpgrade);
			this.content.v?.classList.toggle('disabled', !canUprank);
			this.content.w?.classList.toggle('hide', this.q || !game.settings.u);
			this.content.x?.classList.toggle('hide', this.l < 9 && this.k < 1);
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
			this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0; });
			setElementText(this.content.z, demand);
			break;
		}
	}
	
	this.c.forEach(x => x.inv.update());
}
