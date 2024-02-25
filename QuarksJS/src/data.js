"use strict";
//Adding Items:
//1) Add the item to items.js
//2) Add recipes to recipes.js
//3) Add the items to the menu in data.js

//Data Restrictions:
//Creatable item with children is unlocked if children are unlocked
	//Is probably fine, creatable item with children is abnormal (so far) anyway.
	//Also some other abnormal UX if this happens; should be avoided (for now).

//reverse lookup maps
const ParentMap = {};
const AllFlavors = {};
let AllSortedFlavors = [];
let ActualUsed = {};
let ActualCreated = {};

//items
const Quark = {
    n: 'Quark', u: true, c: [Q_Up, Q_Down],
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.', 'The mass of individual quarks is difficult to measure since they are always found inside of hadrons.']
};
const Lepton = {
    n: 'Lepton', u: true, c: [Electron],
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.', 'Electrons are the item with the least mass in this game.' ]
};
const Baryon = {
    n: 'Baryon', u: false, c: [Proton, Neutron],
    info: ['Baryons are a type of hadron made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.', 
		'Neutrons actually have slightly more mass than protons but for simplicity in this game I rounded both to 1 Da.',
		'The mass of 3 quarks does not equal the mass of one baryon. This is a result of some physics that I looked up but does not make sense to me.']
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
	n:'Iron', u:false, c:[Fe54,Fe56,Fe57,Fe58],
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
	n:'Rhodium', u:false, c:[Rh103],
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
	n:'Tungsten', u:false, c:[W180,W182,W183,W184,W186],
	info: ['Tungsten has the highest melting point of all metals and is used in incandescent light bulbs.']
};
const Re = {
	n:'Rhenium', u:false, c:[Re185,Re187],
	info: ['Rhenium has a high melting point and is often combined in alloys with tungsten and molybdenum.']
};
const Os = {
	n:'Osmium', u:false, c:[Os184,Os186,Os187,Os188,Os189,Os190,Os192],
	info: ['Osmium has few uses including fountain pen tips and electrical contacts.']
};
const Ir = {
	n:'Iridium', u:false, c:[Ir191, Ir193],
	info: ['Iridium is the most corosion resistant material known and is used in the standard meter bar.']
};
const Pt = {
	n:'Platinum', u:false, c:[Pt190,Pt192,Pt194,Pt195,Pt196,Pt198],
	info: ['Platinum is mostly used in catalytic converters but is also in jewellery and electronics.']
};
const Au = {
	n:'Gold', u:false, c:[Au197],
	info: ['Gold is often used in jewellery. 24-carat gold is pure gold, but it is often used as an alloy to improve durability.']
};
const Hg = {
	n:'Mercury', u:false, c:[Hg196,Hg198,Hg199,Hg200,Hg201,Hg202,Hg204],
	info: ['Mercury is a heavy liquid metal and is being phased out of many uses due to toxicity.']
};
const Tl = {
	n:'Thallium', u:false, c:[Tl203,Tl205],
	info: ['Thallium use is limited due to toxicity, but it is used in photoelectric cells.']
};
const Pb = {
	n:'Lead', u:false, c:[Pb204,Pb206,Pb207,Pb208],
	info: ['Lead has been used for centuries in many areas, many of them have been replaced with other materials due to negative health effects.']
};
const Bi = {
	n:'Bismuth', u:false, c:[Bi209],
	info: ['Bismuth has a low melting point and is used in fire detectors.']
};
const Po = {
	n:'Polonium', u:false, c:[Po209],
	info: ['Polonium has no known stable isotopes and has few uses outside of research.']
};
const At = {
	n:'Astatine', u:false, c:[At210],
	info: ['Astatine has no known stable isotopes and is only used in research.']
};
const Rn = {
	n:'Radon', u:false, c:[Rn222],
	info: ['Radon has no known stable isotopes but has been used in radiation therapy to treat cancer.']
};
const Fr = {
	n:'Francium', u:false, c:[Fr223],
	info: ['Francium has no known stable isotopes and has no uses.']
};
const Ra = {
	n:'Radium', u:false, c:[Ra226],
	info: ['Radium has no known stable isotopes has been used in radiation therapy to treat cancer.']
};
const Ac = {
	n:'Actinium', u:false, c:[Ac227],
	info: ['Actinium has no known stable isotopes and is rarely used outside of research.']
};
const Th = {
	n:'Thorium', u:false, c:[Th232],
	info: ['Thorium can be used as a source of nuclear power and is more abundant than uranium but is still a new technology.']
};
const Pa = {
	n:'Protactinium', u:false, c:[Pa231],
	info: ['Protactinium has no known stable isotopes and is rarely used outside of research.']
};
const U = {
	n:'Uranium', u:false, c:[U234,U235,U238],
	info: ['Uranium as a source of nuclear power and in nuclear weapons.']
};
const Np = {
	n:'Neptunium', u:false, c:[Np237],
	info: ['Neptunium has no known stable isotopes and is rarely used outside of research.']
};
const Pu = {
	n:'Plutonium', u:false, c:[Pu244],
	info: ['Plutonium is used in some nuclear weapons and nuclear energy in space crafts such as the Curiosity Rover on Mars.']
};
const Am = {
	n:'Americium', u:false, c:[Am243],
	info: ['Americium mostly used in smoke alarms.']
};
const Cm = {
	n:'Curium', u:false, c:[Cm247],
	info: ['Curium has been used as a power source in space missions.']
};
const Bk = {
	n:'Berkelium', u:false, c:[Bk247],
	info: ['Berkelium has no known stable isotopes and is used in research.']
};
const Cf = {
	n:'Californium', u:false, c:[Cf251],
	info: ['Californium can be used in portable metal detectors.']
};
const Es = {
	n:'Einsteinium', u:false, c:[Es252],
	info: ['Einsteinium has no known stable isotopes and is only used in research.']
};
const Fm = {
	n:'Fermium', u:false, c:[Fm257],
	info: ['Fermium has no known stable isotopes and is only used in research.']
};
const Md = {
	n:'Mendelevium', u:false, c:[Md258],
	info: ['Mendelevium has no known stable isotopes and is only used in research.']
};
const No = {
	n:'Nobelium', u:false, c:[No261],
	info: ['Nobelium has no known stable isotopes and is only used in research.']
};
const Lr = {
	n:'Lawrencium', u:false, c:[Lr264],
	info: ['Lawrencium has no known stable isotopes and is only used in research.']
};
const Rf = {
	n:'Rutherfordium', u:false, c:[Rf265],
	info: ['Rutherfordium has no known stable isotopes and is only used in research.']
};
const Db = {
	n:'Dubnium', u:false, c:[Db268],
	info: ['Dubnium has no known stable isotopes and is only used in research.']
};
const Sg = {
	n:'Seaborgium', u:false, c:[Sg271],
	info: ['Seaborgium has no known stable isotopes and is only used in research.']
};
const Bh = {
	n:'Bohrium', u:false, c:[Bh273],
	info: ['Bohrium has no known stable isotopes and is only used in research.']
};
const Hs = {
	n:'Hassium', u:false, c:[Hs276],
	info: ['Hassium has no known stable isotopes and is only used in research.']
};
const Mt = {
	n:'Meitnerium', u:false, c:[Mt278],
	info: ['Meitnerium has no known stable isotopes and is only used in research.']
};
const Ds = {
	n:'Darmstadtium', u:false, c:[Ds281],
	info: ['Darmstadtium has no known stable isotopes and is only used in research.']
};
const Rg = {
	n:'Roentgenium', u:false, c:[Rg283],
	info: ['Roentgenium has no known stable isotopes and is only used in research.']
};
const Cn = {
	n:'Copernicium', u:false, c:[Cn285],
	info: ['Copernicium has no known stable isotopes and is only used in research.']
};
const Nh = {
	n:'Nihonium', u:false, c:[Nh287],
	info: ['Nihonium has no known stable isotopes and is only used in research.']
};
const Fl = {
	n:'Flerovium', u:false, c:[Fl289],
	info: ['Flerovium has no known stable isotopes and is only used in research.']
};
const Mc = {
	n:'Moscovium', u:false, c:[Mc291],
	info: ['Moscovium has no known stable isotopes and is only used in research.']
};
const Lv = {
	n:'Livermorium', u:false, c:[Lv292],
	info: ['Livermorium has no known stable isotopes and is only used in research.']
};
const Ts = {
	n:'Tennessine', u:false, c:[Ts292],
	info: ['Tennessine has no known stable isotopes and is only used in research.']
};
const Og = {
	n:'Oganesson', u:false, c:[Og293],
	info: ['Oganesson has no known stable isotopes and is only used in research.']
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

const primaryAmine = {
	n:'Primary Amine', u:false, c:[methylamine],
	info: ['Primary Amines are an ammonia molecule with one hydrogen replaced with a hydrocarbon.']
}
const secondaryAmine = {
	n:'Secondary Amine', u:false, c:[dimethylamine],
	info: ['Secondary Amines are an ammonia molecule with two hydrogen replaced with a hydrocarbon.']
}
const tertiaryAmine = {
	n:'Tertiary Amine', u:false, c:[trimethylamine],
	info: ['Tertiary Amines are an ammonia molecule with all three hydrogen replaced with a hydrocarbon.']
}

//trinitrotouline: toluene + 3water + 3nitro = TNT + 3x hydronium (h3o)

const aliphaticAmide = {
	n:'Aliphatic Amide', u:false, c:[acetamide],//from acetic acid + ammonia = acetamide + water
	info: ['Aliphatic amides bond the nitrogen to an alkyl group.']
}
const aromaticAmide = {
	n:'Aromatic Amide', u:false, c:[benzamide],//from benzoic acid + ammonia = benzamide + water
	info: ['Aromatic amides bond the nitrogen to an aryl group.']
}


//IUPAC functional groups
const alkane = {
	n:'Alkane', u:false, c:[methane,ethane,propane,butane],
	info: ['Alkanes are saturaded hydrocarbons, meaning they consist of hydrogen and carbon with single covalent bonds between carbon atoms.']
}
const alkene = {
	n:'Alkene', u:false, c:[ethene, propene, butene],
	info: ['Alkenes are hydrocarbons with at least one carbon atom double bonded to another carbon atom.']
}
const alkyne = {
	n:'Alkyne', u:false, c:[ethyne,propyne,butyne],
	info: ['Alkenes are hydrocarbons with at least one carbon atom triple bonded to another carbon atom.']
}
const benzeneRing = {
	n:'Benzene Ring', u:false, c:[benzene, toluene],
	info: ['A benzene ring contains a cyclic hydrocarbon.']
}
const amine = {
	n:'Amine', u:false, c:[primaryAmine,secondaryAmine,tertiaryAmine],
	info: ['Amines contain a nitrogen and hydrogen bonded to a hydrocarbon.']
}
const alcohol = {
	n:'Alcohol', u:false, c:[methanol, ethanol],//isopropanol, butanol, glycerol, propylene glycol
	info: ['Alcohols are an oganic compound that contain a hydroxyl group OH bonded to a carbon atom.']
}
const hydroxyl = {
	n:'Hydroxyl', u:false, c:[],
	info: ['']
}
const carbonyl = {
	n:'Carbonyl', u:false, c:[],
	info: ['']
}

const ether = {
	n:'Ether', u:false, c:[],
	info: ['']
}
const alkylHalide = {
	n:'Alkyl Halide', u:false, c:[],
	info: ['']
}
const thiol = {
	n:'Thiol', u:false, c:[],
	info: ['']
}
const aldehyde = {
	n:'Aldehyde', u:false, c:[],
	info: ['']
}
const ketone = {
	n:'Ketone', u:false, c:[],
	info: ['']
}
const ester = {
	n:'Ester', u:false, c:[],
	info: ['']
}
const carboxylicAcid = {
	n:'Carboxylic Acid', u:false, c:[aceticAcid,formicAcid,benzoicAcid],
	info: ['Carboxylic acids are generally weak acids that contain a carboxyl group of COOH.']
}
const amide = {
	n:'Amide', u:false, c:[aliphaticAmide,aromaticAmide],
	info: ['Amides contain a carbonyl group C=0 bonded to a nitrogen atom.']
}
const nitrile = {
	n:'Nitrile', u:false, c:[],
	info: ['Nitriles have a carbon atom triple bonded to a nitrogen atom.']
}


const carbohydrate = {
	n:'Carbohydrate', u:false, c:[],
	info: ['Carbohydrate is not an actual IUPAC functional group, but I thought it made sense to include it as a group.']
}

//epoxide,imine,acidChloride,anhydride (carboxylic Anhydride?), nitro, sulfide(thioether), azide
const organicFunctionalGroup = {
	n:'Functional Groups', u:false, c:[alkane,alkene,alkyne,benzeneRing,amine,alcohol,hydroxyl,carbonyl,ether,alkylHalide,thiol,aldehyde,ketone,ester,carboxylicAcid,amide,nitrile],
	info:['Functional groups organize organic compounds with similar characteristic chemical reactions.']
}

const organic = {
	n:'Organic Compounds', u:false, c:[organicFunctionalGroup],
	info:['Organic compounds contain bonded carbon and hydrogen atoms along with other elements.']
}

const binaryHydride = {
	n:'Binary Hydride', u:false, c:[ammonia,water],
	info:['Binary hydrides contain hydrogen and one other element.']
}
const binaryOxide = {
	n:'Binary Oxide', u:false, c:[water,carbonMonoxide,carbonDioxide],
	info:['Binary oxides contain hydrogen and one other element.']
}

const steel = {
	n:'Steel', u:false, c:[mildSteel,highSteel],
	info:['Steel is an iron alloy with a small amount of carbon.', 'There are many types of steel alloys, I have included a few recipes based on some average inputs.']
}
const metalAlloys = {
	n:'Metal Alloys', u:false, c:[steel],
	info:['Metal alloys are materials composed of a metal and one or more other elements.']
}

const acid = {
	n:'Acid', u:false, c:[HCl,H2SO4],
	info:['Acids generally contain hydrogen ions that can dissociate in water.']
}

const base = {
	n:'Base', u:false, c:[NaOH],
	info:['Bases react with the hydrogen ions and neutralize the acids.']
}


const salt = {
	n:'Salts', u:false, c:[NaCl,KCl],
	info:['Salts can be formed as a result of combining acids and bases.']
}

const allotrope = {
	n:'Allotrope', u:false, c:[dihydrogen,deuteratedDihydrogen,dioxygen],
	info:['Allotropes are homonuclear molecules that have atoms of the same element.']
}
const binaryCompound = {
	n:'Binary Compounds', u:false, c:[binaryHydride,binaryOxide],
	info:['Binary compounds have two unique elements.', 'In this game I put binary compounds that don\'t fit in other groups here']
}

const simpleCompounds = {
	n:'Simple Compounds', u:false, c:[allotrope,binaryCompound],
	info:['Simple Compounds are still made on a molecular level and have few elements.']
}


const inorganic = {
	n:'Inorganic Compounds', u:false, c:[simpleCompounds,metalAlloys,salt,acid,base],
	info:['Inorganic compounds do not contain carbon-hydrogen bonds.']
}

//magnitude groups
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
    c: [inorganic,organic]
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

const test_0 = { n: 'test_0', m: new Amount({Da:1}), o: [], i: [] };
const test_1 = { n: 'test_1', m: new Amount({Da:2}), o: [], i: [] };
const test_2 = { n: 'test_2', m: new Amount({Da:3}), o: [{a:1, f:test_0}], i: [] };
const test_3 = { n: 'test_3', m: new Amount({Da:4}), o: [], i: [{f:test_1, a:1, b:null}], info:['Creatable item with also children'], c:[test_0] };
const test_4 = { n: 'test_4', m: new Amount({Da:5}), o: [], i: [{f:test_0, a:0, b:new Amount({Da:3})}] };
const test_5 = { n: 'test_5', m: new Amount({Da:5}), o: [], i: [{f:test_1, a:0, b:new Amount({Da:1})}, {f:test_0, a:1, b:null}] };
const test_6 = { n: 'test_6', m: new Amount({Da:5}), o: [], i: [{f:test_1, a:1, b:new Amount({Da:1})}, {f:test_2, a:1, b:null}] };

const test_a = { n: 'test_a', c:[test_0,test_1], info:['Test Group A: test_1 in two groups'] };
const test_b = { n: 'test_b', c:[test_1,test_2], info:['Test Group B: test_1 in two groups'] };
const test_c = { n: 'test_c', c:[test_3], info:['Test Group C: test creatable item with child item'] };//This kind of works, but could be better.
const test_d = { n: 'test_d', c:[test_4,test_5,test_6], info:['Test Group D: test bulk component ingredients'] };


const test = {
	n:'Test', u:true, c: [test_a,test_b,test_c,test_d],
	info: ['Test group for testing']
}

const items = [
	//test,
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
	{n:'Create', u:true, c:items, info:['Imagination is the beginning of creation.'], intro:'As the tab title suggests, this is where you will create items. Items are grouped by categories; some items may be in more than one category.'}, 
	{n:'Discover', u:false, info:['He who never made a mistake never made a discovery.', 'Use the "Get Recipe" button if you get stuck.'], intro:'This is the main place for discovering new resources. Click a (+>) button to add an item to the Matter Mutator. Click a (--) button to remove an item from the Matter Mutator. Try different combinations and click the "Scan" button. You can only add an item if you have some and it is not already in the matter mutator. Scanning items does not destroy them.'}, 
	{n:'Manage', u:false, info:['If demand is greater than supply you have a deficit.'], intro:'This is a central location to monitor item supply and demand.'}, 
	{n:'Enhance', u:false, info:['Generator Output increases the output, but not the components or max setpoint.', 'Enhancements upgrades increases the effect of the other enhancements.'], intro:'These are global Enhancements that increase generator output and reduce generator upgrade cost. They do not change the set-point limits or generator levels.'}, 
	{n:'Settings', u:true, info:['Settings can effect game mechanics and page contents.'], intro:'This is where you can change settings.'}, 
	{n:'Help', u:true, info:['This is an idle crafting game focusing on discovery and supply flow management.'], intro:'Click on a subject category below for more information.'}
];

const help = [
	{t:'General', c:[
		'This is a crafting/discovery game with some supply chain management.',
		'|',
		'You initially start by crafting subatomic materials but can eventually create increasingly larger items.',
		'Unfortunately the data file is missing several items that exist in the universe so there is some trial and error in discovering what items are craftable.',
		'|',
		'(») Goto buttons will go to the item referenced. It will goto the item even if it is still locked through the normal menu.',
		'(->) Generate buttons will manually run the item generator.',
		'(++) Upgrade buttons will upgrade the generator or enhancement.',
		'(+>) Add buttons will add an item to the Matter Mutator in the Discover tab.',
		'|',
		'A game cycle is about 1 second.',
		'The Spacebar pauses the game'
	]},
	{t:'Create', c:[
		'The Create tab lets you create items.',
		'|',
		'The Inventory shows how many of the given item  you have. You can have up to 1125899906842624 (2^50) of any given item.',
		'Bulk storage storage is where surplus inventory is stored and is used in some generators.',		
		'Bulk storage is available on items that have an inventory > 1048576 (2^20).',
		'|',
		'Generator generate (->) button will manually run the generator. There is a bonus for manually running a low level generators to help get started with new items.', 
		'Generator level (++) button will upgrade generators that will automatically create items every cycle.', 
		'Note: generators with multiple outputs will use all outputs to upgrade the generator.',
		'|',
		'The Generator will automatically create items based on the generator Flow. It will only create items if you have the required components.',
		'For example if you have 10 Up Quarks, 10 Down Quarks, and have a Proton Flow set to 7 (Protons each need 2 Up Quarks and 1 Down Quark) the Proton generator is limited by Up Quarks and will make 5 Protons.',
		'|',
		'Auto-upgrade will automatically upgrade a generator when it has at least double the cost in inventory. This is to avoid limiting other generator\'s production.',
		'An item\'s "Used In" list is available for items when it has a generator level over 2.',
	]},
	{t:'Discover', c:[
		'The Discover tab is a fun way to gain access to new items.',
		'|',
		'Add items to the matter mutator box and scan the items. If it has the items for a recipe that exists in the data file you will unlock the item.',
		'Unfortunately, the game data is not complete but will be expanded in the future.',
		'|',
		'There is no penalty for scanning items that do not match a recipe.',
		'If you are stuck or want a recipe hint you can click the "Get Recipe" button',
		'|',
		'You can [Get Recipe] approximately every minute. After about a minute the recipe will clear and the button will be available again.',
		'It will randomly choose a recipe for an item that is currently locked and you have all of the inputs unlocked.',
		'|',
		'The Discover tab is unlocked when a generator is over level 3.'
	]},
	{t:'Manage', c:[
		'The Manage tab is where you can manage your generators. It displays the input and output of each generator and the amount created and used during the last update.',
		'|',
		'The Manage table has several filters to help manage the resources.',
		'Hide Created === 0 : will hide all rows that have no items created.',
		'Hide Created < Setpoint : will hide all the rows where the generator setpoint was not achieved',
		'Hide Created < Used : will hide all the rows with a deficit',
		'|',
		'Hide Used === 0 : will hide all the rows where no items were used.',
		'Hide Used < Demand : will hide all rows where the expected demand was not achieved',
		'Hide Used < Created : will hide all rows with a surplus',
		'|',
		'The table columns describe the supply and demand of each item.',
		'Item : is the symbol of the item. Hover to see the full name.',
		'Owned : is the amount of the items you currently have in your inventory.',
		'Flow : is the sum of generator flow setpoints that can output this item.',
		'Demand : is the expected demand based on generator flow setpoints.',
		'Created : is the actual amount created in the last cycle.',
		'Used : is the actual amount used in creating other items last cycle. This does not include items used in upgrading generators.',
		'|',
		'The Manage tab is unlocked when a generator for an item with components (not a quark or lepton) is over level 1.'
	]},
	{t:'Enhance', c:[
		'This tab allows you to break conservation of mass by multiplying generator outputs.',
		'This does not change the setpoint limits. It multiplies the created amount by the effect power, seen to the right of the (++) button.',
		'|',
		'Enhancement costs are generated programmatically based on a list of all items and the enhancement level. This means that when new items are added to the game it can affect the enhancement costs.',
		'|',
		'The Enhance tab is unlocked when a generator for an item with components (not a quark or lepton) is over level 7.'
	]},
	{t:'Settings', c:[
		'Settings can affect the difficulty and functionality of the game.',
		'Always Show Used-In: This will disable the spoiler warning message and show the Used In list by default.',
		'Show/Hide Info: This toggles the short info snippets sprinkled around in an attempt to educate and give tips.',
		'Save/Load: You can manually save and load your game here. This can allow you to switch devices or share saves. The game automatically saves every couple minutes.',
		'Hard Reset: This resets all progress and starts over from the beginning.',
		'Cheater Mode: When this is active input items are not used in generators.',
	]},
	{t:'Sources', c:[
		'I got most of my information from:',
		'My brother',
		'https://periodictable.com',
		'https://www.rsc.org/periodic-table',
		'https://www.chemspider.com/',
		'https://webbook.nist.gov/chemistry/name-ser/',
		'https://www.masterorganicchemistry.com/2010/10/06/functional-groups-organic-chemistry/',
		'https://chat.openai.com/',
		'|',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
	]},
	{t:'About', c:[
		'This game was initially started as a way to learn mutraction but I encountered some memory leaks. These leaks have since been resolved. I might go back and retry making the UI in mutraction.',
		'I decided to try making a game that has a simple UI but is very data heavy. As a result the html file is pretty small and most content is generated based on a few data files.',
	]},
]