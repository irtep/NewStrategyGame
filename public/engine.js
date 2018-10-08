let pause = true; // starts as true
const gameLooper = setInterval(roundExecutor, 4000); // execute orders
const listenPause = document.getElementById('pauseButton').addEventListener("click", pauseGame);

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
  // prepare saving of object, by stringifiyng it:
  const gOstring = JSON.stringify(gameObject);
   // Save gameObject to sessionStorage
  sessionStorage.setItem('storedFile', gOstring);
  
}
startGame();