
// GLOBALS:
// factions and cities globals are at mapScreen.js
let player; // who is human player, allocated at startCampaign

// FUNCTIONS: 

function showDetails(who){
  // checks who is player and his faction
  const chosenFaction = factions[checkPlayer()].nombre;
  let getDetails;
  
  switch (chosenFaction){
    case 'humans':
      getDetails = searchUnitByName(who, humans);
    break;
    case 'elves':
      getDetails = searchUnitByName(who, elves);
    break;
    case 'dwarves':
      getDetails = searchUnitByName(who, dwarves);
    break;  
    default: console.log('cant find chosenFaction at showDetails');  
  }  
  document.getElementById('infoScreen').innerHTML = getDetails.longDesc;
}

function turnEngine(){

}

function clickControl(clickedButton){
  // by value of button make actions
}

function callUpdate(){  
  const playersFaction = factions[checkPlayer()];
  
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
  // reset incomes and controls:
  for (let y = 0; y < factions.length; y++) {
    factions[y].points = 0;    
    factions[y].controlling = [];
  }
  // check controller of cities and give income and add to controlled array:
  for (let yy = 0; yy < cities.length; yy++) {
    cities[yy].controlledBy = 'neutral'; // reset
    if (cities[yy].unitsByInvaded.length < 1 && cities[yy].unitsByControlled.length > 0) {
      cities[yy].controlledBy = cities[yy].unitsByControlled[0].commander;
      for (let ind = 0; ind < factions.length; ind++){
        if (factions[ind].nombre === cities[yy].controlledBy){
          factions[ind].points = factions[ind].points + cities[yy].income;
          factions[ind].controlling.push(cities[yy]);
          console.log('points from ', cities[yy].nombre, ' to ', factions[ind].nombre);
        }
      }
    }
  }
  fillGrids(); // from public/campaignMap/mapScreen.js. Fills the map screen with grids
  
  // fill to side panel "console1", "YourIncome" 
  document.getElementById('yourIncome').innerHTML = playersFaction.points + '<br> Upkeep cost of your army: <br>'+
  countFactionUpkeep(factions[checkPlayer()].army);
  // fill  "YourArmy"
  let activeArmy = [];
  for (let i4 = 0; i4 < factions[checkPlayer()].army.length; i4++) {
    let forAdd;
    let unitInTurn = factions[checkPlayer()].army[i4];
    const totalPointCost = unitInTurn.details.stats.pointCost * unitInTurn.quantity;
      
    forAdd = '<strong><span id= "'+unitInTurn.unit+'" onmouseover= "showDetails(this.id)" onmouseout = "clearDetails()">' +
      unitInTurn.quantity + ' x ' + unitInTurn.unit+ '</strong></span><br>' + 'upkeep cost: ' + 
      totalPointCost + '<br>'+ 'at '+ unitInTurn.location + '<br>';
    activeArmy.push(forAdd); 
  }
  document.getElementById('yourArmy').innerHTML = activeArmy.join('<br>');
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