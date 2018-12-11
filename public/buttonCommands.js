// nicknames for views/index.html elements
const infoBoxi = document.getElementById('infoBox');
const directions = document.getElementById('moveTargets');
const availCommands = document.getElementById('availCommands');

// placeholder for selected command:
let selectedCommand;

function commandAll() {
  console.log('command all');
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
    directions.innerHTML = '<input type="button" id= "nw" class= "moveTargets" value= "nw" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "n" class= "moveTargets" value= "n" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "ne" class= "moveTargets" value= "ne" onclick= "clickedUnit2(this.value)"><br>'+
      '<input type="button" id= "w" class= "moveTargets" value= "w" onclick= "clickedUnit2(this.value)">'+
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
      '<input type="button" id= "e" class= "moveTargets" value= "e" onclick= "clickedUnit2(this.value)"><br>'+
      '<input type="button" id= "sw" class= "moveTargets" value= "sw" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "s" class= "moveTargets" value= "s" onclick= "clickedUnit2(this.value)">'+
      '<input type="button" id= "se" class= "moveTargets" value= "se" onclick= "clickedUnit2(this.value)"><br>'
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
}

function clickedUnit1(who){ // selected unit to be ordened
  gameObject.selectedUnits.player1 = who;
  infoBoxi.innerHTML = 'Select command:';
// action buttons
  for (let i = 0; i < orders.length; i++){
    const currentName = orders[i];
    availCommands.innerHTML = availCommands.innerHTML + '<input type = "button" value='+currentName+ ' class= "commands" onclick="setCommand(this.value)" >' + '</input>'
    + '<br>'; 
  }  
}

function clickedUnit2(who){ // selected target
  const selectedUnit = gameObject.selectedUnits.player1; // public/gameObject.js
  gameObject.targetedUnits.player1 = who;
  const targetedNumber = gameObject.targetedUnits.player1;
  gameObject.army1[selectedUnit].order = selectedCommand;

  if (selectedCommand === 'run' || selectedCommand === 'move'){
    gameObject.army1[selectedUnit].target = who;
  } else { // in case of shooting.
    gameObject.army1[selectedUnit].target = gameObject.army2[targetedNumber];
  }
}

function howerInPlayer1(who){
  gameObject.army1[who].highlighted = true;
  howerOut(who, 1);
  draw();
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

