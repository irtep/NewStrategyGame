// commands for Campaign map AI place:

// function that checks what city is controlled by this faction
function cityChecker(whatArmyIsThis){
  
  const myCities = [];
  
  // check what cities this army controls and push them to myCities
  for (let i = 0; i < gameObject.campaignArmies.cities.length; i++) {
      
    if (gameObject.campaignArmies.cities[i].controlledBy === whatArmyIsThis) {
      myCities.push(gameObject.campaignArmies.cities[i].nombre);    
    }
  }
  
  return myCities;
}

// buys random stuff for faction, to random city.
function randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent){
  let pointsInBank = pointsToSpent;  
  
  for (let i2 = 0; i2 < targetArmy.length; i2++ ) {
      const totalPointCost = targetArmy[i2].stats.pointCost * targetArmy[i2].unitSize;
      
      if (pointsInBank >= totalPointCost) {
        const randomDice = callDice(myCities.length) - 1; // -1 to allow zero 
        addUnit(whatArmyIsThis, targetArmy[i2].nombre, targetArmy[i2].unitSize, myCities[randomDice]);
        pointsInBank = pointsInBank - totalPointCost;
        
        // to make sure, that this will not stop if there are still points to spend
        let nextI2 = i2 +1;
        if (nextI2 === targetArmy.length) {
          i2 = 0; // reset to check all units again.  
        }
      }
    }
}

// considers and makes moves for ai-factions:
function makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces) {
  let aggroMeter;
  
  switch (currentModeDice) {
    case 1: aggroMeter = 2; break; // aggressive mode
    case 2: aggroMeter = 3; break;  // medium mode
    case 3: aggroMeter = 5; break; // defensive mode
    default: console.log('modedice not found: ', currentModeDice, whatArmyIsThis);  
  }
    
  // check how many own guys are in each cities
  for (let i = 0; i < armyInAction.army.length; i++) {

    // check city..and add +1 to city
    for (let i2 = 0; i2 < forcesInCities.length; i2++) {
        
      if (armyInAction.army[i].location === forcesInCities[i2].nombre) {
        // +1 to forces:
        forcesInCities[i2].forces++;
        // to power rating the point cost:
        const totalPointCost = armyInAction.army[i].details.stats.pointCost * armyInAction.army[i].quantity;
        forcesInCities[i2].power = forcesInCities[i2].power + totalPointCost;
      }
    }
  }
  // check how many enemy guys are in each cities
  for (let ix = 0; ix < factions.length; ix++) {
    let armyToCheck = factions[ix];  
      
    for (let i = 0; i < armyToCheck.army.length; i++) {
      
      // check city..and add +1 to city
      for (let i2 = 0; i2 < enemyForces.length; i2++) {
        
        if (armyToCheck.army[i].location === enemyForces[i2].nombre) {
          // +1 to forces:
          enemyForces[i2].forces++;
          // to power rating the point cost:
          const totalPointCost = armyToCheck.army[i].details.stats.pointCost * armyToCheck.army[i].quantity;
          enemyForces[i2].power = enemyForces[i2].power + totalPointCost;
        }
      }
    }        
  }
        
  // check all guys in army
  for (let xix = 0; xix < armyInAction.army.length; xix++) {
    // in what city is this guy
    for (let xix2 = 0; xix2 < forcesInCities.length; xix2++) {
           
      // check if enemies in that neighbouring city:
      for (let xix4 = 0; xix4 < enemyForces.length; xix4++) {
              
           // found city
        if (armyInAction.army[xix].location == forcesInCities[xix2].nombre &&
          forcesInCities[xix2].forces > 1) { // more than 1 in same city.
                  
          // check what are neighbour cities of this:
          for (let xix3 = 0; xix3 < gameObject.campaignArmies.cities.length; xix3++) {
                  
            if (gameObject.campaignArmies.cities[xix3].nombre == armyInAction.army[xix].location) {
                    
              // check neighbours to find enemy or neutral:
              for (let xix5 = 0; xix5 < gameObject.campaignArmies.cities[xix3].exits.length; xix5++) {
                      
                if (gameObject.campaignArmies.cities[xix3].exits[xix5] == enemyForces[xix4].nombre) {
                        
                    // No enemies in found city:
                  if (enemyForces[xix4].forces < 1) {
                    let someoneDetected = false;
                    const anyoneThere = armyInAction.army.filter( (loc) => {
                        loc.location == enemyForces[xix4].nombre;
                      });
                          
                    if (typeof anyoneThere !== "undefined") {
                      const attackDecider = callDice(6);
                        
                      if (attackDecider >= aggroMeter) {
                        // lets go! 
                        armyInAction.army[xix].location = enemyForces[xix4].nombre;
                              
                        // update forcesInCities
                        forcesInCities[xix2].forces--;
                      }
                    }
                  }
                        
                  // Enemy city:
                  if (enemyForces[xix4].forces > 0) {
                    // lets go! 
                    armyInAction.army[xix].location = enemyForces[xix4].nombre;
                              
                    // update forcesInCities
                    forcesInCities[xix2].forces--;  
                  }
                }
              }
            }
          }
        }            
      }
    } 
  }  
}

function computerPurchases(){
// HUMANS
  if (gameObject.campaignArmies.humans.player === false){
    const armyInCase = gameObject.campaignArmies.humans.army;
    let upkeepATM = countFactionUpkeep(armyInCase);
    let totalPoints = gameObject.campaignArmies.humans.points;
    let pointsToSpent = totalPoints - upkeepATM;
    let myCities;
    const whatArmyIsThis = 'humans';
    const targetArmy = humans;
    let affordables = [];
    
    // check what cities this army controls and push them to myCities
    myCities = cityChecker(whatArmyIsThis);
    
    // buys random stuff: 
    randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent);
    
    console.log('humans, used points: ', countFactionUpkeep(armyInCase));
  }  
  // ELVES
  if (gameObject.campaignArmies.elves.player === false){
    const armyInCase = gameObject.campaignArmies.elves.army;
    let upkeepATM = countFactionUpkeep(armyInCase);
    let totalPoints = gameObject.campaignArmies.elves.points;
    let pointsToSpent = totalPoints - upkeepATM;
    let myCities = [];
    const whatArmyIsThis = 'elves';
    const targetArmy = elves;
    let affordables = [];
    
    // check what cities this army controls and push them to myCities
    myCities = cityChecker(whatArmyIsThis);
    
    // buys random stuff:  
    randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent);
    
    console.log('elf, used points: ', countFactionUpkeep(armyInCase));
  }  
  // DWARVES
  if (gameObject.campaignArmies.dwarves.player === false){
    const armyInCase = gameObject.campaignArmies.dwarves.army;
    let upkeepATM = countFactionUpkeep(armyInCase);
    let totalPoints = gameObject.campaignArmies.dwarves.points;
    let pointsToSpent = totalPoints - upkeepATM;
    let myCities = [];
    const whatArmyIsThis = 'dwarves';
    const targetArmy = dwarves;
    let affordables = [];
    
    // check what cities this army controls and push them to myCities
    myCities = cityChecker(whatArmyIsThis);
    
    // buys random stuff:
    randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent);
    
    console.log('dwarfs, used points: ', countFactionUpkeep(armyInCase));
  }  
  // SAVAGES
  if (gameObject.campaignArmies.savages.player === false){
    const armyInCase = gameObject.campaignArmies.savages.army;
    let upkeepATM = countFactionUpkeep(armyInCase);
    let totalPoints = gameObject.campaignArmies.savages.points;
    let pointsToSpent = totalPoints - upkeepATM;
    let myCities = [];
    const whatArmyIsThis = 'savages';
    const targetArmy = savages;
    let affordables = [];
    
    // check what cities this army controls and push them to myCities
    myCities = cityChecker(whatArmyIsThis);
    
    // buys random stuff:
    randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent);
    
    console.log('savs, used points: ', countFactionUpkeep(armyInCase));
  }  
  // VAMPIRES
  if (gameObject.campaignArmies.vampires.player === false){
    const armyInCase = gameObject.campaignArmies.vampires.army;
    let upkeepATM = countFactionUpkeep(armyInCase);
    let totalPoints = gameObject.campaignArmies.vampires.points;
    let pointsToSpent = totalPoints - upkeepATM;
    let myCities = [];
    const whatArmyIsThis = 'vampires';
    const targetArmy = vampires;
    let affordables = [];
    
    // check what cities this army controls and push them to myCities
    myCities = cityChecker(whatArmyIsThis);
    
    // buys random stuff:
    randomBuys(targetArmy, myCities, whatArmyIsThis, pointsToSpent);
    
    console.log('vamps, used points: ', countFactionUpkeep(armyInCase));
  }
}

// AI Moves. Moves of AI wants to make
function aiMoves(){
  console.log('ai moves');
  // HUMANS
  if (gameObject.campaignArmies.humans.player === false){
    // randomize mode:
    const currentModeDice = callDice(3);
    const whatArmyIsThis = 'humans';
    const armyInAction = gameObject.campaignArmies.humans;
    const factions = gameObject.campaignArmies.factions;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}
    ];
    let enemyForces = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}    
    ];  
    
    /*  From here: */
    makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces);
  }  // human ends
  
  if (gameObject.campaignArmies.elves.player === false){
    // randomize mode:
    const currentModeDice = callDice(3);
    const whatArmyIsThis = 'elves';
    const armyInAction = gameObject.campaignArmies.elves;
    const factions = gameObject.campaignArmies.factions;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}
    ];
    let enemyForces = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}    
    ];  
    
    /*  From here: */
    makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces);

  }
  
  if (gameObject.campaignArmies.dwarves.player === false){
    // randomize mode:
    const currentModeDice = callDice(3);
    const whatArmyIsThis = 'dwarves';
    const armyInAction = gameObject.campaignArmies.dwarves;
    const factions = gameObject.campaignArmies.factions;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}
    ];
    let enemyForces = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}    
    ];  
    
    /*  From here: */
    makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces);

  }
  
  if (gameObject.campaignArmies.savages.player === false){
    // randomize mode:
    const currentModeDice = callDice(3);
    const whatArmyIsThis = 'savages';
    const armyInAction = gameObject.campaignArmies.savages;
    const factions = gameObject.campaignArmies.factions;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}
    ];
    let enemyForces = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}    
    ];  
    
    /*  From here: */
    makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces);

  }
  
  if (gameObject.campaignArmies.vampires.player === false){
    // randomize mode:
    const currentModeDice = callDice(3);
    const whatArmyIsThis = 'vampires';
    const armyInAction = gameObject.campaignArmies.vampires;
    const factions = gameObject.campaignArmies.factions;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}
    ];
    let enemyForces = [
      {nombre: 'Lima', forces: 0, power: 0},
      {nombre: 'Lurin', forces: 0, power: 0},
      {nombre: 'Quito', forces: 0, power: 0},
      {nombre: 'Arequipa', forces: 0, power: 0},
      {nombre: 'Tumbes', forces: 0, power: 0},
      {nombre: 'Cajamarca', forces: 0, power: 0},
      {nombre: 'Northfield', forces: 0, power: 0},
      {nombre: 'Crossroads', forces: 0, power: 0},
      {nombre: 'Riversend', forces: 0, power: 0},
      {nombre: 'Ironhall', forces: 0, power: 0},
      {nombre: 'Steelhammer', forces: 0, power: 0},
      {nombre: 'Southdig', forces: 0, power: 0},
      {nombre: 'Centerwoods', forces: 0, power: 0},
      {nombre: 'Seagarden', forces: 0, power: 0},
      {nombre: 'Whitetower', forces: 0, power: 0}    
    ];  
    
    /*  From here: */
    makeMoves(armyInAction, currentModeDice, whatArmyIsThis, factions, forcesInCities, enemyForces);
  
  }
}