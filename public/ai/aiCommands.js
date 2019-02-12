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
    
  for (let i2 = 0; i2 < targetArmy.length; i2++ ) {
      const totalPointCost = targetArmy[i2].stats.pointCost * targetArmy[i2].unitSize;
      
      if (pointsToSpent >= totalPointCost) {
        const randomDice = callDice(myCities.length) - 1; // -1 to allow zero 
        addUnit(whatArmyIsThis, targetArmy[i2].nombre, targetArmy[i2].unitSize, myCities[randomDice]);
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
    
    console.log('humans, used points: ', upkeepATM);
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
    
    console.log('elf, used points: ', upkeepATM);
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
    
    console.log('dwarfs, used points: ', upkeepATM);
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
    
    console.log('savs, used points: ', upkeepATM);
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
    
    console.log('vamps, used points: ', upkeepATM);
  }
}

// AI Moves. Moves of AI wants to make
function aiMoves(){
  
  if (gameObject.campaignArmies.humans.player === false){

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