
let pause = true; // starts as true
const gameLooper = setInterval(roundExecutor, 4000); // execute orders

// Event listeners
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);

// Functions:
function roundExecutor(){
  console.log('new round starts');
  draw();
  if (pause === false){    
    draw();
    // gather all units:
    const forCheckUnits1 = gameObject.army1.concat([]);
    const forCheckUnits2 = gameObject.army2.concat([]);
    const allUnits = forCheckUnits1.concat(forCheckUnits2);
    
    // get ini values:
    for (let i = 0; i < allUnits.length; i++){
      let objecti;
      
      if (allUnits[i].commander === 'army1'){
        objecti = gameObject.factions[0];
      } else { objecti = gameObject.factions[1]}
      
      const theUnit = searchUnitByName(allUnits[i].unit, objecti);
      allUnits[i].ini = theUnit.stats.i;
    }
    allUnits.sort(compare);
    
    console.log('allunits: ', allUnits);
    setTimeout(() => { 
      console.log('move order executions'); 
    }, 1000);
    setTimeout(() => { 
      console.log('shoot/melee order executions'); 
    }, 2000);
    draw();
  }  
}

function startGame(){
  draw();
  createUnitButtons();
}
// Calls:
startGame();