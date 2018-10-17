// ORDERS:
const orders = [
  'standby',
  'move',
  'shoot',
  'assault',
  'run'
];

function moveUnit(who, to){
  const cWidth = 950;
  const cHeight = 600;
  const forCheckUnits1 = gameObject.army1.concat([]);
  const forCheckUnits2 = gameObject.army2.concat([]);
  const allUnits = forCheckUnits1.concat(forCheckUnits2);
  let allies = []; 
  let enemies = [];
  let oldLocation = who.location;
  //let newLocation = oldLocation.concat([]);
  var newLocation = JSON.parse(JSON.stringify(oldLocation));
  let collision = false;
  let wallOnWay = false;
  const size = who.details.size * who.quantity;
  
  // delete active unit from forCheckUnits1 or 2.
  for (let ii = 0; ii < allUnits.length; ii++) {
    if (who.location.x === allUnits[ii].location.x && who.location.y === allUnits[ii].location.y) {
      allUnits.splice(ii, 1);
    }
  }
  
  switch (to){
    case 'n': newLocation.x = newLocation.x; newLocation.y = newLocation.y -1; break;
    case 'ne': newLocation.x = newLocation.x + 1; newLocation.y = newLocation.y - 1; break; 
    case 'e': newLocation.x = newLocation.x + 1; newLocation.y = newLocation.y; break; 
    case 'se': newLocation.x = newLocation.x + 1; newLocation.y = newLocation.y + 1; break; 
    case 's': newLocation.x = newLocation.x; newLocation.y = newLocation.y + 1; break; 
    case 'sw': newLocation.x = newLocation.x - 1; newLocation.y = newLocation.y + 1; break; 
    case 'w': newLocation.x = newLocation.x - 1; newLocation.y = newLocation.y; break; 
    case 'nw': newLocation.x = newLocation.x - 1; newLocation.y = newLocation.y - 1; break; 
    default: console.log('to not found! at move unit');
  }
  
  // detect for collisions with units:
  for (let ix = 0; ix < allUnits.length; ix++){
    const targetLoc = allUnits[ix].location;
    const targetSize = allUnits[ix].details.size * allUnits[ix].quantity;
    let collisionResult = collisionDetect(oldLocation, size, targetLoc, targetSize);
    
    if (collisionResult === 'collision'){
      console.log('collision: ', allUnits[ix]);
      collision = true;
    }
  }
  
  // detect collision with terrain (not added terrains yet)
  
  // detect wall collision:
  switch (to){
      case 'n': 
        if (newLocation.y === -1 + (size / 2)) { // n
          collision = true;
        }
      break;
      case 'ne':  
        if (newLocation.y === -1 + (size / 2)) {  // n
          collision = true;
        }  
        if (newLocation.x === cWidth - (size / 2)) {  // e
          collision = true;
        }
      break; 
      case 'e':  
        if (newLocation.x === cWidth - (size / 2)) {  // e
          collision = true;
        }
      break; 
      case 'se':   
        if (newLocation.y === cHeight - (size / 2)) { // s
          collision = true;
        }
        if (newLocation.x === cWidth - (size / 2)) {  // e
          collision = true;
        }
      break; 
      case 's': 
        if (newLocation.y === cHeight - (size / 2)) { // s
          collision = true;
        }
      break; 
      case 'sw': 
        if (newLocation.y === cHeight - (size / 2)) { // s
          collision = true;
        } 
        if (newLocation.x === -1 + (size / 2)) { // w
          collision = true;
        }
      break; 
      case 'w': 
        if (newLocation.x === -1 + (size / 2)) { // w
          collision = true;
        }
      break; 
      case 'nw': 
        if (newLocation.y === -1 + (size / 2)) { // n
          collision = true;
        } 
        if (newLocation.x === -1 + (size / 2)) { // w
          wallOnWay = true;
        }
      break;
      console.log('to not found in detect wall collision');
  }

  
  if (collision === true){
    return 'collision';
  }
  
    if (collision === false){
    return newLocation;    
  }
  
} // moveUnit terminates

// standby (do not move, but shoot closest enemy in LOS and in range)
  // check range of weapon(s), then if any enemies around
    // shoot closest

// hunt to shoot (start to move towards target in order to get in range an in LOS. stop moving when in range)
  // check where is target and if in range.
    // if in range shoot. if not in range move towards

// hunt to assault (start to move towards target in order to engage in melee)

// move to direction (move to w,nw,n,ne,e,se,s,sw. shoot targets while moving)

// shoot target, but keep position. (shoot target, but dont chase if target out of los/range)

// embark to transport or building (embark to transport that is near)

// disembark troops (disembard troops from transport or from building)

// join squad (characters only. join squad that is near)

// run (double movement, but no shooting)