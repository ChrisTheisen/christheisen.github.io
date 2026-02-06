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
let Demand = {};

const Quark = {
    id:'m_0', n:'Quark', u: true, c:[items.Q_Up,items.Q_Down],
	info: ['Quarks are some of the most basic building blocks. They come in 6 types: Up, Down, Charm, Strange, Top, and Bottom.', 
		'In this game we are only using Up and Down.', 
		'The mass of individual quarks is difficult to measure since they are always found inside of hadrons.'
	]
};
const Lepton = {
    id:'m_1', n:'Lepton', u: true, c:[items.Electron],
    info: ['Leptons are some of the most basic building blocks. They come in 6 types: Electron, Muon, Tau, Electron Neutrino, Muon Neutrino, and Tau Neutrino.', 
		'In this game we are only using Electrons.'
	]
};
const GaugeBoson = {
    id:'m_2', n:'Gauge Boson', u: true, c:[items.Photon],
    info: ['Gauge Bosons are some of the most basic particles in particle physics. They come in 4 types: gluon, photon, z boson, and w boson.', 
		'In this game we are only using photons. The photon inputs are approximate estimations and shouldn\'t be trusted.', 
		'Photons don\'t have any mass in the traditional sense but do carry energy proportional to their frequency.', 
		]
};

const Baryon = {
    id:'m_3', n:'Baryon', u: false, c:[items.Proton,items.Neutron],
    info: ['Baryons are a type of hadron made of 3 Quarks. There are a few dozen different types of Baryons.',
		'In this game we are only using Protons and Neutrons.',
		'Around 99% of the mass of a baryon comes from the energy holding the quarks together. This is called the Strong Force and is mediated by gluons.'
	]
};
const H = {
    id:'m_4', n:'Hydrogen', u: false, c:[items.H1,items.H2,items.H3],
    info: ['Hydrogen is the most common element in the universe and makes up ~74% of baryonic matter. Hydrogen is highly flamable and lighter than air.',
	'']
};
const He = {
    id:'m_5', n:'Helium', u: false, c:[items.He3,items.He4],
    info: ['Helium-3 is much more rare than the normal Helium-4. Helium makes up ~24% of baryonic matter.']
};
const Li = {
    id:'m_6', n:'Lithium', u: false, c:[items.Li6,items.Li7],
    info: ['Lithium-6 is much more rare than the normal Lithium-7. Lithium is often used in rechargable batteries.']
};
const Be = {
	id:'m_7', n:'Beryllium', u:false, c:[items.Be9],
	info: ['Beryllium has only a single stable isotope. Be10 has a halflife of ~1.4 million years is used in surface exposure dating.']
};
const B = {
	id:'m_8', n:'Boron', u:false, c:[items.B10,items.B11],
	info: ['Boron is required for healthy plants.']
};
const C = {
	id:'m_9', n:'Carbon', u:false, c:[items.C12,items.C13],
	info: ['Carbon is used in organic matter and many industries. C14 is not in this game but is has a halflife of ~5700 years and is used to date dead organic matter.']
};
const N = {
	id:'m_a', n:'Nitrogen', u:false, c:[items.N14,items.N15],
	info: ['Nitrogen is a very abundant element and is used in many industries.']
};
const O = {
	id:'m_b', n:'Oxygen', u:false, c:[items.O16,items.O17,items.O18],
	info: ['Oxygen is needed for most animals that breathe. As of now henneguya salminicola is the only known animal that does not need oxygen.']
};
const F = {
	id:'m_c', n:'Fluorine', u: false, c:[items.F19],
	info: ['Fluorine only has one stable isotope. It is a highly toxic gas and is used in the creation of Teflon.']
};
const Ne = {
	id:'m_d', n:'Neon', u:false, c:[items.Ne20,items.Ne21,items.Ne22],
	info: ['There are three stable isotopes of Neon with Neon20 being the most naturally abundant. Neon is used in lights and advertising signs.']
};
const Na = {
	id:'m_e', n:'Sodium', u:false, c:[items.Na23],
	info: ['Sodium is used in sodium vapor lamps (widely used as street lights) and sodium-ion batteries.', 
		'Sodium is cheaper than lithium but sodium-ion battery technology is not as mature as lithium-ion.']
};
const Mg = {
	id:'m_f', n:'Magnesium', u:false, c:[items.Mg24,items.Mg25,items.Mg26],
	info: ['Magnesium is essential for many human body functions including healthy bones and heart. It is found in leafy greens, nuts, seeds and more.']
};
const Al = {
	id:'m_g', n:'Aluminum', u:false, c:[items.Al27],
	info: ['Aluminum, also spelled aluminium, is a very abundant metal on Earth. It is used in food storage and many other industries.']
};
const Si = {
	id:'m_h', n:'Silicon', u:false, c:[items.Si28,items.Si29,items.Si30],
	info: ['Silicon is used in semiconductors and solar cells. When combined with oxygen it makes silicone, which is used in making parts for toys.']
};
const P = {
	id:'m_i', n:'Phosphorus', u:false, c:[items.P31],
	info: ['Phosphorus is used in matches.']
};
const S = {
	id:'m_j', n:'Sulfur', u:false, c:[items.S32,items.S33,items.S34,items.S36],
	info: ['Sulfur is found pure in nature, likely from volcanoes.']
};
const Cl = {
	id:'m_k', n:'Chlorine', u:false, c:[items.Cl35,items.Cl37],
	info: ['Chlorine is a commonly used to purify drinking water and swimming pools.']
};
const Ar = {
	id:'m_l', n:'Argon', u:false, c:[items.Ar36,items.Ar38,items.Ar40],
	info: ['Argon is intert and colorless but glows blue when excited by an electrical charge.']
};
const K = {
	id:'m_m', n:'Potassium', u:false, c:[items.K39,items.K40,items.K41],
	info: ['Potassium is an electrolyte the body needs to function but is harmful in larger quantities.']
};
const Ca = {
	id:'m_n', n:'Calcium', u:false, c:[items.Ca40,items.Ca42,items.Ca43,items.Ca44,items.Ca46,items.Ca48],
	info: ['Calcium in it\'s pure form is rare, it is often associated with bone strength.']
};
const Sc = {
	id:'m_o', n:'Scandium', u:false, c:[items.Sc45],
	info: ['Scandium has few uses outside of research.']
};
const Ti = {
	id:'m_p', n:'Titanium', u:false, c:[items.Ti46,items.Ti47,items.Ti48,items.Ti49,items.Ti50],
	info: ['Titanium is a very strong but light and is used in alloys for aerospace industries. It is also used in several other industries.']
};
const V = {
	id:'m_q', n:'Vanadium', u:false, c:[items.V50,items.V51],
	info: ['Vandium is mostly used in vandium-steel alloys.']
};
const Cr = {
	id:'m_r', n:'Chromium', u:false, c:[items.Cr50,items.Cr52,items.Cr53,items.Cr54],
	info: ['Chromium is often used to harden steel and increase rust resistance.']
};
const Mn = {
	id:'m_s', n:'Manganese', u:false, c:[items.Mn55],
	info: ['Manganese is used as a component in a steel alloy for railroad tracks and other industries.']
};
const Fe = {
	id:'m_t', n:'Iron', u:false, c:[items.Fe54,items.Fe56,items.Fe57,items.Fe58],
	info: ['Iron rusts easily but is the most used metal. It is mostly used to manufacture steel.']
};
const Co = {
	id:'m_u', n:'Cobalt', u:false, c:[items.Co59],
	info: ['Cobalt can be magnetised and is used in industries where high-temperature strength is important.']
	};
const Ni = {
	id:'m_v', n:'Nickel', u:false, c:[items.Ni58,items.Ni60,items.Ni61,items.Ni62,items.Ni64],
	info: ['Nickel is mainly used in making steel alloys like stainless steel.']
};
const Cu = {
	id:'m_w', n:'Copper', u:false, c:[items.Cu63,items.Cu65],
	info: ['Copper was the first metal worked by humans and was eventually mixed with tin to make bronze.']
};
const Zn = {
	id:'m_x', n:'Zinc', u:false, c:[items.Zn64,items.Zn66,items.Zn67,items.Zn68,items.Zn70],
	info: ['Zinc is mostly used in a process called galvanising, this helps prevent rusting.']
};
const Ga = {
	id:'m_y', n:'Gallium', u:false, c:[items.Ga69,items.Ga71],
	info: ['Gallium is used as part of gallium arsenide in semiconductors, lasers, and other electronics.']
};
const Ge = {
	id:'m_z', n:'Germanium', u:false, c:[items.Ge70,items.Ge72,items.Ge73,items.Ge74,items.Ge76],
	info: ['Germanium is a semiconductor often mixed with arsenic or gallium and used in transistors.']
};
const As = {
	id:'m_A', n:'Arsenic', u:false, c:[items.As75],
	info: ['Arsenic is most commonly known as a poison but is also used in semiconductors and has even been used in medicine.']
};
const Se = {
	id:'m_B', n:'Selenium', u:false, c:[items.Se74,items.Se76,items.Se77,items.Se78,items.Se80,items.Se82],
	info: ['Selenium is mostly used as an additive to glass. It is also used in solar cells and copier machines.']
};
const Br = {
	id:'m_C', n:'Bromine', u:false, c:[items.Br79,items.Br81],
	info: ['Bromine has many uses, some are being phased out for environmental reasons.']
};
const Kr = {
	id:'m_D', n:'Krypton', u:false, c:[items.Kr78,items.Kr80,items.Kr82,items.Kr83,items.Kr84,items.Kr86],
	info: ['Krypton is often used in sluorescent lights or flash lamps for high speed photography.']
};
const Rb = {
	id:'m_E', n:'Rubidium', u:false, c:[items.Rb85,items.Rb87],
	info: ['Rubidium is mostly used in research and has few comercial uses.']
};
const Sr = {
	id:'m_F', n:'Strontium', u:false, c:[items.Sr84,items.Sr86,items.Sr87,items.Sr88],
	info: ['Strontium is used in red fireworks and glow-in-the-dark paints.']
};
const Y = {
	id:'m_G', n:'Yttrium', u:false, c:[items.Y89],
	info: ['Yttrium is used in different alloys and in synthetic yttrium-aluminum garnets as part of metal cutting lasers.']
};
const Zr = {
	id:'m_H', n:'Zirconium', u:false, c:[items.Zr90,items.Zr91,items.Zr92,items.Zr94,items.Zr96],
	info: ['Zirconium is mostly used in nuclear power stations.']
};
const Nb = {
	id:'m_I', n:'Niobium', u:false, c:[items.Nb93],
	info: ['Niobium is unsed in alloys including stainless steel.']
};
const Mo = {
	id:'m_J', n:'Molybdenum', u:false, c:[items.Mo92,items.Mo94,items.Mo95,items.Mo96,items.Mo97,items.Mo98,items.Mo100],
	info: ['Molybdenum is part of a hardened steel alloy used in engines.']
};
const Tc = {
	id:'m_K', n:'Technetium', u:false, c:[items.Tc97],
	info: ['Technetium is a radioactive element with no stable isotopes. I included the isotope with the longest halflife.']
};
const Ru = {
	id:'m_L', n:'Ruthenium', u:false, c:[items.Ru96,items.Ru98,items.Ru99,items.Ru100,items.Ru101,items.Ru102,items.Ru104],
	info: ['Ruthenium is primarily used in electronic resistors and electrical contacts or acetic acid production.']
};
const Rh = {
	id:'m_M', n:'Rhodium', u:false, c:[items.Rh103],
	info: ['Rhodium is mostly used in catalytic converters.']
};
const Pd = {
	id:'m_N', n:'Palladium', u:false, c:[items.Pd102,items.Pd104,items.Pd105,items.Pd106,items.Pd108,items.Pd110],
	info: ['Palladium is used in catalytic converts as well as jewellry. A gold-palladium alloy is also known as white gold.']
};
const Ag = {
	id:'m_O', n:'Silver', u:false, c:[items.Ag107,items.Ag109],
	info: ['Silver is used in jewellery and mirrors. It is the best known reflector of visible light.']
};
const Cd = {
	id:'m_P', n:'Cadmium', u:false, c:[items.Cd106,items.Cd108,items.Cd110,items.Cd111,items.Cd112,items.Cd113,items.Cd114,items.Cd116],
	info: ['Cadmium is a poison that causes birth defects and cancer. It is used in some rechargable batteries but they are being phased out.']
};
const In = {
	id:'m_Q', n:'Indium', u:false, c:[items.In113,items.In115],
	info: ['Indium is mostly used in electronics like touch screens and solar panels.']
};
const Sn = {
	id:'m_R', n:'Tin', u:false, c:[items.Sn112,items.Sn114,items.Sn115,items.Sn116,items.Sn117,items.Sn118,items.Sn119,items.Sn120,items.Sn122,items.Sn124],
	info: ['Tin has many uses from food storage to pewter. Bronze was one of the first alloys, made with copper and tin.']
};
const Sb = {
	id:'m_S', n:'Antimony', u:false, c:[items.Sb121,items.Sb123],
	info: ['Antimonoy is used in some semiconductor devices like IR detectors and diodes. It is also used in a Pb-Sb alloy in batteries.']
};
const Te = {
	id:'m_T', n:'Tellurium', u:false, c:[items.Te120,items.Te122,items.Te123,items.Te124,items.Te125,items.Te126,items.Te128,items.Te130],
	info: ['Tellurium is used in alloys with copper and stainless steel to improve strength and hardness.']
};
const I = {
	id:'m_U', n:'Iodine', u:false, c:[items.I127],
	info: ['Iodine was initially used in photography in the 1800s. It is now used in pharmacuticals and disinfectants.']
};
const Xe = {
	id:'m_V', n:'Xenon', u:false, c:[items.Xe124,items.Xe126,items.Xe128,items.Xe129,items.Xe130,items.Xe131,items.Xe132,items.Xe134,items.Xe136],
	info: ['Xenon is used in special light bulbs and in ion propulsion systems used by some satellites.']
};
const Cs = {
	id:'m_W', n:'Cesium', u:false, c:[items.Cs133],
	info: ['Cesium is mostly used in drilling fluids. It is also used in some optical glass and radiation monitoring equipment.']
};
const Ba = {
	id:'m_X', n:'Barium', u:false, c:[items.Ba130,items.Ba132,items.Ba134,items.Ba135,items.Ba136,items.Ba137,items.Ba138],
	info: ['Barium is mostly used in drilling fluids for oil and gas wells.']
};
const La = {
	id:'m_Y', n:'Lanthanum', u:false, c:[items.La138,items.La139],
	info: ['Lanthanum alloys have been used in hydrogen tanks for hydrogen powered vehicles.']
};
const Ce = {
	id:'m_Z', n:'Cerium', u:false, c:[items.Ce136,items.Ce138,items.Ce140,items.Ce142],
	info: ['Cerium oxide is used in the walls of self-cleaning ovens as well as catalytic converters.']
};
const Pr = {
	id:'m_10', n:'Praseodymium', u:false, c:[items.Pr141],
	info: ['Praseodymium is used in some high-strength alloys used in aircraft engines.']
};
const Nd = {
	id:'m_11', n:'Neodymium', u:false, c:[items.Nd142,items.Nd143,items.Nd144,items.Nd145,items.Nd146,items.Nd148,items.Nd150],
	info: ['Neodymium is used in an alloy with iron and boron to make strong magnets.']
};
const Pm = {
	id:'m_12', n:'Promethium', u:false, c:[items.Pm145],
	info: ['Promethium is a radioactive metal that is mostly used in research. There are no stable isotopes, Pm145 has a half-life of almost 18 years.']
};
const Sm = {
	id:'m_13', n:'Samarium', u:false, c:[items.Sm144,items.Sm147,items.Sm148,items.Sm149,items.Sm150,items.Sm152,items.Sm154],
	info: ['Samarium is used in an alloy with cobalt in microwaves.']
};
const Eu = {
	id:'m_14', n:'Europium', u:false, c:[items.Eu151,items.Eu153],
	info: ['Europium glows red under UV light and is used in printing of euro banknotes.']
};
const Gd = {
	id:'m_15', n:'Gadolinium', u:false, c:[items.Gd152,items.Gd154,items.Gd155,items.Gd156,items.Gd157,items.Gd158,items.Gd160],
	info: ['Gadolinium is used in small amounts in iron and chromium alloys.']
};
const Tb = {
	id:'m_16', n:'Terbium', u:false, c:[items.Tb159],
	info: ['Terbium is used in some x-ray devices and lasers.']
};
const Dy = {
	id:'m_17', n:'Dysprosium', u:false, c:[items.Dy156,items.Dy158,items.Dy160,items.Dy161,items.Dy162,items.Dy163,items.Dy164],
	info: ['Dysprosium is mainly used in alloys with neodymium magnets.']
};
const Ho = {
	id:'m_18', n:'Holmium', u:false, c:[items.Ho165],
	info: ['Holmium can absorb neutrons and is used in nuclear reactors.']
};
const Er = {
	id:'m_19', n:'Erbium', u:false, c:[items.Er162,items.Er164,items.Er166,items.Er167,items.Er168,items.Er170],
	info: ['Erbium can be used in alloys to reduce hardness and improve workability.']
};
const Tm = {
	id:'m_1a', n:'Thulium', u:false, c:[items.Tm169],
	info: ['Thulium is used in some medical x-ray machines.']
};
const Yb = {
	id:'m_1b', n:'Ytterbium', u:false, c:[items.Yb168,items.Yb170,items.Yb171,items.Yb172,items.Yb173,items.Yb174,items.Yb176],
	info: ['Ytterbium can be used in some memory devices and as an industrial catalyst.']
};
const Lu = {
	id:'m_1c', n:'Lutetium', u:false, c:[items.Lu175,items.Lu176],
	info: ['Lutetium is mostly used in research.']
};
const Hf = {
	id:'m_1d', n:'Hafnium', u:false, c:[items.Hf174,items.Hf176,items.Hf177,items.Hf178,items.Hf179,items.Hf180],
	info: ['Hafnium is used in nuclear submarines and plasma welding torches.']
};
const Ta = {
	id:'m_1e', n:'Tantalum', u:false, c:[items.Ta181],
	info: ['Tantalum is used as an insulating coating in electronics.']
};
const W = {
	id:'m_1f', n:'Tungsten', u:false, c:[items.W180,items.W182,items.W183,items.W184,items.W186],
	info: ['Tungsten has the highest melting point of all metals and is used in incandescent light bulbs.']
};
const Re = {
	id:'m_1g', n:'Rhenium', u:false, c:[items.Re185,items.Re187],
	info: ['Rhenium has a high melting point and is often combined in alloys with tungsten and molybdenum.']
};
const Os = {
	id:'m_1h', n:'Osmium', u:false, c:[items.Os184,items.Os186,items.Os187,items.Os188,items.Os189,items.Os190,items.Os192],
	info: ['Osmium has few uses including fountain pen tips and electrical contacts.']
};
const Ir = {
	id:'m_1i', n:'Iridium', u:false, c:[items.Ir191,items.Ir193],
	info: ['Iridium is the most corosion resistant material known and is used in the standard meter bar.']
};
const Pt = {
	id:'m_1j', n:'Platinum', u:false, c:[items.Pt190,items.Pt192,items.Pt194,items.Pt195,items.Pt196,items.Pt198],
	info: ['Platinum is mostly used in catalytic converters but is also in jewellery and electronics.']
};
const Au = {
	id:'m_1k', n:'Gold', u:false, c:[items.Au197],
	info: ['Gold is often used in jewellery. 24-carat gold is pure gold, but it is often used as an alloy to improve durability.']
};
const Hg = {
	id:'m_1l', n:'Mercury', u:false, c:[items.Hg196,items.Hg198,items.Hg199,items.Hg200,items.Hg201,items.Hg202,items.Hg204],
	info: ['Mercury is a heavy liquid metal and is being phased out of many uses due to toxicity.']
};
const Tl = {
	id:'m_1m', n:'Thallium', u:false, c:[items.Tl203,items.Tl205],
	info: ['Thallium use is limited due to toxicity, but it is used in photoelectric cells.']
};
const Pb = {
	id:'m_1n', n:'Lead', u:false, c:[items.Pb204,items.Pb206,items.Pb207,items.Pb208],
	info: ['Lead has been used for centuries in many areas, many of them have been replaced with other materials due to negative health effects.']
};
const Bi = {
	id:'m_1o', n:'Bismuth', u:false, c:[items.Bi209],
	info: ['Bismuth has a low melting point and is used in fire detectors.']
};
const Po = {
	id:'m_1p', n:'Polonium', u:false, c:[items.Po209],
	info: ['Polonium has no known stable isotopes and has few uses outside of research.']
};
const At = {
	id:'m_1q', n:'Astatine', u:false, c:[items.At210],
	info: ['Astatine has no known stable isotopes and is only used in research.']
};
const Rn = {
	id:'m_1r', n:'Radon', u:false, c:[items.Rn222],
	info: ['Radon has no known stable isotopes but has been used in radiation therapy to treat cancer.']
};
const Fr = {
	id:'m_1s', n:'Francium', u:false, c:[items.Fr223],
	info: ['Francium has no known stable isotopes and has no uses.']
};
const Ra = {
	id:'m_1t', n:'Radium', u:false, c:[items.Ra226],
	info: ['Radium has no known stable isotopes and is used in some radiation therapy to treat cancer.']
};
const Ac = {
	id:'m_1u', n:'Actinium', u:false, c:[items.Ac227],
	info: ['Actinium has no known stable isotopes and is rarely used outside of research.']
};
const Th = {
	id:'m_1v', n:'Thorium', u:false, c:[items.Th232],
	info: ['Thorium can be used as a source of nuclear power and is more abundant than uranium but is still a new technology.']
};
const Pa = {
	id:'m_1w', n:'Protactinium', u:false, c:[items.Pa231],
	info: ['Protactinium has no known stable isotopes and is rarely used outside of research.']
};
const U = {
	id:'m_1x', n:'Uranium', u:false, c:[items.U234,items.U235,items.U238],
	info: ['Uranium as a source of nuclear power and in nuclear weapons.']
};
const Np = {
	id:'m_1y', n:'Neptunium', u:false, c:[items.Np237],
	info: ['Neptunium has no known stable isotopes and is rarely used outside of research.']
};
const Pu = {
	id:'m_1z', n:'Plutonium', u:false, c:[items.Pu244],
	info: ['Plutonium is used in some nuclear weapons and nuclear energy in space crafts such as the Curiosity Rover on Mars.']
};
const Am = {
	id:'m_1A', n:'Americium', u:false, c:[items.Am243],
	info: ['Americium mostly used in smoke alarms.']
};
const Cm = {
	id:'m_1B', n:'Curium', u:false, c:[items.Cm247],
	info: ['Curium has been used as a power source in space missions.']
};
const Bk = {
	id:'m_1C', n:'Berkelium', u:false, c:[items.Bk247],
	info: ['Berkelium has no known stable isotopes and is used in research.']
};
const Cf = {
	id:'m_1D', n:'Californium', u:false, c:[items.Cf251],
	info: ['Californium can be used in portable metal detectors.']
};
const Es = {
	id:'m_1E', n:'Einsteinium', u:false, c:[items.Es252],
	info: ['Einsteinium has no known stable isotopes and is only used in research.']
};
const Fm = {
	id:'m_1F', n:'Fermium', u:false, c:[items.Fm257],
	info: ['Fermium has no known stable isotopes and is only used in research.']
};
const Md = {
	id:'m_1G', n:'Mendelevium', u:false, c:[items.Md258],
	info: ['Mendelevium has no known stable isotopes and is only used in research.']
};
const No = {
	id:'m_1H', n:'Nobelium', u:false, c:[items.No261],
	info: ['Nobelium has no known stable isotopes and is only used in research.']
};
const Lr = {
	id:'m_1I', n:'Lawrencium', u:false, c:[items.Lr264],
	info: ['Lawrencium has no known stable isotopes and is only used in research.']
};
const Rf = {
	id:'m_1J', n:'Rutherfordium', u:false, c:[items.Rf265],
	info: ['Rutherfordium has no known stable isotopes and is only used in research.']
};
const Db = {
	id:'m_1K', n:'Dubnium', u:false, c:[items.Db268],
	info: ['Dubnium has no known stable isotopes and is only used in research.']
};
const Sg = {
	id:'m_1L', n:'Seaborgium', u:false, c:[items.Sg271],
	info: ['Seaborgium has no known stable isotopes and is only used in research.']
};
const Bh = {
	id:'m_1M', n:'Bohrium', u:false, c:[items.Bh273],
	info: ['Bohrium has no known stable isotopes and is only used in research.']
};
const Hs = {
	id:'m_1N', n:'Hassium', u:false, c:[items.Hs276],
	info: ['Hassium has no known stable isotopes and is only used in research.']
};
const Mt = {
	id:'m_1O', n:'Meitnerium', u:false, c:[items.Mt278],
	info: ['Meitnerium has no known stable isotopes and is only used in research.']
};
const Ds = {
	id:'m_1P', n:'Darmstadtium', u:false, c:[items.Ds281],
	info: ['Darmstadtium has no known stable isotopes and is only used in research.']
};
const Rg = {
	id:'m_1Q', n:'Roentgenium', u:false, c:[items.Rg283],
	info: ['Roentgenium has no known stable isotopes and is only used in research.']
};
const Cn = {
	id:'m_1R', n:'Copernicium', u:false, c:[items.Cn285],
	info: ['Copernicium has no known stable isotopes and is only used in research.']
};
const Nh = {
	id:'m_1S', n:'Nihonium', u:false, c:[items.Nh287],
	info: ['Nihonium has no known stable isotopes and is only used in research.']
};
const Fl = {
	id:'m_1T', n:'Flerovium', u:false, c:[items.Fl289],
	info: ['Flerovium has no known stable isotopes and is only used in research.']
};
const Mc = {
	id:'m_1U', n:'Moscovium', u:false, c:[items.Mc291],
	info: ['Moscovium has no known stable isotopes and is only used in research.']
};
const Lv = {
	id:'m_1V', n:'Livermorium', u:false, c:[items.Lv292],
	info: ['Livermorium has no known stable isotopes and is only used in research.']
};
const Ts = {
	id:'m_1W', n:'Tennessine', u:false, c:[items.Ts292],
	info: ['Tennessine has no known stable isotopes and is only used in research.']
};
const Og = {
	id:'m_1X', n:'Oganesson', u:false, c:[items.Og293],
	info: ['Oganesson has no known stable isotopes and is only used in research.']
};

//transition metal subgroups (By Period)
const TMP4 = {
	id:'m_1Y', n:'Period 4', u:false,
	info:['There are so many Transition Metals I split them up by period.'],
	c:[Sc,Ti,V,Cr,Mn,Fe,Co,Ni,Cu,Zn]
}
const TMP5 = {
	id:'m_1Z', n:'Period 5', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Y,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd]
}
const TMP6 = {
	id:'m_20', n:'Period 6', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Lu,Hf,Ta,W,Re,Os,Ir,Pt,Au,Hg]
}
const TMP7 = {
	id:'m_21', n:'Period 7', u:false,
	info:['There are so many Transition Metals I split them up by period'],
	c:[Rf,Db,Sg,Bh,Hs,Mt,Ds,Rg,Cn]
}

//element families
const AlkaliMetal = {
	id:'m_22', n:'Alkali Metal', u:false, c:[Li,Na,K,Rb,Cs,Fr],
	info: ['Alkali Metals are soft, shiny, and highly reactive.']
}
const AlkalineEarthMetal = {
	id:'m_23', n:'Alkaline Earth Metal', u:false, c:[Be,Mg,Ca,Sr,Ba,Ra],
	info: ['Alkaline Earth Metals are not found free in nature, they are only found as compounds with other elements.']
}
const Actinide = {
	id:'m_24', n:'Actinide', u:false, c:[Ac,Th,Pa,U,Np,Pu,Am,Cm,Bk,Cf,Es,Fm,Md,No,Lr],
	info: ['Actinides are all radioactive and have no stable isotopes. In this game I included isotopes with the longest decay rate.']
}
const Chalcogen = {
	id:'m_25', n:'Chalcogen', u:false, c:[O,S,Se,Te,Po],
	info:['Chalcogens have an unusual property called catenation, which means atoms will bond to other identical atoms to form a molecule.', 
		'For example when oxygen bonds to other oxygen atoms it can form an ozone molecule.']
}
const Halogen = {
	id:'m_26', n:'Halogen', u:false, c:[F,Cl,Br,I,At,Ts],
	info:['Halogens are only found combined with other elements in nature.']
}
const Lanthanide = {
	id:'m_27', n:'Lanthanide', u:false, c:[La,Ce,Pr,Nd,Pm,Sm,Eu,Gd,Tb,Dy,Ho,Er,Tm,Yb],
	info: ['Lanthanide are sometimes called rare-earth elements or rare-earth metals.']
}
const Metalloid = {
	id:'m_28', n:'Metalloid', u:false, c:[B,Si,Ge,As,Sb],
	info: ['Metalloids have properties between metals and nonmetals.']
}
const NobelGas = {
	id:'m_29', n:'Nobel Gas', u:false, c:[He,Ne,Ar,Kr,Xe,Rn,Og],
	info: ['Noble gasses are naturally occurring and have very low reactivity.']
}
const Nonmetal = {
	id:'m_2a', n:'Other Nonmetal', u:false, c:[H,C,N,P],
	info: ['Other nonmetals or sometimes just nonmetals are a diverse group of elements between the metalloids and halogens.']
}
const PoorMetal = {
	id:'m_2b', n:'Post-transition Metal', u:false, c:[Al,Ga,In,Sn,Tl,Pb,Bi,Nh,Fl,Mc,Lv],
	info:['Post-transition Metals go by a few names including: poor metals, other metals, p-block metals, and chemically weak metals.']
}
const TransitionMetal = {
	id:'m_2c', n:'Transition Metal', u:false, c:[TMP4,TMP5,TMP6,TMP7],
	info:['Transition metals are typically hard. There are many, spanning multiple periods and groups (rows and columns) through the periodic table.']
}

const primaryAmine = {
	id:'m_2d', n:'Primary Amine', u:false, c:[items.methylamine],
	info: ['Primary Amines are an ammonia molecule with one hydrogen replaced with a hydrocarbon.']
}
const secondaryAmine = {
	id:'m_2e', n:'Secondary Amine', u:false, c:[items.dimethylamine],
	info: ['Secondary Amines are an ammonia molecule with two hydrogen replaced with a hydrocarbon.']
}
const tertiaryAmine = {
	id:'m_2f', n:'Tertiary Amine', u:false, c:[items.trimethylamine],
	info: ['Tertiary Amines are an ammonia molecule with all three hydrogen replaced with a hydrocarbon.']
}

//trinitrotouline: toluene + 3water + 3nitro = TNT + 3x hydronium (h3o)

const aliphaticAmide = {
	id:'m_2g', n:'Aliphatic Amide', u:false, c:[items.acetamide],//from acetic acid + ammonia = acetamide + water
	info: ['Aliphatic amides bond the nitrogen to an alkyl group.']
}
const aromaticAmide = {
	id:'m_2h', n:'Aromatic Amide', u:false, c:[items.benzamide],//from benzoic acid + ammonia = benzamide + water
	info: ['Aromatic amides bond the nitrogen to an aryl group.']
}


//IUPAC functional groups
const alkane = {
	id:'m_2i', n:'Alkane', u:false, c:[items.methane,items.ethane,items.propane,items.butane],
	info: ['Alkanes are saturaded hydrocarbons, meaning they consist of hydrogen and carbon with single covalent bonds between carbon atoms.']
}
const alkene = {
	id:'m_2j', n:'Alkene', u:false, c:[items.methene,items.ethene,items.propene,items.butene],
	info: ['Alkenes are hydrocarbons with at least one carbon atom double bonded to another carbon atom.']
}
const alkyne = {
	id:'m_2k', n:'Alkyne', u:false, c:[items.ethyne,items.propyne,items.butyne],
	info: ['Alkenes are hydrocarbons with at least one carbon atom triple bonded to another carbon atom.']
}
const benzeneRing = {
	id:'m_2l', n:'Benzene Ring', u:false, c:[items.benzene,items.toluene],
	info: ['A benzene ring contains a cyclic hydrocarbon.']
}
const amine = {
	id:'m_2m', n:'Amine', u:false, c:[primaryAmine,secondaryAmine,tertiaryAmine],
	info: ['Amines contain a nitrogen and hydrogen bonded to a hydrocarbon.']
}
const alcohol = {
	id:'m_2n', n:'Alcohol', u:false, c:[items.methanol,items.ethanol,items.propanol,items.coniferylAlcohol,items.sinapylAlcohol,items.coumerylAlcohol],//isopropanol,items.butanol,items.glycerol,items.propylene glycol
	info: ['Alcohols are an oganic compound that contain a hydroxyl group OH bonded to a carbon atom.']
}
const hydroxyl = {
	id:'m_2o', n:'Hydroxyl', u:false, c:[items.coniferylAlcohol,items.phenol],
	info: ['Hydroxyls are organic compounds with an Oxygen atom bonded to a Hydrogen atom (-OH).']
}
const carbonyl = {
	id:'m_2p', n:'Carbonyl', u:false, c:[items.phenylalanine],
	info: ['Carboxyls are organic compounds with a carbon atom double-bonded to an oxygen atom that is single bonded to a hydroxyl group (-OH).', 
		'This follows the pattern -COOH']
}

const ether = {
	id:'m_2q', n:'Ether', u:false, c:[],
	info: ['']
}
const alkylHalide = {
	id:'m_2r', n:'Alkyl Halide', u:false, c:[],
	info: ['']
}
const thiol = {
	id:'m_2s', n:'Thiol', u:false, c:[],
	info: ['']
}
const aldehyde = {
	id:'m_2t', n:'Aldehyde', u:false, c:[items.formeldehyde],
	info: ['Aldehydes have a carbonyl group conded to a hydrogen atom.']
}
const ketone = {
	id:'m_2u', n:'Ketone', u:false, c:[],
	info: ['']
}
const ester = {
	id:'m_2v', n:'Ester', u:false, c:[],
	info: ['']
}
const carboxylicAcid = {
	id:'m_2w', n:'Carboxylic Acid', u:false, c:[items.aceticAcid,items.formicAcid,items.benzoicAcid],
	info: ['Carboxylic acids are generally weak acids that contain a carboxyl group of COOH.']
}
const amide = {
	id:'m_2x', n:'Amide', u:false, c:[aliphaticAmide,aromaticAmide],
	info: ['Amides contain a carbonyl group C=0 bonded to a nitrogen atom.']
}
const nitrile = {
	id:'m_2y', n:'Nitrile', u:false, c:[],
	info: ['Nitriles have a carbon atom triple bonded to a nitrogen atom.']
}

const monosaccharide = {
	id:'m_2z', n:'Monosaccharide', u:false, c:[items.glucose,items.fructose,items.sucrose,items.ribose,items.xylose,items.mannose,items.galactose,items.arabinose],
	info:['Monosaccharides are a simple form of carbohydrates and are often called simple sugars.']
}
const polysaccharide = {
	id:'m_2A', n:'Polysaccharide', u:false, c:[items.cellulose,items.glycogen,items.hemicellulose],
	info:['Polysaccharides are chains of monosaccharide molecules.', 
		'In this game I standardized chain lengths to something I thought seemed good. In the universe there are more possible sizes and ingredient ratios.', 
		'As with many things in thig game, polysaccharide recipes have been simplified.']
}
const carbohydrate = {
	id:'m_2B', n:'Carbohydrate', u:false, c:[monosaccharide,polysaccharide],
	info: ['Carbohydrate serve as a primary source of energy for most known living organisms.']
}
const lignin = {
	id:'m_2C', n:'Lignin', u:false, c:[items.hardLignin,items.softLignin],
	info: ['Lignins are complex polymers derived from amino acids.', 'There are many types of lignins, this game has some.']
}
const woodMolecule = {
	id:'m_2D', n:'Wood', u:false, c:[items.hardwoodParticle,items.softwoodParticle],
	info: ['Wood is mostly composed of cellulose, hemicellulose, and lignin.', 'There are many types of wood, this game has some.']
}
//epoxide,items.imine,items.acidChloride,items.anhydride (carboxylic Anhydride?), nitro, sulfide(thioether), azide
const organicFunctionalGroup = {
	id:'m_2E', n:'Functional Groups', u:false, c:[alkane,alkene,alkyne,benzeneRing,amine,alcohol,hydroxyl,carbonyl,ether,alkylHalide,thiol,aldehyde,ketone,ester,carboxylicAcid,amide,nitrile],
	info:['Functional groups organize organic compounds with similar characteristic chemical reactions.']
}
const complexOrganicMaterial = {
	id:'m_2F', n:'Complex Material', u:false, c:[lignin,woodMolecule,items.pfGlue],
	info: ['Complex Organic Materials is a group for items that are not in functional groups and are more complex building blocks of organic material.']
}


const organic = {
	id:'m_2G', n:'Organic Compounds', u:false, c:[organicFunctionalGroup,carbohydrate,complexOrganicMaterial],
	info:['Organic compounds contain bonded carbon and hydrogen atoms along with other elements.']
}

const binaryHydride = {
	id:'m_2H', n:'Binary Hydride', u:false, c:[items.ammonia,items.water,items.heavyWater,items.tritiatedWater,items.hydronium],
	info:['Binary hydrides contain hydrogen and one other element.']
}
const binaryOxide = {
	id:'m_2I', n:'Binary Oxide', u:false, c:[items.water,items.carbonMonoxide,items.carbonDioxide,items.heavyWater,items.tritiatedWater,items.hydronium],
	info:['Binary oxides contain hydrogen and one other element.']
}

const steel = {
	id:'m_2J', n:'Steel', u:false, c:[items.mildSteel,items.highSteel],
	info:['Steel is an iron alloy with a small amount of carbon.', 'There are many types of steel alloys, I have included a few recipes based on some average inputs.']
}
const metalAlloys = {
	id:'m_2K', n:'Metal Alloys', u:false, c:[steel],
	info:['Metal alloys are materials composed of a metal and one or more other elements.']
}

const acid = {
	id:'m_2L', n:'Acid', u:false, c:[items.HCl,items.H2SO4],
	info:['Acids generally contain hydrogen ions that can dissociate in water.']
}

const base = {
	id:'m_2M', n:'Base', u:false, c:[items.NaOH,items.KOH],
	info:['Bases react with the hydrogen ions and neutralize the acids.']
}

const salt = {
	id:'m_2N', n:'Salts', u:false, c:[items.NaCl,items.KCl,items.Na2S,items.Na2SO4],
	info:['Salts can be formed as a result of combining acids and bases.']
}

const allotrope = {
	id:'m_2O', n:'Allotrope', u:false, c:[items.dihydrogen,items.deuteratedDihydrogen,items.dioxygen],
	info:['Allotropes are homonuclear molecules that have atoms of the same element.']
}
const binaryCompound = {
	id:'m_2P', n:'Binary Compounds', u:false, c:[binaryHydride,binaryOxide],
	info:['Binary compounds have two unique elements.']
}

const simpleCompounds = {
	id:'m_2Q', n:'Simple Compounds', u:false, c:[allotrope,binaryCompound],
	info:['Simple Compounds are made on a molecular level and have few elements.']
}

const feldspar = {
	id:'m_30', n:'Feldspar', u:false, c:[items.plagioclaseFeldspar,items.alkaliFeldspar],
	info:['Feldspars are a group of rocks that make up over half of the Earth\'s crust.', 'There are many types of feldspars, I have included some.']
}

const mica = {
	id:'m_31', n:'Mica', u:false, c:[items.biotiteMica],
	info:['Mica is a type of mineral that can be broken into thin plates.', 'There are many types of micas, I have included some.']
}

const minerals = {
	id:'m_2Z', n:'Minerals', u:false, c:[items.quartz,feldspar,mica],
	info:['Minerals are the components of rocks.', 'As with many things in this game mineral types have been simplified.']
}

const inorganic = {
	id:'m_2R', n:'Inorganic Compounds', u:false, c:[simpleCompounds,metalAlloys,salt,acid,base,minerals],
	info:['Inorganic compounds do not contain carbon-hydrogen bonds.']
}

const woodMotes = {
	id:'m_2S', n:'Motes', u:false, c:[items.hardwoodFiber,items.softwoodFiber,items.hardwoodChip,items.softwoodChip,items.hardwoodPulp,items.softwoodPulp],
	info:['Wood Motes are small pieces of wood.']
}

const lumberProduction = {
	id:'m_2T', n:'Lumber Production', u:false, c:[items.pfGlueDrip,items.pfGlueDrop],
	info:['In lumber production chemicals are often used to create and treat wood.', 'There are many types of glues and chemical treatments, this game has some.']
}

const lumber = {
	id:'m_2U', n:'Lumber', u:false, c:[lumberProduction,items.hardwood5x10x3,items.softwood5x10x3,items.hardPly12,items.softPly12
		,items.hardPly18,items.softPly18,items.hardPly24,items.softPly24,items.hardPly28,items.softPly28],
	info:['Lumber is a common building material.', 'In this game I use lumber as a very broad term to include wooden construction material.']
}

const paper = {
	id:'m_2V', n:'Paper', u:false, c:[items.paperA4,items.paperA3,items.paperA2,items.paperA1,items.paperA0],
	info:['There are many types of paper made with different types of pulp.', ]
}
const woodHuman = {
	id:'m_2W', n:'Wood', u:false, c:[woodMotes,paper,lumber],
	info: ['Wood is mostly composed of cellulose, hemicellulose, and lignin.', 'There are many types of wood, this game has some.']
}
const paperMaking = {
	id:'m_2X', n:'Paper Making', u:false, c:[items.whiteLiquorMote,items.whiteLiquor,items.blackLiquor,paper],
	info: ['Chemicals used in paper making.']
}

const trains = {
	id:'m_33', n:'Trains', u:false, c:[items.trainBallast,items.railTie],
	info:['Trains are one of the most efficient ways to move humans and cargo.', ]
}
const industrial = {
	id:'m_2Y', n:'Industrial', u:false, c:[paperMaking,trains],
	info: ['Industrial items are generally chemicals used in industrial production proceses.']
}

//magnitude groups
const subatomic = {
    id:'M_a', n:'Subatomic', u: true,
	info: ['Subatomic components are the smallest items in this game.', 'In this game most subatomic items are free to create'],
    c:[Quark,Lepton,GaugeBoson,Baryon]
};
const atomic = {
    id:'M_b', n:'Atomic', u: false,
    info: [
		'Atoms have a nucleus, made of baryons, "orbited" by electrons.', 
		'The nucleus is held together by the Nuclear Force (AKA: Strong Nuclear Force), a byproduct of the Strong Force which holds the bayrons together.',
		'In modern physics baryonic matter (stuff made out of protons and neutrons) is estimated to be 5% of the universe. We don\'t know much about the other 95%.',
	],
    c:[AlkaliMetal,AlkalineEarthMetal,Actinide,Chalcogen,Halogen,Lanthanide,Metalloid,NobelGas,Nonmetal,PoorMetal,TransitionMetal]
};
const molecular = {
    id:'M_c', n:'Molecular', u: false,
    info: ['A molecule is the smallest mass of a substance while keeping its chemical properties.', 
		'There are countless types of molecules, this game has some.'],
    c:[inorganic,organic]
};
const human = {
    id:'M_d', n:'Human', u: false,
    info: ['Human scale is right in the middle, Malcome is human sized and also in the middle.'],
    c:[woodHuman,industrial]
};
const planetary = {
    id:'M_e', n:'Planetary', u: false,
    info: ['Planetary objects are about the size of a planet.', 
		'Earth is a terrestrial planet but there are several types of planetary scale objects.'],
    c:[]
};
const stellar = {
    id:'M_f', n:'Stellar', u: false,
    info: ['Stellar mass objects range from about one fifth the mass of our Sun to over 200 times the mass of our Sun.'],
    c:[]
};
const blackHole = {
    id:'M_g', n:'Black Hole', u: false,
    info: ['Black Holes are so dense they trap light; the smallest type of black holes range from about five to fifty solar masses. Supermassive Black Holes can be tens of billions times the mass of our Sun.'],
    c:[]	
}

const itemsMenu = [
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
	{id:'M_0', n:'Create', u:true, c:itemsMenu, info:['Imagination is the beginning of creation.'], intro:'This is where you will create items. Items are grouped by categories; some items may be in more than one category.'}, 
	{id:'M_1', n:'Discover', u:false, info:['He who never made a mistake never made a discovery.', 'Use the "Get Recipe" button if you are stuck.'], intro:'This is the main place for discovering new items. Click a (+>) button to add an item to the Matter Mutator. Click a (--) button to remove an item from the Matter Mutator. Try different combinations and click the "Scan" button. You can only add an item if you have some and it is not already in the Matter Mutator. Scanning items does not destroy them.'},
	{id:'M_2', n:'Manage', u:false, info:['If demand is greater than supply you have a deficit.'], intro:'This is a central location to monitor item flow. This table is one of the few places that will only update when "Refresh Table" is clicked.'},
	{id:'M_3', n:'Enhance', u:false, info:['Transmuter Output increases the output, but not the components or max setpoint.', 'The enhancements upgrade increases the effect of the other enhancements.'], intro:'These are global Enhancements that increase transmuter output and reduce transmuter upgrade cost. They do not change the set-point limits or transmuter levels.'},
	{id:'M_4', n:'Settings', u:true, info:['Settings can effect game mechanics and page contents.'], intro:'This is where you can change settings.'}, 
	{id:'M_5', n:'Help', u:true, info:['This is an idle crafting game focusing on discovery and supply flow management.'], intro:'Click on a subject category below for more information.'}
];

const help = [
	{t:'General', c:[
		'This is a crafting/discovery game with some supply chain management.',
		'',
		'You initially start by crafting subatomic materials but can eventually create increasingly larger items.',
		'Unfortunately the data file is missing several items that exist in the universe so there is some trial and error in discovering what items are craftable.',
		'',
		'(») Goto buttons will go to the item referenced. It will goto the item even if it is still locked through the normal menu.',
		'(->) Transmute buttons will manually run the item transmuter.',
		'(++) Upgrade buttons will upgrade the transmuter or enhancement.',
		'(+>) Add buttons will add an item to the Matter Mutator in the Discover tab.',
		'',
		'Misc:',
		'Some items can be found in multiple places, it is the same item just included in multiple places for convenience.',
		'Items can be accessed that have not been Discovered yet via (») Goto buttons. In order to access an item through the menu it will have to be Discovered from the Discovery tab.',
		'Many items can be acquired in multiple ways.',
		'A game cycle is about 1 second.',
		'Item symbols are not unique, if you hover over an item\'s symbol it will show the name.',
		'The Spacebar pauses the game'
	]},
	{t:'What should I do now?', c:[
		'There isn\'t a way to win this game. I\'m trying to appeal to people who want continuous growth; never-ending creation out of nothing: no resets, no prestiges, just pure unadulterated creation.',
		'',
		'Some things to work towards:',
		'* Upgrade Transmuter levels',
		'* Higher Enhancement bonus (See Enhance below for more information)',
		'* Larger Total Mass (See lower right corner)',
		'* Try to break the game with too much bigness',
		'* Creating larger and larger items (see if you can create a train, planet, or cosmos)',
		'',
		'If the game is progressing too slowly check the settings.',
		'If this game no longer interests you then go do something else.'
	]},
	{t:'Hotkeys', c:[
		'Menu navigation:',
		'Left/Right: Select the adjacent menu items of the same level',
		'Up/Down: Go up/down one level',
		'Numpad +/-: Go back/forward in selected menu history',
		'Numpad 0-9: Interact with common UI elements (Details Below)',
		'Note: hotkeys are disabled when an input element has focus.',
		'',
		'Create',
		'0: Manually transmute all recipes with sufficient input resources.',
		'1: Upgrade all transmuters with sufficient resources.',
		'2: Focus Flow input on the first transmuter that is above level 0.',
		'',
		'Discover',
		'Enter: focus search input',
		'1: Toggle Hide below limit.',
		'2: Focus limit input',
		'3: Get Recipe Hint',
		'4: Add hint to Matter Mutator',
		'',
		'Manage',
		'1: Toggle Hide Created = 0',
		'2: Toggle Hide Created < Flow',
		'3: Toggle Hide Created < Used',
		'4: Toggle Hide Used = 0',
		'5: Toggle Hide Used < Demand',
		'6: Toggle Hide Used < Created',
		'7: Toggle Hide Demand = 0',
		'8: Toggle Hide Demand < Created',
		'9: Toggle Hide Demand < Used',
		'',
		'Enhance',
		'1: Buy upgrade for Manual Output',
		'2: Buy upgrade for Transmuter Output',
		'3: Buy upgrade for Transmuter Cost',
		'ALT+1: Goto item to upgrade Manual Output',
		'ALT+2: Goto item to upgrade Transmuter Output',
		'ALT+3: Goto item to upgrade Transmuter Cost',
		'',
		'Settings',
		'1: Toggle Introduction Hints with a green border',
		'2: Toggle Flavor text and bonus info',
		'3: Toggle Used-In Spoiler Warning',
		'4: Toggle Cheater Mode',
		'5: Save Game',
		'8: Restore detault Settings',
		'',
		'Help',
		'0-9: Expand/Collapse help sections'
	]},
	{t:'Create', c:[
		'The Create tab lets you create items.',
		'',
		'The Inventory shows how many of the given item  you have. You can have up to 1125899906842624 (2^50) of any given item.',
		'Bulk storage storage is where surplus inventory is stored and is used in some transmuters.',
		'Bulk storage is available on items that have an inventory > 1048576 (2^20).',
		'',
		'Transmuters transmute (->) button will manually run the transmuter.',
		'Transmuter level (++) button will upgrade transmuters; this will increase the maximum flow.',
		'Note: transmuters with multiple outputs will use all outputs to upgrade the transmuter.',
		'',
		'The Transmuter will automatically create items based on the Transmuter Flow. It will only create items if you have the required components.',
		'For example if you have 10 Up Quarks, 10 Down Quarks, and have a Proton Flow set to 7 (Protons each need 2 Up Quarks and 1 Down Quark) the Proton transmuter is limited by Up Quarks and will make 5 Protons.',
		'',
		'Auto-upgrade will automatically upgrade a transmuter when it has at least double the cost in inventory. This is to avoid limiting other transmuter\'s production.',
		'An item\'s "Used In" list is available for items when it has a transmuter level over 2.',
	]},
	{t:'Discover', c:[
		'The Discover tab is a fun way to gain access to new items.',
		'',
		'Add items to the Matter Mutator box and scan the items. If it has the items for a recipe that exists in the data file you will unlock the item.',
		'There are many items that exist, this game has some and may be expanded in the future.',
		'',
		'There is no penalty for scanning items that do not match a recipe.',
		'You need at least one item in inventory to Scan it. You do not need multiple of any item even if the recipe takes more than one.',
		'Example: The H2O transmuter requires two Hydrogens and one Oxygen to create but you only need to have one of each item in order to discover H2O',
		'',
		'If you are stuck or want a recipe hint you can click the "Get Recipe" button',
		'You can [Get Recipe] approximately every 30 seconds. After about a 30 seconds the recipe will clear and the button will be available again.',
		'You can add the transmuter recipe inputs to the Matter Mutator with the (+>) button in the [Get Recipe] area if available.',
		'It will randomly choose a recipe for an item that is currently locked and you have all of the inputs unlocked.',
		'',
		'The Discover tab is unlocked when a transmuter is over level 3.'
	]},
	{t:'Manage', c:[
		'The Manage tab is where you can manage your transmuters. It displays the input and output of each transmuter and the amount created and used during the last update.',
		'',
		'The checkbox filters can show and hide items to check specific conditions.',
		'',
		'Live-Update will toggle the table being updated every cycle. If it is disabled the table can be updated with the "Refresh Table" button.',
		'If you are experiencing performance issues on the Manage tab try disabling Live-Update.',
		'',
		'The table columns describe the supply and demand of each item.',
		'Item : is the symbol of the item. Hover to see the full name.',
		'Owned : is the amount of the items you currently have in your inventory.',
		'Demand : is the demand based on all enabled transmuter flow.',
		'Supply : is the actual amount created in the last cycle.',
		'Used : is the actual amount used in creating other items last cycle. This does not include items used in upgrading transmuters.',
		'[≡] : this button will expand a row to view all transmuters related to an item',
		'',
		'> NOTE: Some transmuters have bulk mass as an input. The Demand and Used standardizes the inputs to be the equivalent amount of items.',
		'Example: Mild Steel can be made with 12 Da of Carbon and 5,600 Da of Iron, this is equivilent to 1 Carbon atom and 100 Iron atoms.',
		'',
		'The Manage tab is unlocked when a transmuter for an item with input items is level 2+.'
	]},
	{t:'Enhance', c:[
		'This tab allows you to significantly break conservation of mass by multiplying transmuter outputs.',
		'This does not change the flow limits. It multiplies the created amount by the effect power.',
		'',
		'Manual Output : Multiplies a transmuter output when manually run with the (->) button.',
		'Gen. Output : Increases all transmuter output, this multiplies both manually run and automatic.',
		'Gen. Cost : Multiplies transmuter upgrade costs. This value is less than 1 so a higher level reduces the cost.',
		'',
		'Enhancement costs are calculated programmatically based on a list of all items and the enhancement level. This means that when new items are added to the game it can affect the enhancement costs.',
		'',
		'Total Mass Bonus (TMB) : This increases output based on the total mass of your inventory. Higher total mass gives a larger bonus.',
		'',
		'The Enhance tab is unlocked when a transmuter for an item with input components (not a quark, lepton, or gauge boson) is level 8+.'
	]},
	{t:'Settings', c:[
		'Settings can affect the difficulty and functionality of the game.',
		'Always Show Used-In: This toggles the spoiler warning message and show the Used In list by default.',
		'Show/Hide Info: This toggles the short info snippets with educational and game information.',
		'Cheater Mode: When this is checked input items are not used in transmuters.',
		'Number Base: Default is decimal, does not effect certain numbers like in help.',
		'Significant Digits: Sets the maximum number of digits to display',
		'Enhancement Scaling: A bigger number makes the game easier/faster',
		'Save/Load: You can manually save your game here with the Numpad 5 hotkey or by clicking on the "Last Save" area. The game automatically saves approximately every minute.',
		'Hard Reset: This resets all progress and starts over from the beginning.',
	]},
	{t:'Sources', c:[
		'I got most of my information from:',
		'Humans - Used for their smart brain skills',
		'https://periodictable.com - Used for atom isotopes; I included mostly bolded isotopes',
		'https://www.rsc.org/periodic-table - Used for other atom information',
		'https://webbook.nist.gov/chemistry/name-ser/ - Used for molecule symbols',
		'https://www.masterorganicchemistry.com/2010/10/06/functional-groups-organic-chemistry/ - Used for learning about functional groups',
		'',
		'If you have a suggestion of items you want added or concerns about accuracy you can email: github@christheisen.com',
	]},
	{t:'About', c:[
		'I don\'t have a background in physics, chemistry, or astronomy so some of the information might be incorrect.',
		'I included notes in many items that I found interesting in an attempt to make this game educational as well as fun.',
		'I tried to keep this game acurrate to reality without getting too complex.',
		'',
		'If you have a suggestion or concerns you can email: github@christheisen.com',
	]},
]
