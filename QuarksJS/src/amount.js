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
	Da:{i: 0, s:'Da',n:'Dalton',		c:602217364335,		emb:1,emr:8},
	pg:{i: 1, s:'pg',n:'Picogram',		c:1000000000000,	emb:8,emr:16},
	g: {i: 2, s:'g', n:'Gram',			c:1000000000000,	emb:16,emr:32},
	Tg:{i: 3, s:'Tg',n:'Teragram',		c:1000000000000,	emb:48,emr:64},
	Yg:{i: 4, s:'Yg',n:'Yattogram',		c:1988000000,		emb:144,emr:128},
	MO:{i: 5, s:'M☉',n:'Solar Mass',	c:1000000000000,	emb:432,emr:256},
	GM:{i: 6, s:'GM',n:'Galactic Mass',	c:1000000000000,	emb:1296,emr:512},
	CM:{i: 7, s:'CM',n:'Cosmic Mass',	c:Number.MAX_VALUE,	emb:3888,emr:1024}
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
Amount.prototype.render = function(parent, isInline = false){
	const cssW = isInline ? ['amountWrapper', 'cell', 'amountInlineWrapper'] : ['amountWrapper'];
	const cssU = isInline ? ['amountUnit', 'amountInline'] : ['amountUnit'];
	
	const w = createUIElement({parent:parent, cssClasses:cssW});
	this.content.e = createUIElement({parent:w, textContent:'None', cssClasses:cssU});
	
	const wDa = createUIElement({parent:w, cssClasses:cssU});
	this.content.Da = createUIElement({type:'span', parent:wDa, textContent:this.Da});
	createUIElement({type:'span', parent:wDa, textContent:` ${MassUnits.Da.s}`, title:`${MassUnits.Da.n}`});
	
	const wpg = createUIElement({parent:w, cssClasses:cssU});
	this.content.pg = createUIElement({type:'span', parent:wpg, textContent:this.pg});
	createUIElement({type:'span', parent:wpg, textContent:` ${MassUnits.pg.s}`, title:`${MassUnits.pg.n}`});
	
	const wg = createUIElement({parent:w, cssClasses:cssU});
	this.content.g = createUIElement({type:'span', parent:wg, textContent:this.g});
	createUIElement({type:'span', parent:wg, textContent:` ${MassUnits.g.s}`, title:`${MassUnits.g.n}`});
	
	const wTg = createUIElement({parent:w, cssClasses:cssU});
	this.content.Tg = createUIElement({type:'span', parent:wTg, textContent:this.Tg});
	createUIElement({type:'span', parent:wTg, textContent:` ${MassUnits.Tg.s}`, title:`${MassUnits.Tg.n}`});
	
	const wYg = createUIElement({parent:w, cssClasses:cssU});
	this.content.Yg = createUIElement({type:'span', parent:wYg, textContent:this.Yg});
	createUIElement({type:'span', parent:wYg, textContent:` ${MassUnits.Yg.s}`, title:`${MassUnits.Yg.n}`});
	
	const wMO = createUIElement({parent:w, cssClasses:cssU});
	this.content.MO = createUIElement({type:'span', parent:wMO, textContent:this.MO});
	createUIElement({type:'span', parent:wMO, textContent:` ${MassUnits.MO.s}`, title:`${MassUnits.MO.n}`});
	
	const wGM = createUIElement({parent:w, cssClasses:cssU});
	this.content.GM = createUIElement({type:'span', parent:wGM, textContent:this.GM});
	createUIElement({type:'span', parent:wGM, textContent:` ${MassUnits.GM.s}`, title:`${MassUnits.GM.n}`});
	
	const wCM = createUIElement({parent:w, cssClasses:cssU});
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
	this.update();
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
	
	setElementText(this.content.Da, this.Da.toLocaleString(undefined, {minimumFractionDigits:3, maximumFractionDigits:3}));
	setElementText(this.content.pg, Math.floor(this.pg).toLocaleString());
	setElementText(this.content.g, Math.floor(this.g).toLocaleString());
	setElementText(this.content.Tg, Math.floor(this.Tg).toLocaleString());
	setElementText(this.content.Yg, Math.floor(this.Yg).toLocaleString());
	setElementText(this.content.MO, Math.floor(this.MO).toLocaleString());
	setElementText(this.content.GM, Math.floor(this.GM).toLocaleString());
	setElementText(this.content.CM, Math.floor(this.CM).toLocaleString());
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
	//TODO: cleanup to not use this[unit.s] as this is not the correct way to access the properties
	const units = Object.entries(MassUnits).map(u => ({key:u[0], value:u[1]}));

	// Convert fractional parts down
	for (let i = 1; i < units.length - 1; i++) {
		const smaller = Object.values(units).find(u => u.value.i === i);
		const larger = Object.values(units).find(u => u.value.i === i + 1);
		const fractional = this[smaller.key] % 1;
		this[larger.key] += fractional * smaller.value.c;
		this[smaller.key] = Math.floor(this[smaller.key]);
	}
	this.pg = Math.floor(this.pg);

	// Convert up when exceeding unit capacity (in reverse order)
	for (let i = units.length - 2; i >= 0; i--) {
		const smaller = Object.values(units).find(u => u.value.i === i);
		const larger = Object.values(units).find(u => u.value.i === i + 1);
		if (this[smaller.key] > smaller.value.c) {
			const carry = Math.floor(this[smaller.key] / smaller.value.c);
			this[larger.key] += carry;
			this[smaller.key] %= smaller.value.c;
		}
	}

	//TODO: handle negative values
	if(this.toBigInt() < 0){
		console.warn('Negative amount', this);
		return;
	}

	for (let i = 0; i < units.length - 1; i++) {
		const smaller = Object.values(units).find(u => u.value.i === i);
		const larger = Object.values(units).find(u => u.value.i === i + 1);
		while(this[smaller.key] < 0) {
			this[larger.key]--;
			this[smaller.key] += smaller.value.c;
		}
	}
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

Amount.prototype.toBigInt = function(input){
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
	const result = a/b;
	this.fromBigInt(result);
	return this;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Amount, MassUnits };
}