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
const H1 = { n: 'Protium', u: false, m: 1, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const H2 = { n: 'Deuterium', u: false, m: 2, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 1, b:null }] };
const H3 = { n: 'Tritium', u: false, m: 3, s: MassUnits.Da, c: [{ f: Proton, a: 1, b:null }, { f: Neutron, a: 2, b:null }, { f: Electron, a: 1, b:null }] };
const He3 = { n: 'Helium3', u: false, m: 3, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 1, b:null }, { f: Electron, a: 2, b:null }] };
const He4 = { n: 'Helium4', u: false, m: 4, s: MassUnits.Da, c: [{ f: Proton, a: 2, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 2, b:null }] };
const Li6 = { n: 'Lithium6', u: false, m: 6, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 3, b:null }, { f: Electron, a: 3, b:null }] };
const Li7 = { n: 'Lithium7', u: false, m: 7, s: MassUnits.Da, c: [{ f: Proton, a: 3, b:null }, { f: Neutron, a: 4, b:null }, { f: Electron, a: 3, b:null }] };
const Be9 = { n: 'Beryllium9', u: false, m:9, s: MassUnits.Da, c: [{ f: Proton, a: 4, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 4, b:null }] };
const Be10 = { n: 'Beryllium10', u: false, m:10, s: MassUnits.Da, c: [{ f: Proton, a: 4, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 4, b:null }] };
const B10 = { n: 'Boron10', u: false, m:10, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 5, b:null }, { f: Electron, a: 5, b:null }] };
const B11 = { n: 'Boron11', u: false, m:11, s: MassUnits.Da, c: [{ f: Proton, a: 5, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 5, b:null }] };
const C12 = { n: 'Carbon12', u: false, m:12, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 6, b:null }, { f: Electron, a: 6, b:null }] };
const C13 = { n: 'Carbon13', u: false, m:13, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 6, b:null }] };
const C14 = { n: 'Carbon14', u: false, m:14, s: MassUnits.Da, c: [{ f: Proton, a: 6, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 6, b:null }] };
const N14 = { n: 'Nitrogen14', u: false, m:14, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 7, b:null }, { f: Electron, a: 7, b:null }] };
const N15 = { n: 'Nitrogen15', u: false, m:15, s: MassUnits.Da, c: [{ f: Proton, a: 7, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 7, b:null }] };
const O16 = { n: 'Oxygen16', u: false, m:16, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 8, b:null }, { f: Electron, a: 8, b:null }] };
const O17 = { n: 'Oxygen17', u: false, m:17, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 9, b:null }, { f: Electron, a: 8, b:null }] };
const O18 = { n: 'Oxygen18', u: false, m:18, s: MassUnits.Da, c: [{ f: Proton, a: 8, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 8, b:null }] };
const F19 = { n: 'Fluorine19', u: false, m:19, s: MassUnits.Da, c: [{ f: Proton, a: 9, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 9, b:null }] };
const Ne20 = { n: 'Neon20', u: false, m: 20, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 10, b:null }, { f: Electron, a: 10, b:null }] };
const Ne21 = { n: 'Neon21', u: false, m: 21, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 11, b:null }, { f: Electron, a: 10, b:null }] };
const Ne22 = { n: 'Neon22', u: false, m: 22, s: MassUnits.Da, c: [{ f: Proton, a: 10, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 10, b:null }] };
const Na22 = { n: 'Sodium22', u: false, m: 22, s: MassUnits.Da, c: [{ f: Proton, a: 11, b:null }, { f: Neutron, a: 11, b:null }, { f: Electron, a: 11, b:null }] };
const Na23 = { n: 'Sodium23', u: false, m: 23, s: MassUnits.Da, c: [{ f: Proton, a: 11, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 11, b:null }] };
const Mg24 = { n: 'Magnesium24', u: false, m: 24, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 12, b:null }, { f: Electron, a: 12, b:null }] };
const Mg25 = { n: 'Magnesium25', u: false, m: 25, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 13, b:null }, { f: Electron, a: 12, b:null }] };
const Mg26 = { n: 'Magnesium26', u: false, m: 26, s: MassUnits.Da, c: [{ f: Proton, a: 12, b:null }, { f: Neutron, a: 14, b:null }, { f: Electron, a: 12, b:null }] };
const Al26 = { n: 'Aluminum26', u: false, m: 26, s: MassUnits.Da, c: [{ f: Proton, a: 13, b:null }, { f: Neutron, a: 13, b:null }, { f: Electron, a: 13, b:null }] };
const Al27 = { n: 'Aluminum27', u: false, m: 27, s: MassUnits.Da, c: [{ f: Proton, a: 13, b:null }, { f: Neutron, a: 14, b:null }, { f: Electron, a: 13, b:null }] };

const Ac227 = { n: 'Actinium227', u: false, m: 227, s: MassUnits.Da, c: [{ f: Proton, a: 89, b:null }, { f: Neutron, a: 138, b:null }, { f: Electron, a: 89, b:null }] };

//const asd = { n: '', u: false, m: 00, s: MassUnits.Da, c: [{ f: Proton, a: 00, b:null }, { f: Neutron, a: 00, b:null }, { f: Electron, a: 00, b:null }] };


//items
const Quark = {
    n: 'Quark', u: true, t: 0, c: [Q_Up, Q_Down],
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.']
};
const Lepton = {
    n: 'Lepton', u: true, t: .6, c: [Electron],
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.']
};
const Baryon = {
    n: 'Baryon', u: false, t: .8, c: [Proton, Neutron],
    info: ['Baryons are made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.']
};
const H = {
    n: 'Hydrogen', u: false, t: 1, c: [H1, H2, H3],
    info: ['Hydrogen is the most common element in the universe, made with only a single proton. There are two stable isotopes and a third with a halflife of ~12 years. Hydrogen is highly flamable and lighter than air.']
};
const He = {
    n: 'Helium', u: false, t: 1, c: [He3, He4],
    info: ['Helium-3 is much more rare than the normal Helium-4. Helium is lighter than air.']
};
const Li = {
    n: 'Lithium', u: false, t: 1, c: [Li6, Li7],
    info: ['Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.']
};
const Be = {
	n: 'Beryllium', u:false, t:1, c: [Be9, Be10],
	info: ['Beryllium has only a single stable isotope (Be9). A second isotope with a long halflife of ~1.4 million years is used in surface exposure dating.']
};
const B = {
	n:'Boron', u:false, t:1, c: [B10, B11],
	info: ['Boron is required for healthy plants.']
};
const C = {
	n:'Carbon', u:false, t:1, c: [C12, C13, C14],
	info: ['Carbon has two stable isotopes (C12 & C13). Carbon14 is has a halflife of ~5700 years and is used to date dead organic matter.']
};
const N = {
	n:'Nitrogen', u:false, t:1, c: [N14, N15],
	info: ['Nitrogen is a very abundant element and is used in many industries.']
};
const O = {
	n:'Oxygen', u:false, t:1, c: [O16, O17, O18],
	info: ['Oxygen is needed for all animals that breathe. As of now henneguya salminicola is the only known animal that does not need oxygen.']
};
const F = {
	n:'Fluorine', u: false, t:1, c:[F19],
	info: ['Fluorine only has one stable isotope. It is a highly toxic gas and is used in the creation of Teflon.']
};
const Ne = {
	n:'Neon', u:false, t:1, c: [Ne20, Ne21, Ne22 ],
	info: ['There are three stable isotopes of Neon with Neon20 being the most abundant. Neon is used in lights and advertising signs.']
};
const Na = {
	n:'Sodium', u:false, t:1, c: [Na22, Na23],
	info: ['Sodium is used in sodium vapor lamps (widely used as street lights) and sodium-ion batteries. Sodium is cheaper than lithium but sodium-ion batteries have a few engineering challenges before they are ready to replace existing Li-ion batteries.']
};
const Mg = {
	n:'Magnesium', u:false, t:1, c: [Mg24, Mg25, Mg26],
	info: ['Magnesium is essential for many human body functions including healthy bones and heart. It is found in leafy greens, nuts, seeds and more.']
};
const Al = {
	n:'Aluminum', u:false, t:1, c: [Al26, Al27],
	info: ['Aluminum, also spelled aluminium, is a very abundant metal on Earth. It is used in food storage and many other industries.']
};
const Si = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const P = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const S = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Cl = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ar = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const K = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ca = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Sc = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ti = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const V = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Cr = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Mn = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Fe = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Co = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ni = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Cu = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Zn = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ga = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ge = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const As = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Se = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Br = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Kr = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Rb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Sr = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Y = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Zr = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Nb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Mo = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Tc = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ru = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Rh = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Pd = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ag = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Cd = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const In = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Sn = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Sb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Te = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const I = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Xe = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Cs = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ba = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const La = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ce = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Pr = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Nd = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Pm = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Eu = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Gd = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Tb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Dy = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ho = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Er = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Tm = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Yb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Lu = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Hf = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ta = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const W = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Re = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Os = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Ir = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Pt = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Au = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Hg = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Tl = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Pb = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Bi = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const Po = {
	n:'', u:false, t:1, c:[],
	info: ['']
};
const At = {
	n:'', u:false, t:1, c:[],
	info: ['Astatine has no known stable isotopes; I have included the isotope with the longest decay rate of 8 hours.']
};
const Rn = {
	n:'', u:false, t:1, c:[],
	info: ['Radon has no known stable isotopes; I have included the isotope with the longest decay rate of 3.8 days.']
};
const Fr = {
	n:'', u:false, t:1, c:[],
	info: ['Francium has no known stable isotopes; I have included the isotope with the longest decay rate of 21.6 minutes.']
};
const Ra = {
	n:'', u:false, t:1, c:[],
	info: ['Radium has no known stable isotopes; I have included the isotope with a decay rate greater than 1 year at 1585.5 years.']
};
const Ac = {
	n:'Actinium', u:false, t:1, c:[Ac227],
	info: ['Actinium has no known stable isotopes; I have included the isotope with a decay rate greater than 1 year at 21.8 years.']
};
const Th = {
	n:'', u:false, t:1, c:[],
	info: ['Thorium has no known stable isotopes; I have included the isotopes with the longest decay rate greater than 1 year.']
};
const Pa = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const U = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Np = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Pu = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Am = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Cm = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Bk = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Cf = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Es = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Fm = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Md = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const No = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Lr = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Rf = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Db = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Sg = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Bh = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Hs = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Mt = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Ds = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Rg = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Cn = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Nh = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Fl = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Mc = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Lv = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Ts = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};
const Og = {
	n:'', u:false, t:1, c:[],
	info: [' ']
};

//element families
const AlkaliMetal = {
	n:'Alkali Metal', u:false,
	info: ['Alkali Metals are soft, shiny, and highly reactive.'],
	c: [Li, Na]
}
const AlkalineEarthMetal = {
	n:'Alkaline Earth Metal', u:false,
	info: ['Alkaline Earth Metals are not found free in nature, they are only found as compounds with other elements.'],
	c: [Be, Mg]
}
const Actinide = {
	n:'Actinide', u:false,
	info: ['Actinides are all radioactive and have no stable isotopes. In this game I included isotopes with a decay rate longer than a year.'],
	c: [Ac227]
}
const Chalcogen = {
	n:'Chalcogen', u:false,
	info:['Chalcogens have an unusual property called catenation, which means atoms will bond to other identical atoms. When oxygen bonds to other oxygen atoms it forms ozone.'],
	c:[O]
}
const Halogen = {
	n:'Halogen', u:false,
	info:['Halogens are only found combined with other elements in nature.'],
	c:[F]
}
const Lanthanide = {
	n:'Lanthanide', u:false,
	info: ['Lanthanide are sometimes called rare-earth elements or rare-earth metals.'],
	c: []
}
const Metalloid = {
	n:'Metalloid', u:false,
	info: ['Metalloids have properties between metals and nonmetals.'],
	c: [B]
}
const NobelGas = {
	n:'Nobel Gas', u:false,
	info: ['Noble gasses are naturally occurring and have very low reactivity.'],
	c: [He, Ne]
}
const Nonmetal = {
	n:'Other Nonmetal', u:false,
	info: ['Other nonmetals or sometimes just nonmetals are a diverse group of elements between the metalloids and halogens.'],
	c: [H, C, N]
}
const PoorMetal = {
	n:'Post-transition Metal', u:false,
	info:['Post-transition Metals go by a few names including: poor metals, other metals, p-block metals, and chemically weak metals.'],
	c:[Al]
}
const TransitionMetal = {
	n:'Transition Metal', u:false,
	info:['Transition metals are typically hard and are are a large group of elements spanning multiple columns through the middle of the table.'],
	c:[]
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
    c: [AlkaliMetal, AlkalineEarthMetal, Actinide, Chalcogen, Halogen, Lanthanide, Metalloid, NobelGas, Nonmetal, PoorMetal, TransitionMetal]
};
const molecular = {
    n: 'Molecular', u: false,
    info: ['Molecules are groups of atoms. There are countless types of molecules, this game has some.'],
    c: []
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