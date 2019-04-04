// Campaign map screen js.
// factions that are not knocked out, allocated and mostly handled at startCampaign
const infoScreen = document.getElementById('infoScreen');

// random dice
function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

function checkIfOver(gameObject) {
  let playerIsLiving = true;
  const factions = [];
  const eliminatedFactions = [];
  
  if (gameObject.campaignArmies.humans.army.length > 0) {
    factions.push(gameObject.campaignArmies.humans);
  } else {
    eliminatedFactions.push(gameObject.campaignArmies.humans);
  }
  if (gameObject.campaignArmies.elves.army.length > 0) {
    factions.push(gameObject.campaignArmies.elves);
  } else {
    eliminatedFactions.push(gameObject.campaignArmies.elves);
  }
  if (gameObject.campaignArmies.dwarves.army.length > 0) {
    factions.push(gameObject.campaignArmies.dwarves);
  } else {
    eliminatedFactions.push(gameObject.campaignArmies.dwarves);
  }
  if (gameObject.campaignArmies.savages.army.length > 0) {
    factions.push(gameObject.campaignArmies.savages);
  } else {
    eliminatedFactions.push(gameObject.campaignArmies.savages);
  }
  if (gameObject.campaignArmies.vampires.army.length > 0) {
    factions.push(gameObject.campaignArmies.vampires);
  } else {
    eliminatedFactions.push(gameObject.campaignArmies.vampires);
  }
  
  // check if player is lost
  for (let i = 0; i < eliminatedFactions.length; i++) {
    
    // check if player is here.
    console.log('comparing: ', eliminatedFaction[i].army[0].commander, gameObject.playerStats.faction);
    if (eliminatedFaction[i].army[0].commander == gameObject.playerStats.faction) {
      
      console.log('player eliminated!');
      // end the game.
    }  
  }
  
  // check if max rounds are reached:
  if (gameObject.turn > 34) {  
    // max turn reached. End the game->
    console.log('max turn reached!');
  }
  
  // check if player won:
  console.log('comparing 2: ', factions[0].army[0].commander, gameObject.playerStats.faction);
  if (factions.length == 1 && factions[0].army[0].commander == gameObject.playerStats.faction) {
    console.log('player won by conquest!');
  }
  
  console.log('game continues: player check, facs, elim: ', factions, eliminatedFactions);
  // should return true or false or just directly end it...
}

function makeButtons(phaze){
  const buttonPlace = document.getElementById('buttonPlace');

  switch (phaze) {
    case 'hire':
      buttonPlace.innerHTML = '<input type= "button" id= "hireUnits" value= "Hire units" onclick= "controlButtons(this.id)"><br>'+
      '<input type= "button" id= "endOfTurn" value= "End phase" onclick= "controlButtons(this.id)"><br><br>'; 
      
      // here add info about hire phase to infoScreen.innerHTML
      infoScreen.innerHTML = '<span class= "blueText">Hire phase: Use this phase to hire units. Do not save your money. Whatever you'+
        ' save will go to other expenses and you will not see it again. When ready, just click "End phase"</span>';
    break;
      
    case 'move':
      buttonPlace.innerHTML = '<input type= "button" id= "moveUnits" value= "Move units" onclick= "controlButtons(this.id)"><br>'+
      '<input type= "button" id= "endOfTurn" value= "End phase" onclick= "controlButtons(this.id)"><br><br>'; 
      
      // here add info about move phase to infoScreen.innerHTML
      infoScreen.innerHTML = '<span class= "blueText">Move phase: Use this phase to move units. To attack area, just move units there'+
        '  When ready, just click "End phase".</span>';
    break;
      
    default: console.log('phaze not found in makeButtons');  
  }
}

// to refresh factions array, where all armies are nicely piled up.
function updateFactions(){
  const factions = gameObject.campaignArmies.factions;
  
  // clear + fill:
  factions.splice(0, factions.length);
  
  factions.push(gameObject.campaignArmies.humans);
  factions.push(gameObject.campaignArmies.elves);
  factions.push(gameObject.campaignArmies.dwarves); 
  factions.push(gameObject.campaignArmies.vampires);
  factions.push(gameObject.campaignArmies.savages);
}

function showDetails(who){
  const factions = gameObject.campaignArmies.factions;
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

function consoleUpdate(resetMoves){
  // fill  "YourArmy"
  let activeArmy = [];
  const factions = gameObject.campaignArmies.factions;
  
  for (let i4 = 0; i4 < factions[checkPlayer()].army.length; i4++) {
    let forAdd;
    let unitInTurn = factions[checkPlayer()].army[i4];
    const totalPointCost = unitInTurn.details.stats.pointCost * unitInTurn.quantity;
    let werbNeeded;
    
    if (resetMoves) {
      unitInTurn.moved = false;
    }
    
    if (unitInTurn.moved === false){ werbNeeded = ' at '} else { werbNeeded = ' is marching to '}; 
      
    forAdd = '<strong><span id= "'+unitInTurn.unit+'" onmouseover= "showDetails(this.id)" onmouseout = "clearDetails()">' +
      unitInTurn.quantity + ' x ' + unitInTurn.unit+ '</strong></span><br>' + 'upkeep cost: ' + 
      totalPointCost + '<br>'+ werbNeeded + unitInTurn.location + '<br>';
    activeArmy.push(forAdd); 
  }
  document.getElementById('yourArmy').innerHTML = 'Your army: <br><br>' + activeArmy.join('<br>');
}

function callUpdate(){  // updates cities, map, console.
  const cities = gameObject.campaignArmies.cities; // cities
  const factions = gameObject.campaignArmies.factions; /*
  const gameObjectCopy = Object.assign({}, gameObject); was here just to check what gO looked like at this point.
  console.log('update call, goCpy: ', gameObjectCopy);*/
  const playersFaction = factions[checkPlayer()];
  
  // reset cities unit arrays and
  // first factions array need to be up to date
  updateFactions();
  // check all units by all factions and pushes them to cities arrays
  for (let i = 0; i < cities.length; i++) {
    gameObject.campaignArmies.cities[i].unitsByControlled.splice(0, gameObject.campaignArmies.cities[i].unitsByControlled.length);
    gameObject.campaignArmies.cities[i].unitsByInvaded.splice (0, gameObject.campaignArmies.cities[i].unitsByInvaded.length);
    
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
    // set who has defenders advantage:
    cities[yy].defender = cities[yy].controlledBy;
    cities[yy].controlledBy = 'contested' // reset all to contested...
    
    if (cities[yy].unitsByInvaded.length < 1 && cities[yy].unitsByControlled.length > 0) { // if controlled
      cities[yy].controlledBy = cities[yy].unitsByControlled[0].commander;
      
      for (let ind = 0; ind < factions.length; ind++){
        
        if (factions[ind].nombre === cities[yy].controlledBy){
          factions[ind].points = factions[ind].points + cities[yy].income;
          factions[ind].controlling.push(cities[yy]);
        }
      } // if empty, set as neutral:
      
    } else if (cities[yy].unitsByInvaded.length < 1 && cities[yy].unitsByControlled.length < 1) {
      cities[yy].controlledBy = 'neutral';
    }
  }
  fillGrids(); // from public/campaignMap/mapScreen.js. Fills the map screen with grids
  
  // fill to side panel "console1", "YourIncome"
  document.getElementById('yourIncome').innerHTML = playersFaction.points + '<br> Upkeep cost of your army: <br>'+
  countFactionUpkeep(factions[checkPlayer()].army);

  // fill  "YourArmy"  need to reset .moved too.
  consoleUpdate(true);
  
} // callUpdate() ends


// use this like this: countFactionUpkeep(factions[checkPlayer()].army);
function countFactionUpkeep(army){
  let totalCount = 0;
  
  for (let i = 0; i < army.length; i++){
    totalCount = totalCount + army[i].quantity * army[i].details.stats.pointCost;
  }
  
  return totalCount;
}

function checkPlayer(){ // returns index number of players faction.
  const factions = gameObject.campaignArmies.factions;
  
  for (let i = 0; i < factions.length; i++){
 
    if (factions[i].player === true){
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
  firing: false, firingAt: null, notMovedInCombat: false, location: location,  moved: false}; // army, unit, location and quantity... all else to default
  
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
  const factions = gameObject.campaignArmies.factions;
  const cities = gameObject.campaignArmies.cities;
  
  updateFactions();
  
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
        
        if (armyInC[i].moved === false) {
          forAdd = '<strong>' + armyInC[i].quantity + ' x ' + armyInC[i].unit + '</strong><br>' +
          'located: ' + armyInC[i].location + 
          '<br><input type= "button" name ="'+armyInC[i].unit+'" class= "adder" id= "mover" value= "Move this unit." onclick = "controlButtons(this.id, '+ i + ')"><br>';
          buttons1.push(forAdd);
        }  
      }
      infoScreen.innerHTML = infoScreen.innerHTML + buttons1.join('<br>');        
    break;
    case 'endOfTurn':
      
      if (gameObject.phaze === 'hire'){
        gameObject.phaze = 'move';
        
        // AI decides purchases
        computerPurchases(); // at public/ai/aiCommands.js
        callUpdate();
        makeButtons(gameObject.phaze);
      } else {
      
        // AI Moves:
        aiMoves();
      
        // check if any city is contested.
        callUpdate();
        const contestedCities = [];
      
        for (let i = 0; i < cities.length; i++){
        
          if (cities[i].controlledBy === 'contested') {
            contestedCities.push(cities[i]);
          }
        }
        // if any is contested, lets go to settle them at endTurn
        if (contestedCities.length > 0){
          // save 'selected' to localStorage
          localStorage.setItem('Go', JSON.stringify(gameObject));
          window.location = "https://thenewgame.glitch.me/endTurn";
        } else {
          gameObject.turn++;
          infoScreen.innerHTML = ' Turn: ' + gameObject.turn;
        }
      }
    break;
    case 'shopping': // buttons that appear, when player clicks "hire units"
      const currentCost = countFactionUpkeep(factions[checkPlayer()].army);
      const thisWouldCost = par3;
      const incomesNow = factions[checkPlayer()].points;
      const looseMoney = incomesNow - currentCost;
      
      if (looseMoney >= thisWouldCost) {
        infoScreen.innerHTML = 'Ok. Hired. Choose deployment area: ';
        
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
      const who = factions[checkPlayer()].army[par2];
      let locAtm; // index number of city
      let exits = [];
      
      // find city where unit is to find out exits
      for (let i = 0; i < cities.length; i++) {
        
        if (who.location === cities[i].nombre){
          
          for (let ii = 0; ii < cities[i].exits.length; ii++){
            let newBut = '<input type= "button" id = "'+par2+'" value= "'+cities[i].exits[ii]+
            '" onclick = "moveTarget(this.id, this.value)">'+ '<br>';
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
  const factions = gameObject.campaignArmies.factions;
  const whoIs = factions[checkPlayer()].army[who];
  
  infoScreen.innerHTML = 'Ok. Unit is now marching there.'
  whoIs.moved = true;
  whoIs.location = where;  // Atm. so, but will be so that adds unit "marching"
  consoleUpdate(false); // false as we dont want .move reset.
}

function hoverOnGrid(idOfPiece){
  const cities = gameObject.campaignArmies.cities; // cities
  
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
  // add so that only if there is city it will clear details!
  clearDetails();
}

// fill grids:
function fillGrids(){
  const maxElements = 247;
  const gridContainer = document.getElementById('gridContainer');
  const cities = gameObject.campaignArmies.cities; // cities
  
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
