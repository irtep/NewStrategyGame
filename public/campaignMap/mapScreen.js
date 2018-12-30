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

function controlButtons(pushedButton, par2, par3, par4){
  switch (pushedButton){
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
    case 'moveUnits':
    break;
    case 'endOfTurn':
    break;
    case 'shopping':
      console.log('shopping: ', par2, par3, par4);
      // check if you have money for this selection:
      const currentCost = countFactionUpkeep(factions[checkPlayer()].army);
      const thisWouldCost = par3;
      const incomesNow = factions[checkPlayer()].income;
      const looseMoney = incomesNow - currentCost;
      console.log(looseMoney);  // BUG HERE! SAYS THAT IT IS NOT A NUMBER
      if (looseMoney <= thisWouldCost) {
        infoScreen.innerHTML = 'Ok. Hired. Choose deployment area: ';
        gameObject.campaignArmies.shoppingCart = [par2, par3, par4];
      } else {
        infoScreen.innerHTML = 'You can not afford this unit';
      }
    break;
    default: console.log('pushedButton not found at controlBottons!')  
  }
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
          activeArmy.push(forAdd); console.log('pushed: ', activeArmy);
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
