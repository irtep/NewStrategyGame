// nicknames for views/index.html elements
const infoBoxi = document.getElementById('infoBox');
const directions = document.getElementById('moveTargets');
const availCommands = document.getElementById('availCommands');

// directions buttons:
const directionsButtons = '<input type="button" id= "nw" class= "moveTargets" value= "nw" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "n" class= "moveTargets" value= "n" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "ne" class= "moveTargets" value= "ne" onclick= "clickedUnit2(this.value)"><br>'+
      '<input type="button" id= "w" class= "moveTargets" value= "w" onclick= "clickedUnit2(this.value)">'+
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
      '<input type="button" id= "e" class= "moveTargets" value= "e" onclick= "clickedUnit2(this.value)"><br>'+
      '<input type="button" id= "sw" class= "moveTargets" value= "sw" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "s" class= "moveTargets" value= "s" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "se" class= "moveTargets" value= "se" onclick= "clickedUnit2(this.value)"><br>';

// placeholder for selected command:
let selectedCommand;
// if the order is suppose to go all
let multiCommand = false; 

function executeAllCommand(whatCommand) {
  let commandForAll; // placeholder
  
  multiCommand = true;
  infoBoxi.innerHTML = '';
  availCommands.innerHTML = '';
  
  switch (whatCommand) {
    case 'All move':
      commandForAll = 'move';      
      infoBoxi.innerHTML = 'Select direction:'
      directions.innerHTML = directionsButtons;
    break;  
    case 'All run':
      commandForAll = 'run';      
      infoBoxi.innerHTML = 'Select direction:'
      directions.innerHTML = directionsButtons;  
    break;  
    case 'All standby':
      commandForAll = 'standby';
      infoBoxi.innerHTML = '';
      multiCommand = false; 
    break; 
    default: console.log('whatCommand not found in executeAllCommand');  
  }
  
  selectedCommand = commandForAll;
  
  if (selectedCommand === 'standby'){
    for (let i = 0; i < gameObject.army1.length; i++) {
      gameObject.army1[i].order = commandForAll;
    }
  }
}

// if player chooses to command all units at the same time
function commandAll() {
  console.log('command all');
  // clear fields:
  infoBoxi.innerHTML = 'Select command:';
  directions.innerHTML = '';
  availCommands.innerHTML = '<input type= "button" value= "All move" class= "commands" onclick= "executeAllCommand(this.value)"><br>'+
                            '<input type= "button" value= "All run" class= "commands" onclick= "executeAllCommand(this.value)"><br>'+
                            '<input type= "button" value= "All standby" class= "commands" onclick= "executeAllCommand(this.value)">';
}

function pauseGame(){ // pauses or continues the game
  const pButton = document.getElementById('pauseButton'); // at index.html
  if (pause === true){ // pause at public/start/engine.js
    pause = false;
    pButton.value = 'Pause game';
    console.log('pause off: ', pause);
  } else {
    pause = true;
    pButton.value = 'Continue game';
    console.log('pause on: ', pause);
  }
}

function setCommand(command){ // sets selected command
  selectedCommand = command;
  
  if (command === 'move' || command === 'run') {
    availCommands.innerHTML = '';
    infoBoxi.innerHTML = 'Select direction:'
    directions.innerHTML = directionsButtons;
  } 
  if (command === 'shoot'){
    infoBoxi.innerHTML = 'select target:';
    directions.innerHTML = '';
  }
  if (command === 'standby') {
    const selectedUnit = gameObject.selectedUnits.player1;
    gameObject.army1[selectedUnit].order = selectedCommand;
    availCommands.innerHTML = '';
    infoBoxi.innerHTML = '';
    directions.innerHTML = '';
  } 
  if (command === 'hunt'){
    infoBoxi.innerHTML = 'select target:';
    directions.innerHTML = '';
  } 
  if (command === 'engage'){
    infoBoxi.innerHTML = 'select target:';
    directions.innerHTML = '';
  }
}

function clickedUnit1(who){ // selected unit to be ordened
  multiCommand = false;
  gameObject.selectedUnits.player1 = who;
  infoBoxi.innerHTML = 'Select command:';
  availCommands.innerHTML = '';
// action buttons
  for (let i = 0; i < orders.length; i++){
    const currentName = orders[i];
    availCommands.innerHTML = availCommands.innerHTML + '<input type = "button" value='+currentName+ ' class= "commands" onclick="setCommand(this.value)" >' + '</input>'
    + '<br>'; 
  }  
}

function clickedUnit2(who){ // selected target
  const selectedUnit = gameObject.selectedUnits.player1; // public/gameObject.js
  //const targetedNumber = gameObject.targetedUnits.player1;  disabled as doesnt seem to do anything, but not erased just in case.
  //console.log('selected unit and targetedNumber: ', selectedUnit, targetedNumber);
  
  if (multiCommand === false){
    gameObject.targetedUnits.player1 = who;
    gameObject.army1[selectedUnit].order = selectedCommand;
    
    if (selectedCommand === 'run' || selectedCommand === 'move'){
      gameObject.army1[selectedUnit].target = who;
    } else { // in case of shooting.
      gameObject.army1[selectedUnit].target = gameObject.army2[who];
   }
  } else { // if multiCommand === true
    for (let i = 0; i < gameObject.army1.length; i++){
      gameObject.army1[i].order = selectedCommand;
      if (selectedCommand === 'run' || selectedCommand === 'move'){
        gameObject.army1[i].target = who;
      } else { // in case of shooting.
        gameObject.army1[i].target = gameObject.army2[who];
      }
    }
  }
}

function howerInPlayer1(who){
  gameObject.army1[who].highlighted = true;
  howerOut(who, 1);
  draw(); // at public/draw.js
}

function howerInPlayer2(who){
  gameObject.army2[who].highlighted = true;
  howerOut(who, 2);
  draw();
}

function howerOut(who, whichPlayer){
  setTimeout(() => {
    switch (whichPlayer) {
      case 1:
        gameObject.army1[who].highlighted = false;
      break;
      case 2:
        gameObject.army2[who].highlighted = false;
      break;
      default: console.log('whichplayer not found');  
    } 
  }, 3000);
}
 // unit buttons:
function createUnitButtons(){
  const p1units = document.getElementById('p1units');
  const p2units = document.getElementById('p2units');
  
  for (let i = 0; i < gameObject.army1.length; i++) {
    const nameOfTarget = gameObject.army1[i].unit
    p1units.innerHTML = p1units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit1('+ i + ') ' + 
    'onmouseover= howerInPlayer1('+ i + ')>' /*i +','+ */
  }
  for (let i = 0; i < gameObject.army2.length; i++) {
    const nameOfTarget = gameObject.army2[i].unit
    p2units.innerHTML = p2units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit2('+ i +') '+
    'onmouseover= howerInPlayer2('+ i +')>'
  }  
}

