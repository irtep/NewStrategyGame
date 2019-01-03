// Campaign map screen js.
let factions = []; // factions that are not knocked out, allocated and mostly handled at startCampaign
const infoScreen = document.getElementById('infoScreen');
// Zones:
const cities = [
// constructor:  public/combat/contructors.js
  // human start cities: city(nombre, income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits
  new city('Crossroads', 100, 'Busy city in good strategic location', 'to be added..', 
           ['piece162', 'piece163', 'piece164'], 'human', [], [], 
           ['Centerwoods', 'Lurin', 'Arequipa', 'Lima']),
  new city('Riversend', 120, 'Wealthy port city. Good location', 'to be added..', ['piece136', 'piece137', 'piece155', 'piece156'], 'human', [], [],
          ['Lima', 'Seagarden', 'Centerwoods', 'Tumbes']),
  new city('Northfield', 90, 'Human northern city. Good connections', 'to be added..', ['piece88'], 'human', [], [],
          ['Centerwoods', 'Cajamarca', 'Lurin', 'Whitetower', 'Quito']),
  // elf cities:
  new city('Centerwoods', 100, 'Elf city in great center forest.', 'to be added..', ['piece104'], 'elf', [], [],
          ['Tumbes', 'Cajamarca', 'Northfield', 'Lurin', 'Crossroads', '<br>Riversend']),
  new city('Whitetower', 100, 'Old elven capital at tropical east forest.', 'to be added..', ['piece131', 'piece132', 'piece150', 'piece151'], 'elf', [], [],
          ['Quito', 'Arequipa', 'Lurin', 'Northfield']),
  new city('Seagarden', 110, 'Wealthy elven city.', 'to be added..', ['piece215', 'piece234'], 'elf', [], [],
          ['Riversend', 'Arequipa', 'Lima', 'Southdig']),
  // dwarf cities:
  new city('Ironhall', 100, 'Important dwarf stronghold in center north.', 'to be added..', ['piece8', 'piece27', 'piece28', 'piece9'], 'dwarf', [], [],
          ['Tumbes', 'Cajamarca', 'Steelhammer']),
  new city('Steelhammer', 100, 'Northeastern dwarf stronghold.', 'to be added..', ['piece15', 'piece16'], 'dwarf', [], [],
          ['Ironhall', 'Cajamarca', 'Quito']),
  new city('Southdig', 110, 'Southern rich dwarf city.', 'to be added..', ['piece242', 'piece243'], 'dwarf', [], [],
          ['Seagarden', 'Arequipa', 'Lima']),
  // neutral towns
  new city('Tumbes', 35, 'Bit remote location. But climate is nice and cool', 'to be added..', ['piece41'], 'neutral', [], [],
          ['Riversend', 'Centerwoods', 'Ironhall', 'Cajamarca']),
  new city('Cajamarca', 35, 'Northern neutral stronghold. good strategical location', 'to be added..', ['piece67'], 'neutral', [], [],
          ['Tumbes', 'Northfield', 'Centerwoods', 'Ironhall', '<br>Steelhammer']),
  new city('Quito', 35, 'Somewhat remote location, but must have if you want to control northeast.', 'to be added..', ['piece74'], 'neutral', [], [],
          ['Steelhammer', 'Northfield', 'Whitetower']),
  new city('Lurin', 135, 'Important neutral stronghold in center north.', 'to be added..', ['piece145'], 'neutral', [], [],
          ['Crossroads', 'Northfield', 'Centerwoods', 'Whitetower']),
  new city('Lima', 35, 'Who controls this can strike prettymuch everywhere in south.', 'to be added..', ['piece179'], 'neutral', [], [],
          ['Arequipa', 'Riversend', 'Crossroads', 'Seagarden']),
  new city('Arequipa', 35, 'Southern neutral stronghold. lots of roads from here.', 'to be added..', ['piece204'], 'neutral', [], [],
          ['Crossroads', 'Whitetower', 'Seagarden', 'Southdig', 'Lima'])
  
];

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
    case 'savages':
      getDetails = searchUnitByName(who, savages);
    break; 
    case 'vampires':
      getDetails = searchUnitByName(who, vampires);
    break; 
    default: console.log('cant find chosenFaction at showDetails');  
  }  
  document.getElementById('infoScreen').innerHTML = getDetails.longDesc;
}

function callUpdate(){  
  const playersFaction = factions[checkPlayer()];
  // reset cities unit arrays and
  // check all units by all factions and pushes them to cities arrays
  for (let i = 0; i < cities.length; i++) {
    cities[i].unitsByControlled = [];
    cities[i].unitsByinvaded = [];
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
          //console.log('points from ', cities[yy].nombre, ' to ', factions[ind].nombre);
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


// use this like this: countFactionUpkeep(factions[checkPlayer()].army);
function countFactionUpkeep(army){
  let totalCount = 0;
  for (let i = 0; i < army.length; i++){
    totalCount = totalCount + army[i].quantity * army[i].details.stats.pointCost;
  }
  
  return totalCount;
}

function checkPlayer(){ // returns index number of players faction.
  for (let i = 0; i < factions.length; i++){
    if (player === factions[i].nombre){
      return i;
    }
  }
}
function clearDetails(){
  infoScreen.innerHTML = '';
}

function addUnit(targetArmy, targetUnit, unitSize, location){
  //console.log('adding: ', targetArmy, targetUnit, unitSize, location);
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
    case 'savages':
      chosenArmy = gameObject.campaignArmies.savages.army;
      newDetails = searchUnitByName(targetUnit, savages);
    break;  
    case 'vampires':
      chosenArmy = gameObject.campaignArmies.vampires.army;
      newDetails = searchUnitByName(targetUnit, vampires);
    break;    
    default: console.log('cant find targetArmy at addUnit');  
  }
  newUnit.details = newDetails;
  chosenArmy.push(newUnit);
}

function controlButtons(pushedButton, par2, par3, par4){
  switch (pushedButton){
    case 'bought': // confirmation button for hire, after choosing deployment place
      let shoppingCart = gameObject.campaignArmies.shoppingCart;
      
      addUnit(factions[checkPlayer()].nombre, shoppingCart[2], shoppingCart[0], par2);
      clearDetails();
      callUpdate();
    break;  
    case 'hireUnits':
      const armyInChase = gameObject.campaignArmies.armyOfPlayer;
      let buttons = [];
      
      for (let i = 0; i < armyInChase.length; i++) {
        let forAdd;
        const totalPointCost = armyInChase[i].stats.pointCost * armyInChase[i].unitSize;
      
        forAdd = '<strong>' + armyInChase[i].unitSize + ' x ' + armyInChase[i].nombre + '</strong><br>' +
        'Point cost: ' + totalPointCost + '.<br>' +
        armyInChase[i].longDesc + '<br><input type= "button" name ="'+armyInChase[i].nombre+'" class= "adder" id= "shopping" value= "Add this unit." onclick = "controlButtons(this.id, '+ armyInChase[i].unitSize+ ', '+totalPointCost+', this.name)"><br>';
        buttons.push(forAdd);
      }
      infoScreen.innerHTML = buttons.join('<br>');      
    break;
    case 'moveUnits': // button at console. for moving units.
      const armyInC = factions[checkPlayer()].army;  
      let buttons1 = [];
      infoScreen.innerHTML = 'Choose unit you want to move: <br>';
      console.log('aic0' , armyInC);
      for (let i = 0; i < armyInC.length; i++) {
        let forAdd;
      
        forAdd = '<strong>' + armyInC[i].quantity + ' x ' + armyInC[i].unit + '</strong><br>' +
        'located: ' + armyInC[i].location + 
        '<br><input type= "button" name ="'+armyInC[i].unit+'" class= "adder" id= "mover" value= "Move this unit." onclick = "controlButtons(this.id, '+ i + ')"><br>';
        buttons1.push(forAdd);
      }
      infoScreen.innerHTML = infoScreen.innerHTML + buttons1.join('<br>');        
    break;
    case 'endOfTurn':
    break;
    case 'shopping': // buttons that appear, when player clicks "hire units"
      const currentCost = countFactionUpkeep(factions[checkPlayer()].army);
      const thisWouldCost = par3;
      const incomesNow = factions[checkPlayer()].points;
      const looseMoney = incomesNow - currentCost;
      
      if (looseMoney >= thisWouldCost) {
        infoScreen.innerHTML = 'Ok. Hired. Choose deployment area: ';
        console.log('f', factions);
        for (let i = 0; i < factions[checkPlayer()].controlling.length; i++) {
          infoScreen.innerHTML = infoScreen.innerHTML + '<br>' + 
          '<input name = "'+factions[checkPlayer()].controlling[i].nombre+'" id= "bought" value = "'+
          factions[checkPlayer()].controlling[i].nombre+'" onclick= "controlButtons(this.id, this.value)" class= "shopping">'; 
        }
        gameObject.campaignArmies.shoppingCart = [par2, par3, par4];
      } else {
        infoScreen.innerHTML = 'You can not afford this unit';
      }
    break;
    case 'mover': // when player chooses unit that he wants to move, he comes here. gets index number of unit.
      console.log('moving click: ', pushedButton, par2, par3, par4); // move 1
      console.log('options: ', factions[checkPlayer()].army[par2]);
      const who = factions[checkPlayer()].army[par2];
      let locAtm; // index number of city
      let exits = [];
      
      // find city where unit is to find out exits
      for (let i = 0; i < cities.length; i++) {
        if (who.location === cities[i].nombre){
          for (let ii = 0; ii < cities[i].exits.length; ii++){
            let newBut = '<input type= "button" id = "'+par2+'" value= "'+cities[i].exits[ii]+
            '" onclick = "moveTarget(this.id, this.value)" class= "shopping"'+ '<br>';
            exits.push(newBut);
          }
        }
      }
      // make exit buttons
      infoScreen.innerHTML = 'Where do you want to move this: <br>'+ exits;
      
    break;
    default: console.log('pushedButton not found at controlBottons!')  
  }
}  // controlButtons end.

function moveTarget(who, where){
  const whoIs = factions[checkPlayer()].army[who];
  console.log('move target called: ', who, where);
  whoIs.location = where;  // Atm. so, but will be so that adds unit "marching"
  callUpdate();
}

function hoverOnGrid(idOfPiece){
  for (let i = 0; i < cities.length; i++) {
    for (let ii = 0; ii < cities[i].zones.length; ii++) {
      if (cities[i].zones[ii] === idOfPiece){
        const cityInTurn = cities[i];
        
        infoScreen.innerHTML = '<strong>'+cityInTurn.nombre+'</strong><br>'+
        cityInTurn.shortDesc + '<br>' + 'Income: '+cityInTurn.income+
        '<br>Controlled by: '+ cityInTurn.controlledBy + '<br>'+
        'Units in zone: ';
        
        let activeArmy = [];
        for (let i4 = 0; i4 < cityInTurn.unitsByControlled.length; i4++) {
          let forAdd;
          let unitInTurn = cityInTurn.unitsByControlled[i4];
          const totalPointCost = unitInTurn.details.stats.pointCost * unitInTurn.quantity;
          
          forAdd = '<strong>' + unitInTurn.quantity + ' x ' + unitInTurn.unit+ '</strong></span>' + 
          '(cost: ' + totalPointCost + ')';
          activeArmy.push(forAdd);
        }
        infoScreen.innerHTML = infoScreen.innerHTML + activeArmy + '<br> Connected to:<br> '+ cityInTurn.exits;           
      }  
    }  
  }
}

function hoverOffGrid(idOfPiece){
  clearDetails();
}

// fill grids:
function fillGrids(){
  const maxElements = 247;
  const gridContainer = document.getElementById('gridContainer');
  
  for (let i = 0; i < maxElements; i++){
    let pieceInTurn;
    
    gridContainer.innerHTML = gridContainer.innerHTML + '<div class="item1" onmouseover= "hoverOnGrid(this.id)" id= "piece'+i
      +'" onmouseOut= "hoverOffGrid(this.id)"></div>';
    pieceInTurn = 'piece'+i;
    
      // paint city borders if this piece contains a city: 
    for (let ii = 0; ii < cities.length; ii++) {
      for (let iii = 0; iii < cities[ii].zones.length; iii++) {
        if (pieceInTurn === cities[ii].zones[iii]) {
          document.getElementById(pieceInTurn).setAttribute('class', cities[ii].controlledBy);
          // write label and other info:
          if (iii === 0) {
            // income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits
            document.getElementById(pieceInTurn).innerHTML = '<span class= "cityName">'+cities[ii].nombre+'</span><br>'+
              'Controlled by: '+ cities[ii].controlledBy;
          }
        }      
      }
    }
  }
}
