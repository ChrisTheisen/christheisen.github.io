function GameClock(){
	//updates per save
	Object.defineProperty(this, 'saveRate', {value:60, writable: false});
	//in ms
	Object.defineProperty(this, 'tickRate', {value:100, writable: false});
	//in ms
	Object.defineProperty(this, 'updateRate', {value:1000, writable: false});
	//upper limit in ms on away time
	Object.defineProperty(this, 'maxGameClock', {value:10000, writable: false});
	
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
	
	if(game.h){	game.hint(); }
	if(this.duration < this.updateRate){ return; }
	this.update();
}
GameClock.prototype.stop = function(){
	clearInterval(this.intervalID);
	this.intervalID = null;
}
GameClock.prototype.start = function(){
	this.lastUpdate = performance.now();
	this.intervalID = setInterval(() => this.tick(), this.tickRate);
}

GameClock.prototype.render = function(){
	const wrapper = getUIElement('clockWrapper');
	this.content.p = createUIElement({parent:wrapper, cssClasses:['clockProgress']});
	this.content.s = createUIElement({parent:wrapper, cssClasses:['clockStatus']});
	this.content.t = createUIElement({parent:wrapper, cssClasses:['clockTime']});
}

GameClock.prototype.update = function(){
	this.content.s.classList.toggle('hide', !this.status);
	setElementText(this.content.s, this.status);
	this.content.t.classList.toggle('hide', this.duration < (this.updateRate * 2));
	setElementText(this.content.t, parseInt(this.duration));
	
	if(this.duration < this.updateRate){return;}
	this.duration -= this.updateRate;
	
	//do generates
	ActualUsed = {};
	ActualCreated = {};
	game.generators.forEach(x => {x.autoUpgrade(); x.generate();});
	
	this.toggleTabs();
	
	switch(game.menu.current){
		case 'Create':
		case 'Discover':
		case 'Manage':
		{
			game.inventory.update();
			break;
		}
		case 'Enhance':
		{
			game.enhancements.update();
			break;
		}
	}
	
	//sometimes save
	if(--this.lastSave<=0){
		save();
		this.lastSave = this.saveRate;
	}
}
GameClock.prototype.toggleTabs = function(){
	//show progress bar when a generator is over level 0.
	const showProgress = game.generators.some(x => x.l > 0);
	game.clock.content.p.classList.toggle('hide', !showProgress);
	
	//can discover when a generator is over level 3.
	const canDiscover = game.generators.some(x => x.l > 3);
	game.menu.children.Discover.b.classList.toggle('hide', !canDiscover);
	
	//can manage when a generator for an item with components is over level 1.
	const canManage = game.generators.some(x => x.l > 1 && x.i.length > 0);
	game.menu.children.Manage.b.classList.toggle('hide', !canManage);
	
	//can enhance when a generator for an item with components is over level 7.
	const canEnhance = game.generators.some(x => x.l > 7 && x.i.length > 0);
	game.menu.children.Enhance.b.classList.toggle('hide', !canEnhance);
}

function Game(){
	this.clock = new GameClock();
	this.enhancements = new Enhancements();
	this.inventory = new Inventory();
	this.generators = [];
	this.menu = new Menu();
	this.h = true;
	this.dinterval = null;
	this.bx = 1;
	this.by = 1;
	this.settings = {
		content: {d:{},m:{}},
		c: false,//cheater mode
		h: true,//show helpful tips
		i: true,//show info
		u: true,//show used-in warning
		d: { //discover filters
			l:0,//stock limit
			o: false,//filter unowned
			s: null//filter search
		},
		m: {//manage filters
			c: false,//hide created === 0
			m: false,//hide created < setpoint
			l: false,//hide created < used
			n: false,//hide used === 0
			t: false,//hide used < demand
			u: false //hide used < created
		}
	};
	this.table = [];
}
Game.prototype.hint = function(){
	const gic = this.inventory.children;
	if(gic.Proton.a > 0 || gic.Neutron.a > 0 || gic.Proton.l > 0 || gic.Neutron.l > 0){
		getUIElement('hint').classList.add('hide');
		this.h = false;
		return;
	}//far enough to no more hints

	const upg = game.generators.find(x => x.o.some(y => y.inv.f.s === 'u'));
	const downg = game.generators.find(x => x.o.some(y => y.inv.f.s === 'd'));

	const shouldCreate = (upg.l < 4 || downg.l < 4);
	this.menu.children.Create.b.classList.toggle('hintAnimate', shouldCreate && game.menu.current !== 'Create');
	
	const hintZone = getUIElement('hint');
	hintZone.classList.toggle('hintAnimate', !(upg.l >= 4 && downg.l >= 4 || game.menu.current == 'Create'));

	const shouldSubatomic = shouldCreate && this.menu.current === 'Create';
	this.menu.children.Create.children.Subatomic.b.classList.toggle('hintAnimate', shouldSubatomic && this.menu.children.Create.current !== 'Subatomic');

	const shouldQuark = shouldSubatomic && this.menu.children.Create.current === 'Subatomic';
	this.menu.children.Create.children.Subatomic.children.Quark.b.classList.toggle('hintAnimate', shouldQuark && this.menu.children.Create.children.Subatomic.current !== 'Quark' && (upg.l < 4 || downg.l < 4));

	const shouldUp = shouldQuark && upg.l < 4  && this.menu.children.Create.children.Subatomic.current === 'Quark';
	this.menu.children.Create.children.Subatomic.children.Quark.children['Up Quark'].b?.classList.toggle('hintAnimate', shouldUp && upg.l < 4 && this.menu.children.Create.children.Subatomic.children.Quark.current !== 'Up Quark');
	
	const shouldUpDo = shouldUp && this.menu.children.Create.children.Subatomic.children.Quark.current === 'Up Quark';
	const shouldUpCreate = shouldUpDo && !upg.canUpgrade();
	upg.content.b?.classList.toggle('hintAnimate', shouldUpCreate);
	if(shouldUpCreate){ setElementText(hintZone, 'Create some Up Quarks by manually running the generator with the (->) button.'); }
	
	const shouldUpGenerate = shouldUpDo && upg.canUpgrade();
	upg.content.u?.classList.toggle('hintAnimate', shouldUpGenerate);
	if(shouldUpGenerate){ setElementText(hintZone, 'Upgrade the Up Quark Generator with the (++) button.'); }

	const shouldDown = shouldQuark && upg.l > 3 && downg.l < 4;
	this.menu.children.Create.children.Subatomic.children.Quark.children['Down Quark'].b.classList.toggle('hintAnimate', shouldDown && this.menu.children.Create.children.Subatomic.children.Quark.current !== 'Down Quark');
	if(shouldDown){ setElementText(hintZone, 'Go to Down Quark.'); }
	
	const shouldDownDo = shouldDown && this.menu.children.Create.children.Subatomic.children.Quark.current === 'Down Quark';
	const shouldDownCreate = shouldDownDo && !downg.canUpgrade();
	downg.content.b?.classList.toggle('hintAnimate', shouldDownCreate);
	if(shouldDownCreate){ setElementText(hintZone, 'Create some Down Quarks.'); }
	
	const shouldDownGenerate = shouldDownDo && downg.canUpgrade();
	downg.content.u?.classList.toggle('hintAnimate', shouldDownGenerate);
	if(shouldDownGenerate){ setElementText(hintZone, 'Upgrade the Down Quark Generator.'); }
	
	const shouldDiscover = upg.l > 3 && downg.l > 3 && !gic.Proton.isUnlocked() && !gic.Neutron.isUnlocked();
	this.menu.children.Discover.b.classList.toggle('hintAnimate', shouldDiscover && this.menu.current !== 'Discover');
	if(shouldDiscover){ setElementText(hintZone, 'Go to the Discover tab at the top of the screen.'); }
	
	const shouldAddUp = shouldDiscover && this.menu.current === 'Discover' && !this.table.some(x => x.f.n === 'Up Quark');
	this.inventory.children['Up Quark'].content.d?.classList?.toggle('hintAnimate', shouldAddUp);
	if(shouldAddUp){ setElementText(hintZone, 'Add an Up Quark to the Matter Mutator with the (+>) button.'); }

	const shouldAddDown = shouldDiscover && this.menu.current === 'Discover' && this.table.some(x => x.f.n === 'Up Quark') && !this.table.some(x => x.f.n === 'Down Quark');
	this.inventory.children['Down Quark'].content.d?.classList.toggle('hintAnimate', shouldAddDown);
	if(shouldAddDown){ setElementText(hintZone, 'Add a Down Quark to the Matter Mutator.'); }
	
	const shouldScan = shouldDiscover && this.menu.current === 'Discover' && this.table.some(x => x.f.n === 'Up Quark') && this.table.some(x => x.f.n === 'Down Quark') && !game.inventory.children.Proton.f.u;
	getUIElement('btnScan')?.classList.toggle('hintAnimate', shouldScan);
	if(shouldScan){ setElementText(hintZone, 'Click the Scan button to find new items and recipes.'); }
	
	const shouldProton = game.inventory.children.Proton.f.u;
	const shouldProtonGo =  shouldProton && this.menu.children.Create.children.Subatomic.children.Baryon.current !== 'Proton';
	game.inventory.children.Proton.content.dg?.classList.toggle('hintAnimate', shouldProtonGo);
	if(shouldProtonGo){ setElementText(hintZone, 'Use the (») Goto Item button to jump to the Proton you just discovered.'); }
	
	if(shouldProton && this.menu.children.Create.children.Subatomic.children.Baryon.current === 'Proton'){
		setElementText(hintZone, 'Create a Proton to complete the tutorial.');
		hintZone.classList.toggle('hintAnimate', true);
	}
	
}

window.onkeydown = function(e){
	if(e.code === 'Space'){
		if(!game.clock.intervalID){
			game.clock.start();
		}
		else{
			game.clock.stop();
		}
	}
}

function buildUI(){
	const root = getUIElement('nav');
	createUIElement({type:'h1', parent:root, textContent:'Quarks'});
	game.menu = new Menu(null, root, tabs);
}

function init(){
	game.clock.status = 'Loading Game Data';
	game.clock.update();
	game.generators = recipes.map(x => new Generator({id:x.id, i:x.i, o:x.o}));
	buildMaps(items, null);
	Object.values(game.inventory.children).forEach(x => x.mapGenerators());
	
	game.clock.status = 'Initializing UI';
	game.clock.update();
	buildUI();
	
	game.clock.status = 'Loading Save Data';
	game.clock.update();
	if(localStorage.getItem('Q')){
		load();
	}
	else{
		const aaa = game.generators.filter(x => x.i.length === 0);
		const bbb = aaa.forEach(x => x.o.forEach(y => y.inv.unlock()));
	}
	
	game.clock.status = 'Starting Game';
	game.inventory.update();
	AllSortedFlavors = Object.values(AllFlavors).sort((a,b) => a.f.m.compare(b.f.m) || a.f.n.localeCompare(b.f.n));
	game.clock.update();

	game.clock.status = null;
	game.clock.update();
	window.addEventListener("beforeunload", saveBeforeUnload);
	game.clock.start();
	game.clock.toggleTabs();
	game.hint();
}
const game = new Game();
init();
const history = [];
let historyIndex = 0;
//hotkeys
onkeydown = (e) => {
	switch(e.code){
		case 'ArrowUp':{
			if(document.activeElement?.nodeName.toLowerCase() === 'input'){break;}
			game.menu.Up();
			break;
		}
		case 'ArrowDown':{
			if(document.activeElement?.nodeName.toLowerCase() === 'input'){break;}
			game.menu.Down();
			break;
		}
		case 'ArrowLeft':{
			if(document.activeElement?.nodeName.toLowerCase() === 'input'){break;}
			game.menu.Left();
			break;
		}
		case 'ArrowRight':{
			if(document.activeElement?.nodeName.toLowerCase() === 'input'){break;}
			game.menu.Right();
			break;
		}
		case 'Enter':
		case 'NumpadEnter': {
			if(game.menu.current === 'Discover'){
				game.settings.content.d.s.focus();
			}
			break;
		}
		case 'Numpad0':{
			switch(game.menu.current){
				case 'Create':{
					const a = [...document.getElementsByClassName('genButton')];
					const b = a?.filter(x => !x.disabled) ?? [];
					if(b.length>0){ b[0].click(); }
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][0]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad1':{
			switch(game.menu.current){
				case 'Discover':{
					toggleSetting('do');
					break;
				}
				case 'Manage':{
					toggleSetting('mc');
					break;
				}
				case 'Enhance':{
					console.log(e);
					if(e.altKey){game.enhancements.gotoG();}
					else{game.enhancements.buyG();}
					break;
				}
				case 'Settings':{
					toggleSetting('h');
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][1]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad2':{
			switch(game.menu.current){
				case 'Manage':{
					toggleSetting('mm');
					break;
				}
				case 'Enhance':{
					if(e.altKey){game.enhancements.gotoM();}
					else{game.enhancements.buyM();}
					break;
				}
				case 'Settings':{
					toggleSetting('i');
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][2]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad3':{
			switch(game.menu.current){
				case 'Manage':{
					toggleSetting('ml');
					break;
				}
				case 'Enhance':{
					if(e.altKey){game.enhancements.gotoD();}
					else{game.enhancements.buyD();}
					break;
				}
				case 'Settings':{
					toggleSetting('u');
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][3]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad4':{
			switch(game.menu.current){
				case 'Manage':{
					toggleSetting('mn');
					break;
				}
				case 'Enhance':{
					if(e.altKey){game.enhancements.gotoE();}
					else{game.enhancements.buyE();}
					break;
				}
				case 'Settings':{
					toggleSetting('c');
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][4]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad5':{
			switch(game.menu.current){
				case 'Manage':{
					toggleSetting('mt');
					break;
				}
				case 'Settings':{
					save();
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][5]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad6':{
			switch(game.menu.current){
				case 'Manage':{
					toggleSetting('mu');
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][6]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad7':{
			switch(game.menu.current){
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][7]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad8':{
			switch(game.menu.current){
				case 'Settings':{
					game.settings.content.s?.click();
					break;
				}
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][8]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad9':{
			switch(game.menu.current){
				case 'Help':{
					[...document.getElementsByClassName('helpTopic')][9]?.click();
					break;
				}
			}
			break;
		}
		case 'NumpadAdd':{
			const temp = Math.max(historyIndex-1,0);
			if(temp === historyIndex){return;}
			historyIndex = temp;
			game.menu.gotoNode(history[historyIndex], null, false);
			break;
		}
		case 'NumpadSubtract':{
			const temp = Math.min(historyIndex+1,history.length-1);
			if(temp === historyIndex){return;}
			historyIndex = temp;
			game.menu.gotoNode(history[historyIndex], null, false);
			break;
		}

		default:{
			//console.log(e);
		}
	}
	
};
