
// most of commands are there too.
let player; // who is human player, allocated at startCampaign

// FUNCTIONS: 

function startCampaign(){
  const cities = gameObject.campaignArmies.cities; // cities
  const factions = gameObject.campaignArmies.factions;
  // mark this as campaign play:
  gameObject.campaignPlay = true;
  // load selected army from localStorage:
  const selected = JSON.parse(localStorage.getItem('Go'));
  
  // create armies for all players and allocate them to cities. at mapScreen.js
  addUnit('humans', 'Knight commander', 1, 'Crossroads');
  addUnit('humans', 'Crossbowman', 10, 'Riversend');
  addUnit('humans', 'Peasant', 20, 'Northfield');
  addUnit('humans', 'Peasant', 20, 'Northfield');

  addUnit('elves', 'Elven lord', 1, 'Centerwoods');
  addUnit('elves', 'Elven lord', 1, 'Whitetower');
  addUnit('elves', 'Elf ranger', 10, 'Centerwoods');
  addUnit('elves', 'Elf ranger', 10, 'Seagarden');
  
  addUnit('dwarves', 'Dwarf warchief', 1, 'Ironhall');
  addUnit('dwarves', 'Dwarf infantry', 10, 'Steelhammer');
  addUnit('dwarves', 'Steel golem', 1, 'Southdig');
  
  addUnit('savages', 'Giant warchief', 1, 'Tumbes');
  addUnit('savages', 'Hill giant', 1, 'Tumbes');
  addUnit('savages', 'Viking raider', 10, 'Tumbes');
  addUnit('savages', 'Peasant rebel', 20, 'Tumbes');
  
  addUnit('vampires', 'Vampire lord', 1, 'Arequipa');
  addUnit('vampires', 'Zombie', 30, 'Arequipa');
  addUnit('vampires', 'Vampire rider', 5, 'Arequipa');
  addUnit('vampires', 'Zombie', 30, 'Arequipa');
  // set chosen army as player in gameObject  
  // set playerIs:
  switch (selected){
    case 'humans':
      gameObject.campaignArmies.humans.player = true;
      gameObject.campaignArmies.armyOfPlayer = humans;
    break;
    case 'elves':
      gameObject.campaignArmies.elves.player = true;
      gameObject.campaignArmies.armyOfPlayer = elves;
    break;
    case 'dwarves':
      gameObject.campaignArmies.dwarves.player = true;
      gameObject.campaignArmies.armyOfPlayer = dwarves;
    break;  
    case 'vampires':
      gameObject.campaignArmies.vampires.player = true;
      gameObject.campaignArmies.armyOfPlayer = vampires;
    break; 
    case 'savages':
      gameObject.campaignArmies.savages.player = true;
      gameObject.campaignArmies.armyOfPlayer = savages;
    break; 
    default: console.log('cant find selected at addUnit');  
  }
  player = selected;
  // set all and start turn 1.
  // push factions with units to: factions array
  factions.push(gameObject.campaignArmies.humans);
  factions.push(gameObject.campaignArmies.elves);
  factions.push(gameObject.campaignArmies.dwarves); 
  factions.push(gameObject.campaignArmies.vampires);
  factions.push(gameObject.campaignArmies.savages);
  
  callUpdate();
}
//  -------- ONLOAD:  ------------
window.onload = ()=> {
  
  // load gameObject from localStorage:
  //gameObject = JSON.parse(localStorage.getItem('Go'));
  checki = JSON.parse(localStorage.getItem('Go'));
  
  // if first turn then saved localStorage item indicates the chosen race.
  if (checki === 'humans' ||
     checki === 'elves' ||
      checki === 'dwarves' ||
      checki === 'savages' ||
      checki === 'vampires'
     ) {
    gameObject.turn++;
    startCampaign();
    makeButtons(gameObject.phaze);
  } 
  else { // but if not, then campaign is going on.
    gameObject = JSON.parse(localStorage.getItem('Go'));
    callUpdate();
    // Check if cities are still contested:
    
    const contestedCities = [];
      
    for (let i = 0; i < gameObject.campaignArmies.cities.length; i++){
        
      if (gameObject.campaignArmies.cities[i].controlledBy === 'contested') {
        contestedCities.push(gameObject.campaignArmies.cities[i]);
      }
    }
    
    // if any is contested, lets go to settle them at endTurn
    if (contestedCities.length > 0){
      // save 'selected' to localStorage
      localStorage.setItem('Go', JSON.stringify(gameObject));
      window.location = "https://thenewgame.glitch.me/endTurn";        
    } else {
          
      infoScreen.innerHTML = ' Turn: ' + gameObject.turn;
      gameObject.phaze = 'hire';
      makeButtons(gameObject.phaze);
      callUpdate();
    }
    
  }
  
  callUpdate();
};
//