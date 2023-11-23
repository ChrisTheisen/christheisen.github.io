"use strict";

//reverse lookup maps
const FlavorMap = {};//Flavor Name -> Item
const ItemMap = {};//Item Name => Item Group
const ComponentMap = {};//Component Flavor Name -> Flavor[]
const UsageMap = {};

const MassUnits = {
	Da:{s:'Da',n:'Dalton',c:602217364335000},
	ng:{s:'ng',n:'Nanogram',c:1000000000000},
	Kg:{s:'Kg',n:'Kilogram',c:1000000000000000},
	Eg:{s:'Eg',n:'Exagram',c:1378679941220000},
	MO:{s:'M☉',n:'Solar Mass',c:Infinity}
}

//flavors
const saQ_Up = { n: 'Up', m: .22, u: MassUnits.Da, c: [] };
const saQ_Down = { n: 'Down', m: .47, u: MassUnits.Da, c: [] };
const saL_Electron = { n: 'Electron', m: .05, u: MassUnits.Da, c: [] };
const saB_Proton = { n: 'Proton', m: 1, u: MassUnits.Da, c: [{ f: saQ_Up, a: 2 }, { f: saQ_Down, a: 1 }] };
const saB_Neutron = { n: 'Neutron', m: 1, u: MassUnits.Da, c: [{ f: saQ_Up, a: 1 }, { f: saQ_Down, a: 2 }] };
const aH_Protium = { n: 'Protium', m: 1, u: MassUnits.Da, c: [{ f: saB_Proton, a: 1 }, { f: saL_Electron, a: 1 }] };
const aH_Deuterium = { n: 'Deuterium', m: 2, u: MassUnits.Da, c: [{ f: saB_Proton, a: 1 }, { f: saB_Neutron, a: 1 }, { f: saL_Electron, a: 1 }] };
const aH_Tritium = { n: 'Tritium', m: 3, u: MassUnits.Da, c: [{ f: saB_Proton, a: 1 }, { f: saB_Neutron, a: 2 }, { f: saL_Electron, a: 1 }] };
const aHe_3 = { n: 'Helium3', m: 3, u: MassUnits.Da, c: [{ f: saB_Proton, a: 2 }, { f: saB_Neutron, a: 1 }, { f: saL_Electron, a: 2 }] };
const aHe_4 = { n: 'Helium4', m: 4, u: MassUnits.Da, c: [{ f: saB_Proton, a: 2 }, { f: saB_Neutron, a: 3 }, { f: saL_Electron, a: 2 }] };
const aLi_6 = { n: 'Lithium6', m: 6, u: MassUnits.Da, c: [{ f: saB_Proton, a: 3 }, { f: saB_Neutron, a: 3 }, { f: saL_Electron, a: 3 }] };
const aLi_7 = { n: 'Lithium7', m: 7, u: MassUnits.Da, c: [{ f: saB_Proton, a: 3 }, { f: saB_Neutron, a: 4 }, { f: saL_Electron, a: 3 }] };
const aBe_9 = { n: 'Beryllium9', m:9, u: MassUnits.Da, c: [{ f: saB_Proton, a: 4 }, { f: saB_Neutron, a: 5 }, { f: saL_Electron, a: 4 }] };
const aBe_10 = { n: 'Beryllium10', m:10, u: MassUnits.Da, c: [{ f: saB_Proton, a: 4 }, { f: saB_Neutron, a: 6 }, { f: saL_Electron, a: 4 }] };
const aB_10 = { n: 'Boron10', m:10, u: MassUnits.Da, c: [{ f: saB_Proton, a: 5 }, { f: saB_Neutron, a: 5 }, { f: saL_Electron, a: 5 }] };
const aB_11 = { n: 'Boron11', m:11, u: MassUnits.Da, c: [{ f: saB_Proton, a: 5 }, { f: saB_Neutron, a: 6 }, { f: saL_Electron, a: 5 }] };
const aC_12 = { n: 'Carbon12', m:12, u: MassUnits.Da, c: [{ f: saB_Proton, a: 6 }, { f: saB_Neutron, a: 6 }, { f: saL_Electron, a: 6 }] };
const aC_13 = { n: 'Carbon13', m:13, u: MassUnits.Da, c: [{ f: saB_Proton, a: 6 }, { f: saB_Neutron, a: 7 }, { f: saL_Electron, a: 6 }] };
const aC_14 = { n: 'Carbon14', m:14, u: MassUnits.Da, c: [{ f: saB_Proton, a: 6 }, { f: saB_Neutron, a: 8 }, { f: saL_Electron, a: 6 }] };


//items
const sa_Quark = {
    n: 'Quark', u: true, t: 0,
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.'], 
	intro:'Select an option below and click the (++) button in the Inventory section to create your first item. Then click the (++) button in the Generator section to upgrade the Generator.',
    c: [saQ_Up, saQ_Down]
};
const sa_Lepton = {
    n: 'Lepton', u: true, t: .6,
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.'],
	intro:'Select Electron below and click the (++) button in the Inventory section to create your first item. Then click the (++) button in the Generator section to upgrade the Generator.',
    c: [saL_Electron]
};
const sa_Baryon = {
    n: 'Baryon', u: false, t: .8,
    info: ['Baryons are made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.'],
	c: [saB_Proton, saB_Neutron]
};
const a_H = {
    n: 'Hydrogen', u: false, t: 1,
    info: ['Hydrogen is the most common element in the universe, made with only a single proton. There are two stable isotopes and a third with a halflife of ~12 years. Hydrogen is highly flamable and lighter than air.'],
    c: [aH_Protium, aH_Deuterium, aH_Tritium]
};
const a_He = {
    n: 'Helium', u: false, t: 1,
    info: ['Helium has two stable isotopes. Helium-3 is much more rare than the normal Helium-4. Helium is lighter than air.'],
    c: [aHe_3, aHe_4]
};
const a_Li = {
    n: 'Lithium', u: false, t: 1,
    info: ['Lithium has two stable isotopes. Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.'],
    c: [aLi_6, aLi_7]
};
const a_Be = {
	n: 'Beryllium', u:false, t:1,
	info: ['Beryllium has only a single stable isotope (Be9). A second isotope with a long halflife of ~1.4 million years is used in surface exposure dating.'],
	c: [aBe_9, aBe_10]
}
const a_B = {
	n:'Boron', u:false, t:1,
	info: ['Boron has two stable isotopes and is required for healthy plants.'],
	c: [aB_10, aB_11]
}
const a_C = {
	n:'Carbon', u:false, t:1,
	info: ['Carbon has two stable isotopes (C12 & C13). Carbon14 is has a halflife of ~5700 years and is used to date dead organic matter.'],
	c: [aC_12, aC_13, aC_14]
}

const asdf = {
	n:'', u:false, t:1,
	info: [''],
	c: []
}

//groups
const subatomic = {
    n: 'Subatomic', u: true,
	info: ['Subatomic components are the smallest items in this game.'], 
	intro:'Select an item below, such as Quarks, to continue.',
    c: [sa_Quark, sa_Lepton, sa_Baryon]
};
const atomic = {
    n: 'Atomic', u: false,
    info: ['Atoms are basic UIElement that are the building blocks for every other molecule. They have an atom, which is made of Protons and Neutrons, and are `orbited` by Electrons.'],
    c: [a_H, a_He, a_Li, a_Be, a_B, a_C]
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
			'The Create tab lets you create items. This can be done either by manually clicking the Inventory ++ button or by upgrading the Generator.',
			'The Inventory ++ button will create one item from the components.',
			'The Generator will automatically create items based on the generator set-point. The maximum set-point is the generator level. It will only create items if you have the required components. Upgrading the generator uses the item it will generate.',
			'Most items have components that are needed to create the item. The requires components are listed in the Components section.',
			'The Used In section will show all items the selected item is a component of. By default this is hidden to avoid spoilers.',
	]},
	{t:'Discover', c:[
		'The Discover tab is the main way to gain access to new item types.',
		'You can add items to the matter maker box and power it up. If it is a recipe that exists in the data file you will unlock the item.',
		'There is no penalty for testing with items that do not match a recipe.'
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
		'Cheater Level: -1 is no effect, higher number is easier. Allows you to create some items without using components.'
	]},
	{t:'About', c:[
		'This game lets to craft items. You initially start by crafting subatomic materials but can quickly create larger and larger items. Unfortunately the data file is missing several items that exist in the universe.',
		'Items are organized into Groups based on their magnitude. Items also have Flavors, for example Quarks have two flavors in this game "Up" and "Down".',
		'',
		'',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
		'',
		]},
]