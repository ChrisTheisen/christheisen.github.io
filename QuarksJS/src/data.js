"use strict";

//reverse lookup maps
const ComponentMap = {};//Component Flavor Name -> Flavor[]
const ParentMap = {};
const AllFlavors = {};
let AllSortedFlavors = [];
let ActualUsed = {};
let ActualCreated = {};

const MassUnits = {
	Da:{i: 0, s:'Da',n:'Dalton',c:602217364335000},
	ng:{i: 1, s:'ng',n:'Nanogram',c:1000000000000},
	Kg:{i: 2, s:'Kg',n:'Kilogram',c:1000000000000000},
	Eg:{i: 3, s:'Eg',n:'Exagram',c:1378679941220000},
	MO:{i: 4, s:'M☉',n:'Solar Mass',c:Infinity}
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
const S33 = { n: 'Sulfur33', u: false, m: 33, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 17, b:null }, { f: Electron, a: 16, b:null }] };
const S34 = { n: 'Sulfur34', u: false, m: 34, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 16, b:null }] };
const S36 = { n: 'Sulfur36', u: false, m: 36, s: MassUnits.Da, c: [{ f: Proton, a: 16, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 16, b:null }] };
const Cl35 = { n: 'Chlorine35', u: false, m: 35, s: MassUnits.Da, c: [{ f: Proton, a: 17, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 17, b:null }] };
const Cl37 = { n: 'Chlorine37', u: false, m: 37, s: MassUnits.Da, c: [{ f: Proton, a: 17, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 17, b:null }] };
const Ar36 = { n: 'Argon36', u: false, m: 36, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 18, b:null }, { f: Electron, a: 18, b:null }] };
const Ar38 = { n: 'Argon38', u: false, m: 38, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 18, b:null }] };
const Ar40 = { n: 'Argon40', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 18, b:null }, { f: Neutron, a: 22, b:null }, { f: Electron, a: 18, b:null }] };
const K39 = { n: 'Potassium39', u: false, m: 39, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 19, b:null }] };
const K40 = { n: 'Potassium40', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 21, b:null }, { f: Electron, a: 19, b:null }] };
const K41 = { n: 'Potassium41', u: false, m: 41, s: MassUnits.Da, c: [{ f: Proton, a: 19, b:null }, { f: Neutron, a: 22, b:null }, { f: Electron, a: 19, b:null }] };
const Ca40 = { n: 'Calcium40', u: false, m: 40, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca42 = { n: 'Calcium42', u: false, m: 42, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca43 = { n: 'Calcium43', u: false, m: 43, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca44 = { n: 'Calcium44', u: false, m: 44, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca46 = { n: 'Calcium46', u: false, m: 46, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
const Ca48 = { n: 'Calcium48', u: false, m: 48, s: MassUnits.Da, c: [{ f: Proton, a: 20, b:null }, { f: Neutron, a: 20, b:null }, { f: Electron, a: 20, b:null }] };
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
const Cu63 = { n: 'Copper63', u: false, m: 63, s: MassUnits.Da, c: [{ f: Proton, a: 29, b:null }, { f: Neutron, a: 34, b:null }, { f: Electron, a: 29, b:null }] };
const Cu65 = { n: 'Copper65', u: false, m: 65, s: MassUnits.Da, c: [{ f: Proton, a: 29, b:null }, { f: Neutron, a: 36, b:null }, { f: Electron, a: 29, b:null }] };
const Zn64 = { n: 'Zinc64', u: false, m: 64, s: MassUnits.Da, c: [{ f: Proton, a: 30, b:null }, { f: Neutron, a: 34, b:null }, { f: Electron, a: 30, b:null }] };
const Zn66 = { n: 'Zinc66', u: false, m: 66, s: MassUnits.Da, c: [{ f: Proton, a: 30, b:null }, { f: Neutron, a: 36, b:null }, { f: Electron, a: 30, b:null }] };
const Zn67 = { n: 'Zinc67', u: false, m: 67, s: MassUnits.Da, c: [{ f: Proton, a: 30, b:null }, { f: Neutron, a: 37, b:null }, { f: Electron, a: 30, b:null }] };
const Zn68 = { n: 'Zinc68', u: false, m: 68, s: MassUnits.Da, c: [{ f: Proton, a: 30, b:null }, { f: Neutron, a: 38, b:null }, { f: Electron, a: 30, b:null }] };
const Zn70 = { n: 'Zinc70', u: false, m: 70, s: MassUnits.Da, c: [{ f: Proton, a: 30, b:null }, { f: Neutron, a: 70, b:null }, { f: Electron, a: 30, b:null }] };
const Ga69 = { n: 'Gallium69', u: false, m: 69, s: MassUnits.Da, c: [{ f: Proton, a: 31, b:null }, { f: Neutron, a: 38, b:null }, { f: Electron, a: 31, b:null }] };
const Ga71 = { n: 'Gallium71', u: false, m: 71, s: MassUnits.Da, c: [{ f: Proton, a: 31, b:null }, { f: Neutron, a: 40, b:null }, { f: Electron, a: 31, b:null }] };
const Ge70 = { n: 'Germanium70', u: false, m: 70, s: MassUnits.Da, c: [{ f: Proton, a: 32, b:null }, { f: Neutron, a: 38, b:null }, { f: Electron, a: 32, b:null }] };
const Ge72 = { n: 'Germanium72', u: false, m: 72, s: MassUnits.Da, c: [{ f: Proton, a: 32, b:null }, { f: Neutron, a: 40, b:null }, { f: Electron, a: 32, b:null }] };
const Ge73 = { n: 'Germanium73', u: false, m: 73, s: MassUnits.Da, c: [{ f: Proton, a: 32, b:null }, { f: Neutron, a: 41, b:null }, { f: Electron, a: 32, b:null }] };
const Ge74 = { n: 'Germanium74', u: false, m: 74, s: MassUnits.Da, c: [{ f: Proton, a: 32, b:null }, { f: Neutron, a: 42, b:null }, { f: Electron, a: 32, b:null }] };
const Ge76 = { n: 'Germanium76', u: false, m: 76, s: MassUnits.Da, c: [{ f: Proton, a: 32, b:null }, { f: Neutron, a: 44, b:null }, { f: Electron, a: 32, b:null }] };
const As75 = { n: 'Arsenic75', u: false, m: 75, s: MassUnits.Da, c: [{ f: Proton, a: 33, b:null }, { f: Neutron, a: 42, b:null }, { f: Electron, a: 33, b:null }] };
const Se74 = { n: 'Selenium74', u: false, m: 74, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 40, b:null }, { f: Electron, a: 34, b:null }] };
const Se76 = { n: 'Selenium76', u: false, m: 76, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 42, b:null }, { f: Electron, a: 34, b:null }] };
const Se77 = { n: 'Selenium77', u: false, m: 77, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 43, b:null }, { f: Electron, a: 34, b:null }] };
const Se78 = { n: 'Selenium78', u: false, m: 78, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 44, b:null }, { f: Electron, a: 34, b:null }] };
const Se80 = { n: 'Selenium80', u: false, m: 80, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 46, b:null }, { f: Electron, a: 34, b:null }] };
const Se82 = { n: 'Selenium82', u: false, m: 82, s: MassUnits.Da, c: [{ f: Proton, a: 34, b:null }, { f: Neutron, a: 48, b:null }, { f: Electron, a: 34, b:null }] };
const Br79 = { n: 'Bromine79', u: false, m: 79, s: MassUnits.Da, c: [{ f: Proton, a: 35, b:null }, { f: Neutron, a: 44, b:null }, { f: Electron, a: 35, b:null }] };
const Br81 = { n: 'Bromine81', u: false, m: 81, s: MassUnits.Da, c: [{ f: Proton, a: 35, b:null }, { f: Neutron, a: 46, b:null }, { f: Electron, a: 35, b:null }] };
const Kr78 = { n: 'Krypton78', u: false, m: 78, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 42, b:null }, { f: Electron, a: 36, b:null }] };
const Kr80 = { n: 'Krypton80', u: false, m: 80, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 44, b:null }, { f: Electron, a: 36, b:null }] };
const Kr82 = { n: 'Krypton82', u: false, m: 82, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 46, b:null }, { f: Electron, a: 36, b:null }] };
const Kr83 = { n: 'Krypton83', u: false, m: 83, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 47, b:null }, { f: Electron, a: 36, b:null }] };
const Kr84 = { n: 'Krypton84', u: false, m: 84, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 48, b:null }, { f: Electron, a: 36, b:null }] };
const Kr86 = { n: 'Krypton86', u: false, m: 86, s: MassUnits.Da, c: [{ f: Proton, a: 36, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 36, b:null }] };
const Rb85 = { n: 'Rubidium85', u: false, m: 85, s: MassUnits.Da, c: [{ f: Proton, a: 37, b:null }, { f: Neutron, a: 48, b:null }, { f: Electron, a: 37, b:null }] };
const Rb87 = { n: 'Rubidium87', u: false, m: 87, s: MassUnits.Da, c: [{ f: Proton, a: 37, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 37, b:null }] };
const Sr84 = { n: 'Strontium84', u: false, m: 84, s: MassUnits.Da, c: [{ f: Proton, a: 38, b:null }, { f: Neutron, a: 46, b:null }, { f: Electron, a: 38, b:null }] };
const Sr86 = { n: 'Strontium86', u: false, m: 86, s: MassUnits.Da, c: [{ f: Proton, a: 38, b:null }, { f: Neutron, a: 48, b:null }, { f: Electron, a: 38, b:null }] };
const Sr87 = { n: 'Strontium87', u: false, m: 87, s: MassUnits.Da, c: [{ f: Proton, a: 38, b:null }, { f: Neutron, a: 49, b:null }, { f: Electron, a: 38, b:null }] };
const Sr88 = { n: 'Strontium88', u: false, m: 88, s: MassUnits.Da, c: [{ f: Proton, a: 38, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 38, b:null }] };
const Y89 = { n: 'Ytrium89', u: false, m: 89, s: MassUnits.Da, c: [{ f: Proton, a: 39, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 39, b:null }] };
const Zr90 = { n: 'Zirconium90', u: false, m: 90, s: MassUnits.Da, c: [{ f: Proton, a: 40, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 40, b:null }] };
const Zr91 = { n: 'Zirconium91', u: false, m: 91, s: MassUnits.Da, c: [{ f: Proton, a: 40, b:null }, { f: Neutron, a: 51, b:null }, { f: Electron, a: 40, b:null }] };
const Zr92 = { n: 'Zirconium92', u: false, m: 92, s: MassUnits.Da, c: [{ f: Proton, a: 40, b:null }, { f: Neutron, a: 52, b:null }, { f: Electron, a: 40, b:null }] };
const Zr94 = { n: 'Zirconium94', u: false, m: 94, s: MassUnits.Da, c: [{ f: Proton, a: 40, b:null }, { f: Neutron, a: 54, b:null }, { f: Electron, a: 40, b:null }] };
const Zr96 = { n: 'Zirconium96', u: false, m: 96, s: MassUnits.Da, c: [{ f: Proton, a: 40, b:null }, { f: Neutron, a: 56, b:null }, { f: Electron, a: 40, b:null }] };
const Nb93 = { n: 'Niobium93', u: false, m: 93, s: MassUnits.Da, c: [{ f: Proton, a: 41, b:null }, { f: Neutron, a: 52, b:null }, { f: Electron, a: 41, b:null }] };
const Mo92 = { n: 'Molybdenum92', u: false, m: 92, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 50, b:null }, { f: Electron, a: 42, b:null }] };
const Mo94 = { n: 'Molybdenum94', u: false, m: 94, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 52, b:null }, { f: Electron, a: 42, b:null }] };
const Mo95 = { n: 'Molybdenum95', u: false, m: 95, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 53, b:null }, { f: Electron, a: 42, b:null }] };
const Mo96 = { n: 'Molybdenum96', u: false, m: 96, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 54, b:null }, { f: Electron, a: 42, b:null }] };
const Mo97 = { n: 'Molybdenum97', u: false, m: 97, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 55, b:null }, { f: Electron, a: 42, b:null }] };
const Mo98 = { n: 'Molybdenum98', u: false, m: 98, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 56, b:null }, { f: Electron, a: 42, b:null }] };
const Mo100 = { n: 'Molybdenum100', u: false, m: 100, s: MassUnits.Da, c: [{ f: Proton, a: 42, b:null }, { f: Neutron, a: 58, b:null }, { f: Electron, a: 42, b:null }] };
const Tc97 = { n: 'Technitium97', u: false, m: 97, s: MassUnits.Da, c: [{ f: Proton, a: 43, b:null }, { f: Neutron, a: 54, b:null }, { f: Electron, a: 43, b:null }] };
const Ru96 = { n: 'Ruthenium96', u: false, m: 96, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 52, b:null }, { f: Electron, a: 44, b:null }] };
const Ru98 = { n: 'Ruthenium98', u: false, m: 98, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 54, b:null }, { f: Electron, a: 44, b:null }] };
const Ru99 = { n: 'Ruthenium99', u: false, m: 99, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 55, b:null }, { f: Electron, a: 44, b:null }] };
const Ru100 = { n: 'Ruthenium100', u: false, m: 100, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 56, b:null }, { f: Electron, a: 44, b:null }] };
const Ru101 = { n: 'Ruthenium101', u: false, m: 101, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 57, b:null }, { f: Electron, a: 44, b:null }] };
const Ru102 = { n: 'Ruthenium102', u: false, m: 102, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 58, b:null }, { f: Electron, a: 44, b:null }] };
const Ru104 = { n: 'Ruthenium104', u: false, m: 104, s: MassUnits.Da, c: [{ f: Proton, a: 44, b:null }, { f: Neutron, a: 60, b:null }, { f: Electron, a: 44, b:null }] };
const Rh103 = { n: 'Rhodium103', u: false, m: 103, s: MassUnits.Da, c: [{ f: Proton, a: 45, b:null }, { f: Neutron, a: 58, b:null }, { f: Electron, a: 45, b:null }] };
const Pd102 = { n: 'Paladium102', u: false, m: 102, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 56, b:null }, { f: Electron, a: 46, b:null }] };
const Pd104 = { n: 'Paladium104', u: false, m: 104, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 58, b:null }, { f: Electron, a: 46, b:null }] };
const Pd105 = { n: 'Paladium105', u: false, m: 105, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 59, b:null }, { f: Electron, a: 46, b:null }] };
const Pd106 = { n: 'Paladium106', u: false, m: 106, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 60, b:null }, { f: Electron, a: 46, b:null }] };
const Pd108 = { n: 'Paladium108', u: false, m: 108, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 62, b:null }, { f: Electron, a: 46, b:null }] };
const Pd110 = { n: 'Paladium110', u: false, m: 110, s: MassUnits.Da, c: [{ f: Proton, a: 46, b:null }, { f: Neutron, a: 64, b:null }, { f: Electron, a: 46, b:null }] };
const Ag107 = { n: 'Silver107', u: false, m: 107, s: MassUnits.Da, c: [{ f: Proton, a: 47, b:null }, { f: Neutron, a: 60, b:null }, { f: Electron, a: 47, b:null }] };
const Ag109 = { n: 'Silver109', u: false, m: 109, s: MassUnits.Da, c: [{ f: Proton, a: 47, b:null }, { f: Neutron, a: 62, b:null }, { f: Electron, a: 47, b:null }] };
const Cd106 = { n: 'Cadmium106', u: false, m: 106, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 58, b:null }, { f: Electron, a: 48, b:null }] };
const Cd108 = { n: 'Cadmium108', u: false, m: 108, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 60, b:null }, { f: Electron, a: 48, b:null }] };
const Cd110 = { n: 'Cadmium110', u: false, m: 110, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 62, b:null }, { f: Electron, a: 48, b:null }] };
const Cd111 = { n: 'Cadmium111', u: false, m: 111, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 63, b:null }, { f: Electron, a: 48, b:null }] };
const Cd112 = { n: 'Cadmium112', u: false, m: 112, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 64, b:null }, { f: Electron, a: 48, b:null }] };
const Cd113 = { n: 'Cadmium113', u: false, m: 113, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 65, b:null }, { f: Electron, a: 48, b:null }] };
const Cd114 = { n: 'Cadmium114', u: false, m: 114, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 66, b:null }, { f: Electron, a: 48, b:null }] };
const Cd116 = { n: 'Cadmium116', u: false, m: 116, s: MassUnits.Da, c: [{ f: Proton, a: 48, b:null }, { f: Neutron, a: 68, b:null }, { f: Electron, a: 48, b:null }] };
const In113 = { n: 'Indium113', u: false, m: 113, s: MassUnits.Da, c: [{ f: Proton, a: 49, b:null }, { f: Neutron, a: 64, b:null }, { f: Electron, a: 49, b:null }] };
const In115 = { n: 'Indium115', u: false, m: 115, s: MassUnits.Da, c: [{ f: Proton, a: 49, b:null }, { f: Neutron, a: 66, b:null }, { f: Electron, a: 49, b:null }] };
const Sn112 = { n: 'Tin112', u: false, m: 112, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 62, b:null }, { f: Electron, a: 50, b:null }] };
const Sn114 = { n: 'Tin114', u: false, m: 114, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 64, b:null }, { f: Electron, a: 50, b:null }] };
const Sn115 = { n: 'Tin115', u: false, m: 115, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 65, b:null }, { f: Electron, a: 50, b:null }] };
const Sn116 = { n: 'Tin116', u: false, m: 116, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 66, b:null }, { f: Electron, a: 50, b:null }] };
const Sn117 = { n: 'Tin117', u: false, m: 117, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 67, b:null }, { f: Electron, a: 50, b:null }] };
const Sn118 = { n: 'Tin118', u: false, m: 118, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 68, b:null }, { f: Electron, a: 50, b:null }] };
const Sn119 = { n: 'Tin119', u: false, m: 119, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 69, b:null }, { f: Electron, a: 50, b:null }] };
const Sn120 = { n: 'Tin120', u: false, m: 120, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 70, b:null }, { f: Electron, a: 50, b:null }] };
const Sn122 = { n: 'Tin122', u: false, m: 122, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 72, b:null }, { f: Electron, a: 50, b:null }] };
const Sn124 = { n: 'Tin124', u: false, m: 124, s: MassUnits.Da, c: [{ f: Proton, a: 50, b:null }, { f: Neutron, a: 74, b:null }, { f: Electron, a: 50, b:null }] };
const Sb121 = { n: 'Antimony121', u: false, m: 121, s: MassUnits.Da, c: [{ f: Proton, a: 51, b:null }, { f: Neutron, a: 68, b:null }, { f: Electron, a: 51, b:null }] };
const Sb123 = { n: 'Antimony123', u: false, m: 123, s: MassUnits.Da, c: [{ f: Proton, a: 51, b:null }, { f: Neutron, a: 70, b:null }, { f: Electron, a: 51, b:null }] };
const Te120 = { n: 'Tellurium120', u: false, m: 120, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 68, b:null }, { f: Electron, a: 52, b:null }] };
const Te122 = { n: 'Tellurium122', u: false, m: 122, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 70, b:null }, { f: Electron, a: 52, b:null }] };
const Te123 = { n: 'Tellurium123', u: false, m: 123, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 71, b:null }, { f: Electron, a: 52, b:null }] };
const Te124 = { n: 'Tellurium124', u: false, m: 124, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 72, b:null }, { f: Electron, a: 52, b:null }] };
const Te125 = { n: 'Tellurium125', u: false, m: 125, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 73, b:null }, { f: Electron, a: 52, b:null }] };
const Te126 = { n: 'Tellurium126', u: false, m: 126, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 74, b:null }, { f: Electron, a: 52, b:null }] };
const Te128 = { n: 'Tellurium128', u: false, m: 128, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 76, b:null }, { f: Electron, a: 52, b:null }] };
const Te130 = { n: 'Tellurium130', u: false, m: 130, s: MassUnits.Da, c: [{ f: Proton, a: 52, b:null }, { f: Neutron, a: 78, b:null }, { f: Electron, a: 52, b:null }] };
const I127 = { n: 'Iodine127', u: false, m: 127, s: MassUnits.Da, c: [{ f: Proton, a: 53, b:null }, { f: Neutron, a: 74, b:null }, { f: Electron, a: 53, b:null }] };
const Xe124 = { n: 'Xenon124', u: false, m: 124, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 70, b:null }, { f: Electron, a: 54, b:null }] };
const Xe126 = { n: 'Xenon126', u: false, m: 126, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 72, b:null }, { f: Electron, a: 54, b:null }] };
const Xe128 = { n: 'Xenon128', u: false, m: 128, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 74, b:null }, { f: Electron, a: 54, b:null }] };
const Xe129 = { n: 'Xenon129', u: false, m: 129, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 75, b:null }, { f: Electron, a: 54, b:null }] };
const Xe130 = { n: 'Xenon130', u: false, m: 130, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 76, b:null }, { f: Electron, a: 54, b:null }] };
const Xe131 = { n: 'Xenon131', u: false, m: 131, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 77, b:null }, { f: Electron, a: 54, b:null }] };
const Xe132 = { n: 'Xenon132', u: false, m: 132, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 78, b:null }, { f: Electron, a: 54, b:null }] };
const Xe134 = { n: 'Xenon134', u: false, m: 134, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 80, b:null }, { f: Electron, a: 54, b:null }] };
const Xe136 = { n: 'Xenon136', u: false, m: 136, s: MassUnits.Da, c: [{ f: Proton, a: 54, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 54, b:null }] };
const Cs133 = { n: 'Cesium133', u: false, m: 133, s: MassUnits.Da, c: [{ f: Proton, a: 55, b:null }, { f: Neutron, a: 78, b:null }, { f: Electron, a: 55, b:null }] };
const Ba130 = { n: 'Barium130', u: false, m: 130, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 74, b:null }, { f: Electron, a: 56, b:null }] };
const Ba132 = { n: 'Barium132', u: false, m: 132, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 76, b:null }, { f: Electron, a: 56, b:null }] };
const Ba134 = { n: 'Barium134', u: false, m: 134, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 78, b:null }, { f: Electron, a: 56, b:null }] };
const Ba135 = { n: 'Barium135', u: false, m: 135, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 79, b:null }, { f: Electron, a: 56, b:null }] };
const Ba136 = { n: 'Barium136', u: false, m: 136, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 80, b:null }, { f: Electron, a: 56, b:null }] };
const Ba137 = { n: 'Barium137', u: false, m: 137, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 81, b:null }, { f: Electron, a: 56, b:null }] };
const Ba138 = { n: 'Barium138', u: false, m: 138, s: MassUnits.Da, c: [{ f: Proton, a: 56, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 56, b:null }] };
const La138 = { n: 'Lanthanum138', u: false, m: 138, s: MassUnits.Da, c: [{ f: Proton, a: 57, b:null }, { f: Neutron, a: 81, b:null }, { f: Electron, a: 57, b:null }] };
const La139 = { n: 'Lanthanum139', u: false, m: 139, s: MassUnits.Da, c: [{ f: Proton, a: 57, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 57, b:null }] };
const Ce136 = { n: 'Cerium136', u: false, m: 136, s: MassUnits.Da, c: [{ f: Proton, a: 58, b:null }, { f: Neutron, a: 78, b:null }, { f: Electron, a: 58, b:null }] };
const Ce138 = { n: 'Cerium138', u: false, m: 138, s: MassUnits.Da, c: [{ f: Proton, a: 58, b:null }, { f: Neutron, a: 80, b:null }, { f: Electron, a: 58, b:null }] };
const Ce140 = { n: 'Cerium140', u: false, m: 140, s: MassUnits.Da, c: [{ f: Proton, a: 58, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 58, b:null }] };
const Ce142 = { n: 'Cerium142', u: false, m: 142, s: MassUnits.Da, c: [{ f: Proton, a: 58, b:null }, { f: Neutron, a: 84, b:null }, { f: Electron, a: 58, b:null }] };
const Pr141 = { n: 'Praseodymium141', u: false, m: 141, s: MassUnits.Da, c: [{ f: Proton, a: 59, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 59, b:null }] };
const Nd142 = { n: 'Nedymium142', u: false, m: 142, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 60, b:null }] };
const Nd143 = { n: 'Nedymium143', u: false, m: 143, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 83, b:null }, { f: Electron, a: 60, b:null }] };
const Nd144 = { n: 'Nedymium144', u: false, m: 144, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 84, b:null }, { f: Electron, a: 60, b:null }] };
const Nd145 = { n: 'Nedymium145', u: false, m: 145, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 85, b:null }, { f: Electron, a: 60, b:null }] };
const Nd146 = { n: 'Nedymium146', u: false, m: 146, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 86, b:null }, { f: Electron, a: 60, b:null }] };
const Nd148 = { n: 'Nedymium148', u: false, m: 148, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 88, b:null }, { f: Electron, a: 60, b:null }] };
const Nd150 = { n: 'Nedymium150', u: false, m: 150, s: MassUnits.Da, c: [{ f: Proton, a: 60, b:null }, { f: Neutron, a: 90, b:null }, { f: Electron, a: 60, b:null }] };
const Pm145 = { n: 'Promethium145', u: false, m: 145, s: MassUnits.Da, c: [{ f: Proton, a: 61, b:null }, { f: Neutron, a: 84, b:null }, { f: Electron, a: 61, b:null }] };
const Sm144 = { n: 'Samarium144', u: false, m: 144, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 82, b:null }, { f: Electron, a: 62, b:null }] };
const Sm147 = { n: 'Samarium147', u: false, m: 147, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 85, b:null }, { f: Electron, a: 62, b:null }] };
const Sm148 = { n: 'Samarium148', u: false, m: 148, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 86, b:null }, { f: Electron, a: 62, b:null }] };
const Sm149 = { n: 'Samarium149', u: false, m: 149, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 87, b:null }, { f: Electron, a: 62, b:null }] };
const Sm150 = { n: 'Samarium150', u: false, m: 150, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 88, b:null }, { f: Electron, a: 62, b:null }] };
const Sm152 = { n: 'Samarium152', u: false, m: 152, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 90, b:null }, { f: Electron, a: 62, b:null }] };
const Sm154 = { n: 'Samarium154', u: false, m: 154, s: MassUnits.Da, c: [{ f: Proton, a: 62, b:null }, { f: Neutron, a: 92, b:null }, { f: Electron, a: 62, b:null }] };
const Eu151 = { n: 'Europium151', u: false, m: 151, s: MassUnits.Da, c: [{ f: Proton, a: 63, b:null }, { f: Neutron, a: 88, b:null }, { f: Electron, a: 63, b:null }] };
const Eu153 = { n: 'Europium153', u: false, m: 153, s: MassUnits.Da, c: [{ f: Proton, a: 63, b:null }, { f: Neutron, a: 90, b:null }, { f: Electron, a: 63, b:null }] };
const Gd152 = { n: 'Gadolinium152', u: false, m: 152, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 88, b:null }, { f: Electron, a: 64, b:null }] };
const Gd154 = { n: 'Gadolinium154', u: false, m: 154, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 90, b:null }, { f: Electron, a: 64, b:null }] };
const Gd155 = { n: 'Gadolinium155', u: false, m: 155, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 91, b:null }, { f: Electron, a: 64, b:null }] };
const Gd156 = { n: 'Gadolinium156', u: false, m: 156, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 92, b:null }, { f: Electron, a: 64, b:null }] };
const Gd157 = { n: 'Gadolinium157', u: false, m: 157, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 93, b:null }, { f: Electron, a: 64, b:null }] };
const Gd158 = { n: 'Gadolinium158', u: false, m: 158, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 94, b:null }, { f: Electron, a: 64, b:null }] };
const Gd160 = { n: 'Gadolinium160', u: false, m: 160, s: MassUnits.Da, c: [{ f: Proton, a: 64, b:null }, { f: Neutron, a: 96, b:null }, { f: Electron, a: 64, b:null }] };
const Tb159 = { n: 'Terbium159', u: false, m: 159, s: MassUnits.Da, c: [{ f: Proton, a: 65, b:null }, { f: Neutron, a: 94, b:null }, { f: Electron, a: 65, b:null }] };
const Dy156 = { n: 'Dysprosium156', u: false, m: 156, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 90, b:null }, { f: Electron, a: 66, b:null }] };
const Dy158 = { n: 'Dysprosium158', u: false, m: 158, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 92, b:null }, { f: Electron, a: 66, b:null }] };
const Dy160 = { n: 'Dysprosium160', u: false, m: 160, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 94, b:null }, { f: Electron, a: 66, b:null }] };
const Dy161 = { n: 'Dysprosium161', u: false, m: 161, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 95, b:null }, { f: Electron, a: 66, b:null }] };
const Dy162 = { n: 'Dysprosium162', u: false, m: 162, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 96, b:null }, { f: Electron, a: 66, b:null }] };
const Dy163 = { n: 'Dysprosium163', u: false, m: 163, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 97, b:null }, { f: Electron, a: 66, b:null }] };
const Dy164 = { n: 'Dysprosium164', u: false, m: 164, s: MassUnits.Da, c: [{ f: Proton, a: 66, b:null }, { f: Neutron, a: 98, b:null }, { f: Electron, a: 66, b:null }] };
const Ho165 = { n: 'Holmium165', u: false, m: 165, s: MassUnits.Da, c: [{ f: Proton, a: 67, b:null }, { f: Neutron, a: 98, b:null }, { f: Electron, a: 67, b:null }] };
const Er162 = { n: 'Erbium162', u: false, m: 162, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 94, b:null }, { f: Electron, a: 68, b:null }] };
const Er164 = { n: 'Erbium164', u: false, m: 164, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 96, b:null }, { f: Electron, a: 68, b:null }] };
const Er166 = { n: 'Erbium166', u: false, m: 166, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 98, b:null }, { f: Electron, a: 68, b:null }] };
const Er167 = { n: 'Erbium167', u: false, m: 167, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 99, b:null }, { f: Electron, a: 68, b:null }] };
const Er168 = { n: 'Erbium168', u: false, m: 168, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 100, b:null }, { f: Electron, a: 68, b:null }] };
const Er170 = { n: 'Erbium170', u: false, m: 170, s: MassUnits.Da, c: [{ f: Proton, a: 68, b:null }, { f: Neutron, a: 102, b:null }, { f: Electron, a: 68, b:null }] };
const Tm169 = { n: 'Thulium160', u: false, m: 169, s: MassUnits.Da, c: [{ f: Proton, a: 69, b:null }, { f: Neutron, a: 100, b:null }, { f: Electron, a: 69, b:null }] };
const Yb168 = { n: 'Ytterbium168', u: false, m: 168, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 98, b:null }, { f: Electron, a: 70, b:null }] };
const Yb170 = { n: 'Ytterbium170', u: false, m: 170, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 100, b:null }, { f: Electron, a: 70, b:null }] };
const Yb171 = { n: 'Ytterbium171', u: false, m: 171, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 101, b:null }, { f: Electron, a: 70, b:null }] };
const Yb172 = { n: 'Ytterbium172', u: false, m: 172, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 102, b:null }, { f: Electron, a: 70, b:null }] };
const Yb173 = { n: 'Ytterbium173', u: false, m: 173, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 103, b:null }, { f: Electron, a: 70, b:null }] };
const Yb174 = { n: 'Ytterbium174', u: false, m: 174, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 104, b:null }, { f: Electron, a: 70, b:null }] };
const Yb176 = { n: 'Ytterbium176', u: false, m: 176, s: MassUnits.Da, c: [{ f: Proton, a: 70, b:null }, { f: Neutron, a: 106, b:null }, { f: Electron, a: 70, b:null }] };
const Lu175 = { n: 'Lutetium175', u: false, m: 175, s: MassUnits.Da, c: [{ f: Proton, a: 71, b:null }, { f: Neutron, a: 104, b:null }, { f: Electron, a: 71, b:null }] };
const Lu176 = { n: 'Lutetium176', u: false, m: 176, s: MassUnits.Da, c: [{ f: Proton, a: 71, b:null }, { f: Neutron, a: 105, b:null }, { f: Electron, a: 71, b:null }] };
const Hf174 = { n: 'Hafnium174', u: false, m: 174, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 102, b:null }, { f: Electron, a: 72, b:null }] };
const Hf176 = { n: 'Hafnium176', u: false, m: 176, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 104, b:null }, { f: Electron, a: 72, b:null }] };
const Hf177 = { n: 'Hafnium177', u: false, m: 177, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 105, b:null }, { f: Electron, a: 72, b:null }] };
const Hf178 = { n: 'Hafnium178', u: false, m: 178, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 106, b:null }, { f: Electron, a: 72, b:null }] };
const Hf179 = { n: 'Hafnium179', u: false, m: 179, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 107, b:null }, { f: Electron, a: 72, b:null }] };
const Hf180 = { n: 'Hafnium180', u: false, m: 180, s: MassUnits.Da, c: [{ f: Proton, a: 72, b:null }, { f: Neutron, a: 108, b:null }, { f: Electron, a: 72, b:null }] };
const Ta181 = { n: 'Tantalum181', u: false, m: 181, s: MassUnits.Da, c: [{ f: Proton, a: 73, b:null }, { f: Neutron, a: 108, b:null }, { f: Electron, a: 73, b:null }] };

const Ac227 = { n: 'Actinium227', u: false, m: 227, s: MassUnits.Da, c: [{ f: Proton, a: 89, b:null }, { f: Neutron, a: 138, b:null }, { f: Electron, a: 89, b:null }] };
const Og293 = { n: 'Oganesson293', u: false, m: 293, s: MassUnits.Da, c: [{ f: Proton, a: 118, b:null }, { f: Neutron, a: 175, b:null }, { f: Electron, a: 118, b:null }] };

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
	n:'Copper', u:false, c:[Cu63,Cu65],
	info: ['Copper was the first metal worked by humans and was eventually mixed with tin to make bronze.']
};
const Zn = {
	n:'Zinc', u:false, c:[Zn64,Zn66,Zn67,Zn68,Zn70],
	info: ['Zinc is mostly used in a process called galvanising, this helps prevent rusting.']
};
const Ga = {
	n:'Gallium', u:false, c:[Ga69,Ga71],
	info: ['Gallium is used as part of gallium arsenide in semiconductors, lasers, and other electronics.']
};
const Ge = {
	n:'Germanium', u:false, c:[Ge70,Ge72,Ge73,Ge74,Ge76],
	info: ['Germanium is a semiconductor often mixed with arsenic or gallium and used in transistors.']
};
const As = {
	n:'Arsenic', u:false, c:[As75],
	info: ['Arsenic is most commonly known as a poison but is also used in semiconductors and has even been used in medicine.']
};
const Se = {
	n:'Selenium', u:false, c:[Se74,Se76,Se77,Se78,Se80,Se82],
	info: ['Selenium is mostly used as an additive to glass. It is also used in solar cells and copier machines.']
};
const Br = {
	n:'Bromine', u:false, c:[Br79,Br81],
	info: ['Bromine has many uses, some are being phased out for environmental reasons.']
};
const Kr = {
	n:'Krypton', u:false, c:[Kr78,Kr80,Kr82,Kr83,Kr84,Kr86],
	info: ['Krypton is often used in sluorescent lights or flash lamps for high speed photography.']
};
const Rb = {
	n:'Rubidium', u:false, c:[Rb85,Rb87],
	info: ['Rubidium is mostly used in research and has few comercial uses.']
};
const Sr = {
	n:'Strontium', u:false, c:[Sr84,Sr86,Sr87,Sr88],
	info: ['Strontium is used in red fireworks and glow-in-the-dark paints.']
};
const Y = {
	n:'Yttrium', u:false, c:[Y89],
	info: ['Yttrium is used in different alloys and in synthetic yttrium-aluminum garnets as part of metal cutting lasers.']
};
const Zr = {
	n:'Zirconium', u:false, c:[Zr90,Zr91,Zr92,Zr94,Zr96],
	info: ['Zirconium is mostly used in nuclear power stations.']
};
const Nb = {
	n:'Niobium', u:false, c:[Nb93],
	info: ['Niobium is unsed in alloys including stainless steel.']
};
const Mo = {
	n:'Molybdenum', u:false, c:[Mo92,Mo94,Mo95,Mo96,Mo97,Mo98,Mo100],
	info: ['Molybdenum is part of a hardened steel alloy used in engines.']
};
const Tc = {
	n:'Technetium', u:false, c:[Tc97],
	info: ['Technetium is a radioactive element with no stable isotopes. I included the isotope with the longest halflife.']
};
const Ru = {
	n:'Ruthenium', u:false, c:[Ru96,Ru98,Ru99,Ru100,Ru101,Ru102,Ru104],
	info: ['Ruthenium is primarily used in electronic resistors and electrical contacts or acetic acid production.']
};
const Rh = {
	n:'Rhodium', u:false, c:[103],
	info: ['Rhodium is mostly used in catalytic converters.']
};
const Pd = {
	n:'Palladium', u:false, c:[Pd102,Pd104,Pd105,Pd106,Pd108,Pd110],
	info: ['Palladium is used in catalytic converts as well as jewellry. A gold-palladium alloy is also known as white gold.']
};
const Ag = {
	n:'Silver', u:false, c:[Ag107,Ag109],
	info: ['Silver is used in jewellery and mirrors. It is the best known reflector of visible light.']
};
const Cd = {
	n:'Cadmium', u:false, c:[Cd106,Cd108,Cd110,Cd111,Cd112,Cd113,Cd114,Cd116],
	info: ['Cadmium is a poison that causes birth defects and cancer. It is used in some rechargable batteries but they are being phased out.']
};
const In = {
	n:'Indium', u:false, c:[In113,In115],
	info: ['Indium is mostly used in electronics like touch screens and solar panels.']
};
const Sn = {
	n:'Tin', u:false, c:[Sn112,Sn114,Sn115,Sn116,Sn117,Sn118,Sn119,Sn120,Sn122,Sn124],
	info: ['Tin has many uses from food storage to pewter. Bronze was one of the first alloys, made with copper and tin.']
};
const Sb = {
	n:'Antimony', u:false, c:[Sb121,Sb123],
	info: ['Antimonoy is used in some semiconductor devices like IR detectors and diodes. It is also used in a Pb-Sb alloy in batteries.']
};
const Te = {
	n:'Tellurium', u:false, c:[Te120,Te122,Te123,Te124,Te125,Te126,Te128,Te130],
	info: ['Tellurium is used in alloys with copper and stainless steel to improve strength and hardness.']
};
const I = {
	n:'Iodine', u:false, c:[I127],
	info: ['Iodine was initially used in photography in the 1800s. It is now used in pharmacuticals and disinfectants.']
};
const Xe = {
	n:'Xenon', u:false, c:[Xe124,Xe126,Xe128,Xe129,Xe130,Xe131,Xe132,Xe134,Xe136],
	info: ['Xenon is used in special light bulbs and in ion propulsion systems used by some satellites.']
};
const Cs = {
	n:'Cesium', u:false, c:[Cs133],
	info: ['Cesium is mostly used in drilling fluids. It is also used in some optical glass and radiation monitoring equipment.']
};
const Ba = {
	n:'Barium', u:false, c:[Ba130,Ba132,Ba134,Ba135,Ba136,Ba137,Ba138],
	info: ['Barium is mostly used in drilling fluids for oil and gas wells.']
};
const La = {
	n:'Lanthanum', u:false, c:[La138,La139],
	info: ['Lanthanum alloys have been used in hydrogen tanks for hydrogen powered vehicles.']
};
const Ce = {
	n:'Cerium', u:false, c:[Ce136,Ce138,Ce140,Ce142],
	info: ['Cerium oxide is used in the walls of self-cleaning ovens as well as catalytic converters.']
};
const Pr = {
	n:'Praseodymium', u:false, c:[Pr141],
	info: ['Praseodymium is used in some high-strength alloys used in aircraft engines.']
};
const Nd = {
	n:'Neodymium', u:false, c:[Nd142,Nd143,Nd144,Nd145,Nd146,Nd148,Nd150],
	info: ['Neodymium is used in an alloy with iron and boron to make strong magnets.']
};
const Pm = {
	n:'Promethium', u:false, c:[Pm145],
	info: ['Promethium is a radioactive metal that is mostly used in research. There are no stable isotopes, Pm145 has a half-life of almost 18 years.']
};
const Sm = {
	n:'Samarium', u:false, c:[Sm144,Sm147,Sm148,Sm149,Sm150,Sm152,Sm154],
	info: ['Samarium is used in an alloy with cobalt in microwaves.']
};
const Eu = {
	n:'Europium', u:false, c:[Eu151,Eu153],
	info: ['Europium glows red under UV light an dis used in printing of euro banknotes.']
};
const Gd = {
	n:'Gadolinium', u:false, c:[Gd152,Gd154,Gd155,Gd156,Gd157,Gd158,Gd160],
	info: ['Gadolinium is used in small amounts in iron and chromium alloys.']
};
const Tb = {
	n:'Terbium', u:false, c:[Tb159],
	info: ['Terbium is used in some x-ray devices and lasers.']
};
const Dy = {
	n:'Dysprosium', u:false, c:[Dy156,Dy158,Dy160,Dy161,Dy162,Dy163,Dy164],
	info: ['Dysprosium is mainly used in alloys with neodymium magnets.']
};
const Ho = {
	n:'Holmium', u:false, c:[Ho165],
	info: ['Holmium can absorb neutrons and is used in nuclear reactors.']
};
const Er = {
	n:'Erbium', u:false, c:[Er162,Er164,Er166,Er167,Er168,Er170],
	info: ['Erbium can be used in alloys to reduce hardness and improve workability.']
};
const Tm = {
	n:'Thulium', u:false, c:[Tm169],
	info: ['Thulium is used in some medical x-ray machines.']
};
const Yb = {
	n:'Ytterbium', u:false, c:[Yb168,Yb170,Yb171,Yb172,Yb173,Yb174,Yb176],
	info: ['Ytterbium can be used in some memory devices and as an industrial catalyst.']
};
const Lu = {
	n:'Lutetium', u:false, c:[Lu175,Lu176],
	info: ['Lutetium is mostly used in research.']
};
const Hf = {
	n:'Hafnium', u:false, c:[Hf174,Hf176,Hf177,Hf178,Hf179,Hf180],
	info: ['Hafnium is used in nuclear submarines and plasma welding torches.']
};
const Ta = {
	n:'Tantalum', u:false, c:[Ta181],
	info: ['Tantalum is used as an insulating coating in electronics.']
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
	n:'Oganesson', u:false, c:[Og293],
	info: ['Oganesson is only used in research. The halflife of Oganesson is 5ms.']
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
	info: ['Actinides are all radioactive and have no stable isotopes. In this game I included isotopes with the longest decay rate.']
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
	{n:'Enhance', u:false, info:['Generator Output increases the output, but not the components or max setpoint.', 'Rank cost reduces the cost required to increase the generator rank.', 'Enhancements upgrades increases the effect of the other enhancements.'], intro:'These are global Enhancements that increase generator output and reduce generator uprank cost. This breaks conservation of mass.'}, 
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
		'(») circle buttons will go to the item referenced. It will goto the item even if it is still locked through the normal menu.',
		'|',
		'A game cycle is about 1 second.',
		'Space bar pauses the game'
	]},
	{t:'Create', c:[
		'The Create tab lets you create items.',
		'|',
		'The Inventory (++) button will create one item from the components.',
		'|',
		'Generator level (++) button will spend an item to make generators that will create items every cycle.', 
		'Generator rank (++) button will spend generators to increase their effectiveness and reduce their cost.', 
		'|',
		'The Generator will automatically create items based on the generator set-point. It will only create items if you have the required components.',
		'For example if you have 10 Up Quarks and have a Proton set-point of 7 (Protons each need 2 Up Quarks) the Proton generators will make 5 Protons.',
	]},
	{t:'Discover', c:[
		'The Discover tab is the main way to gain access to new item types.',
		'|',
		'Add items to the matter mutator box and scan the items. If it has the items for a recipe that exists in the data file you will unlock the item.',
		'Unfortunately, the game data is not complete but will be expanded in the future.',
		'|',
		'There is no penalty for scanning items that do not match a recipe.',
		'If you are stuck or want a recipe hint you can click the "Generate Discoverable Recipe" button',
		'|',
		'Discover tab is unlocked when a generator is over level 3.'
	]},
	{t:'Manage', c:[
		'The Manage tab is where you can manage your generators. It displays the input and output of each generator and the amount created and used during the last update.',
		'|',
		'The Manage table has several filters to help manage the resources.',
		'Hide Created === 0 : will hide all rows that where no items were created.',
		'Hide Created === Setpoint : will hide all rows where the generator setpoint was achieved.',
		'Hide Created < Setpoint : will hide all the rows where the generator setpoint was not achieved',
		'Hide Created < Used : will hide all the rows with a deficit',
		'|',
		'Hide Used === 0 : will hide all the rows where no items were used.',
		'Hide Used === Demand : will hide all rows where the expected demand was achieved',
		'Hide Used < Demand : will hide all rows where the expected demand was not achieved',
		'Hide Used < Created : will hide all rows with a surplus',
		'|',
		'The table columns describe the supply and demand of each item.',
		'Name : is the name of the item. Hover to see the full name.',
		'Owned : is the amount of the itme you current own.',
		'Setpoint : is the generator setpoint, or the maximum amount that should be created.',
		'Demand : is the expected demand if all setpoints are achieved',
		'Created : is the actual amount created in the last cycle',
		'Used : is the actual amount used in creating other items last cycle. This does not include items used in upgrading generators',
		'|',
		'Manage tab is unlocked when a generator for an item with components (not a quark or lepton) is over level 1.'
	]},
	{t:'Enhance', c:[
		'This tab allows you to break conservation of mass by multiplying generator outputs.',
		'This does not change the setpoint limits, it multiplies the created amount.',
		'|',
		'Enhancement costs are generated programatically based on a list of all items and the enhancement level. This means that when new items are added to the game it can effect the enhancement costs.',
		'|',
		'Enhance tab is unlocked when a generator for an item with components (not a quark or lepton) is over rank 3.'
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
		'The isotopes I included are the bolded ones listed on https://periodictable.com; I think they bold stable isotopes and isotopes with a half-life over ~10^9 years.',
		'If there are no bolded isotopes for a given element I used the one with the largest half-life.',
		'I looked up additional information, such as uses, here: https://www.rsc.org/periodic-table',
		'|',
		'Molecules will be grouped according to IUPAC and ChatGPT.',
		'|',
		'The other items are included as I get to it.',
		'|',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
		'|',
		'This game was initially started as a way to learn mutraction, but I encountered some memory leaks. These leaks have since been resolved. I might go back and retry making the UI in mutraction.',
		'I decided to try making a game that has a simple UI but is very data heavy. As a result the html file is pretty small and most content is generated based on the data.js file.',
		'It ended up less general than I initially hoped and more specific to this game, but in the end I mostly like this result.'
	]},
]