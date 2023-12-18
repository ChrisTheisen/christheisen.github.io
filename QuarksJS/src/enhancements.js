function Enhancements(){
	this.e = 0;//enhancement booster
	this.g = 0;//generator booster
	this.k = 0;//rank discount
	
	this.content = {
		e: {
			a: null,//amount
			b: null,//button
			h: null,//have
			n: null,//name
		},
		g: {
			a: null,//amount
			b: null,//button
			h: null,//have
			n: null,//name
		},
		k: {
			a: null,//amount
			b: null,//button
			h: null,//have
			n: null,//name
		},
	};
}

//these are kept split up to give flexibility in balancing 
Enhancements.prototype.costE = function(){
	const a = 10**Math.floor(this.e/AllSortedFlavors.length);
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
	return 1.01**this.e;
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
	return 1.01**(this.e * this.powerE());
}
Enhancements.prototype.gotoG = function(){
	game.menu.gotoNode(this.costG().inv.f.n);
}

Enhancements.prototype.costK = function(){
	const a = 10**Math.floor(this.k/AllSortedFlavors.length);
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
	return .99**(this.k * this.powerE());
}
Enhancements.prototype.gotoK = function(){
	game.menu.gotoNode(this.costK().inv.f.n);
}

Enhancements.prototype.render = function(parent){
	const wrapper = createUIElement({parent: parent, cssClasses:['center']})
	
	const rowG = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowK = createUIElement({parent: wrapper, cssClasses:['row']});
	const rowE = createUIElement({parent: wrapper, cssClasses:['row']});
	
	createUIElement({parent:rowG, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Generator Output'});
	createUIElement({parent:rowK, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Rank Cost'});
	createUIElement({parent:rowE, cssClasses:['cell'], style:{textAlign:'left'}, textContent:'Enhancements'});
	
	createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoG(), title:'Increase generator output while keeping input the same.'});
	createUIElement({type:'button', parent:rowK, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoK(), title:'Reduce rank cost.'});
	createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell'], textContent:'»', onclick:() => this.gotoE(), title:'Improve the other enhancement effects.'});

	this.content.g.n = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[name]'});
	this.content.k.n = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[name]' });
	this.content.e.n = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[name]' });

	this.content.g.h = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[have]' });
	this.content.k.h = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[have]' });
	this.content.e.h = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[have]' });

	createUIElement({parent:rowG, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowK, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowE, cssClasses:['cell'], textContent:'/' });

	this.content.g.a = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[amount]' });
	this.content.k.a = createUIElement({parent:rowK, cssClasses:['cell'], textContent:'[amount]' });
	this.content.e.a = createUIElement({parent:rowE, cssClasses:['cell'], textContent:'[amount]' });

	this.content.g.b = createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Increase generator output while keeping input the same.', onclick:() => this.buyG() });
	this.content.k.b = createUIElement({type:'button', parent:rowK, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Reduce rank cost.', onclick:() => this.buyK() });
	this.content.e.b = createUIElement({type:'button', parent:rowE, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Improve the other enhancement effects.', onclick:() => this.buyE() });
}
Enhancements.prototype.update = function(){
	const cg = this.costG();
	const ck = this.costK();
	const ce = this.costE();
	
	setElementText(this.content?.e?.a, ce.a);
	this.content?.e?.b.classList.toggle('disabled', ce.inv.a < ce.a);
	setElementText(this.content?.e?.h, ce.inv.a);
	setElementText(this.content?.e?.n, ce.inv.f.n);
	
	setElementText(this.content?.g?.a, cg.a);
	this.content?.g?.b.classList.toggle('disabled', cg.inv.a < cg.a);
	setElementText(this.content?.g?.h, cg.inv.a);
	setElementText(this.content?.g?.n, cg.inv.f.n);	
	
	setElementText(this.content?.k?.a, ck.a);
	this.content?.k?.b.classList.toggle('disabled', ck.inv.a < ck.a);
	setElementText(this.content?.k?.h, ck.inv.a);
	setElementText(this.content?.k?.n, ck.inv.f.n);	
}
