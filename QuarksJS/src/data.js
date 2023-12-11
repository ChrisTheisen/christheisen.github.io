"use strict";

//reverse lookup maps
const ComponentMap = {};//Component Flavor Name -> Flavor[]
const ParentMap = {};
const AllFlavors = {};
let ActualUsed = {};
let ActualCreated = {};

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
const H1 = { n: 'Protium', u: false, m: 1, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const H2 = { n: 'Deuterium', u: false, m: 2, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const He3 = { n: 'Helium3', u: false, m: 3, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 2, b:null }] };
const He4 = { n: 'Helium4', u: false, m: 4, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 2, b:null }] };
const Li6 = { n: 'Lithium6', u: false, m: 6, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 3, b:null }] };
const Li7 = { n: 'Lithium7', u: false, m: 7, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 4, b:null }, { f: Electron, a: 3, b:null }] };
const Be9 = { n: 'Beryllium9', u: false, m:9, s: MassUnits.Da, c: [{ f: Proton, a: 4, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 4, b:null }] };
const B10 = { n: 'Boron10', u: false, m:10, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 5, b:null }] };
const B11 = { n: 'Boron11', u: false, m:11, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 5, b:null }] };
const C12 = { n: 'Carbon12', u: false, m:12, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 6, b:null }] };
const C13 = { n: 'Carbon13', u: false, m:13, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 6, b:null }] };
const N14 = { n: 'Nitrogen14', u: false, m:14, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 7, b:null }] };
const N15 = { n: 'Nitrogen15', u: false, m:15, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 7, b:null }] };
const O16 = { n: 'Oxygen16', u: false, m:16, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 8, b:null }] };
const O17 = { n: 'Oxygen17', u: false, m:17, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 9, b:null }, { f: Electron, a: 8, b:null }] };
const O18 = { n: 'Oxygen18', u: false, m:18, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 8, b:null }] };
const F19 = { n: 'Fluorine19', u: false, m:19, s: MassUnits.Da, c: [{ f: Proton, a: 9, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 9, b:null }] };
const Ne20 = { n: 'Neon20', u: false, m: 20, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 10, b:null }] };
const Ne21 = { n: 'Neon21', u: false, m: 21, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 11, b:null }, { f: Electron, a: 10, b:null }] };
const Ne22 = { n: 'Neon22', u: false, m: 22, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 10, b:null }] };
const Na23 = { n: 'Sodium23', u: false, m: 23, s: MassUnits.Da, c: [{ f: Proton, a: 11, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 11, b:null }] };
const Mg24 = { n: 'Magnesium24', u: false, m: 24, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 12, b:null }] };
const Mg25 = { n: 'Magnesium25', u: false, m: 25, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 13, b:null }, { f: Electron, a: 12, b:null }] };
const Mg26 = { n: 'Magnesium26', u: false, m: 26, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 14, b:null }, { f: Electron, a: 12, b:null }] };
const Al27 = { n: 'Aluminum27', u: false, m: 27, s: MassUnits.Da, c: [{ f: Proton, a: 13, b:null }, { f: Neutron, a: 14, b:null }, { f: Electron, a: 13, b:null }] };
const Si28 = { n: 'Silicon28', u: false, m: 28, s: MassUnits.Da, c: [{ f: Proton, a: 14, b:null }, { f: Neutron, a: 14, b:null }, { f: Electron, a: 14, b:null }] };
const Si29 = { n: 'Silicon29', u: false, m: 29, s: MassUnits.Da, c: [{ f: Proton, a: 14, b:null }, { f: Neutron, a: 15, b:null }, { f: Electron, a: 14, b:null }] };
const Si30 = { n: 'Silicon30', u: false, m: 30, s: MassUnits.Da, c: [{ f: Proton, a: 14, b:null }, { f: Neutron, a: 16, b:null }, { f: Electron, a: 14, b:null }] };
const P31 = { n: 'Phosphorus31', u: false, m: 31, s: MassUnits.Da, c: [{ f: Proton, a: 15, b:null }, { f: Neutron, a: 16, b:null }, { f: Electron, a: 15, b:null }] };
const S32 = { n: 'Sulfur32', u: false, m: 32, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 16, b:null }, { f: Electron, a: 16, b:null }] };
const S33 = { n: 'Sulfur32', u: false, m: 33, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 17, b:null }, { f: Electron, a: 16, b:null }] };
const S34 = { n: 'Sulfur32', u: false, m: 34, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 16, b:null }] };
const S36 = { n: 'Sulfur32', u: false, m: 36, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 16, b:null }] };
const Cl35 = { n: 'Chlorine35', u: false, m: 35, s: MassUnits.Da, c: [{ f: Proton, a: 17, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 17, b:null }] };
const Cl37 = { n: 'Chlorine37', u: false, m: 37, s: MassUnits.Da, c: [{ f: Proton, a: 17, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 17, b:null }] };
const Ar36 = { n: 'Argon36', u: false, m: 36, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 18, b:null }] };
const Ar38 = { n: 'Argon38', u: false, m: 38, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 18, b:null }] };
const Ar40 = { n: 'Argon40', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 22, b:null }, { f: Electron, a: 18, b:null }] };
const K39 = { n: 'Potassium39', u: false, m: 39, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 19, b:null }] };
const K40 = { n: 'Potassium40', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 21, b:null }, { f: Electron, a: 19, b:null }] };
const K41 = { n: 'Potassium41', u: false, m: 41, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 22, b:null }, { f: Electron, a: 19, b:null }] };
const Ca40 = { n: 'Calcium4', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca42 = { n: 'Calcium4', u: false, m: 42, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca43 = { n: 'Calcium4', u: false, m: 43, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca44 = { n: 'Calcium4', u: false, m: 44, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca46 = { n: 'Calcium4', u: false, m: 46, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca48 = { n: 'Calcium4', u: false, m: 48, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Sc45 = { n: 'Scandium45', u: false, m: 45, s: MassUnits.Da, c: [{ f: Proton, a: 21, b:null }, { f: Neutron, a: 24, b:null }, { f: Electron, a: 21, b:null }] };
const Ti46 = { n: 'Titanium46', u: false, m: 46, s: MassUnits.Da, c: [{ f: Proton, a: 22, b:null }, { f: Neutron, a: 26, b:null }, { f: Electron, a: 22, b:null }] };
const Ti47 = { n: 'Titanium47', u: false, m: 47, s: MassUnits.Da, c: [{ f: Proton, a: 22, b:null }, { f: Neutron, a: 27, b:null }, { f: Electron, a: 22, b:null }] };
const Ti48 = { n: 'Titanium48', u: false, m: 48, s: MassUnits.Da, c: [{ f: Proton, a: 22, b:null }, { f: Neutron, a: 28, b:null }, { f: Electron, a: 22, b:null }] };
const Ti49 = { n: 'Titanium49', u: false, m: 49, s: MassUnits.Da, c: [{ f: Proton, a: 22, b:null }, { f: Neutron, a: 29, b:null }, { f: Electron, a: 22, b:null }] };
const Ti50 = { n: 'Titanium50', u: false, m: 50, s: MassUnits.Da, c: [{ f: Proton, a: 22, b:null }, { f: Neutron, a: 30, b:null }, { f: Electron, a: 22, b:null }] };
const V50 = { n: 'Vandium50', u: false, m: 50, s: MassUnits.Da, c: [{ f: Proton, a: 23, b:null }, { f: Neutron, a: 27, b:null }, { f: Electron, a: 23, b:null }] };
const V51 = { n: 'Vandium51', u: false, m: 51, s: MassUnits.Da, c: [{ f: Proton, a: 23, b:null }, { f: Neutron, a: 28, b:null }, { f: Electron, a: 23, b:null }] };
const Cr50 = { n: 'Chromium50', u: false, m: 50, s: MassUnits.Da, c: [{ f: Proton, a: 24, b:null }, { f: Neutron, a: 26, b:null }, { f: Electron, a: 24, b:null }] };
const Cr52 = { n: 'Chromium52', u: false, m: 52, s: MassUnits.Da, c: [{ f: Proton, a: 24, b:null }, { f: Neutron, a: 28, b:null }, { f: Electron, a: 24, b:null }] };
const Cr53 = { n: 'Chromium53', u: false, m: 53, s: MassUnits.Da, c: [{ f: Proton, a: 24, b:null }, { f: Neutron, a: 29, b:null }, { f: Electron, a: 24, b:null }] };
const Cr54 = { n: 'Chromium54', u: false, m: 54, s: MassUnits.Da, c: [{ f: Proton, a: 24, b:null }, { f: Neutron, a: 30, b:null }, { f: Electron, a: 24, b:null }] };
const Mn55 = { n: 'Manganese55', u: false, m: 55, s: MassUnits.Da, c: [{ f: Proton, a: 25, b:null }, { f: Neutron, a: 30, b:null }, { f: Electron, a: 25, b:null }] };
const Fe54 = { n: 'Iron54', u: false, m: 54, s: MassUnits.Da, c: [{ f: Proton, a: 26, b:null }, { f: Neutron, a: 28, b:null }, { f: Electron, a: 26, b:null }] };
const Fe56 = { n: 'Iron56', u: false, m: 56, s: MassUnits.Da, c: [{ f: Proton, a: 26, b:null }, { f: Neutron, a: 30, b:null }, { f: Electron, a: 26, b:null }] };
const Fe57 = { n: 'Iron57', u: false, m: 57, s: MassUnits.Da, c: [{ f: Proton, a: 26, b:null }, { f: Neutron, a: 31, b:null }, { f: Electron, a: 26, b:null }] };
const Fe58 = { n: 'Iron58', u: false, m: 58, s: MassUnits.Da, c: [{ f: Proton, a: 26, b:null }, { f: Neutron, a: 32, b:null }, { f: Electron, a: 26, b:null }] };
const Co59 = { n: 'Cobalt59', u: false, m: 59, s: MassUnits.Da, c: [{ f: Proton, a: 27, b:null }, { f: Neutron, a: 32, b:null }, { f: Electron, a: 27, b:null }] };
const Ni58 = { n: 'Nickle58', u: false, m: 58, s: MassUnits.Da, c: [{ f: Proton, a: 28, b:null }, { f: Neutron, a: 30, b:null }, { f: Electron, a: 28, b:null }] };
const Ni60 = { n: 'Nickle60', u: false, m: 60, s: MassUnits.Da, c: [{ f: Proton, a: 28, b:null }, { f: Neutron, a: 32, b:null }, { f: Electron, a: 28, b:null }] };
const Ni61 = { n: 'Nickle61', u: false, m: 61, s: MassUnits.Da, c: [{ f: Proton, a: 28, b:null }, { f: Neutron, a: 33, b:null }, { f: Electron, a: 28, b:null }] };
const Ni62 = { n: 'Nickle62', u: false, m: 62, s: MassUnits.Da, c: [{ f: Proton, a: 28, b:null }, { f: Neutron, a: 34, b:null }, { f: Electron, a: 28, b:null }] };
const Ni64 = { n: 'Nickle64', u: false, m: 64, s: MassUnits.Da, c: [{ f: Proton, a: 28, b:null }, { f: Neutron, a: 36, b:null }, { f: Electron, a: 28, b:null }] };

const Ac227 = { n: 'Actinium227', u: false, m: 227, s: MassUnits.Da, c: [{ f: Proton, a: 89, b:null }, { f: Neutron, a: 138, b:null }, { f: Electron, a: 89, b:null }] };

const asd = { n: '', u: false, m: 0, s: MassUnits.Da, c: [{ f: Proton, a: 0, b:null }, { f: Neutron, a: 0, b:null }, { f: Electron, a: 0, b:null }] };


//items
const Quark = {
    n: 'Quark', u: true, c: [Q_Up, Q_Down],
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.']
};
const Lepton = {
    n: 'Lepton', u: true, c: [Electron],
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.']
};
const Baryon = {
    n: 'Baryon', u: false, c: [Proton, Neutron],
    info: ['Baryons are made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.']
};
const H = {
    n: 'Hydrogen', u: false, c: [H1, H2],
    info: ['Hydrogen is the most common element in the universe, made with only a single proton. Hydrogen is highly flamable and lighter than air.']
};
const He = {
    n: 'Helium', u: false, c: [He3, He4],
    info: ['Helium-3 is much more rare than the normal Helium-4. Helium is lighter than air.']
};
const Li = {
    n: 'Lithium', u: false, c: [Li6, Li7],
    info: ['Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.']
};
const Be = {
	n: 'Beryllium', u:false, c: [Be9],
	info: ['Beryllium has only a single stable isotope. Be10 has a halflife of ~1.4 million years is used in surface exposure dating.']
};
const B = {
	n:'Boron', u:false, c: [B10, B11],
	info: ['Boron is required for healthy plants.']
};
const C = {
	n:'Carbon', u:false, c: [C12, C13],
	info: ['Carbon is used in organic matter and many industries. C14 is has a halflife of ~5700 years and is used to date dead organic matter.']
};
const N = {
	n:'Nitrogen', u:false, c: [N14, N15],
	info: ['Nitrogen is a very abundant element and is used in many industries.']
};
const O = {
	n:'Oxygen', u:false, c: [O16, O17, O18],
	info: ['Oxygen is needed for all animals that breathe. As of now henneguya salminicola is the only known animal that does not need oxygen.']
};
const F = {
	n:'Fluorine', u: false, c:[F19],
	info: ['Fluorine only has one stable isotope. It is a highly toxic gas and is used in the creation of Teflon.']
};
const Ne = {
	n:'Neon', u:false, c: [Ne20, Ne21, Ne22],
	info: ['There are three stable isotopes of Neon with Neon20 being the most naturally abundant. Neon is used in lights and advertising signs.']
};
const Na = {
	n:'Sodium', u:false, c: [Na23],
	info: ['Sodium is used in sodium vapor lamps (widely used as street lights) and sodium-ion batteries. Sodium is cheaper than lithium but sodium-ion batteries have a few engineering challenges before they are ready to be more widely used.']
};
const Mg = {
	n:'Magnesium', u:false, c: [Mg24, Mg25, Mg26],
	info: ['Magnesium is essential for many human body functions including healthy bones and heart. It is found in leafy greens, nuts, seeds and more.']
};
const Al = {
	n:'Aluminum', u:false, c: [Al27],
	info: ['Aluminum, also spelled aluminium, is a very abundant metal on Earth. It is used in food storage and many other industries.']
};
const Si = {
	n:'Silicon', u:false, c:[Si28, Si29, Si30],
	info: ['Silicon is used in semiconductors and solar cells. When combined with oxygen it makes silicone, which is used in making parts for toys.']
};
const P = {
	n:'Phosphorus', u:false, c:[P31],
	info: ['Phosphorus is used in matches.']
};
const S = {
	n:'Sulfur', u:false, c:[S32,S33,S34,S36],
	info: ['Sulfur is found pure in nature, likely from volcanoes.']
};
const Cl = {
	n:'Chlorine', u:false, c:[Cl35,Cl37],
	info: ['Chlorine is a commonly used to purify drinking water and swimming pools.']
};
const Ar = {
	n:'Argon', u:false, c:[Ar36,Ar38,Ar40],
	info: ['Argon is intert and colorless but glows blue when excited by an electrical charge.']
};
const K = {
	n:'Potassium', u:false, c:[K39,K40,K41],
	info: ['Potassium is an electrolyte the body needs to function but is harmful in larger quantities.']
};
const Ca = {
	n:'Calcium', u:false, c:[Ca40,Ca42,Ca43,Ca44,Ca46,Ca48],
	info: ['Calcium in it\'s pure form is rare, it is often associated with bone strength.']
};
const Sc = {
	n:'Scandium', u:false, c:[Sc45],
	info: ['Scandium has few uses outside of research.']
};
const Ti = {
	n:'Titanium', u:false, c:[Ti46,Ti47,Ti48,Ti49,Ti50],
	info: ['Titanium is a very strong but light and is used in alloys for aerospace industries. It is also used in several other industries.']
};
const V = {
	n:'Vanadium', u:false, c:[V50,V51],
	info: ['Vandium is mostly used in vandium-steel alloys.']
};
const Cr = {
	n:'Chromium', u:false, c:[Cr50,Cr52,Cr53,Cr54],
	info: ['Chromium is often used to harden steel and increase rust resistance.']
};
const Mn = {
	n:'Manganese', u:false, c:[Mn55],
	info: ['Manganese is used as a component in a steel alloy for railroad tracks and other industries.']
};
const Fe = {
	n:'Iron', u:false, c:[],
	info: ['Iron rusts easily but is the most used metal. It is mostly used to manufacture steel.']
};
const Co = {
	n:'Cobalt', u:false, c:[Co59],
	info: ['Cobalt can be magnetised and is used in industries where high-temperature strength is important.']
};
const Ni = {
	n:'Nickel', u:false, c:[Ni58,Ni60,Ni61,Ni62,Ni64],
	info: ['Nickel is mainly used in making steel alloys like stainless steel.']
};
const Cu = {
	n:'Copper', u:false, c:[],
	info: ['']
};
const Zn = {
	n:'Zinc', u:false, c:[],
	info: ['']
};
const Ga = {
	n:'Gallium', u:false, c:[],
	info: ['']
};
const Ge = {
	n:'Germanium', u:false, c:[],
	info: ['']
};
const As = {
	n:'Arsenic', u:false, c:[],
	info: ['']
};
const Se = {
	n:'Selenium', u:false, c:[],
	info: ['']
};
const Br = {
	n:'Bromine', u:false, c:[],
	info: ['']
};
const Kr = {
	n:'Krypton', u:false, c:[],
	info: ['']
};
const Rb = {
	n:'Rubidium', u:false, c:[],
	info: ['']
};
const Sr = {
	n:'Strontium', u:false, c:[],
	info: ['']
};
const Y = {
	n:'Yttrium', u:false, c:[],
	info: ['']
};
const Zr = {
	n:'Zirconium', u:false, c:[],
	info: ['']
};
const Nb = {
	n:'Niobium', u:false, c:[],
	info: ['']
};
const Mo = {
	n:'Molybdenum', u:false, c:[],
	info: ['']
};
const Tc = {
	n:'Technetium', u:false, c:[],
	info: ['']
};
const Ru = {
	n:'Ruthenium', u:false, c:[],
	info: ['']
};
const Rh = {
	n:'Rhodium', u:false, c:[],
	info: ['']
};
const Pd = {
	n:'Palladium', u:false, c:[],
	info: ['']
};
const Ag = {
	n:'Silver', u:false, c:[],
	info: ['']
};
const Cd = {
	n:'Cadmium', u:false, c:[],
	info: ['']
};
const In = {
	n:'Indium', u:false, c:[],
	info: ['']
};
const Sn = {
	n:'Tin', u:false, c:[],
	info: ['']
};
const Sb = {
	n:'Antimony', u:false, c:[],
	info: ['']
};
const Te = {
	n:'Tellurium', u:false, c:[],
	info: ['']
};
const I = {
	n:'Iodine', u:false, c:[],
	info: ['']
};
const Xe = {
	n:'Xenon', u:false, c:[],
	info: ['']
};
const Cs = {
	n:'Cesium', u:false, c:[],
	info: ['']
};
const Ba = {
	n:'Barium', u:false, c:[],
	info: ['']
};
const La = {
	n:'Lanthanum', u:false, c:[],
	info: ['']
};
const Ce = {
	n:'Cerium', u:false, c:[],
	info: ['']
};
const Pr = {
	n:'Praseodymium', u:false, c:[],
	info: ['']
};
const Nd = {
	n:'Neodymium', u:false, c:[],
	info: ['']
};
const Pm = {
	n:'Promethium', u:false, c:[],
	info: ['']
};
const Sm = {
	n:'Samarium', u:false, c:[],
	info: ['']
};
const Eu = {
	n:'Europium', u:false, c:[],
	info: ['']
};
const Gd = {
	n:'Gadolinium', u:false, c:[],
	info: ['']
};
const Tb = {
	n:'Terbium', u:false, c:[],
	info: ['']
};
const Dy = {
	n:'Dysprosium', u:false, c:[],
	info: ['']
};
const Ho = {
	n:'Holmium', u:false, c:[],
	info: ['']
};
const Er = {
	n:'Erbium', u:false, c:[],
	info: ['']
};
const Tm = {
	n:'Thulium', u:false, c:[],
	info: ['']
};
const Yb = {
	n:'Ytterbium', u:false, c:[],
	info: ['']
};
const Lu = {
	n:'Lutetium', u:false, c:[],
	info: ['']
};
const Hf = {
	n:'Hafnium', u:false, c:[],
	info: ['']
};
const Ta = {
	n:'Tantalum', u:false, c:[],
	info: ['']
};
const W = {
	n:'Tungsten', u:false, c:[],
	info: ['']
};
const Re = {
	n:'Rhenium', u:false, c:[],
	info: ['']
};
const Os = {
	n:'Osmium', u:false, c:[],
	info: ['']
};
const Ir = {
	n:'Iridium', u:false, c:[],
	info: ['']
};
const Pt = {
	n:'Platinum', u:false, c:[],
	info: ['']
};
const Au = {
	n:'Gold', u:false, c:[],
	info: ['']
};
const Hg = {
	n:'Mercury', u:false, c:[],
	info: ['']
};
const Tl = {
	n:'Thallium', u:false, c:[],
	info: ['']
};
const Pb = {
	n:'Lead', u:false, c:[],
	info: ['']
};
const Bi = {
	n:'Bismuth', u:false, c:[],
	info: ['']
};
const Po = {
	n:'Polonium', u:false, c:[],
	info: ['']
};
const At = {
	n:'Astatine', u:false, c:[],
	info: ['Astatine has no known stable isotopes; I have included the isotope with the longest decay rate of 8 hours.']
};
const Rn = {
	n:'Radon', u:false, c:[],
	info: ['Radon has no known stable isotopes; I have included the isotope with the longest decay rate of 3.8 days.']
};
const Fr = {
	n:'Francium', u:false, c:[],
	info: ['Francium has no known stable isotopes; I have included the isotope with the longest decay rate of 21.6 minutes.']
};
const Ra = {
	n:'Radium', u:false, c:[],
	info: ['Radium has no known stable isotopes; I have included the isotope with a decay rate greater than 1 year at 1585.5 years.']
};
const Ac = {
	n:'Actinium', u:false, c:[Ac227],
	info: ['Actinium has no known stable isotopes; I have included the isotope with the longest decay rate at 21.8 years.']
};
const Th = {
	n:'Thorium', u:false, c:[],
	info: ['Thorium has no known stable isotopes; I have included the isotopes with the longest decay rate greater than 1 year.']
};
const Pa = {
	n:'Protactinium', u:false, c:[],
	info: [' ']
};
const U = {
	n:'Uranium', u:false, c:[],
	info: [' ']
};
const Np = {
	n:'Neptunium', u:false, c:[],
	info: [' ']
};
const Pu = {
	n:'Plutonium', u:false, c:[],
	info: [' ']
};
const Am = {
	n:'Americium', u:false, c:[],
	info: [' ']
};
const Cm = {
	n:'Curium', u:false, c:[],
	info: [' ']
};
const Bk = {
	n:'Berkelium', u:false, c:[],
	info: [' ']
};
const Cf = {
	n:'Californium', u:false, c:[],
	info: [' ']
};
const Es = {
	n:'Einsteinium', u:false, c:[],
	info: [' ']
};
const Fm = {
	n:'Fermium', u:false, c:[],
	info: [' ']
};
const Md = {
	n:'Mendelevium', u:false, c:[],
	info: [' ']
};
const No = {
	n:'Nobelium', u:false, c:[],
	info: [' ']
};
const Lr = {
	n:'Lawrencium', u:false, c:[],
	info: [' ']
};
const Rf = {
	n:'Rutherfordium', u:false, c:[],
	info: [' ']
};
const Db = {
	n:'Dubnium', u:false, c:[],
	info: [' ']
};
const Sg = {
	n:'Seaborgium', u:false, c:[],
	info: [' ']
};
const Bh = {
	n:'Bohrium', u:false, c:[],
	info: [' ']
};
const Hs = {
	n:'Hassium', u:false, c:[],
	info: [' ']
};
const Mt = {
	n:'Meitnerium', u:false, c:[],
	info: [' ']
};
const Ds = {
	n:'Darmstadtium', u:false, c:[],
	info: [' ']
};
const Rg = {
	n:'Roentgenium', u:false, c:[],
	info: [' ']
};
const Cn = {
	n:'Copernicium', u:false, c:[],
	info: [' ']
};
const Nh = {
	n:'Nihonium', u:false, c:[],
	info: [' ']
};
const Fl = {
	n:'Flerovium', u:false, c:[],
	info: [' ']
};
const Mc = {
	n:'Moscovium', u:false, c:[],
	info: [' ']
};
const Lv = {
	n:'Livermorium', u:false, c:[],
	info: [' ']
};
const Ts = {
	n:'Tennessine', u:false, c:[],
	info: [' ']
};
const Og = {
	n:'Oganesson', u:false, c:[],
	info: [' ']
};

//transition metal subgroups (By Period)
const TMP4 = {
	n:'Period 4', u:false,
	info:['There are so many Transition Metals I split them up by period.'],
	c:[Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu, Zn]
}
const TMP5 = {
	n:'Period 5', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Y, Zr, Nb, Mo, Tc, Ru, Rh, Pd, Ag, Cd]
}
const TMP6 = {
	n:'Period 6', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Lu, Hf, Ta, W, Re, Os, Ir, Pt, Au, Hg]
}
const TMP7 = {
	n:'Period 7', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn]
}

//element families
const AlkaliMetal = {
	n:'Alkali Metal', u:false, c: [Li, Na, K, Rb, Cs, Fr],
	info: ['Alkali Metals are soft, shiny, and highly reactive.']
}
const AlkalineEarthMetal = {
	n:'Alkaline Earth Metal', u:false, c: [Be, Mg, Ca, Sr, Ba, Ra],
	info: ['Alkaline Earth Metals are not found free in nature, they are only found as compounds with other elements.']
}
const Actinide = {
	n:'Actinide', u:false, c: [Ac, Rh, Pa, U, Np, Pu, Am, Cm, Bk, Cf, Es, Fm, Md, No],
	info: ['Actinides are all radioactive and have no stable isotopes. In this game I included isotopes with a decay rate longer than a year.']
}
const Chalcogen = {
	n:'Chalcogen', u:false, c:[O, S, Se, Te, Po],
	info:['Chalcogens have an unusual property called catenation, which means atoms will bond to other identical atoms. When oxygen bonds to other oxygen atoms it forms ozone.']
}
const Halogen = {
	n:'Halogen', u:false, c:[F, Cl, Br, I, At, Ts],
	info:['Halogens are only found combined with other elements in nature.']
}
const Lanthanide = {
	n:'Lanthanide', u:false, c: [La, Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb],
	info: ['Lanthanide are sometimes called rare-earth elements or rare-earth metals.']
}
const Metalloid = {
	n:'Metalloid', u:false, c: [B, Si, Ge, As, Sb],
	info: ['Metalloids have properties between metals and nonmetals.']
}
const NobelGas = {
	n:'Nobel Gas', u:false, c: [He, Ne, Ar, Kr, Xe, Rn, Og],
	info: ['Noble gasses are naturally occurring and have very low reactivity.']
}
const Nonmetal = {
	n:'Other Nonmetal', u:false, c: [H, C, N, P],
	info: ['Other nonmetals or sometimes just nonmetals are a diverse group of elements between the metalloids and halogens.']
}
const PoorMetal = {
	n:'Post-transition Metal', u:false, c:[Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv],
	info:['Post-transition Metals go by a few names including: poor metals, other metals, p-block metals, and chemically weak metals.']
}
const TransitionMetal = {
	n:'Transition Metal', u:false, c:[TMP4,TMP5,TMP6,TMP7],
	info:['Transition metals are typically hard. There are many, spanning multiple periods and groups (rows and columns) through the middle of the periodic table.']
}

const Dihydrogen = { n: 'Dihydrogen', u: false, m: 2, s: MassUnits.Da, c: [{ f: H1, a: 2, b:null }] };
const DeuteratedDihydrogen = { n: 'Deuterated Dihydrogen', u: false, m: 4, s: MassUnits.Da, c: [{ f: H2, a: 2, b:null }] };

const allH = {
	n:'Hydrogen Allotropes', u:false, c:[Dihydrogen, DeuteratedDihydrogen],
	info: ['These are different molecules made with different forms of hydrogen.']
};
const allB = {
	n:'Boron', u:false, c:[],
	info: ['']
};
const allC = {
	n:'Carbon', u:false, c:[],
	info: ['']
};
const allN = {
	n:'Nitrogen', u:false, c:[],
	info: ['']
};
const allO = {
	n:'Oxygen', u:false, c:[],
	info: ['']
};
const allF = {
	n:'Fluorine', u:false, c:[],
	info: ['']
};
const allP = {
	n:'Phosphorus', u:false, c:[],
	info: ['']
};
const allS = {
	n:'Sulfur', u:false, c:[],
	info: ['']
};
const allCl = {
	n:'Chlorine', u:false, c:[],
	info: ['']
};
const allAs = {
	n:'Arsenic', u:false, c:[],
	info: ['']
};
const allSe = {
	n:'Selinium', u:false, c:[],
	info: ['']
};
const allBr = {
	n:'Bromine', u:false, c:[],
	info: ['']
};
const allSn = {
	n:'Tin', u:false, c:[],
	info: ['']
};
const allSb = {
	n:'Antimony', u:false, c:[],
	info: ['']
};
const allI = {
	n:'Iodine', u:false, c:[],
	info: ['']
};
const allPo = {
	n:'Polonium', u:false, c:[],
	info: ['']
};


//allotropes
const Allotrope = {
	n:'Allotrope', u:false, c:[allH/*, allC, allN, allO, allF, allP, allS, allCl, allAs, allSe, allBr, allSn, allSb, allI, allPo*/],
	info: ['Allotropes are different materials all contiaining a single type of element. Many altropes can be made with a variety of isotopes. For simplicity I generally just used the isotope with the smallest mass for this game.']
}

//magnitude
const subatomic = {
    n: 'Subatomic', u: true,
	info: ['Subatomic components are the smallest items in this game.', 'In this game most subatomic items are free to generate'], 
    c: [Quark, Lepton, Baryon]
};
const atomic = {
    n: 'Atomic', u: false,
    info: ['Atoms are basic elements that are the building blocks for molecules. They have a nucleus, which is made of Protons and Neutrons, and are `orbited` by Electrons.', 'Many elements have multiple isotopes; for simplicity in this game most molecule recipes uses the most abundant isotope.'],
    c: [AlkaliMetal, AlkalineEarthMetal, Actinide, Chalcogen, Halogen, Lanthanide, Metalloid, NobelGas, Nonmetal, PoorMetal, TransitionMetal]
};
const molecular = {
    n: 'Molecular', u: false,
    info: ['A molecule is the smallest mass of a substance while keeping its chemical properties.', 'There are countless types of molecules, this game has some.'],
    c: [Allotrope]
};
const human = {
    n: 'Human', u: false,
    info: ['Human scale is right in the middle, Malcome is human sized and also in the middle.'],
    c: []
};
const planetary = {
    n: 'Planetary', u: false,
    info: ['Planetary objects are about the size of a planet. Earth is a terrestrial planet but there are several types of planetary scale objects.'],
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

//base tabs
const tabs = [
	{n:'Create', u:true, c:data, info:['Imagination is the beginning of creation.'], intro:'This is where you will create items. These "helpful tips" can be hidden from the Settings tab.'}, 
	{n:'Discover', u:false, info:['He who never made a mistake never made a discovery.', 'Use the "Generate Discoverable Recipe" button if you get stuck.'], intro:'This is the main place for discovering new resources. Click a (+>) button to add an item to the Matter Mutator. Click a (--) button to remove an item from the Matter Mutator. Try different combinations and click the "Scan" button. You can only add an item if you have some and it is not already in the matter mutator.'}, 
	{n:'Manage', u:false, info:['If demand is greater than supply you have a deficit.'], intro:'This is a central location to monitor item supply and demand.'}, 
	{n:'Settings', u:true, info:['Settings can effect game mechanics and page contents.'], intro:'This is where you can change settings. Click the giant button just under this text to hide these messages about how to use a website.'}, 
	{n:'Help', u:true, info:['This is an idle crafting game focusing on discovery and supply flow management.'], intro:'Click on a subject category below for more information.'}
];

const help = [
	{t:'General', c:[
		'This is a crafting/discovery game with some supply chain management.',
		'|',
		'You initially start by crafting subatomic materials but can eventually create successively larger items. Unfortunately the data file is missing several items that exist in the universe.',
		'Items are organized into groups and have flavors or isotopes. For example Quarks are in the Subatomic group and have two flavors in this game "Up" and "Down".',
		'|',
		'Sometimes it can be difficult to remember what group an item is in; (») buttons are found most places an item is referenced and will go to the item.',
		'|',
		'A game cycle is about 1 second.',
		'Space bar pauses the game'
	]},
	{t:'Create', c:[
		'The Create tab lets you create items. This can be done either by manually clicking the Inventory (++) button or by upgrading the Generator.',
		'The Inventory (++) button will create one item from the components.',
		'Generator rank will sacrifice generators to improve increase their effectiveness and reduce their cost.', 
		'The Generator will automatically create items based on the generator set-point. It will only create items if you have the required components. Upgrading the generator uses the item it will generate.',
	]},
	{t:'Discover', c:[
		'The Discover tab is the main way to gain access to new item types.',
		'Add items to the matter mutator box and scan the items. If it has the items for a recipe that exists in the data file you will unlock the item.',
		'Unfortunately, the game data is not complete but will be expanded in the future.',
		'There is no penalty for scanning items that do not match a recipe.',
		'If you are stuck or want a recipe hint you can click the "Generate Discoverable Recipe" button'
	]},
	{t:'Manage', c:[
		'The Manage tab is where you can manage your generators. It displays the input and output of each generator and the amount created and used during the last update.',
		'|',
		'The Manage table has several filters to help manage the resources.',
		'Hide Created === 0 : will hide all rows that where no items were created.',
		'Hide Created === Setpoint : will hide all rows where the generator setpoint was achieved.',
		'Hide Created < Setpoint : will hide all the rows where the generator setpoint was not achieved',
		'Hide Used === 0 : will hide all the rows where no items were used.',
		'Hide Used === Demand : will hide all rows where the expected demand was achieved',
		'Hide Used < Demand : will hide all rows where the expected demand was not achieved',
		'|',
		'The table columns describe the supply and demand of each item.',
		'Name : is the name of the item. Hover to see the full name.',
		'Owned : is the amount of the itme you current own.',
		'Setpoint : is the generator setpoint, or the maximum amount that should be created.',
		'Demand : is the expected demand if all setpoints are achieved',
		'Created : is the actual amount created in the last cycle',
		'Used : is the actual amount used in creating other items last cycle. This does not include items used in upgrading generators'
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
		'The isotopes I included are the bolded ones listed on https://periodictable.com/. If there are none for a given element I used the one with the largest halflife.',
		'I looked up additional information, such as uses, here: https://www.rsc.org/periodic-table/',
		'The other items are included as I get to it.',
		'|',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
		'|',
		'This game was initially started as a way to learn mutraction, but I encountered some memory leaks. These leaks have since been resolved. I might go back and retry making the UI in mutraction.',
		'I decided to try making a game that has a simple UI but is very data heavy. As a result the html file is pretty small and most content is generated based on the data.js file.',
		'It ended up less general that I initially hoped and more specialized to this specific game, but in the end  I like this result'
	]},
]