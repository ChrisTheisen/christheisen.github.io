//Adding Items:
//1) Add the item to items.js
//2) Add recipes to recipes.js
//3) Add the items to the menu in data.js

//subatomic
const Q_Up = { s:'u', n: 'Up Quark', u: true, m: new Amount({ s:'',Da:.0022})};
const Q_Down = { s:'d', n: 'Down Quark', u: true, m: new Amount({ s:'',Da:.0047})};
const Electron = { s:'e', n: 'Electron', u: true, m: new Amount({ s:'',Da:.0005})};
const Proton = { s:'p', n: 'Proton', u: false, m: new Amount({ s:'',Da:1})};
const Neutron = { s:'n', n: 'Neutron', u: false, m: new Amount({ s:'',Da:1})};

//atoms
const H1 = { s:'[1]H', n: 'Hydrogen1', u: false, m: new Amount({ s:'',Da:1})};
const H2 = { s:'[2]H', n: 'Deuterium', u: false, m: new Amount({ s:'',Da:2})};
const H3 = { s:'[3]H', n: 'Tritium', u: false, m: new Amount({ s:'',Da:3})};
const He3 = { s:'[3]He', n: 'Helium3', u: false, m: new Amount({ s:'',Da:3})};
const He4 = { s:'[4]He', n: 'Helium4', u: false, m: new Amount({ s:'',Da:4})};
const Li6 = { s:'[6]Li', n: 'Lithium6', u: false, m: new Amount({ s:'',Da:6})};
const Li7 = { s:'[7]Li', n: 'Lithium7', u: false, m: new Amount({ s:'',Da:7})};
const Be9 = { s:'[9]Be', n: 'Beryllium9', u: false, m: new Amount({ s:'',Da:9})};
const B10 = { s:'[10]B', n: 'Boron10', u: false, m: new Amount({ s:'',Da:10})};
const B11 = { s:'[11]B', n: 'Boron11', u: false, m: new Amount({ s:'',Da:11})};
const C12 = { s:'[12]C', n: 'Carbon12', u: false, m: new Amount({ s:'',Da:12})};
const C13 = { s:'[13]C', n: 'Carbon13', u: false, m: new Amount({ s:'',Da:13})};
const N14 = { s:'[14]N', n: 'Nitrogen14', u: false, m: new Amount({ s:'',Da:14})};
const N15 = { s:'[15]N', n: 'Nitrogen15', u: false, m: new Amount({ s:'',Da:15})};
const O16 = { s:'[16]O', n: 'Oxygen16', u: false, m: new Amount({ s:'',Da:16})};
const O17 = { s:'[17]O', n: 'Oxygen17', u: false, m: new Amount({ s:'',Da:17})};
const O18 = { s:'[18]O', n: 'Oxygen18', u: false, m: new Amount({ s:'',Da:18})};
const F19 = { s:'[19]F', n: 'Fluorine19', u: false, m: new Amount({ s:'',Da:19})};
const Ne20 = { s:'[20]Ne', n: 'Neon20', u: false, m: new Amount({ s:'',Da:20})};
const Ne21 = { s:'[21]Ne', n: 'Neon21', u: false, m: new Amount({ s:'',Da:21})};
const Ne22 = { s:'[22]Ne', n: 'Neon22', u: false, m: new Amount({ s:'',Da:22})};
const Na23 = { s:'[23]Na', n: 'Sodium23', u: false, m: new Amount({ s:'',Da:23})};
const Mg24 = { s:'[24]Mg', n: 'Magnesium24', u: false, m: new Amount({ s:'',Da:24})};
const Mg25 = { s:'[25]Mg', n: 'Magnesium25', u: false, m: new Amount({ s:'',Da:25})};
const Mg26 = { s:'[26]Mg', n: 'Magnesium26', u: false, m: new Amount({ s:'',Da:26})};
const Al27 = { s:'[27]Al', n: 'Aluminum27', u: false, m: new Amount({ s:'',Da:27})};
const Si28 = { s:'[28]Si', n: 'Silicon28', u: false, m: new Amount({ s:'',Da:28})};
const Si29 = { s:'[29]Si', n: 'Silicon29', u: false, m: new Amount({ s:'',Da:29})};
const Si30 = { s:'[30]Si', n: 'Silicon30', u: false, m: new Amount({ s:'',Da:30})};
const P31 = { s:'[31]P', n: 'Phosphorus31', u: false, m: new Amount({ s:'',Da:31})};
const S32 = { s:'[32]S', n: 'Sulfur32', u: false, m: new Amount({ s:'',Da:32})};
const S33 = { s:'[33]S', n: 'Sulfur33', u: false, m: new Amount({ s:'',Da:33})};
const S34 = { s:'[34]S', n: 'Sulfur34', u: false, m: new Amount({ s:'',Da:34})};
const S36 = { s:'[36]S', n: 'Sulfur36', u: false, m: new Amount({ s:'',Da:36})};
const Cl35 = { s:'[35]Cl', n: 'Chlorine35', u: false, m: new Amount({ s:'',Da:35})};
const Cl37 = { s:'[37]Cl', n: 'Chlorine37', u: false, m: new Amount({ s:'',Da:37})};
const Ar36 = { s:'[36]Ar', n: 'Argon36', u: false, m: new Amount({ s:'',Da:36})};
const Ar38 = { s:'[38]Ar', n: 'Argon38', u: false, m: new Amount({ s:'',Da:38})};
const Ar40 = { s:'[40]Ar', n: 'Argon40', u: false, m: new Amount({ s:'',Da:40})};
const K39 = { s:'[30]K', n: 'Potassium39', u: false, m: new Amount({ s:'',Da:39})};
const K40 = { s:'[40]K', n: 'Potassium40', u: false, m: new Amount({ s:'',Da:40})};
const K41 = { s:'[41]K', n: 'Potassium41', u: false, m: new Amount({ s:'',Da:41})};
const Ca40 = { s:'[40]Ca', n: 'Calcium40', u: false, m: new Amount({ s:'',Da:40})};
const Ca42 = { s:'[42]Ca', n: 'Calcium42', u: false, m: new Amount({ s:'',Da:42})};
const Ca43 = { s:'[43]Ca', n: 'Calcium43', u: false, m: new Amount({ s:'',Da:43})};
const Ca44 = { s:'[44]Ca', n: 'Calcium44', u: false, m: new Amount({ s:'',Da:44})};
const Ca46 = { s:'[46]Ca', n: 'Calcium46', u: false, m: new Amount({ s:'',Da:46})};
const Ca48 = { s:'[48]Ca', n: 'Calcium48', u: false, m: new Amount({ s:'',Da:48})};
const Sc45 = { s:'[45]Sc', n: 'Scandium45', u: false, m: new Amount({ s:'',Da:45})};
const Ti46 = { s:'[46]Ti', n: 'Titanium46', u: false, m: new Amount({ s:'',Da:46})};
const Ti47 = { s:'[47]Ti', n: 'Titanium47', u: false, m: new Amount({ s:'',Da:47})};
const Ti48 = { s:'[48]Ti', n: 'Titanium48', u: false, m: new Amount({ s:'',Da:48})};
const Ti49 = { s:'[49]Ti', n: 'Titanium49', u: false, m: new Amount({ s:'',Da:49})};
const Ti50 = { s:'[50]Ti', n: 'Titanium50', u: false, m: new Amount({ s:'',Da:50})};
const V50 = { s:'[50]V' , n: 'Vandium50', u: false, m: new Amount({ s:'',Da:50})};
const V51 = { s:'[51]V' , n: 'Vandium51', u: false, m: new Amount({ s:'',Da:51})};
const Cr50 = { s:'[50]Cr', n: 'Chromium50', u: false, m: new Amount({ s:'',Da:50})};
const Cr52 = { s:'[52]Cr', n: 'Chromium52', u: false, m: new Amount({ s:'',Da:52})};
const Cr53 = { s:'[53]Cr', n: 'Chromium53', u: false, m: new Amount({ s:'',Da:53})};
const Cr54 = { s:'[54]Cr', n: 'Chromium54', u: false, m: new Amount({ s:'',Da:54})};
const Mn55 = { s:'[55]Mn', n: 'Manganese55', u: false, m: new Amount({ s:'',Da:55})};
const Fe54 = { s:'[54]Fe', n: 'Iron54', u: false, m: new Amount({ s:'',Da:54})};
const Fe56 = { s:'[56]Fe', n: 'Iron56', u: false, m: new Amount({ s:'',Da:56})};
const Fe57 = { s:'[57]Fe', n: 'Iron57', u: false, m: new Amount({ s:'',Da:57})};
const Fe58 = { s:'[58]Fe', n: 'Iron58', u: false, m: new Amount({ s:'',Da:58})};
const Co59 = { s:'[59]Co', n: 'Cobalt59', u: false, m: new Amount({ s:'',Da:59})};
const Ni58 = { s:'[58]Ni', n: 'Nickle58', u: false, m: new Amount({ s:'',Da:58})};
const Ni60 = { s:'[60]Ni', n: 'Nickle60', u: false, m: new Amount({ s:'',Da:60})};
const Ni61 = { s:'[61]Ni', n: 'Nickle61', u: false, m: new Amount({ s:'',Da:61})};
const Ni62 = { s:'[62]Ni', n: 'Nickle62', u: false, m: new Amount({ s:'',Da:62})};
const Ni64 = { s:'[64]Ni', n: 'Nickle64', u: false, m: new Amount({ s:'',Da:64})};
const Cu63 = { s:'[63]Cu', n: 'Copper63', u: false, m: new Amount({ s:'',Da:63})};
const Cu65 = { s:'[65]Cu', n: 'Copper65', u: false, m: new Amount({ s:'',Da:65})};
const Zn64 = { s:'[64]Zn', n: 'Zinc64', u: false, m: new Amount({ s:'',Da:64})};
const Zn66 = { s:'[66]Zn', n: 'Zinc66', u: false, m: new Amount({ s:'',Da:66})};
const Zn67 = { s:'[67]Zn', n: 'Zinc67', u: false, m: new Amount({ s:'',Da:67})};
const Zn68 = { s:'[68]Zn', n: 'Zinc68', u: false, m: new Amount({ s:'',Da:68})};
const Zn70 = { s:'[70]Zn', n: 'Zinc70', u: false, m: new Amount({ s:'',Da:70})};
const Ga69 = { s:'[69]Ga', n: 'Gallium69', u: false, m: new Amount({ s:'',Da:69})};
const Ga71 = { s:'[71]Ga', n: 'Gallium71', u: false, m: new Amount({ s:'',Da:71})};
const Ge70 = { s:'[70]Ge', n: 'Germanium70', u: false, m: new Amount({ s:'',Da:70})};
const Ge72 = { s:'[72]Ge', n: 'Germanium72', u: false, m: new Amount({ s:'',Da:72})};
const Ge73 = { s:'[73]Ge', n: 'Germanium73', u: false, m: new Amount({ s:'',Da:73})};
const Ge74 = { s:'[74]Ge', n: 'Germanium74', u: false, m: new Amount({ s:'',Da:74})};
const Ge76 = { s:'[76]Ge', n: 'Germanium76', u: false, m: new Amount({ s:'',Da:76})};
const As75 = { s:'[75]As', n: 'Arsenic75', u: false, m: new Amount({ s:'',Da:75})};
const Se74 = { s:'[74]Se', n: 'Selenium74', u: false, m: new Amount({ s:'',Da:74})};
const Se76 = { s:'[76]Se', n: 'Selenium76', u: false, m: new Amount({ s:'',Da:76})};
const Se77 = { s:'[77]Se', n: 'Selenium77', u: false, m: new Amount({ s:'',Da:77})};
const Se78 = { s:'[78]Se', n: 'Selenium78', u: false, m: new Amount({ s:'',Da:78})};
const Se80 = { s:'[80]Se', n: 'Selenium80', u: false, m: new Amount({ s:'',Da:80})};
const Se82 = { s:'[82]Se', n: 'Selenium82', u: false, m: new Amount({ s:'',Da:82})};
const Br79 = { s:'[79]Br', n: 'Bromine79', u: false, m: new Amount({ s:'',Da:79})};
const Br81 = { s:'[81]Br', n: 'Bromine81', u: false, m: new Amount({ s:'',Da:81})};
const Kr78 = { s:'[78]Kr', n: 'Krypton78', u: false, m: new Amount({ s:'',Da:78})};
const Kr80 = { s:'[80]Kr', n: 'Krypton80', u: false, m: new Amount({ s:'',Da:80})};
const Kr82 = { s:'[82]Kr', n: 'Krypton82', u: false, m: new Amount({ s:'',Da:82})};
const Kr83 = { s:'[83]Kr', n: 'Krypton83', u: false, m: new Amount({ s:'',Da:83})};
const Kr84 = { s:'[84]Kr', n: 'Krypton84', u: false, m: new Amount({ s:'',Da:84})};
const Kr86 = { s:'[86]Kr', n: 'Krypton86', u: false, m: new Amount({ s:'',Da:86})};
const Rb85 = { s:'[85]Rb', n: 'Rubidium85', u: false, m: new Amount({ s:'',Da:85})};
const Rb87 = { s:'[87]Rb', n: 'Rubidium87', u: false, m: new Amount({ s:'',Da:87})};
const Sr84 = { s:'[84]Sr', n: 'Strontium84', u: false, m: new Amount({ s:'',Da:84})};
const Sr86 = { s:'[86]Sr', n: 'Strontium86', u: false, m: new Amount({ s:'',Da:86})};
const Sr87 = { s:'[87]Sr', n: 'Strontium87', u: false, m: new Amount({ s:'',Da:87})};
const Sr88 = { s:'[88]Sr', n: 'Strontium88', u: false, m: new Amount({ s:'',Da:88})};
const Y89 = { s:'[89]Y' , n: 'Ytrium89', u: false, m: new Amount({ s:'',Da:89})};
const Zr90 = { s:'[90]Zr', n: 'Zirconium90', u: false, m: new Amount({ s:'',Da:90})};
const Zr91 = { s:'[91]Zr', n: 'Zirconium91', u: false, m: new Amount({ s:'',Da:91})};
const Zr92 = { s:'[92]Zr', n: 'Zirconium92', u: false, m: new Amount({ s:'',Da:92})};
const Zr94 = { s:'[94]Zr', n: 'Zirconium94', u: false, m: new Amount({ s:'',Da:94})};
const Zr96 = { s:'[96]Zr', n: 'Zirconium96', u: false, m: new Amount({ s:'',Da:96})};
const Nb93 = { s:'[93]Nb', n: 'Niobium93', u: false, m: new Amount({ s:'',Da:93})};
const Mo92 = { s:'[92]Mo', n: 'Molybdenum92', u: false, m: new Amount({ s:'',Da:92})};
const Mo94 = { s:'[94]Mo', n: 'Molybdenum94', u: false, m: new Amount({ s:'',Da:94})};
const Mo95 = { s:'[95]Mo', n: 'Molybdenum95', u: false, m: new Amount({ s:'',Da:95})};
const Mo96 = { s:'[96]Mo', n: 'Molybdenum96', u: false, m: new Amount({ s:'',Da:96})};
const Mo97 = { s:'[97]Mo', n: 'Molybdenum97', u: false, m: new Amount({ s:'',Da:97})};
const Mo98 = { s:'[98]Mo', n: 'Molybdenum98', u: false, m: new Amount({ s:'',Da:98})};
const Mo100 = { s:'[100]Mo', n: 'Molybdenum100', u: false, m: new Amount({ s:'',Da:100})};
const Tc97 = { s:'[97]Tc', n: 'Technitium97', u: false, m: new Amount({ s:'',Da:97})};
const Ru96 = { s:'[96]Ru', n: 'Ruthenium96', u: false, m: new Amount({ s:'',Da:96})};
const Ru98 = { s:'[98]Ru', n: 'Ruthenium98', u: false, m: new Amount({ s:'',Da:98})};
const Ru99 = { s:'[99]Ru', n: 'Ruthenium99', u: false, m: new Amount({ s:'',Da:99})};
const Ru100 = { s:'[100]Ru', n: 'Ruthenium100', u: false, m: new Amount({ s:'',Da:100})};
const Ru101 = { s:'[101]Ru', n: 'Ruthenium101', u: false, m: new Amount({ s:'',Da:101})};
const Ru102 = { s:'[102]Ru', n: 'Ruthenium102', u: false, m: new Amount({ s:'',Da:102})};
const Ru104 = { s:'[104]Ru', n: 'Ruthenium104', u: false, m: new Amount({ s:'',Da:104})};
const Rh103 = { s:'[103]Rh', n: 'Rhodium103', u: false, m: new Amount({ s:'',Da:103})};
const Pd102 = { s:'[102]Pd', n: 'Paladium102', u: false, m: new Amount({ s:'',Da:102})};
const Pd104 = { s:'[104]Pd', n: 'Paladium104', u: false, m: new Amount({ s:'',Da:104})};
const Pd105 = { s:'[105]Pd', n: 'Paladium105', u: false, m: new Amount({ s:'',Da:105})};
const Pd106 = { s:'[106]Pd', n: 'Paladium106', u: false, m: new Amount({ s:'',Da:106})};
const Pd108 = { s:'[108]Pd', n: 'Paladium108', u: false, m: new Amount({ s:'',Da:108})};
const Pd110 = { s:'[110]Pd', n: 'Paladium110', u: false, m: new Amount({ s:'',Da:110})};
const Ag107 = { s:'[107]Ag', n: 'Silver107', u: false, m: new Amount({ s:'',Da:107})};
const Ag109 = { s:'[109]Ag', n: 'Silver109', u: false, m: new Amount({ s:'',Da:109})};
const Cd106 = { s:'[106]Cd', n: 'Cadmium106', u: false, m: new Amount({ s:'',Da:106})};
const Cd108 = { s:'[108]Cd', n: 'Cadmium108', u: false, m: new Amount({ s:'',Da:108})};
const Cd110 = { s:'[110]Cd', n: 'Cadmium110', u: false, m: new Amount({ s:'',Da:110})};
const Cd111 = { s:'[111]Cd', n: 'Cadmium111', u: false, m: new Amount({ s:'',Da:111})};
const Cd112 = { s:'[112]Cd', n: 'Cadmium112', u: false, m: new Amount({ s:'',Da:112})};
const Cd113 = { s:'[113]Cd', n: 'Cadmium113', u: false, m: new Amount({ s:'',Da:113})};
const Cd114 = { s:'[114]Cd', n: 'Cadmium114', u: false, m: new Amount({ s:'',Da:114})};
const Cd116 = { s:'[116]Cd', n: 'Cadmium116', u: false, m: new Amount({ s:'',Da:116})};
const In113 = { s:'[113]In', n: 'Indium113', u: false, m: new Amount({ s:'',Da:113})};
const In115 = { s:'[115]In', n: 'Indium115', u: false, m: new Amount({ s:'',Da:115})};
const Sn112 = { s:'[112]Sn', n: 'Tin112', u: false, m: new Amount({ s:'',Da:112})};
const Sn114 = { s:'[114]Sn', n: 'Tin114', u: false, m: new Amount({ s:'',Da:114})};
const Sn115 = { s:'[115]Sn', n: 'Tin115', u: false, m: new Amount({ s:'',Da:115})};
const Sn116 = { s:'[116]Sn', n: 'Tin116', u: false, m: new Amount({ s:'',Da:116})};
const Sn117 = { s:'[117]Sn', n: 'Tin117', u: false, m: new Amount({ s:'',Da:117})};
const Sn118 = { s:'[118]Sn', n: 'Tin118', u: false, m: new Amount({ s:'',Da:118})};
const Sn119 = { s:'[119]Sn', n: 'Tin119', u: false, m: new Amount({ s:'',Da:119})};
const Sn120 = { s:'[120]Sn', n: 'Tin120', u: false, m: new Amount({ s:'',Da:120})};
const Sn122 = { s:'[122]Sn', n: 'Tin122', u: false, m: new Amount({ s:'',Da:122})};
const Sn124 = { s:'[124]Sn', n: 'Tin124', u: false, m: new Amount({ s:'',Da:124})};
const Sb121 = { s:'[121]Sb', n: 'Antimony121', u: false, m: new Amount({ s:'',Da:121})};
const Sb123 = { s:'[123]Sb', n: 'Antimony123', u: false, m: new Amount({ s:'',Da:123})};
const Te120 = { s:'[120]Te', n: 'Tellurium120', u: false, m: new Amount({ s:'',Da:120})};
const Te122 = { s:'[122]Te', n: 'Tellurium122', u: false, m: new Amount({ s:'',Da:122})};
const Te123 = { s:'[123]Te', n: 'Tellurium123', u: false, m: new Amount({ s:'',Da:123})};
const Te124 = { s:'[124]Te', n: 'Tellurium124', u: false, m: new Amount({ s:'',Da:124})};
const Te125 = { s:'[125]Te', n: 'Tellurium125', u: false, m: new Amount({ s:'',Da:125})};
const Te126 = { s:'[126]Te', n: 'Tellurium126', u: false, m: new Amount({ s:'',Da:126})};
const Te128 = { s:'[128]Te', n: 'Tellurium128', u: false, m: new Amount({ s:'',Da:128})};
const Te130 = { s:'[130]Te', n: 'Tellurium130', u: false, m: new Amount({ s:'',Da:130})};
const I127 = { s:'[127]I' , n: 'Iodine127', u: false, m: new Amount({ s:'',Da:127})};
const Xe124 = { s:'[124]Xe', n: 'Xenon124', u: false, m: new Amount({ s:'',Da:124})};
const Xe126 = { s:'[126]Xe', n: 'Xenon126', u: false, m: new Amount({ s:'',Da:126})};
const Xe128 = { s:'[128]Xe', n: 'Xenon128', u: false, m: new Amount({ s:'',Da:128})};
const Xe129 = { s:'[129]Xe', n: 'Xenon129', u: false, m: new Amount({ s:'',Da:129})};
const Xe130 = { s:'[130]Xe', n: 'Xenon130', u: false, m: new Amount({ s:'',Da:130})};
const Xe131 = { s:'[131]Xe', n: 'Xenon131', u: false, m: new Amount({ s:'',Da:131})};
const Xe132 = { s:'[132]Xe', n: 'Xenon132', u: false, m: new Amount({ s:'',Da:132})};
const Xe134 = { s:'[134]Xe', n: 'Xenon134', u: false, m: new Amount({ s:'',Da:134})};
const Xe136 = { s:'[136]Xe', n: 'Xenon136', u: false, m: new Amount({ s:'',Da:136})};
const Cs133 = { s:'[133]Cs', n: 'Cesium133', u: false, m: new Amount({ s:'',Da:133})};
const Ba130 = { s:'[130]Ba', n: 'Barium130', u: false, m: new Amount({ s:'',Da:130})};
const Ba132 = { s:'[132]Ba', n: 'Barium132', u: false, m: new Amount({ s:'',Da:132})};
const Ba134 = { s:'[134]Ba', n: 'Barium134', u: false, m: new Amount({ s:'',Da:134})};
const Ba135 = { s:'[135]Ba', n: 'Barium135', u: false, m: new Amount({ s:'',Da:135})};
const Ba136 = { s:'[136]Ba', n: 'Barium136', u: false, m: new Amount({ s:'',Da:136})};
const Ba137 = { s:'[137]Ba', n: 'Barium137', u: false, m: new Amount({ s:'',Da:137})};
const Ba138 = { s:'[138]Ba', n: 'Barium138', u: false, m: new Amount({ s:'',Da:138})};
const La138 = { s:'[138]La', n: 'Lanthanum138', u: false, m: new Amount({ s:'',Da:138})};
const La139 = { s:'[139]La', n: 'Lanthanum139', u: false, m: new Amount({ s:'',Da:139})};
const Ce136 = { s:'[136]Ce', n: 'Cerium136', u: false, m: new Amount({ s:'',Da:136})};
const Ce138 = { s:'[138]Ce', n: 'Cerium138', u: false, m: new Amount({ s:'',Da:138})};
const Ce140 = { s:'[140]Ce', n: 'Cerium140', u: false, m: new Amount({ s:'',Da:140})};
const Ce142 = { s:'[142]Ce', n: 'Cerium142', u: false, m: new Amount({ s:'',Da:142})};
const Pr141 = { s:'[141]Pr', n: 'Praseodymium141', u: false, m: new Amount({ s:'',Da:141})};
const Nd142 = { s:'[142]Nd', n: 'Nedymium142', u: false, m: new Amount({ s:'',Da:142})};
const Nd143 = { s:'[143]Nd', n: 'Nedymium143', u: false, m: new Amount({ s:'',Da:143})};
const Nd144 = { s:'[144]Nd', n: 'Nedymium144', u: false, m: new Amount({ s:'',Da:144})};
const Nd145 = { s:'[145]Nd', n: 'Nedymium145', u: false, m: new Amount({ s:'',Da:145})};
const Nd146 = { s:'[146]Nd', n: 'Nedymium146', u: false, m: new Amount({ s:'',Da:146})};
const Nd148 = { s:'[148]Nd', n: 'Nedymium148', u: false, m: new Amount({ s:'',Da:148})};
const Nd150 = { s:'[150]Nd', n: 'Nedymium150', u: false, m: new Amount({ s:'',Da:150})};
const Pm145 = { s:'[145]Pm', n: 'Promethium145', u: false, m: new Amount({ s:'',Da:145})};
const Sm144 = { s:'[144]Sm', n: 'Samarium144', u: false, m: new Amount({ s:'',Da:144})};
const Sm147 = { s:'[147]Sm', n: 'Samarium147', u: false, m: new Amount({ s:'',Da:147})};
const Sm148 = { s:'[148]Sm', n: 'Samarium148', u: false, m: new Amount({ s:'',Da:148})};
const Sm149 = { s:'[149]Sm', n: 'Samarium149', u: false, m: new Amount({ s:'',Da:149})};
const Sm150 = { s:'[150]Sm', n: 'Samarium150', u: false, m: new Amount({ s:'',Da:150})};
const Sm152 = { s:'[152]Sm', n: 'Samarium152', u: false, m: new Amount({ s:'',Da:152})};
const Sm154 = { s:'[154]Sm', n: 'Samarium154', u: false, m: new Amount({ s:'',Da:154})};
const Eu151 = { s:'[151]Eu', n: 'Europium151', u: false, m: new Amount({ s:'',Da:151})};
const Eu153 = { s:'[153]Eu', n: 'Europium153', u: false, m: new Amount({ s:'',Da:153})};
const Gd152 = { s:'[152]Gd', n: 'Gadolinium152', u: false, m: new Amount({ s:'',Da:152})};
const Gd154 = { s:'[154]Gd', n: 'Gadolinium154', u: false, m: new Amount({ s:'',Da:154})};
const Gd155 = { s:'[155]Gd', n: 'Gadolinium155', u: false, m: new Amount({ s:'',Da:155})};
const Gd156 = { s:'[156]Gd', n: 'Gadolinium156', u: false, m: new Amount({ s:'',Da:156})};
const Gd157 = { s:'[157]Gd', n: 'Gadolinium157', u: false, m: new Amount({ s:'',Da:157})};
const Gd158 = { s:'[158]Gd', n: 'Gadolinium158', u: false, m: new Amount({ s:'',Da:158})};
const Gd160 = { s:'[160]Gd', n: 'Gadolinium160', u: false, m: new Amount({ s:'',Da:160})};
const Tb159 = { s:'[159]Tb', n: 'Terbium159', u: false, m: new Amount({ s:'',Da:159})};
const Dy156 = { s:'[156]Dy', n: 'Dysprosium156', u: false, m: new Amount({ s:'',Da:156})};
const Dy158 = { s:'[158]Dy', n: 'Dysprosium158', u: false, m: new Amount({ s:'',Da:158})};
const Dy160 = { s:'[160]Dy', n: 'Dysprosium160', u: false, m: new Amount({ s:'',Da:160})};
const Dy161 = { s:'[161]Dy', n: 'Dysprosium161', u: false, m: new Amount({ s:'',Da:161})};
const Dy162 = { s:'[162]Dy', n: 'Dysprosium162', u: false, m: new Amount({ s:'',Da:162})};
const Dy163 = { s:'[163]Dy', n: 'Dysprosium163', u: false, m: new Amount({ s:'',Da:163})};
const Dy164 = { s:'[164]Dy', n: 'Dysprosium164', u: false, m: new Amount({ s:'',Da:164})};
const Ho165 = { s:'[165]Ho', n: 'Holmium165', u: false, m: new Amount({ s:'',Da:165})};
const Er162 = { s:'[162]Er', n: 'Erbium162', u: false, m: new Amount({ s:'',Da:162})};
const Er164 = { s:'[164]Er', n: 'Erbium164', u: false, m: new Amount({ s:'',Da:164})};
const Er166 = { s:'[166]Er', n: 'Erbium166', u: false, m: new Amount({ s:'',Da:166})};
const Er167 = { s:'[167]Er', n: 'Erbium167', u: false, m: new Amount({ s:'',Da:167})};
const Er168 = { s:'[168]Er', n: 'Erbium168', u: false, m: new Amount({ s:'',Da:168})};
const Er170 = { s:'[170]Er', n: 'Erbium170', u: false, m: new Amount({ s:'',Da:170})};
const Tm169 = { s:'[169]Tm', n: 'Thulium160', u: false, m: new Amount({ s:'',Da:169})};
const Yb168 = { s:'[168]Yb', n: 'Ytterbium168', u: false, m: new Amount({ s:'',Da:168})};
const Yb170 = { s:'[170]Yb', n: 'Ytterbium170', u: false, m: new Amount({ s:'',Da:170})};
const Yb171 = { s:'[171]Yb', n: 'Ytterbium171', u: false, m: new Amount({ s:'',Da:171})};
const Yb172 = { s:'[172]Yb', n: 'Ytterbium172', u: false, m: new Amount({ s:'',Da:172})};
const Yb173 = { s:'[173]Yb', n: 'Ytterbium173', u: false, m: new Amount({ s:'',Da:173})};
const Yb174 = { s:'[174]Yb', n: 'Ytterbium174', u: false, m: new Amount({ s:'',Da:174})};
const Yb176 = { s:'[176]Yb', n: 'Ytterbium176', u: false, m: new Amount({ s:'',Da:176})};
const Lu175 = { s:'[175]Lu', n: 'Lutetium175', u: false, m: new Amount({ s:'',Da:175})};
const Lu176 = { s:'[176]Lu', n: 'Lutetium176', u: false, m: new Amount({ s:'',Da:176})};
const Hf174 = { s:'[174]Hf', n: 'Hafnium174', u: false, m: new Amount({ s:'',Da:174})};
const Hf176 = { s:'[176]Hf', n: 'Hafnium176', u: false, m: new Amount({ s:'',Da:176})};
const Hf177 = { s:'[177]Hf', n: 'Hafnium177', u: false, m: new Amount({ s:'',Da:177})};
const Hf178 = { s:'[178]Hf', n: 'Hafnium178', u: false, m: new Amount({ s:'',Da:178})};
const Hf179 = { s:'[179]Hf', n: 'Hafnium179', u: false, m: new Amount({ s:'',Da:179})};
const Hf180 = { s:'[180]Hf', n: 'Hafnium180', u: false, m: new Amount({ s:'',Da:180})};
const Ta181 = { s:'[181]Ta', n: 'Tantalum181', u: false, m: new Amount({ s:'',Da:181})};
const W180 = { s:'[180]W' , n: 'Tungsten180', u: false, m: new Amount({ s:'',Da:180})};
const W182 = { s:'[182]W' , n: 'Tungsten182', u: false, m: new Amount({ s:'',Da:182})};
const W183 = { s:'[183]W' , n: 'Tungsten183', u: false, m: new Amount({ s:'',Da:183})};
const W184 = { s:'[184]W' , n: 'Tungsten184', u: false, m: new Amount({ s:'',Da:184})};
const W186 = { s:'[186]W' , n: 'Tungsten186', u: false, m: new Amount({ s:'',Da:186})};
const Re185 = { s:'[185]Re', n: 'Rhenium185', u: false, m: new Amount({ s:'',Da:185})};
const Re187 = { s:'[187]Re', n: 'Rhenium187', u: false, m: new Amount({ s:'',Da:187})};
const Os184 = { s:'[184]Os', n: 'Osmium184', u: false, m: new Amount({ s:'',Da:184})};
const Os186 = { s:'[186]Os', n: 'Osmium186', u: false, m: new Amount({ s:'',Da:186})};
const Os187 = { s:'[187]Os', n: 'Osmium187', u: false, m: new Amount({ s:'',Da:187})};
const Os188 = { s:'[188]Os', n: 'Osmium188', u: false, m: new Amount({ s:'',Da:188})};
const Os189 = { s:'[189]Os', n: 'Osmium189', u: false, m: new Amount({ s:'',Da:189})};
const Os190 = { s:'[190]Os', n: 'Osmium190', u: false, m: new Amount({ s:'',Da:190})};
const Os192 = { s:'[192]Os', n: 'Osmium192', u: false, m: new Amount({ s:'',Da:192})};
const Ir191 = { s:'[191]Ir', n: 'Iridium191', u: false, m: new Amount({ s:'',Da:191})};
const Ir193 = { s:'[193]Ir', n: 'Iridium193', u: false, m: new Amount({ s:'',Da:193})};
const Pt190 = { s:'[190]Pt', n: 'Platinum190', u: false, m: new Amount({ s:'',Da:190})};
const Pt192 = { s:'[192]Pt', n: 'Platinum192', u: false, m: new Amount({ s:'',Da:192})};
const Pt194 = { s:'[194]Pt', n: 'Platinum194', u: false, m: new Amount({ s:'',Da:194})};
const Pt195 = { s:'[195]Pt', n: 'Platinum195', u: false, m: new Amount({ s:'',Da:195})};
const Pt196 = { s:'[196]Pt', n: 'Platinum196', u: false, m: new Amount({ s:'',Da:196})};
const Pt198 = { s:'[198]Pt', n: 'Platinum198', u: false, m: new Amount({ s:'',Da:198})};
const Au197 = { s:'[197]Au', n: 'Gold197', u: false, m: new Amount({ s:'',Da:197})};
const Hg196 = { s:'[196]Hg', n: 'Mercury196', u: false, m: new Amount({ s:'',Da:196})};
const Hg198 = { s:'[198]Hg', n: 'Mercury198', u: false, m: new Amount({ s:'',Da:198})};
const Hg199 = { s:'[199]Hg', n: 'Mercury199', u: false, m: new Amount({ s:'',Da:199})};
const Hg200 = { s:'[200]Hg', n: 'Mercury200', u: false, m: new Amount({ s:'',Da:200})};
const Hg201 = { s:'[201]Hg', n: 'Mercury201', u: false, m: new Amount({ s:'',Da:201})};
const Hg202 = { s:'[202]Hg', n: 'Mercury202', u: false, m: new Amount({ s:'',Da:202})};
const Hg204 = { s:'[204]Hg', n: 'Mercury204', u: false, m: new Amount({ s:'',Da:204})};
const Tl203 = { s:'[203]Tl', n: 'Thallium203', u: false, m: new Amount({ s:'',Da:203})};
const Tl205 = { s:'[205]Tl', n: 'Thallium205', u: false, m: new Amount({ s:'',Da:205})};
const Pb204 = { s:'[204]Pb', n: 'Lead204', u: false, m: new Amount({ s:'',Da:204})};
const Pb206 = { s:'[206]Pb', n: 'Lead206', u: false, m: new Amount({ s:'',Da:206})};
const Pb207 = { s:'[207]Pb', n: 'Lead207', u: false, m: new Amount({ s:'',Da:207})};
const Pb208 = { s:'[208]Pb', n: 'Lead208', u: false, m: new Amount({ s:'',Da:208})};
const Bi209 = { s:'[209]Bi', n: 'Bismuth209', u: false, m: new Amount({ s:'',Da:209})};
const Po209 = { s:'[209]Po', n: 'Polonium209', u: false, m: new Amount({ s:'',Da:209})};
const At210 = { s:'[210]At', n: 'Astatine210', u: false, m: new Amount({ s:'',Da:210})};
const Rn222 = { s:'[222]Rn', n: 'Radon222', u: false, m: new Amount({ s:'',Da:222})};
const Fr223 = { s:'[223]Fr', n: 'Francium223', u: false, m: new Amount({ s:'',Da:223})};
const Ra226 = { s:'[226]Ra', n: 'Radium226', u: false, m: new Amount({ s:'',Da:226})};
const Ac227 = { s:'[227]Ac', n: 'Actinium227', u: false, m: new Amount({ s:'',Da:227})};
const Th232 = { s:'[232]Th', n: 'Thorium232', u: false, m: new Amount({ s:'',Da:232})};
const Pa231 = { s:'[231]Pa', n: 'Protactinium231', u: false, m: new Amount({ s:'',Da:231})};
const U234 = { s:'[234]U' , n: 'Uranium234', u: false, m: new Amount({ s:'',Da:234})};
const U235 = { s:'[235]U' , n: 'Uranium235', u: false, m: new Amount({ s:'',Da:235})};
const U238 = { s:'[238]U' , n: 'Uranium238', u: false, m: new Amount({ s:'',Da:238})};
const Np237 = { s:'[237]Np', n: 'Neptunium237', u: false, m: new Amount({ s:'',Da:237})};
const Pu244 = { s:'[244]Pu', n: 'Plutonium244', u: false, m: new Amount({ s:'',Da:244})};
const Am243 = { s:'[243]Am', n: 'Americium243', u: false, m: new Amount({ s:'',Da:243})};
const Cm247 = { s:'[247]Cm', n: 'Curium247', u: false, m: new Amount({ s:'',Da:247})};
const Bk247 = { s:'[247]Bk', n: 'Berkelium247', u: false, m: new Amount({ s:'',Da:247})};
const Cf251 = { s:'[251]Cf', n: 'Californium251', u: false, m: new Amount({ s:'',Da:251})};
const Es252 = { s:'[252]Es', n: 'Einsteinium252', u: false, m: new Amount({ s:'',Da:252})};
const Fm257 = { s:'[257]Fm', n: 'Fermium257', u: false, m: new Amount({ s:'',Da:257})};
const Md258 = { s:'[258]Md', n: 'Mendelevium258', u: false, m: new Amount({ s:'',Da:258})};
const No261 = { s:'[261]No', n: 'Nobelium261', u: false, m: new Amount({ s:'',Da:261})};
const Lr264 = { s:'[264]Lr', n: 'Lawrencium264', u: false, m: new Amount({ s:'',Da:264})};
const Rf265 = { s:'[265]Rf', n: 'Rutherfordium265', u: false, m: new Amount({ s:'',Da:265})};
const Db268 = { s:'[268]Db', n: 'Dubnium268', u: false, m: new Amount({ s:'',Da:268})};
const Sg271 = { s:'[271]Sg', n: 'Seaborgium271', u: false, m: new Amount({ s:'',Da:271})};
const Bh273 = { s:'[273]Bh', n: 'Bohrium273', u: false, m: new Amount({ s:'',Da:273})};
const Hs276 = { s:'[276]Hs', n: 'Hassium276', u: false, m: new Amount({ s:'',Da:276})};
const Mt278 = { s:'[278]Mt', n: 'Meitnerium278', u: false, m: new Amount({ s:'',Da:278})};
const Ds281 = { s:'[281]Ds', n: 'Darmstadtium281', u: false, m: new Amount({ s:'',Da:281})};
const Rg283 = { s:'[283]Rg', n: 'Roentgenium283', u: false, m: new Amount({ s:'',Da:283})};
const Cn285 = { s:'[285]Cn', n: 'Copernicium285', u: false, m: new Amount({ s:'',Da:285})};
const Nh287 = { s:'[287]Nh', n: 'Nihonium287', u: false, m: new Amount({ s:'',Da:287})};
const Fl289 = { s:'[289]Fl', n: 'Flerovium289', u: false, m: new Amount({ s:'',Da:289})};
const Mc291 = { s:'[291]Mc', n: 'Moscovium291', u: false, m: new Amount({ s:'',Da:291})};
const Lv292 = { s:'[292]Lv', n: 'Livermorium292', u: false, m: new Amount({ s:'',Da:292})};
const Ts292 = { s:'[292]Ts', n: 'Tennessine292', u: false, m: new Amount({ s:'',Da:292})};
const Og293 = { s:'[293]Og', n: 'Oganesson293', u: false, m: new Amount({ s:'',Da:293})};


//organic molecules
const dihydrogen = { s:'H(2)', n: 'Dihydrogen', u: false, m: new Amount({ s:'',Da:2})};
const deuteratedDihydrogen = { s:'[2]H(2)', n: 'Deuterated Dihydrogen', u: false, m: new Amount({ s:'',Da:4})};
const dioxygen = { s:'O(2)', n: 'Dioxygen', u: false, m: new Amount({ s:'',Da:32})};

const ammonia = { s:'NH(3)', n: 'Ammonia', u: false, m: new Amount({ s:'',Da:17})};
const water =  { s:'H(2)O', n: 'Water', u: false, m: new Amount({ s:'',Da:18})};
const heavyWater =  { s:'[2]H(2)O', n: 'Heavy Water', u: false, m: new Amount({ s:'',Da:20})};
const tritiatedWater =  { s:'[3]H(2)O', n: 'Tritiated Water', u: false, m: new Amount({ s:'',Da:22})};
const hydronium =  { s:'H(3)O[+]', n: 'Hydronium', u: false, m: new Amount({ s:'',Da:19})};
const carbonMonoxide = { s:'CO', n: 'Carbon Monoxide', u: false, m: new Amount({ s:'',Da:28})};
const carbonDioxide = { s:'CO(2)', n: 'Carbon Dioxide', u: false, m: new Amount({ s:'',Da:44})};

const methane = { s:'CH(4)', n: 'Methane', u: false, m: new Amount({ s:'',Da:16})};
const ethane = { s:'C(2)H(6)', n: 'Ethane', u: false, m: new Amount({ s:'',Da:30})};
const propane = { s:'C(3)H(8)', n: 'Propane', u: false, m: new Amount({ s:'',Da:44})};
const butane = { s:'C(4)H(10)', n: 'Butane', u: false, m: new Amount({ s:'',Da:58})};

const methene = { s:'CH(2)', n: 'Methene', u: false, m: new Amount({ s:'',Da:14})};
const ethene = { s:'C(2)H(4)', n: 'Ethene', u: false, m: new Amount({ s:'',Da:28})};
const propene = { s:'C(3)H(6)', n: 'Propene', u: false, m: new Amount({ s:'',Da:42})};
const butene = { s:'C(4)H(8)', n: 'Butene', u: false, m: new Amount({ s:'',Da:56})};

const ethyne = { s:'C(2)H(2)', n: 'Ethyne', u: false, m: new Amount({ s:'',Da:26})};
const propyne = { s:'C(3)H(4)', n: 'Propyne', u: false, m: new Amount({ s:'',Da:40})};
const butyne = { s:'C(4)H(6)', n: 'Butyne', u: false, m: new Amount({ s:'',Da:54})};

const benzene = { s:'C(6)H(6)', n: 'Benzene', u: false, m: new Amount({ s:'',Da:42})};

const methanol = { s:'CH(3)OH', n: 'Methanol', u: false, m: new Amount({ s:'',Da:32})};
const ethanol = { s:'CH(3)CH(2)OH', n: 'Ethanol', u: false, m: new Amount({ s:'',Da:46})};

const toluene = { s:'C(6)H(5)CH(3)', n: 'Toluene', u: false, m: new Amount({ s:'',Da:92})};

const aceticAcid = { s:'C(2)H(4)O(2)', n: 'Acetic Acid', u: false, m: new Amount({ s:'',Da:60})};
const formicAcid = { s:'CH(2)O(2)', n: 'Formic Acid', u: false, m: new Amount({ s:'',Da:46})};
const benzoicAcid = { s:'C(7)H(6)O(2)', n: 'Benzoic Acid', u: false, m: new Amount({ s:'',Da:122})};

const acetamide = { s:'C(2)H(5)NO', n: 'Acetamide', u: false, m: new Amount({ s:'',Da:60})};
const benzamide = { s:'C(7)H(7)NO', n: 'Benzamide', u: false, m: new Amount({ s:'',Da:121})};

const methylamine = { s:'CH(5)N', n: 'Methylamine', u: false, m: new Amount({ s:'',Da:31})};
const dimethylamine = { s:'C(2)H(7)N', n: 'Dimethylamine', u: false, m: new Amount({ s:'',Da:45})};
const trimethylamine = { s:'C(3)H(9)N', n: 'Trimethylamine', u: false, m: new Amount({ s:'',Da:59})};

//inorganic molecules
const HCl =  { s:'HCl', n: 'Hydrochloric Acid', u: false, m: new Amount({ s:'',Da:36})};
const H2SO4 =  { s:'H(2)SO(4)', n: 'Sulfuric Acid', u: false, m: new Amount({ s:'',Da:98})};

const NaOH = { s:'NaOH', n: 'Sodium Hydroxide', u: false, m: new Amount({ s:'',Da:40})};
const KOH = { s:'KOH', n: 'Potassium Hydroxide', u: false, m: new Amount({ s:'',Da:56})};

const NaCl = { s:'NaCl', n: 'Sodium Chloride', u: false, m: new Amount({ s:'',Da:58})};
const KCl = { s:'KCl', n: 'Potassium Chloride', u: false, m: new Amount({ s:'',Da:74})};

const mildSteel = { s:'M.Steel', n: 'Mild Steel', u: false, m: new Amount({ s:'',Da:1000})};
const highSteel = { s:'H.Steel', n: 'High Steel', u: false, m: new Amount({ s:'',Da:1000})};
