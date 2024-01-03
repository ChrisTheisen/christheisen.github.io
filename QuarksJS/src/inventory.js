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
	
	const bag = createUIElement({parent:parent, cssClasses:['discoverContainer']});
	Object.values(this.children).sort((a,b) => a.f.m.compare(b.f.m)).forEach(x => {
		const row = createUIElement({parent: bag, cssClasses:['row']});
		row.classList.toggle('hide', !x.isUnlocked());
		x.content.p = row;
		x.renderDiscover(row);
	});
}
Inventory.prototype.renderManage = function(parent){
	
	const hRow = createUIElement({parent: parent, cssClasses:['row']});
	createUIElement({parent:parent, cssClasses:['cell'], style:{width:'5%'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Name', style:{width:'20%', textAlign:'left'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Owned', title:'The number of this item owned', style:{width:'15%', cursor:'help'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Setpoint', title:'The target amount to create', style:{width:'15%', cursor:'help'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Demand', title:'Demand based on generator setpoints' , style:{width:'15%', cursor:'help'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Created', title:'Actual amount created in last cycle' , style:{width:'15%', cursor:'help'}});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:'Used', title:'Actual amount used in last cycle' , style:{width:'15%', cursor:'help'}});
	
	Object.values(this.children).sort((a,b) => a.f.m.compare(b.f.m)).forEach(x => {
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
	
	//can manage when a generator for an item with components is over level 1.
	const canManage = Object.values(game.inventory.children).some(x => x.l > 1 && x.i.length > 0);
	game.menu.children.Manage.b.classList.toggle('hide', !canManage);
	
	//can enhance when a generator for an item with components is over rank 3.
	const canEnhance = Object.values(game.inventory.children).some(x => x.k > 3 && x.i.length > 0);
	game.menu.children.Enhance.b.classList.toggle('hide', !canEnhance);
}

function InventoryItem(input){
	this.a = 0;//amout
	this.b = new Amount();//bulk storage
	this.d = false;//auto-upgrade enabled
	this.e = true;//generator enabled
	this.f = input;//flavor
	//ingredients needed to create/generate
	this.i = input.i.sort((a,b) => a.f.m.compare(b.f.m)).map(x => ({a:x.a, b:x.b??new Amount(), inv:game.inventory.getInvByFlavor(x.f)}));
	this.k = 0;//generator rank
	this.l = 0;//generator level

	//other output items when generated
	this.o = input.o.sort((a,b) => a.f.m.compare(b.f.m)).map(x => ({a:x.a, inv:game.inventory.getInvByFlavor(x.f)}));
	this.q = false;//show used in
	this.s = 0;//generator set-point
	this.t = false;//auto-upgrade rank
	
	this.v = {a: 0, b: new Amount()};//deposit value
	this.w = {a: 0, b: new Amount()};//withdraw amount
	
	this.f.u = this.i.length === 0;
	
	AllFlavors[this.f.n]=this;
	this.content = {
		a:[], //amount label
		b:[], //generate button (for Generate disabled)
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
		n:null, //actual-created label
		o:null, //auto-uprank wrapper (for show/hide)
		p:null, //discover parent row(for hiding locked/filtered)
		q:null, //actual used label
		r:null, //used in list container
		s:[], //set-level
		t:null, //auto-uprank checkbox (for checkbox checked)
		u:null, //generator upgrade button
		v:null, //generator uprank button
		w:null, //spoiler warning
		x:null, //results/spoiler wrapper
		y:null, //supply label
		z:null, //demand label
		au:null, //deposit range
		av:null, //deposit label
		aw:null, //withdraw range
		ax:null, //withdraw label
	};
}
InventoryItem.prototype.generatorMax = function(){
	const s = .2*this.rankBonus();
	const a = s*this.l**2;
	const b = s*this.l;
	const c = this.l;
	return Math.floor(a+b+c);
}
InventoryItem.prototype.generatorClick = function(){
	if(game.settings.c){
		this.a++;
		return;
	}
	
	if(!this.canCreate()){return;}
	
	this.i.forEach(x => {
		x.inv.a -= x.a
		x.inv.b.subtract(x.b);
	});
	this.a++;
	
	//If this is a new item that was navigated to through Used In it needs to be unlocked. 
	//This is different than the generator's generate.
	this.unlock();
	//this.a+=999;//TESTING line to gain a bunch of stuff.
}
InventoryItem.prototype.generate = function(){
	if(!this.e || !this.s){return;}
	
	if(game.settings.c){//if cheater then just create
		const temp = Math.floor(this.s * game.enhancements.powerG());
		this.a += temp;
		ActualCreated[this.f.n] = temp;
		return;
	}
	
	const amount = Math.floor(Math.min(
		...this.i.map(x => x.a===0?Number.POSITIVE_INFINITY:x.inv.a/x.a),
		...this.i.map(x => x.b.isZero()?Number.POSITIVE_INFINITY:x.inv.b.estDivide(x.b)),
		this.s)
	);
	
	this.i.forEach(x => {
		ActualUsed[x.inv.f.n] = (ActualUsed[x.inv.f.n]??0) + x.a * amount;
		x.inv.a -= x.a * amount
	});
	
	const enhanced = amount * game.enhancements.powerG();
	ActualCreated[this.f.n] = enhanced;
	this.a += enhanced;
	const surplus = this.a - MAX_INVENTORY;
	if(surplus > 0){
		this.a = MAX_INVENTORY;
		this.b.add(new Amount().add(this.f.m).scale(surplus));
	}
}
InventoryItem.prototype.upgradeCost = function(){
	const s = .2*this.rankDiscount();
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
	
	const newCost = this.upgradeCost();
	setElementText(this.content?.g, newCost);
	this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
	this.content.b.forEach(x => x.classList.toggle('disabled', !this.canCreate()));
	this.content.l.forEach(x => setElementText(x, this.l??0));
	this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0;});
	this.content.u?.classList.toggle('disabled', this.a < newCost);

}
InventoryItem.prototype.calculateDemand = function(){
	let output = 0;
	ComponentMap[this.f.n]?.forEach(x => {
		output += x.inv.s * x.a;
	});
	return output;
}
InventoryItem.prototype.uprankCost = function(){
	const s = 1.25;
	const a = s**this.k * game.enhancements.powerK();
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

	this.content.b.forEach(x => x.classList.toggle('disabled', !this.canCreate()));
	setElementText(this.content?.f, this.uprankCost());
	setElementText(this.content?.k, this.k??0);
	this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0;});
	this.content.l.forEach(x => setElementText(x, this.l??0));
}

InventoryItem.prototype.canCreate = function(){
	if(game.settings.c){return true;}
	return !this.i.some(x => x.inv.a < x.a) && this.i.every(x => x.inv.b.compare(x.b) >= 0);
}
InventoryItem.prototype.isUnlocked = function(){
	return isUnlocked(this.f);
}
InventoryItem.prototype.unlock = function(){
	if(this.isUnlocked()){return;}
	unlock(this.f);
}
InventoryItem.prototype.setS = function(input){
	const max = this.generatorMax();
	const value = Math.min(input, max);
	this.s = Math.max(0,value);
	this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0;});
}

InventoryItem.prototype.renderCreate = function(parent){
	this.renderCreate0(createUIElement({parent: parent, cssClasses:['block', 'flex', 'center']}));
	this.renderCreate1(createUIElement({parent: parent, cssClasses:['block', 'flex', 'center']}));
	const w = createUIElement({parent: parent, cssClasses:['hide']});
	this.content.x = w;
	this.renderCreate2(createUIElement({parent: w, cssClasses:['block', 'center']}));
}
InventoryItem.prototype.renderCreate0 = function(parent){
	
	const inv = createUIElement({parent: parent, style:{width:'30%', paddingRight:'10px'}})
	createUIElement({parent:inv, cssClasses:['title'], textContent:'Inventory', title:`Maximum capacity is ${MAX_INVENTORY}`});
	
	const create_gen = createUIElement({type:'button', parent: inv, cssClasses:['circleButton', 'gains'], textContent:'++', 
		style:{float:'right', marginTop:'14px'}, title:'Generate',
	onclick:() => { this.generatorClick(); this.update(); } });
	
	const row = createUIElement({parent:inv, style:{paddingTop:'17px'}});
	
	const create_own = createUIElement({parent:row, textContent:Math.floor(this.a)});
	
	create_gen.classList.toggle('disabled', !this.canCreate());
	
	const gen = createUIElement({parent: parent, cssClasses:['bLeft'], style:{width:'70%'}});
	this.renderGeneratorCreate(gen);
	
	this.content.a.push(create_own);
	this.content.b.push(create_gen);
}
InventoryItem.prototype.renderCreate1 = function(parent){
	const bs = createUIElement({parent:parent, style:{width:'50%', paddingRight:'10px'}});
	this.renderBulkStorage(bs);
	
	const comp = createUIElement({parent: parent, cssClasses:['bLeft'], style:{width:'50%'}});
	createUIElement({parent:comp, cssClasses:['title'], textContent:'Components'});
	if(this.f.i.length === 0){
		createUIElement({parent:comp, textContent:'This is an elementary particle, it does not have components.'});
		createUIElement({parent:comp, textContent:'(Creating this item is free)'});
	}
	else{
		this.renderComponents(comp);
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
	
	ComponentMap[this.f.n]?.sort((a,b) => a.inv.f.m.compare(b.inv.f.m))?.forEach(x => {
		const root = createUIElement({parent: results});
		const row = createUIElement({parent: root, cssClasses:['flex']});
		x.inv.renderUsedIn(row, x);
	});
	
	this.content.r = results;
}
InventoryItem.prototype.renderBulkStorage = function(parent){
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Bulk Storage', title:'Store items in bulk to avoid overflowing Inventory.'});

	this.v.a = 0;
	this.v.b.scale(0);
	this.w.a = 0;
	this.w.b.scale(0);
	
	const r0 = createUIElement({parent:parent, style:{width:'100%', display:'inline-flex'}});
	const c0 = createUIElement({parent:r0, style:{width:'40%'}});
	createUIElement({parent:c0, textContent:'Contents:'});
	this.b.render(createUIElement({parent:c0}));

	const c1 = createUIElement({parent:r0, style:{width:'30%'}});
	this.content.au = createUIElement({type:'input', attr:{type:'range', min:0, max:Math.floor(this.a), step:1, value:0}, 
		parent:c1, style:{width:'90%'},
		onchange:(event)=>{ 
			this.v.a = parseInt(event.target.value);
			setElementText(this.content.av, this.v.a);
			this.v.b.scale(0).add(this.f.m).scale(this.v.a);
		}
	});
	
	const avw = createUIElement({parent:c1})
	this.content.av = createUIElement({type:'span', parent:avw});
	createUIElement({type:'span', parent:avw, textContent:` ${this.f.n}`})
	createUIElement({type:'button', parent:c1, textContent:'Deposit',
		onclick:() => {
			this.b.add(this.v.b);
			this.a -= this.v.a;
			
			this.v.a = 0;
			this.v.b.scale(0);
			setElementText(this.content.av, 0);
			this.b.update();
			this.v.b.update();
			this.content.au.value = 0;
			this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
		}
	});
	
	createUIElement({type:'hr', parent:c1});
	
	const maxW = Math.min(MAX_INVENTORY-this.a, this.b.estDivide(this.f.m));
	this.content.aw = createUIElement({type:'input', attr:{type:'range', min:0, max:maxW, step:1, value:0}, 
		parent:c1, style:{width:'90%'},
		onchange:(event)=>{ 
			this.w.a = parseInt(event.target.value);
			setElementText(this.content.ax, this.w.a);
			this.w.b.scale(0).add(this.f.m).scale(this.w.a);
		}
	});
	
	const aww = createUIElement({parent:c1})
	this.content.ax = createUIElement({type:'span', parent:aww});
	createUIElement({type:'span', parent:aww, textContent:` ${this.f.n}`})
	createUIElement({type:'button', parent:c1, textContent:'Withdraw',
		onclick:() => {
			this.b.subtract(this.w.b);
			this.a += this.w.a;
			
			this.w.a = 0;
			this.w.b.scale(0);
			setElementText(this.content.ax, 0);
			this.b.update();
			this.w.b.update();
			this.content.aw.value = 0;
			this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
		}
	});
	
	const c2 = createUIElement({parent:r0, style:{width:'30%'}});
	createUIElement({parent:c2, textContent:'Deposit Mass:'});
	this.v.b.render(createUIElement({parent:c2}));
	this.v.b.content.w.style.textAlign= 'right';//stinky, but it works well enough that I'll probably never change it.
	
	createUIElement({type:'hr', parent:c2});

	createUIElement({parent:c2, textContent:'Withdraw Mass:'});
	this.w.b.render(createUIElement({parent:c2}));
	this.w.b.content.w.style.textAlign= 'right';//stinky, but it works well enough that I'll probably never change it.
}
InventoryItem.prototype.renderComponents = function(parent){
	this.f.i.forEach(x => {
		const row = createUIElement({parent: parent, cssClasses:['flex']});
		this.renderComponent(row, x);
	});
}
InventoryItem.prototype.renderComponent = function(parent, input){
	const inv = game.inventory.getInvByFlavor(input.f);
	
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}, cssClasses:['cell']}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
		onclick:() => game.menu.gotoNode(inv.f.n)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:inv.f.n, title:inv.fullName,style:{width:'30%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], 
		style:{width:'40%', textAlign:'left'}})
	const own = createUIElement({type:'span', parent:ow, textContent:inv.a});
	createUIElement({type:'span', parent:ow, textContent:` / ${input.a}`});
	
	const gen = createUIElement({type:'button', parent: createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'gains'], textContent:'++', title:'Generate',
	onclick:() => { inv.generatorClick(); this.update(); inv.update(); } });
	
	gen.classList.toggle('disabled', !inv.canCreate());
	
	inv.content.a.push(own);
	inv.content.b.push(gen);
}
InventoryItem.prototype.renderGeneratorCreate = function(parent){
	const r0 = createUIElement({parent:parent, style:{float:'right'}});
	createUIElement({type:'span', parent:r0, textContent:'Enabled'});
	this.content.e = createUIElement({type:'input', parent:r0, title:'Generator Enabled',
		attr:{type:'checkbox'}, onclick:() => this.e = !this.e}).checked = this.e;

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

	const row2 = createUIElement({parent:parent, cssClasses:['generator', 'nowrap']});
	this.content.h = row2;
	createUIElement({type:'span', parent:row2, textContent:'Auto-Upgrade Level'});
	this.content.i = createUIElement({type:'input', parent:row2, title:'Auto-Upgrade if Own ≥ 2xCost',
		attr:{type:'checkbox'},onclick:() => this.d = !this.d}).checked = this.d;
		
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
	
	const row4 = createUIElement({parent:parent, cssClasses:['generator', 'nowrap']});
	this.content.o = row4;
	createUIElement({type:'span', parent:row4, textContent:'Auto-Upgrade Rank'});
	this.content.t = createUIElement({type:'input', parent:row4, title:'Auto-Upgrade rank if Level ≥ 2xCost',
		attr:{type:'checkbox'},onclick:() => this.t = !this.t}).checked = this.t;
	
	const row5 = createUIElement({parent: parent, cssClasses:['nowrap'],
	style:{marginTop:'15px'}});
	createUIElement({type:'span', parent:row5, textContent:'Create up to '});
	this.content.s.push(createUIElement({type:'input', parent:row5,
		attr:{type:'number', min:0, max:this.l, value:0},
		oninput:(x) => { this.setS(parseInt(x.target.value)); this.update(); } }));
	createUIElement({type:'span', parent:row5, textContent:' every tick'});
}

InventoryItem.prototype.renderDiscover = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoNode(this.f.n)});
	createUIElement({parent:parent, cssClasses:['cell', 'nowrap'], textContent:this.f.n, title:this.fullName, 
		style:{width:'50%', textAlign:'left', overflowX:'clip', fontSize:'14px'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'30%', textAlign:'left', fontSize:'14px'}})
	const own = createUIElement({type:'span', parent:ow, textContent:this.a});
	
	const add = createUIElement({type:'button', parent: createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'add'], textContent:'+>', title:'Add To Matter Mutator',
	onclick:() => { if(this.a && !game.table.includes(this)){game.table.push(this); game.menu.updateTable(); this.update()}} });
	
	add.classList.toggle('disabled', !this.a);
	
	this.content.a.push(own);
	this.content.d = add;
}
InventoryItem.prototype.renderUsedIn = function(parent, input){
	createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
	onclick:() => game.menu.gotoNode(this.f.n)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.f.n, title:this.fullName,style:{width:'40%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'40%', textAlign:'left'}})
	createUIElement({type:'span', parent:ow, textContent:input.a});
}
InventoryItem.prototype.renderManage = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Flavor',
		onclick:() => game.menu.gotoNode(this.f.n)});
	
	createUIElement({parent:parent, cssClasses:['cell', 'nowrap'], textContent:this.f.n, title:this.fullName, style:{textAlign:'left', overflowY:'clip', fontSize:'14px'}});
	
	this.content.a.push(createUIElement({parent:parent, textContent:this.a, style:{textAlign:'center', fontSize:'14px'}}));
	
	this.content.s.push(createUIElement({type:'input', 
		parent:createUIElement({parent:parent, cssClasses:['cell'], style:{textAlign:'right', fontSize:'14px'}}), 
		attr:{type:'number', min:0, max:this.l, value:0},
		oninput:(x) => { this.setS(x.target.value); game.inventory.update(); }}));
		
	this.content.z = createUIElement({parent:parent, cssClasses:['cell'], textContent:this.calculateDemand(), style:{textAlign:'center', fontSize:'14px'}});
	this.content.n = createUIElement({parent:parent, cssClasses:['cell'], textContent:ActualCreated[this.f.n], style:{textAlign:'center', fontSize:'14px'}});
	this.content.q = createUIElement({parent:parent, cssClasses:['cell'], textContent:ActualUsed[this.f.n], style:{textAlign:'center', fontSize:'14px'}});
}

InventoryItem.prototype.isDisplayed = function(){
	const out = this.f.menu.some(x => {
		return x.isDisplayed(this.f.n);
	});
	return out;
}

InventoryItem.prototype.update = function(){
	//update the UI elements that exist for this inventory item
	const upgradeCost = this.upgradeCost();
	const uprankCost = this.uprankCost();
	const canCreate = this.canCreate();
	const isUnlocked = this.isUnlocked();
	const canUpgrade = this.a >= upgradeCost;
	const canUprank = this.l >= uprankCost;
	
	if(this.d && this.a >= upgradeCost*2){ this.upgrade(); }
	if(this.t && this.l >= uprankCost*2){ this.uprank(); }
	
	switch(game.menu.current){
		case 'Create': {
			//These can be used in component sections of other elements
			this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
			this.content.b.forEach(x => x.classList.toggle('disabled', !canCreate));
			if(!this.isDisplayed()){return;}

			this.content.e.checked = this.e;
			setElementText(this.content?.f, uprankCost);
			setElementText(this.content?.g, upgradeCost);
			this.content.h?.classList.toggle('hide', this.l < 4 && this.k < 1);//auto-level wrapper
			this.content.i.checked = this.i;
			this.content.j?.classList.toggle('hide', this.l < 8 && this.k < 1);//uprank wrapper
			setElementText(this.content?.k, this.k??0);
			this.content.l.forEach(x => setElementText(x, this.l??0));
			this.content.o?.classList.toggle('hide', this.k < 4);//auto-uprank wrapper
			this.content.r?.classList.toggle('hide', !this.q && game.settings.u);//used in wrapper
			this.content.s.forEach(x => { x.value = this.s; x.disabled = this.l === 0;});
			this.content.t.checked = this.t;
			this.content.u?.classList.toggle('disabled', !canUpgrade);
			this.content.v?.classList.toggle('disabled', !canUprank);
			this.content.w?.classList.toggle('hide', this.q || !game.settings.u);//spoiler warning
			this.content.x?.classList.toggle('hide', this.l < 2 && this.k < 1);//used in/spoiler wrapper
			
			this.content.au.max = this.a;
			this.content.au.value = Math.min(this.content.au.value, this.content.au.max);
			const maxW = Math.min(MAX_INVENTORY-this.a, this.b.estDivide(this.f.m));
			this.content.aw.max = maxW;
			this.content.aw.value = Math.min(this.content.aw.value, maxW);
			
			this.v.a = parseInt(this.content.au.value);
			this.w.a = parseInt(this.content.aw.value);
			
			setElementText(this.content.av, this.v.a);
			setElementText(this.content.ax, this.w.a);
			this.b.update();
			this.v.b.update();
			this.w.b.update();
			break;
		}
		case 'Discover': {
			const tableContains = game.table.includes(this);
			const filterDiscoverStock = game.settings.d.o && !this.a;
			const filterDiscoverSearch = game.settings.d.s && !this.f.n.toLowerCase().includes(game.settings.d.s);
	
			this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
			this.content.d?.classList.toggle('disabled', !this.a || tableContains);
			this.content.p?.classList.toggle('hide', !isUnlocked || filterDiscoverStock || filterDiscoverSearch);
			break;
		}
		case 'Manage': {
			const demand = this.calculateDemand();
			const created = ActualCreated[this.f.n] ?? 0;
			const used = ActualUsed[this.f.n] ?? 0;
			const f0 = game.settings.m.c && !created;
			const f1 = game.settings.m.d && created === this.s;
			const f2 = game.settings.m.m && created < this.s;
			const f3 = game.settings.m.l && created < used;
			const f4 = game.settings.m.n && !used;
			const f5 = game.settings.m.s && used === demand;
			const f6 = game.settings.m.t && used < demand;
			const f7 = game.settings.m.u && used < created;

			this.content.a.forEach(x => setElementText(x, Math.floor(this.a)));
			this.content.l.forEach(x => setElementText(x, this.l??0));
			this.content.m?.classList.toggle('hide', !isUnlocked || f0||f1||f2||f3||f4||f5||f6||f7);
			this.content.s.forEach(x => { x.max = this.generatorMax(); x.value = this.s; x.disabled = this.l === 0; });
			setElementText(this.content.z, demand);
			setElementText(this.content.n, Math.floor(created));
			setElementText(this.content.q, used);

			break;
		}
	}
}
