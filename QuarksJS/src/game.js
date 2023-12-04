function GameClock(){
	//updates per save
	Object.defineProperty(this, 'saveRate', {value:120, writable: false});
	//in ms
	Object.defineProperty(this, 'tickRate', {value:100, writable: false});
	//in ms
	Object.defineProperty(this, 'updateRate', {value:1000, writable: false});
	//upper limit in ms on away time
	Object.defineProperty(this, 'maxGameClock', {value:10000, writable: false});
	//upper limit on catch up cycles per tick
	Object.defineProperty(this, 'maxCycles', {value:100, writable: false});
	
	this.lastSave = 0;//updates since last save
	this.duration = 0;//time since last update
	this.lastUpdate = 0;//time of last tick
	this.intervalID = 0;//loop intervalID
	
	this.status = 'Loading Game Data';
	this.content = {p:null, s:null, t:null};
	
	this.render();
}
GameClock.prototype.tick = function(){
	const now = performance.now();

	this.duration += now-this.lastUpdate;
	this.duration = Math.min(this.duration, this.maxGameClock);
	this.lastUpdate = now;

	const p = Math.min(100 * this.duration / this.updateRate, 100);
	this.content.p.style.width = `${p}%`;
	
	let count = 0;
	while(this.duration > this.updateRate && count++ < this.maxCycles){
		this.update();
	}
	game.hint();
}
GameClock.prototype.stop = function(){
	clearInterval(this.intervalID);
}
GameClock.prototype.start = function(){
	this.lastUpdate = performance.now();
	this.intervalID = setInterval(() => this.tick(), this.tickRate);
}

GameClock.prototype.render = function(){
	const root = getUIElement('divRoot');
	const wrapper = createUIElement({parent:root, cssClasses:['clock-wrapper']});
	this.content.p = createUIElement({parent:wrapper, cssClasses:['clockProgress']});
	this.content.s = createUIElement({parent:wrapper, cssClasses:['clockStatus']});
	this.content.t = createUIElement({parent:wrapper, cssClasses:['clockTime']});
}

GameClock.prototype.update = function(){
	this.content.s.classList.toggle('hide', !this.status);
	setElementText(this.content.s, this.status);
	this.content.t.classList.toggle('hide', this.duration < (this.updateRate * this.maxCycles));
	setElementText(this.content.t, this.duration);
	
	if(this.duration < this.updateRate){return;}
	this.duration -= this.updateRate;
	
	//do generates
	Object.values(game.inventory.children).forEach(x => {
		x.generate();
	});
	
	//sometimes save
	if(--this.lastSave<=0){
		save();
		this.lastSave = this.saveRate;
	}
}


function Game(){
	this.clock = new GameClock();
	this.inventory = new Inventory();
	this.menu = new Menu();
	this.hinterval = null;
	this.bx = 1;
	this.by = 1;
	this.settings = {
		c: -1,//difficulty/infinite mode level
		i: true,//show info
		u: true,//show used-in warning
		d: { //discover filters
			o: false,//filter unowned
			s: null//filter search
		},
		m: {//manage filters
			d: 'a',//ddl value
			s: null//filter search
		}
	};
	this.table = [];
}
Game.prototype.hint = function(){
	const gic = this.inventory.children;
	if(gic.Proton.a > 0 || gic.Neutron.a > 0 || gic.Proton.l > 0 || gic.Neutron.l > 0){
		clearInterval(this.hinterval);
		getUIElement('hint').classList.add('hide');
		return;
	}//far enough to no more hints

	const shouldCreate = (gic.Up.l < 4 || gic.Down.l < 4) || 
		(gic.Up.l > 3 && gic.Down.l > 3 && gic.Proton.isUnlocked() && gic.Neutron.isUnlocked());
	this.menu.children.Create.b.classList.toggle('hint', shouldCreate && game.menu.current !== 'Create');
	
	const shouldSubatomic = shouldCreate && this.menu.current === 'Create';
	this.menu.children.Create.children.Subatomic.b.classList.toggle('hint', shouldSubatomic && this.menu.children.Create.current !== 'Subatomic');

	const shouldQuark = shouldSubatomic && this.menu.children.Create.current === 'Subatomic';
	this.menu.children.Create.children.Subatomic.children.Quark.b.classList.toggle('hint', shouldQuark && gic.Up.l < 4 && this.menu.children.Create.children.Subatomic.current !== 'Quark');

	const shouldUp = shouldQuark && this.menu.children.Create.children.Subatomic.current === 'Quark';
	this.menu.children.Create.children.Subatomic.children.Quark.children.Up.b.classList.toggle('hint', shouldUp && gic.Up.l < 4 && this.menu.children.Create.children.Subatomic.children.Quark.current !== 'Up');
	
	const shouldUpCreate = shouldUp && this.menu.children.Create.children.Subatomic.children.Quark.current === 'Up';
	this.inventory.children.Up.content.b.forEach(x => x.classList.toggle('hint', shouldUpCreate && gic.Up.a < 9));

	const shouldUpGenerate = shouldUpCreate && gic.Up.a > 0 && gic.Up.l < 4 && gic.Up.upgradeCost() <= gic.Up.a;
	this.inventory.children.Up.content.u.classList.toggle('hint', shouldUpGenerate);

	const shouldDown = shouldUp && gic.Up.l > 3;
	this.menu.children.Create.children.Subatomic.children.Quark.children.Down.b.classList.toggle('hint', shouldDown && this.menu.children.Create.children.Subatomic.children.Quark.current !== 'Down');
	
	const shouldDownCreate = shouldDown && this.menu.children.Create.children.Subatomic.children.Quark.current === 'Down';
	this.inventory.children.Down.content.b.forEach(x => x.classList.toggle('hint', shouldDownCreate &&  gic.Down.a < 9));
	
	const shouldDownGenerate = shouldDownCreate && gic.Down.a > 0 && gic.Down.l < 4 && gic.Down.upgradeCost() <= gic.Down.a;
	this.inventory.children.Down.content.u.classList.toggle('hint', shouldDownGenerate);
	
	const shouldDiscover = gic.Up.l > 3 && gic.Down.l > 3 && !gic.Proton.isUnlocked() && !gic.Neutron.isUnlocked();
	this.menu.children.Discover.b.classList.toggle('hint', shouldDiscover && this.menu.current !== 'Discover');
	
	const shouldAddUp = shouldDiscover && this.menu.current === 'Discover' && !this.table.some(x => x.f.n === 'Up');
	this.inventory.children.Up.content.d.classList.toggle('hint', shouldAddUp);

	const shouldAddDown = shouldDiscover && this.menu.current === 'Discover' && this.table.some(x => x.f.n === 'Up') && !this.table.some(x => x.f.n === 'Down');
	this.inventory.children.Down.content.d.classList.toggle('hint', shouldAddDown);
	
	const shouldScan = shouldDiscover && this.menu.current === 'Discover' && this.table.some(x => x.f.n === 'Up') && this.table.some(x => x.f.n === 'Down');
	getUIElement('btnScan')?.classList.toggle('hint', shouldScan);
	
	this.menu.children.Create.children.Subatomic.children.Baryon.b.classList.toggle('hint', shouldQuark && this.menu.children.Create.children.Subatomic.current !== 'Baryon');
	
	const shouldProton = shouldQuark && this.menu.children.Create.children.Subatomic.current === 'Baryon';
	this.menu.children.Create.children.Subatomic.children.Baryon.children.Proton.b.classList.toggle('hint', shouldProton && this.menu.children.Create.children.Subatomic.children.Baryon.current !== 'Proton');
	
	if(shouldProton && this.menu.children.Create.children.Subatomic.children.Baryon.current === 'Proton'){
		const hintZone = getUIElement('hint');
		setElementText(hintZone, 'Congratulations! Create a Proton to complete the tutorial and hide this obnoxious message.');
		
		if(!this.hinterval){
			this.hzw = hintZone.offsetWidth;
			this.hinterval = setInterval(() => {
				const x = parseInt(hintZone.style.left.replace('px','')) + this.bx;
				if(x < 0 || x > window.innerWidth - this.hzw - 5){this.bx*=-1;}
				const y = parseInt(hintZone.style.bottom.replace('px','')) + this.by;
				if(y < 0 || y > window.innerHeight - hintZone.offsetHeight - 10){this.by*=-1;}
				hintZone.style.left = x+'px';
				hintZone.style.bottom = y+'px';
			}, this.clock.tickRate/5);
		}
	}
	
}

window.onkeydown = function(e){
	const ids = ['discoverFilter', 'manageFilter']
	if(ids.includes(document.activeElement.id)){
		return;
	}
	
	switch(e.key){
		case 'q':{
			game.menu.gotoNode('Create');
			break;
		}
		case 'w':{
			game.menu.gotoNode('Discover');
			break;
		}
		case 'e':{
			game.menu.gotoNode('Manage');
			break;
		}
		case 'r':{
			game.menu.gotoNode('Settings');
			break;
		}
		case 't':{
			game.menu.gotoNode('Help');
			break;
		}
		
		case 'a':{
			game.menu.gotoNode('Subatomic');
			break;
		}
		case 's':{
			game.menu.gotoNode('Atomic');
			break;
		}
		case 'd':{
			game.menu.gotoNode('Molecular');
			break;
		}
		case 'f':{
			game.menu.gotoNode('Human');
			break;
		}
		case 'g':{
			game.menu.gotoNode('Planetary');
			break;
		}
		case 'h':{
			game.menu.gotoNode('Stellar');
			break;
		}
		case 'j':{
			game.menu.gotoNode('Black Hole');
			break;
		}

		default:
			//console.log(e.key);
			break;
	}
}

function buildUI(){
	const root = getUIElement('divRoot');
	createUIElement({type:'h1', parent:root, textContent:'Quarks'});
	
	const tabs = [
		{n:'Create', u:true, c:data, info:['Imagination is the beginning of creation.'], intro:'This is where you will create items. These "helpful tips" can be hidden from the Settings tab.'}, 
		{n:'Discover', u:false, info:['He who never made a mistake never made a discovery.'], intro:'This is the main place for discovering new resources. Click a (+>) button to add an item to the Matter Mutator. Click a (--) button to remove an item from the Matter Mutator. Try different combinations and click the "Scan" button.'}, 
		{n:'Manage', u:false, info:['If demand is greater than supply you have a deficit.'], intro:'This is a central location to monitor item supply and demand.'}, 
		{n:'Settings', u:true, info:['Settings can effect game mechanics and page contents.'], intro:'This is where you can change settings. Click the giant button just under this text to hide these unsightly, but essential for some, messages about how to use a website.'}, 
		{n:'Help', u:true, info:['This is an idle crafting game focusing on discovery.'], intro:'Click on a subject category below for more information.'}
	];
	game.menu = new Menu(root, tabs);
}

function init(){
	game.clock.status = 'Loading Game Data';
	game.clock.update();
	buildMaps(data, null);
	
	game.clock.status = 'Loading Save Data';
	game.clock.update();
	load();
	
	game.clock.status = 'Initializing UI';
	game.clock.update();
	buildUI();
	
	game.clock.status = 'Starting Game';
	game.inventory.update();
	game.clock.update();

	game.clock.status = null;
	game.clock.update();
	game.clock.start();
	game.hint();
}
const game = new Game();
init();