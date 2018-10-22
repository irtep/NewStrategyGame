// search attribute with unit/weapon name:
function searchUnitByName(nombre, object){
  for (let i = 0; i < object.length; i++) {
    let match;
    
    if (nombre === object[i].nombre){
      match = object[i];
      return match;
    }
  }
}

function searchUnitByLocation(location, object){
  for (let i = 0; i < object.length; i++) {
    let match;
    
    if (location.x === object[i].location.x && location.y === object[i].location.y){
      match = object[i];
      return match;
    }
  }
}

// search weapons stats // name ranged or melee
function searchStatsOfWeapon(nameOfWeapon, weaponType){
  let object;
  switch (weaponType) {
    case 'ranged':
      object = rangedWeapons;
    break;
    case 'melee':
      object = meleeWeapons;
    break;
    default: console.log('weapon type not found');  
  }
  for (let i = 0; object.length; i++){
    if (nameOfWeapon === object[i].nombre){
      return object[i];
    }
  }
}