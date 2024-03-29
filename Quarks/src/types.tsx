export enum MassUnits {Da='Da',ng='ng',Kg='Kg',Eg='Eg',MO='M☉'}

export interface MassUnit {
	i: number,//index
	k: string,//key
	s: string,//symbol
	n: string,//name
	c: number,//convertion ratio (cm.c = 100 to convert to m); 
	//while(dist.a[cm] -= massUnit.cm.c > massUnit.cm.c){dist.a[m]++;}
}
export const MassUnitInfo = {
	Da:{s:'Da',n:'Dalton',c:602217364335000},
	ng:{s:'ng',n:'Nanogram',c:1000000000000},
	Kg:{s:'Kg',n:'Kilogram',c:1000000000000000},
	Eg:{s:'Eg',n:'Exagram',c:1378679941220000},
	MO:{s:'M☉',n:'Solar Mass',c:Infinity}
}

export interface ItemGroup {
	n: string,//name
	u: boolean,//unlocked
	info: string,//some real world/game info
	c: Item[]//child items
}

export interface Item {
	n: string,//name
	u: boolean,//unlocked
	g: number,//base generator cost
	info: string,//some real world/game info
	c: Flavor[]//children; isotopes etc...
}

export interface Flavor {
	n: string,//name
	m: number,//mass
	u: MassUnits,//MassUnits
	c: FlavorAmount[]//Components needed to create
}

export interface FlavorAmount {
	f: Flavor,
	a: number,//amount
}

export interface ComponentInventory{
	c: FlavorAmount,//components
	i: FlavorAmount,//inventory
}

export interface Generator extends FlavorAmount {
	e: boolean,//enabled
	ci: ComponentInventory[]//track the stuff needed
}

export interface RecipeSearchResults {
	g: ItemGroup,
	i: Item,
	f: Flavor
}

export const FlavorMap: {[key: string]: Item} = {};//Flavor Name -> Item
export const ItemMap: {[key: string]: ItemGroup} = {};//Item Name => Item Group
export const ComponentMap: {[key: string]: Flavor[]} = {};//Component Flavor Name -> Flavor[]

export interface Settings {
	i: boolean,//show info
	s: boolean,//auto recipe search
	h: boolean,//hide recipe search area
	c: number//cheater level [0-4];
	//don't check/subtract amount if flavor MassUnit <= cheater level
}
export const defaultSettings : Settings = {
	i: true,
	s: false,
	h: false,
	c: -1
}

export const defaultItemGroup: ItemGroup ={
	n: 'defaultGroup',
	u: false,
	info: 'default group',
	c: []
}

export const defaultItem : Item = {
	n: 'defaultItem',
	u: false,
	g: -1,
	info: 'default item',
	c: []
}

export const defaultFlavor : Flavor = {
	n: 'default flavor',
	m: -1,
	u: MassUnits.Da,
	c: []
}

export const defaultFlavorAmount : FlavorAmount = {
	f: defaultFlavor,
	a: -1
}