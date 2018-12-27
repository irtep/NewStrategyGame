/*
Listen clicks of cities:

If city is hovered:
Show who is in city.

If city is clicked:

If city is controlled by you. Give list of units as in combat and control buttons:
Control buttons:
move unit from here -> select target, then: paint legal moves. and give list of legal moves.
hire units -> where -> who
End turn button, when doesnt want to move or hire anymore.

*/
function clickControl(clickedButton){
  // by value of button make actions
}

function updateConsole(){
  // check who you are
  
  // check how much is your income and write it to element: 'yourIncome'
  
  // make a list of your units and write them to element: 'yourArmy'
  // when unit is hovered show long desc and upkeep cost... maybe more info.
}

function addUnit(targetArmy, targetUnit, unitSize, location){
  let chosenArmy;
  const newUnit = {unit: targetUnit, id: null, location: {x: 0, y: 0, z: 0}, quantity: unitSize, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: targetArmy, details: null,
  firing: false, firingAt: null, notMovedInCombat: false, location: location, moved: false}; // army, unit, location and quantity... all else to default
  
  // set chosenArmy:
  switch (targetArmy){
    case 'humans':
      chosenArmy = gameObject.campaignArmies.humans.army;
    break;
    case 'elves':
      chosenArmy = gameObject.campaignArmies.elves.army;
    break;
    case 'dwarves':
      chosenArmy = gameObject.campaignArmies.dwarves.army;
    break;  
    default: console.log('cant find targetArmy at addUnit');  
  }
  chosenArmy.push(newUnit);
}

function startCampaign(){
  // load selected army from localStorage:
  const selected = JSON.parse(localStorage.getItem('Go'));
  
  // create armies for all players and allocate them to cities.
  addUnit('humans', 'Knight commander', 1, 'Crossroads');
  addUnit('humans', 'Crossbowman', 10, 'Riversend');
  addUnit('humans', 'Peasant', 20, 'Northfield');
  addUnit('humans', 'Peasant', 20, 'Northfield');
  // set chosen army as player in gameObject  
  // set playerIs:
  switch (selected){
    case 'humans':
      gameObject.campaignArmies.humans.player = 'humans';
    break;
    case 'elves':
      gameObject.campaignArmies.elves.player = 'elves';
    break;
    case 'dwarves':
      gameObject.campaignArmies.dwarves.player = 'dwarves';
    break;  
    default: console.log('cant find selected at addUnit');  
  }
  // set all and start turn 1.
}
startCampaign();
console.log('gO; ', gameObject);
/*  go: 

    campaignArmies: {
      humans: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      elves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      dwarves: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      vampires: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false},
      savages: {army: [], points: 0, controlling: [], victoryPoints: 0, achievements: [], player: false}
    },
*/
/* units:
Humans:
Knight commander
Knight
Swordsman
Crossbowman
Longbowman
Peasant

Elves:
Elven lord
Green dragon
Elf ranger
Elven archer
Elf rider
Swordmaster
Unicorn

Dwarves:
Dwarf war chief
Dwarf infantry
Mountain guardian
Steel golem
Steamtank


*/