// ORDERS:
const orders = [
  'standby',
  'move',   // moveUnit(who, to)
  'shoot',  // shootTarget(who, to)
  'run',     // meleeAttack(who, to)
  'hunt',   // keep ranged distance and shoot
  'engage'  // run for melee range
];
const logScreen = document.getElementById('logi'); // views/combat.html
const bDetails = document.getElementById('battleDetails'); // views/combat.html
let historyForLog; // to check that no duplicated msg are sent

function hunt(who, to) {
  let opponent = gameObject.army2;
  const losCheck = lineOfSight(who.location, to.location);
  const rWeapon = searchStatsOfWeapon(who.details.rangedWeapons[0], 'ranged');
  const distance = distanceCheck(who.location, to.location);
  const dire = findDirection(who.location, to.location);
  const thirdOfRange = rWeapon.range / 3;      
  let flankDir;
  let escapeDir;

    switch (dire){
      case 'n': flankDir = 'e'; escapeDir = 's'; break;
      case 'ne': flankDir = 'nw'; escapeDir = 'sw'; break;
      case 'e': flankDir = 'n'; escapeDir = 'w'; break;
      case 'se': flankDir = 'sw'; escapeDir = 'nw'; break;
      case 's': flankDir = 'w'; escapeDir = 'n'; break;
      case 'sw': flankDir = 'se'; escapeDir = 'ne'; break;
      case 'w': flankDir = 'n'; escapeDir = 'e'; break;
      case 'nw': flankDir = 'ne'; escapeDir = 'se'; break;
      default: console.log('not found where, flank / escape Dir....');
    }
  
  let returnPack = {what: null, flank: flankDir, escape: escapeDir, direx: dire}; 

  if (who.commander === 'army2') {

    opponent = gameObject.army1;  
  }
  
  // if target unit in range
  if (distance <= rWeapon.range){

    // if faraway
    if (distance > thirdOfRange) {    
        
      if (losCheck === 'losBlocked'){
        
        returnPack.what = 'move to flank';
        return returnPack;
      } else {
        
        returnPack.what = 'shoot';
        return returnPack;
      }
    } else {  // if closer

      returnPack.what = 'escape and shoot';
      return returnPack;
    }
  } else { // not in range

    returnPack.what = 'closer';
    return returnPack;
  } 
}

function engage(who, to) {
  const losCheck = lineOfSight(who.location, to.location);
  const dire = findDirection(who.location, to.location);
  let flankDir;
  let escapeDir;

    switch (dire){
      case 'n': flankDir = 'nw'; escapeDir = 's'; break;
      case 'ne': flankDir = 'n'; escapeDir = 'sw'; break;
      case 'e': flankDir = 'se'; escapeDir = 'w'; break;
      case 'se': flankDir = 's'; escapeDir = 'nw'; break;
      case 's': flankDir = 'sw'; escapeDir = 'n'; break;
      case 's': flankDir = 'se'; escapeDir = 'ne'; break;
      case 'w': flankDir = 'nw'; escapeDir = 'e'; break;
      case 'nw': flankDir = 'n'; escapeDir = 'se'; break;
      default: console.log('not found where, flank / escape Dir....');
    }
  
  let returnPack = {what: null, flank: flankDir, escape: escapeDir, direx: dire}; 

  if (who.commander === 'army2') {

    opponent = gameObject.army1;  
  }  
  
  if (losCheck === 'losBlocked') {
    
    returnPack.what = 'noLos';
    return returnPack;
  } else {
    
    returnPack.what = 'losOk';
    return returnPack;
  }
  
}

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
  const oldLoc = Object.assign({}, who.location);
  who.lastLocation = oldLoc; // save last place
  
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
    let collisionResult = collisionDetect(newLocation, size, targetLoc, targetSize); // at public/unitActions.js
    
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
        who.order = 'melee';
        
        if (whoDubli === false) {   
          who.engaged.withWho.push(allUnits[ix]);
        }
      
        allUnits[ix].engaged.yes = true;
        
        if (whoDubli === false) {
          allUnits[ix].engaged.withWho.push(who);
          allUnits[ix].order = 'melee';
        }
        const forLog = '<br>' + allUnits[ix].unit +' and '+ who.unit + ' in melee combat!'
        
        if (historyForLog !== forLog) {
          logScreen.innerHTML = logScreen.innerHTML + forLog;
          historyForLog = forLog;
        } 
      }
      collision = true;
    }
  }
  
  // detect collision with terrain (buildings, true if collision):
  for (let iix = 0; iix < gameObject.terrain.terrain.length; iix++) {
    if (gameObject.terrain.terrain[iix].type === 'building'){
      const circle = {x: newLocation.x, y: newLocation.y, r: size};
      const rect = {x: gameObject.terrain.terrain[iix].location.x, y: gameObject.terrain.terrain[iix].location.y, 
                    w: gameObject.terrain.terrain[iix].size.width, h: gameObject.terrain.terrain[iix].size.height};
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
          collision = true;
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
  const losAndR = lineOfSight(who.location, to.location);
  
  if (who.order === 'move') {
    
    modAttack++; // harder to hit while moving.
  }
  
  if (losAndR === 'losBlocked'){// no los
  }
  if (losAndR === 'los ok') {
    for (let i = 0; i < who.details.rangedWeapons.length; i++){
      who.firing = true;
      draw();
      executeAttack('ranged', who, to, modAttack, i); // public/engineUtils.js
    }  
  }
}

// melee attack
function meleeAttack(who, to){
  for (let i = 0; i < who.details.meleeWeapons.length; i++){
    const meleeWeapon = searchStatsOfWeapon(who.details.meleeWeapons[i], 'melee');
    const totalAttacks = (who.details.stats.a + meleeWeapon.attacks) * who.quantity;
    let attackSummary = {attacker: who.unit, target: to.unit, weapon: meleeWeapon.nombre, attacks: totalAttacks, hits: 0, wounds: 0, saved: 0};
    let writeToLog = true; // will be written to log
    
    if (to.quantity < 1){
      // no need to write a log if opponent is already dead.
      writeToLog = false;    
    }
    
    for (let ii = 0; ii < totalAttacks; ii++){
      const attackDice = callDice(6);
      const attackValue = attackDice + who.details.stats.ws;
      const defenceValue = callDice(6) + who.details.stats.ws;
      
      if (attackValue >= defenceValue || attackDice === 6){ // attack hits
        // hit
        const woundDice = callDice(6);
        const saveDice = callDice(6);
        const difference = (meleeWeapon.str + who.details.stats.s ) - to.details.stats.t;
        attackSummary.hits++;
        
        // armour save throw:
        if (saveDice - meleeWeapon.ap >= to.details.stats.sv){
            attackSummary.saved++;
        } else { // armour pierced
        
          if (difference + woundDice >= 4 || woundDice === 6){
            // toughness passed 
            let wounds;
            
            if (meleeWeapon.wounds === 'd6'){
              wounds = callDice(6);
            }
              else if (meleeWeapon.wounds === 'd3'){
                wounds = callDice(3);
              }
              else {
                wounds = meleeWeapon.wounds;
              }
              attackSummary.wounds = attackSummary.wounds + wounds;
                
              if (wounds < to.details.stats.w) {                  
                let woundStatus;
                to.details.stats.w = to.details.stats.w - wounds;
                if (to.details.stats.w < 2) {
                  woundStatus = 'in very bad shape.';
                } else if (to.details.stats.w > 1 && to.details.stats.w < 5) {
                  woundStatus = 'in battered condition';           
                } else if (to.details.stats.w > 4) {
                  woundStatus = 'just slightly damaged.'           
                }
                const forLog = '<br>' + who.unit +' attacks '+ to.unit + ' with ' + meleeWeapon.nombre + ' causing ' + attackSummary.wounds+
                ' wounds <br>' + to.unit + ' is '+ woundStatus + '.';
                logScreen.innerHTML = logScreen.innerHTML + forLog;
                } else { // kills
                const forLog = '<br>' + who.unit +' attacks '+ to.unit + ' with ' + meleeWeapon.nombre + ' causing ' + attackSummary.wounds+
                ' wounds.';
                // logScreen update maybe not necessary...
                //logScreen.innerHTML = logScreen.innerHTML + forLog;
                lethalWound(to, who, true); // true for melee attack
              }
            } // wound ends
        } // armour pierced ends
      } // attacks with weapon ends
    } 
    const longLog = 'Attacker: '+ attackSummary.attacker + '. weapon: '+ attackSummary.weapon+ '. attacks: '+ attackSummary.attacks+
      '. hits: '+ attackSummary.hits+ '. saved by armour: '+ attackSummary.saved+ '. serious wounds: '+ attackSummary.wounds+ ' at: '+ to.unit;
    
    if (attackSummary.attacks === 0) {
      // not logging empty attacks from unit that just died.
      writeToLog = false;
    }
    //console.log('melee attack summary; ', attackSummary);
    if (writeToLog === true){
      
      bDetails.innerHTML = bDetails.innerHTML + '<br>' + longLog;
    }
  } // attack with weapons end
} // melee attack ends

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