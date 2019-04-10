// js file for Main Menu:

const info1 = document.getElementById('information1');
// if this is locked, moveOut doenst work:
let lockInfo1 = false; // is needed? check sometime...
let selectedArmy; // here comes the selected army if starts campaign.
let selectedName;
let selectedPassword = '';
let listOfGames = null;
// armies:
const availArmies = ['Humans', 'Elves', 'Dwarves', 'Savages', 'Vampires'];

function changeName(){

  selectedName = document.getElementById('generalsName').value;
}

function pwChecker(){
  selectedPassword = document.getElementById('passw1').value;
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

function loadGame(){    
  // get list from db about names and pws:
  const toDb = checkDatabase('loadGame');     
  let nameAndPwOk = false;
  let gameIndex = null;
  /*
  let selectedName;
let selectedPassword = '';
  */
      
  setTimeout(() => {

    for (let i = 0; i < listOfGames.length; i++){
      const gameToCheck = JSON.parse(listOfGames[i]);
      
      if (selectedName === gameToCheck.name && selectedPassword === gameToCheck.pw) {
        console.log('found name and pw!');
        nameAndPwOk = true;
        gameIndex = i;
      }
    }
    
    if (nameAndPwOk) {
      const loadedGame = JSON.parse(listOfGames[gameIndex]);
      // create gameOBject from info from db:
      gameObject.playerStats = loadedGame;
      gameObject.loadingGame = true; 
      // save gameObject to localStorage and start camp!
      localStorage.setItem('Go', JSON.stringify(gameObject));
      window.location = "https://thenewgame.glitch.me/mapscreen"; 
      
    } else {
      info1.innerHTML = 'Username or password wrong or maybe your game is not saved.'
    } 
  }, 2000);
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
      // clear possible old selections:
      selectedArmy = '';
      selectedName = '';
      selectedPassword = '';
      
      info1.innerHTML = 'Welcome general! <br><br>Your name:<br>' + 
      '<input type= "text" id= "generalsName" onchange = "changeName()"><br><br>'+
      'Choose password: <input type= "password" id= "passw1" onchange = "changePw(this.value)"><br>'+
      'Repeat password: <input type= "password" id= "passw2" onchange = "changePw(this.value)"><br><br>';
      
      info1.innerHTML = info1.innerHTML + 'Select army: <br>';
      
      // make army selection radiobuttons:
      for (let i = 0; i < availArmies.length; i++) {
        info1.innerHTML = info1.innerHTML + '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
      }
      
      // some tutorial stuff:
      info1.innerHTML = info1.innerHTML + '<span class= "blueText"><br> In campaign you have 50 turns times to do some conquest.<br>'+
        'choose name and password as in case you score atleast 5 wins in combat your progress will be saved and you can continue later.<br>'+
        'Note that if you have an earlier saved game with same name that you want to use now, the earlier game will be deleted as this will replace it. <br>'+
        'So if you want to start new game, and you have earlier saved one, use other name.<br><br>'+
        'The best result is that inside 20 turns you conquest all lands, but even if you survive for 20 turns is considered as a success.<br>'+
        'You also score some points by keeping your starting lands, kept "liberated lands" and from every victory and your victory percent.';

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
      // clear possible old selections:
      selectedArmy = '';
      selectedName = '';
      selectedPassword = '';
      
      info1.innerHTML = 'Welcome general! <br><br>Your name:<br>' + 
      '<input type= "text" id= "generalsName" onchange = "changeName()"><br><br>'+
      'Repeat password: <input type= "password" id= "passw1" onchange = "pwChecker()"><br><br>'+
      'please note that you must have had atleast 5 wins in campaign to get your game saved.'+
      '<input type= "button" onclick= "loadGame()" value= "Load game">';
      
      // on submit button make a html call to look for that game
      // if found start game with that gameObject
    break;
    case 'Skirmish game':
      window.location = "https://thenewgame.glitch.me/skirmish"; 
    break;
    case 'Top players':
      console.log('clicked: ', clickedButton);
      // make html call to ask for top15 players list
     // checkDatabase('showHighscores');
    break;  
    case 'Start campaign!':
      
      let nameInUse = false;
      const armyAndName = [selectedArmy, selectedName, selectedPassword];
      // get list from db about names and pws:
      const toDb = checkDatabase('showGames');     
      
      setTimeout(() => {
        console.log('lisfOfGames', listOfGames);
        for (let i = 0; i < listOfGames.names.length; i++){
          
          if (selectedName === listOfGames.names[i]) {
          
            console.log('found name index: ', i);
            // found name in used names.
            nameInUse = true;
      
            if (selectedPassword === listOfGames.pws[i]) {
            
              // but password ok!
              nameInUse = false;
              console.log('pw ok!');
            }
          }
        }
        
        if (nameInUse === true) {
        
          info1.innerHTML = 'Name you chose is already in use, with no password match.'
        } else {
          
      // new name or password matches with old name, all good to go.    
      // save 'selectedArmy' to localStorage and start camp!
      localStorage.setItem('Go', JSON.stringify(armyAndName));
      window.location = "https://thenewgame.glitch.me/mapscreen"; 
        }
      }, 2000);
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