function Enhancements(){
	this.d = 0;//generator discount
	this.g = 0;//generator booster
	this.m = 0;//manual click booster
	
	this.totalGenerated = new Amount();

	this.powerD = 0;
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
			b0: null,//bonus
			b1: null,//bonus
			b2: null,//bonus
			b3: null,//bonus
			b4: null,//bonus
			b5: null,//bonus
			b6: null,//bonus
			b7: null,//bonus
			g0: null,//total auto bonus
			g1: null,//total auto bonus
			g2: null,//total auto bonus
			g3: null,//total auto bonus
			g4: null,//total auto bonus
			g5: null,//total auto bonus
			g6: null,//total auto bonus
			g7: null,//total auto bonus
			m0: null,//total manual bonus
			m1: null,//total manual bonus
			m2: null,//total manual bonus
			m3: null,//total manual bonus
			m4: null,//total manual bonus
			m5: null,//total manual bonus
			m6: null,//total manual bonus
			m7: null,//total manual bonus
		}
	};
}

//calculate once and use saved values every cycle.
Enhancements.prototype.setPowers = function(){
	this.setPowerD();
	this.setPowerG();
	this.setPowerM();
	this.setPowerTGB();
};

Enhancements.prototype.setPowerTGB = function(){
	const tm = this.totalGenerated.magnitude();
	const pct = this.totalGenerated[tm.s]/tm.c;
	const es = game.settings.e / 10;
	const baseBonus = (tm.emb + (pct * (tm.emr - tm.emb))) ** es;
	
	//console.log(tm, baseBonus);

	for(let i=0;i<this.powerTGB.length; i++){
		this.powerTGB[i] = Math.max(1, baseBonus / ((i+1) ** 8));
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
	this.powerD = .9995**this.d;
}
Enhancements.prototype.gotoD = function(){
	game.menu.gotoNode(this.costD().inv.f.id);
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
	let base = 1+(.01 * this.g**2);
	
	for(let i=0;i<this.powerG.length; i++){
		this.powerG[i] = Math.max(1, base / ((i+1) ** 2));
	}
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
	this.powerM = 1+(8 * this.m);
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
	
	this.content.g.b = createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Multiplies all generator output while keeping input the same.', onclick:() => this.buyG() });
	this.content.m.b = createUIElement({type:'button', parent:rowM, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Multiply the output from button clicks while keeping input the same.', onclick:() => this.buyM() });
	this.content.d.b = createUIElement({type:'button', parent:rowD, cssClasses:['circleButton', 'cell'], textContent:'++', title:'Reduce generator upgrade cost.', onclick:() => this.buyD() });
	
	this.content.g.l = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Level]' });
	this.content.m.l = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[Level]' });
	this.content.d.l = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[Level]' });

	createUIElement({parent:rowG, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Gen. Output', title:'Multiply all generator output while keeping input the same.'});
	createUIElement({parent:rowM, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Manual Output', title:'Multiply the output when the (->) button is clicked while keeping the input the same.'});
	createUIElement({parent:rowD, cssClasses:['cell', 'help'], style:{textAlign:'left'}, textContent:'Gen. Cost', title:'Reduce generator upgrade cost.'});

	this.content.g.p = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[Power]' });
	this.content.m.p = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[Power]' });
	this.content.d.p = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[Power]' });

	createUIElement({type:'button', parent:rowG, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoG()});
	createUIElement({type:'button', parent:rowM, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoM()});
	createUIElement({type:'button', parent:rowD, cssClasses:['circleButton', 'goto', 'cell'], textContent:'»', onclick:() => this.gotoD()});

	this.content.g.n = createUIElement({parent:rowG, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.m.n = createUIElement({parent:rowM, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });
	this.content.d.n = createUIElement({parent:rowD, cssClasses:['cell', 'nowrap'], textContent:'[name]', style:{textAlign:'left', width:'125px'} });

	this.content.g.h = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.m.h = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });
	this.content.d.h = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[have]', style:{textAlign:'right', width:'75px'} });

	createUIElement({parent:rowG, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowM, cssClasses:['cell'], textContent:'/' });
	createUIElement({parent:rowD, cssClasses:['cell'], textContent:'/' });

	this.content.g.a = createUIElement({parent:rowG, cssClasses:['cell'], textContent:'[amount]' });
	this.content.m.a = createUIElement({parent:rowM, cssClasses:['cell'], textContent:'[amount]' });
	this.content.d.a = createUIElement({parent:rowD, cssClasses:['cell'], textContent:'[amount]' });
	
	const bonusWrapper = createUIElement({parent: parent, cssClasses:['center', 'bonusWrapper']});
	createUIElement({parent: bonusWrapper, textContent: 'Total Mass Bonus: '});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'The Total Mass Bonus (TMB) increases all generator outputs.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'TMB starts with a small bonus when the total mass is over 65536 Da and increases with greater total mass.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'Enhancements have a reduced effect on larger items.'});
	createUIElement({type:'p', parent: bonusWrapper, cssClasses:['info'], textContent: 'The table below displays the different bonuses for items of different magnitudes.'});

	const tgbWrapper = createUIElement({parent: bonusWrapper, cssClasses:['table', 'center']})
	const wrapperTGBHead = createUIElement({parent: tgbWrapper, cssClasses:['row']})
	const mag = this.totalGenerated.magnitude().i;

	const wrapper0 = createUIElement({parent: tgbWrapper, cssClasses:['row']})
	const wrapper1 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<1?'hide':null]})
	const wrapper2 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<2?'hide':null]})
	const wrapper3 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<3?'hide':null]})
	const wrapper4 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<4?'hide':null]})
	const wrapper5 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<5?'hide':null]})
	const wrapper6 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<6?'hide':null]})
	const wrapper7 = createUIElement({parent: tgbWrapper, cssClasses:['row', mag<7?'hide':null]})

	createUIElement({parent: wrapperTGBHead, cssClasses:['cell', 'headerCell'], textContent: 'Item Magnitude'})
	createUIElement({parent: wrapperTGBHead, cssClasses:['cell', 'headerCell'], textContent: 'TMB'})
	createUIElement({parent: wrapperTGBHead, cssClasses:['cell', 'headerCell', 'help'], textContent: 'Auto Bonus', title: 'Total multiplier bonus when the item is auto generated every cycle.'})
	createUIElement({parent: wrapperTGBHead, cssClasses:['cell', 'headerCell', 'help'], textContent: 'Manual Bonus', title: 'Total multiplier bonus when the Generate (->) button is clicked.'})

	createUIElement({parent: wrapper0, textContent: MassUnits.Da.n, cssClasses:['cell']})
	createUIElement({parent: wrapper1, textContent: MassUnits.pg.n, cssClasses:['cell']})
	createUIElement({parent: wrapper2, textContent: MassUnits.g.n, cssClasses:['cell']})
	createUIElement({parent: wrapper3, textContent: MassUnits.Tg.n, cssClasses:['cell']})
	createUIElement({parent: wrapper4, textContent: MassUnits.Yg.n, cssClasses:['cell']})
	createUIElement({parent: wrapper5, textContent: MassUnits.MO.n, cssClasses:['cell']})
	createUIElement({parent: wrapper6, textContent: MassUnits.GM.n, cssClasses:['cell']})
	createUIElement({parent: wrapper7, textContent: MassUnits.CM.n, cssClasses:['cell']})
	
	this.content.t.b0 = createUIElement({parent: wrapper0, textContent: '1', cssClasses:['cell']});
	this.content.t.b1 = createUIElement({parent: wrapper1, textContent: '1', cssClasses:['cell']});
	this.content.t.b2 = createUIElement({parent: wrapper2, textContent: '1', cssClasses:['cell']});
	this.content.t.b3 = createUIElement({parent: wrapper3, textContent: '1', cssClasses:['cell']});
	this.content.t.b4 = createUIElement({parent: wrapper4, textContent: '1', cssClasses:['cell']});
	this.content.t.b5 = createUIElement({parent: wrapper5, textContent: '1', cssClasses:['cell']});
	this.content.t.b6 = createUIElement({parent: wrapper6, textContent: '1', cssClasses:['cell']});
	this.content.t.b7 = createUIElement({parent: wrapper7, textContent: '1', cssClasses:['cell']});

	this.content.t.g0 = createUIElement({parent: wrapper0, textContent: '1', cssClasses:['cell']});
	this.content.t.g1 = createUIElement({parent: wrapper1, textContent: '1', cssClasses:['cell']});
	this.content.t.g2 = createUIElement({parent: wrapper2, textContent: '1', cssClasses:['cell']});
	this.content.t.g3 = createUIElement({parent: wrapper3, textContent: '1', cssClasses:['cell']});
	this.content.t.g4 = createUIElement({parent: wrapper4, textContent: '1', cssClasses:['cell']});
	this.content.t.g5 = createUIElement({parent: wrapper5, textContent: '1', cssClasses:['cell']});
	this.content.t.g6 = createUIElement({parent: wrapper6, textContent: '1', cssClasses:['cell']});
	this.content.t.g7 = createUIElement({parent: wrapper7, textContent: '1', cssClasses:['cell']});

	this.content.t.m0 = createUIElement({parent: wrapper0, textContent: '1', cssClasses:['cell']});
	this.content.t.m1 = createUIElement({parent: wrapper1, textContent: '1', cssClasses:['cell']});
	this.content.t.m2 = createUIElement({parent: wrapper2, textContent: '1', cssClasses:['cell']});
	this.content.t.m3 = createUIElement({parent: wrapper3, textContent: '1', cssClasses:['cell']});
	this.content.t.m4 = createUIElement({parent: wrapper4, textContent: '1', cssClasses:['cell']});
	this.content.t.m5 = createUIElement({parent: wrapper5, textContent: '1', cssClasses:['cell']});
	this.content.t.m6 = createUIElement({parent: wrapper6, textContent: '1', cssClasses:['cell']});
	this.content.t.m7 = createUIElement({parent: wrapper7, textContent: '1', cssClasses:['cell']});
	
	this.update();
}
Enhancements.prototype.update = function(){
	const cg = this.costG();
	const cm = this.costM();
	const cd = this.costD();

	setElementText(this.content?.d?.a, formatNumberFromSettings(cd.a));
	this.content?.d?.b.classList.toggle('disabled', cd.inv.a < cd.a);
	setElementText(this.content?.d?.h, formatNumberFromSettings(Math.floor(cd.inv.a)));
	setElementText(this.content?.d?.l, formatNumberFromSettings(this.d));
	setElementText(this.content?.d?.n, cd.inv.f.n);	
	setElementText(this.content?.d?.p, formatNumberFromSettings(this.powerD));

	setElementText(this.content?.g?.a, formatNumberFromSettings(cg.a));
	this.content?.g?.b.classList.toggle('disabled', cg.inv.a < cg.a);
	setElementText(this.content?.g?.h, formatNumberFromSettings(Math.floor(cg.inv.a)));
	setElementText(this.content?.g?.l, formatNumberFromSettings(this.g));
	setElementText(this.content?.g?.n, cg.inv.f.n);	
	setElementText(this.content?.g?.p, formatNumberFromSettings(this.powerG[0]));
	
	setElementText(this.content?.m?.a, formatNumberFromSettings(cm.a));
	this.content?.m?.b.classList.toggle('disabled', cm.inv.a < cm.a);
	setElementText(this.content?.m?.h, formatNumberFromSettings(Math.floor(cm.inv.a)));
	setElementText(this.content?.m?.l, formatNumberFromSettings(this.m));
	setElementText(this.content?.m?.n, cm.inv.f.n);
	setElementText(this.content?.m?.p, formatNumberFromSettings(this.powerM));
	
	for(let i=0;i<this.powerTGB.length;i++){
		setElementText(this.content?.t[`b${i}`], formatNumberFromSettings(this.powerTGB[i]));
		setElementText(this.content?.t[`g${i}`], formatNumberFromSettings(this.powerTGB[i] * this.powerG[i]));
		setElementText(this.content?.t[`m${i}`], formatNumberFromSettings(this.powerTGB[i] * this.powerG[i] * this.powerM));
	}
}
