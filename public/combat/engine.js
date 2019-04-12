
let pause = true; // starts as true
const bLog = document.getElementById('battleLog'); // views/combat.html
const gameLooper = setInterval(roundExecutor, 1000); // execute orders
const speedOfRound = 500 // how fast come sub rounds
const tutorial = '<p class= "blueText">HOW TO PLAY:<br><br>'+
    'Continue game/ Pause game button can be used to pause/continue game.<br><br>'+
    '-While game is paused, you have good time to give orders to your units. '+
  'You can also give commands, while game is not paused.<br><br>'+
  'If you want to give same order to all your units, you can click “Command to all” button, after that you can choose move, run or standby orders. <br>'+
  'If you want to give an order to single unit. Just click units name and then choose order you want this unit to do<br><br>'+
  'Commands:<br>'+
  '-<b>standby</b>: unit just stands there, shooting closest opponent it sees if it has a ranged weapon.<br><br>'+
  '-<b>move</b>: unit moves to chosen direction. If it has ranged weapon like a crossbow, it will fire that if it sees and opponent, while moving. After you choose this order, you need to choose direction.<br><br>'+
  '-<b>shoot</b>: unit stops moving and fires the opponent you choose. If it has line of sight and range to that.<br><br>'+
  '-<b>run</b> same as move-order, except that unit moves faster, and can not shoot while doing it.<br><br>'+
  '-<b>hunt</b>: choose target unit who you want this unit to hunt. After that your unit tries to find a place to shoot target unit, while avoiding melee with it. <br><br>'+
  '<b>engage</b>: your unit that receives this order tries to run towards target you chose in order to engage melee. Please note that your unit does not have same magic crystal ball view as you, so if you use this from far away, your guy might choose unexpected way to engage the enemy. So maybe best use when closer to enemy.<br><br>'+
  'You win by killing all enemies. Start by giving orders and or clicking "Continue game."</p>';

// Event listeners
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);
const keyListeners = window.addEventListener("keydown", checkKeyPressed, false); 

// Functions:

// victory conditions checker:
function checkVictoryCondition() {
  
  if (gameObject.army1.length < 1 || gameObject.army2.length < 1) {
    let winner;
    pause = true; 
    
    if (gameObject.army1.length < 1) { winner = 'Player 2'} else { winner = 'Player 1'}
    
    logScreen.innerHTML = logScreen.innerHTML + '<br>battle is over. '+ winner + ' wins!';
    if (winner === "Player 1") {
      logScreen.innerHTML = logScreen.innerHTML + '<br><input type= "button" class= "endBattle" '+
      'value= "Continue game" id= "winner1" onclick= "endBattle(this.id)">';
    } else {
      logScreen.innerHTML = logScreen.innerHTML + '<br><input type= "button" class= "endBattle" '+
      'value= "Continue game" id= "winner2" onclick= "endBattle(this.id)">';
    }
    
    // scroll battlelog:
    bLog.scrollTop = bLog.scrollHeight;
    
    pause = true;
    clearInterval(gameLooper);
  }
}

// start moving:
function startMoving(who, where){
  for (let iii = 0; iii < who.details.stats.m; iii++){
    const moveAttempt = moveUnit(who, where);

    if (moveAttempt === 'collision'){
      
      console.log('got collision at startMoving');
      who.notMovedInCombat = true;
    } else {

      who.location = moveAttempt;
      who.notMovedInCombat = false;
      draw();
    }
  }  
}

function roundExecutor(){
  draw();
  if (pause === false){ 
    
    // ai chooses commands.
    zunSu('orders'); 
    draw();
    // gather all units:
    // SHOULD PROPABLY MAKE THIS GATHERING AFTER ALL SHOOTINGS!
    const forCheckUnits1 = gameObject.army1.concat([]);
    const forCheckUnits2 = gameObject.army2.concat([]);
    const allUnits = forCheckUnits1.concat(forCheckUnits2);
    
    allUnits.sort(compare); // sort to initiative order
    
    // remove all firing lines and shoot orders to dead targets and meleeing to directions:
    // also reloadStatus-- for those who have shot;
    for (let i = 0; i < gameObject.army1.length; i++){
      const inTurn = gameObject.army1[i];
      
      if (inTurn.reloadStatus > 0) {
      
        inTurn.reloadStatus--;
        if (inTurn.reloadStatus === 0) {  
          console.log(inTurn.unit, ' has weapon reloaded');
        }
      }
      
      inTurn.firing = false;
      inTurn.firingAt = null;
      
      if (inTurn.order === 'shoot' && inTurn.target.quantity <= 0){
        
        inTurn.order = 'standby';
      }
      // to fix as sometimes units might melee directions...this might cause "standby in melee problem"
      const allDirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
      for (let ii = 0; ii < allDirs.length; ii++) {
        if (inTurn.order === 'melee' && inTurn.target === allDirs[ii]){
          
          inTurn.order = 'move';
        }
      }
    }
    // same for player 2
    for (let i = 0; i < gameObject.army2.length; i++){
      const inTurn = gameObject.army2[i];
      
      if (inTurn.reloadStatus > 0) {
      
        inTurn.reloadStatus--;
        if (inTurn.reloadStatus === 0) {  
          console.log(inTurn.unit, ' has weapon reloaded');
        }
      }      
      
      inTurn.firing = false;
      inTurn.firingAt = null;
      
      if (inTurn.order === 'shoot' && inTurn.target.quantity <= 0){
        
        inTurn.order = 'standby';
      }
      // to fix as sometimes units might melee directions...
      const allDirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
      for (let ii = 0; ii < allDirs.length; ii++) {
        if (inTurn.order === 'melee' && inTurn.target === allDirs[ii]){
          
          inTurn.order = 'move';
        }
      }
    }
    
    // --------- COMPLETE ORDERS -----------------------
    // ---------- MOVE AND RUN ----------------------------
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
          if (foundTarget !== null && unitInAction.reloadStatus === 0){
            const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
            unitInAction.firingAt = foundTarget;
            const shoot = shootTarget(unitInAction, foundTarget);
            
            unitInAction.reloadStatus = weapon.reloadSpeed;
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
    
    // ---------- REST OF ORDERS ---------------
    setTimeout(() => { 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        // ------  SHOOT TO TARGET  --------
        if (unitInAction.order === 'shoot' && unitInAction.engaged.yes === false && unitInAction.reloadStatus === 0) {
          const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
          unitInAction.firingAt = unitInAction.target; // for line painting
          
          const shootAttempt = shootTarget(unitInAction, unitInAction.target);
          unitInAction.reloadStatus = weapon.reloadSpeed;
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
          if (foundTarget !== null && unitInAction.reloadStatus === 0){
            const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
            unitInAction.firingAt = foundTarget;
            
            const shoot = shootTarget(unitInAction, foundTarget);
            unitInAction.reloadStatus = weapon.reloadSpeed;
          }  
        }     
        
        // ----- HUNT ORDER ------------
        if (unitInAction.order === 'hunt' && unitInAction.engaged.yes === false) {
          const weapon = searchStatsOfWeapon(unitInAction.details.rangedWeapons[0], 'ranged');
          const huntResult = hunt(unitInAction, unitInAction.target);
          let movDir;
          
          switch (huntResult.what) {
            
            case 'move to flank':
              
              startMoving(unitInAction, huntResult.flank);      
            break;  
              
            case 'shoot': 
              
              if (unitInAction.reloadStatus === 0) {
                
                unitInAction.reloadStatus = weapon.reloadSpeed;
                unitInAction.firingAt = unitInAction.target;
                shootTarget(unitInAction, unitInAction.target);
              } else {
              
                startMoving(unitInAction, huntResult.escape);
              }
            break; 
            
            case 'escape and shoot':
                          
              if (unitInAction.reloadStatus === 0) {
                
                unitInAction.reloadStatus = weapon.reloadSpeed;
                unitInAction.firingAt = unitInAction.target;
                shootTarget(unitInAction, unitInAction.target);
                startMoving(unitInAction, huntResult.escape);
              } else {
              
                startMoving(unitInAction, huntResult.escape);
              }
            break;
              
            case 'closer':
              
              startMoving(unitInAction, huntResult.direx);
            break;  
          }
        }   
        // ----- ENGAGE ORDER -----------
        if (unitInAction.order === 'engage' && unitInAction.engaged.yes === false) {
          // apply engage:
          const engageResult = engage(unitInAction, unitInAction.target);
          console.log('eResult: ', engageResult);
          
          if (engageResult.what === 'noLos'){ 
            
            const runSpeed = unitInAction.details.stats.m * 2;
          
            for (let iii = 0; iii < runSpeed; iii++){
              const moveAttempt = moveUnit(unitInAction, engageResult.flank);
                
              if (moveAttempt === 'collision'){
                unitInAction.notMovedInCombat = true;
              } else {
                  
                unitInAction.location = moveAttempt;
                unitInAction.notMovedInCombat = false;
                draw();
              }
            }             
          } else {
                 
            const runSpeed = unitInAction.details.stats.m * 2;
          
            for (let iii = 0; iii < runSpeed; iii++){
              const moveAttempt = moveUnit(unitInAction, engageResult.direx);
              
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
        
        // -----   MELEE ORDER  ---------
        /* maybe should change so that this applies to all, not only who have order melee... maybe whole melee order should be removed*/
        /* for now the melee order can stay, but i make so that it doesnt really do nothing itself*/
        /*
        
        // MELEE PHASE VERSION 2.0
        // gather all units: New gathering as some might have died in shooting.
        const forCheckUnitsM1 = gameObject.army1.concat([]);
        const forCheckUnitsM2 = gameObject.army2.concat([]);
        const allUnits = forCheckUnitsM1.concat(forCheckUnitsM2);
        */
        if (unitInAction.order === 'melee') {  // DELETE THIS LINE
          // apply melee attack:
          const meleeAttackAttempt = meleeAttack(unitInAction, unitInAction.engaged.withWho[0]);
          /* this bug too much. need to replace with something else... for example like:
          // find closest enemy:
          /* CAN USE THIS, however need to modificate a bit.:
          // check closest opponent
          for (let ii = 0; ii < enemyArmy.length; ii++) {
            const distance = distanceCheck(unitInAction.location, enemyArmy[ii].location);

            if (distance < closestEnemy.distance) {
              closestEnemy.number = ii;
              closestEnemy.distance = distance;
              closestEnemy.where = findDirection(unitInAction.location, enemyArmy[ii].location);
            }  
            // check if that is in melee range
              // if yes, then hit your melee attack
          }
          */
          
        
        }  // DELETE THIS LINE
      }
      
    }, speedOfRound);
    draw();
    // scroll battlelog:
    bLog.scrollTop = bLog.scrollHeight;
  }  
  // CHECK VICTORY CONDITIONS
  checkVictoryCondition();
}

// Prepare game:
function startGame(){
  // load selected armies from localStorage:
  const selected = JSON.parse(localStorage.getItem('Go'));
  
  // Campaign game:
  if (selected.campaignPlay === true) {
    gameObject = selected;
  } else { // Skirmish game:
    gameObject.army1 = selected.army1.units; gameObject.army2 = selected.army2.units;
    gameObject.factions[0] = selected.army1.chosenArmy; gameObject.factions[1] = selected.army2.chosenArmy;
    gameObject.terrain = selected.field;    
  } 
  
  // complete gameObject with unit stats
  const arm1 = gameObject.army1;
  const arm2 = gameObject.army2;
  let activeArmy = gameObject.army1;
  const copyOfOld = Object.assign({}, gameObject);
  
  for (let ind = 0; ind < arm1.length; ind++){
    const foundUnit = searchUnitByName(arm1[ind].unit, gameObject.factions[0]);
    arm1[ind].details = foundUnit;
  }  
  for (let ind2 = 0; ind2 < arm2.length; ind2++){
    const foundUnit = searchUnitByName(arm2[ind2].unit, gameObject.factions[1]);
    arm2[ind2].details = foundUnit;
  }
  
  // set x and y, commander, reloadStatus and id for all:
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
          activeArmy[i].reloadStatus = 0;
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
          activeArmy[i].reloadStatus = 0;
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
          activeArmy[i].reloadStatus = 0;
        } else {
          const lastUnit = i - 1;
          
          switch (i) {  // for line breaks:
            case 4: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
            case 8: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
            case 12: currentFile2 = currentFile2 - 40; activeArmy[i].location.x = gameObject.terrain.deploymentZone2.x;
            break;
            default: activeArmy[i].location.x = activeArmy[lastUnit].location.x - 130;
          }
          
          activeArmy[i].location.y = currentFile2;
          activeArmy[i].id = activeArmy[lastUnit].id + 1;
          activeArmy[i].commander = 'army2';
          activeArmy[i].reloadStatus = 0;
        }
      }
    }  
  }
  setStartLocations(arm1);
  setStartLocations(arm2);
  draw();
  createUnitButtons();
  
  // write info to bLog about how to play battle
  logScreen.innerHTML = tutorial; 
    
  console.log('start game ready, go: ', gameObject);
}

//  -------- ONLOAD:  ------------
window.onload = ()=> {
  startGame();
};