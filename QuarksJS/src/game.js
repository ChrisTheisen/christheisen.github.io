function GameClock(){
	//updates per save
	Object.defineProperty(this, 'saveRate', {value:60, writable: false});
	//in ms
	Object.defineProperty(this, 'tickRate', {value:100, writable: false});
	//in ms
	Object.defineProperty(this, 'updateRate', {value:1000, writable: false});
	//upper limit in ms on away time; 1 year.
	Object.defineProperty(this, 'maxGameClock', {value:31536000000, writable: false});
	
	this.lastSave = 0;//updates since last save
	this.duration = 0;//time since last update
	this.lastUpdate = 0;//time of last tick
	this.intervalID = 0;//loop intervalID
	this.tml = null;//total mass label dom element
	
	this.status = 'Loading Game Data';
	this.content = {p:null, s:null, t:null};
	
	this.render();
}
GameClock.prototype.tick = function(){
	const now = performance.now();

	this.duration += now-this.lastUpdate;
	this.duration = Math.min(this.duration, this.maxGameClock);
	this.lastUpdate = now;

	const p = this.duration / this.updateRate;
	this.content.p.style.width = `${Math.min(100 * p, 100)}%`;
	
	if(game.h){	game.intro(); }
	if(this.duration < this.updateRate){ return; }
	this.update(p);
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

GameClock.prototype.update = function(input = 1){
	this.content.s.classList.toggle('hide', !this.status);
	setElementText(this.content.s, this.status);
	
	const showTime = this.duration > (this.updateRate * 2);
	this.content.t.classList.toggle('hide', !showTime);
	if(showTime){ 
		setElementText(this.content.t, input.toFixed(1)); 
	}
	
	if(this.duration < this.updateRate){return;}
	game.enhancements.setPowers();
	
	input = Math.min(game.settings.s, input);
	while(--input > 0){
		this.duration -= this.updateRate;
		//do transmutes
		ActualUsed = {};
		ActualCreated = {};
		Demand = {};
		game.transmuters.forEach(x => {x.autoUpgrade(); x.transmute();});
	}
	this.toggleTabs();
	
	switch(game.menu.current){
		case 'M_0'://create
		case 'M_1':{//discover
			if(game.dContent.osl){
				const cu = canUpgradeObjectScanner();
				game.dContent.osl.classList.toggle('disabled', !cu);
			}
		}
		case 'M_2'://manage
		{
			if(game.settings.m.a){ 
				game.inventory.update(true);
			}
			break;
		}
		case 'M_3':
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
	
	const TM = Object.values(game.inventory.children).reduce((a,c) => a.add(c.totalMass()), new Amount());
	game.enhancements.totalTransmuted = TM;
	
	setElementText(this.tml, TM.toString());
}
GameClock.prototype.toggleTabs = function(){
	//show progress bar when a transmuter is over level 0.
	const showProgress = game.transmuters.some(x => x.l > 0);
	game.clock.content.p.classList.toggle('hide', !showProgress);
	
	//can discover when a transmuter is over level 1.
	const canDiscover = game.transmuters.some(x => x.l > 1);
	game.menu.children.M_1.b.classList.toggle('hide', !canDiscover);
	
	//can manage when a transmuter for an item with components is over level 1.
	const canManage = game.transmuters.some(x => x.l > 1 && x.i.length > 0);
	game.menu.children.M_2.b.classList.toggle('hide', !canManage);

	//can enhance when a transmuter for an item with components is over level 7.
	const canEnhance = game.transmuters.some(x => x.l > 7 && x.i.length > 0);
	game.menu.children.M_3.b.classList.toggle('hide', !canEnhance);

	//can story when a transmuter for an item with components is over level 3.
	const canStory = game.transmuters.some(x => x.l > 3 && x.i.length > 0);
	game.menu.children.M_7.b.classList.toggle('hide', !canStory);
}

function Game(){
	this.clock = new GameClock();
	this.enhancements = new Enhancements();
	this.inventory = new Inventory();
	this.transmuters = [];
	this.discoverHint = [];
	this.story = ['INIT'];
	this.dContent = {};
	this.menu = new Menu();
	this.h = true;
	this.dinterval = null;
	this.bx = 1;
	this.by = 1;
	this.osl = 0;//Object Scanner Level
	this.manageModalItem = null;
	this.settings = {
		content: {d:{},m:{},s:{n:{}}},
		c: false,//cheater mode
		h: true,//show helpful tips
		i: true,//show info
		u: true,//show used-in warning
		s: 100,//speed/max cycles to run on one update
		e: 4,//enhancement scaling (0-1024)
		d: { //discover filters
			l: 1,//stock limit
			o: false,//filter unowned
			s: null//filter search
		},
		m: {//manage filters
			a: false,//auto update
			c: false,//hide created === 0
			m: false,//hide created < demand
			l: false,//hide created < used
			n: false,//hide used === 0
			t: false,//hide used < demand
			u: false,//hide used < created
			x: false,//hide demand === 0
			y: false,//hide demand < created
			z: false,//hide demand < used
			so:true,//owned
			sd:true,//demand
			ss:true,//supply
			su:true,//used
		},
		n:{//number settings
			b: 10,//base
			s: 6//significant digits to display
		}
	};
	this.mm = [];
}
Game.prototype.intro = function(){
	const gic = this.inventory.children;
	if(gic['4'].a > 0 || gic['5'].a > 0 || gic['4'].l > 0 || gic['5'].l > 0){
		getUIElement('hint').classList.add('hide');
		Array.from(document.getElementsByClassName('hintAnimate')).forEach(x => x.classList.remove('hintAnimate'));
		this.h = false;
		return;
	}//far enough to no more hints

	const upg = game.transmuters.find(x => x.o.some(y => y.inv.f.s === 'u'));
	const downg = game.transmuters.find(x => x.o.some(y => y.inv.f.s === 'd'));
	const qglt = 2; //quark generator level threshold.

	const shouldCreate = (upg.l < qglt || downg.l < qglt);
	this.menu.children.M_0.b.classList.toggle('hintAnimate', shouldCreate && game.menu.current !== 'M_0');
	
	const hintZone = getUIElement('hint');
	hintZone.classList.toggle('hintAnimate', !(upg.l >= qglt && downg.l >= qglt || game.menu.current == 'M_0'));

	const shouldSubatomic = shouldCreate && this.menu.current === 'M_0';
	this.menu.children.M_0.children.M_a.b.classList.toggle('hintAnimate', shouldSubatomic && this.menu.children.M_0.current !== 'M_a');

	const shouldQuark = shouldSubatomic && this.menu.children.M_0.current === 'M_a';
	this.menu.children.M_0.children.M_a.children.m_0.b.classList.toggle('hintAnimate', shouldQuark && this.menu.children.M_0.children.M_a.current !== 'm_0' && (upg.l < qglt || downg.l < qglt));
	if(shouldCreate || shouldSubatomic || shouldQuark){ setElementText(hintZone, 'Click the rainbow elements to get started.'); }

	const shouldUp = shouldQuark && upg.l < qglt  && this.menu.children.M_0.children.M_a.current === 'm_0';
	this.menu.children.M_0.children.M_a.children.m_0.children['0'].b?.classList.toggle('hintAnimate', shouldUp && upg.l < qglt && this.menu.children.M_0.children.M_a.children.m_0.current !== '0');
	
	const shouldUpDo = shouldUp && this.menu.children.M_0.children.M_a.children.m_0.current === '0';
	const shouldUpCreate = shouldUpDo && !upg.canUpgrade();
	upg.content.b?.classList.toggle('hintAnimate', shouldUpCreate);
	if(shouldUpCreate){ setElementText(hintZone, 'Create some Up Quarks by manually running the transmuter with the (->) button.'); }
	
	const shouldUpTransmute = shouldUpDo && upg.canUpgrade();
	upg.content.u?.classList.toggle('hintAnimate', shouldUpTransmute);
	if(shouldUpTransmute){ setElementText(hintZone, 'Upgrade the Up Quark Transmuter with the (++) button.'); }

	const shouldDown = shouldQuark && upg.l >= qglt && downg.l < qglt;
	this.menu.children.M_0.children.M_a.children.m_0.children['1'].b.classList.toggle('hintAnimate', shouldDown && this.menu.children.M_0.children.M_a.children.m_0.current !== '1');
	if(shouldDown){ setElementText(hintZone, 'Go to Down Quark.'); }
	
	const shouldDownDo = shouldDown && this.menu.children.M_0.children.M_a.children.m_0.current === '1';
	const shouldDownCreate = shouldDownDo && !downg.canUpgrade();
	downg.content.b?.classList.toggle('hintAnimate', shouldDownCreate);
	if(shouldDownCreate){ setElementText(hintZone, 'Create some Down Quarks.'); }
	
	const shouldDownTransmute = shouldDownDo && downg.canUpgrade();
	downg.content.u?.classList.toggle('hintAnimate', shouldDownTransmute);
	if(shouldDownTransmute){ setElementText(hintZone, 'Upgrade the Down Quark Transmuter.'); }
	
	const shouldDiscover = (upg.l >= qglt && downg.l >= qglt && !gic['4'].isUnlocked() && !gic['5'].isUnlocked()) ||
		(gic['4'].isUnlocked() && game.menu.current !== 'M_1' && !gic['4'].isDisplayed());
	this.menu.children.M_1.b.classList.toggle('hintAnimate', shouldDiscover && this.menu.current !== 'M_1');
	if(shouldDiscover && this.menu.current !== 'M_1'){ setElementText(hintZone, 'Go to the Discover tab at the top of the screen.'); }
	
	const shouldAddUp = shouldDiscover && this.menu.current === 'M_1' && !this.mm.some(x => x.f.id === '0');
	gic['0'].content.d?.classList?.toggle('hintAnimate', shouldAddUp);
	if(shouldAddUp){ setElementText(hintZone, 'Add an Up Quark to the Object Scanner with the (+>) button.'); }

	const shouldAddDown = shouldDiscover && this.menu.current === 'M_1' && this.mm.some(x => x.f.id === '0') && !this.mm.some(x => x.f.id === '1');
	gic['1'].content.d?.classList.toggle('hintAnimate', shouldAddDown);
	if(shouldAddDown){ setElementText(hintZone, 'Add a Down Quark to the Object Scanner.'); }
	
	const shouldScan = shouldDiscover && this.menu.current === 'M_1' && this.mm.some(x => x.f.id === '0') && this.mm.some(x => x.f.id === '1') && !gic['4'].f.u;
	game.dContent.btnScan?.classList.toggle('hintAnimate', shouldScan);
	if(shouldScan){ setElementText(hintZone, 'Click the Scan button to find new items and recipes.'); }
	
	const shouldProton = gic['4'].isUnlocked();
	const shouldProtonGo =  shouldProton && this.menu.current === 'M_1';
	gic['4'].content.dg?.classList.toggle('hintAnimate', shouldProtonGo);
	if(shouldProtonGo){ setElementText(hintZone, 'Use the (») Goto Item button to jump to the Proton you just discovered.'); }
	
	if(shouldProton && game.inventory.children['4'].isDisplayed()){
		setElementText(hintZone, 'Create a Proton to complete the tutorial.');
		hintZone.classList.toggle('hintAnimate', true);
	}
	
}

function buildUI(){
	const root = getUIElement('nav');
	createUIElement({type:'h1', parent:root, textContent:'Quarks'});
	game.menu = new Menu(null, root, tabs);
}

function startGame(){

	getUIElement('gameWrapper').classList.remove('hide');
	game.clock.status = 'Loading Game Data';
	game.clock.update();
	game.transmuters = recipes.map(x => new Transmuter({id:x.id, i:x.i, o:x.o}));
	buildMaps(itemsMenu, null);
	Object.values(game.inventory.children).forEach(x => x.mapTransmuters());
	
	game.clock.status = 'Initializing UI';
	game.clock.update();
	buildUI();

	const max_item = Object.values(items).map(x => x.id).sort((a,b) => sortID(a,b,-1))[0];
	const max_gen = game.transmuters.map(x => x.id).sort((a,b) => sortID(a,b,-1))[0];
	setElementText(getUIElement('version'), `${max_item}.${max_gen}`);

	game.clock.status = 'Checking Game Data';
	//Item exists but no recipe
	Object.values(items).forEach(i => {
		if(!game.transmuters.some(x => x.o.some(o => o.inv.f.id === i.id)))
		{console.warn("MISSING TRANSMUTER: ", i.id, i.n);}
	});
	//No transmuter exists to output another input.
	game.transmuters.forEach(g => {
		g.i.forEach(i => {
			if(!game.transmuters.some(x => x.o.some(o => o.inv.f.id === i.inv.f.id)))
			{console.warn("MISSING INPUT: ", i.inv.f.id, i.inv.f.n);}
		})
	});
	//item exists but isn't in a menu
	Object.values(items).forEach(i => {
		if(!game.menu.containsChild(i.id))
		{console.warn("MISSING MENU: ", i.id, i.n);}
	});
	game.clock.status = 'Loading Save Data';
	game.clock.update();
	if(localStorage.getItem('Q')){
		load();
	}
	else{
		game.transmuters.filter(x => x.i.length === 0).forEach(x => x.o.forEach(y => y.inv.unlock()));
	}

	game.clock.tml = getUIElement('totalMass');
	
	game.clock.status = 'Starting Game';
	game.inventory.update();
	AllSortedFlavors = Object.values(AllFlavors).sort((a,b) => a.f.m.compare(b.f.m) || sortID(a.f.id,b.f.id));
	game.clock.update();
	game.clock.status = null;
	game.clock.update();
	window.addEventListener("beforeunload", saveBeforeUnload);
	game.clock.start();
	game.clock.toggleTabs();
	game.intro();
}

function startWelcome(){
	getUIElement('welcomeWrapper').classList.remove('hide');
}

function begin(){

	
	// Add animation class to trigger the effect
	const btn = getUIElement('btnWelcome')
	btn.classList.add('btnWelcome-animate');
	setTimeout(() => {
		setElementText(btn, '');
	}, 700);

	const ww = getUIElement('welcomeWrapper');
	ww.classList.add('welcomeWrapper-animate');

	getUIElement('welcomeText').classList.add('hide');
	
	// After animation completes, hide welcome and show game
	setTimeout(() => {
		getUIElement('gameWrapper').classList.remove('hide');
		startGame();
	}, 2000);

	setTimeout(() => {
		ww.classList.add('hide');
	}, 3000);

}

function init(){
	if (localStorage.getItem("Q") === null) {
		startWelcome();
	}
	else{
		startGame();
	}
}
const game = new Game();
init();
const history = [];
let historyIndex = 0;
//hotkeys
onkeydown = (e) => {
	if(e.code === 'Escape'){
		//clear focus
		document.activeElement.blur();
		return;
	}
	else if(e.code === 'KeyZ' && e.altKey && e.ctrlKey && e.shiftKey){
		doIDCheck();
	}
	if(document.activeElement?.nodeName.toLowerCase() === 'input'){return;}

	if(e.code === 'Space'){
		if(!game.clock.intervalID){
			game.clock.start();
		}
		else{
			game.clock.stop();
		}
	}

	switch(e.code){
		case 'ArrowUp':{
			game.menu.Up();
			break;
		}
		case 'ArrowDown':{
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
				case 'M_0':{
					const a = [...document.getElementsByClassName('genButton')];
					const b = a?.filter(x => !x.disabled) ?? [];
					b.forEach(x => x.click());
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][0]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad1':{
			switch(game.menu.current){
				case 'M_0':{
					const a = [...document.getElementsByClassName('genLevel')];
					const b = a?.filter(x => !x.disabled) ?? [];
					b.forEach(x => x.click());
					break;
				}
				case 'M_1':{
					toggleSetting('do');
					break;
				}
				case 'M_2':{
					toggleSetting('mc');
					break;
				}
				case 'M_3':{
					if(e.altKey){game.enhancements.gotoM();}
					else{game.enhancements.buyM();}
					break;
				}
				case 'M_8':{
					toggleSetting('h');
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][1]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad2':{
			switch(game.menu.current){
				case 'M_0':{
					const a = [...document.getElementsByClassName('flow')];
					const b = a?.filter(x => !x.disabled) ?? [];
					if(b.length>0){ 
						b[0].focus(); 
						b[0].select();
						}
					e.preventDefault();
					break;
				}
				case 'M_1':{
					//focus limit input
					break;
				}
				case 'M_2':{
					toggleSetting('mm');
					break;
				}
				case 'M_3':{
					if(e.altKey){game.enhancements.gotoG();}
					else{game.enhancements.buyG();}
					break;
				}
				case 'M_8':{
					toggleSetting('i');
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][2]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad3':{
			switch(game.menu.current){
				case 'M_1':{
					break;
				}
				case 'M_2':{
					toggleSetting('ml');
					break;
				}
				case 'M_3':{
					if(e.altKey){game.enhancements.gotoD();}
					else{game.enhancements.buyD();}
					break;
				}
				case 'M_8':{
					toggleSetting('u');
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][3]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad4':{
			switch(game.menu.current){
				case 'M_1':{
					//get hint
					break;
				}
				case 'M_2':{
					toggleSetting('mn');
					break;
				}
				case 'M_8':{
					toggleSetting('c');
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][4]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad5':{
			switch(game.menu.current){
				case 'M_2':{
					toggleSetting('mt');
					break;
				}
				case 'M_8':{
					save();
					game.menu.route();
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][5]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad6':{
			switch(game.menu.current){
				case 'M_2':{
					toggleSetting('mu');
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][6]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad7':{
			switch(game.menu.current){
				case 'M_2':{
					toggleSetting('mx');
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][7]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad8':{
			switch(game.menu.current){
				case 'M_2':{
					toggleSetting('my');
				}
				case 'M_8':{
					resetSettings();
					break;
				}
				case 'M_9':{
					[...document.getElementsByClassName('helpTopic')][8]?.click();
					break;
				}
			}
			break;
		}
		case 'Numpad9':{
			switch(game.menu.current){
				case 'M_2':{
					toggleSetting('mz');
				}
				case 'M_9':{
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
		default:{}
	}
};

