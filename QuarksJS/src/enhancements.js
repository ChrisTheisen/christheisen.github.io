function Enhancements(){
	this.d = 0;//generator discount
	this.e = 0;//enhancement booster
	this.g = 0;//generator booster
	this.m = 0;//manual click booster
	
	this.totalGenerated = new Amount();

	this.powerD = 0;
	this.powerE = 0;
	this.powerG = Array(Object.keys(MassUnits).length).fill(1);
	this.powerM = 1;
	this.powerTGB = Array(Object.keys(MassUnits).length).fill(1);
	
	this.content = {
		d: {//discount
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		e: {//enhancement bonus
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		g: {//generator bonus
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		m: {//manual bonus
			a: null,//amount
			b: null,//button
			h: null,//have
			l: null,//level
			n: null,//name
			p: null//power
		},
		t: {//total mass generated
			b: null,//bonus
			g: null,//generated
		}
	};
}

//calculate once and use saved values every cycle.
Enhancements.prototype.setPowers = function(){
	this.setPowerE();
	this.setPowerD();
	this.setPowerG();
	this.setPowerM();
	this.setPowerTGB();
};

Enhancements.prototype.setPowerTGB = function(){
	const tm = this.totalGenerated.magnitude();
	const pct = this.totalGenerated[tm.s]/tm.c;
	const baseBonus = tm.emb + (pct * tm.emr);
	
	for(let i=0;i<this.powerTGB.length; i++){
		this.powerTGB[i] = Math.max(1, baseBonus / ((i+1) ** 24));
	}
}

//these are kept split up to give flexibility in balancing 
Enhancements.prototype.costD = function(){
	const a = 128*16**(4*Math.floor(this.d/AllSortedFlavors.length))+this.d*6+Math.floor(this.d**1.75);
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
Enhancements.prototype.setPowerD = function(){
	this.powerD = .9995**(this.d * this.powerE);
}
Enhancements.prototype.gotoD = function(){
	game.menu.gotoNode(this.costD().inv.f.id);
}

Enhancements.prototype.costE = function(){
	const a = 1024*16**(4*Math.floor(this.e/AllSortedFlavors.length))+this.e*8+Math.floor(this.e**2);
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
Enhancements.prototype.setPowerE = function(){
	this.powerE = 1.005**this.e;
}
Enhancements.prototype.gotoE = function(){
	game.menu.gotoNode(this.costE().inv.f.id);
}

Enhancements.prototype.costG = function(){
	const a = 32*16**(4*Math.floor(this.g/AllSortedFlavors.length))+this.g*4+Math.floor(this.g**1.5);
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
Enhancements.prototype.setPowerG = function(){
	let base = 1+(.01 * this.g**2 * this.powerE);
	
	for(let i=0;i<this.powerG.length; i++){
		this.powerG[i] = Math.max(1, base / ((i+1) ** 2));
	}
	//this.powerG = 1+(.01 * this.g**2 * this.powerE);
	//this.powerG = 1.01**(this.g * this.powerE);
}
Enhancements.prototype.gotoG = function(){
	game.menu.gotoNode(this.costG().inv.f.id);
}

Enhancements.prototype.costM = function(){
	const a = 4*16**(4*Math.floor(this.m/AllSortedFlavors.length))+this.m*2+Math.floor(this.m**1.25);
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
Enhancements.prototype.setPowerM = function(){
	this.powerM = 1+(10 * this.m * this.powerE);
	//this.powerM = 1.02**(this.m * this.powerE);
}
Enhancements.prototype.gotoM = function(){
	game.menu.gotoNode(this.costM().inv.f.id);
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

	const rowM = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowG = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowD = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowE = createUIElement({parent: wrapper, cssClasses:['row']});
	
	this.content.g.b = createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Multiplies all generator output while keeping input the same.', onclick:() => this.buyG() });
	this.content.m.b = createUIElement({type:'button', parent:rowM, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Multiply the output from button clicks while keeping input the same.', onclick:() => this.buyM() });
	this.content.d.b = createUIElement({type:'button', parent:rowD, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Reduce generator upgrade cost.', onclick:() => this.buyD() });
	this.content.e.b = createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell', 'help'], textContent:'++', title:'Improve the other enhancement effects.', onclick:() => this.buyE() });
	
	this.content.g.l = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Level]' });
	this.content.m.l = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[Level]' });
	this.content.d.l = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[Level]' });
	this.content.e.l = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[Level]' });

	createUIElement({parent:rowG, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Gen. Output', title:'Multiply all generator output while keeping input the same.'});
	createUIElement({parent:rowM, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Manual Output', title:'Multiply the output when the (->) button is clicked while keeping the input the same.'});
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
	
	const bonusWrapper = createUIElement({parent: parent, cssClasses:['center', 'bonusWrapper']});
	createUIElement({parent: bonusWrapper, textContent: 'Total Mass Bonus: '});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'The Total Mass Bonus (TMB) increases all generator outputs.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'TMB starts with a small bonus when the total mass is over 65536 Da and increases with greater total mass.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'TMB has a reduced effect on larger items.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: '//TODO: Display TMB bonus for different sizes.'});
	this.content.t.b = createUIElement({parent: bonusWrapper, textContent: '1'});
	
	this.update();
}
Enhancements.prototype.update = function(){
	const cg = this.costG();
	const cm = this.costM();
	const cd = this.costD();
	const ce = this.costE();

	const pg = this.powerG[0].toFixed(5);
	const pm = this.powerM.toFixed(5);
	const pd = this.powerD.toFixed(5);
	const pe = this.powerE.toFixed(5);

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
	
	setElementText(this.content?.t?.b, this.powerTGB[0].toFixed(6)});
}
