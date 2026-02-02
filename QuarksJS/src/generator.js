function Generator({id, i=[], o=[]}){
	this.e = true;//enabled
	this.id = id;
	this.i = i.map(x => ({a:x.a ?? 0, b:x.b ?? new Amount(), inv:game.inventory.getInvByFlavor(x.f)}));
	this.o = o.map(x => ({a:x.a ?? 0, b:x.b ?? new Amount(), inv:game.inventory.getInvByFlavor(x.f)}));

	this.a = false;//auto upgrade
	this.f = 0;//flow
	this.l = 0;//level

	this.content = {
		a:null,//auto-upgrade
		b:null,//manual generate button
		c:null,//upgrade cost display
		e:null,//enabled
		f:null,//flow: create, manage
		fl:null,//flow label for converting base
		i:{},//inputs highlight when cannot afford
		l:null,//level display
		m:null,//max flow display
		u:null//upgrade button
	}
}
Generator.prototype.renderInputItem = function(parent, input){
	createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['cell']}), 
		cssClasses:['circleButton', 'goto'], textContent:'»', title:'Goto Item',
		onclick:() => game.menu.gotoNode(input.inv.f.id)});

	formatItemSymbols(input.inv.f, createUIElement({parent:parent, cssClasses:['cell']}));

	const ow = createUIElement({parent:parent, cssClasses:['cell']});
	const cssCW = (input.a && !input.b.isZero()) ? ['componentWrapper'] : [];
	const cw = createUIElement({parent:ow, cssClasses:cssCW});

	if(input.a){
		const own = createUIElement({parent:cw, textContent:input.inv.a, cssClasses:['componentAmount']});
		createUIElement({parent:cw, textContent:` / ${input.a}`, cssClasses:['componentAmount']});
		input.inv.content.a.push(own);
	}
	
	if(!input.b.isZero()){
		const aw = createUIElement({parent:cw, cssClasses:['flex']});
		input.inv.b.content.s = createUIElement({parent:aw, textContent: input.inv.b.toString()});
		createUIElement({parent:aw, textContent:' / ', cssClasses:[] });
		input.b.content.s = createUIElement({parent:aw, textContent: input.b.toString()});
	}
	this.content.i[input.inv.f.id] = cw;
}
Generator.prototype.renderInput = function(parent, input){
	if(this.i.length === 0){
		createUIElement({parent:parent, cssClasses:['cell'], textContent:'None (Free)'});
		return;
	}

	const w = createUIElement({parent: parent, cssClasses:['cell'], style:{verticalAlign:'middle'}});
	this.i.forEach(x => {
		const row = createUIElement({parent: w, cssClasses:['row'], style:{width:'100%'}});
		this.renderInputItem(row, x);
	});
}
Generator.prototype.renderOutput = function(parent){
	this.o.forEach(x => {
		const row = createUIElement({parent: parent, cssClasses:['row']});
		
		createUIElement({type:'button', parent:createUIElement({parent:row, cssClasses:['cell']}), 
			cssClasses:['circleButton', 'goto'], textContent:'»', title:'Goto Item',
			onclick:() => game.menu.gotoNode(x.inv.f.id)});

		createUIElement({parent:row, textContent:x.a, cssClasses:['cell']});
		formatItemSymbols(x.inv.f, createUIElement({parent:row,	cssClasses:['cell']}));
	});
}

Generator.prototype.render = function(parent){
	this.content.i = {};
	//enabled checkbox
	const r0 = createUIElement({parent:parent, cssClasses:['row']});
	const r1 = createUIElement({parent:parent, cssClasses:['row'], style:{backgroundColor:"var(--bg4)"}});
	const r2 = createUIElement({parent:parent, cssClasses:['row']});
	
	for(let i=0;i<5;i++){
		createUIElement({type:'hr', parent:r2, cssClasses:['cell']});
	}
	
	this.render0(r0);
	this.render1(r1);
	this.update();
}
Generator.prototype.render0 = function(parent){
	this.content.e = createUIElement({type:'input', parent:createUIElement({parent:parent, cssClasses:['cell', 'nowrap'], style:{verticalAlign:'middle'}}),
		title:'Generator Enabled', attr:{type:'checkbox'}, onclick:() => this.e = !this.e});
	
	//components
	this.renderInput(parent);

	//manual button
	this.content.b = createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['cell'], style:{verticalAlign:'middle'}}), 
		cssClasses:['circleButton', 'cell', 'genButton'], textContent:'->', title:'Manual Generate',
		onclick:() => this.generateClick()});

	//output
	this.renderOutput(createUIElement({parent: parent, cssClasses:['cell', 'nowrap']}));
	
	//flow
	const flowParent = createUIElement({parent:parent, cssClasses:['cell'], style:{verticalAlign:'middle'}});
	this.content.f = createUIElement({type:'input', parent:flowParent,
		cssClasses:['flow', 'help', 'genFlow'], title:'Target Flow is the desired amount of this item to generate every tick.', 
		attr:{type:'number'}, onchange:(e) => this.setFlow(e.target.value)});
	this.content.f.onkeyup = (e) => { 
		const max = this.maxFlow();
		const value = Math.max(0,Math.min(this.content.f.value??0, max));
		this.content.f.value = value;
		
		this.setFlow(value); 
	}
	this.content.f.value = this.f;

	this.content.fl = createUIElement({type:'span', parent:flowParent, title:'Base converted flow' });
}
Generator.prototype.render1 = function(parent){
	//upgrade
	this.content.u = createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['cell'], style:{verticalAlign:'middle'}}), 
		cssClasses:['circleButton', 'cell', 'genLevel'], textContent:'++', title:'Upgrade Generator', onclick:() => this.upgrade()});

	//const w0 = createUIElement({parent:parent, cssClasses:['cell', 'nowrap']});;
	//upgrade cost
	const cw = createUIElement({parent:parent, cssClasses:['nowrap', 'cell']});
	createUIElement({type:'span', parent:cw, textContent:'Cost: '});
	this.content.c = createUIElement({type:'span', parent:cw, textContent:'-'});
	createUIElement({type:'span', parent:cw, textContent:` ${this.o.map(x => x.inv.f.n).join()}`});

	//level
	const lw = createUIElement({parent:parent, cssClasses:['nowrap', 'cell']});
	createUIElement({type:'span', parent:lw, textContent:'LVL: '});
	this.content.l = createUIElement({type:'span', parent:lw, textContent:'-'});
 	
	//auto upgrade
	const aw = createUIElement({type:'label', parent:parent, cssClasses:['cell', 'nowrap', 'help'], textContent:'Auto-Upgrade: ', title:'Upgrade Generator when inventory > 2x cost'});
	this.content.a = createUIElement({type:'input', parent:aw, 
		attr:{type:'checkbox'}, onclick:() => this.a = !this.a});

	//Max Flow 
	const mw = createUIElement({parent:parent, cssClasses:['cell', 'nowrap', 'pointer'], title:'Click to set flow to maximum', onclick:() => this.setFlow(this.maxFlow())});
	createUIElement({type:'span', parent:mw, textContent:'Max Flow: '});
	this.content.m = createUIElement({type:'span', parent:mw, textContent:'-'});
}

Generator.prototype.update = function(){
	
	const uc = this.upgradeCost();
	const mf = this.maxFlow();
	const canCreate = this.canCreate();
	const canUpgrade = this.canUpgrade();
	
	if(this.content.a){this.content.a.checked = this.a;}
	if(this.content.b){
		this.content.b.disabled=!canCreate; 
		this.content.b.classList.toggle('disabled', !canCreate);
	}
	setElementText(this.content.c, formatNumberFromSettings(uc));
	if(this.content.e){this.content.e.checked = this.e;}
	if(this.content.f){
		this.content.f.disabled = this.l === 0;;
	}
	setElementText(this.content.l, formatNumberFromSettings(this.l));
	setElementText(this.content.m, formatNumberFromSettings(mf));
	if(this.content.u){
		this.content.u.disabled = !canUpgrade;
		this.content.u.classList.toggle('disabled', !canUpgrade);
	}

	if(game?.settings?.n?.b == 10){//hide flow label if base 10.
		this.content.fl?.classList.add('hide');
	}
	else{
		this.content.fl?.classList.remove('hide');
		setElementText(this.content.fl, formatNumberFromSettings(this.f));
	}
}

Generator.prototype.canCreate = function(){
	if(game.settings.c){return true;}
	let output = true;
	this.i.forEach(x => {
		const isInsufficient = x.inv.a < x.a || x.inv.b.compare(x.b) < 0;
		this.content.i[x.inv.f.id]?.classList.toggle('insufficient', isInsufficient);
		if(isInsufficient) { output = false; } 
	});
	
	return output;
}
Generator.prototype.canUpgrade = function(){
	const cost = this.upgradeCost();
	const temp = this.o.map(x => Math.floor(x.inv.a / cost));
	return Math.min(...temp);
}
Generator.prototype.maxFlow = function(){
	if(this.l===0){return 0;}
	const a = this.l**4;
	const b = this.l**2;
	const c = this.l;
	return Math.floor(a+b+c-2);
}
Generator.prototype.upgradeCost = function(){
	const s = game.enhancements.powerD;
	const a = s*this.l**5;
	const b = s*this.l**3;
	const c = s*this.l;
	return Math.ceil((a+b+c+1)/this.o.length);
}
Generator.prototype.upgrade = function(){
	const cost = this.upgradeCost();
	if(this.i.some(x => x.inv.a < cost)){return;}

	const isMax = this.f === this.maxFlow();
	this.l++;
	//if it was max, keep it max. If it was set to a different value leave it there.
	if(isMax){ this.setFlow(this.maxFlow());}
	
	this.o.forEach(x => {
		x.inv.a -= cost;
		x.inv.update();
	});
	
	this.update();
}
Generator.prototype.autoUpgrade = function(){
	if(this.a && this.canUpgrade() >= 2){ this.upgrade(); }
}
Generator.prototype.generateAmount = function() {
	//gets the maximum amount that can be generated based on amount owned, recipe cost in a or b, generator flow setpoint.
	const values = [
		...this.i.map(x => x.a===0?Number.POSITIVE_INFINITY:x.inv.a/x.a),
		...this.i.map(x => x.b.isZero()?Number.POSITIVE_INFINITY:x.inv.b.estDivide(x.b)),
		this.f
	].filter(x => typeof x === 'number');
	return Math.floor(Math.min(...values));
}
Generator.prototype.decreaseInput = function(amount){
	this.i.forEach(x => {
		if(x.a){
			ActualUsed[x.inv.f.id] = (ActualUsed[x.inv.f.id]??0) + x.a * amount;
			Demand[x.inv.f.id] = (Demand[x.inv.f.id]??0) + x.a * (this.f??0);
			x.inv.a -= x.a * amount
		}
		
		if(!x.b.isZero()){
			x.inv.b.subtract(x.b.scale(amount));
		}
		
		if(game.menu.current !== 'M_2' || game.settings.m.a){
			x.inv.update();
		}
	});
}
Generator.prototype.increaseOutput = function(amount){
	this.o.forEach(x => {
		const xm = x.inv.m.i;
		const tgb = game.enhancements.powerTGB[xm];
		const pg = game.enhancements.powerG[xm];
		
		const temp = amount * pg * tgb;
		ActualCreated[x.inv.f.id] = temp;
		
		if(x.a){
			const amt = x.a * temp;
			x.inv.a += amt;
		}
		
		if(!x.b.isZero()){
			const amt = x.b.scale(temp);
			x.inv.b.add(amt);
		}
		
		const surplus = x.inv.a - MAX_INVENTORY;
		if(surplus > 0){
			x.inv.a = MAX_INVENTORY;
			x.inv.b.add(new Amount().add(x.inv.f.m).scale(surplus));
		}
		
		if(game.menu.current !== 'M_2' || game.settings.m.a){
			x.inv.update();
		}
	});
}
Generator.prototype.generate = function(){
	if(!this.e || !this.f){return;}
	
	if(game.settings.c){//if cheater then just create setpoint
		this.increaseOutput(this.s);
		return;
	}
	
	const amount = this.generateAmount();
	this.decreaseInput(amount);
	this.increaseOutput(amount);
}
Generator.prototype.generateClick = function(){
	const amount = game.enhancements.powerM;
	if(game.settings.c){//if cheater then just create setpoint
		this.increaseOutput(amount);
		return;
	}
	if(!this.canCreate()){return;}

	this.decreaseInput(1);
	this.increaseOutput(amount);
	this.update();
}

Generator.prototype.setFlow = function(input){
	const max = this.maxFlow();
	const value = Math.min(input??0, max);
	this.f = Math.max(0,value);
	if(this.content.f){
		this.content.f.max = this.maxFlow(); 
		this.content.f.value = this.f;
	}
}
