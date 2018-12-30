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
// GLOBALS:
let factions = []; // factions that are not knocked out, allocated at startCampaign
let player; // who is human player, allocated at startCampaign

// FUNCTIONS: 
function checkPlayer(){ // returns index number of players faction.
  for (let i = 0; i < factions.length; i++){
    if (player === factions[i].nombre){
      return i;
    }
  }
}

function countFactionUpkeep(army){
  let totalCount = 0;
  console.log('a ', army);
  for (let i = 0; i < army.length; i++){
    console.log('counting: q * p', army[i].quantity, army[i].details.stats.pointCost);
    totalCount = totalCount + army[i].quantity * army[i].details.stats.pointCost;
  }
  
  return totalCount;
}

function turnEngine(){

}

function clickControl(clickedButton){
  // by value of button make actions
}

function callUpdate(){  
  const playersFaction = factions[checkPlayer()];
  console.log('factions: ', factions);
  
  // check all units by all factions and pushes them to cities arrays
  for (let i = 0; i < cities.length; i++) {
    for (let ii = 0; ii < factions.length; ii++) {
      for (let iii = 0; iii < factions[ii].army.length; iii++){ // units at factions
        if (cities[i].nombre === factions[ii].army[iii].location){
          // if entering friendly or not guarded city
          if (cities[i].unitsByControlled.length < 1 || cities[i].unitsByControlled[0].commander === factions[ii].army[iii].commander){
            cities[i].unitsByControlled.push(factions[ii].army[iii]);
          } else { // if invader
            cities[i].unitsByInvaded.push(factions[ii].army[iii]);
          }  
        }
      }
    }
  }  
  // reset incomes:
  for (let y = 0; y < factions.length; y++) {
    factions[y].points = 0;    
  }
  // check controller of cities and give income:
  for (let yy = 0; yy < cities.length; yy++) {
    cities[yy].controlledBy = 'neutral'; // reset
    if (cities[yy].unitsByInvaded.length < 1 && cities[yy].unitsByControlled.length > 0) {
      cities[yy].controlledBy = cities[yy].unitsByControlled[0].commander;
      for (let ind = 0; ind < factions.length; ind++){
        if (factions[ind].nombre === cities[yy].controlledBy){
          factions[ind].points = factions[ind].points + cities[yy].income;
          console.log('points from ', cities[yy].nombre, ' to ', factions[ind].nombre);
        }
      }
    }
  }
  fillGrids(); // from public/campaignMap/mapScreen.js. Fills the map screen with grids
  // fill to side panel "console1", "YourIncome" and "YourArmy"
  document.getElementById('yourIncome').innerHTML = playersFaction.points + '<br> Upkeep cost of your army: <br>'+
  countFactionUpkeep(factions[checkPlayer()].army);
} // callUpdate() ends

  // check who you are
  
  // check how much is your income and write it to element: 'yourIncome'
  
  // make a list of your units and write them to element: 'yourArmy'
  // when unit is hovered show long desc and upkeep cost... maybe more info.

function addUnit(targetArmy, targetUnit, unitSize, location){
  let chosenArmy;
  let newDetails;
  const newUnit = {unit: targetUnit, id: null, location: {x: 0, y: 0, z: 0}, quantity: unitSize, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: targetArmy, details: null,
  firing: false, firingAt: null, notMovedInCombat: false, location: location, moved: false}; // army, unit, location and quantity... all else to default
  
  // set chosenArmy:
  switch (targetArmy){
    case 'humans':
      chosenArmy = gameObject.campaignArmies.humans.army;
      newDetails = searchUnitByName(targetUnit, humans);
    break;
    case 'elves':
      chosenArmy = gameObject.campaignArmies.elves.army;
      newDetails = searchUnitByName(targetUnit, elves);
    break;
    case 'dwarves':
      chosenArmy = gameObject.campaignArmies.dwarves.army;
      newDetails = searchUnitByName(targetUnit, dwarves);
    break;  
    default: console.log('cant find targetArmy at addUnit');  
  }
  newUnit.details = newDetails;
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

  addUnit('elves', 'Elven lord', 1, 'Centerwoods');
  addUnit('elves', 'Elven lord', 1, 'Whitetower');
  addUnit('elves', 'Elf ranger', 10, 'Centerwoods');
  addUnit('elves', 'Elf ranger', 10, 'Seagarden');
  
  addUnit('dwarves', 'Dwarf warchief', 1, 'Ironhall');
  addUnit('dwarves', 'Dwarf infantry', 10, 'Steelhammer');
  addUnit('dwarves', 'Dwarf infantry', 20, 'Southdig');
  addUnit('dwarves', 'Dwarf infantry', 20, 'Southdig');  
  // set chosen army as player in gameObject  
  // set playerIs:
  switch (selected){
    case 'humans':
      gameObject.campaignArmies.humans.player = true;
    break;
    case 'elves':
      gameObject.campaignArmies.elves.player = true;
    break;
    case 'dwarves':
      gameObject.campaignArmies.dwarves.player = true;
    break;  
    case 'vampires':
      gameObject.campaignArmies.vampires.player = true;
    break; 
    case 'savages':
      gameObject.campaignArmies.savages.player = true;
    break; 
    default: console.log('cant find selected at addUnit');  
  }
  player = selected;
  // set all and start turn 1.
  // push factions with units to: factions array
  factions.push(gameObject.campaignArmies.humans);
  factions.push(gameObject.campaignArmies.elves);
  factions.push(gameObject.campaignArmies.dwarves); /*
  factions.push(gameObject.campaignArmies.vampires);
  factions.push(gameObject.campaignArmies.savages); */
  
  callUpdate();
}
//  -------- ONLOAD:  ------------
window.onload = ()=> {
  startCampaign();
  //console.log('gO; ', gameObject);
  //console.log('cities ', cities);
};

/*  go: 

    campaignArmies: {  // points === income!
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