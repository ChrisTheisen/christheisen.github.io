function Amount({Da=0, ng=0, Kg=0, Eg=0, MO=0} = new Amount({})){
	this.Da = Da;
	this.ng = ng;
	this.Kg = Kg;
	this.Eg = Eg;
	this.MO = MO;
	
	this.content = {
		Da:null,
		ng:null,
		Kg:null,
		Eg:null,
		MO:null
	}
}
Amount.prototype.render = function(parent){
	
}
Amount.prototype.update = function(){

}
Amount.prototype.isZero = function(){
	return !this.Da || !this.ng || !this.Kg || !this.Eg>0 || !this.MO;
}

Amount.prototype.convert = function(){
	while(this.Da > MassUnits.Da.c){ this.Da -= MassUnits.Da.c; this.ng++; }
	while(this.ng > MassUnits.ng.c){ this.ng -= MassUnits.ng.c; this.Kg++; }
	while(this.Kg > MassUnits.Kg.c){ this.Kg -= MassUnits.Kg.c; this.Eg++; }
	while(this.Eg > MassUnits.Eg.c){ this.Eg -= MassUnits.Eg.c; this.MO++; }
	
	while(this.Da < 0){ this.Da += MassUnits.Da.c; this.ng--; }
	while(this.ng < 0){ this.ng += MassUnits.ng.c; this.Kg--; }
	while(this.Kg < 0){ this.Kg += MassUnits.Kg.c; this.Eg--; }
	while(this.Eg < 0){ this.Eg += MassUnits.Eg.c; this.MO--; }
}
Amount.prototype.add = function(input){
	this.Da += input.Da;
	this.ng += input.ng;
	this.Kg += input.Kg;
	this.Eg += input.Eg;
	this.MO += input.MO;
	
	this.convert();
}
Amount.prototype.addMass = function(qty, unit){
	switch(unit){//this could be more clever, but I'm feeling lazy.
		case MassUnits.Da.s:{
			this.Da += qty;
			break;
		}
		case MassUnits.ng.s:{
			this.ng += qty;
			break;
		}
		case MassUnits.Kg.s:{
			this.Kg += qty;
			break;
		}
		case MassUnits.Eg.s:{
			this.Eg += qty;
			break;
		}
		case MassUnits.MO.s:{
			this.MO += qty;
			break;
		}
	}
	this.convert();
}
Amount.prototype.scale = function(input){
	this.Da = this.Da * input;
	this.ng = this.ng * input;
	this.Kg = this.Kg * input;
	this.Eg = this.Eg * input;
	this.MO = this.MO * input;
	this.convert();
}
Amount.prototype.compare = function(input){
	input.convert();
	this.convert();
	return this.MO - input.MO || this.Eg - input.Eg || this.Kg - input.Kg || this.ng - input.kg || this.Da - input.Da;	
}
