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

function howeredUnit(who){
  console.log('howered: ', who);
}

function createUnitButtons(gameObject){
  const p1units = document.getElementById('p1units');
  const p2units = document.getElementById('p2units');
  
  for (let i = 0; i < gameObject.army1.length; i++) {
    const nameOfTarget = gameObject.army1[i].unit
    p1units.innerHTML = p1units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit('+ i +')>'
  }
  for (let i = 0; i < gameObject.army2.length; i++) {
    const nameOfTarget = gameObject.army2[i].unit
    p2units.innerHTML = p2units.innerHTML + '<br><input type= "button" id= "unit'+ i +'button" class= "units" value= "'+ 
    nameOfTarget +'" onclick= clickedUnit('+ i +')>'
  }  
}
/*
onmouseover="bigImg(this)" onmouseout="normalImg(this)"
*/