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

// attack executor
function executeAttack(type, who, to, modAttack){
  switch (type){
    case 'ranged':
      let modifications;
      if (to.engaged.yes = true){modifications = 2}
      const attackDice = callDice(6); console.log('attack dice: ', attackDice);
      const attackMods = who.details.stats.bs + modAttack + to.details.stats.defMod; 
      
      if (attackDice >= attackMods || attackDice === 6){
        console.log('attack hits!, mods: ', attackMods);
        const woundDice = callDice(6); console.log('wound dice: ', woundDice);
        const weaponStats =  searchStatsOfWeapon(who.rangedWeapons[0], 'ranged');
        const difference = weaponsStats.str - to.details.stats.t;
        
        if (difference + woundDice >= 4){
          console.log('wounded: s, t, dice', weaponsStats.str, to.details.stats.t, woundDice);
          const saveDice = callDice(6);  
        
          if (saveDice - weaponsStats.ap >= to.details.stats.sv){
            console.log('attack saved! dice, ap, sv', saveDice, weaponsStats.ap, to.details.stats.sv);
          } else { // wound
            console.log('wound done!');
          }  
        }
      }
    break;
    case 'melee':
      
    break;
    
    default: console.log('attack type not found.');
  }
}