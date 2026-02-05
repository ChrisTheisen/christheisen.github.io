function Inventory(){
	this.children = {};
}
Inventory.prototype.getInvByFlavor = function(input){
	if(!input){return;}
	const f = this.children[input.id];
	if(f){
		return f
	}
	
	const newItem = new InventoryItem(input);
	this.children[input.id] = newItem;
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
	const t = createUIElement({type:'table', parent: parent, style:{margin:'auto', borderCollapse:'collapse'}});
	const h = createUIElement({type:'tr', parent: t});
	createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'Item', style:{width:'10%', textAlign:'left'}});
	console.log(game.settings.m);
	if(game.settings.m.so){
		createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'Owned', title:'The number of this item owned, does not include bulk storage.', cssClasses:['help']});
	}
	if(game.settings.m.sd){
		createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'Demand', title:'Demand based on generator flow setpoints', cssClasses:['help']});
	}
	if(game.settings.m.ss){
		createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'Supply', title:'Actual amount created in last cycle', cssClasses:['help']});
	}
	if(game.settings.m.su){
		createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'Used', title:'Actual amount used in last cycle', cssClasses:['help']});
	}
	createUIElement({type:'th', parent:h, attr:{scope:'col'}, textContent:'', style:{width:'5%'}});
	
	Object.values(this.children).filter(x => x.f.u).sort((a,b) => a.f.m.compare(b.f.m)).forEach(x => {
		x.renderManage(t);
	});
}

//in some cases we don't update the UI; foce ensures the UI will update.
Inventory.prototype.update = function(force = false){
	Object.values(this.children).forEach(child => child.update(force));
}

function InventoryItem(input){
	this.a = 0;//amout
	this.b = new Amount();//bulk storage
	this.f = input;//flavor
	this.g = [];//generators that output this item
	this.i = [];//generators that input this item
	this.m = input.m.magnitude();//item mass magnitude
	this.q = false;//show used in

	this.v = {a: 0, b: new Amount()};//deposit value
	this.w = {a: 0, b: new Amount()};//withdraw amount
	
	AllFlavors[this.f.id]=this;
	this.content = {
		a:[], //amount label
		bs:null, //bulk storage area
		d:null, //discover add buttons (for disabled)
		dg:null, //discover GOTO button (for tutorial)
		f:null, //manage sum flow
		g:[], //generators
		i:null, //inventory
		m:null, //manage parent row(for hiding locked/filtered)
		n:null, //actual-created label
		o:null, //isOwned message on discover
		p:null, //discover parent row(for hiding locked/filtered)
		q:null, //actual used label
		r:null, //used in list container
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

InventoryItem.prototype.mapGenerators = function(){
	this.g = game.generators.filter(x => x.o.some(o => o.inv.f.id === this.f.id));
	this.i = game.generators.filter(x => x.i.some(i => i.inv.f.id === this.f.id));
}
InventoryItem.prototype.calculateDemand = function(){
	let output = 0;
	this.i.forEach(x => {
		if(!x.e){return;}
		output += x.f * x.i.find(y => y.inv.f.id === this.f.id).a;
	});
	return output;
}
InventoryItem.prototype.calculateSumFlow = function(){
	let output = 0;
	this.g.forEach(x => {
		output += x.f * x.o.find(y => y.inv.f.id === this.f.id).a;
	});
	return output;
}
InventoryItem.prototype.totalMass = function(){
	let a = this.f.m.clone().scale(this.a);
	a.add(this.b);
	return a;
}

InventoryItem.prototype.isUnlocked = function(){
	return isUnlocked(this.f);
}
InventoryItem.prototype.unlock = function(){
	if(this.isUnlocked()){return;}
	unlock(this.f);
}

InventoryItem.prototype.renderCreate = function(parent){
	const info = createUIElement({
		parent:createUIElement({parent: parent, cssClasses:['block', 'center', 'flex'], style:{lineHeight:'20px', fontSize:'20px'}}),
		style:{margin:'auto',display:'flex'}
		});
	
	createUIElement({parent: info, cssClasses:['nowrap','itemInfo'], textContent:`Name:${this.f.n}`});
	const s = createUIElement({parent: info, cssClasses:['nowrap','flex','itemInfo']});
	createUIElement({type:'span', parent: s, textContent:'Symbol:'})
	formatItemSymbols(this.f, createUIElement({parent:s}));
	const m = createUIElement({parent: info, cssClasses:['nowrap','flex','itemInfo']});
	createUIElement({type:'span', parent: m, textContent:'Mass:'});
	createUIElement({parent:m, textContent: this.f.m.toString()});
	
	if(!this.isUnlocked()){
		createUIElement({type:'button', parent: createUIElement({parent: parent, cssClasses:['block', 'center']}), 
		cssClasses:['itemInfo'] , textContent:'Discover This Item',
			onclick:()=>{
				game.mm.length = 0;
				game.menu.gotoNode('M_1');
				
				let uc = this.g[0];
				let lc = Infinity;
				this.g.forEach(g => {
					let c = 0;
					g.i.map(x => x.inv).forEach(x => {
						if(!x.isUnlocked()){ c+=100; }
						else if(x.a<1){ c+=10; }
						else{ c+=1; }
					});
					
					if(c<lc){
						lc = c;
						uc = g;
					}
				});
				
				uc.i.map(x => x.inv).forEach(x => {
					if(game.mm.includes(x)){return;}
					if(x.a<1) { 
						makeToast(`Unable to add ${x.f.n} {${x.f.s}} to the Matter Mutator. You must have at least one in inventory.`);
					}
					else{ game.mm.push(x); }
				});
				
				game.menu.updateMM();
			}
		});
		return;
	}
	
	this.renderCreate0(createUIElement({parent: parent, cssClasses:['block', 'flex', 'center']}));
	this.renderCreate1(createUIElement({parent: parent, cssClasses:['block', 'center']}));
	const w = createUIElement({parent: parent, cssClasses:['hide']});
	this.content.x = w;
	this.renderCreate2(createUIElement({parent: w, cssClasses:['block', 'center']}));
}
InventoryItem.prototype.renderCreate0 = function(parent){
	
	this.content.i = createUIElement({parent: parent, style:{width:'50%', paddingRight:'10px'}})
	createUIElement({parent:this.content.i, cssClasses:['title'], textContent:'Inventory', title:`Maximum capacity is ${MAX_INVENTORY.toLocaleString()}`});
	
	const row = createUIElement({parent:this.content.i});
	
	this.content.a.push(createUIElement({parent:row, textContent:Math.floor(this.a), style:{fontSize:'36px'}}));
	
	this.content.bs = createUIElement({parent:parent, cssClasses:['bLeft'], style:{width:'50%'}});
	this.renderBulkStorage(this.content.bs);

}
InventoryItem.prototype.renderCreate1 = function(parent){
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Generators'});
	const w = createUIElement({parent:parent, cssClasses:['center', 'table']});
	const r0 = createUIElement({parent:w, cssClasses:['row']});
	createUIElement({parent:r0, cssClasses:['subtitle', 'cell'], style:{width:'5%'}});
	createUIElement({parent:r0, cssClasses:['subtitle', 'cell'], textContent:'Input', style:{width:'50%'}});
	createUIElement({parent:r0, cssClasses:['subtitle', 'cell'], textContent:'->', style:{width:'10%'}});
	createUIElement({parent:r0, cssClasses:['subtitle', 'cell'], textContent:'Output', style:{width:'35%'}});
	createUIElement({parent:r0, cssClasses:['subtitle', 'cell'], textContent:'Flow', style:{width:'35%'}});
	
	this.g.forEach(x => x.render(w));
}
InventoryItem.prototype.renderCreate2 = function(parent){
	createUIElement({parent:parent, cssClasses:['title'], textContent:'Used In'});
	const alert = createUIElement({parent: parent});
	this.content.w = alert;
	
	createUIElement({parent:alert, textContent:"Spoiler Alert: This will show all items this item is a component for; including ones you have not unlocked yet."});
	createUIElement({type:'button', cssClasses:['circleButton', 'goto'], parent:alert, textContent:'✔', title:'Accept',
		onclick:() => {this.q = true; this.update();}});
	
	const results = createUIElement({parent: parent, cssClasses:['hide']});
	
	const allO = this.i.map(x => x.o).flat().sort((a,b) => a.inv.f.m.compare(b.inv.f.m));
	allO.forEach(x => {
		const row = createUIElement({parent: results, cssClasses:['row'], style:{width:'100%'}});
		x.inv.renderUsedIn(row);
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
			setElementText(this.content.av, formatNumberFromSettings(this.v.a));
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
			this.content.a.forEach(x => setElementText(x, formatNumberFromSettings(Math.floor(this.a))));
		}
	});
	
	createUIElement({type:'hr', parent:c1});
	
	const maxW = Math.min(MAX_INVENTORY-this.a, this.b.estDivide(this.f.m));
	this.content.aw = createUIElement({type:'input', attr:{type:'range', min:0, max:maxW, step:1, value:0}, 
		parent:c1, style:{width:'90%'},
		onchange:(event)=>{ 
			this.w.a = parseInt(event.target.value);
			setElementText(this.content.ax, formatNumberFromSettings(this.w.a));
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
			this.content.a.forEach(x => setElementText(x, formatNumberFromSettings(Math.floor(this.a))));
		}
	});
	
	const c2 = createUIElement({parent:r0, style:{width:'30%'}});
	createUIElement({parent:c2, textContent:'Deposit Mass:'});
	this.v.b.render(createUIElement({parent:c2}));
	this.v.b.content.w.style.textAlign='right';//stinky, but it works well enough that I'll probably never change it.
	
	createUIElement({type:'hr', parent:c2});

	createUIElement({parent:c2, textContent:'Withdraw Mass:'});
	this.w.b.render(createUIElement({parent:c2}));
	this.w.b.content.w.style.textAlign='right';//stinky, but it works well enough that I'll probably never change it.
}

InventoryItem.prototype.renderDiscover = function(parent){
	this.content.dg = createUIElement({type:'button', parent:createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Item',
	onclick:() => game.menu.gotoNode(this.f.id)});
	formatItemSymbols(this.f, createUIElement({parent:parent, cssClasses:['cell', 'nowrap'], style:{textAlign:'left', overflowX:'clip', fontSize:'14px'}}));
	
	const add = createUIElement({type:'button', parent: createUIElement({parent:parent, style:{width:'10%'}}), 
		cssClasses:['circleButton', 'cell', 'add'], textContent:'+>', title:'Add To Matter Mutator',
		onclick:() => { 
			if(game.mm.includes(this)){return;}
			if(this.a < 1){ return;}
		
			game.mm.push(this); 
			game.menu.updateMM(); 
			this.update()
		}
	});
	
	add.classList.toggle('disabled', !this.a);

	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'30%', textAlign:'left', fontSize:'14px'}})
	const own = createUIElement({type:'span', parent:ow});

	this.content.d = add;
	this.content.o = own;
}
InventoryItem.prototype.renderUsedIn = function(parent){
	createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['cell'], style:{width:'20%'}}), 
		cssClasses:['circleButton', 'cell', 'goto'], textContent:'»', title:'Goto Item',
	onclick:() => game.menu.gotoNode(this.f.id)});
	createUIElement({parent:parent, cssClasses:['cell'], textContent:this.f.n,style:{width:'40%', textAlign:'left'}});
	
	const ow = createUIElement({parent:parent, cssClasses:['cell'], style:{width:'40%', textAlign:'left'}})
	formatItemSymbols(this.f, createUIElement({type:'span', parent:ow, cssClasses:['cell']}));
}
InventoryItem.prototype.renderManage = function(parent){
	if(!this.isUnlocked()){return;}
	
	const row = createUIElement({type:'tr', parent:parent, cssClasses:['manageRow']});
	row.classList.toggle('hide', !this.isUnlocked());
	this.content.m = row;

	const n = createUIElement({type:'td', parent:row, cssClasses:['flex']});
	createUIElement({type:'button', parent:n, 
		cssClasses:['circleButton', 'goto'], textContent:'»', title:'Goto Item',
		onclick:() => game.menu.gotoNode(this.f.id)});
	
	formatItemSymbols(this.f, createUIElement({type:'td', parent:n, cssClasses:['nowrap'], style:{textAlign:'left', overflowY:'clip', fontSize:'14px', lineHeight:'3'}}));
	//formatItemSymbols(this.f, createUIElement({parent:parent, cssClasses:['cell', 'nowrap'], style:{textAlign:'left', overflowY:'clip', fontSize:'14px'}}));
	
	if(game.settings.m.so){
		this.content.a.push(createUIElement({type:'td', parent:row, textContent:this.a, style:{textAlign:'center', fontSize:'14px'}}));
	}
	if(game.settings.m.sd){
		this.content.z = createUIElement({type:'td', parent:row, textContent:'-', style:{textAlign:'center', fontSize:'14px'}});
	}
	if(game.settings.m.ss){
		this.content.n = createUIElement({type:'td', parent:row, textContent:'-', style:{textAlign:'center', fontSize:'14px'}});
	}
	if(game.settings.m.su){
		this.content.q = createUIElement({type:'td', parent:row, textContent:'-', style:{textAlign:'center', fontSize:'14px'}});
	}
	
	const expander = createUIElement({type:'button', parent:createUIElement({type:'td', parent:row}), 
		cssClasses:['expandHeader'], textContent:'≡', title:'Expand Details',
		onclick:() => {
			this.renderManageModal();
		}})
	

}
InventoryItem.prototype.renderManageModal = function(){
	const parent = createUIElement({cssClasses:['manageModalWrapper']});
	const modal = getUIElement("manageModalForm");
	createUIElement({type:'button', parent:parent, textContent:'X', style:{padding:'5px',margin:'0',fontSize:'10px',position:'absolute',right:'10px',top:'10px'}});

	const dr = [];
	createUIElement({type:'h1', parent:parent, textContent:this.f.n});
	const fWrapper = createUIElement({parent:parent, style:{display:'inline-block'}});
	const enforceLimit = createUIElement({type:'input', parent:createUIElement({type:'label', parent:fWrapper, textContent:'Hide Flow <= limit: '}), 
		title:'Hide Flow <= limit', attr:{type:'checkbox'}, style:{float:'left', marginRight:'10px'},
		onclick:(e) => {
			const value = Number(limit.value);
			dr.forEach(x => {
				x.row.classList.toggle('hide', e.target.checked && x.g.f <= value);
			});
		}
	});
	const limit = createUIElement({type:'input', parent:fWrapper, 
		attr:{type:'number', min:0, max:1000000000000, value:0}, 
		style:{width:'50px'},
		onchange:(e) => {
			const value = Number(e.target.value);
			dr.forEach(x => {
				x.row.classList.toggle('hide', enforceLimit.checked && x.g.f <= value);
			});
			setElementText(limitLabel, formatNumberFromSettings(value));
		}
	});
	const limitLabel = createUIElement({type:'span', parent:fWrapper, title:'Base converted flow', textContent:formatNumberFromSettings(0) });

	
	if(this.i.length){

		createUIElement({type:'h4', parent:parent, textContent:`Generators with ${this.f.n} as an input:`});
		const it = createUIElement({type:'table', parent:parent, style:{width:'100%'}});
		
		this.i.forEach(x => {
			const igr = createUIElement({type:'tr', parent:it});
			dr.push({row:igr, g:x});
			const ins = x.i.map(x => `${x.inv.f.s}:${x.a?x.a:''}`).join(', ');
			const outs = x.o.map(x => `${x.inv.f.s}:${x.a?x.a:''}`).join(', ');
			const inn = x.i.map(x => `${x.inv.f.n}:${x.a?x.a:''}`).join(', ');
			const outn = x.o.map(x => `${x.inv.f.n}:${x.a?x.a:''}`).join(', ');
			
			x.content.e = createUIElement({type:'input', parent:createUIElement({type:'td', parent:igr}),
				title:'Generator Enabled', attr:{type:'checkbox'}, onclick:() => x.e = !x.e});

			formatItemSymbols({s:ins, n:inn}, createUIElement({type:'td', parent:igr, style:{width:'30%'}}));
			createUIElement({type:'td', parent:igr, textContent:'->'});
			formatItemSymbols({s:outs, n:outn}, createUIElement({type:'td', parent:igr, style:{width:'30%'}}));
			x.content.f = createUIElement({type:'input', parent:createUIElement({type:'td', parent:igr}),
				cssClasses:['flow', 'help'], title:'Target Flow is the desired amount of this item to generate every tick.', 
				attr:{type:'number'}, onchange:(e) => { x.setFlow(e.target.value); setElementText(x.content.fl, formatNumberFromSettings(x.f)); }});
			x.content.f.value = x.f;

			x.content.fl = createUIElement({ type:'span', parent:createUIElement({type:'td', parent:igr}), title:'Base converted flow', textContent:formatNumberFromSettings(x.f) });
		});
	}
	
	if(this.g.length){

		createUIElement({type:'h4', parent:parent, textContent:`Generators with ${this.f.n} as an output:`});
		const ot = createUIElement({type:'table', parent:parent, style:{width:'100%'}});
		
		this.g.forEach(x => {
			const ogr = createUIElement({type:'tr', parent:ot});
			dr.push({row:ogr, g:x});
			const ins = x.i.map(x => `${x.inv.f.s}:${x.a?x.a:''}`).join();
			const outs = x.o.map(x => `${x.inv.f.s}:${x.a?x.a:''}`).join();
			const inn = x.i.map(x => `${x.inv.f.n}:${x.a?x.a:''}`).join();
			const outn = x.o.map(x => `${x.inv.f.n}:${x.a?x.a:''}`).join();
			
			x.content.e = createUIElement({type:'input', parent:createUIElement({type:'td', parent:ogr}),
				title:'Generator Enabled', attr:{type:'checkbox'}, onclick:() => x.e = !x.e});
			
			formatItemSymbols({s:ins, n:inn}, createUIElement({type:'td', parent:ogr, style:{width:'30%'}}));
			createUIElement({type:'td', parent:ogr, textContent:'->'});
			formatItemSymbols({s:outs, n:outn}, createUIElement({type:'td', parent:ogr, style:{width:'30%'}}));
			x.content.f = createUIElement({type:'input', parent:createUIElement({type:'td', parent:ogr}),
				cssClasses:['flow', 'help'], title:'Target Flow is the desired amount of this item to generate every tick.', 
				attr:{type:'number'}, onchange:(e) => { x.setFlow(e.target.value); setElementText(x.content.fl, formatNumberFromSettings(x.f)); }});
			x.content.f.value = x.f;

			x.content.fl = createUIElement({ type:'span', parent:createUIElement({type:'td', parent:ogr}), title:'Base converted flow', textContent:formatNumberFromSettings(x.f) });
		});
	}
	
	modal.replaceChildren(parent);
	game.manageModalItem = this.f.id;
	getUIElement("manageModal").showModal();
}

InventoryItem.prototype.isDisplayed = function(){
	return game.menu.isDisplayed(this.f.id);
}

InventoryItem.prototype.update = function(force = false){
	//update the UI elements that exist for this inventory item
	const isUnlocked = this.isUnlocked();
	
	switch(game.menu.current){
		case 'M_0': {//Create
			//These can be used in component sections of other elements
			this.content.a.forEach(x => setElementText(x, formatNumberFromSettings(Math.floor(this.a))));
			if(!this.isDisplayed() || !isUnlocked){return;}

			this.g.forEach(x => x.update());
			
			const hideBS = this.a < 1048576 && this.b.isZero();
			this.content.bs?.classList.toggle('hide', hideBS)
			this.content.i.style.width = hideBS ? '100%' : '50%';
			this.content.i.style.lineHeight = hideBS ? '1' : '3';
			
			const hideUsedIn = this.q || !game.settings.u;
			this.content.r?.classList.toggle('hide', !hideUsedIn);//used in wrapper
			this.content.w?.classList.toggle('hide', hideUsedIn);//spoiler warning
			this.content.x?.classList.toggle('hide', this.l < 2 && this.k < 1);//used in/spoiler wrapper
			
			this.content.au.max = this.a;
			this.content.au.value = Math.min(this.content.au.value, this.content.au.max);
			const maxW = Math.min(MAX_INVENTORY-this.a, this.b.estDivide(this.f.m));
			this.content.aw.max = maxW;
			this.content.aw.value = Math.min(this.content.aw.value, maxW);
			
			this.v.a = parseInt(this.content.au.value);
			this.w.a = parseInt(this.content.aw.value);
			
			//Bulk storage transfer amount labels
			setElementText(this.content.av, formatNumberFromSettings(this.v.a));
			setElementText(this.content.ax, formatNumberFromSettings(this.w.a));
			this.b.update();
			this.v.b.update();
			this.w.b.update();
			break;
		}
		case 'M_1': {//Discover
			const mmContains = game.mm.includes(this);
			const filterDiscoverStock = game.settings.d.o && this.a < game.settings.d.l;
			const filterDiscoverSearch = game.settings.d.s && !this.f.n.toLowerCase().includes(game.settings.d.s) && !this.f.s.replaceAll(/\W/g, '').toLowerCase().includes(game.settings.d.s);
	
			setElementText(this.content.o, this.a>0?'':'None Owned');
			this.content.d?.classList.toggle('disabled', this.a<1 || mmContains);
			this.content.p?.classList.toggle('hide', !isUnlocked || filterDiscoverStock || filterDiscoverSearch);
			break;
		}
		case 'M_2': {//Manage
			if(!isUnlocked){
				this.content.m?.classList.add('hide');
				return;
			}
			
			const demand = Demand[this.f.id] ?? 0;
			const created = ActualCreated[this.f.id] ?? 0;
			const used = ActualUsed[this.f.id] ?? 0;
			const f0 = game.settings.m.c && !created;
			const f1 = game.settings.m.m && created < demand;
			const f2 = game.settings.m.l && created < used;
			const f3 = game.settings.m.n && !used;
			const f4 = game.settings.m.t && used < demand;
			const f5 = game.settings.m.u && used < created;
			const f6 = game.settings.m.x && !demand;
			const f7 = game.settings.m.y && demand < created;
			const f8 = game.settings.m.z && demand < used;

			if(!force){
				return;
			}

			const hide = f0||f1||f2||f3||f4||f5||f6||f7||f8;
			this.content.m?.classList.toggle('hide', hide);
			if(hide){return;}

			if(getUIElement("manageModal").open && this.f.id === game.manageModalItem){
				this.g.forEach(x => x.update());
				this.i.forEach(x => x.update());
			}

			this.content.a.forEach(x => setElementText(x, formatNumberFromSettings(Math.floor(this.a))));
			setElementText(this.content.z, formatNumberFromSettings(demand));
			setElementText(this.content.n, formatNumberFromSettings(Math.floor(created)));
			setElementText(this.content.q, formatNumberFromSettings(used));


			break;
		}
	}
}
