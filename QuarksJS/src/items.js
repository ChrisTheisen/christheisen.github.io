//Adding Items:
//1) Add the item to items.js
//2) Add recipes to recipes.js
//3) Add the items to the menu in data.js

//Data Restrictions:
//item name must be unique

//TEST
//const test_0 = { s:'T0', n: 'test_0', m: new Amount({Da:1})};
//const test_1 = { s:'T1', n: 'test_1', m: new Amount({Da:2})};
//const test_2 = { s:'T2', n: 'test_2', m: new Amount({Da:3})};
//const test_3 = { s:'T3', n: 'test_3', m: new Amount({Da:4}), info:['Creatable item with also children'], c:[test_0] };
//const test_4 = { s:'T4', n: 'test_4', m: new Amount({Da:5})};
//const test_5 = { s:'T5', n: 'test_5', m: new Amount({Da:6})};
//const test_6 = { s:'T6', n: 'test_6', m: new Amount({Da:7})};
//const test_7 = { s:'T7', n: 'test_0', m: new Amount({Da:8})};//This one breaks due to duplicate name.

//subatomic
const Q_Up = { id:'00', s:'u', n: 'Up Quark', u: true, m: new Amount({Da:.0022})};
const Q_Down = { id:'01', s:'d', n: 'Down Quark', u: true, m: new Amount({Da:.0047})};
const Electron = { id:'02', s:'e', n: 'Electron', u: true, m: new Amount({Da:.0005})};
const Photon = { id:'03', s:'γ', n:'Photon', u: true, m: new Amount({Da:0})};
const Proton = { id:'04', s:'p', n: 'Proton', u: false, m: new Amount({Da:1})};
const Neutron = { id:'05', s:'n', n: 'Neutron', u: false, m: new Amount({Da:1})};

//atoms
const H1 = { id:'0', s:'[1]H', n: 'Hydrogen1', u: false, m: new Amount({Da:1})};
const H2 = { id:'1', s:'[2]H', n: 'Deuterium', u: false, m: new Amount({Da:2})};
const H3 = { id:'2', s:'[3]H', n: 'Tritium', u: false, m: new Amount({Da:3})};
const He3 = { id:'3', s:'[3]He', n: 'Helium3', u: false, m: new Amount({Da:3})};
const He4 = { id:'4', s:'[4]He', n: 'Helium4', u: false, m: new Amount({Da:4})};
const Li6 = { id:'5', s:'[6]Li', n: 'Lithium6', u: false, m: new Amount({Da:6})};
const Li7 = { id:'6', s:'[7]Li', n: 'Lithium7', u: false, m: new Amount({Da:7})};
const Be9 = { id:'7', s:'[9]Be', n: 'Beryllium9', u: false, m: new Amount({Da:9})};
const B10 = { id:'8', s:'[10]B', n: 'Boron10', u: false, m: new Amount({Da:10})};
const B11 = { id:'9', s:'[11]B', n: 'Boron11', u: false, m: new Amount({Da:11})};
const C12 = { id:'a', s:'[12]C', n: 'Carbon12', u: false, m: new Amount({Da:12})};
const C13 = { id:'b', s:'[13]C', n: 'Carbon13', u: false, m: new Amount({Da:13})};
const N14 = { id:'c', s:'[14]N', n: 'Nitrogen14', u: false, m: new Amount({Da:14})};
const N15 = { id:'d', s:'[15]N', n: 'Nitrogen15', u: false, m: new Amount({Da:15})};
const O16 = { id:'e', s:'[16]O', n: 'Oxygen16', u: false, m: new Amount({Da:16})};
const O17 = { id:'f', s:'[17]O', n: 'Oxygen17', u: false, m: new Amount({Da:17})};
const O18 = { id:'g', s:'[18]O', n: 'Oxygen18', u: false, m: new Amount({Da:18})};
const F19 = { id:'h', s:'[19]F', n: 'Fluorine19', u: false, m: new Amount({Da:19})};
const Ne20 = { id:'i', s:'[20]Ne', n: 'Neon20', u: false, m: new Amount({Da:20})};
const Ne21 = { id:'j', s:'[21]Ne', n: 'Neon21', u: false, m: new Amount({Da:21})};
const Ne22 = { id:'k', s:'[22]Ne', n: 'Neon22', u: false, m: new Amount({Da:22})};
const Na23 = { id:'l', s:'[23]Na', n: 'Sodium23', u: false, m: new Amount({Da:23})};
const Mg24 = { id:'m', s:'[24]Mg', n: 'Magnesium24', u: false, m: new Amount({Da:24})};
const Mg25 = { id:'n', s:'[25]Mg', n: 'Magnesium25', u: false, m: new Amount({Da:25})};
const Mg26 = { id:'o', s:'[26]Mg', n: 'Magnesium26', u: false, m: new Amount({Da:26})};
const Al27 = { id:'p', s:'[27]Al', n: 'Aluminum27', u: false, m: new Amount({Da:27})};
const Si28 = { id:'q', s:'[28]Si', n: 'Silicon28', u: false, m: new Amount({Da:28})};
const Si29 = { id:'r', s:'[29]Si', n: 'Silicon29', u: false, m: new Amount({Da:29})};
const Si30 = { id:'s', s:'[30]Si', n: 'Silicon30', u: false, m: new Amount({Da:30})};
const P31 = { id:'t', s:'[31]P', n: 'Phosphorus31', u: false, m: new Amount({Da:31})};
const S32 = { id:'u', s:'[32]S', n: 'Sulfur32', u: false, m: new Amount({Da:32})};
const S33 = { id:'v', s:'[33]S', n: 'Sulfur33', u: false, m: new Amount({Da:33})};
const S34 = { id:'w', s:'[34]S', n: 'Sulfur34', u: false, m: new Amount({Da:34})};
const S36 = { id:'x', s:'[36]S', n: 'Sulfur36', u: false, m: new Amount({Da:36})};
const Cl35 = { id:'y', s:'[35]Cl', n: 'Chlorine35', u: false, m: new Amount({Da:35})};
const Cl37 = { id:'z', s:'[37]Cl', n: 'Chlorine37', u: false, m: new Amount({Da:37})};
const Ar36 = { id:'A', s:'[36]Ar', n: 'Argon36', u: false, m: new Amount({Da:36})};
const Ar38 = { id:'B', s:'[38]Ar', n: 'Argon38', u: false, m: new Amount({Da:38})};
const Ar40 = { id:'C', s:'[40]Ar', n: 'Argon40', u: false, m: new Amount({Da:40})};
const K39 = { id:'D', s:'[30]K', n: 'Potassium39', u: false, m: new Amount({Da:39})};
const K40 = { id:'E', s:'[40]K', n: 'Potassium40', u: false, m: new Amount({Da:40})};
const K41 = { id:'F', s:'[41]K', n: 'Potassium41', u: false, m: new Amount({Da:41})};
const Ca40 = { id:'G', s:'[40]Ca', n: 'Calcium40', u: false, m: new Amount({Da:40})};
const Ca42 = { id:'H', s:'[42]Ca', n: 'Calcium42', u: false, m: new Amount({Da:42})};
const Ca43 = { id:'I', s:'[43]Ca', n: 'Calcium43', u: false, m: new Amount({Da:43})};
const Ca44 = { id:'J', s:'[44]Ca', n: 'Calcium44', u: false, m: new Amount({Da:44})};
const Ca46 = { id:'K', s:'[46]Ca', n: 'Calcium46', u: false, m: new Amount({Da:46})};
const Ca48 = { id:'L', s:'[48]Ca', n: 'Calcium48', u: false, m: new Amount({Da:48})};
const Sc45 = { id:'M', s:'[45]Sc', n: 'Scandium45', u: false, m: new Amount({Da:45})};
const Ti46 = { id:'N', s:'[46]Ti', n: 'Titanium46', u: false, m: new Amount({Da:46})};
const Ti47 = { id:'O', s:'[47]Ti', n: 'Titanium47', u: false, m: new Amount({Da:47})};
const Ti48 = { id:'P', s:'[48]Ti', n: 'Titanium48', u: false, m: new Amount({Da:48})};
const Ti49 = { id:'Q', s:'[49]Ti', n: 'Titanium49', u: false, m: new Amount({Da:49})};
const Ti50 = { id:'R', s:'[50]Ti', n: 'Titanium50', u: false, m: new Amount({Da:50})};
const V50 = { id:'S', s:'[50]V' , n: 'Vandium50', u: false, m: new Amount({Da:50})};
const V51 = { id:'T', s:'[51]V' , n: 'Vandium51', u: false, m: new Amount({Da:51})};
const Cr50 = { id:'U', s:'[50]Cr', n: 'Chromium50', u: false, m: new Amount({Da:50})};
const Cr52 = { id:'V', s:'[52]Cr', n: 'Chromium52', u: false, m: new Amount({Da:52})};
const Cr53 = { id:'W', s:'[53]Cr', n: 'Chromium53', u: false, m: new Amount({Da:53})};
const Cr54 = { id:'X', s:'[54]Cr', n: 'Chromium54', u: false, m: new Amount({Da:54})};
const Mn55 = { id:'Y', s:'[55]Mn', n: 'Manganese55', u: false, m: new Amount({Da:55})};
const Fe54 = { id:'Z', s:'[54]Fe', n: 'Iron54', u: false, m: new Amount({Da:54})};
const Fe56 = { id:'10', s:'[56]Fe', n: 'Iron56', u: false, m: new Amount({Da:56})};
const Fe57 = { id:'11', s:'[57]Fe', n: 'Iron57', u: false, m: new Amount({Da:57})};
const Fe58 = { id:'12', s:'[58]Fe', n: 'Iron58', u: false, m: new Amount({Da:58})};
const Co59 = { id:'13', s:'[59]Co', n: 'Cobalt59', u: false, m: new Amount({Da:59})};
const Ni58 = { id:'14', s:'[58]Ni', n: 'Nickle58', u: false, m: new Amount({Da:58})};
const Ni60 = { id:'15', s:'[60]Ni', n: 'Nickle60', u: false, m: new Amount({Da:60})};
const Ni61 = { id:'16', s:'[61]Ni', n: 'Nickle61', u: false, m: new Amount({Da:61})};
const Ni62 = { id:'17', s:'[62]Ni', n: 'Nickle62', u: false, m: new Amount({Da:62})};
const Ni64 = { id:'18', s:'[64]Ni', n: 'Nickle64', u: false, m: new Amount({Da:64})};
const Cu63 = { id:'19', s:'[63]Cu', n: 'Copper63', u: false, m: new Amount({Da:63})};
const Cu65 = { id:'1a', s:'[65]Cu', n: 'Copper65', u: false, m: new Amount({Da:65})};
const Zn64 = { id:'1b', s:'[64]Zn', n: 'Zinc64', u: false, m: new Amount({Da:64})};
const Zn66 = { id:'1c', s:'[66]Zn', n: 'Zinc66', u: false, m: new Amount({Da:66})};
const Zn67 = { id:'1d', s:'[67]Zn', n: 'Zinc67', u: false, m: new Amount({Da:67})};
const Zn68 = { id:'1e', s:'[68]Zn', n: 'Zinc68', u: false, m: new Amount({Da:68})};
const Zn70 = { id:'1f', s:'[70]Zn', n: 'Zinc70', u: false, m: new Amount({Da:70})};
const Ga69 = { id:'1g', s:'[69]Ga', n: 'Gallium69', u: false, m: new Amount({Da:69})};
const Ga71 = { id:'1h', s:'[71]Ga', n: 'Gallium71', u: false, m: new Amount({Da:71})};
const Ge70 = { id:'1i', s:'[70]Ge', n: 'Germanium70', u: false, m: new Amount({Da:70})};
const Ge72 = { id:'1j', s:'[72]Ge', n: 'Germanium72', u: false, m: new Amount({Da:72})};
const Ge73 = { id:'1k', s:'[73]Ge', n: 'Germanium73', u: false, m: new Amount({Da:73})};
const Ge74 = { id:'1l', s:'[74]Ge', n: 'Germanium74', u: false, m: new Amount({Da:74})};
const Ge76 = { id:'1m', s:'[76]Ge', n: 'Germanium76', u: false, m: new Amount({Da:76})};
const As75 = { id:'1n', s:'[75]As', n: 'Arsenic75', u: false, m: new Amount({Da:75})};
const Se74 = { id:'1o', s:'[74]Se', n: 'Selenium74', u: false, m: new Amount({Da:74})};
const Se76 = { id:'1p', s:'[76]Se', n: 'Selenium76', u: false, m: new Amount({Da:76})};
const Se77 = { id:'1q', s:'[77]Se', n: 'Selenium77', u: false, m: new Amount({Da:77})};
const Se78 = { id:'1r', s:'[78]Se', n: 'Selenium78', u: false, m: new Amount({Da:78})};
const Se80 = { id:'1s', s:'[80]Se', n: 'Selenium80', u: false, m: new Amount({Da:80})};
const Se82 = { id:'1t', s:'[82]Se', n: 'Selenium82', u: false, m: new Amount({Da:82})};
const Br79 = { id:'1u', s:'[79]Br', n: 'Bromine79', u: false, m: new Amount({Da:79})};
const Br81 = { id:'1v', s:'[81]Br', n: 'Bromine81', u: false, m: new Amount({Da:81})};
const Kr78 = { id:'1w', s:'[78]Kr', n: 'Krypton78', u: false, m: new Amount({Da:78})};
const Kr80 = { id:'1x', s:'[80]Kr', n: 'Krypton80', u: false, m: new Amount({Da:80})};
const Kr82 = { id:'1y', s:'[82]Kr', n: 'Krypton82', u: false, m: new Amount({Da:82})};
const Kr83 = { id:'1z', s:'[83]Kr', n: 'Krypton83', u: false, m: new Amount({Da:83})};
const Kr84 = { id:'1A', s:'[84]Kr', n: 'Krypton84', u: false, m: new Amount({Da:84})};
const Kr86 = { id:'1B', s:'[86]Kr', n: 'Krypton86', u: false, m: new Amount({Da:86})};
const Rb85 = { id:'1C', s:'[85]Rb', n: 'Rubidium85', u: false, m: new Amount({Da:85})};
const Rb87 = { id:'1D', s:'[87]Rb', n: 'Rubidium87', u: false, m: new Amount({Da:87})};
const Sr84 = { id:'1E', s:'[84]Sr', n: 'Strontium84', u: false, m: new Amount({Da:84})};
const Sr86 = { id:'1F', s:'[86]Sr', n: 'Strontium86', u: false, m: new Amount({Da:86})};
const Sr87 = { id:'1G', s:'[87]Sr', n: 'Strontium87', u: false, m: new Amount({Da:87})};
const Sr88 = { id:'1H', s:'[88]Sr', n: 'Strontium88', u: false, m: new Amount({Da:88})};
const Y89 = { id:'1I', s:'[89]Y' , n: 'Ytrium89', u: false, m: new Amount({Da:89})};
const Zr90 = { id:'1J', s:'[90]Zr', n: 'Zirconium90', u: false, m: new Amount({Da:90})};
const Zr91 = { id:'1K', s:'[91]Zr', n: 'Zirconium91', u: false, m: new Amount({Da:91})};
const Zr92 = { id:'1L', s:'[92]Zr', n: 'Zirconium92', u: false, m: new Amount({Da:92})};
const Zr94 = { id:'1M', s:'[94]Zr', n: 'Zirconium94', u: false, m: new Amount({Da:94})};
const Zr96 = { id:'1N', s:'[96]Zr', n: 'Zirconium96', u: false, m: new Amount({Da:96})};
const Nb93 = { id:'1O', s:'[93]Nb', n: 'Niobium93', u: false, m: new Amount({Da:93})};
const Mo92 = { id:'1P', s:'[92]Mo', n: 'Molybdenum92', u: false, m: new Amount({Da:92})};
const Mo94 = { id:'1Q', s:'[94]Mo', n: 'Molybdenum94', u: false, m: new Amount({Da:94})};
const Mo95 = { id:'1R', s:'[95]Mo', n: 'Molybdenum95', u: false, m: new Amount({Da:95})};
const Mo96 = { id:'1S', s:'[96]Mo', n: 'Molybdenum96', u: false, m: new Amount({Da:96})};
const Mo97 = { id:'1T', s:'[97]Mo', n: 'Molybdenum97', u: false, m: new Amount({Da:97})};
const Mo98 = { id:'1U', s:'[98]Mo', n: 'Molybdenum98', u: false, m: new Amount({Da:98})};
const Mo100 = { id:'1V', s:'[100]Mo', n: 'Molybdenum100', u: false, m: new Amount({Da:100})};
const Tc97 = { id:'1W', s:'[97]Tc', n: 'Technitium97', u: false, m: new Amount({Da:97})};
const Ru96 = { id:'1X', s:'[96]Ru', n: 'Ruthenium96', u: false, m: new Amount({Da:96})};
const Ru98 = { id:'1Y', s:'[98]Ru', n: 'Ruthenium98', u: false, m: new Amount({Da:98})};
const Ru99 = { id:'1Z', s:'[99]Ru', n: 'Ruthenium99', u: false, m: new Amount({Da:99})};
const Ru100 = { id:'20', s:'[100]Ru', n: 'Ruthenium100', u: false, m: new Amount({Da:100})};
const Ru101 = { id:'21', s:'[101]Ru', n: 'Ruthenium101', u: false, m: new Amount({Da:101})};
const Ru102 = { id:'22', s:'[102]Ru', n: 'Ruthenium102', u: false, m: new Amount({Da:102})};
const Ru104 = { id:'23', s:'[104]Ru', n: 'Ruthenium104', u: false, m: new Amount({Da:104})};
const Rh103 = { id:'24', s:'[103]Rh', n: 'Rhodium103', u: false, m: new Amount({Da:103})};
const Pd102 = { id:'25', s:'[102]Pd', n: 'Paladium102', u: false, m: new Amount({Da:102})};
const Pd104 = { id:'26', s:'[104]Pd', n: 'Paladium104', u: false, m: new Amount({Da:104})};
const Pd105 = { id:'27', s:'[105]Pd', n: 'Paladium105', u: false, m: new Amount({Da:105})};
const Pd106 = { id:'28', s:'[106]Pd', n: 'Paladium106', u: false, m: new Amount({Da:106})};
const Pd108 = { id:'29', s:'[108]Pd', n: 'Paladium108', u: false, m: new Amount({Da:108})};
const Pd110 = { id:'2a', s:'[110]Pd', n: 'Paladium110', u: false, m: new Amount({Da:110})};
const Ag107 = { id:'2b', s:'[107]Ag', n: 'Silver107', u: false, m: new Amount({Da:107})};
const Ag109 = { id:'2c', s:'[109]Ag', n: 'Silver109', u: false, m: new Amount({Da:109})};
const Cd106 = { id:'2d', s:'[106]Cd', n: 'Cadmium106', u: false, m: new Amount({Da:106})};
const Cd108 = { id:'2e', s:'[108]Cd', n: 'Cadmium108', u: false, m: new Amount({Da:108})};
const Cd110 = { id:'2f', s:'[110]Cd', n: 'Cadmium110', u: false, m: new Amount({Da:110})};
const Cd111 = { id:'2g', s:'[111]Cd', n: 'Cadmium111', u: false, m: new Amount({Da:111})};
const Cd112 = { id:'2h', s:'[112]Cd', n: 'Cadmium112', u: false, m: new Amount({Da:112})};
const Cd113 = { id:'2i', s:'[113]Cd', n: 'Cadmium113', u: false, m: new Amount({Da:113})};
const Cd114 = { id:'2j', s:'[114]Cd', n: 'Cadmium114', u: false, m: new Amount({Da:114})};
const Cd116 = { id:'2k', s:'[116]Cd', n: 'Cadmium116', u: false, m: new Amount({Da:116})};
const In113 = { id:'2l', s:'[113]In', n: 'Indium113', u: false, m: new Amount({Da:113})};
const In115 = { id:'2m', s:'[115]In', n: 'Indium115', u: false, m: new Amount({Da:115})};
const Sn112 = { id:'2n', s:'[112]Sn', n: 'Tin112', u: false, m: new Amount({Da:112})};
const Sn114 = { id:'2o', s:'[114]Sn', n: 'Tin114', u: false, m: new Amount({Da:114})};
const Sn115 = { id:'2p', s:'[115]Sn', n: 'Tin115', u: false, m: new Amount({Da:115})};
const Sn116 = { id:'2q', s:'[116]Sn', n: 'Tin116', u: false, m: new Amount({Da:116})};
const Sn117 = { id:'2r', s:'[117]Sn', n: 'Tin117', u: false, m: new Amount({Da:117})};
const Sn118 = { id:'2s', s:'[118]Sn', n: 'Tin118', u: false, m: new Amount({Da:118})};
const Sn119 = { id:'2t', s:'[119]Sn', n: 'Tin119', u: false, m: new Amount({Da:119})};
const Sn120 = { id:'2u', s:'[120]Sn', n: 'Tin120', u: false, m: new Amount({Da:120})};
const Sn122 = { id:'2v', s:'[122]Sn', n: 'Tin122', u: false, m: new Amount({Da:122})};
const Sn124 = { id:'2w', s:'[124]Sn', n: 'Tin124', u: false, m: new Amount({Da:124})};
const Sb121 = { id:'2x', s:'[121]Sb', n: 'Antimony121', u: false, m: new Amount({Da:121})};
const Sb123 = { id:'2y', s:'[123]Sb', n: 'Antimony123', u: false, m: new Amount({Da:123})};
const Te120 = { id:'2z', s:'[120]Te', n: 'Tellurium120', u: false, m: new Amount({Da:120})};
const Te122 = { id:'2A', s:'[122]Te', n: 'Tellurium122', u: false, m: new Amount({Da:122})};
const Te123 = { id:'2B', s:'[123]Te', n: 'Tellurium123', u: false, m: new Amount({Da:123})};
const Te124 = { id:'2C', s:'[124]Te', n: 'Tellurium124', u: false, m: new Amount({Da:124})};
const Te125 = { id:'2D', s:'[125]Te', n: 'Tellurium125', u: false, m: new Amount({Da:125})};
const Te126 = { id:'2E', s:'[126]Te', n: 'Tellurium126', u: false, m: new Amount({Da:126})};
const Te128 = { id:'2F', s:'[128]Te', n: 'Tellurium128', u: false, m: new Amount({Da:128})};
const Te130 = { id:'2G', s:'[130]Te', n: 'Tellurium130', u: false, m: new Amount({Da:130})};
const I127 = { id:'2H', s:'[127]I' , n: 'Iodine127', u: false, m: new Amount({Da:127})};
const Xe124 = { id:'2I', s:'[124]Xe', n: 'Xenon124', u: false, m: new Amount({Da:124})};
const Xe126 = { id:'2J', s:'[126]Xe', n: 'Xenon126', u: false, m: new Amount({Da:126})};
const Xe128 = { id:'2K', s:'[128]Xe', n: 'Xenon128', u: false, m: new Amount({Da:128})};
const Xe129 = { id:'2L', s:'[129]Xe', n: 'Xenon129', u: false, m: new Amount({Da:129})};
const Xe130 = { id:'2M', s:'[130]Xe', n: 'Xenon130', u: false, m: new Amount({Da:130})};
const Xe131 = { id:'2N', s:'[131]Xe', n: 'Xenon131', u: false, m: new Amount({Da:131})};
const Xe132 = { id:'2O', s:'[132]Xe', n: 'Xenon132', u: false, m: new Amount({Da:132})};
const Xe134 = { id:'2P', s:'[134]Xe', n: 'Xenon134', u: false, m: new Amount({Da:134})};
const Xe136 = { id:'2Q', s:'[136]Xe', n: 'Xenon136', u: false, m: new Amount({Da:136})};
const Cs133 = { id:'2R', s:'[133]Cs', n: 'Cesium133', u: false, m: new Amount({Da:133})};
const Ba130 = { id:'2S', s:'[130]Ba', n: 'Barium130', u: false, m: new Amount({Da:130})};
const Ba132 = { id:'2T', s:'[132]Ba', n: 'Barium132', u: false, m: new Amount({Da:132})};
const Ba134 = { id:'2U', s:'[134]Ba', n: 'Barium134', u: false, m: new Amount({Da:134})};
const Ba135 = { id:'2V', s:'[135]Ba', n: 'Barium135', u: false, m: new Amount({Da:135})};
const Ba136 = { id:'2W', s:'[136]Ba', n: 'Barium136', u: false, m: new Amount({Da:136})};
const Ba137 = { id:'2X', s:'[137]Ba', n: 'Barium137', u: false, m: new Amount({Da:137})};
const Ba138 = { id:'2Y', s:'[138]Ba', n: 'Barium138', u: false, m: new Amount({Da:138})};
const La138 = { id:'3Z', s:'[138]La', n: 'Lanthanum138', u: false, m: new Amount({Da:138})};
const La139 = { id:'30', s:'[139]La', n: 'Lanthanum139', u: false, m: new Amount({Da:139})};
const Ce136 = { id:'31', s:'[136]Ce', n: 'Cerium136', u: false, m: new Amount({Da:136})};
const Ce138 = { id:'32', s:'[138]Ce', n: 'Cerium138', u: false, m: new Amount({Da:138})};
const Ce140 = { id:'33', s:'[140]Ce', n: 'Cerium140', u: false, m: new Amount({Da:140})};
const Ce142 = { id:'34', s:'[142]Ce', n: 'Cerium142', u: false, m: new Amount({Da:142})};
const Pr141 = { id:'35', s:'[141]Pr', n: 'Praseodymium141', u: false, m: new Amount({Da:141})};
const Nd142 = { id:'36', s:'[142]Nd', n: 'Nedymium142', u: false, m: new Amount({Da:142})};
const Nd143 = { id:'37', s:'[143]Nd', n: 'Nedymium143', u: false, m: new Amount({Da:143})};
const Nd144 = { id:'38', s:'[144]Nd', n: 'Nedymium144', u: false, m: new Amount({Da:144})};
const Nd145 = { id:'39', s:'[145]Nd', n: 'Nedymium145', u: false, m: new Amount({Da:145})};
const Nd146 = { id:'3a', s:'[146]Nd', n: 'Nedymium146', u: false, m: new Amount({Da:146})};
const Nd148 = { id:'3b', s:'[148]Nd', n: 'Nedymium148', u: false, m: new Amount({Da:148})};
const Nd150 = { id:'3c', s:'[150]Nd', n: 'Nedymium150', u: false, m: new Amount({Da:150})};
const Pm145 = { id:'3d', s:'[145]Pm', n: 'Promethium145', u: false, m: new Amount({Da:145})};
const Sm144 = { id:'3e', s:'[144]Sm', n: 'Samarium144', u: false, m: new Amount({Da:144})};
const Sm147 = { id:'3f', s:'[147]Sm', n: 'Samarium147', u: false, m: new Amount({Da:147})};
const Sm148 = { id:'3g', s:'[148]Sm', n: 'Samarium148', u: false, m: new Amount({Da:148})};
const Sm149 = { id:'3h', s:'[149]Sm', n: 'Samarium149', u: false, m: new Amount({Da:149})};
const Sm150 = { id:'3i', s:'[150]Sm', n: 'Samarium150', u: false, m: new Amount({Da:150})};
const Sm152 = { id:'3j', s:'[152]Sm', n: 'Samarium152', u: false, m: new Amount({Da:152})};
const Sm154 = { id:'3k', s:'[154]Sm', n: 'Samarium154', u: false, m: new Amount({Da:154})};
const Eu151 = { id:'3l', s:'[151]Eu', n: 'Europium151', u: false, m: new Amount({Da:151})};
const Eu153 = { id:'3m', s:'[153]Eu', n: 'Europium153', u: false, m: new Amount({Da:153})};
const Gd152 = { id:'3n', s:'[152]Gd', n: 'Gadolinium152', u: false, m: new Amount({Da:152})};
const Gd154 = { id:'3o', s:'[154]Gd', n: 'Gadolinium154', u: false, m: new Amount({Da:154})};
const Gd155 = { id:'3p', s:'[155]Gd', n: 'Gadolinium155', u: false, m: new Amount({Da:155})};
const Gd156 = { id:'3q', s:'[156]Gd', n: 'Gadolinium156', u: false, m: new Amount({Da:156})};
const Gd157 = { id:'3r', s:'[157]Gd', n: 'Gadolinium157', u: false, m: new Amount({Da:157})};
const Gd158 = { id:'3s', s:'[158]Gd', n: 'Gadolinium158', u: false, m: new Amount({Da:158})};
const Gd160 = { id:'3t', s:'[160]Gd', n: 'Gadolinium160', u: false, m: new Amount({Da:160})};
const Tb159 = { id:'3u', s:'[159]Tb', n: 'Terbium159', u: false, m: new Amount({Da:159})};
const Dy156 = { id:'3v', s:'[156]Dy', n: 'Dysprosium156', u: false, m: new Amount({Da:156})};
const Dy158 = { id:'3w', s:'[158]Dy', n: 'Dysprosium158', u: false, m: new Amount({Da:158})};
const Dy160 = { id:'3x', s:'[160]Dy', n: 'Dysprosium160', u: false, m: new Amount({Da:160})};
const Dy161 = { id:'3y', s:'[161]Dy', n: 'Dysprosium161', u: false, m: new Amount({Da:161})};
const Dy162 = { id:'3z', s:'[162]Dy', n: 'Dysprosium162', u: false, m: new Amount({Da:162})};
const Dy163 = { id:'3A', s:'[163]Dy', n: 'Dysprosium163', u: false, m: new Amount({Da:163})};
const Dy164 = { id:'3B', s:'[164]Dy', n: 'Dysprosium164', u: false, m: new Amount({Da:164})};
const Ho165 = { id:'3C', s:'[165]Ho', n: 'Holmium165', u: false, m: new Amount({Da:165})};
const Er162 = { id:'3D', s:'[162]Er', n: 'Erbium162', u: false, m: new Amount({Da:162})};
const Er164 = { id:'3E', s:'[164]Er', n: 'Erbium164', u: false, m: new Amount({Da:164})};
const Er166 = { id:'3F', s:'[166]Er', n: 'Erbium166', u: false, m: new Amount({Da:166})};
const Er167 = { id:'3G', s:'[167]Er', n: 'Erbium167', u: false, m: new Amount({Da:167})};
const Er168 = { id:'3H', s:'[168]Er', n: 'Erbium168', u: false, m: new Amount({Da:168})};
const Er170 = { id:'3I', s:'[170]Er', n: 'Erbium170', u: false, m: new Amount({Da:170})};
const Tm169 = { id:'3J', s:'[169]Tm', n: 'Thulium160', u: false, m: new Amount({Da:169})};
const Yb168 = { id:'3K', s:'[168]Yb', n: 'Ytterbium168', u: false, m: new Amount({Da:168})};
const Yb170 = { id:'3L', s:'[170]Yb', n: 'Ytterbium170', u: false, m: new Amount({Da:170})};
const Yb171 = { id:'3M', s:'[171]Yb', n: 'Ytterbium171', u: false, m: new Amount({Da:171})};
const Yb172 = { id:'3N', s:'[172]Yb', n: 'Ytterbium172', u: false, m: new Amount({Da:172})};
const Yb173 = { id:'3O', s:'[173]Yb', n: 'Ytterbium173', u: false, m: new Amount({Da:173})};
const Yb174 = { id:'3P', s:'[174]Yb', n: 'Ytterbium174', u: false, m: new Amount({Da:174})};
const Yb176 = { id:'3Q', s:'[176]Yb', n: 'Ytterbium176', u: false, m: new Amount({Da:176})};
const Lu175 = { id:'3R', s:'[175]Lu', n: 'Lutetium175', u: false, m: new Amount({Da:175})};
const Lu176 = { id:'3S', s:'[176]Lu', n: 'Lutetium176', u: false, m: new Amount({Da:176})};
const Hf174 = { id:'3T', s:'[174]Hf', n: 'Hafnium174', u: false, m: new Amount({Da:174})};
const Hf176 = { id:'3U', s:'[176]Hf', n: 'Hafnium176', u: false, m: new Amount({Da:176})};
const Hf177 = { id:'3V', s:'[177]Hf', n: 'Hafnium177', u: false, m: new Amount({Da:177})};
const Hf178 = { id:'3W', s:'[178]Hf', n: 'Hafnium178', u: false, m: new Amount({Da:178})};
const Hf179 = { id:'3X', s:'[179]Hf', n: 'Hafnium179', u: false, m: new Amount({Da:179})};
const Hf180 = { id:'3Y', s:'[180]Hf', n: 'Hafnium180', u: false, m: new Amount({Da:180})};
const Ta181 = { id:'3Z', s:'[181]Ta', n: 'Tantalum181', u: false, m: new Amount({Da:181})};
const W180 = { id:'40', s:'[180]W' , n: 'Tungsten180', u: false, m: new Amount({Da:180})};
const W182 = { id:'41', s:'[182]W' , n: 'Tungsten182', u: false, m: new Amount({Da:182})};
const W183 = { id:'42', s:'[183]W' , n: 'Tungsten183', u: false, m: new Amount({Da:183})};
const W184 = { id:'43', s:'[184]W' , n: 'Tungsten184', u: false, m: new Amount({Da:184})};
const W186 = { id:'44', s:'[186]W' , n: 'Tungsten186', u: false, m: new Amount({Da:186})};
const Re185 = { id:'45', s:'[185]Re', n: 'Rhenium185', u: false, m: new Amount({Da:185})};
const Re187 = { id:'46', s:'[187]Re', n: 'Rhenium187', u: false, m: new Amount({Da:187})};
const Os184 = { id:'47', s:'[184]Os', n: 'Osmium184', u: false, m: new Amount({Da:184})};
const Os186 = { id:'48', s:'[186]Os', n: 'Osmium186', u: false, m: new Amount({Da:186})};
const Os187 = { id:'49', s:'[187]Os', n: 'Osmium187', u: false, m: new Amount({Da:187})};
const Os188 = { id:'4a', s:'[188]Os', n: 'Osmium188', u: false, m: new Amount({Da:188})};
const Os189 = { id:'4b', s:'[189]Os', n: 'Osmium189', u: false, m: new Amount({Da:189})};
const Os190 = { id:'4c', s:'[190]Os', n: 'Osmium190', u: false, m: new Amount({Da:190})};
const Os192 = { id:'4d', s:'[192]Os', n: 'Osmium192', u: false, m: new Amount({Da:192})};
const Ir191 = { id:'4e', s:'[191]Ir', n: 'Iridium191', u: false, m: new Amount({Da:191})};
const Ir193 = { id:'4f', s:'[193]Ir', n: 'Iridium193', u: false, m: new Amount({Da:193})};
const Pt190 = { id:'4g', s:'[190]Pt', n: 'Platinum190', u: false, m: new Amount({Da:190})};
const Pt192 = { id:'4h', s:'[192]Pt', n: 'Platinum192', u: false, m: new Amount({Da:192})};
const Pt194 = { id:'4i', s:'[194]Pt', n: 'Platinum194', u: false, m: new Amount({Da:194})};
const Pt195 = { id:'4j', s:'[195]Pt', n: 'Platinum195', u: false, m: new Amount({Da:195})};
const Pt196 = { id:'4k', s:'[196]Pt', n: 'Platinum196', u: false, m: new Amount({Da:196})};
const Pt198 = { id:'4l', s:'[198]Pt', n: 'Platinum198', u: false, m: new Amount({Da:198})};
const Au197 = { id:'4m', s:'[197]Au', n: 'Gold197', u: false, m: new Amount({Da:197})};
const Hg196 = { id:'4n', s:'[196]Hg', n: 'Mercury196', u: false, m: new Amount({Da:196})};
const Hg198 = { id:'4o', s:'[198]Hg', n: 'Mercury198', u: false, m: new Amount({Da:198})};
const Hg199 = { id:'4p', s:'[199]Hg', n: 'Mercury199', u: false, m: new Amount({Da:199})};
const Hg200 = { id:'4q', s:'[200]Hg', n: 'Mercury200', u: false, m: new Amount({Da:200})};
const Hg201 = { id:'4r', s:'[201]Hg', n: 'Mercury201', u: false, m: new Amount({Da:201})};
const Hg202 = { id:'4s', s:'[202]Hg', n: 'Mercury202', u: false, m: new Amount({Da:202})};
const Hg204 = { id:'4t', s:'[204]Hg', n: 'Mercury204', u: false, m: new Amount({Da:204})};
const Tl203 = { id:'4u', s:'[203]Tl', n: 'Thallium203', u: false, m: new Amount({Da:203})};
const Tl205 = { id:'4v', s:'[205]Tl', n: 'Thallium205', u: false, m: new Amount({Da:205})};
const Pb204 = { id:'4w', s:'[204]Pb', n: 'Lead204', u: false, m: new Amount({Da:204})};
const Pb206 = { id:'4x', s:'[206]Pb', n: 'Lead206', u: false, m: new Amount({Da:206})};
const Pb207 = { id:'4y', s:'[207]Pb', n: 'Lead207', u: false, m: new Amount({Da:207})};
const Pb208 = { id:'4z', s:'[208]Pb', n: 'Lead208', u: false, m: new Amount({Da:208})};
const Bi209 = { id:'4A', s:'[209]Bi', n: 'Bismuth209', u: false, m: new Amount({Da:209})};
const Po209 = { id:'4B', s:'[209]Po', n: 'Polonium209', u: false, m: new Amount({Da:209})};
const At210 = { id:'4C', s:'[210]At', n: 'Astatine210', u: false, m: new Amount({Da:210})};
const Rn222 = { id:'4D', s:'[222]Rn', n: 'Radon222', u: false, m: new Amount({Da:222})};
const Fr223 = { id:'4E', s:'[223]Fr', n: 'Francium223', u: false, m: new Amount({Da:223})};
const Ra226 = { id:'4F', s:'[226]Ra', n: 'Radium226', u: false, m: new Amount({Da:226})};
const Ac227 = { id:'4G', s:'[227]Ac', n: 'Actinium227', u: false, m: new Amount({Da:227})};
const Th232 = { id:'4H', s:'[232]Th', n: 'Thorium232', u: false, m: new Amount({Da:232})};
const Pa231 = { id:'4I', s:'[231]Pa', n: 'Protactinium231', u: false, m: new Amount({Da:231})};
const U234 = { id:'4J', s:'[234]U' , n: 'Uranium234', u: false, m: new Amount({Da:234})};
const U235 = { id:'4K', s:'[235]U' , n: 'Uranium235', u: false, m: new Amount({Da:235})};
const U238 = { id:'4L', s:'[238]U' , n: 'Uranium238', u: false, m: new Amount({Da:238})};
const Np237 = { id:'4M', s:'[237]Np', n: 'Neptunium237', u: false, m: new Amount({Da:237})};
const Pu244 = { id:'4N', s:'[244]Pu', n: 'Plutonium244', u: false, m: new Amount({Da:244})};
const Am243 = { id:'4O', s:'[243]Am', n: 'Americium243', u: false, m: new Amount({Da:243})};
const Cm247 = { id:'4P', s:'[247]Cm', n: 'Curium247', u: false, m: new Amount({Da:247})};
const Bk247 = { id:'4Q', s:'[247]Bk', n: 'Berkelium247', u: false, m: new Amount({Da:247})};
const Cf251 = { id:'4R', s:'[251]Cf', n: 'Californium251', u: false, m: new Amount({Da:251})};
const Es252 = { id:'4S', s:'[252]Es', n: 'Einsteinium252', u: false, m: new Amount({Da:252})};
const Fm257 = { id:'4T', s:'[257]Fm', n: 'Fermium257', u: false, m: new Amount({Da:257})};
const Md258 = { id:'4U', s:'[258]Md', n: 'Mendelevium258', u: false, m: new Amount({Da:258})};
const No261 = { id:'4V', s:'[261]No', n: 'Nobelium261', u: false, m: new Amount({Da:261})};
const Lr264 = { id:'4W', s:'[264]Lr', n: 'Lawrencium264', u: false, m: new Amount({Da:264})};
const Rf265 = { id:'4X', s:'[265]Rf', n: 'Rutherfordium265', u: false, m: new Amount({Da:265})};
const Db268 = { id:'4Y', s:'[268]Db', n: 'Dubnium268', u: false, m: new Amount({Da:268})};
const Sg271 = { id:'5Z', s:'[271]Sg', n: 'Seaborgium271', u: false, m: new Amount({Da:271})};
const Bh273 = { id:'50', s:'[273]Bh', n: 'Bohrium273', u: false, m: new Amount({Da:273})};
const Hs276 = { id:'51', s:'[276]Hs', n: 'Hassium276', u: false, m: new Amount({Da:276})};
const Mt278 = { id:'52', s:'[278]Mt', n: 'Meitnerium278', u: false, m: new Amount({Da:278})};
const Ds281 = { id:'53', s:'[281]Ds', n: 'Darmstadtium281', u: false, m: new Amount({Da:281})};
const Rg283 = { id:'54', s:'[283]Rg', n: 'Roentgenium283', u: false, m: new Amount({Da:283})};
const Cn285 = { id:'55', s:'[285]Cn', n: 'Copernicium285', u: false, m: new Amount({Da:285})};
const Nh287 = { id:'56', s:'[287]Nh', n: 'Nihonium287', u: false, m: new Amount({Da:287})};
const Fl289 = { id:'57', s:'[289]Fl', n: 'Flerovium289', u: false, m: new Amount({Da:289})};
const Mc291 = { id:'58', s:'[291]Mc', n: 'Moscovium291', u: false, m: new Amount({Da:291})};
const Lv292 = { id:'59', s:'[292]Lv', n: 'Livermorium292', u: false, m: new Amount({Da:292})};
const Ts292 = { id:'5a', s:'[292]Ts', n: 'Tennessine292', u: false, m: new Amount({Da:292})};
const Og293 = { id:'5b', s:'[293]Og', n: 'Oganesson293', u: false, m: new Amount({Da:293})};

//organic molecules
const dihydrogen = { id:'5c', s:'H(2)', n: 'Dihydrogen', u: false, m: new Amount({Da:2})};
const deuteratedDihydrogen = { id:'5d', s:'[2]H(2)', n: 'Deuterated Dihydrogen', u: false, m: new Amount({Da:4})};
const dioxygen = { id:'5e', s:'O(2)', n: 'Dioxygen', u: false, m: new Amount({Da:32})};

const ammonia = { id:'5f', s:'NH(3)', n: 'Ammonia', u: false, m: new Amount({Da:17})};
const water =  { id:'5g', s:'H(2)O', n: 'Water', u: false, m: new Amount({Da:18})};
const heavyWater =  { id:'5h', s:'[2]H(2)O', n: 'Heavy Water', u: false, m: new Amount({Da:20})};
const tritiatedWater =  { id:'5i', s:'[3]H(2)O', n: 'Tritiated Water', u: false, m: new Amount({Da:22})};
const hydronium =  { id:'5j', s:'H(3)O[+]', n: 'Hydronium', u: false, m: new Amount({Da:19})};
const carbonMonoxide = { id:'5k', s:'CO', n: 'Carbon Monoxide', u: false, m: new Amount({Da:28})};
const carbonDioxide = { id:'5l', s:'CO(2)', n: 'Carbon Dioxide', u: false, m: new Amount({Da:44})};

const methane = { id:'5m', s:'CH(4)', n: 'Methane', u: false, m: new Amount({Da:16})};
const ethane = { id:'5n', s:'C(2)H(6)', n: 'Ethane', u: false, m: new Amount({Da:30})};
const propane = { id:'5o', s:'C(3)H(8)', n: 'Propane', u: false, m: new Amount({Da:44})};
const butane = { id:'5p', s:'C(4)H(10)', n: 'Butane', u: false, m: new Amount({Da:58})};

const methene = { id:'5q', s:'CH(2)', n: 'Methene', u: false, m: new Amount({Da:14})};
const ethene = { id:'5r', s:'C(2)H(4)', n: 'Ethene', u: false, m: new Amount({Da:28})};
const propene = { id:'5s', s:'C(3)H(6)', n: 'Propene', u: false, m: new Amount({Da:42})};
const butene = { id:'5t', s:'C(4)H(8)', n: 'Butene', u: false, m: new Amount({Da:56})};

const ethyne = { id:'5u', s:'C(2)H(2)', n: 'Ethyne', u: false, m: new Amount({Da:26})};
const propyne = { id:'5v', s:'C(3)H(4)', n: 'Propyne', u: false, m: new Amount({Da:40})};
const butyne = { id:'5w', s:'C(4)H(6)', n: 'Butyne', u: false, m: new Amount({Da:54})};

const benzene = { id:'5x', s:'C(6)H(6)', n: 'Benzene', u: false, m: new Amount({Da:42})};

const methanol = { id:'5y', s:'CH(3)OH', n: 'Methanol', u: false, m: new Amount({Da:32})};
const ethanol = { id:'5z', s:'CH(3)CH(2)OH', n: 'Ethanol', u: false, m: new Amount({Da:46})};
const propanol = { id:'5A', s:'C(3)H(8)O', n:'Propanol', u: false, m: new Amount({Da:60})};

const toluene = { id:'5B', s:'C(6)H(5)CH(3)', n: 'Toluene', u: false, m: new Amount({Da:92})};

const aceticAcid = { id:'5C', s:'C(2)H(4)O(2)', n: 'Acetic Acid', u: false, m: new Amount({Da:60})};
const formicAcid = { id:'5D', s:'CH(2)O(2)', n: 'Formic Acid', u: false, m: new Amount({Da:46})};
const benzoicAcid = { id:'5E', s:'C(7)H(6)O(2)', n: 'Benzoic Acid', u: false, m: new Amount({Da:122})};

const acetamide = { id:'5F', s:'C(2)H(5)NO', n: 'Acetamide', u: false, m: new Amount({Da:60})};
const benzamide = { id:'5G', s:'C(7)H(7)NO', n: 'Benzamide', u: false, m: new Amount({Da:121})};

const methylamine = { id:'5H', s:'CH(5)N', n: 'Methylamine', u: false, m: new Amount({Da:31})};
const dimethylamine = { id:'5I', s:'C(2)H(7)N', n: 'Dimethylamine', u: false, m: new Amount({Da:45})};
const trimethylamine = { id:'5J', s:'C(3)H(9)N', n: 'Trimethylamine', u: false, m: new Amount({Da:59})};

const phenylalanine = { id:'5K', s:'C(9)H(11)NO(2)', n: 'Phenylalanine', u: false, m: new Amount({Da:165})};

const coniferylAlcohol = { id:'5L', s:'C(5)H(12)O(3)', n:'Coniferyl Alcohol', u:false, m: new Amount({Da:120})};
const sinapylAlcohol = { id:'5M', s:'C(11)H(14)O(4)', n:'Sinapyl Alcohol', u:false, m: new Amount({Da:210})};
const coumerylAlcohol = { id:'5N', s:'C(9)H(10)O(2)', n:'Coumeryl Alcohol', u:false, m: new Amount({Da:150})};

//lignin
const hardLignin = { id:'5O', s:'H.Lignin', n:'Hardwood Lignin', u: false, m: new Amount({Da:17000})};
const softLignin = { id:'5P', s:'S.Lignin', n:'Softwood Lignin', u: false, m: new Amount({Da:12900})};

//monosaccharide 
const glucose = { id:'5Q', s:'C(6)H(12)O(6)', n:'D-Glucose', u:false, m: new Amount({Da:180})};
const fructose = { id:'5R', s:'C(6)H(12)O(6)', n:'Fructose', u:false, m: new Amount({Da:180})};
const ribose = { id:'5S', s:'C(5)H(10)O(5)', n:'Ribose', u:false, m: new Amount({Da:150})};
const sucrose = { id:'5T', s:'C(12)H(22)O(11)', n:'Sucrose', u:false, m: new Amount({Da:342})};
const xylose = { id:'5U', s:'C(5)H(10)O(5)', n:'Xylose', u:false, m: new Amount({Da:150})};
const mannose = { id:'5V', s:'C(6)H(12)O(6)', n:'Mannose', u:false, m: new Amount({Da:180})};
const galactose = { id:'5W', s:'C(6)H(12)O(6)', n:'Galactose', u:false, m: new Amount({Da:180})};
const arabinose = { id:'5X', s:'C(5)H(10)O(5)', n:'Arabinose', u:false, m: new Amount({Da:150})};

//polysaccharide
const glycogen = { id:'5Y', s:'{C(6)H(10)O(5)}10k', n:'Glycogen', u:false, m: new Amount({Da:1800000})};
const cellulose = { id:'5Z', s:'{C(6)H(10)O(5)}5k', n:'Cellulose', u:false, m: new Amount({Da:81000})};
const hemicellulose = { id:'60', s:'HC', n:'Hemicellulose', u:false, m: new Amount({Da:500000})}; 
	
//mnt
//dnt
//tnt

//fat
//protein

//inorganic molecules
const HCl =  { id:'61', s:'HCl', n: 'Hydrochloric Acid', u: false, m: new Amount({Da:36})};
const H2SO4 =  { id:'62', s:'H(2)SO(4)', n: 'Sulfuric Acid', u: false, m: new Amount({Da:98})};

const NaOH = { id:'63', s:'NaOH', n: 'Sodium Hydroxide', u: false, m: new Amount({Da:40})};
const KOH = { id:'64', s:'KOH', n: 'Potassium Hydroxide', u: false, m: new Amount({Da:56})};
const NaCl = { id:'65', s:'NaCl', n: 'Sodium Chloride', u: false, m: new Amount({Da:58})};
const KCl = { id:'66', s:'KCl', n: 'Potassium Chloride', u: false, m: new Amount({Da:74})};

const Na2S = { id:'67', s:'Na(2)S', n:'Sodium Sulfide', u:false, m: new Amount({Da:78})};
const Na2SO4 = { id:'68', s:'Na(2)SO(4)', n:'Sodium Sulfate', u:false, m:new Amount({Da:142})};

const mildSteel = { id:'69', s:'M.Steel', n: 'Mild Steel', u: false, m: new Amount({Da:5612})};
const highSteel = { id:'70', s:'H.Steel', n: 'High Steel', u: false, m: new Amount({Da:5660})};

//wood
const hardwoodParticle = { id:'71', s:'H.Part', n:'Hardwood Particle', u: false, m: new Amount({Da:1664000})};
const softwoodParticle = { id:'72', s:'S.Part', n:'Softwood Particle', u: false, m: new Amount({Da:1406000})};
const hardwoodFiber = { id:'73', s:'H.Fiber', n:'Hardwood Fiber', u: false, m: new Amount({pg:200})};
const softwoodFiber = { id:'74', s:'S.Fiber', n:'Softwood Fiber', u: false, m: new Amount({pg:150})};
const hardwoodChip = { id:'75', s:'H.Chip', n:'Hardwood Chip', u: false, m: new Amount({g:2})};
const softwoodChip = { id:'76', s:'S.Chip', n:'Softwood Chip', u: false, m: new Amount({g:1})};
const hardwoodPulp = { id:'77', s:'H.Pulp', n:'Hardwood Pulp', u: false, m: new Amount({g:2})};
const softwoodPulp = { id:'78', s:'S.Pulp', n:'Softwood Pulp', u: false, m: new Amount({g:1})};
//MDF: 9% resin, 1% paraffin, 90% wood fibers

const whiteLiquorMote = { id:'79', s:'W.Liquor', n:'White Liquor Mote', u:false, m: new Amount({pg:1})};
const whiteLiquor = { id:'7a',s:'W.Liquor', n:'White Liquor', u:false, m: new Amount({g:1})};
const blackLiquor = { id:'7b',s:'B.Liquor', n:'Black Liquor', u:false, m: new Amount({g:1})};
const paperA4 = { id:'7c',s:'A4', n:'A4 Paper', u:false, m: new Amount({g:4})};
const paperA3 = { id:'7d',s:'A3', n:'A3 Paper', u:false, m: new Amount({g:8})};
const paperA2 = { id:'7e',s:'A2', n:'A2 Paper', u:false, m: new Amount({g:16})};
const paperA1 = { id:'7f',s:'A1', n:'A1 Paper', u:false, m: new Amount({g:32})};
const paperA0 = { id:'7g',s:'A0', n:'A0 Paper', u:false, m: new Amount({g:64})};

//paper
//4A0 - 256g
//2A0 - 128g
//A0 - 64g
//A1 - 32g
//A2 - 16g
//A3 - 8g
//A4 - 4g
//A5 - 2g
//A6 - 1g
//A7 - .5g = 500,000,000,000pg
//A8 - 250,000,000,000pg
//A9 - 125,000,000,000pg
//A10 - 62,500,000,000pg

//planet types:
//terrestrial, gas giant, ice giant, dwarf planet, super-earth, mini-neptune
