// js file for Main Menu:

function menuClick(clickedButton){
  switch (clickedButton){
    case 'Intro':
      console.log('clicked: ', clickedButton);
    break;
    case 'Start Campaign':
      console.log('clicked: ', clickedButton);
    break;
    case 'Continue Campaign':
      console.log('clicked: ', clickedButton);
    break;
    case 'Skirmish game':
      window.location = "https://thenewgame.glitch.me/skirmish"; 
    break;
    case 'Top players':
      console.log('clicked: ', clickedButton);
    break;  
    default: console.log('menuClick: not found clickedButton', clickedButton);  
  }
}

function hoverAction(hoveredButton){
  const info1 = document.getElementById('information1');
  info1.innerHTML = hoveredButton;
  info1.style["background"] = "white";
}

function outAction(){
  const info1 = document.getElementById('information1');
  info1.innerHTML = '';
  info1.style["background"] = "linear-gradient(black, #000033)";
}

