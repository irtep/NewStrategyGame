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
    let currentMode;
    let forcesInCities = [
      {nombre: 'Lima', forces: 0},
      {nombre: 'Lurin', forces: 0},
      {nombre: 'Quito', forces: 0},
      {nombre: 'Arequipa', forces: 0},
      {nombre: 'Tumbes', forces: 0},
      {nombre: 'Cajamarca', forces: 0},
      {nombre: 'Northfield', forces: 0},
      {nombre: 'Crossroads', forces: 0},
      {nombre: 'Riversend', forces: 0},
      {nombre: 'Ironhall', forces: 0},
      {nombre: 'Steelhammer', forces: 0},
      {nombre: 'Southdig', forces: 0},
      {nombre: 'Centerwoods', forces: 0},
      {nombre: 'Seagarden', forces: 0},
      {nombre: 'Whitetower', forces: 0}
    ];
    
    switch (currentModeDice) {
      case 1: currentMode = 'aggressive'; break;
      case 2: currentMode = 'normal'; break;
      case 3: currentMode = 'defensive'; break;
      default: console.log('modedice not found: ', currentModeDice, whatArmyIsThis);  
    }
    
    // check how many guys are in each cities
    for (let i = 0; i < armyInAction.army.length; i++) {
      
      // check city..and add +1 to city
      for (let i2 = 0; i2 < forcesInCities.length; i2++) {
        
        if (armyInAction.army[i].location === forcesInCities[i2].nombre) {
          forcesInCities[i2].forces++;
        }
      }
    }
   
    switch (currentMode) {
      case 'aggressive': 
    // if aggro. Leave only one unit to each city and attack to all enemy cities
      break;  
      case 'normal':
    // if normal. Attack neutral cities with 50% force of nearest city/cities. And if guys, one/two enemy city
      break;  
      case 'defensive':
    // if defensive. Attack neutral with minimum and reinforce weaker cities if possible.
      break;  
    }
    
  }
  
  if (gameObject.campaignArmies.elves.player === false){

  }
  
  if (gameObject.campaignArmies.dwarves.player === false){

  }
  
  if (gameObject.campaignArmies.savages.player === false){

  }
  
  if (gameObject.campaignArmies.vampires.player === false){
  
  }
}