
let pause = true; // starts as true
const gameLooper = setInterval(roundExecutor, 4000); // execute orders

// Event listeners
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);
/*
const unitButtonClass = document.getElementsByClassName("units");
// listen all with class units for clicks
for (var i = 0; i < unitButtonClass.length; i++) {
    unitButtonClass[i].addEventListener('click', clickedUnit, false);
}
// listen all with class units for hover
for (var i = 0; i < unitButtonClass.length; i++) {
    unitButtonClass[i].addEventListener('click', howeredUnit, false);
}
*/
// Functions:
function roundExecutor(){
  console.log('new round starts');
  draw();
  if (pause === false){
    
    draw();
  
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
  console.log('startGame fired.');

  draw();
  createUnitButtons();
  // prepare saving of object, by stringifiyng it:
  /*Not needed as moved gameObject to global
  const gOstring = JSON.stringify(gameObject);
   // Save gameObject to sessionStorage
  sessionStorage.setItem('storedFile', gOstring); 
  */
}

// Calls:
startGame();