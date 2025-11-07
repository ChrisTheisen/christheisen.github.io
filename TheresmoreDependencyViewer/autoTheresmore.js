/*
  This file isn't actually used in making graphs.
  It is a script that will auto-play Theresmore.
  The goal is never to be completely hands off, but to remove some of the tedious and repetitive nature.
  It is quite rough around the edges and sometimes needs to be disabled due to negative income or some other getting stuck.
*/

//TODO: option to insult vs improve relationship

//TODO: select options on choices
//war_shrine
//Statue atamar
//focus_magic
//accept druid
//Desire for War
//Summon Nikharul
// colony?
//Restore the Kobu Crystal
//Gold Factory
//Zenix A?
//Zenix B?
//Light Shrine
//


//TODO: toggle other default/hardcoded skip buy buttons
//SKIPBUTTONTEXT.splice(SKIPBUTTONTEXT.indexOf('Light Turret'), 1)

//TODO: group units with caps

const chk = document.createElement('input');
chk.type = 'checkbox'
chk.id = 'shouldAuto';
chk.style.marginRight = '20px';
chk.checked = false;
document.getElementsByTagName('header').item(0).appendChild(chk);

const btn = document.createElement('button');
btn.id = 'autoBtn';
const btnText = '<[^_^]>';
btn.textContent = btnText;
btn.addEventListener("click", () => AUTO_MODAL.style.display = 'block', false);

document.getElementsByTagName('header').item(0).appendChild(btn);

//Text on tabs to ignore
const SKIPTABS = ['Spells', 'Completed', 'Spy', 'Garrison', 'Enemies'];
//classes of buttons to ignore (keeps the SKIPBUTTONTEXT smaller and ignores unafordable buttons)
const SKIPBUTTONCLASS = ['btn-off', 'btn-radial', 'btn-red', 'btn-cap'];
//List of button text to never buy (these are choices, boss fights, or other buttons to never auto-click)
const SKIPBUTTONTEXT = [' this spell', ' trade agreement', 'Difficulty', '+1', '+5', '-', 'Battle Reports',
      'Harvest Shrine', 'War Shrine', 'Mind Shrine',
      'Statue of Atamar', 'Statue of Firio', 'Statue of Luezia',
      'Infuse the Flame', 'Exhibit the Flame',
      'Persuade the nobility', 'Persuade the people',
      'Focus on Development path', 'Focus on Magic path', 'Focus on Research path',
      'Accept the Druid', 'Banish the Druid',
      'Beacon of Faith', 'Military Colony', 'Productive Hub',
      'Incremental power', 'Protection power',
      'Desire for Abundance', 'Desire for Magic', 'Desire for War',
      'Loot the Kobu storehouse', 'Restore the Kobu Crystal',
      'Gold Factory', 'Mana Factory',
      'Zenix Archmage', 'Zenix Funder',
      'Zenix Master', 'Zenix Trainer',
      'Light Shrine', 'Evil Shrine', 'Arcane Shrine',
      'Rebuild the Fortress', 'Summon Nikharul',
      'Obliterating Theresmore', 'Destroy the Annihilator',

      'Barbarian tribes', 'Pillars of mana', 'Library secret', 'Burned farms', 'Dark Castle', 'Soulstealer Citadel', 'Activate the Signal Machine',
      'Beacon of Light', 'Light Turret', 'Probe System',

      'Lucky Grove', 'Lucky Well', 'Eureka Halls', 'Fate Shrine', 'Amusement Quarter', 'Underground tunnel', 'Mercenary Camp', 'Artillery Officers',
      'Gathering Area', 'Arcane School', 'Abyss Outpost', 'Light Square', 'Guide of Mankind part', 'Lumix Refinery', 'Enhanced Barracks', 'Mana Battery', 'Angels Palace',

      'A moonlit night', 'Dragon assault', 'Mysterious robbery', 'Fallen Angel', 'The Orc Horde'
    ];
const ARMYBUY_DEFAULT = [{N:'Battle Angel', G:20}, {N:'Artillery', G:20}, {N:'Explorer', G:20},
    {N:'Ancient Balor', G:1}, {N:'Archmage', G:5}, {N:'Armored Caravan', G:50}, {N:'Avatar Of Fate', G:1}, {N:'Behemoth', G:20}, {N:'Commander', G:1},
    {N:'Cpt. Galliard', G:1}, {N:'Drone', G:5}, {N:'Elf warrior', G:25}, {N:'Familiar', G: 5}, {N:'General', G:1}, {N:'High Prelate', G:1}, {N:'Jager', G:100},
    {N:'Mage', G:50}, {N:'Mana Fortress', G:1}, {N:'Nikharul Soulstealer', G:1}, {N:'Ranger', G:50}, {N:'Seraphim', G:1}, {N:'Steel rider', G:100},
    {N:'Strategist', G:1}, {N:'Tamed Djinn', G:1}, {N:'Vaelgoroth Crimson Doom', G:1}];

function SAVE_OPTIONS(){
  const saveTime = {tabs:{}, misc: {}, army:{}};
  
  document.querySelectorAll('#AUTO_TABS_WRAPPER input').forEach(input => {
    const tab = input.previousSibling.textContent;
    saveTime.tabs[tab] = input.checked;
  });
  
  
  document.querySelectorAll('#AUTO_ARMY_INPUT_WRAPPER input').forEach(input => {
    const unit = input.nextSibling.textContent;
    saveTime.army[unit] = input.value
  });
  
  localStorage.setItem(`AUTO_OPTIONS`, JSON.stringify(saveTime));
}


function BUILD_AUTO_SKIP_SECTION(div, list, isRdo = true, isLast=false){
  if(!isLast){
    div.style.borderBottom = 'solid 1px #777755';
  }
  
  if(isRdo){
    const id = `${div.id}'_MANUAL'`;
    const label = Object.assign(document.createElement('label'), {textContent: 'Manual', htmlFor: id});
    Object.assign(label.style, {marginLeft: '15px', marginRight: '5px', lineHeight: '30px', whiteSpace: 'nowrap'});
    div.appendChild(label);
    div.appendChild(Object.assign(document.createElement('input'), {id: id, type: 'radio', checked:true}));
  }
  
  for(let item of list){
    const id = item.replaceAll(' ', '_').toUpperCase();
    const label = Object.assign(document.createElement('label'), {textContent: item, htmlFor: id});
    Object.assign(label.style, {marginLeft: '15px', marginRight: '5px', lineHeight: '30px', whiteSpace: 'nowrap'});
    div.appendChild(label);
    div.appendChild(Object.assign(document.createElement('input'), {id: id, type: isRdo?'radio':'checkbox'}));
  }
}

const AUTO_MODAL = document.createElement('div');
function BUILDMODAL() {
  const SAVED_AUTO_OPTIONS = JSON.parse(localStorage.getItem('AUTO_OPTIONS'));
  console.log('LOADING SAVED VALUES:', SAVED_AUTO_OPTIONS);
  
  AUTO_MODAL.style.display = 'none';
  AUTO_MODAL.style.width = '70vw';
  AUTO_MODAL.style.height = '75vh';
  AUTO_MODAL.style.position = 'fixed';
  AUTO_MODAL.style.top = '130px';
  AUTO_MODAL.style.left = '15%';
  AUTO_MODAL.style.background = '#555566CD';
  AUTO_MODAL.style.zIndex = '50';
  AUTO_MODAL.style.overflow = 'auto';
  document.body.appendChild(AUTO_MODAL);
  
  const CLOSE_AUTO_MODAL = document.createElement('button');
  CLOSE_AUTO_MODAL.textContent = 'X';
  CLOSE_AUTO_MODAL.addEventListener("click", () => {
    AUTO_MODAL.style.display = 'none';
    SAVE_OPTIONS();
  }, false);
  CLOSE_AUTO_MODAL.style.position = 'absolute';
  CLOSE_AUTO_MODAL.style.top = '10px';
  CLOSE_AUTO_MODAL.style.right = '10px';
  AUTO_MODAL.appendChild(CLOSE_AUTO_MODAL);
  
  const AUTO_TITLE_WRAPPER = document.createElement('div');
  AUTO_TITLE_WRAPPER.style.width = '40vw';
  AUTO_TITLE_WRAPPER.style.margin = 'auto';
  AUTO_MODAL.appendChild(AUTO_TITLE_WRAPPER);
  
  const AUTO_TITLE = document.createElement('div');
  AUTO_TITLE.style.margin = 'auto';
  AUTO_TITLE.style.fontFamily = 'CinzelDecorative';
  AUTO_TITLE.style.fontSize = '22pt';
  AUTO_TITLE.style.textAlign = 'center';
  AUTO_TITLE.textContent = 'AUTO THERESMORE OPTIONS';
  AUTO_TITLE_WRAPPER.appendChild(AUTO_TITLE);
  
  const AUTO_TABS_WRAPPER = document.createElement('div');
  AUTO_TABS_WRAPPER.id = 'AUTO_TABS_WRAPPER';
  AUTO_TABS_WRAPPER.style.border = 'solid 1px #777755';
  AUTO_TABS_WRAPPER.style.minHeight = '30px';
  AUTO_TABS_WRAPPER.style.width = 'calc(70vw - 20px)';
  AUTO_TABS_WRAPPER.style.margin = '40px 10px 10px 10px';
  AUTO_TABS_WRAPPER.style.borderRadius = '10px';
  AUTO_TABS_WRAPPER.style.display = 'flex';
  AUTO_TABS_WRAPPER.style.flexWrap = 'wrap'
  AUTO_TABS_WRAPPER.style.justifyContent = 'space-between';
  
  ['Build', 'Research', 'Population', 'Magic', 'Army', 'Diplomacy', 'Marketplace'].forEach(x => {
    const LBL = document.createElement('label');
    LBL.textContent = x;
    LBL.style.marginLeft = '10px';
    LBL.style.marginRight = '10px';
    LBL.style.lineHeight = '30px';
    LBL.style.whiteSpace = 'nowrap';
  
    
    const CHK = document.createElement('input');
    CHK.type = 'checkbox';
    CHK.style.lineHeight = '30px';
    CHK.style.marginLeft = '5px';
    CHK.style.verticalAlign = 'middle';
    CHK.checked = SAVED_AUTO_OPTIONS.tabs[x] ?? true;
    if(!CHK.checked){SKIPTABS.push(x);}
    CHK.addEventListener('change', () => {
      if(CHK.checked){
        const ID = SKIPTABS.indexOf(x);
        if(ID !== -1){SKIPTABS.splice(ID, 1);}
      }
      else{
        SKIPTABS.push(x);
      }
      console.log('UPDATE SKIPTABS:', SKIPTABS);
    }, false);
    
    LBL.appendChild(CHK);
    AUTO_TABS_WRAPPER.appendChild(LBL);
    
  });
  
  const SKIP_AUTO_WRAPPER = document.createElement('div');
  SKIP_AUTO_WRAPPER.style.border = 'solid 1px #777755';
  SKIP_AUTO_WRAPPER.style.minHeight = '30px';
  SKIP_AUTO_WRAPPER.style.width = 'calc(70vw - 20px)';
  SKIP_AUTO_WRAPPER.style.borderRadius = '10px';
  SKIP_AUTO_WRAPPER.style.margin = '10px';
  
  const DIV_AUTO_SHRINE = Object.assign(document.createElement('div'), {id: 'AUTO_FLAME'});
  const DIV_AUTO_STATUE = Object.assign(document.createElement('div'), {id: 'AUTO_STATUE'});
  const DIV_AUTO_PERSUADE = Object.assign(document.createElement('div'), {id: 'AUTO_PERSUADE'});
  const DIV_AUTO_FLAME = Object.assign(document.createElement('div'), {id: 'AUTO_FLAME'});
  const DIV_AUTO_FOCUS = Object.assign(document.createElement('div'), {id: 'AUTO_FOCUS'});
  const DIV_AUTO_POWER = Object.assign(document.createElement('div'), {id: 'AUTO_POWER'});
  const DIV_AUTO_DRUID = Object.assign(document.createElement('div'), {id: 'AUTO_DRUID'});
  const DIV_AUTO_DESIRE = Object.assign(document.createElement('div'), {id: 'AUTO_DESIRE'});
  const DIV_AUTO_NIKHARUL = Object.assign(document.createElement('div'), {id: 'AUTO_NIKHARUL'});
  const DIV_AUTO_COLONY = Object.assign(document.createElement('div'), {id: 'AUTO_COLONY'});
  const DIV_AUTO_KOBU = Object.assign(document.createElement('div'), {id: 'AUTO_KOBU'});
  const DIV_AUTO_FACTORY = Object.assign(document.createElement('div'), {id: 'AUTO_FACTORY'});
  const DIV_AUTO_ZENIXA = Object.assign(document.createElement('div'), {id: 'AUTO_ZENIXA'});
  const DIV_AUTO_ZENIXB = Object.assign(document.createElement('div'), {id: 'AUTO_ZENIXB'});
  const DIV_AUTO_ABYSS = Object.assign(document.createElement('div'), {id: 'AUTO_ABYSS'});
  const DIV_AUTO_ANNIHILATOR = Object.assign(document.createElement('div'), {id: 'AUTO_ANNIHILATOR'});
  
  const DIV_AUTO_ATTACKERS = Object.assign(document.createElement('div'), {id: 'AUTO_ATTACKERS'});
  const DIV_AUTO_LUCK = Object.assign(document.createElement('div'), {id: 'AUTO_LUCK'});
  const DIV_AUTO_LIGHT = Object.assign(document.createElement('div'), {id: 'AUTO_LIGHT'});
  
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_SHRINE, ['Harvest Shrine', 'War Shrine', 'Mind Shrine'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_STATUE, ['Statue of Atamar', 'Statue of Firio', 'Statue of Luezia'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_PERSUADE, ['Persuade the nobility', 'Persuade the people'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_FLAME, ['Infuse the Flame', 'Exhibit the Flame'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_FOCUS, ['Focus on Development path', 'Focus on Magic path', 'Focus on Research path'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_POWER, ['Incremental power', 'Protection power'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_DRUID, ['Accept the Druid', 'Banish the Druid'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_DESIRE, ['Desire for Abundance', 'Desire for Magic', 'Desire for War'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_NIKHARUL, ['Rebuild the Fortress', 'Summon Nikharul'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_COLONY, ['Beacon of Faith', 'Military Colony', 'Productive Hub'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_KOBU, ['Loot the Kobu storehouse', 'Restore the Kobu Crystal'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_FACTORY, ['Gold Factory', 'Mana Factory'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_ZENIXA, ['Zenix Archmage', 'Zenix Funder'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_ZENIXB, ['Zenix Master', 'Zenix Trainer'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_ABYSS, ['Light Shrine', 'Evil Shrine', 'Arcane Shrine'], true);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_ANNIHILATOR, ['Obliterating Theresmore', 'Destroy the Annihilator'], true);
  
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_ATTACKERS, ['Barbarian tribes', 'Pillars of mana', 'Library secret', 'Burned farms', 'Dark Castle', 'Soulstealer Citadel', 'Activate the Signal Machine'], false);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_LUCK, ['Lucky Grove', 'Lucky Well', 'Eureka Halls', 'Fate Shrine', 'Amusement Quarter', 'Underground tunnel', 'Mercenary Camp', 'Artillery Officers'], false);
  BUILD_AUTO_SKIP_SECTION(DIV_AUTO_LIGHT, ['Gathering Area', 'Arcane School', 'Abyss Outpost', 'Light Square', 'Guide of Mankind part', 'Lumix Refinery', 'Enhanced Barracks', 'Mana Battery', 'Angels Palace'], false, true);
  
  
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_SHRINE);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_STATUE);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_PERSUADE);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_FLAME);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_FOCUS);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_POWER);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_DRUID);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_DESIRE);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_NIKHARUL);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_COLONY);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_KOBU);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_FACTORY);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_ZENIXA);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_ZENIXB);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_ABYSS);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_ANNIHILATOR);
  
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_ATTACKERS);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_LUCK);
  SKIP_AUTO_WRAPPER.appendChild(DIV_AUTO_LIGHT);
  
  const MISC_AUTO_WRAPPER = document.createElement('div');
  MISC_AUTO_WRAPPER.style.border = 'solid 1px #777755';
  MISC_AUTO_WRAPPER.style.minHeight = '30px';
  MISC_AUTO_WRAPPER.style.width = 'calc(70vw - 20px)';
  MISC_AUTO_WRAPPER.style.borderRadius = '10px';
  MISC_AUTO_WRAPPER.style.margin = '10px';

  const CAST_ALL_SPELLS_BTN = Object.assign(document.createElement('button'), {
    textContent: 'Cast All Spells',
    style: 'border: solid 1px white; margin: 20px; padding: 10px; background: #222244; color: white; border-radius: 5px; cursor: pointer;',
    onclick: () => {
      Array.from(document.querySelectorAll('button'))
        .filter(btn => btn.textContent === 'Cast this spell')
        .forEach(btn => btn.click());
    }
  });
  
  MISC_AUTO_WRAPPER.appendChild(CAST_ALL_SPELLS_BTN);
  
  const DIV_AUTO_DIPLOMACY = document.createElement('div');
  MISC_AUTO_WRAPPER.appendChild(CAST_ALL_SPELLS_BTN);

  const armyUnits = ['Scout', 'Explorer', 'Familiar', 'Drone', 'Spy', 'Archer', 'Catapult', 'Crossbowman', 'Trebuchet', 'White Company', 'Strategist', 'Mage', 'Arquebusier', 'Bombard', 'Cannon', 'Artillery', 'Archmage', 'Ranger', 'Elf warrior', 'Marksman', 'Longbowman', 'Machine Gun', 'Spearman', 'Phalanx', 'Monk', 'Shieldbearer', 'Priest', 'Sacred Golem', 'Armored Caravan', 'Cleric', 'Juggernaut', 'Paladin', 'Behemoth', 'Ancient Balor', 'Smuggler', 'Mana Fortress', 'High Prelate', 'Warrior', 'Mercenary', 'Heavy warrior', 'Canava guard', 'Man at arms', 'Line infantry', 'Jager', 'Colonial Militia', 'Rifleman', 'Battle Angel', 'Commander', 'Tamed Djinn', 'General', 'Seraphim', 'Nikharul Soulstealer', 'Light Cavalry', 'Knight', 'Cataphract', 'Cuirassier', 'Steel rider', 'Cpt. Galliard', 'Avatar Of Fate', 'Vaelgoroth Crimson Doom'].sort((a,b) => a.localeCompare(b));
  const ARMY_INPUT_WRAPPER = document.createElement('div');
  ARMY_INPUT_WRAPPER.id = 'AUTO_ARMY_INPUT_WRAPPER';
  ARMY_INPUT_WRAPPER.style.border = 'solid 1px #777755';
  ARMY_INPUT_WRAPPER.style.minHeight = '200px';
  ARMY_INPUT_WRAPPER.style.margin = '10px';
  ARMY_INPUT_WRAPPER.style.borderRadius = '10px';
  ARMY_INPUT_WRAPPER.style.maxHeight = 'calc(75vh - 250px)';
  ARMY_INPUT_WRAPPER.style.width = 'calc(70vw - 20px)';
  ARMY_INPUT_WRAPPER.style.padding = '10px';
  ARMY_INPUT_WRAPPER.style.overflowY = 'auto';
  ARMY_INPUT_WRAPPER.style.display = 'grid';
  ARMY_INPUT_WRAPPER.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
  ARMY_INPUT_WRAPPER.style.gap = '10px';
  
  armyUnits.forEach(unit => {
    const unitContainer = document.createElement('div');
    unitContainer.style.display = 'flex';
    unitContainer.style.alignItems = 'center';
    unitContainer.style.marginBottom = '6px';
  
    const label = document.createElement('label');
    label.textContent = unit;
    label.style.flex = '1';
    label.style.color = 'white';
    label.style.marginLeft = '10px';
    
    const savedValue = SAVED_AUTO_OPTIONS.army[unit];
    const defaultValue = savedValue ?? ARMYBUY_DEFAULT.find(x => x.N === unit)?.G ?? savedValue;
  
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.value = defaultValue;
    input.style.width = '60px';
    input.style.padding = '2px 5px';
    input.style.borderRadius = '4px';
    input.style.border = '1px solid #ccc';
    input.style.color = '#000';
  
    unitContainer.appendChild(input);
    unitContainer.appendChild(label);
    ARMY_INPUT_WRAPPER.appendChild(unitContainer);
  });
  
  AUTO_MODAL.appendChild(AUTO_TABS_WRAPPER);
  AUTO_MODAL.appendChild(MISC_AUTO_WRAPPER);
  AUTO_MODAL.appendChild(ARMY_INPUT_WRAPPER);
  AUTO_MODAL.appendChild(SKIP_AUTO_WRAPPER);

}
BUILDMODAL();

async function CHANGETABS() {

  //Get the tab groups based on the role of the parent
  const TABSGROUPS = Array.from(document.querySelectorAll('[role="tablist"]'));
  //No buttons to click; cycle through tabs
  while(TABSGROUPS.length > 0){
    //check the lowest level of tabs first
    const TABS = Array.from(TABSGROUPS.pop().children);
    //no buttons; try switching tabs
    let nextTab = TABS.find(x => x.attributes.tabindex.value==='0').nextSibling;
    //skip any skipped tabs
    while(nextTab !== null && SKIPTABS.some(x => nextTab.textContent.startsWith(x))){nextTab = nextTab.nextSibling;}

    //if at the end
    if(nextTab === null){
        //back the start
        nextTab = TABS.find(x => x.attributes.tabindex.value==='0').parentNode.firstChild;
        //skip any skipped tabs
        while(nextTab !== null && SKIPTABS.some(x => nextTab.textContent.startsWith(x))){nextTab = nextTab.nextSibling;}
    }

    //activeate the tab!
    nextTab.click();
  }
}

function PARSERESOURCE(INPUT) {
  INPUT = INPUT.replace('/s', '');
  if(INPUT.endsWith('K')){
    return Number(INPUT.replaceAll(',', '').replace('K',''))*1000;
  }
  return Number(INPUT.replaceAll(',', ''));
}

function GETRESOURCES() {
  const RESOURCETABLE = document.querySelectorAll('table.min-w-full:not(.my-4)')[0].firstChild;

  const RESOURCEROWS = Array.from(RESOURCETABLE.childNodes);
  const RESOURCES = [];
  RESOURCEROWS.forEach(x => {
    const RVAL=Array.from(x.childNodes).map(x => x.textContent);
    const TEMP = RVAL[1].split(' / ');
    const HAVE = PARSERESOURCE(TEMP[0]);
    const MAX = PARSERESOURCE(TEMP[1]);
    const RATE = PARSERESOURCE(RVAL[2]);
    const TTF = (MAX-HAVE)/RATE;
    const MFT = MAX/RATE;
    RESOURCES.push({L:RVAL[0], HAVE:HAVE, MAX:MAX, RATE:RATE, TTF:TTF, MFT:MFT});
  });
  RESOURCES.sort((a,b) => b.TTF-a.TTF);
  //console.log("RESOURCES", RESOURCES);
  return RESOURCES;
}

function POPULATIONTAB(RESOURCES, AVAILABLEBTNS) {
  //If no deficit (usually from food) assign population from the end first
  //This seems to be good enough for now; possibly revisit to be more intelligent sometime
  if(!RESOURCES.some(x => x.RATE < 0)){
    AVAILABLEBTNS.reverse();
  }
  return AVAILABLEBTNS;
}

function PARSEENEMY(INPUT) {
  const TEMP = Array.from(INPUT.firstChild.children);
  const NAME = TEMP[0].textContent;
  const SKULLS = TEMP[1].children.length;
  
  return {N: NAME, S: SKULLS, B:INPUT};
}

function GETARMYBUY() {
  const OUTPUT = [];
  const unitContainers = document.getElementById('AUTO_ARMY_INPUT_WRAPPER').querySelectorAll('div');
  unitContainers.forEach(container => {
    const label = container.querySelector('label');
    const input = container.querySelector('input[type="number"]');
    
    const unitName = label.textContent.trim();
    const quantity = parseInt(input.value, 10);

    if (!isNaN(quantity) && quantity > 0) {
      OUTPUT.push({ N: unitName, G: quantity });
    }
  });
  
  return OUTPUT;
}

function DELAY(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ARMYARMY(AVAILABLEBTNS){
  //Select max buy amt
  const B10 = document.getElementsByClassName('btn rounded-l-none rounded-r-none')[0];
  const B1 = B10.previousSibling;
  const B100 = B10.nextSibling;
  const MIDBUYVALUE = 10;
  const BIGBUYVALUE = Number(B100.textContent.replace('+',''));//sometimes this changes

  //Find all unit buttons
  const ARMYBUY = GETARMYBUY();
  const ARMYBTNS = AVAILABLEBTNS.filter(x => ARMYBUY.some(y => x.textContent.startsWith(y.N)));
  //Lookup current unit amounts and filter deficits
  const UNITS = ARMYBTNS.map(x => {
      const U = ARMYBUY.find(y => x.textContent.startsWith(y.N));
    
      return {
        B: x,
        N: U.N,
        HAVE: Number(x.textContent.replace(U.N,'')),
        GOAL: U.G,
        NEED: U.G - Number(x.textContent.replace(U.N,''))
      }
    })
    .filter(x => x.HAVE < x.GOAL);
  
  if(UNITS.length === 0){
    CHANGETABS();
    return;
  }
  console.log('NEEDED UNITS', UNITS);

  //Try to buy some units
  for (const x of UNITS.sort((a, b) => a.NEED - b.NEED).slice(0,4)) {
    let AMT = 0;
    if(x.NEED < MIDBUYVALUE){ AMT=1; B1.click(); }
    else if(x.NEED < BIGBUYVALUE){ AMT=MIDBUYVALUE; B10.click(); }
    else{ AMT=BIGBUYVALUE; B100.click(); }

    console.log(`HIRE TRY ${x.N} x ${AMT}`);
    x.B.click();
    
    await DELAY(1250);
  }
}

function ARMYTAB(SUBTAB, AVAILABLEBTNS) {
  if(SUBTAB.startsWith('Army')){
    ARMYARMY(AVAILABLEBTNS);
  }
  else if(SUBTAB.startsWith('Explore')){
    const ADDALL = document.getElementsByClassName('top-0 right-0')[0]?.childNodes[0];
    if(ADDALL?.click){ ADDALL.click(); }

    const EXPLOREBTN = AVAILABLEBTNS?.find(x => x.textContent === 'Send to explore');
    if(EXPLOREBTN){ EXPLOREBTN.click(); }
    else { CHANGETABS(); }
  }
  else if(SUBTAB.startsWith('Attack')){
    //Add all units; no text just a svg.
    //TODO: remove all then add all
    const ADDALL = document.getElementsByClassName('top-0 right-0')[0]?.childNodes[0];
    if(ADDALL?.click){ ADDALL.click(); }

    const ATKBTN = Array.from(document.getElementsByClassName('w-full btn-red'))[0];
    //already attacking just go
    if(!ATKBTN){ CHANGETABS(); return; }
    
    //open modal
    const SELECTBTN = AVAILABLEBTNS?.find(x => x.textContent === 'Select an enemy to attack');
    if(SELECTBTN){ SELECTBTN.click(); }
    else{
      if(ATKBTN.disabled){ CHANGETABS(); return;}
      ATKBTN.click();
    }

    setTimeout(() => {
      const MODAL = document.getElementsByClassName('modal-container')[0];
      
      if(MODAL){
        const ENEMIES = Array.from(MODAL.getElementsByTagName('tr'))
              .map(x => PARSEENEMY(x))
              .sort((a,b) => a.S - b.S || a.N.localeCompare(b.N));
        if(ENEMIES.length){
          console.log(`Will Attack ${ENEMIES[0].N}`);
          ENEMIES[0].B.click();
        }
        //no enemies just move to go
        else { CHANGETABS(); }
      }
    }, 500);
  }
  else{
    console.warn('UNKNOWN ARMY', SUBTAB);
    CHANGETABS();//for now just go
  }
}

function PARSESHOP(INPUT) {
  return {
    N:INPUT.getElementsByTagName('h5')[0].textContent,
    B:Array.from(INPUT.getElementsByClassName('btn-green')).reverse()[0],
    S:Array.from(INPUT.getElementsByClassName('btn-red')).reverse()[0]
  };
}

function MARKETPLACETAB(RESOURCES) {
  //If gold is not full sell some horses
  const SHOPS = Array.from(document.getElementsByClassName('grid gap-3 min-w-full')[0].children).map(x => PARSESHOP(x));

  const GOLD = RESOURCES.find(x => x.L === 'Gold');
  //Missing gold?
  if(!GOLD){console.log('CANNAE FIND GOLD'); return;}
  
  const CANDO = RESOURCES.filter(x => SHOPS.some(y => y.N === x.L));

  if(GOLD.HAVE >= GOLD.MAX){
    /*BUY SOMETHING*/
    const CANBUY = CANDO.filter(x => x.HAVE < x.MAX);
    if(CANBUY.length){
      const BUYTHIS = CANBUY[0].L;
      if(!BUYTHIS){console.log('CANNAE BUY'); CHANGETABS(); return;}
      
      const TEMP = SHOPS.find(x => x.N === BUYTHIS).B;
      console.log(`BUY ${BUYTHIS} x`, TEMP.textContent);
      TEMP.click();
    }
  }
  else{
    /*SELL SOMETHING*/
    let SELLTHESE = CANDO.filter(x => x.HAVE >= x.MAX);
    for(let i=0;i<SELLTHESE.length;i++){
      const SELLTHIS = SELLTHESE[i].L;
      if(!SELLTHIS){console.log('CANNAE SELL'); SELLTHESE.length = 0;}
      const TEMP = SHOPS.find(x => x.N === SELLTHIS).S;
      console.log(`SELL ${SELLTHIS} x`, TEMP.textContent);
      TEMP.click();
    }
  }
  CHANGETABS();
}

function AUTOTIME(){
    //Get the available buttons based on the previous criteria;
    let AVAILABLEBTNS = Array.from(document.getElementsByClassName('btn'))
      .filter(x => !x.disabled && !SKIPBUTTONCLASS.some(y => x.className.includes(y)) && !SKIPBUTTONTEXT.some(y => x.textContent.includes(y)));
  
    const CURRENTTABS = Array.from(document.querySelectorAll('button[data-headlessui-state~="selected"]')).map(x => x.textContent);
    if(CURRENTTABS?.length < 1){ console.error('NO CURRENT TABS'); return; }
    //console.log('CURRENT_TABS:', CURRENTTABS);
    
    const RESOURCES = GETRESOURCES();
    if(CURRENTTABS[0].startsWith('Population')){
      AVAILABLEBTNS = POPULATIONTAB(RESOURCES, AVAILABLEBTNS);
    }
    if(CURRENTTABS[0].startsWith('Army')){
      ARMYTAB(CURRENTTABS[1], AVAILABLEBTNS);
      return;
    }
    if(CURRENTTABS[0].startsWith('Marketplace')) {
      MARKETPLACETAB(RESOURCES);
      return;
    }
    
    //Default; click the first available button or just go.
    if(AVAILABLEBTNS.length > 0) { AVAILABLEBTNS[0].click(); console.log("CLICKED:",AVAILABLEBTNS[0].textContent); }
    else{ CHANGETABS(); }
}

setInterval( () => {
  const CHK = document.getElementById('shouldAuto');
  if(CHK.checked){
    AUTOTIME()
  }
}, 5000);

