
let pause = true; // starts as true
const bLog = document.getElementById('battleLog'); // views/combat.html
const gameLooper = setInterval(roundExecutor, 1000); // execute orders
const speedOfRound = 500 // how fast come sub rounds

// Event listeners
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);
const keyListeners = window.addEventListener("keydown", checkKeyPressed, false); 

// Functions:
function roundExecutor(){
  draw();
  if (pause === false){ 
    
    // ai chooses commands.
    zunSu('orders'); 
    draw();
    // gather all units:
    const forCheckUnits1 = gameObject.army1.concat([]);
    const forCheckUnits2 = gameObject.army2.concat([]);
    const allUnits = forCheckUnits1.concat(forCheckUnits2);
    
    allUnits.sort(compare); // sort to initiative order
    
    // remove all firing lines and shoot orders to dead targets and meleeing to directions:
    for (let i = 0; i < gameObject.army1.length; i++){
      const inTurn = gameObject.army1[i];
      
      inTurn.firing = false;
      inTurn.firingAt = null;
      if (inTurn.order === 'shoot' && inTurn.target.quantity <= 0){
        console.log('trying to shoot dead. changed to standby');
        inTurn.order = 'standby';
      }
      // to fix as sometimes units might melee directions...this might cause "standby in melee problem"
      const allDirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
      for (let ii = 0; ii < allDirs.length; ii++) {
        if (inTurn.order === 'melee' && inTurn.target === allDirs[ii]){
          console.log('trying to melee a direction. changed to standby');
          inTurn.order = 'standby';
        }
      }
    }
    for (let i = 0; i < gameObject.army2.length; i++){
      const inTurn = gameObject.army2[i];
      
      inTurn.firing = false;
      inTurn.firingAt = null;
      if (inTurn.order === 'shoot' && inTurn.target.quantity <= 0){
        console.log('trying to shoot dead. changed to standby');
        inTurn.order = 'standby';
      }
      // to fix as sometimes units might melee directions...
      const allDirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
      for (let ii = 0; ii < allDirs.length; ii++) {
        if (inTurn.order === 'melee' && inTurn.target === allDirs[ii]){
          console.log('trying to melee a direction. changed to standby');
          inTurn.order = 'standby';
        }
      }
    }
    
    setTimeout(() => { 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        // ------- MOVE ---------- 
        if (unitInAction.order === 'move' /*&& unitInAction.engaged.yes === false*/) {
          for (let iii = 0; iii < unitInAction.details.stats.m; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
              unitInAction.notMovedInCombat = true;
            } else {
              unitInAction.location = moveAttempt;
              unitInAction.notMovedInCombat = false;
              draw();
            }
          }
          // find someone to shoot while moving:
          let opponent = gameObject.army2;
          let foundTarget = null;
          
          if (unitInAction.commander === 'army2') {
            opponent = gameObject.army1;  
          }
          
          for (let i = 0; i < opponent.length; i++){
            const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
            const distance = distanceCheck(unitInAction.location, opponent[i].location);
            
            if (weapon.range >= distance && foundTarget === null) {
              const checkLos = lineOfSight(unitInAction.location, opponent[i].location);
              if (checkLos === 'los ok'){
                foundTarget = opponent[i];
              }  
            }
          }
          
          // Shoot if someone was in range:
          if (foundTarget !== null){
            unitInAction.firingAt = foundTarget;
            const shoot = shootTarget(unitInAction, foundTarget);
          }  
        }
        
        // ------   RUN   ------------
        if (unitInAction.order === 'run'/* && unitInAction.engaged.yes === false*/) {
          const runSpeed = unitInAction.details.stats.m * 2;
          
          for (let iii = 0; iii < runSpeed; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
              unitInAction.notMovedInCombat = true;
            } else {
              unitInAction.location = moveAttempt;
              unitInAction.notMovedInCombat = false;
              draw();
            }
          }  
        }
      }
      //zunsu('checks');
    }, speedOfRound/2);
    setTimeout(() => { 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        // ------  SHOOT TO TARGET  --------
        if (unitInAction.order === 'shoot' && unitInAction.engaged.yes === false) {
          unitInAction.firingAt = unitInAction.target; // for line painting
          const shootAttempt = shootTarget(unitInAction, unitInAction.target);
        }  
        
        // --------  STANDBY  ---------
        if (unitInAction.order === 'standby' && unitInAction.engaged.yes === false) {
          // find someone to shoot while waiting more orders:
          let opponent = gameObject.army2;
          let foundTarget = null;
          
          if (unitInAction.commander === 'army2') {
            opponent = gameObject.army1;  
          }
          
          for (let i = 0; i < opponent.length; i++){
            const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
            const distance = distanceCheck(unitInAction.location, opponent[i].location);
            
            if (weapon.range >= distance && foundTarget === null) {
              const checkLos = lineOfSight(unitInAction.location, opponent[i].location);
              if (checkLos === 'los ok'){
                foundTarget = opponent[i];
              }  
            }
          }
          
          // Shoot if someone was in range:
          if (foundTarget !== null){
            unitInAction.firingAt = foundTarget;
            const shoot = shootTarget(unitInAction, foundTarget);
          }  
        }  
        
        // -----   MELEE ORDER  ---------
        if (unitInAction.order === 'melee') {
          // apply melee attack:
          const meleeAttackAttempt = meleeAttack(unitInAction, unitInAction.engaged.withWho[0]);
        }       
      }
      
    }, speedOfRound);
    draw();
    // scroll battlelog:
    bLog.scrollTop = bLog.scrollHeight;
  }  
  // CHECK VICTORY CONDITIONS
  console.log('vc 1 2 ', gameObject.army1, gameObject.army2);
  if (gameObject.army1.length < 1 || gameObject.army2.length < 1) {
    let winner;
    pause = true; 
    
    if (gameObject.army1.length < 1) { winner = 'Player 2'} else { winner = 'Player 1'}
      logScreen.innerHTML = logScreen.innerHTML + '<br>battle is over. '+ winner + ' wins!';
    
    // scroll battlelog:
    bLog.scrollTop = bLog.scrollHeight;
    
    pause = true;
    clearInterval(gameLooper);
  }
}

// Prepare game:
function startGame(){
  // load selected armies from localStorage:
  const selected = JSON.parse(localStorage.getItem('Go'));
  console.log('selected: ', selected);
  
  // Campaign game:
  if (selected.campaignPlay === true) {
    console.log('campaign detected');
    gameObject = selected;
    console.log('go after load:  ', gameObject);
  } else { // Skirmish game:
    console.log('skirmish detected');
    gameObject.army1 = selected.army1.units; gameObject.army2 = selected.army2.units;
    gameObject.factions[0] = selected.army1.chosenArmy; gameObject.factions[1] = selected.army2.chosenArmy;
    gameObject.terrain = selected.field;    
  } 
  
  // complete gameObject with unit stats
  const arm1 = gameObject.army1;
  const arm2 = gameObject.army2;
  let activeArmy = gameObject.army1;
  const copyOfOld = Object.assign({}, gameObject);
  console.log('fill details: aA copyOfOLd ', activeArmy, copyOfOld);
  
  for (let ind = 0; ind < arm1.length; ind++){
    const foundUnit = searchUnitByName(arm1[ind].unit, gameObject.factions[0]);
    console.log('pars for foundUnit: ', arm1[ind].unit, gameObject.factions[0]);
    console.log('par 2: ', gameObject.factions[0]);
    console.log('found: ', foundUnit);
    arm1[ind].details = foundUnit;
  }  
  for (let ind2 = 0; ind2 < arm2.length; ind2++){
    const foundUnit = searchUnitByName(arm2[ind2].unit, gameObject.factions[1]);
    arm2[ind2].details = foundUnit;
  }
  
  // set x and y, commander and id for all:
  function setStartLocations(activeArmy){
    var currentFile = 18;
    var currentFile2 = 580
    
    for (let i = 0; i < activeArmy.length; i++) {
      if (activeArmy === arm1){  // army 1    
        
        // set location to have x y and z as in campaign play they are not
        if (gameObject.campaignPlay === true) {
          const tempStore = activeArmy[i].location.concat([]);
          activeArmy[i].location = {x: null, y: null, z: null, city: tempStore};
        }
        if (i === 0){
          activeArmy[i].location.x = gameObject.terrain.deploymentZone1.x;
          activeArmy[i].location.y = currentFile;
          activeArmy[i].id = 1;
          activeArmy[i].commander = 'army1';
        } else {
          const lastUnit = i - 1;
          
          switch (i) {  // for line breaks:
            case 4: currentFile = currentFile + 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone1.x;
            break;
            case 8: currentFile = currentFile + 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone1.x;
            break;
            case 12: currentFile = currentFile + 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone1.x;
            break;
            default: activeArmy[i].location.x = activeArmy[lastUnit].location.x + 130;
          }
          
          activeArmy[i].location.y = currentFile;
          activeArmy[i].id = activeArmy[lastUnit].id + 1;
          activeArmy[i].commander = 'army1';
        }
      } else {  // army 2
        
        if (gameObject.campaignPlay === true) {
          const tempStore = activeArmy[i].location.concat([]);
          activeArmy[i].location = {x: null, y: null, z: null, city: tempStore};
        }
        if (i === 0){
          activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
          activeArmy[i].location.y = currentFile2;
          activeArmy[i].id = 20;
          activeArmy[i].commander = 'army2';
        } else {
          const lastUnit = i - 1;
          
          switch (i) {  // for line breaks:
            case 4: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
            case 8: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
            case 12: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
              console.log('using default to set x and y for a2');
            default: activeArmy[i].location.x = activeArmy[lastUnit].location.x - 130;
          }
          
          activeArmy[i].location.y = currentFile2;
          activeArmy[i].id = activeArmy[lastUnit].id + 1;
          activeArmy[i].commander = 'army2';
        }
      }
    }  
  }
  setStartLocations(arm1);
  setStartLocations(arm2);
  draw();
  createUnitButtons();
  console.log('start game ready: ', gameObject);
}

//  -------- ONLOAD:  ------------
window.onload = ()=> {
  startGame();
};