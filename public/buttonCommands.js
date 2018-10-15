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

function clickedUnit(who){
  console.log('clicked: ', who);
}

function howerInPlayer1(who){
  console.log('howeredIn1: ', who);
  gameObject.army1[who].highlighted = true;
  howerOut(who, 1);
  draw();
}

function howerInPlayer2(who){
  console.log('howeredIn2', who);
  gameObject.army2[who].highlighted = true;
  howerOut(who, 2);
  draw();
}

function howerOut(who, whichPlayer){
  setTimeout(() => {
    switch (whichPlayer) {
      case 1:
        gameObject.army1[who].highlighted = false;
        console.log(who, ' hl set to false');
      break;
      case 2:
        gameObject.army2[who].highlighted = false;
        console.log(who, ' h2 set to false');
      break;
      default: console.log('whichplayer not found');  
    } 
  }, 3000);
}

function createUnitButtons(){
  const p1units = document.getElementById('p1units');
  const p2units = document.getElementById('p2units');
  
  for (let i = 0; i < gameObject.army1.length; i++) {
    const nameOfTarget = gameObject.army1[i].unit
    p1units.innerHTML = p1units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit('+ i + ') ' + 
    'onmouseover= howerInPlayer1('+ i + ')>' /*i +','+ */
  }
  for (let i = 0; i < gameObject.army2.length; i++) {
    const nameOfTarget = gameObject.army2[i].unit
    p2units.innerHTML = p2units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit('+ i +') '+
    'onmouseover= howerInPlayer2('+ i +')>'
  }  
}
/*
onmouseout has some problem!
onmouseover="bigImg(this)" onmouseout="normalImg(this)"
*/