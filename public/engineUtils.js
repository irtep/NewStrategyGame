// to sort in initiative order
function compare(a,b) {
  if (a.details.stats.i < b.details.stats.i)
    return 1;
  if (a.details.stats.i > b.details.stats.i)
    return -1;
  return 0;
}

// sort to distance order, from lowest to highest:
// to sort in initiative order
function sortToDistance(a,b) {
  if (a.details.stats.i > b.details.stats.i)
    return 1;
  if (a.details.stats.i < b.details.stats.i)
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
function lethalWound(to, who){
  console.log('lethal wound!');
  const p1units = document.getElementById('p1units');
  const p2units = document.getElementById('p2units');
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
      gameObject.army1[indexOfDead].quantity--;
      if (gameObject.army1[indexOfDead].quantity < 1){
        who.order = 'standby';
        who.target = null;
        gameObject.army1.splice(indexOfDead, 1);
      }  
    break;
    case 2:
      gameObject.army2[indexOfDead].quantity--;
      if (gameObject.army2[indexOfDead].quantity < 1){
        who.order = 'standby';
        who.target = null;
        gameObject.army2.splice(indexOfDead, 1);
      }
    break;
    default: console.log('armynumber not found');  
  }
  console.log('dead unit deleted');
  // re-create buttons:
  p1units.innerHTML = '';
  p2units.innerHTML = '';
  createUnitButtons();
}

// attack executor.   Mod attack: the bigger is, the harder is to hit
function executeAttack(type, who, to, modAttack, attackNumber){ // attackNumber is indexnro of rangedWeapons of attacker
  console.log('executeAttack, who, to', who, to);
  switch (type){
    case 'ranged':
      const weaponsStats =  searchStatsOfWeapon(who.details.rangedWeapons[attackNumber], 'ranged');
      console.log('shooting with: ', weaponsStats.nombre);
      let attacks;
      const rangeToTarget = distanceCheck(who.location, to.location);
      
      // check how many attacks the weapon has:
      if (weaponsStats.attacks === 'd6'){
        attacks = callDice(6); console.log('attacks d6', attacks);
      }
      else if (weaponsStats.attacks === 'd3'){
        attacks = callDice(3); console.log('attacks d3', attacks);
      }
      else {
        attacks = weaponsStats.attacks; console.log('attacks number:', attacks);
      }
      
      let totalAttacks = attacks * who.quantity;
      
      // rapidfire bonus:
      if(rangeToTarget < weaponsStats.range / 2 && weaponsStats.type === 'rapid'){
        totalAttacks = totalAttacks * 2;
        console.log('rapid fire doubles attacks: ', totalAttacks);
      }
      
      // attack with all attacks:
      for (let i = 0; i < totalAttacks; i++){
        
        if (rangeToTarget <= weaponsStats.range){
          console.log('range ok', rangeToTarget, weaponsStats.range);
          
          if (to.engaged.yes === true){
            console.log('target engaged, adding two');
            modAttack = modAttack + 2;
          }
          
          const attackDice = callDice(6); console.log('attack dice: ', attackDice);
          const attackMods = who.details.stats.bs + modAttack + to.details.stats.defMods; 
          console.log('total needed to hit: ', attackMods, '(bs + mods + defmod)', who.details.stats.bs, modAttack, 
                     to.details.stats.defMods); 
          
          if (attackDice >= attackMods || attackDice === 6){
            console.log('attack hits!, mods: ', attackMods);
            const woundDice = callDice(6); console.log('wound dice: ', woundDice);
            const difference = weaponsStats.str - to.details.stats.t;
        
            if (difference + woundDice >= 4){
              console.log('wounded: s, t, dice', weaponsStats.str, to.details.stats.t, woundDice);
              const saveDice = callDice(6);  
              console.log('roll for save: save, needed', saveDice, to.details.stats.sv + weaponsStats.ap);
        
              if (saveDice - weaponsStats.ap >= to.details.stats.sv){
                console.log('attack saved! dice, ap, sv', saveDice, weaponsStats.ap, to.details.stats.sv);
              } else { // wound
                console.log('wound done!');
                let wounds;
            
                if (weaponsStats.wounds === 'd6'){
                  wounds = callDice(6); console.log('wounds d6', wounds);
                }
                else if (weaponsStats.wounds === 'd3'){
                  wounds = callDice(3); console.log('wounds d3', wounds);
                }
                else {
                  wounds = weaponsStats.wounds; console.log('wounds number:', wounds);
                }
                if (wounds < to.details.stats.w) {
                  to.details.stats.w = to.details.stats.w - wounds;
                } else {
                  lethalWound(to, who)
                }
              } // wound ends  
            } else {'not wounded: dice, strength, toughness: ', woundDice, weaponsStats.str, to.details.stats.t}//
          } // attack hits
        } else {console.log('not in range, wRange, oRange', rangeToTarget, weaponsStats.range)}
      } // attack with attacks
    break;
    case 'melee':
      
    break;
    
    default: console.log('attack type not found.');
  }
}