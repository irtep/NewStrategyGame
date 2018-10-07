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