function endBattle(){
  console.log('end battle');
  gameObject.comingFromFight = true;
  // save gameObject
  localStorage.setItem('Go', JSON.stringify(gameObject));  
  // go to map screen.
  window.location = "https://thenewgame.glitch.me/mapscreen";
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
  let sourceUnit;
  let sourcesIndex;
  let sourcesArmyIndex;
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
      
        if (unitToCheckFrom.details.nombre === unitToCompare.unit &&
           unitToCheckFrom.location.city === unitToCompare.location && // might need location.city...
           unitToCheckFrom.quantity === unitToCompare.quantity) {
          
          console.log('found unit to be killed from source', unitToCompare);
          sourceUnit = unitToCompare;
          sourcesArmyIndex = i;
          sourcesIndex = ii;
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
  console.log('gameObject after lethal wound: ', gameObject);
}

// attack executor.   Mod attack: the bigger is, the harder is to hit
function executeAttack(type, who, to, modAttack, attackNumber){ // attackNumber is indexnro of rangedWeapons of attacker
  switch (type){
    case 'ranged':
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
      console.log('attack summary: ', attackSummary);
    break;
    case 'melee':
      // at the moment melee is handled in 'orders' section
    break;
    default: console.log('attack type not found.');
  }
}