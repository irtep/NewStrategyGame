
// GLOBALS:
// factions and cities globals are at mapScreen.js
// most of commands are there too.
let player; // who is human player, allocated at startCampaign

// FUNCTIONS: 

function turnEngine(){

}

function clickControl(clickedButton){
  // by value of button make actions
}

function startCampaign(){
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
  startCampaign();
  //console.log('gO; ', gameObject);
  //console.log('cities ', cities);
};
