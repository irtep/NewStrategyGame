function gameUnit(nombre, type, desc, meleeWeapons, rangedWeapons,
                       stats, size, army, unitSize, longDesc, limit, location) {
  this.nombre = nombre;
  this.type = type;
  this.desc = desc;
  this.meleeWeapons = meleeWeapons;
  this.rangedWeapons = rangedWeapons;
  this.stats = stats;
  this.size = size;
  this.army = army; 
  this.unitSize = unitSize;
  this.longDesc = longDesc;
  this.limit = limit;
  this.location = location;
}

function weapon(nombre, range, type, attacks, str, ap, wounds, barrage){
  this.nombre = nombre;
  this.range = range;
  this.type = type;
  this.attacks = attacks;
  this.str = str;
  this.ap = ap;
  this.wounds = wounds;
  this.barrage = barrage;
}

function building(nombre, width, height){
  this.nombre = nombre;
  this.width = width;
  this.height = height;
}

function forest(nombre, trees, radiuses, locations){
  this.nombre = nombre;
  this.trees = trees;
  this.radiuses = radiuses;
  this.locations = locations;
}

function city(nombre, income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits, defender){
  this.nombre = nombre;
  this.shortDesc = shortDesc;
  this.longDesc = longDesc;
  this.zones = zones;
  this.controlledBy = controlledBy;
  this.unitsByControlled = unitsByControlled;
  this.unitsByInvaded = unitsByInvaded;
  this.income = income;
  this.exits = exits;
  this.defender = defender;
}
