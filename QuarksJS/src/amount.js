//yocto <- fairly close to Dalton (1yg ~.6Da)
//zepto
//atto
//femto
//pico <
//nano
//micro
//milli
//g <
//kilo
//mega
//giga
//tera <
//peta
//exa
//zetta
//yotta <
const MAX_INVENTORY = 2**50;

const MassUnits = {
	Da:{i: 0, s:'Da',n:'Dalton',		c:602217364335,		emb:1,emr:4},
	pg:{i: 1, s:'pg',n:'Picogram',		c:1000000000000,	emb:4,emr:16},
	g: {i: 2, s:'g', n:'Gram',			c:1000000000000,	emb:16,emr:64},
	Tg:{i: 3, s:'Tg',n:'Teragram',		c:1000000000000,	emb:64,emr:256},
	Yg:{i: 4, s:'Yg',n:'Yattogram',		c:1988000000,		emb:256,emr:1024},
	MO:{i: 5, s:'M☉',n:'Solar Mass',	c:1000000000000,	emb:1024,emr:4096},
	GM:{i: 6, s:'GM',n:'Galactic Mass',	c:1000000000000,	emb:4096,emr:16384},
	CM:{i: 7, s:'CM',n:'Cosmic Mass',	c:Number.MAX_VALUE,	emb:16384,emr:65536}
}

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
		s:null,//toString output element
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
	const cssW = ['amountWrapper'];
	const cssU = ['amountUnit'];
	
	const w = createUIElement({parent:parent, cssClasses:cssW});
	this.content.e = createUIElement({parent:w, textContent:'None', cssClasses:cssU});
	
	const wDa = createUIElement({parent:w, cssClasses:cssU});
	this.content.Da = createUIElement({type:'span', parent:wDa, textContent:formatNumberFromSettings(this.Da)});
	createUIElement({type:'span', parent:wDa, textContent:` ${MassUnits.Da.s}`, title:`${MassUnits.Da.n}`});
	
	const wpg = createUIElement({parent:w, cssClasses:cssU});
	this.content.pg = createUIElement({type:'span', parent:wpg, textContent:formatNumberFromSettings(this.pg)});
	createUIElement({type:'span', parent:wpg, textContent:` ${MassUnits.pg.s}`, title:`${MassUnits.pg.n}`});
	
	const wg = createUIElement({parent:w, cssClasses:cssU});
	this.content.g = createUIElement({type:'span', parent:wg, textContent:formatNumberFromSettings(this.g)});
	createUIElement({type:'span', parent:wg, textContent:` ${MassUnits.g.s}`, title:`${MassUnits.g.n}`});
	
	const wTg = createUIElement({parent:w, cssClasses:cssU});
	this.content.Tg = createUIElement({type:'span', parent:wTg, textContent:formatNumberFromSettings(this.Tg)});
	createUIElement({type:'span', parent:wTg, textContent:` ${MassUnits.Tg.s}`, title:`${MassUnits.Tg.n}`});
	
	const wYg = createUIElement({parent:w, cssClasses:cssU});
	this.content.Yg = createUIElement({type:'span', parent:wYg, textContent:formatNumberFromSettings(this.Yg)});
	createUIElement({type:'span', parent:wYg, textContent:` ${MassUnits.Yg.s}`, title:`${MassUnits.Yg.n}`});
	
	const wMO = createUIElement({parent:w, cssClasses:cssU});
	this.content.MO = createUIElement({type:'span', parent:wMO, textContent:formatNumberFromSettings(this.MO)});
	createUIElement({type:'span', parent:wMO, textContent:` ${MassUnits.MO.s}`, title:`${MassUnits.MO.n}`});
	
	const wGM = createUIElement({parent:w, cssClasses:cssU});
	this.content.GM = createUIElement({type:'span', parent:wGM, textContent:formatNumberFromSettings(this.GM)});
	createUIElement({type:'span', parent:wGM, textContent:` ${MassUnits.GM.s}`, title:`${MassUnits.GM.n}`});
	
	const wCM = createUIElement({parent:w, cssClasses:cssU});
	this.content.CM = createUIElement({type:'span', parent:wCM, textContent:formatNumberFromSettings(this.CM)});
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
	this.update();
}
Amount.prototype.toString = function(){
	let output = [];

	if(this.CM){output.push(`${formatNumberFromSettings(this.CM)} ${MassUnits.CM.s}`);}
	if(this.GM){output.push(`${formatNumberFromSettings(this.GM)} ${MassUnits.GM.s}`);}
	if(this.MO){output.push(`${formatNumberFromSettings(this.MO)} ${MassUnits.MO.s}`);}
	if(this.Yg){output.push(`${formatNumberFromSettings(this.Yg)} ${MassUnits.Yg.s}`);}
	if(this.Tg){output.push(`${formatNumberFromSettings(this.Tg)} ${MassUnits.Tg.s}`);}
	if(this.g){output.push(`${formatNumberFromSettings(this.g)} ${MassUnits.g.s}`);}
	if(this.pg){output.push(`${formatNumberFromSettings(this.pg)} ${MassUnits.pg.s}`);}
	if(this.Da){output.push(`${formatNumberFromSettings(this.Da)} ${MassUnits.Da.s}`);}

	if(output.length === 0){return '0 Da';}

	return output.join(' ');
}

Amount.prototype.update = function(){
	this.convert();
	
	if(this.content.w){
		this.content.e?.classList.toggle('hide', !this.isZero());
		this.content.wDa?.classList.toggle('hide', !this.Da);
		this.content.wpg?.classList.toggle('hide', !this.pg);
		this.content.wg?.classList.toggle('hide', !this.g);
		this.content.wTg?.classList.toggle('hide', !this.Tg);
		this.content.wYg?.classList.toggle('hide', !this.Yg);
		this.content.wMO?.classList.toggle('hide', !this.MO);
		this.content.wGM?.classList.toggle('hide', !this.GM);
		this.content.wCM?.classList.toggle('hide', !this.CM);

		//Amount.Da is special, gets 3 decimal point precision
		//Rest just do the formatNumber, shouldn't have a lot of . in any other amount.
		const rgx = /[\d\w,]*\.?[\d\w]{0,3}/.exec(formatNumberFromSettings(this.Da))[0];
		setElementText(this.content.Da, rgx);
		setElementText(this.content.pg, formatNumberFromSettings(this.pg));
		setElementText(this.content.g,  formatNumberFromSettings(this.g));
		setElementText(this.content.Tg, formatNumberFromSettings(this.Tg));
		setElementText(this.content.Yg, formatNumberFromSettings(this.Yg));
		setElementText(this.content.MO, formatNumberFromSettings(this.MO));
		setElementText(this.content.GM, formatNumberFromSettings(this.GM));
		setElementText(this.content.CM, formatNumberFromSettings(this.CM));
	}

	if(this.content.s){
		setElementText(this.content.s, this.toString());
	}
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
	if(this.CM){return MassUnits.CM;}
	if(this.GM){return MassUnits.GM;}
	if(this.MO){return MassUnits.MO;}
	if(this.Yg){return MassUnits.Yg;}
	if(this.Tg){return MassUnits.Tg;}
	if(this.g){return MassUnits.g;}
	if(this.pg){return MassUnits.pg;}
	return MassUnits.Da;
}
Amount.prototype.clone = function(){
	return new Amount({Da:this.Da,pg:this.pg,g:this.g,Tg:this.Tg,Yg:this.Yg,MO:this.MO,GM:this.GM,CM:this.CM});
}

Amount.prototype.convert = function(){
	//Convert fractional of units to lower amount and floor units larger than Da
	this.GM += (this.CM % 1) * MassUnits.GM.c
	this.CM = Math.floor(this.CM);
	this.MO += (this.GM % 1) * MassUnits.MO.c
	this.GM = Math.floor(this.GM);
	this.Yg += (this.MO % 1) * MassUnits.Yg.c
	this.MO = Math.floor(this.MO);
	this.Tg += (this.Yg % 1) * MassUnits.Tg.c
	this.Yg = Math.floor(this.Yg);
	this.g += (this.Tg % 1) * MassUnits.g.c
	this.Tg = Math.floor(this.Tg);
	this.pg += (this.g % 1) * MassUnits.pg.c
	this.g = Math.floor(this.g);
	this.Da += (this.pg % 1) * MassUnits.Da.c
	this.pg = Math.floor(this.pg);

	//If enough of a unit exists convert up.
	if(this.Da > MassUnits.Da.c){ this.pg += Math.floor(this.Da/MassUnits.Da.c); this.Da = this.Da%MassUnits.Da.c; }
	if(this.pg > MassUnits.pg.c){ this.g += Math.floor(this.pg/MassUnits.pg.c); this.pg = this.pg%MassUnits.pg.c; }
	if(this.g > MassUnits.g.c){ this.Tg += Math.floor(this.g/MassUnits.g.c); this.g = this.g%MassUnits.g.c; }
	if(this.Tg > MassUnits.Tg.c){ this.Yg += Math.floor(this.Tg/MassUnits.Tg.c); this.Tg = this.Tg%MassUnits.Tg.c; }
	if(this.Yg > MassUnits.Yg.c){ this.MO += Math.floor(this.Yg/MassUnits.Yg.c); this.Yg = this.Yg%MassUnits.Yg.c; }
	if(this.MO > MassUnits.MO.c){ this.GM += Math.floor(this.MO/MassUnits.MO.c); this.MO = this.MO%MassUnits.MO.c; }
	if(this.GM > MassUnits.GM.c){ this.CM += Math.floor(this.GM/MassUnits.GM.c); this.GM = this.GM%MassUnits.GM.c; }

	//If there is a negative in a unit convert down.
	if(this.Da < 0){ const temp = -Math.floor(this.Da/MassUnits.Da.c); this.pg -= temp; this.Da += temp * MassUnits.Da.c; }
	if(this.pg < 0){ const temp = -Math.floor(this.pg/MassUnits.pg.c); this.g -= temp; this.pg += temp * MassUnits.pg.c; }
	if(this.g < 0){ const temp = -Math.floor(this.g/MassUnits.g.c); this.Tg -= temp; this.g += temp * MassUnits.g.c; }
	if(this.Tg < 0){ const temp = -Math.floor(this.Tg/MassUnits.Tg.c); this.Yg -= temp; this.Tg += temp * MassUnits.Tg.c; }
	if(this.Yg < 0){ const temp = -Math.floor(this.Yg/MassUnits.Yg.c); this.MO -= temp; this.Yg += temp * MassUnits.Yg.c; }
	if(this.MO < 0){ const temp = -Math.floor(this.MO/MassUnits.MO.c); this.GM -= temp; this.MO += temp * MassUnits.MO.c; }
	if(this.GM < 0){ const temp = -Math.floor(this.GM/MassUnits.GM.c); this.CM -= temp; this.GM += temp * MassUnits.GM.c; }
}

Amount.prototype.add = function(input, update=true){
	this.Da += input.Da;
	this.pg += input.pg;
	this.g += input.g;
	this.Tg += input.Tg;
	this.Yg += input.Yg;
	this.MO += input.MO;
	this.GM += input.GM;
	this.CM += input.CM;
	
	if(!update){return this;}
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
Amount.prototype.scale = function(input, update=true){
	this.Da = Math.floor(1000 * this.Da * input) / 1000;
	this.pg *= input;
	this.g *= input;
	this.Tg *= input;
	this.Yg *= input;
	this.MO *= input;
	this.GM *= input;
	this.CM *= input;
	
	if(!update){return this;}
	this.update();
	return this;
}

Amount.prototype.estDivide = function(input){
	const out = new Amount();
	const a = this.magnitude().i;
	const b = input.magnitude().i;
	
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

Amount.prototype.isNegative = function(){
	if(this.CM < 0){return true;}
	if(this.CM > 0){return false;}

	if(this.GM < 0){return true;}
	if(this.GM > 0){return false;}

	if(this.MO < 0){return true;}
	if(this.MO > 0){return false;}

	if(this.Yg < 0){return true;}
	if(this.Yg > 0){return false;}

	if(this.Tg < 0){return true;}
	if(this.Tg > 0){return false;}

	if(this.g < 0){return true;}
	if(this.g > 0){return false;}

	if(this.pg < 0){return true;}
	if(this.pg > 0){return false;}

	if(this.Da < 0){return true;}
	return false;
}

Amount.prototype.toBigInt = function(){
	let output = BigInt(Math.floor(this.CM));
	
	output *= BigInt(MassUnits.GM.c);
	output += BigInt(Math.floor(this.GM));
	
	output *= BigInt(MassUnits.MO.c);
	output += BigInt(Math.floor(this.MO));
	
	output *= BigInt(MassUnits.Yg.c);
	output += BigInt(Math.floor(this.Yg));
	
	output *= BigInt(MassUnits.Tg.c);
	output += BigInt(Math.floor(this.Tg));
	
	output *= BigInt(MassUnits.g.c);
	output += BigInt(Math.floor(this.g));
	
	output *= BigInt(MassUnits.pg.c);
	output += BigInt(Math.floor(this.pg));
	
	output *= BigInt(MassUnits.Da.c);
	output += BigInt(Math.floor(this.Da));
	
	return output;
}
Amount.prototype.fromBigInt = function(input){
	this.Da = Number(input % BigInt(MassUnits.Da.c));
	input /= BigInt(MassUnits.Da.c);
	this.pg = Number(input % BigInt(MassUnits.pg.c));
	input /= BigInt(MassUnits.pg.c);
	this.g = Number(input % BigInt(MassUnits.g.c));
	input /= BigInt(MassUnits.g.c);
	this.Tg = Number(input % BigInt(MassUnits.Tg.c));
	input /= BigInt(MassUnits.Tg.c);
	this.Yg = Number(input % BigInt(MassUnits.Yg.c));
	input /= BigInt(MassUnits.Yg.c);
	this.MO = Number(input % BigInt(MassUnits.MO.c));
	input /= BigInt(MassUnits.MO.c);
	this.GM = Number(input % BigInt(MassUnits.GM.c));
	input /= BigInt(MassUnits.GM.c);
	this.CM = Number(input);
}
Amount.prototype.divide = function(input){
	const a = this.toBigInt();
	const b = input.toBigInt();
	return Number(a/b);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Amount, MassUnits };
}
