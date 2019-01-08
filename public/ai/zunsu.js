// canvas 900 / 650
// zone 11 x: 0-299 y: 0-215 zone 12:   x: 300-599   y: 0-215 zone 13:     x:600-900     y: 0-215 
// zone 21 x: 0-299 y: 216-431 zone 22: x: 300-599 y: 216-431 zone 23: x:600-900 y: 216-431 
// zone 31 x: 0-299 y: 432-650 zone 32: x: 300-599 y: 432-650 zone 33: x:600-900 y: 432-650

// battle history:
const history = [];

// - commands:

// hunt weakest

// hunt toughest

// hunt rangedUnit

// hunt meleeUnit

// hunt commander

// assault unit

// run away

// shoot back

// shoot while but avoid melee

// move to sector

// General ZunSu himself!
function zunSu(actions){
  if (actions === 'orders'){
    // save field to history to compare if something has moved
    const round = {army1: [], army2: []};
    // Army 1
    for (let i = 0; i < gameObject.army1.length; i++){
      const newLoc = Object.assign({}, gameObject.army1[i].location);
      round.army1.push(newLoc);
    }
    // Army 2
    for (let i = 0; i < gameObject.army2.length; i++){
      const rangedWeapon = searchStatsOfWeapon(gameObject.army2[i].details.rangedWeapons[0], 'ranged');
      const newLoc = Object.assign({}, gameObject.army2[i].location);
      const unitInAction = gameObject.army2[i];
      const enemyArmy = gameObject.army1;
      let closestEnemy = {number: null, distance: 5000, where: null};

      round.army2.push(newLoc);

      // check closest opponent
      for (let ii = 0; ii < enemyArmy.length; ii++) {
        const distance = distanceCheck(unitInAction.location, enemyArmy[ii].location);

        if (distance < closestEnemy.distance) {
          closestEnemy.number = ii;
          closestEnemy.distance = distance;
          closestEnemy.where = findDirection(unitInAction.location, enemyArmy[ii].location);
        }  
      }
      
      // -SET ORDERS-:
      if (unitInAction.order !== 'melee'){ // if not in melee
        // -if ranged unit-
        if (unitInAction.details.stats.bs <= 3) {

          // if target unit in range
          if (closestEnemy.distance <= rangedWeapon.range){
            const thirdOfRange = rangedWeapon.range / 3;
            // if faraway
            if (closestEnemy.distance > thirdOfRange) {
              unitInAction.order = 'shoot';
              unitInAction.target = enemyArmy[closestEnemy.number];
              // check los:
              const losCheck = lineOfSight(unitInAction.location, enemyArmy[closestEnemy.number].location);
              if (losCheck === 'losBlocked'){
                unitInAction.order = 'move';
                unitInAction.target = closestEnemy.where;
              }
            } else {  // if closer
              let escapeDir;

              switch (closestEnemy.where){
                case 'n': escapeDir = 's'; break;
                case 'ne': escapeDir = 'sw'; break;
                case 'e': escapeDir = 'w'; break;
                case 'se': escapeDir = 'nw'; break;
                case 's': escapeDir = 'n'; break;
                case 'sw': escapeDir = 'ne'; break;
                case 'w': escapeDir = 'e'; break;
                case 'nw': escapeDir = 'se'; break;
                default: console.log('not found where....');
              }

              unitInAction.order = 'move';
              unitInAction.target = escapeDir;
            }
          } else { // not in range
            unitInAction.order = 'move';
            unitInAction.target = closestEnemy.where;
          }
        } // ranged unit ends

        // if monster
        if (unitInAction.details.type === 'monster') {
          // if outside of ranged:
          if (closestEnemy.distance > rangedWeapon.range) {
            unitInAction.order = 'run';
            unitInAction.target = closestEnemy.where;
          }
          if (closestEnemy.distance <= rangedWeapon.range) {
            unitInAction.order = 'move';
            unitInAction.target = closestEnemy.where;
          }
          // something too that he doesnt charge solo...
        } // monster ends

        // if melee guys
        if (unitInAction.details.rangedWeapons[0] === 'no weapon') {
          unitInAction.order = 'run';
          unitInAction.target = closestEnemy.where;
        } // melee guy ends.
        
        // if commander, chill out a bit first
        if (unitInAction.details.type === 'commander'){
          if (history.length < 4) {
            unitInAction.order = 'standby';
          }
        }
      } // if not in melee ends
      // check if building or something is blocking the way:
      if (unitInAction.order === 'move' || unitInAction.order === 'run') {
        const directions = ['n','ne','e','se','s','sw','w', 'nw'];
        const substitutions = [['w','sw', 'nw', 'e'],['n','e','w'],['e','ne'],['s','e', 'n'],['se','e'],['s','w','e'],['sw','s'],['n','e', 'w']];
        let whereTo = Object.assign({}, unitInAction.location);
        let destinationNow;
        let finalDestination = unitInAction.target;
        let forCheckDir = unitInAction.target;
        let destChanged = false;
        
        switch (forCheckDir) {
          case 'n': whereTo.x = whereTo.x; whereTo.y = whereTo.y -15; break;
          case 'ne': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y - 15; break; 
          case 'e': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y; break; 
          case 'se': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y + 15; break; 
          case 's': whereTo.x = whereTo.x; whereTo.y = whereTo.y + 15; break; 
          case 'sw': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y + 15; break; 
          case 'w': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y; break; 
          case 'nw': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y - 15; break;   
        }
        
        const checkDir = moveUnit(unitInAction, unitInAction.target);
        // change this above to collision test
        /*
        moveUnit(unitInAction, whereTo);
        */

        if (checkDir === 'collision' || unitInAction.notMovedInCombat === true) {
          for (let xx = 0; xx < directions.length; xx++) {
            if (directions[xx] === unitInAction.target) {
              destinationNow = xx;
            }
          } // for 1 ends
          for (let yy = 0; yy < substitutions[destinationNow].length; yy++) {
            whereTo = Object.assign({}, unitInAction.location); // reset this
            forCheckDir = substitutions[destinationNow][yy];
            switch (forCheckDir) {
              case 'n': whereTo.x = whereTo.x; whereTo.y = whereTo.y -15; break;
               case 'ne': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y - 15; break; 
               case 'e': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y; break; 
               case 'se': whereTo.x = whereTo.x + 15; whereTo.y = whereTo.y + 15; break; 
               case 's': whereTo.x = whereTo.x; whereTo.y = whereTo.y + 15; break; 
               case 'sw': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y + 15; break; 
               case 'w': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y; break; 
               case 'nw': whereTo.x = whereTo.x - 15; whereTo.y = whereTo.y - 15; break;   
            }
            const alternativeDirCheck = moveUnit(unitInAction, forCheckDir);
            if (alternativeDirCheck !== 'collision' && destChanged === false) {
              finalDestination = substitutions[destinationNow][yy];
              destChanged = true;
              console.log('found alternative: ', finalDestination);
            }
          }
          unitInAction.target = finalDestination;
          console.log('unit target changed to: ', unitInAction.target);
        } // if blocked ends
      } // check if blocked
    } // army2 loop ends  
    history.push(round);
    if (history.length > 40) {
      history.splice(0, 1);
    }
    console.log('history: ', history);
    // analyze situation
    // commands: losCheck(fromWhere, toWhere) , distanceCheck(fromWhere, toWhere), findDirection(dirFrom, dirTo, distance)

    // analyze experience

    // choose commands
  } // actions ends    
  if (actions === 'checks'){
    console.log('ZunSu checks');
  }
}
