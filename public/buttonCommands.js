
function pauseGame(){
  const pButton = document.getElementById('pauseButton');
  if (pause === true){
    pause = false;
    pButton.value = 'Pause game';
    console.log('pause off: ', pause);
  } else {
    pause = true;
    pButton.value = 'Continue game';
    console.log('pause on: ', pause);
  }
}

function setCommand(command){
  const selectedUnit = gameObject.selectedUnits.player1;
  const targetedNumber = gameObject.targetedUnits.player1;
  const ifNan = isNaN(targetedNumber);
  let targetedUnit;
  if (ifNan === true) {
    targetedUnit = targetedNumber;
  } else {
    targetedUnit = gameObject.army2[targetedNumber];
  }
  
  gameObject.army1[selectedUnit].order = command;
  gameObject.army1[selectedUnit].target = targetedUnit;
}

function clickedUnit1(who){
  gameObject.selectedUnits.player1 = who;
}

function clickedUnit2(who){
  gameObject.targetedUnits.player1 = who;
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
// action buttons
for (let i = 0; i < orders.length; i++){
  const availCommands = document.getElementById('availCommands');
  const currentName = orders[i];
  availCommands.innerHTML = availCommands.innerHTML + '<input type = "button" value='+currentName+ ' class= "commands" onclick="setCommand(this.value)" >' + '</input>'
  + '<br>'; 
}