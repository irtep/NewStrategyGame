function endBattle(winner){
  console.log('end battle');
  gameObject.comingFromFight = true;
  // clear army1 and army2
  gameObject.army1 = [];
  gameObject.army2 = [];
  if (gameObject.campaignPlay === true) {
    // clear contesteds:
    gameObject.campaignArmies.contested.splice(0, gameObject.campaignArmies.contested.length);
  
    // add stats:
    if (winner === "winner1") {
      console.log('w p1');
      gameObject.playerStats.wins++;
    } else {
      console.log('winner2');
      gameObject.playerStats.losses++;
    }
    // save gameObject
    localStorage.setItem('Go', JSON.stringify(gameObject));  
  
    // go to map screen.
    window.location = "https://thenewgame.glitch.me/mapscreen";
  } else {
    window.location = "https://thenewgame.glitch.me/";
  }  
}

// to sort in initiative order
function compare(a,b) {
  if (a.details.stats.i < b.details.stats.i)
    return 1;
  if (a.details.stats.i > b.details.stats.i)
    return -1;
  return 0;
}

// key Listener
function checkKeyPressed(e) {
  if (e.keyCode == "32") { // 32 is spacebar..should maybe change to 'p' and do more of these...
    pauseGame();    // at commands/buttonCommands.js
  }
}

// lethal wound dealer:
function lethalWound(to, who, isMelee){
  const p1units = document.getElementById('p1units');
  const p2units = document.getElementById('p2units');
  let armyNumber;
  let indexOfDead;
  let sourceUnit; // factions place at gameObject
  let sourcesIndex;
  let sourcesArmyIndex;
  let rootArmy; // humans, elves etc.
  let rootsIndex;
  // for log screen:
  const logScreen = document.getElementById('logi'); // views/index.html
  let forLog;
  
  // to find the dead unit
  for (let i = 0; i < gameObject.army1.length; i++){
    if (to == gameObject.army1[i]){
      indexOfDead = i;
      armyNumber = 1;
    }
  }
  for (let ix = 0; ix < gameObject.army2.length; ix++){
    if (to == gameObject.army2[ix]){
      indexOfDead = ix;
      armyNumber = 2;
    }
  }
  
  // if in campaign, find the source of unit that takes damage
  // Campaign game:
  if (gameObject.campaignPlay === true) {
    let selectedFaction;
    
    for (let i = 0; i < gameObject.campaignArmies.factions.length; i++) {
      
      for (let ii = 0; ii < gameObject.campaignArmies.factions[i].army.length; ii++) {
        let unitToCheckFrom;
        let unitToCompare = gameObject.campaignArmies.factions[i].army[ii];
        
        if (armyNumber === 1){ 
          unitToCheckFrom = gameObject.army1[indexOfDead];  
        } else {
          unitToCheckFrom = gameObject.army2[indexOfDead];
        }
        
        // bug fix attempt, to counter bug that kills killed...
        if (typeof unitToCheckFrom !== 'undefined') {

          if (unitToCheckFrom.details.nombre === unitToCompare.unit &&
             unitToCheckFrom.location.city === unitToCompare.location && 
             unitToCheckFrom.quantity === unitToCompare.quantity) {

            sourceUnit = unitToCompare;
            sourcesArmyIndex = i;
            sourcesIndex = ii; 
            rootsIndex = ii;

            // find rootUnit
            if (gameObject.campaignArmies.factions[i].nombre === gameObject.campaignArmies.humans.nombre) {
              rootArmy = gameObject.campaignArmies.humans;
            }
            if (gameObject.campaignArmies.factions[i].nombre === gameObject.campaignArmies.elves.nombre) {
              rootArmy = gameObject.campaignArmies.elves;
            }
            if (gameObject.campaignArmies.factions[i].nombre === gameObject.campaignArmies.dwarves.nombre) {
              rootArmy = gameObject.campaignArmies.dwarves;
            }
            if (gameObject.campaignArmies.factions[i].nombre === gameObject.campaignArmies.savages.nombre) {
              rootArmy = gameObject.campaignArmies.savages;
            }
            if (gameObject.campaignArmies.factions[i].nombre === gameObject.campaignArmies.vampires.nombre) {
              rootArmy = gameObject.campaignArmies.vampires;
            }
          }    
        }
      }
    } 
  }
  // and delete it
  switch (armyNumber){
    case 1:
      forLog = '<br> ' + gameObject.army1[indexOfDead].unit + ' is destroyed!';  
      logScreen.innerHTML = logScreen.innerHTML + forLog;
      
      gameObject.army1[indexOfDead].quantity--;
      if (gameObject.campaignPlay === true) {
        sourceUnit.quantity--; // deducts from source too
        
        rootArmy.army[rootsIndex].quantity--; // and from root
      }
      if (gameObject.army1[indexOfDead].quantity < 1){
        // if (isMelee === false){
        who.order = 'standby';
        who.target = null;
        if (isMelee) {
          who.engaged.withWho.splice(0);
          if (who.engaged.withWho.length > 0){
            who.order = 'melee';
          }
        }
        gameObject.army1.splice(indexOfDead, 1);
        if (gameObject.campaignPlay === true) {
          gameObject.campaignArmies.factions[sourcesArmyIndex].army.splice(sourcesIndex, 1); // removes from source too
          rootArmy.army.splice(rootsIndex, 1);
        }  
        // }
      }  
    break;
    case 2:
      forLog = '<br> ' + gameObject.army2[indexOfDead].unit + ' is destroyed!';  
      logScreen.innerHTML = logScreen.innerHTML + forLog;
      
      gameObject.army2[indexOfDead].quantity--;
      if (gameObject.campaignPlay === true) {
        sourceUnit.quantity--;
        console.log('deducting from: ', rootArmy.army[rootsIndex]);
        rootArmy.army[rootsIndex].quantity--; // and from root
      }
        
      if (gameObject.army2[indexOfDead].quantity < 1){
        // if (isMelee === false){
        who.order = 'standby';
        who.target = null;
        if (isMelee) {
          who.engaged.withWho.splice(0);
          if (who.engaged.withWho.length > 0){
            who.order = 'melee';
          }
        }
        gameObject.army2.splice(indexOfDead, 1);
        if (gameObject.campaignPlay === true) {
          gameObject.campaignArmies.factions[sourcesArmyIndex].army.splice(sourcesIndex, 1); // removes from source too
          rootArmy.army.splice(rootsIndex, 1);
        }
        
        // }  
      }
    break;
    default: console.log('armynumber not found');  
  }
  // re-create buttons:
  p1units.innerHTML = '';
  p2units.innerHTML = '';
  createUnitButtons();
  
  // CHECK VICTORY CONDITIONS
  checkVictoryCondition();
}

// attack executor.   Mod attack: the bigger is, the harder is to hit
function executeAttack(type, who, to, modAttack, attackNumber){ // attackNumber is indexnro of rangedWeapons of attacker
  switch (type){
    case 'ranged':
      const bDetails = document.getElementById('battleDetails');
      const weaponsStats =  searchStatsOfWeapon(who.details.rangedWeapons[attackNumber], 'ranged');
      let attacks;
      const rangeToTarget = distanceCheck(who.location, to.location);
      let attackSummary = {attacker: who.unit, target: to.unit, weapon: weaponsStats.nombre, attacks: 0, hits: 0, wounds: 0, saved: 0};
      
      // check how many attacks the weapon has:
      if (weaponsStats.attacks === 'd6'){
        attacks = callDice(6);
      }
      else if (weaponsStats.attacks === 'd3'){
        attacks = callDice(3);
      }
      else {
        attacks = weaponsStats.attacks;
      }
      let totalAttacks = attacks * who.quantity;
      
      // rapidfire bonus:
      if(rangeToTarget < weaponsStats.range / 2 && weaponsStats.type === 'rapid'){
        totalAttacks = totalAttacks * 2;
      }
      
      // attack with all attacks:
      for (let i = 0; i < totalAttacks; i++){
        if (rangeToTarget <= weaponsStats.range){
          if (to.engaged.yes === true){
            modAttack = modAttack + 2;
          }
          /*  DICES START FROM HERE */
          const attackDice = callDice(6);
          const attackMods = who.details.stats.bs + modAttack + to.details.stats.defMods; 
          const woundDice = callDice(6);
          const saveDice = callDice(6);
          
          if (attackDice >= attackMods || attackDice === 6){
            // hit  
            const difference = weaponsStats.str - to.details.stats.t;
            attackSummary.hits++;
            
            if (saveDice - weaponsStats.ap >= to.details.stats.sv){
              attackSummary.saved++;
            } else { // armour pierced
            if (difference + woundDice >= 4 || woundDice === 6){
              // toughness passed
                let wounds;
            
                if (weaponsStats.wounds === 'd6'){
                  wounds = callDice(6);
                }
                else if (weaponsStats.wounds === 'd3'){
                  wounds = callDice(3);
                }
                else {
                  wounds = weaponsStats.wounds;
                }
                attackSummary.wounds = attackSummary.wounds + wounds;
                
                if (wounds < to.details.stats.w) {  // only hurts
                  let woundStatus;
                  to.details.stats.w = to.details.stats.w - wounds;
                  if (to.details.stats.w < 2) {
                    woundStatus = 'in very bad shape.';
                  } else if (to.details.stats.w > 1 && to.details.stats.w < 5) {
                    woundStatus = 'in battered condition';           
                  } else if (to.details.stats.w > 4) {
                    woundStatus = 'just slightly damaged.'           
                  }
                  const forLog = '<br>' + who.unit +' attacks '+ to.unit + ' with ' + weaponsStats.nombre + ' causing ' + attackSummary.wounds+
                  ' wounds <br>' + to.unit + ' is '+ woundStatus + '.';
                   logScreen.innerHTML = logScreen.innerHTML + forLog;
                } else { // kills
                  const forLog = '<br>' + who.unit +' attacks '+ to.unit + ' with ' + weaponsStats.nombre + ' causing ' + attackSummary.wounds+
                  ' wounds.';
                   logScreen.innerHTML = logScreen.innerHTML + forLog;
                  lethalWound(to, who, false); // false for melee attack
                }
              } // wound ends  
            } // armour pierced ends
          } // attack hits
        } else {
          console.log('not in range, wRange, oRange', rangeToTarget, weaponsStats.range)
        }
        attackSummary.attacks = totalAttacks;
      } // attack with attacks
      const longLog = 'Attacker: '+ attackSummary.attacker + '. weapon: '+ attackSummary.weapon+ '. attacks: '+ attackSummary.attacks+
      '. hits: '+ attackSummary.hits+ '. saved by armour: '+ attackSummary.saved+ '. serious wounds: '+ attackSummary.wounds + ' target: '+ to.unit;

      bDetails.innerHTML = bDetails.innerHTML + '<br>' + longLog;
      console.log('attack summary: ', attackSummary);
    break;
    case 'melee':
      // at the moment melee is handled in 'orders' section separately
    break;
    default: console.log('attack type not found.');
  }
}