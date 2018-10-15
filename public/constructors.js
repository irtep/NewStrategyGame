function gameUnit(nombre, type, desc, meleeWeapons, rangedWeapons,
                       stats, size, army) {
  this.nombre = nombre;
  this.location = location;
  this.type = type;
  this.desc = desc;
  this.meleeWeapons = meleeWeapons;
  this.rangedWeapons = rangedWeapons;
  this.stats = stats;
  this.size = size;
  this.army = army; 
  
  this.highlight = () => {
    this.highlighted = true;
  }
  this.unHighlight = () => {
    this.highlighted = false;
  }
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