const MAX_INVENTORY = 2**50;

function Amount({Da=0, pg=0, g=0, Tg=0, Yg=0, MO=0, GM=0, CM=0} = new Amount({})){
	this.Da = Da;
	this.pg = pg;
	this.g = g;
	this.Tg = Tg;
	this.Yg = Yg;
	this.MO = MO;
	this.GM = GM;
	this.CM = CM;
	
	this.content = {
		e:null,
		w:null,
		wDa:null,
		wpg:null,
		wg:null,
		wTg:null,
		wYg:null,
		wMO:null,
		wGM:null,
		wCM:null,
		Da:null,
		pg:null,
		g:null,
		Tg:null,
		Yg:null,
		MO:null,
		GM:null,
		CM:null
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
	
	const wGM = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.GM = createUIElement({type:'span', parent:wGM, textContent:this.GM});
	createUIElement({type:'span', parent:wGM, textContent:` ${MassUnits.GM.s}`, title:`${MassUnits.GM.n}`});
	
	const wCM = createUIElement({parent:w, cssClasses:['amountUnit']});
	this.content.CM = createUIElement({type:'span', parent:wCM, textContent:this.CM});
	createUIElement({type:'span', parent:wCM, textContent:` ${MassUnits.CM.s}`, title:`${MassUnits.CM.n}`});
	
	this.content.w = w;
	this.content.wDa = wDa;
	this.content.wpg = wpg;
	this.content.wg = wg;
	this.content.wTg = wTg;
	this.content.wYg = wYg;
	this.content.wMO = wMO;
	this.content.wGM = wGM;
	this.content.wCM = wCM;
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
	this.content.wGM?.classList.toggle('hide', !this.GM);
	this.content.wCM?.classList.toggle('hide', !this.CM);
	
	setElementText(this.content.Da, Math.floor(this.Da));
	setElementText(this.content.pg, Math.floor(this.pg));
	setElementText(this.content.g, Math.floor(this.g));
	setElementText(this.content.Tg, Math.floor(this.Tg));
	setElementText(this.content.Yg, Math.floor(this.Yg));
	setElementText(this.content.MO, Math.floor(this.MO));
	setElementText(this.content.GM, Math.floor(this.GM));
	setElementText(this.content.CM, Math.floor(this.CM));
}
Amount.prototype.isZero = function(){
	return !this.Da && !this.pg && !this.g && !this.Tg && !this.Yg && !this.MO && !this.GM && !this.CM;
}
Amount.prototype.compare = function(input){
	input.convert();//standardize
	this.convert();//standardize
	return this.CM - input.CM || 
		this.GM - input.GM || 
		this.MO - input.MO || 
		this.Yg - input.Yg || 
		this.Tg - input.Tg || 
		this.g - input.g || 
		this.pg - input.pg || 
		this.Da - input.Da;	
}
Amount.prototype.magnitude = function(){
	if(this.CM){return MassUnits.CM.i;}
	if(this.GM){return MassUnits.GM.i;}
	if(this.MO){return MassUnits.MO.i;}
	if(this.Yg){return MassUnits.Yg.i;}
	if(this.Tg){return MassUnits.Tg.i;}
	if(this.g){return MassUnits.g.i;}
	if(this.pg){return MassUnits.pg.i;}
	if(this.Da){return MassUnits.Da.i;}
	return 0;
}

Amount.prototype.convert = function(){
	while(this.Da > MassUnits.Da.c){ this.Da -= MassUnits.Da.c; this.pg++; }
	while(this.pg > MassUnits.pg.c){ this.pg -= MassUnits.pg.c; this.g++; }
	while(this.g > MassUnits.g.c){ this.g -= MassUnits.g.c; this.Tg++; }
	while(this.Tg > MassUnits.Tg.c){ this.Tg -= MassUnits.Tg.c; this.Yg++; }
	while(this.Yg > MassUnits.Yg.c){ this.Yg -= MassUnits.Yg.c; this.MO++; }
	while(this.MO > MassUnits.MO.c){ this.MO -= MassUnits.MO.c; this.GM++; }
	while(this.GM > MassUnits.GM.c){ this.GM -= MassUnits.GM.c; this.CM++; }
	
	while(this.Da < 0){ this.Da += MassUnits.Da.c; this.pg--; }
	while(this.pg < 0){ this.pg += MassUnits.pg.c; this.g--; }
	while(this.g < 0){ this.g += MassUnits.g.c; this.Tg--; }
	while(this.Tg < 0){ this.Tg += MassUnits.Tg.c; this.Yg--; }
	while(this.Yg < 0){ this.Yg += MassUnits.Yg.c; this.MO--; }
	while(this.MO < 0){ this.MO += MassUnits.MO.c; this.GM--; }
	while(this.GM < 0){ this.GM += MassUnits.GM.c; this.CM--; }
}

Amount.prototype.add = function(input){
	this.Da += input.Da;
	this.pg += input.pg;
	this.g += input.g;
	this.Tg += input.Tg;
	this.Yg += input.Yg;
	this.MO += input.MO;
	this.GM += input.GM;
	this.CM += input.CM;
	
	this.update();
	return this;
}
Amount.prototype.subtract = function(input){
	this.Da -= input.Da;
	this.pg -= input.pg;
	this.g -= input.g;
	this.Tg -= input.Tg;
	this.Yg -= input.Yg;
	this.MO -= input.MO;
	this.GM -= input.GM;
	this.CM -= input.CM;
	
	this.update();
	return this;
}
Amount.prototype.scale = function(input){
	this.Da = Math.floor(1000 * this.Da * input) / 1000;
	this.pg *= input;
	this.g *= input;
	this.Tg *= input;
	this.Yg *= input;
	this.MO *= input;
	this.GM *= input;
	this.CM *= input;
	
	this.update();
	return this;
}

Amount.prototype.estDivide = function(input){
	const out = new Amount();
	const a = this.magnitude();
	const b = input.magnitude();
	
	if(b>a){return 0;}
	if(a>b){
		switch(a){
			case 0:{ return MassUnits.Da.c * this.Da; }
			case 1:{ return MassUnits.pg.c * (input.Da ? (this.pg / input.Da) : this.pg); }
			case 2:{ return MassUnits.g.c * (input.pg ? (this.g / input.pg ) : this.g); }
			case 3:{ return MassUnits.Tg.c * (input.g ? (this.Tg / input.g ) : this.Tg); }
			case 4:{ return MassUnits.Yg.c * (input.Tg ? (this.Yg / input.Tg) : this.Yg); }
			case 5:{ return MassUnits.MO.c * (input.Yg ? (this.MO / input.Yg) : this.MO); }
			case 6:{ return MassUnits.GM.c * (input.MO ? (this.GM / input.MO) : this.GM); }
			case 7:{ return MassUnits.CM.c * (input.GM ? (this.CM / input.GM) : this.CM); }
		}
	}
	switch(a){
		case 0:{ return  input.Da ? (this.Da / input.Da) : this.Da; }
		case 1:{ return  input.pg ? (this.pg / input.pg) : this.pg; }
		case 2:{ return  input.g  ? (this.g  / input.g ) : this.g; }
		case 3:{ return  input.Tg ? (this.Tg / input.Tg) : this.Tg; }
		case 4:{ return  input.Yg ? (this.Yg / input.Yg) : this.Yg; }
		case 5:{ return  input.MO ? (this.MO / input.MO) : this.MO; }
		case 6:{ return  input.GM ? (this.GM / input.GM) : this.GM; }
		case 7:{ return  input.CM ? (this.CM / input.CM) : this.CM; }
	}
}