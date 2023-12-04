"use strict";

//reverse lookup maps
const ComponentMap = {};//Component Flavor Name -> Flavor[]
const ParentMap = {};
const AllFlavors = {};

const MassUnits = {
	Da:{s:'Da',n:'Dalton',c:602217364335000},
	ng:{s:'ng',n:'Nanogram',c:1000000000000},
	Kg:{s:'Kg',n:'Kilogram',c:1000000000000000},
	Eg:{s:'Eg',n:'Exagram',c:1378679941220000},
	MO:{s:'M☉',n:'Solar Mass',c:Infinity}
}

//flavors
const Q_Up = { n: 'Up', u: true, m: .22, s: MassUnits.Da, c: [] };
const Q_Down = { n: 'Down', u: true, m: .47, s: MassUnits.Da, c: [] };
const Electron = { n: 'Electron', u: true, m: .05, s: MassUnits.Da, c: [] };
const Proton = { n: 'Proton', u: false, m: .91, s: MassUnits.Da, c: [{ f: Q_Up, a: 2, b:null }, { f: Q_Down, a: 1, b:null }] };
const Neutron = { n: 'Neutron', u: false, m: 1.16, s: MassUnits.Da, c: [{ f: Q_Up, a: 1, b:null }, { f: Q_Down, a: 2, b:null }] };
const H_1 = { n: 'Protium', u: false, m: 1, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const H_2 = { n: 'Deuterium', u: false, m: 2, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const H_3 = { n: 'Tritium', u: false, m: 3, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Neutron, a: 2, b:null }, { f: Electron, a: 1, b:null }] };
const He_3 = { n: 'Helium3', u: false, m: 3, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 2, b:null }] };
const He_4 = { n: 'Helium4', u: false, m: 4, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 2, b:null }] };
const Li_6 = { n: 'Lithium6', u: false, m: 6, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 3, b:null }] };
const Li_7 = { n: 'Lithium7', u: false, m: 7, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 4, b:null }, { f: Electron, a: 3, b:null }] };
const Be_9 = { n: 'Beryllium9', u: false, m:9, s: MassUnits.Da, c: [{ f: Proton, a: 4, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 4, b:null }] };
const Be_10 = { n: 'Beryllium10', u: false, m:10, s: MassUnits.Da, c: [{ f: Proton, a: 4, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 4, b:null }] };
const B_10 = { n: 'Boron10', u: false, m:10, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 5, b:null }] };
const B_11 = { n: 'Boron11', u: false, m:11, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 5, b:null }] };
const C_12 = { n: 'Carbon12', u: false, m:12, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 6, b:null }] };
const C_13 = { n: 'Carbon13', u: false, m:13, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 6, b:null }] };
const C_14 = { n: 'Carbon14', u: false, m:14, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 6, b:null }] };
const N_14 = { n: 'Nitrogen14', u: false, m:14, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 7, b:null }] };
const N_15 = { n: 'Nitrogen15', u: false, m:15, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 7, b:null }] };
const O_16 = { n: 'Oxygen16', u: false, m:16, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 8, b:null }] };
const O_17 = { n: 'Oxygen17', u: false, m:17, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 9, b:null }, { f: Electron, a: 8, b:null }] };
const O_18 = { n: 'Oxygen18', u: false, m:18, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 8, b:null }] };


//items
const Quark = {
    n: 'Quark', u: true, t: 0,
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.'], 
    c: [Q_Up, Q_Down]
};
const Lepton = {
    n: 'Lepton', u: true, t: .6,
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.'],
    c: [Electron]
};
const Baryon = {
    n: 'Baryon', u: false, t: .8,
    info: ['Baryons are made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.'],
	c: [Proton, Neutron]
};
const H = {
    n: 'Hydrogen', u: false, t: 1,
    info: ['Hydrogen is the most common element in the universe, made with only a single proton. There are two stable isotopes and a third with a halflife of ~12 years. Hydrogen is highly flamable and lighter than air.'],
    c: [H_1, H_2, H_3]
};
const He = {
    n: 'Helium', u: false, t: 1,
    info: ['Helium has two stable isotopes. Helium-3 is much more rare than the normal Helium-4. Helium is lighter than air.'],
    c: [He_3, He_4]
};
const Li = {
    n: 'Lithium', u: false, t: 1,
    info: ['Lithium has two stable isotopes. Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.'],
    c: [Li_6, Li_7]
};
const Be = {
	n: 'Beryllium', u:false, t:1,
	info: ['Beryllium has only a single stable isotope (Be9). A second isotope with a long halflife of ~1.4 million years is used in surface exposure dating.'],
	c: [Be_9, Be_10]
}
const B = {
	n:'Boron', u:false, t:1,
	info: ['Boron has two stable isotopes and is required for healthy plants.'],
	c: [B_10, B_11]
}
const C = {
	n:'Carbon', u:false, t:1,
	info: ['Carbon has two stable isotopes (C12 & C13). Carbon14 is has a halflife of ~5700 years and is used to date dead organic matter.'],
	c: [C_12, C_13, C_14]
}
const N = {
	n:'Nitrogen', u:false, t:1,
	info: ['Nitroget has two stable isotopes. It is a very abundant element and is used in many industries.'],
	c: [N_14, N_15]
}
const O = {
	n:'Oxygen', u:false, t:1,
	info: ['Oxygen has three stable isotopes. It is '],
	c: []
}
const asdf = {
	n:'', u:false, t:1,
	info: [''],
	c: []
}

//element families
const AlkaliMetal = {
	n:'Alkali Metal', u:false,
	info: [''],
	c: [Li]
}
const AlkalineEarthMetal = {
	n:'Alkaline Earth Metal', u:false,
	info: [''],
	c: [Be]
}
const Chalcogen = {
	n:'Chalcogen', u:false,
	info:[''],
	c:[O]
}
const Metalloid = {
	n:'Metalloid', u:false,
	info: [''],
	c: [B]
}

const NobelGas = {
	n:'Nobel Gas', u:false,
	info: [''],
	c: [He]
}
const Nonmetal = {
	n:'Nonmetal', u:false,
	info: [''],
	c: [H, C, N]
}


//groups
const subatomic = {
    n: 'Subatomic', u: true,
	info: ['Subatomic components are the smallest items in this game.'], 
    c: [Quark, Lepton, Baryon]
};
const atomic = {
    n: 'Atomic', u: false,
    info: ['Atoms are basic UIElement that are the building blocks for every other molecule. They have a nucleus, which is made of Protons and Neutrons, and are `orbited` by Electrons.'],
    c: [AlkaliMetal, AlkalineEarthMetal, Chalcogen, Metalloid, NobelGas, Nonmetal]
};
const molecular = {
    n: 'Molecular', u: false,
    info: ['Molecules are groups of atoms. There are countless types of molecules, this game has some.'],
    c: []
};
const human = {
    n: 'Human', u: false,
    info: ['Humans are right in the middle.'],
    c: []
};
const planetary = {
    n: 'Planetary', u: false,
    info: ['Planetary objects are about the size of a planet. Earth is a Terrestrial planet but there are several types of Planetary Mass objects.'],
    c: []
};
const stellar = {
    n: 'Stellar', u: false,
    info: ['Stellar mass objects range from about one fifth the mass of our Sun to over 200 times the mass of our Sun.'],
    c: []
};
const blackHole = {
    n: 'Black Hole', u: false,
    info: ['Black Holes are so dense they trap light; the smallest type of black holes range from about five to fifty solar masses. Supermassive Black Holes can be tens of billions times the mass of our Sun.'],
    c: []	
}

const data = [
    subatomic,
    atomic,
	molecular,
	human,
	planetary,
	stellar,
	blackHole
];

const help = [
	{t:'Create', c:[
		'The Create tab lets you create items. This can be done either by manually clicking the Inventory (++) button or by upgrading the Generator.',
		'The Inventory (++) button will create one item from the components.',
		'The Generator will automatically create items based on the generator set-point. The maximum set-point is the generator level. It will only create items if you have the required components. Upgrading the generator uses the item it will generate.',
		'Generator rank will sacrifice generators to figure out how to build them cheaper and increase their effectiveness.', 
		'Most items have components that are needed to create the item. The requires components are listed in the Components section.',
		'The Used In section will show all items the selected item is a component of. By default this is hidden to avoid spoilers.',
	]},
	{t:'Discover', c:[
		'The Discover tab is the main way to gain access to new item types.',
		'You can add items to the matter mutator box and scan the items. If it has the items for a recipe that exists in the data file you will unlock the item.',
		'Unfortunately, the game data is not complete but will be expanded in the future.',
		'There is no penalty for scanning items that do not match a recipe.'
	]},
	{t:'Manage', c:[
		'The Manage tab is where you can manage your generators. It displays the input and output of each generator.'
	]},
	{t:'Settings', c:[
		'Settings can effect the difficulty and functionality of the game.',
		'Always Show Used-In: This will disable the spoiler warning message and show the Used In list by default.',
		'Show/Hide Info: This toggles the short info snippets sprinkled around in an attempt to educate and give tips.',
		'Save/Load: You can manually save and load your game here. This can allow you to switch devices or share saves. The game automatically saves every couple minutes.',
		'Hard Reset: This resets all progress and starts over from the beginning.',
		'Cheater Level: -1 is no effect, higher number is bigger cheats. Allows you to create some items without using components.'
	]},
	{t:'About', c:[
		'This is a crafting/discovery game.',
		'You initially start by crafting subatomic materials but can eventually create larger and larger items. Unfortunately the data file is missing several items that exist in the universe.',
		'Items are organized into Groups and have Flavors. For example Quarks are in the Subatomic group and have two flavors in this game "Up" and "Down".',
		'',
		'',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
		'',
		]},
]