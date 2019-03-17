// this .js is when someone ends turn in campaign and there are contested cities.
function checkPower(group){
  let power = 0;
  
  for (let i = 0; i < group.length; i++) {
    power = power + (group[i].details.stats.pointCost * group[i].quantity);
  }
  
  return power;
}

function destroyUnits(target){
  console.log('destroy units launch: ', target);
  const factions = [
    gameObject.campaignArmies.humans.army,
    gameObject.campaignArmies.elves.army,
    gameObject.campaignArmies.dwarves.army,
    gameObject.campaignArmies.savages.army,
    gameObject.campaignArmies.vampires.army,
  ];
  
  for (let i = 0; i < target.length; i++) {
   
    // find units and destroy them:
    for (let i2 = 0; i2 < factions.length; i2++ ) {
    
      for (let i3 = 0; i3 < factions[i2].length; i3++) {
        
        if (target[i].unit == factions[i2][i3].unit &&
           target[i].quantity == factions[i2][i3].quantity &&
           target[i].location == factions[i2][i3].location ) {
          
          factions[i2].splice(i3, 1);
        }
      }
    }
  }
}

function deductUnits(target, loserPower){
  let pow = loserPower;
  const factions = [
    gameObject.campaignArmies.humans.army,
    gameObject.campaignArmies.elves.army,
    gameObject.campaignArmies.dwarves.army,
    gameObject.campaignArmies.savages.army,
    gameObject.campaignArmies.vampires.army,
  ];
  
  for (let i = 0; i < target.length; i++) {
   
    // find units and destroy/deduct them:
    for (let i2 = 0; i2 < factions.length; i2++ ) {
    
      for (let i3 = 0; i3 < factions[i2].length; i3++) {
        
        if (target[i].unit == factions[i2][i3].unit &&
           target[i].quantity == factions[i2][i3].quantity &&
           target[i].location == factions[i2][i3].location ) {
          const unitsPower = factions[i2][i3].details.stats.pointCost * factions[i2][i3].quantity;
          
          if (unitsPower <= pow) {
            
            factions[i2].splice(i3, 1);
            pow = pow - unitsPower;
          } else if (unitsPower > pow && factions[i2][i3].quantity > 1) {
          
            for (let xx = 0; xx < factions[i2][i3].quantity; xx++) {
            
              if (factions[i2][i3].details.stats.pointCost < pow) {
                
                factions[i2][i3].quantity--;
                pow = pow - factions[i2][i3].details.stats.pointCost;
              }  
            }
          } 
        }
      }
    }
  }  
  
}

function aiVsAi(a1, a2){
  
  //console.log('got ai vs ai: ', a1, a2);
  let a1Power = checkPower(a1);
  let a2Power = checkPower(a2);
  let difference;
  
  //console.log('a1p a2p', a1Power, a2Power);
  // destroy losing army from source and set difference
  if (a1Power < a2Power) {
    console.log('a2 wins');
    difference = a2Power - a1Power;
    destroyUnits(a1);
    
    // if not very big points difference, deduct from winner
    if (difference < 150) {
      deductUnits(a2, a1Power);    
    }
    
  } else if (a1Power > a2Power){
    //console.log('a1 wins');
    difference = a1Power - a2Power;
    destroyUnits(a2);
    
    // if not very big points difference, deduct from winner
    if (difference < 150) {
      deductUnits(a1, a2Power);    
    }
  } else if (a1Power === a2Power) {
    //console.log('draw');
    const winDice = callDice(6);
    const dedu = a1Power * 0.7;
    
    if (winDice < 4) {
      
      destroyUnits(a1);
      deductUnits(a2, dedu);
    } else {
      const dedu = a1Power * 0.7;
      
      destroyUnits(a2);
      deductUnits(a1, dedu);
    }
    
  }
  
    // clear contesteds:
    gameObject.campaignArmies.contested.splice(0, gameObject.campaignArmies.contested.length);
  
    // save gameObject
    localStorage.setItem('Go', JSON.stringify(gameObject));      
  // go to map screen.
    window.location = "https://thenewgame.glitch.me/mapscreen";
}

function getArmyList(whatString){
  console.log('gAl: ', whatString);
  let returning;  
  
  switch (whatString){
    case 'humans':
      returning = humans;
    break;
    case 'elves':
      returning = elves;
    break;
    case 'dwarves':
      returning = dwarves;
    break;
    case 'savages':
      returning = savages;
    break;
    case 'vampires':
      returning = vampires;
    break;
    default: console.log(' whatString not found!');        
  }
  console.log('returning from get army list: ', returning);
  return returning;
}

function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

function startBattles() {
  
  const combats = JSON.parse(sessionStorage.getItem('combatList'));
  // get "captains" as to get compare point to teams:
  let captain1 = combats[0][1][0];
  let captain2 = 'not found';
  // team2 place to find where team2 is located:
  let team1location = combats[0][1].concat([]);
  let team2location = 'not found';
  // teams:
  const team1 = [];
  const team2 = [];
  // for gameObject:
  let a1list;
  let a2list;
  let firstDeploy;
  let secondDeploy;
  
  // find captain2:
  // first from invaders
  for (let i = 0; i < combats[0][1].length; i++) {
    
    if (combats[0][1][i].commander !== captain1.commander) {
      captain2 = combats[0][1][i];
      i = 25; // to terminate loop.
    }
  }
  // if not found from invaders, he is from defenders:
  if (captain2 === 'not found') {
    
    captain2 = combats[0][0][0];
    team2location = combats[0][0].concat([]);
  } else {
    
    team2location = combats[0][1];
  }
  
  // create teams:
  for (let i = 0; i < team1location.length; i++) {
    
    if (team1location[i].commander === captain1.commander){
      
      team1.push(team1location[i]);
    } 
  }
  for (let i = 0; i < team2location.length; i++) {
    
    if (team2location[i].commander === captain2.commander){
      
      team2.push(team2location[i]);
    } 
  }
  
  // if ai vs ai:
  if (team1[0].commander !== gameObject.campaignArmies.armyOfPlayer[0].army &&
      team2[0].commander !== gameObject.campaignArmies.armyOfPlayer[0].army){
      //console.log('aiai, because: ', team1[0].commander, gameObject.campaignArmies.armyOfPlayer[0].army, team2[0].commander, gameObject.campaignArmies.armyOfPlayer[0].army);
    // Settle ai vs ai:
    aiVsAi(team1, team2);   
  } else {
    
      //console.log('not aiai, because: ', team1[0].commander, gameObject.campaignArmies.armyOfPlayer[0].army, team2[0].commander, gameObject.campaignArmies.armyOfPlayer[0].army);
    // player involved:
    // deploys players army first as combat console excepts that:
    if (team1[0].commander === gameObject.campaignArmies.armyOfPlayer[0].army) {
      
      firstDeploy = team2;
      secondDeploy = team1;
    } else {
      
      firstDeploy = team2; secondDeploy = team1;
    }
    
  // armyLists and armies:
  console.log('fd', firstDeploy);
  gameObject.factions[0] = getArmyList(firstDeploy[0].commander);
  gameObject.factions[1] = getArmyList(secondDeploy[0].commander);   
  gameObject.army1 = firstDeploy;
  gameObject.army2 = secondDeploy;     
  
    
  console.log('gameObjc: ', gameObject);  
  // start close combat:
  console.log('4 randomizing field, saving and moving...');
  // randomize field, if more areas are added, need to make that callDice param bigger:
  const fieldRandom = callDice(3) - 1;
  gameObject.terrain = worlds[fieldRandom];
  
  // save 'selected' to localStorage
  localStorage.setItem('Go', JSON.stringify(gameObject));
  // lets do the fight.
  window.location = "https://thenewgame.glitch.me/combat";     
  }
}

window.onload = ()=> {
  // load gameObject from localStorage:
  gameObject = JSON.parse(localStorage.getItem('Go'));  
  // check contested cities push them to contested:
  const battles = document.getElementById('battles');
  const contested = gameObject.campaignArmies.contested;
  const selected = gameObject.campaignArmies.selected;
  var combats;
  combats = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];// here comes unsolved battles..
  console.log('endTurn starts: ', combats);
  
  for (let i = 0; i < gameObject.campaignArmies.cities.length; i++) {
    
    if (gameObject.campaignArmies.cities[i].controlledBy === 'contested') {
      contested.push(gameObject.campaignArmies.cities[i]);    
    }
  }  
  // write info:
  for (let i = 0; i < contested.length; i++) {
    const defenders = [];
    const invaders = [];
    let defenderList = '';
    let invaderList = ''; 
    
    // sort defenders and invaders:
    for (let ii = 0; ii < contested[i].unitsByControlled.length; ii++) {
      
      if (contested[i].unitsByControlled[ii].commander === contested[i].defender) {
        defenders.push(contested[i].unitsByControlled[ii]);    
      } else {
        
        invaders.push(contested[i].unitsByControlled[ii]); 
      }
          
      }
    for (let ii = 0; ii < contested[i].unitsByInvaded.length; ii++) {
      
      if (contested[i].unitsByInvaded[ii].commander === contested[i].defender) {
        defenders.push(contested[i].unitsByInvaded[ii]);    
      } else {
        
        invaders.push(contested[i].unitsByInvaded[ii]); 
      }
    }   
    
    // make defender list
    for (let ii = 0; ii < defenders.length; ii++) {
      let commaDot = ', ';
      
      if (defenders.length - ii === 1){ commaDot = '.'}
      
      defenderList = defenderList + defenders[ii].unit + commaDot;
    }
    
    // make invader list
    for (let ii = 0; ii < invaders.length; ii++) {
      let commaDot = ', ';
      
      if (invaders.length - ii === 1){ commaDot = '.'}
      
      invaderList = invaderList + invaders[ii].unit + commaDot;
    }
    
    // make fight in combats array... maybe so that 0 is defender and others 1, 2 etc...
    combats[i].push(defenders);
    combats[i].push(invaders);
    
    // show contested areas in web element:
    battles.innerHTML = battles.innerHTML + 
    '<br> Contested area: ' + contested[i].nombre + ' of ' + contested[i].defender + '<br>' +
    'Area held by: ' + defenderList + '<br>' +
    'Invaders: ' + invaderList + '<br>';
    
  }
  // save combats array for use in start battle function
  sessionStorage.setItem('combatList', JSON.stringify(combats));
  console.log('end turn ready : ', gameObject);
}
