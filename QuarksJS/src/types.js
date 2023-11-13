"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFlavorAmount = exports.defaultFlavor = exports.defaultItem = exports.defaultItemGroup = exports.defaultSettings = exports.ComponentMap = exports.ItemMap = exports.FlavorMap = exports.MassUnitInfo = exports.MassUnits = void 0;
var MassUnits;
(function (MassUnits) {
    MassUnits["Da"] = "Da";
    MassUnits["ng"] = "ng";
    MassUnits["Kg"] = "Kg";
    MassUnits["Eg"] = "Eg";
    MassUnits["MO"] = "M\u2609";
})(MassUnits || (exports.MassUnits = MassUnits = {}));
exports.MassUnitInfo = {
    Da: { s: 'Da', n: 'Dalton', c: 602217364335000 },
    ng: { s: 'ng', n: 'Nanogram', c: 1000000000000 },
    Kg: { s: 'Kg', n: 'Kilogram', c: 1000000000000000 },
    Eg: { s: 'Eg', n: 'Exagram', c: 1378679941220000 },
    MO: { s: 'M☉', n: 'Solar Mass', c: Infinity }
};
exports.FlavorMap = {}; //Flavor Name -> Item
exports.ItemMap = {}; //Item Name => Item Group
exports.ComponentMap = {}; //Component Flavor Name -> Flavor[]
exports.defaultSettings = {
    i: true,
    s: false,
    h: false,
    c: -1
};
exports.defaultItemGroup = {
    n: 'defaultGroup',
    u: false,
    info: 'default group',
    c: []
};
exports.defaultItem = {
    n: 'defaultItem',
    u: false,
    g: -1,
    info: 'default item',
    c: []
};
exports.defaultFlavor = {
    n: 'default flavor',
    m: -1,
    u: MassUnits.Da,
    c: []
};
exports.defaultFlavorAmount = {
    f: exports.defaultFlavor,
    a: -1
};
