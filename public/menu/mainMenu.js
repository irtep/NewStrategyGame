// js file for Main Menu:

const info1 = document.getElementById('information1');
// if this is locked, moveOut doenst work:
let lockInfo1 = false;
let selectedArmy; // here comes the selected army if starts campaign.
// armies:
const availArmies = ['Humans', 'Elves', 'Dwarves'];

function menuClick(clickedButton){
  // lock info1 element:
  lockInfo1 = true;
  
  switch (clickedButton){
    case 'Intro':
      console.log('clicked: ', clickedButton);
    break;
    case 'Start Campaign':
      console.log('clicked: ', clickedButton);
      info1.innerHTML = 'Select army: <br>';
      
      // make army selection radiobuttons:
      for (let i = 0; i < availArmies.length; i++) {
        info1.innerHTML = info1.innerHTML + '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
      }

      // event listener for radio buttons above:
      const selector1 = document.selectArmyForm.army1;
      // placeholders for clicked radio buttons
      let clickedArmy;

      for (let i = 0; i < selector1.length; i++) {
        selector1[i].addEventListener('change', () => { 
        selectedArmy = selector1[i].value;
        info1.innerHTML = selector1[i].value +' selected. <br><br>';
    
        // make list of choosable units and convert to real army names:
        switch (selectedArmy){
          case 'Humans':
            selectedArmy = 'humans';
          break;
          case 'Elves':
            selectedArmy = 'elves';
          break;
          case 'Dwarves':
            selectedArmy = 'dwarves';
          break;
          default: console.log/(' army1 chosenArmy not found!');        
        }
        // make a start button:
        info1.innerHTML = info1.innerHTML + '<input type= "button" value= "Start campaign!" onclick= "menuClick(this.value)">'
        console.log('selected: ', selectedArmy);
        });
      }
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
    case 'Start campaign!':
        // save 'selectedArmy' to localStorage and start camp!
        localStorage.setItem('Go', JSON.stringify(selectedArmy));
        window.location = "https://thenewgame.glitch.me/mapscreen"; 
    break;  
    default: console.log('menuClick: not found clickedButton', clickedButton);  
  }
}

function hoverAction(hoveredButton){
  lockInfo1 = false;
  info1.innerHTML = hoveredButton; /*
  info1.style["background"] = "white";*/
}

function outAction(){
  if (lockInfo1 === false){
    info1.innerHTML = '';
  } /*
  info1.style["background"] = "linear-gradient(black, #000033)";*/
}

