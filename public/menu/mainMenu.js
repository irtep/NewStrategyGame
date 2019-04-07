// js file for Main Menu:

const info1 = document.getElementById('information1');
// if this is locked, moveOut doenst work:
let lockInfo1 = false; // is needed? check sometime...
let selectedArmy; // here comes the selected army if starts campaign.
let selectedName;
let selectedPassword = '';
// armies:
const availArmies = ['Humans', 'Elves', 'Dwarves', 'Savages', 'Vampires'];

function changeName(){

  selectedName = document.getElementById('generalsName').value;
}

function changePw(){
  const pw1 = document.getElementById('passw1').value;
  const pw2 = document.getElementById('passw2').value;
  
  if (pw1 === pw2 && pw1 !== '') {

    selectedPassword = document.getElementById('passw1').value;
  } else {
    
    console.log('not same');
  }
}

function menuClick(clickedButton){
  // lock info1 element:
  lockInfo1 = true;
  
  switch (clickedButton){
    case 'Intro':
      
      info1.innerHTML = 'Long peace has ended in Northern Lands. Ruthless giant warchief has the seized control of coastal town Tumbes '+
        ' from kingdom of humans and notorious vampire count has invaded peaceful dwarven town of Arequipa in southeast regions.<br><br>'+
        'Humans declare war to dwarves as they are blamed of arming the savage horde of giant warchief.'+ 
        ' As "reliable human witness" informs dwarf lord that elves have financed vampire counts private army, dwarves'+
        ' declare war to elves and elves to humans.<br><br> After long peace there are not really that many good '+
        'generals around so this might be your change to show the world how good you are and seize this opportunity'+
        ' to take control of all Northern Lands region to your beloved faction!';
    break;
    case 'Start Campaign':
      
      info1.innerHTML = 'Welcome general! <br><br>Your name:<br>' + 
      '<input type= "text" id= "generalsName" onchange = "changeName()"><br><br>'+
      'Choose password: <input type= "password" id= "passw1" onchange = "changePw(this.value)"><br>'+
      'Repeat password: <input type= "password" id= "passw2" onchange = "changePw(this.value)"><br><br>';
      
      info1.innerHTML = info1.innerHTML + 'Select army: <br>';
      
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
          case 'Savages':
            selectedArmy = 'savages';
          break;
          case 'Vampires':
            selectedArmy = 'vampires';
          break;
          default: console.log/(' army1 chosenArmy not found!');        
        }
          
        // make a start button if password match:
        if (selectedPassword !== '') {
            
          info1.innerHTML = info1.innerHTML + '<input type= "button" value= "Start campaign!" onclick= "menuClick(this.value)">'
          console.log('selected: ', selectedArmy);
        } else {
        
          info1.innerHTML = 'Password and repeat password are not matching or password field empty.';
          setTimeout(() => {
            menuClick('Start Campaign');
          }, 2000);
        }
        });
      }
    break;
    case 'Continue Campaign':
      console.log('clicked: ', clickedButton);
      // ask username and password
      // submit button.
      
      // on submit button make a html call to look for that game
      // if found start game with that gameObject
      checkDatabase('loadGame', 'usernameAndPassw here');
    break;
    case 'Skirmish game':
      window.location = "https://thenewgame.glitch.me/skirmish"; 
    break;
    case 'Top players':
      console.log('clicked: ', clickedButton);
      // make html call to ask for top15 players list
      checkDatabase('showHighscores');
    break;  
    case 'Start campaign!':
      
      const armyAndName = [selectedArmy, selectedName, selectedPassword];
      console.log(armyAndName);
      // save 'selectedArmy' to localStorage and start camp!
      localStorage.setItem('Go', JSON.stringify(armyAndName));
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

window.onload = ()=> {
  
  menuClick('Intro'); 
}