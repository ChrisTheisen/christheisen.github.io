function Enhancements(){
	this.e = 0;//enhancement booster
	this.g = 0;//generator booster
	this.k = 0;//rank discount
	
	this.content = {
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
		k: {
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
Enhancements.prototype.costE = function(){
	const a = 10**(4+Math.floor(this.e/AllSortedFlavors.length));
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
	return 1.0025**this.e;
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
	return 1.005**(this.e * this.powerE());
}
Enhancements.prototype.gotoG = function(){
	game.menu.gotoNode(this.costG().inv.f.n);
}

Enhancements.prototype.costK = function(){
	const a = 10**(1+Math.floor(this.k/AllSortedFlavors.length));
	const i = this.k%AllSortedFlavors.length;
	return {a:a, inv:AllSortedFlavors[i]};
}
Enhancements.prototype.canBuyK = function(){
	const cost = this.costK();
	return cost.inv.a >= cost.a;
}
Enhancements.prototype.buyK = function(){
	const cost = this.costK();
	if(cost.inv.a < cost.a){return;}
	
	cost.inv.a -= cost.a;
	this.k++;
	
	this.update();
}
Enhancements.prototype.powerK = function(){
	return .995**(this.k * this.powerE());
}
Enhancements.prototype.gotoK = function(){
	game.menu.gotoNode(this.costK().inv.f.n);
}

Enhancements.prototype.render = function(parent){
	const wrapper = createUIElement({parent: parent, cssClasses:['center'], style:{display:'table'}})
	
	const rowG = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowK = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowE = createUIElement({parent: wrapper, cssClasses:['row']});
	
	this.content.g.l = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Level]' });
	this.content.k.l = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[Level]' });
	this.content.e.l = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[Level]' });

	createUIElement({parent:rowG, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Gen. Output'});
	createUIElement({parent:rowK, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Rank Cost'});
	createUIElement({parent:rowE, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Enhancements'});

	createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoG(), title:'Increase generator output while keeping input the same.'});
	createUIElement({type:'button', parent:rowK, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoK(), title:'Reduce rank cost.'});
	createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoE(), title:'Improve the other enhancement effects.'});

	this.content.g.n = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.k.n = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.e.n = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });

	this.content.g.h = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.k.h = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.e.h = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });

	createUIElement({parent:rowG, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowK, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowE, cssClasses:['cell'], textContent:'/' });

	this.content.g.a = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[amount]' });
	this.content.k.a = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[amount]' });
	this.content.e.a = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[amount]' });
	
	this.content.g.b = createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Increase generator output while keeping input the same.', onclick:() => this.buyG() });
	this.content.k.b = createUIElement({type:'button', parent:rowK, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Reduce rank cost.', onclick:() => this.buyK() });
	this.content.e.b = createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Improve the other enhancement effects.', onclick:() => this.buyE() });
	
	this.content.g.p = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Power]' });
	this.content.k.p = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[Power]' });
	this.content.e.p = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[Power]' });




}
Enhancements.prototype.update = function(){
	const cg = this.costG();
	const ck = this.costK();
	const ce = this.costE();

	const pg = this.powerG().toFixed(5);
	const pk = this.powerK().toFixed(5);
	const pe = this.powerE().toFixed(5);



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
	
	setElementText(this.content?.k?.a, ck.a);
	this.content?.k?.b.classList.toggle('disabled', ck.inv.a < ck.a);
	setElementText(this.content?.k?.h, Math.floor(ck.inv.a));
	setElementText(this.content?.k?.l, this.k);
	setElementText(this.content?.k?.n, ck.inv.f.n);	
	setElementText(this.content?.k?.p, pk);
}
