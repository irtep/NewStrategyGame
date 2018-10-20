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
  if (e.keyCode == "32") { // 32 is spacebar
    pauseGame();    
  }
}

// lethal wound dealer:
function lethalWound(to){
  let armyNumber;
  let indexOfDead;
  // to find the dead unit
  for (let i = 0; i < gameObject.army1.length; i++){
    if (to == gameObject.army1[i]){
      console.log('found in army1: ', i);
      indexOfDead = i;
      armyNumber = 1;
    }
  }
  for (let ix = 0; ix < gameObject.army2.length; ix++){
    if (to == gameObject.army2[ix]){
      console.log('found in army2: ', ix);
      indexOfDead = ix;
      armyNumber = 2;
    }
  }
  // and delete it
  switch (armyNumber){
    case 1:
      gameObject.army1[indexOfdead].quantity--;
      if (gameObject.army1[indexOfdead].quantity < 1){
        gameObject.army1.splice(indexOfdead, 1);
      }  
    break;
    case 2:
      gameObject.army2[indexOfdead].quantity--;
      if (gameObject.army2[indexOfdead].quantity < 1){
        gameObject.army2.splice(indexOfdead, 1);
      }
    break;
    default: console.log('armynumber not found');  
  }
}

// attack executor
function executeAttack(type, who, to, modAttack, attackNumber){ // attackNumber is indexnro of rangedWeapons of attacker
  console.log('executeAttack, who, to', who, to);
  switch (type){
    case 'ranged':
      const weaponsStats =  searchStatsOfWeapon(who.rangedWeapons[attackNumber], 'ranged');
      let attacks;
                
      if (weaponsStats.attacks === 'd6'){
        attacks = callDice(6); console.log('attacks d6');
      }
      else if (weaponsStats.attacks === 'd3'){
        attacks = callDice(3); console.log('attacks d3');
      }
      else {
        attacks = weaponsStats.attacks; console.log('attacks number:');
      }
      
      let totalAttacks = attacks * who.quantity;
      
      for (let i = 0; i < totalAttacks; i++){
        let modifications;
        console.log('bugfixattempt, to: ', to);
        const rangeToTarget = distanceCheck(who.location, to.location);
      
        if (to.engaged.yes = true){
          modifications = 2;
        }
        const attackDice = callDice(6); console.log('attack dice: ', attackDice);
        const attackMods = who.details.stats.bs + modAttack + to.details.stats.defMod; 
      
        if (attackDice >= attackMods || attackDice === 6){
          console.log('attack hits!, mods: ', attackMods);
          const woundDice = callDice(6); console.log('wound dice: ', woundDice);
          const difference = weaponsStats.str - to.details.stats.t;
        
          if (rangeToTarget <= weaponsStats.range){
            if (difference + woundDice >= 4){
              console.log('wounded: s, t, dice', weaponsStats.str, to.details.stats.t, woundDice);
              const saveDice = callDice(6);  
        
              if (saveDice - weaponsStats.ap >= to.details.stats.sv){
                console.log('attack saved! dice, ap, sv', saveDice, weaponsStats.ap, to.details.stats.sv);
              } else { // wound
                console.log('wound done!');
                let wounds;
            
                if (weaponsStats.wounds === 'd6'){
                  wounds = callDice(6); console.log('str d6');
                }
                else if (weaponsStats.wounds === 'd3'){
                  wounds = callDice(3); console.log('str d3');
                }
                else {
                  wounds = weaponsStats.wounds; console.log('str number:');
                }
                if (wounds < to.details.stats.w) {
                  to.details.stats.w - wounds;
                } else {
                  lethalWound(to);
                }
              } // wound ends  
            } //
          } else {console.log('not in range, wRange, oRange', rangeToTarget, weaponsStats.range)}
        }
      }
    break;
    case 'melee':
      
    break;
    
    default: console.log('attack type not found.');
  }
}