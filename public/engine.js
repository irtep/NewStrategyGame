
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
  if (pause === false){
    // load gameObject from sessionstorage
    const gameObjectRaw = sessionStorage.getItem('storedFile');
    const gameObject = JSON.parse(gameObjectRaw); 
    
    draw(gameObject);
  
    setTimeout(() => { 
      console.log('move order executions'); 
    }, 1000);
    setTimeout(() => { 
      console.log('shoot order executions'); 
    }, 2000);
    
    draw(gameObject);
  }  
}

function startGame(){ 
  console.log('startGame fired.');
  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [imperials, imperials], // player 1: 0 player 2: 1.
    army1: [{unit: 'Guardsman', id: 1, location: {x: 100, y: 10, z: 0}, quantity: 10, order: 'standby', target: null, engaged: null,
            joinedCharacters: []},
            {unit: 'Grizzly battletank', id: 2, location: {x: 250, y: 100, z: 0}, quantity: 1, order: 'standby', target: null, engaged: null,
            joinedCharacters: []}
           ],
    army2: [{unit: 'Guardsman', id: 1, location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', targeted: null, engaged: null,
            joinedCharacters: []},
            {unit: 'Grizzly battletank', id: 2, location: {x: 330, y: 510, z: 0}, quantity: 1, order: 'standby', target: null, engaged: null,
            joinedCharacters: []}
           ]  
    // Add terrain elements.
  };
  draw(gameObject);
  createUnitButtons(gameObject)
  // prepare saving of object, by stringifiyng it:
  const gOstring = JSON.stringify(gameObject);
   // Save gameObject to sessionStorage
  sessionStorage.setItem('storedFile', gOstring); 
  // Los and range checker test:
  const testWhere = {x: 100, y: 100};
  const testTo = {x: 320, y: 23};
  losAndRangeCheck(testWhere, testTo, gameObject);
}

// Calls:
startGame();
console.log('los and range check test: ');