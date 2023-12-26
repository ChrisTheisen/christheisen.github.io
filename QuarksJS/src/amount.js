const MAX_INVENTORY = 2**50;

function Amount({Da=0, pg=0, g=0, Tg=0, Yg=0, MO=0} = new Amount({})){
	this.Da = Da;
	this.pg = pg;
	this.g = g;
	this.Tg = Tg;
	this.Yg = Yg;
	this.MO = MO;
	
	this.content = {
		e:null,
		w:null,
		wDa:null,
		wpg:null,
		wg:null,
		wTg:null,
		wYg:null,
		wMO:null,
		Da:null,
		pg:null,
		g:null,
		Tg:null,
		Yg:null,
		MO:null
	}
}
Amount.prototype.render = function(parent){
	const w = createUIElement({parent:parent, cssClasses:['amountWrapper']});
	this.content.w = w;
	
	this.content.e = createUIElement({parent:w, textContent:'Empty'});
	
	const wDa = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.Da= createUIElement({type:'span', parent:wDa, textContent:this.Da});
	createUIElement({type:'span', parent:wDa, textContent:` ${MassUnits.Da.s}`, title:`${MassUnits.Da.n}`});
	
	const wpg = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.pg  = createUIElement({type:'span', parent:wpg, textContent:this.pg});
	createUIElement({type:'span', parent:wpg, textContent:` ${MassUnits.pg.s}`, title:`${MassUnits.pg.n}`});
	
	const wg = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.g = createUIElement({type:'span', parent:wg, textContent:this.g});
	createUIElement({type:'span', parent:wg, textContent:` ${MassUnits.g.s}`, title:`${MassUnits.g.n}`});

	const wTg = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.Tg = createUIElement({type:'span', parent:wTg, textContent:this.Tg});
	createUIElement({type:'span', parent:wTg, textContent:` ${MassUnits.Tg.s}`, title:`${MassUnits.Tg.n}`});

	const wYg = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.Yg = createUIElement({type:'span', parent:wYg, textContent:this.Yg});
	createUIElement({type:'span', parent:wYg, textContent:` ${MassUnits.Yg.s}`, title:`${MassUnits.Yg.n}`});
	
	const wMO = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.MO = createUIElement({type:'span', parent:wMO, textContent:this.MO});
	createUIElement({type:'span', parent:wMO, textContent:` ${MassUnits.MO.s}`, title:`${MassUnits.MO.n}`});
	
	this.content.w = w;
	this.content.wDa = wDa;
	this.content.wpg = wpg;
	this.content.wg = wg;
	this.content.wTg = wTg;
	this.content.wYg = wYg;
	this.content.wMO = wMO;
}
Amount.prototype.update = function(){
	this.convert();
	
	this.content.e?.classList.toggle('hide', !this.isZero());
	this.content.wDa?.classList.toggle('hide', !this.Da);
	this.content.wpg?.classList.toggle('hide', !this.pg);
	this.content.wg?.classList.toggle('hide', !this.g);
	this.content.wTg?.classList.toggle('hide', !this.Tg);
	this.content.wYg?.classList.toggle('hide', !this.Yg);
	this.content.wMO?.classList.toggle('hide', !this.MO);
	
	setElementText(this.content.Da, Math.floor(this.Da));
	setElementText(this.content.pg, Math.floor(this.pg));
	setElementText(this.content.g, Math.floor(this.g));
	setElementText(this.content.Tg, Math.floor(this.Tg));
	setElementText(this.content.Yg, Math.floor(this.Yg));
	setElementText(this.content.MO, Math.floor(this.MO));
}
Amount.prototype.isZero = function(){
	return !this.Da && !this.pg && !this.g && !this.Tg && !this.Yg && !this.MO;
}

Amount.prototype.convert = function(){
	while(this.Da > MassUnits.Da.c){ this.Da -= MassUnits.Da.c; this.pg++; }
	while(this.pg > MassUnits.pg.c){ this.pg -= MassUnits.pg.c; this.g++; }
	while(this.g > MassUnits.g.c){ this.g -= MassUnits.g.c; this.Tg++; }
	while(this.Tg > MassUnits.Tg.c){ this.Tg -= MassUnits.Tg.c; this.Yg++; }
	while(this.Eg > MassUnits.Yg.c){ this.Yg -= MassUnits.Yg.c; this.MO++; }
	
	while(this.Da < 0){ this.Da += MassUnits.Da.c; this.pg--; }
	while(this.pg < 0){ this.pg += MassUnits.pg.c; this.g--; }
	while(this.g < 0){ this.g += MassUnits.g.c; this.Tg--; }
	while(this.Tg < 0){ this.Tg += MassUnits.Tg.c; this.Yg--; }
	while(this.Yg < 0){ this.Yg += MassUnits.Yg.c; this.MO--; }
}
Amount.prototype.add = function(input){
	this.Da += input.Da;
	this.pg += input.pg;
	this.g += input.g;
	this.Tg += input.Tg;
	this.Yg += input.Yg;
	this.MO += input.MO;
	
	this.update();
	return this;
}
Amount.prototype.addMass = function(qty, unit){
	switch(unit){
		case MassUnits.Da.s:{
			this.Da += qty;
			break;
		}
		case MassUnits.pg.s:{
			this.pg += qty;
			break;
		}
		case MassUnits.g.s:{
			this.g += qty;
			break;
		}
		case MassUnits.Tg.s:{
			this.Tg += qty;
			break;
		}
		case MassUnits.Yg.s:{
			this.Yg += qty;
			break;
		}
		case MassUnits.MO.s:{
			this.MO += qty;
			break;
		}
	}
	this.update();
}
Amount.prototype.scale = function(input){
	this.Da = Math.floor(1000 * this.Da * input) / 1000;
	this.pg = this.pg * input;
	this.g = this.g * input;
	this.Tg = this.Tg * input;
	this.Yg = this.Yg * input;
	this.MO = this.MO * input;
	this.update();
	return this;
}
Amount.prototype.compare = function(input){
	input.convert();//standardize
	this.convert();//standardize
	return this.MO - input.MO || 
		this.Yg - input.Yg || 
		this.Tg - input.Tg || 
		this.g - input.g || 
		this.pg - input.pg || 
		this.Da - input.Da;	
}
Amount.prototype.magnitude = function(){
	if(this.MO){return MassUnits.MO.i;}
	if(this.Yg){return MassUnits.Yg.i;}
	if(this.Tg){return MassUnits.Tg.i;}
	if(this.g){return MassUnits.g.i;}
	if(this.pg){return MassUnits.pg.i;}
	if(this.Da){return MassUnits.Da.i;}
	return 0;
}