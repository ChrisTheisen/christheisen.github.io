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
	this.settings = {
		c: -1,//difficulty/infinite mode level
		i: true,//show info
		u: true,//show used-in warning
	};
	this.table = [];
}

window.onkeypress = function(e){
	switch(e.key){
		case '1':{
			game.menu.gotoRoot('Create');
			break;
		}
		case '2':{
			game.menu.gotoRoot('Discover');
			break;
		}
		case '3':{
			game.menu.gotoRoot('Manage');
			break;
		}
		case '4':{
			game.menu.gotoRoot('Settings');
			break;
		}
		case '5':{
			game.menu.gotoRoot('Help');
			break;
		}
		
		case 'q':{
			game.menu.gotoScale('Subatomic');
			break;
		}
		case 'w':{
			game.menu.gotoScale('Atomic');
			break;
		}
		case 'e':{
			game.menu.gotoScale('Molecular');
			break;
		}
		case 'r':{
			game.menu.gotoScale('Human');
			break;
		}
		case 't':{
			game.menu.gotoScale('Planetary');
			break;
		}
		case 'y':{
			game.menu.gotoScale('Stellar');
			break;
		}
		case 'u':{
			game.menu.gotoScale('Black Hole');
			break;
		}

		default:
			console.log(e.key);
			break;
	}
}

function buildUI(){
	const root = getUIElement('divRoot');
	createUIElement({type:'h1', parent:root, textContent:'Quarks'});
	
	const tabs = [
		{n:'Create', u:true, c:data, info:'This is where you will create. Click an item group to get started.'}, 
		{n:'Discover', u:false, info:'This is the main place for discovering new resources. Try adding different combinations of items to the Matter Mutator.'}, 
		{n:'Manage', u:false, info:'This is a central location to monitor item input and output.'}, 
		{n:'Settings', u:true, info:'Settings can effect game mechanics and page contents.'}, 
		{n:'Help', u:true, info:'This is an idle crafting game focusing on discovery. Click the circular ++ buttons to start creating.'}
	];
	game.menu = new Menu(root, tabs);
}

function init(){
	game.clock.status = 'Loading Game Data';
	game.clock.update();
	buildMaps();
	
	game.clock.status = 'Initializing UI';
	game.clock.update();
	buildUI();
	
	game.clock.status = 'Loading Save Data';
	game.clock.update();
	load();
	
	game.clock.status = 'Starting Game';
	game.inventory.update();
	game.clock.update();

	game.clock.status = null;
	game.clock.update();
	game.clock.start();
}
const game = new Game();
init();