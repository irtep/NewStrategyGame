// ORDERS:
const orders = [
  'standby',
  'move',   // moveUnit(who, to)
  'shoot',  // shootTarget(who, to)
  'assault',
  'run'
];

function moveUnit(who, to, mode){
  const cWidth = 950;
  const cHeight = 600;
  const forCheckUnits1 = gameObject.army1.concat([]);
  const forCheckUnits2 = gameObject.army2.concat([]);
  const allUnits = forCheckUnits1.concat(forCheckUnits2);
  let allies = []; 
  let enemies = [];
  let oldLocation = who.location;
  var newLocation = JSON.parse(JSON.stringify(oldLocation));
  let collision = false;
  let wallOnWay = false;
  const size = who.details.size * who.quantity;
  const adjustedSize = Math.round(size * 0.75);
  
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
    let collisionResult = collisionDetect(newLocation, size, targetLoc, targetSize);
    
    if (collisionResult === 'collision'){
      if (who.commander !== allUnits[ix].commander){
        let whoDubli = false;
        let allUnitDubli = false;
        
        // check that opponent is not already at engaged list
        if (who.engaged.yes === true) {
          for (let i = 0; i < who.engaged.withWho.length; i++) {
            if (allUnits[ix] === who.engaged.withWho[i]) {whoDubli = true;}
          }    
        }
        
        if (allUnits[ix].engaged.yes === true) {
          for (let i = 0; i < allUnits[ix].engaged.withWho.length; i++) {
            if (who === allUnits[ix].engaged.withWho[i]) {allUnitDubli = true;}    
          }
        }
        
        who.engaged.yes = true;
        console.log('added to engaged: ', who);
        
        if (whoDubli === false) {   
          who.engaged.withWho.push(allUnits[ix]);
        }
      
        allUnits[ix].engaged.yes = true;
        console.log('added unit to combat: ', allUnits[ix]);
        
        if (whoDubli === false) {
          allUnits[ix].engaged.withWho.push(who);
        }  
        console.log('added close combat: ', gameObject);
      }
      collision = true;
    }
  }
  
  // detect collision with terrain (buildings, true if collision):
  for (let iix = 0; iix < gameObject.terrain.length; iix++) {
    if (gameObject.terrain[iix].type === 'building'){
      const circle = {x: newLocation.x, y: newLocation.y, r: size};
      const rect = {x: gameObject.terrain[iix].location.x, y: gameObject.terrain[iix].location.y, 
                    w: gameObject.terrain[iix].size.width, h: gameObject.terrain[iix].size.height};
      const testResult = RectCircleColliding(circle,rect); // returns true if collision
      if (testResult === true){
        collision = true;
      }  
    }
  }
  // detect wall collision:
  switch (to){
      case 'n': 
        if (newLocation.y === -1 + (size)) { // n
          collision = true;
        }
      break;
      case 'ne':  
        if (newLocation.y === -1 + (size)) {  // n
          collision = true;
        }  
        if (newLocation.x === cWidth - (size)) {  // e
          collision = true;
        }
      break; 
      case 'e':  
        if (newLocation.x === cWidth - (size)) {  // e
          collision = true;
        }
      break; 
      case 'se':   
        if (newLocation.y === cHeight - (size)) { // s
          collision = true;
        }
        if (newLocation.x === cWidth - (size)) {  // e
          collision = true;
        }
      break; 
      case 's': 
        if (newLocation.y === cHeight - (size)) { // s
          collision = true;
        }
      break; 
      case 'sw': 
        if (newLocation.y === cHeight - (size)) { // s
          collision = true;
        } 
        if (newLocation.x === -1 + (size)) { // w
          collision = true;
        }
      break; 
      case 'w': 
        if (newLocation.x === -1 + (size)) { // w
          collision = true;
        }
      break; 
      case 'nw': 
        if (newLocation.y === -1 + (size)) { // n
          collision = true;
        } 
        if (newLocation.x === -1 + (size)) { // w
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

// shoot target
function shootTarget(who, to){
  let modAttack = 0;
 // const weaponsStats =  searchStatsOfWeapon(who.details.rangedWeapons[attackNumber], 'ranged');
  const losAndR = losCheck(who.location, to.location);
  
  if (who.order === 'move') {
    console.log('shooting while moving');
  }
  
  console.log('los check: ', losAndR);
  if (losAndR === 'losBlocked'){console.log('no los');}
  if (losAndR === 'los ok') {
    for (let i = 0; i < who.details.rangedWeapons.length; i++){
      who.firing = true;
      setTimeout(() => {
        who.firing = false;  
      }, 900);
      executeAttack('ranged', who, to, modAttack, i);
    }  
  }
}

// standby (do not move, but shoot closest enemy in LOS and in range)
  // check range of weapon(s), then if any enemies around
    // shoot closest

// hunt to shoot (start to move towards target in order to get in range an in LOS. stop moving when in range)
  // check where is target and if in range.
    // if in range shoot. if not in range move towards

// hunt to assault (start to move towards target in order to engage in melee)

// move to direction (move to w,nw,n,ne,e,se,s,sw. shoot targets while moving)

// embark to transport or building (embark to transport that is near)

// disembark troops (disembard troops from transport or from building)

// join squad (characters only. join squad that is near)

// run (double movement, but no shooting)