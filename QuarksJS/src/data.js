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

// const test_a = { id:'_test_a', n:'test_a', c:[test_0,test_1], info:['Test Group A: test_1 in two groups'] };
// const test_b = { id:'_test_b', n:'test_b', c:[test_1,test_2, test_7], info:['Test Group B: test_1 in two groups'] };
// const test_c = { id:'_test_c', n:'test_c', c:[test_3], info:['Test Group C: test creatable item with child item'] };//This kind of works, but could be better.
// const test_d = { id:'_test_d', n:'test_d', c:[test_4,test_5,test_6], info:['Test Group D: test bulk component ingredients'] };

// const test = {
	// id:'_Test', n:'Test', u:true, c: [test_a,test_b,test_c,test_d],
	// info: ['Test group for testing']
// }

const Quark = {
    id:'_0', n:'Quark', u: true, c: [Q_Up, Q_Down],
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom. In this game we are only using Up and Down.', 'The mass of individual quarks is difficult to measure since they are always found inside of hadrons.']
};
const Lepton = {
    id:'_1', n:'Lepton', u: true, c: [Electron],
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino. In this game we are only using Electrons.', 'Electrons are the item with the least mass besides photons in this game.' ]
};
const GaugeBoson = {
    id:'_2', n:'Gauge Boson', u: true, c: [Photon],
    info: ['Gauge Bosons are some of the most basic particles in particle physics. They come in 4 types: gluon, photon, z boson, and w boson. In this game we are only using Photons.', 'Photons don\'t have any mass in the traditional sense but do carry energy proportional to their frequency.', 'Photon inputs in this game are approximates and should not be relied on for real life situations.']
};

const Baryon = {
    id:'_3', n:'Baryon', u: false, c: [Proton, Neutron],
    info: ['Baryons are a type of hadron made of 3 Quarks. There are a few dozen different types of Baryons. In this game we are only using Protons and Neutrons.', 
		'Neutrons actually have slightly more mass than protons but for simplicity in this game I rounded both to 1 Da.',
		'The mass of 3 quarks does not equal the mass of one baryon. This is a result of some physics that I looked up but does not make sense to me.']
};
const H = {
    id:'_4', n:'Hydrogen', u: false, c: [H1, H2, H3],
    info: ['Hydrogen is the most common element in the universe, made with only a single proton. Hydrogen is highly flamable and lighter than air.']
};
const He = {
    id:'_5', n:'Helium', u: false, c: [He3, He4],
    info: ['Helium-3 is much more rare than the normal Helium-4. Helium is lighter than air.']
};
const Li = {
    id:'_6', n:'Lithium', u: false, c: [Li6, Li7],
    info: ['Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.']
};
const Be = {
	id:'_7', n:'Beryllium', u:false, c: [Be9],
	info: ['Beryllium has only a single stable isotope. Be10 has a halflife of ~1.4 million years is used in surface exposure dating.']
};
const B = {
	id:'_8', n:'Boron', u:false, c: [B10, B11],
	info: ['Boron is required for healthy plants.']
};
const C = {
	id:'_9', n:'Carbon', u:false, c: [C12, C13],
	info: ['Carbon is used in organic matter and many industries. C14 is has a halflife of ~5700 years and is used to date dead organic matter.']
};
const N = {
	id:'_a', n:'Nitrogen', u:false, c: [N14, N15],
	info: ['Nitrogen is a very abundant element and is used in many industries.']
};
const O = {
	id:'_b', n:'Oxygen', u:false, c: [O16, O17, O18],
	info: ['Oxygen is needed for all animals that breathe. As of now henneguya salminicola is the only known animal that does not need oxygen.']
};
const F = {
	id:'_c', n:'Fluorine', u: false, c:[F19],
	info: ['Fluorine only has one stable isotope. It is a highly toxic gas and is used in the creation of Teflon.']
};
const Ne = {
	id:'_d', n:'Neon', u:false, c: [Ne20, Ne21, Ne22],
	info: ['There are three stable isotopes of Neon with Neon20 being the most naturally abundant. Neon is used in lights and advertising signs.']
};
const Na = {
	id:'_e', n:'Sodium', u:false, c: [Na23],
	info: ['Sodium is used in sodium vapor lamps (widely used as street lights) and sodium-ion batteries. Sodium is cheaper than lithium but sodium-ion batteries have a few engineering challenges before they are ready to be more widely used.']
};
const Mg = {
	id:'_e', n:'Magnesium', u:false, c: [Mg24, Mg25, Mg26],
	info: ['Magnesium is essential for many human body functions including healthy bones and heart. It is found in leafy greens, nuts, seeds and more.']
};
const Al = {
	id:'_f', n:'Aluminum', u:false, c: [Al27],
	info: ['Aluminum, also spelled aluminium, is a very abundant metal on Earth. It is used in food storage and many other industries.']
};
const Si = {
	id:'_g', n:'Silicon', u:false, c:[Si28, Si29, Si30],
	info: ['Silicon is used in semiconductors and solar cells. When combined with oxygen it makes silicone, which is used in making parts for toys.']
};
const P = {
	id:'_h', n:'Phosphorus', u:false, c:[P31],
	info: ['Phosphorus is used in matches.']
};
const S = {
	id:'_i', n:'Sulfur', u:false, c:[S32,S33,S34,S36],
	info: ['Sulfur is found pure in nature, likely from volcanoes.']
};
const Cl = {
	id:'_j', n:'Chlorine', u:false, c:[Cl35,Cl37],
	info: ['Chlorine is a commonly used to purify drinking water and swimming pools.']
};
const Ar = {
	id:'_k', n:'Argon', u:false, c:[Ar36,Ar38,Ar40],
	info: ['Argon is intert and colorless but glows blue when excited by an electrical charge.']
};
const K = {
	id:'_l', n:'Potassium', u:false, c:[K39,K40,K41],
	info: ['Potassium is an electrolyte the body needs to function but is harmful in larger quantities.']
};
const Ca = {
	id:'_m', n:'Calcium', u:false, c:[Ca40,Ca42,Ca43,Ca44,Ca46,Ca48],
	info: ['Calcium in it\'s pure form is rare, it is often associated with bone strength.']
};
const Sc = {
	id:'_n', n:'Scandium', u:false, c:[Sc45],
	info: ['Scandium has few uses outside of research.']
};
const Ti = {
	id:'_o', n:'Titanium', u:false, c:[Ti46,Ti47,Ti48,Ti49,Ti50],
	info: ['Titanium is a very strong but light and is used in alloys for aerospace industries. It is also used in several other industries.']
};
const V = {
	id:'_p', n:'Vanadium', u:false, c:[V50,V51],
	info: ['Vandium is mostly used in vandium-steel alloys.']
};
const Cr = {
	id:'_q', n:'Chromium', u:false, c:[Cr50,Cr52,Cr53,Cr54],
	info: ['Chromium is often used to harden steel and increase rust resistance.']
};
const Mn = {
	id:'_r', n:'Manganese', u:false, c:[Mn55],
	info: ['Manganese is used as a component in a steel alloy for railroad tracks and other industries.']
};
const Fe = {
	id:'_s', n:'Iron', u:false, c:[Fe54,Fe56,Fe57,Fe58],
	info: ['Iron rusts easily but is the most used metal. It is mostly used to manufacture steel.']
};
const Co = {
	id:'_t', n:'Cobalt', u:false, c:[Co59],
	info: ['Cobalt can be magnetised and is used in industries where high-temperature strength is important.']
	};
const Ni = {
	id:'_u', n:'Nickel', u:false, c:[Ni58,Ni60,Ni61,Ni62,Ni64],
	info: ['Nickel is mainly used in making steel alloys like stainless steel.']
};
const Cu = {
	id:'_v', n:'Copper', u:false, c:[Cu63,Cu65],
	info: ['Copper was the first metal worked by humans and was eventually mixed with tin to make bronze.']
};
const Zn = {
	id:'_w', n:'Zinc', u:false, c:[Zn64,Zn66,Zn67,Zn68,Zn70],
	info: ['Zinc is mostly used in a process called galvanising, this helps prevent rusting.']
};
const Ga = {
	id:'_x', n:'Gallium', u:false, c:[Ga69,Ga71],
	info: ['Gallium is used as part of gallium arsenide in semiconductors, lasers, and other electronics.']
};
const Ge = {
	id:'_y', n:'Germanium', u:false, c:[Ge70,Ge72,Ge73,Ge74,Ge76],
	info: ['Germanium is a semiconductor often mixed with arsenic or gallium and used in transistors.']
};
const As = {
	id:'_z', n:'Arsenic', u:false, c:[As75],
	info: ['Arsenic is most commonly known as a poison but is also used in semiconductors and has even been used in medicine.']
};
const Se = {
	id:'_A', n:'Selenium', u:false, c:[Se74,Se76,Se77,Se78,Se80,Se82],
	info: ['Selenium is mostly used as an additive to glass. It is also used in solar cells and copier machines.']
};
const Br = {
	id:'_B', n:'Bromine', u:false, c:[Br79,Br81],
	info: ['Bromine has many uses, some are being phased out for environmental reasons.']
};
const Kr = {
	id:'_C', n:'Krypton', u:false, c:[Kr78,Kr80,Kr82,Kr83,Kr84,Kr86],
	info: ['Krypton is often used in sluorescent lights or flash lamps for high speed photography.']
};
const Rb = {
	id:'_D', n:'Rubidium', u:false, c:[Rb85,Rb87],
	info: ['Rubidium is mostly used in research and has few comercial uses.']
};
const Sr = {
	id:'_E', n:'Strontium', u:false, c:[Sr84,Sr86,Sr87,Sr88],
	info: ['Strontium is used in red fireworks and glow-in-the-dark paints.']
};
const Y = {
	id:'_F', n:'Yttrium', u:false, c:[Y89],
	info: ['Yttrium is used in different alloys and in synthetic yttrium-aluminum garnets as part of metal cutting lasers.']
};
const Zr = {
	id:'_G', n:'Zirconium', u:false, c:[Zr90,Zr91,Zr92,Zr94,Zr96],
	info: ['Zirconium is mostly used in nuclear power stations.']
};
const Nb = {
	id:'_H', n:'Niobium', u:false, c:[Nb93],
	info: ['Niobium is unsed in alloys including stainless steel.']
};
const Mo = {
	id:'_I', n:'Molybdenum', u:false, c:[Mo92,Mo94,Mo95,Mo96,Mo97,Mo98,Mo100],
	info: ['Molybdenum is part of a hardened steel alloy used in engines.']
};
const Tc = {
	id:'_J', n:'Technetium', u:false, c:[Tc97],
	info: ['Technetium is a radioactive element with no stable isotopes. I included the isotope with the longest halflife.']
};
const Ru = {
	id:'_K', n:'Ruthenium', u:false, c:[Ru96,Ru98,Ru99,Ru100,Ru101,Ru102,Ru104],
	info: ['Ruthenium is primarily used in electronic resistors and electrical contacts or acetic acid production.']
};
const Rh = {
	id:'_L', n:'Rhodium', u:false, c:[Rh103],
	info: ['Rhodium is mostly used in catalytic converters.']
};
const Pd = {
	id:'_M', n:'Palladium', u:false, c:[Pd102,Pd104,Pd105,Pd106,Pd108,Pd110],
	info: ['Palladium is used in catalytic converts as well as jewellry. A gold-palladium alloy is also known as white gold.']
};
const Ag = {
	id:'_N', n:'Silver', u:false, c:[Ag107,Ag109],
	info: ['Silver is used in jewellery and mirrors. It is the best known reflector of visible light.']
};
const Cd = {
	id:'_O', n:'Cadmium', u:false, c:[Cd106,Cd108,Cd110,Cd111,Cd112,Cd113,Cd114,Cd116],
	info: ['Cadmium is a poison that causes birth defects and cancer. It is used in some rechargable batteries but they are being phased out.']
};
const In = {
	id:'_P', n:'Indium', u:false, c:[In113,In115],
	info: ['Indium is mostly used in electronics like touch screens and solar panels.']
};
const Sn = {
	id:'_Q', n:'Tin', u:false, c:[Sn112,Sn114,Sn115,Sn116,Sn117,Sn118,Sn119,Sn120,Sn122,Sn124],
	info: ['Tin has many uses from food storage to pewter. Bronze was one of the first alloys, made with copper and tin.']
};
const Sb = {
	id:'_R', n:'Antimony', u:false, c:[Sb121,Sb123],
	info: ['Antimonoy is used in some semiconductor devices like IR detectors and diodes. It is also used in a Pb-Sb alloy in batteries.']
};
const Te = {
	id:'_S', n:'Tellurium', u:false, c:[Te120,Te122,Te123,Te124,Te125,Te126,Te128,Te130],
	info: ['Tellurium is used in alloys with copper and stainless steel to improve strength and hardness.']
};
const I = {
	id:'_T', n:'Iodine', u:false, c:[I127],
	info: ['Iodine was initially used in photography in the 1800s. It is now used in pharmacuticals and disinfectants.']
};
const Xe = {
	id:'_U', n:'Xenon', u:false, c:[Xe124,Xe126,Xe128,Xe129,Xe130,Xe131,Xe132,Xe134,Xe136],
	info: ['Xenon is used in special light bulbs and in ion propulsion systems used by some satellites.']
};
const Cs = {
	id:'_V', n:'Cesium', u:false, c:[Cs133],
	info: ['Cesium is mostly used in drilling fluids. It is also used in some optical glass and radiation monitoring equipment.']
};
const Ba = {
	id:'_W', n:'Barium', u:false, c:[Ba130,Ba132,Ba134,Ba135,Ba136,Ba137,Ba138],
	info: ['Barium is mostly used in drilling fluids for oil and gas wells.']
};
const La = {
	id:'_X', n:'Lanthanum', u:false, c:[La138,La139],
	info: ['Lanthanum alloys have been used in hydrogen tanks for hydrogen powered vehicles.']
};
const Ce = {
	id:'_Y', n:'Cerium', u:false, c:[Ce136,Ce138,Ce140,Ce142],
	info: ['Cerium oxide is used in the walls of self-cleaning ovens as well as catalytic converters.']
};
const Pr = {
	id:'_Z', n:'Praseodymium', u:false, c:[Pr141],
	info: ['Praseodymium is used in some high-strength alloys used in aircraft engines.']
};
const Nd = {
	id:'_10', n:'Neodymium', u:false, c:[Nd142,Nd143,Nd144,Nd145,Nd146,Nd148,Nd150],
	info: ['Neodymium is used in an alloy with iron and boron to make strong magnets.']
};
const Pm = {
	id:'_11', n:'Promethium', u:false, c:[Pm145],
	info: ['Promethium is a radioactive metal that is mostly used in research. There are no stable isotopes, Pm145 has a half-life of almost 18 years.']
};
const Sm = {
	id:'_12', n:'Samarium', u:false, c:[Sm144,Sm147,Sm148,Sm149,Sm150,Sm152,Sm154],
	info: ['Samarium is used in an alloy with cobalt in microwaves.']
};
const Eu = {
	id:'_13', n:'Europium', u:false, c:[Eu151,Eu153],
	info: ['Europium glows red under UV light an dis used in printing of euro banknotes.']
};
const Gd = {
	id:'_14', n:'Gadolinium', u:false, c:[Gd152,Gd154,Gd155,Gd156,Gd157,Gd158,Gd160],
	info: ['Gadolinium is used in small amounts in iron and chromium alloys.']
};
const Tb = {
	id:'_15', n:'Terbium', u:false, c:[Tb159],
	info: ['Terbium is used in some x-ray devices and lasers.']
};
const Dy = {
	id:'_16', n:'Dysprosium', u:false, c:[Dy156,Dy158,Dy160,Dy161,Dy162,Dy163,Dy164],
	info: ['Dysprosium is mainly used in alloys with neodymium magnets.']
};
const Ho = {
	id:'_17', n:'Holmium', u:false, c:[Ho165],
	info: ['Holmium can absorb neutrons and is used in nuclear reactors.']
};
const Er = {
	id:'_18', n:'Erbium', u:false, c:[Er162,Er164,Er166,Er167,Er168,Er170],
	info: ['Erbium can be used in alloys to reduce hardness and improve workability.']
};
const Tm = {
	id:'_19', n:'Thulium', u:false, c:[Tm169],
	info: ['Thulium is used in some medical x-ray machines.']
};
const Yb = {
	id:'_1a', n:'Ytterbium', u:false, c:[Yb168,Yb170,Yb171,Yb172,Yb173,Yb174,Yb176],
	info: ['Ytterbium can be used in some memory devices and as an industrial catalyst.']
};
const Lu = {
	id:'_1b', n:'Lutetium', u:false, c:[Lu175,Lu176],
	info: ['Lutetium is mostly used in research.']
};
const Hf = {
	id:'_1c', n:'Hafnium', u:false, c:[Hf174,Hf176,Hf177,Hf178,Hf179,Hf180],
	info: ['Hafnium is used in nuclear submarines and plasma welding torches.']
};
const Ta = {
	id:'_1d', n:'Tantalum', u:false, c:[Ta181],
	info: ['Tantalum is used as an insulating coating in electronics.']
};
const W = {
	id:'_1e', n:'Tungsten', u:false, c:[W180,W182,W183,W184,W186],
	info: ['Tungsten has the highest melting point of all metals and is used in incandescent light bulbs.']
};
const Re = {
	id:'_1f', n:'Rhenium', u:false, c:[Re185,Re187],
	info: ['Rhenium has a high melting point and is often combined in alloys with tungsten and molybdenum.']
};
const Os = {
	id:'_1g', n:'Osmium', u:false, c:[Os184,Os186,Os187,Os188,Os189,Os190,Os192],
	info: ['Osmium has few uses including fountain pen tips and electrical contacts.']
};
const Ir = {
	id:'_1h', n:'Iridium', u:false, c:[Ir191, Ir193],
	info: ['Iridium is the most corosion resistant material known and is used in the standard meter bar.']
};
const Pt = {
	id:'_1i', n:'Platinum', u:false, c:[Pt190,Pt192,Pt194,Pt195,Pt196,Pt198],
	info: ['Platinum is mostly used in catalytic converters but is also in jewellery and electronics.']
};
const Au = {
	id:'_1j', n:'Gold', u:false, c:[Au197],
	info: ['Gold is often used in jewellery. 24-carat gold is pure gold, but it is often used as an alloy to improve durability.']
};
const Hg = {
	id:'_1k', n:'Mercury', u:false, c:[Hg196,Hg198,Hg199,Hg200,Hg201,Hg202,Hg204],
	info: ['Mercury is a heavy liquid metal and is being phased out of many uses due to toxicity.']
};
const Tl = {
	id:'_1l', n:'Thallium', u:false, c:[Tl203,Tl205],
	info: ['Thallium use is limited due to toxicity, but it is used in photoelectric cells.']
};
const Pb = {
	id:'_1m', n:'Lead', u:false, c:[Pb204,Pb206,Pb207,Pb208],
	info: ['Lead has been used for centuries in many areas, many of them have been replaced with other materials due to negative health effects.']
};
const Bi = {
	id:'_1n', n:'Bismuth', u:false, c:[Bi209],
	info: ['Bismuth has a low melting point and is used in fire detectors.']
};
const Po = {
	id:'_1o', n:'Polonium', u:false, c:[Po209],
	info: ['Polonium has no known stable isotopes and has few uses outside of research.']
};
const At = {
	id:'_1p', n:'Astatine', u:false, c:[At210],
	info: ['Astatine has no known stable isotopes and is only used in research.']
};
const Rn = {
	id:'_1q', n:'Radon', u:false, c:[Rn222],
	info: ['Radon has no known stable isotopes but has been used in radiation therapy to treat cancer.']
};
const Fr = {
	id:'_1r', n:'Francium', u:false, c:[Fr223],
	info: ['Francium has no known stable isotopes and has no uses.']
};
const Ra = {
	id:'_1s', n:'Radium', u:false, c:[Ra226],
	info: ['Radium has no known stable isotopes has been used in radiation therapy to treat cancer.']
};
const Ac = {
	id:'_1t', n:'Actinium', u:false, c:[Ac227],
	info: ['Actinium has no known stable isotopes and is rarely used outside of research.']
};
const Th = {
	id:'_1u', n:'Thorium', u:false, c:[Th232],
	info: ['Thorium can be used as a source of nuclear power and is more abundant than uranium but is still a new technology.']
};
const Pa = {
	id:'_1v', n:'Protactinium', u:false, c:[Pa231],
	info: ['Protactinium has no known stable isotopes and is rarely used outside of research.']
};
const U = {
	id:'_1w', n:'Uranium', u:false, c:[U234,U235,U238],
	info: ['Uranium as a source of nuclear power and in nuclear weapons.']
};
const Np = {
	id:'_1x', n:'Neptunium', u:false, c:[Np237],
	info: ['Neptunium has no known stable isotopes and is rarely used outside of research.']
};
const Pu = {
	id:'_1z', n:'Plutonium', u:false, c:[Pu244],
	info: ['Plutonium is used in some nuclear weapons and nuclear energy in space crafts such as the Curiosity Rover on Mars.']
};
const Am = {
	id:'_1A', n:'Americium', u:false, c:[Am243],
	info: ['Americium mostly used in smoke alarms.']
};
const Cm = {
	id:'_1B', n:'Curium', u:false, c:[Cm247],
	info: ['Curium has been used as a power source in space missions.']
};
const Bk = {
	id:'_1C', n:'Berkelium', u:false, c:[Bk247],
	info: ['Berkelium has no known stable isotopes and is used in research.']
};
const Cf = {
	id:'_1D', n:'Californium', u:false, c:[Cf251],
	info: ['Californium can be used in portable metal detectors.']
};
const Es = {
	id:'_1E', n:'Einsteinium', u:false, c:[Es252],
	info: ['Einsteinium has no known stable isotopes and is only used in research.']
};
const Fm = {
	id:'_1F', n:'Fermium', u:false, c:[Fm257],
	info: ['Fermium has no known stable isotopes and is only used in research.']
};
const Md = {
	id:'_1G', n:'Mendelevium', u:false, c:[Md258],
	info: ['Mendelevium has no known stable isotopes and is only used in research.']
};
const No = {
	id:'_1H', n:'Nobelium', u:false, c:[No261],
	info: ['Nobelium has no known stable isotopes and is only used in research.']
};
const Lr = {
	id:'_1I', n:'Lawrencium', u:false, c:[Lr264],
	info: ['Lawrencium has no known stable isotopes and is only used in research.']
};
const Rf = {
	id:'_1J', n:'Rutherfordium', u:false, c:[Rf265],
	info: ['Rutherfordium has no known stable isotopes and is only used in research.']
};
const Db = {
	id:'_1K', n:'Dubnium', u:false, c:[Db268],
	info: ['Dubnium has no known stable isotopes and is only used in research.']
};
const Sg = {
	id:'_1L', n:'Seaborgium', u:false, c:[Sg271],
	info: ['Seaborgium has no known stable isotopes and is only used in research.']
};
const Bh = {
	id:'_1M', n:'Bohrium', u:false, c:[Bh273],
	info: ['Bohrium has no known stable isotopes and is only used in research.']
};
const Hs = {
	id:'_1N', n:'Hassium', u:false, c:[Hs276],
	info: ['Hassium has no known stable isotopes and is only used in research.']
};
const Mt = {
	id:'_1O', n:'Meitnerium', u:false, c:[Mt278],
	info: ['Meitnerium has no known stable isotopes and is only used in research.']
};
const Ds = {
	id:'_1P', n:'Darmstadtium', u:false, c:[Ds281],
	info: ['Darmstadtium has no known stable isotopes and is only used in research.']
};
const Rg = {
	id:'_1Q', n:'Roentgenium', u:false, c:[Rg283],
	info: ['Roentgenium has no known stable isotopes and is only used in research.']
};
const Cn = {
	id:'_1R', n:'Copernicium', u:false, c:[Cn285],
	info: ['Copernicium has no known stable isotopes and is only used in research.']
};
const Nh = {
	id:'_1S', n:'Nihonium', u:false, c:[Nh287],
	info: ['Nihonium has no known stable isotopes and is only used in research.']
};
const Fl = {
	id:'_1T', n:'Flerovium', u:false, c:[Fl289],
	info: ['Flerovium has no known stable isotopes and is only used in research.']
};
const Mc = {
	id:'_1U', n:'Moscovium', u:false, c:[Mc291],
	info: ['Moscovium has no known stable isotopes and is only used in research.']
};
const Lv = {
	id:'_1V', n:'Livermorium', u:false, c:[Lv292],
	info: ['Livermorium has no known stable isotopes and is only used in research.']
};
const Ts = {
	id:'_1U', n:'Tennessine', u:false, c:[Ts292],
	info: ['Tennessine has no known stable isotopes and is only used in research.']
};
const Og = {
	id:'_1W', n:'Oganesson', u:false, c:[Og293],
	info: ['Oganesson has no known stable isotopes and is only used in research.']
};

//transition metal subgroups (By Period)
const TMP4 = {
	id:'_1X', n:'Period 4', u:false,
	info:['There are so many Transition Metals I split them up by period.'],
	c:[Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu, Zn]
}
const TMP5 = {
	id:'_1Y', n:'Period 5', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Y, Zr, Nb, Mo, Tc, Ru, Rh, Pd, Ag, Cd]
}
const TMP6 = {
	id:'_1Z', n:'Period 6', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Lu, Hf, Ta, W, Re, Os, Ir, Pt, Au, Hg]
}
const TMP7 = {
	id:'_20', n:'Period 7', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn]
}

//element families
const AlkaliMetal = {
	id:'_21', n:'Alkali Metal', u:false, c: [Li, Na, K, Rb, Cs, Fr],
	info: ['Alkali Metals are soft, shiny, and highly reactive.']
}
const AlkalineEarthMetal = {
	id:'_22', n:'Alkaline Earth Metal', u:false, c: [Be, Mg, Ca, Sr, Ba, Ra],
	info: ['Alkaline Earth Metals are not found free in nature, they are only found as compounds with other elements.']
}
const Actinide = {
	id:'_23', n:'Actinide', u:false, c: [Ac, Rh, Pa, Th, U, Np, Pu, Am, Cm, Bk, Cf, Es, Fm, Md, No, Lr],
	info: ['Actinides are all radioactive and have no stable isotopes. In this game I included isotopes with the longest decay rate.']
}
const Chalcogen = {
	id:'_24', n:'Chalcogen', u:false, c:[O, S, Se, Te, Po],
	info:['Chalcogens have an unusual property called catenation, which means atoms will bond to other identical atoms. When oxygen bonds to other oxygen atoms it forms ozone.']
}
const Halogen = {
	id:'_25', n:'Halogen', u:false, c:[F, Cl, Br, I, At, Ts],
	info:['Halogens are only found combined with other elements in nature.']
}
const Lanthanide = {
	id:'_26', n:'Lanthanide', u:false, c: [La, Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb],
	info: ['Lanthanide are sometimes called rare-earth elements or rare-earth metals.']
}
const Metalloid = {
	id:'_27', n:'Metalloid', u:false, c: [B, Si, Ge, As, Sb],
	info: ['Metalloids have properties between metals and nonmetals.']
}
const NobelGas = {
	id:'_28', n:'Nobel Gas', u:false, c: [He, Ne, Ar, Kr, Xe, Rn, Og],
	info: ['Noble gasses are naturally occurring and have very low reactivity.']
}
const Nonmetal = {
	id:'_29', n:'Other Nonmetal', u:false, c: [H, C, N, P],
	info: ['Other nonmetals or sometimes just nonmetals are a diverse group of elements between the metalloids and halogens.']
}
const PoorMetal = {
	id:'_2a', n:'Post-transition Metal', u:false, c:[Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv],
	info:['Post-transition Metals go by a few names including: poor metals, other metals, p-block metals, and chemically weak metals.']
}
const TransitionMetal = {
	id:'_2b', n:'Transition Metal', u:false, c:[TMP4,TMP5,TMP6,TMP7],
	info:['Transition metals are typically hard. There are many, spanning multiple periods and groups (rows and columns) through the middle of the periodic table.']
}

const primaryAmine = {
	id:'_2c', n:'Primary Amine', u:false, c:[methylamine],
	info: ['Primary Amines are an ammonia molecule with one hydrogen replaced with a hydrocarbon.']
}
const secondaryAmine = {
	id:'_2d', n:'Secondary Amine', u:false, c:[dimethylamine],
	info: ['Secondary Amines are an ammonia molecule with two hydrogen replaced with a hydrocarbon.']
}
const tertiaryAmine = {
	id:'_2e', n:'Tertiary Amine', u:false, c:[trimethylamine],
	info: ['Tertiary Amines are an ammonia molecule with all three hydrogen replaced with a hydrocarbon.']
}

//trinitrotouline: toluene + 3water + 3nitro = TNT + 3x hydronium (h3o)

const aliphaticAmide = {
	id:'_2f', n:'Aliphatic Amide', u:false, c:[acetamide],//from acetic acid + ammonia = acetamide + water
	info: ['Aliphatic amides bond the nitrogen to an alkyl group.']
}
const aromaticAmide = {
	id:'_2g', n:'Aromatic Amide', u:false, c:[benzamide],//from benzoic acid + ammonia = benzamide + water
	info: ['Aromatic amides bond the nitrogen to an aryl group.']
}


//IUPAC functional groups
const alkane = {
	id:'_2h', n:'Alkane', u:false, c:[methane,ethane,propane,butane],
	info: ['Alkanes are saturaded hydrocarbons, meaning they consist of hydrogen and carbon with single covalent bonds between carbon atoms.']
}
const alkene = {
	id:'_2i', n:'Alkene', u:false, c:[methene, ethene, propene, butene],
	info: ['Alkenes are hydrocarbons with at least one carbon atom double bonded to another carbon atom.']
}
const alkyne = {
	id:'_2j', n:'Alkyne', u:false, c:[ethyne,propyne,butyne],
	info: ['Alkenes are hydrocarbons with at least one carbon atom triple bonded to another carbon atom.']
}
const benzeneRing = {
	id:'_2k', n:'Benzene Ring', u:false, c:[benzene, toluene],
	info: ['A benzene ring contains a cyclic hydrocarbon.']
}
const amine = {
	id:'_2l', n:'Amine', u:false, c:[primaryAmine,secondaryAmine,tertiaryAmine],
	info: ['Amines contain a nitrogen and hydrogen bonded to a hydrocarbon.']
}
const alcohol = {
	id:'_2m', n:'Alcohol', u:false, c:[methanol, ethanol, propanol, coniferylAlcohol, sinapylAlcohol, coumerylAlcohol],//isopropanol, butanol, glycerol, propylene glycol
	info: ['Alcohols are an oganic compound that contain a hydroxyl group OH bonded to a carbon atom.']
}
const hydroxyl = {
	id:'_2n', n:'Hydroxyl', u:false, c:[coniferylAlcohol],
	info: ['Hydroxyls are organic compounds with an Oxygen atom bonded to a Hydrogen atom (-OH).']
}
const carbonyl = {
	id:'_2o', n:'Carbonyl', u:false, c:[phenylalanine],
	info: ['Carboxyls are organic compounds with a carbon atom double-bonded to an oxygen atom that is single bonded to a hydroxyl group (-OH).', 'This follows the pattern -COOH']
}

const ether = {
	id:'_2p', n:'Ether', u:false, c:[],
	info: ['']
}
const alkylHalide = {
	id:'_2q', n:'Alkyl Halide', u:false, c:[],
	info: ['']
}
const thiol = {
	id:'_2r', n:'Thiol', u:false, c:[],
	info: ['']
}
const aldehyde = {
	id:'_2s', n:'Aldehyde', u:false, c:[],
	info: ['']
}
const ketone = {
	id:'_2t', n:'Ketone', u:false, c:[],
	info: ['']
}
const ester = {
	id:'_2u', n:'Ester', u:false, c:[],
	info: ['']
}
const carboxylicAcid = {
	id:'_2v', n:'Carboxylic Acid', u:false, c:[aceticAcid,formicAcid,benzoicAcid],
	info: ['Carboxylic acids are generally weak acids that contain a carboxyl group of COOH.']
}
const amide = {
	id:'_2w', n:'Amide', u:false, c:[aliphaticAmide,aromaticAmide],
	info: ['Amides contain a carbonyl group C=0 bonded to a nitrogen atom.']
}
const nitrile = {
	id:'_2x', n:'Nitrile', u:false, c:[],
	info: ['Nitriles have a carbon atom triple bonded to a nitrogen atom.']
}

const monosaccharide = {
	id:'_2y', n:'Monosaccharide', u:false, c:[glucose, fructose, sucrose, ribose, xylose, mannose, galactose, arabinose],
	info:['Monosaccharides are a simple form of carbohydrates and are often called simple sugars.']
}
const polysaccharide = {
	id:'_2z', n:'Polysaccharide', u:false, c:[cellulose, glycogen, hemicellulose],
	info:['Polysaccharides are chains of monosaccharide molecules.', 'In this game I standardized chain lengths to something I thought seemed good. In the universe there are more possible sizes and ingredient ratios.', 'As with many things in thig game, polysaccharide recipes have been simplified.']
}
const carbohydrate = {
	id:'_2A', n:'Carbohydrate', u:false, c:[monosaccharide, polysaccharide],
	info: ['Carbohydrate serve as a primary source of energy for most known living organisms.']
}
const lignin = {
	id:'_2B', n:'Lignin', u:false, c:[hardLignin, softLignin],
	info: ['Lignins are complex polymers derived from amino acids.', 'There are many types of lignins, this game has some.']
}
const woodMolecule = {
	id:'_2C', n:'Wood', u:false, c:[hardwoodParticle, softwoodParticle],
	info: ['Wood is mostly composed of cellulose, hemicellulose, and lignin.', 'There are many types of wood, this game has some.']
}
//epoxide,imine,acidChloride,anhydride (carboxylic Anhydride?), nitro, sulfide(thioether), azide
const organicFunctionalGroup = {
	id:'_2D', n:'Functional Groups', u:false, c:[alkane,alkene,alkyne,benzeneRing,amine,alcohol,hydroxyl,carbonyl,ether,alkylHalide,thiol,aldehyde,ketone,ester,carboxylicAcid,amide,nitrile],
	info:['Functional groups organize organic compounds with similar characteristic chemical reactions.']
}
const complexOrganicMaterial = {
	id:'_2E', n:'Complex Material', u:false, c:[lignin, woodMolecule],
	info: ['Complex Organic Materials is a group for items that are not in functional groups and are more complex building blocks of organic material.']
}


const organic = {
	id:'_2F', n:'Organic Compounds', u:false, c:[organicFunctionalGroup, carbohydrate, complexOrganicMaterial],
	info:['Organic compounds contain bonded carbon and hydrogen atoms along with other elements.']
}

const binaryHydride = {
	id:'_2G', n:'Binary Hydride', u:false, c:[ammonia,water,heavyWater,tritiatedWater,hydronium],
	info:['Binary hydrides contain hydrogen and one other element.']
}
const binaryOxide = {
	id:'_2H', n:'Binary Oxide', u:false, c:[water,carbonMonoxide,carbonDioxide,heavyWater,tritiatedWater,hydronium],
	info:['Binary oxides contain hydrogen and one other element.']
}

const steel = {
	id:'_2I', n:'Steel', u:false, c:[mildSteel,highSteel],
	info:['Steel is an iron alloy with a small amount of carbon.', 'There are many types of steel alloys, I have included a few recipes based on some average inputs.']
}
const metalAlloys = {
	id:'_2J', n:'Metal Alloys', u:false, c:[steel],
	info:['Metal alloys are materials composed of a metal and one or more other elements.']
}

const acid = {
	id:'_2K', n:'Acid', u:false, c:[HCl,H2SO4],
	info:['Acids generally contain hydrogen ions that can dissociate in water.']
}

const base = {
	id:'_2L', n:'Base', u:false, c:[NaOH, KOH],
	info:['Bases react with the hydrogen ions and neutralize the acids.']
}


const salt = {
	id:'_2M', n:'Salts', u:false, c:[NaCl,KCl,Na2S,Na2SO4],
	info:['Salts can be formed as a result of combining acids and bases.']
}

const allotrope = {
	id:'_2N', n:'Allotrope', u:false, c:[dihydrogen,deuteratedDihydrogen,dioxygen],
	info:['Allotropes are homonuclear molecules that have atoms of the same element.']
}
const binaryCompound = {
	id:'_2O', n:'Binary Compounds', u:false, c:[binaryHydride,binaryOxide],
	info:['Binary compounds have two unique elements.', 'In this game I put binary compounds that don\'t fit in other groups here']
}

const simpleCompounds = {
	id:'_2P', n:'Simple Compounds', u:false, c:[allotrope,binaryCompound],
	info:['Simple Compounds are still made on a molecular level and have few elements.']
}


const inorganic = {
	id:'_2Q', n:'Inorganic Compounds', u:false, c:[simpleCompounds,metalAlloys,salt,acid,base],
	info:['Inorganic compounds do not contain carbon-hydrogen bonds.']
}

const woodMotes = {
	id:'_2R', n:'Motes', u:false, c:[hardwoodFiber, softwoodFiber, hardwoodChip, softwoodChip, hardwoodPulp, softwoodPulp],
	info:['Wood Motes are small pieces of wood.']
}
const lumber = {
	id:'_2S', n:'Lumber', u:false, c:[],
	info:['Lumber is a common building material.', 'In this game I use lumber as a very broad term to include wooden construction material.']
}

const paper = {
	id:'_2T', n:'Paper', u:false, c:[paperA4],
	info:['There are many types of paper made with different types of pulp.', ]
}
const woodHuman = {
	id:'_2U', n:'Wood', u:false, c:[woodMotes, lumber, paper],
	info: ['Wood is mostly composed of cellulose, hemicellulose, and lignin.', 'There are many types of wood, this game has some.']
}
const paperMaking = {
	id:'_2V', n:'Paper Making', u:false, c:[whiteLiquorMote, whiteLiquor, blackLiquor, paper],
	info: ['Chemicals used in paper making.']
}
const industrial = {
	id:'_2W', n:'Industrial', u:false, c:[paperMaking],
	info: ['Industrial items are generally chemicals used in industrial production proceses.']
}

//magnitude groups
const subatomic = {
    id:'M_a', n:'Subatomic', u: true,
	info: ['Subatomic components are the smallest items in this game.', 'In this game most subatomic items are free to generate'], 
    c: [Quark, Lepton, GaugeBoson, Baryon]
};
const atomic = {
    id:'M_b', n:'Atomic', u: false,
    info: ['Atoms are basic elements that are the building blocks for molecules. They have a nucleus, which is made of Protons and Neutrons, and are `orbited` by Electrons.', 'Many elements have multiple isotopes; for simplicity in this game most molecule recipes uses the most abundant isotope.'],
    c: [AlkaliMetal, AlkalineEarthMetal, Actinide, Chalcogen, Halogen, Lanthanide, Metalloid, NobelGas, Nonmetal, PoorMetal, TransitionMetal]
};
const molecular = {
    id:'M_c', n:'Molecular', u: false,
    info: ['A molecule is the smallest mass of a substance while keeping its chemical properties.', 'There are countless types of molecules, this game has some.'],
    c: [inorganic,organic]
};
const human = {
    id:'M_d', n:'Human', u: false,
    info: ['Human scale is right in the middle, Malcome is human sized and also in the middle.'],
    c: [woodHuman,industrial]
};
const planetary = {
    id:'M_e', n:'Planetary', u: false,
    info: ['Planetary objects are about the size of a planet. Earth is a terrestrial planet but there are several types of planetary scale objects.'],
    c: []
};
const stellar = {
    id:'M_f', n:'Stellar', u: false,
    info: ['Stellar mass objects range from about one fifth the mass of our Sun to over 200 times the mass of our Sun.'],
    c: []
};
const blackHole = {
    id:'M_f', n:'Black Hole', u: false,
    info: ['Black Holes are so dense they trap light; the smallest type of black holes range from about five to fifty solar masses. Supermassive Black Holes can be tens of billions times the mass of our Sun.'],
    c: []	
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
	{id:'M_0', n:'Create', u:true, c:items, info:['Imagination is the beginning of creation.'], intro:'As the tab title suggests, this is where you will create items. Items are grouped by categories; some items may be in more than one category.'}, 
	{id:'M_1', n:'Discover', u:false, info:['He who never made a mistake never made a discovery.', 'Use the "Get Recipe" button if you get stuck.'], intro:'This is the main place for discovering new resources. Click a (+>) button to add an item to the Matter Mutator. Click a (--) button to remove an item from the Matter Mutator. Try different combinations and click the "Scan" button. You can only add an item if you have some and it is not already in the matter mutator. Scanning items does not destroy them.'}, 
	{id:'M_2', n:'Manage', u:false, info:['If demand is greater than supply you have a deficit.'], intro:'This is a central location to monitor item supply and demand.'}, 
	{id:'M_3', n:'Enhance', u:false, info:['Generator Output increases the output, but not the components or max setpoint.', 'Enhancements upgrades increases the effect of the other enhancements.'], intro:'These are global Enhancements that increase generator output and reduce generator upgrade cost. They do not change the set-point limits or generator levels.'}, 
	{id:'M_4', n:'Settings', u:true, info:['Settings can effect game mechanics and page contents.'], intro:'This is where you can change settings.'}, 
	{id:'M_5', n:'Help', u:true, info:['This is an idle crafting game focusing on discovery and supply flow management.'], intro:'Click on a subject category below for more information.'}
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
		'Misc:',
		'Some items can be found in multiple places, it is the same item just included in multiple places for convenience.',
		'Items can be accessed that have not been Discovered yet via (») Goto buttons. In order to access an item through the menu it will have to be Discovered from the Discovery tab.',
		'Many items can be generated in multiple ways.',
		'A game cycle is about 1 second.',
		'Item symbols are not unique, if you hover over an item\'s symbol it will show the name.',
		'The Spacebar pauses the game'
	]},
	{t:'Hotkeys', c:[
		'Menu navigation:',
		'Left/Right: Select the adjacent menu items of the same level',
		'Up/Down: Go up/down one level',
		'Numpad +/-: Go back/forward in selected menu history',
		'Numpad 0-9: Interact with common UI elements (Details Below)',
		'Note: hotkeys are disabled when an input element has focus.',
		'|',
		'Create',
		'0: Manually generate first recipe with sufficient inputs.',
		'|',
		'Discover',
		'Enter: focus search input',
		'1: Toggle Hide below threshold.',
		'2: Focus threshold limit',
		'3: Get Recipe Hint',
		'4: Add hint to Matter Mutator',
		'|',
		'Manage',
		'1: Toggle Hide Created = 0',
		'2: Toggle Hide Created < Flow',
		'3: Toggle Hide Created < Used',
		'4: Toggle Hide Used = 0',
		'5: Toggle Hide Used < Demand',
		'6: Toggle Hide Used < Created',
		'|',
		'Enhance',
		'1: Buy upgrade for Manual Output',
		'2: Buy upgrade for Generator Output',
		'3: Buy upgrade for Generator Cost',
		'4: Buy upgrade for Enahancment Enhancer',
		'ALT+1: Goto item to upgrade Manual Output',
		'ALT+2: Goto item to upgrade Generator Output',
		'ALT+3: Goto item to upgrade Generator Cost',
		'ALT+4: Goto item to upgrade Enahancment Enhancer',
		'HINT: The hotkeys [ALT+1, 0, -, 1] will goto the item for upgrade 1, create it if you can, go back to this tab, and buy the upgrade if you can',
		'|',
		'Settings',
		'1: Toggle Introduction Hints with a green border',
		'2: Toggle Flavor text and bonus info',
		'3: Toggle Used-In Spoiler Warning',
		'4: Toggle Cheater Mode',
		'5: Save Game',
		'8: Restore detault Settings',
		'|',
		'Help',
		'0-9: Expand/Collapse help sections'
	]},
	{t:'Create', c:[
		'The Create tab lets you create items.',
		'|',
		'The Inventory shows how many of the given item  you have. You can have up to 1125899906842624 (2^50) of any given item.',
		'Bulk storage storage is where surplus inventory is stored and is used in some generators.',		
		'Bulk storage is available on items that have an inventory > 1048576 (2^20).',
		'|',
		'Generator generate (->) button will manually run the generator.', 
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
		'You can [Get Recipe] approximately every 30 seconds. After about a 30 seconds the recipe will clear and the button will be available again.',
		'You can add the generated recipe inputs to the Matter Mutator with the (+>) button in the [Get Recipe] area if available.',
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
		'My brothers - Used for their smart brain skills',
		'https://periodictable.com - Used for atom isotopes; I included the bolded isotopes',
		'https://www.rsc.org/periodic-table - Used for atom information',
		'https://webbook.nist.gov/chemistry/name-ser/ - Used for molecule symbols',
		'https://www.masterorganicchemistry.com/2010/10/06/functional-groups-organic-chemistry/ - Used for learning about functional groups',
		'https://chat.openai.com/ - Used for general questions; verified most responses with outside sources',
		'|',
		'If you have a suggestion of items you want added you can email: grumdrig333@gmail.com',
	]},
	{t:'About', c:[
		'This game was initially started as a way to learn mutraction but I encountered some memory leaks. These leaks have since been resolved. I might go back and retry making the UI in mutraction.',
		'I decided to try making a game that has a simple UI but is very data heavy. As a result the html file is pretty small and most content is generated based on a few data files.',
	]},
]