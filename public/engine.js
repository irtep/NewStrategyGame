
let pause = true; // starts as true
const gameLooper = setInterval(roundExecutor, 1000); // execute orders

// Event listeners
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);
const keyListeners = window.addEventListener("keydown", checkKeyPressed, false); 

// Functions:
function roundExecutor(){
  draw();
  if (pause === false){ 
    console.log('executing game round:');
    draw();
    // gather all units:
    const forCheckUnits1 = gameObject.army1.concat([]);
    const forCheckUnits2 = gameObject.army2.concat([]);
    const allUnits = forCheckUnits1.concat(forCheckUnits2);
    
    allUnits.sort(compare); // sort to initiative order
    
    setTimeout(() => { 
      console.log('move order executions'); 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        if (unitInAction.order === 'move' && unitInAction.engaged.yes === false) {
          for (let iii = 0; iii < unitInAction.details.stats.m; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
            } else {
              unitInAction.location = moveAttempt;
            }
          }  
        }
        if (unitInAction.order === 'run' && unitInAction.engaged.yes === false) {
          const runSpeed = unitInAction.details.stats.m * 2;
          
          for (let iii = 0; iii < runSpeed; iii++){
            const moveAttempt = moveUnit(unitInAction, unitInAction.target);
            if (moveAttempt === 'collision'){
            } else {
              unitInAction.location = moveAttempt;
            }
          }  
        }
      }
    }, 350);
    setTimeout(() => { 
      console.log('shoot/melee order executions'); 
      for (let i = 0; i < allUnits.length; i++) {
        const unitInAction = allUnits[i];
        
        if (unitInAction.order === 'shoot' && unitInAction.engaged.yes === false) {
          const shootAttempt = shootTarget(unitInAction, unitInAction.target);
        }  
        if (unitInAction.order === 'standby' && unitInAction.engaged.yes === false) {
        
        }  
        if (unitInAction.order === 'melee') {
        
        }
          
        if (unitInAction.order === 'standby' && unitInAction.engaged.yes === false) {
        
        }
        if (unitInAction.order === 'move' && unitInAction.engaged.yes === false) {
            
        }        
      }
      
    }, 450);
    draw();
  }  
}

function startGame(){
  // complete gameObject with unit stats
  const arm1 = gameObject.army1;
  const arm2 = gameObject.army2;
  
  for (let ind = 0; ind < arm1.length; ind++){
    const foundUnit = searchUnitByName(arm1[ind].unit, gameObject.factions[0]);
    arm1[ind].details = foundUnit;
  }  
  for (let ind2 = 0; ind2 < arm2.length; ind2++){
    const foundUnit = searchUnitByName(arm2[ind2].unit, gameObject.factions[1]);
    arm2[ind2].details = foundUnit;
  }
  
  draw();
  createUnitButtons();
}

// Calls:
startGame();