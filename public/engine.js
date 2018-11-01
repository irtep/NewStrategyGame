
let pause = true; // starts as true
const gameLooper = setInterval(roundExecutor, 2000); // execute orders

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
    
    // remove all firing lines:
    for (let i = 0; i < gameObject.army1.length; i++){
      gameObject.army1[i].firing = false;
      gameObject.army1[i].firingAt = null;
    }
    for (let i = 0; i < gameObject.army2.length; i++){
      gameObject.army2[i].firing = false;
      gameObject.army2[i].firingAt = null;
    }
    
    setTimeout(() => { 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        // ------- MOVE ---------- 
        if (unitInAction.order === 'move' && unitInAction.engaged.yes === false) {
          for (let iii = 0; iii < unitInAction.details.stats.m; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
              unitInAction.notMoved = true;
            } else {
              unitInAction.location = moveAttempt;
              unitInAction.notMoved = false;
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
        if (unitInAction.order === 'run' && unitInAction.engaged.yes === false) {
          const runSpeed = unitInAction.details.stats.m * 2;
          
          for (let iii = 0; iii < runSpeed; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
              unitInAction.notMoved = true;
            } else {
              unitInAction.location = moveAttempt;
              unitInAction.notMoved = false;
              draw();
            }
          }  
        }
      }
      //zunsu('checks');
    }, 350);
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
      
    }, 650);
    draw();
  }  
}

// Prepare game:
function startGame(){
  // complete gameObject with unit stats
  const arm1 = gameObject.army1;
  const arm2 = gameObject.army2;
  let activeArmy = gameObject.army1;
  
  for (let ind = 0; ind < arm1.length; ind++){
    const foundUnit = searchUnitByName(arm1[ind].unit, gameObject.factions[0]);
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
        if (i === 0){
          activeArmy[i].location.x = 50;
          activeArmy[i].location.y = currentFile;
          activeArmy[i].id = 1;
          activeArmy[i].commander = 'army1';
        } else {
          const lastUnit = i - 1;
          
          switch (i) {  // for line breaks:
            case 4: currentFile = currentFile + 35; activeArmy[i].location.x = 50;
            break;
            case 8: currentFile = currentFile + 35; activeArmy[i].location.x = 50;
            break;
            case 12: currentFile = currentFile + 35; activeArmy[i].location.x = 50;
            break;
            default: activeArmy[i].location.x = activeArmy[lastUnit].location.x + 130;
          }
          
          activeArmy[i].location.y = currentFile;
          activeArmy[i].id = activeArmy[lastUnit].id + 1;
          activeArmy[i].commander = 'army1';
        }
      } else {  // army 2
        if (i === 0){
          activeArmy[i].location.x = 890;
          activeArmy[i].location.y = currentFile2;
          activeArmy[i].id = 20;
          activeArmy[i].commander = 'army2';
        } else {
          const lastUnit = i - 1;
          
          switch (i) {  // for line breaks:
            case 4: currentFile2 = currentFile - 35; activeArmy[i].location.x = 50;
            break;
            case 8: currentFile2 = currentFile - 35; activeArmy[i].location.x = 50;
            break;
            case 12: currentFile2 = currentFile - 35; activeArmy[i].location.x = 50;
            break;
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

// Calls:
startGame();