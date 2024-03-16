function Enhancements(){
	this.d = 0;//generator discount
	this.e = 0;//enhancement booster
	this.g = 0;//generator booster
	this.m = 0;//manual click booster
	
	this.content = {
		d: {
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		e: {
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		g: {
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		m: {
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
	};
}

//these are kept split up to give flexibility in balancing 
Enhancements.prototype.costD = function(){
	const a = 5*10**(1+Math.floor(this.d/AllSortedFlavors.length));
	const i = this.d%AllSortedFlavors.length;
	return {a:a, inv:AllSortedFlavors[i]};
}
Enhancements.prototype.canBuyD = function(){
	const cost = this.costD();
	return cost.inv.a >= cost.a;
}
Enhancements.prototype.buyD = function(){
	const cost = this.costD();
	if(cost.inv.a < cost.a){return;}
	
	cost.inv.a -= cost.a;
	this.d++;
	
	this.update();
}
Enhancements.prototype.powerD = function(){
	return .995**(this.d * this.powerE());
}
Enhancements.prototype.gotoD = function(){
	game.menu.gotoNode(this.costD().inv.f.n);
}

Enhancements.prototype.costE = function(){
	const a = 25*10**(1+Math.floor(this.e/AllSortedFlavors.length));
	const i = this.e%AllSortedFlavors.length;
	return {a:a, inv:AllSortedFlavors[i]};
}
Enhancements.prototype.canBuyE = function(){
	const cost = this.costE();
	return cost.inv.a >= cost.a;
}
Enhancements.prototype.buyE = function(){
	const cost = this.costE();
	if(cost.inv.a < cost.a){return;}
	
	cost.inv.a -= cost.a;
	this.e++;
	
	this.update();
}
Enhancements.prototype.powerE = function(){
	return 1.005**this.e;
}
Enhancements.prototype.gotoE = function(){
	game.menu.gotoNode(this.costE().inv.f.n);
}

Enhancements.prototype.costG = function(){
	const a = 10**Math.floor(this.g/AllSortedFlavors.length);
	const i = this.g%AllSortedFlavors.length;
	return {a:a, inv:AllSortedFlavors[i]};
}
Enhancements.prototype.canBuyG = function(){
	const cost = this.costG();
	return cost.inv.a >= cost.a;
}
Enhancements.prototype.buyG = function(){
	const cost = this.costG();
	if(cost.inv.a < cost.a){return;}
	
	cost.inv.a -= cost.a;
	this.g++;
	
	this.update();
}
Enhancements.prototype.powerG = function(){
	return 1.01**(this.g * this.powerE());
}
Enhancements.prototype.gotoG = function(){
	game.menu.gotoNode(this.costG().inv.f.n);
}

Enhancements.prototype.costM = function(){
	const a = 10**(1+Math.floor(this.m/AllSortedFlavors.length));
	const i = this.m%AllSortedFlavors.length;
	return {a:a, inv:AllSortedFlavors[i]};
}
Enhancements.prototype.canBuyM = function(){
	const cost = this.costM();
	return cost.inv.a >= cost.a;
}
Enhancements.prototype.buyM = function(){
	const cost = this.costM();
	if(cost.inv.a < cost.a){return;}
	
	cost.inv.a -= cost.a;
	this.m++;
	
	this.update();
}
Enhancements.prototype.powerM = function(){
	return 1.02**(this.m * this.powerE());
}
Enhancements.prototype.gotoM = function(){
	game.menu.gotoNode(this.costM().inv.f.n);
}

Enhancements.prototype.render = function(parent){
	const wrapper = createUIElement({parent: parent, cssClasses:['center'], style:{display:'table'}})

	const head = createUIElement({parent: wrapper, cssClasses:['row']});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'(++)', title:'Upgrade this enhancement'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Lvl', title:'Current Level'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Type', title:'Enhancement Type'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Power', title:'Power of this enhancement'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'', title:'Goto Item'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Item', title:'Material needed to upgrade'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Have', title:'Current amount in inventory'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'/', title:'Ratio vinculum'});
	createUIElement({parent:head, cssClasses:['cell', 'help'], textContent:'Need', title:'Amount needed to upgrade this enhancement'});


	const rowG = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowM = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowD = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowE = createUIElement({parent: wrapper, cssClasses:['row']});
	
	this.content.g.b = createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Increase generator output while keeping input the same.', onclick:() => this.buyG() });
	this.content.m.b = createUIElement({type:'button', parent:rowM, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Increase output from button clicks while keeping input the same.', onclick:() => this.buyM() });
	this.content.d.b = createUIElement({type:'button', parent:rowD, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Reduce generator upgrade cost.', onclick:() => this.buyD() });
	this.content.e.b = createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Improve the other enhancement effects.', onclick:() => this.buyE() });
	
	this.content.g.l = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Level]' });
	this.content.m.l = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[Level]' });
	this.content.d.l = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[Level]' });
	this.content.e.l = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[Level]' });

	createUIElement({parent:rowG, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Gen. Output', title:'Increase generator output while keeping input the same.'});
	createUIElement({parent:rowM, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Manual Output', title:'Increase production when the button is clicked while keeping the input the same. This stacks with the Gen. Output enhancement.'});
	createUIElement({parent:rowD, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Gen. Cost', title:'Reduce generator upgrade cost.'});
	createUIElement({parent:rowE, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Enhancements', title:'Improve the other enhancement effects.'});

	this.content.g.p = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Power]' });
	this.content.m.p = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[Power]' });
	this.content.d.p = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[Power]' });
	this.content.e.p = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[Power]' });

	createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoG()});
	createUIElement({type:'button', parent:rowM, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoM()});
	createUIElement({type:'button', parent:rowD, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoD()});
	createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoE()});

	this.content.g.n = createUIElement({parent:rowG, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.m.n = createUIElement({parent:rowM, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.d.n = createUIElement({parent:rowD, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.e.n = createUIElement({parent:rowE, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });

	this.content.g.h = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.m.h = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.d.h = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.e.h = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });

	createUIElement({parent:rowG, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowM, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowD, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowE, cssClasses:['cell'], textContent:'/' });

	this.content.g.a = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[amount]' });
	this.content.m.a = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[amount]' });
	this.content.d.a = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[amount]' });
	this.content.e.a = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[amount]' });
}
Enhancements.prototype.update = function(){
	const cg = this.costG();
	const cm = this.costM();
	const cd = this.costD();
	const ce = this.costE();

	const pg = this.powerG().toFixed(5);
	const pm = this.powerM().toFixed(5);
	const pd = this.powerD().toFixed(5);
	const pe = this.powerE().toFixed(5);

	setElementText(this.content?.d?.a, cd.a);
	this.content?.d?.b.classList.toggle('disabled', cd.inv.a < cd.a);
	setElementText(this.content?.d?.h, Math.floor(cd.inv.a));
	setElementText(this.content?.d?.l, this.d);
	setElementText(this.content?.d?.n, cd.inv.f.n);	
	setElementText(this.content?.d?.p, pd);

	setElementText(this.content?.e?.a, ce.a);
	this.content?.e?.b.classList.toggle('disabled', ce.inv.a < ce.a);
	setElementText(this.content?.e?.h, Math.floor(ce.inv.a));
	setElementText(this.content?.e?.l, this.e);
	setElementText(this.content?.e?.n, ce.inv.f.n);
	setElementText(this.content?.e?.p, pe);

	setElementText(this.content?.g?.a, cg.a);
	this.content?.g?.b.classList.toggle('disabled', cg.inv.a < cg.a);
	setElementText(this.content?.g?.h, Math.floor(cg.inv.a));
	setElementText(this.content?.g?.l, this.g);
	setElementText(this.content?.g?.n, cg.inv.f.n);	
	setElementText(this.content?.g?.p, pg);
	
	setElementText(this.content?.m?.a, cm.a);
	this.content?.m?.b.classList.toggle('disabled', cm.inv.a < cm.a);
	setElementText(this.content?.m?.h, Math.floor(cm.inv.a));
	setElementText(this.content?.m?.l, this.m);
	setElementText(this.content?.m?.n, cm.inv.f.n);
	setElementText(this.content?.m?.p, pm);
}
