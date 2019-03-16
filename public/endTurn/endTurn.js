// this .js is when someone ends turn in campaign and there are contested cities.

function aiVsAi(a1, a2){
  console.log('got ai vs ai: ', a1, a2);
}

function getArmyList(whatString){
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
  return returning;
}

function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

function startBattles() {
  
  const combats = JSON.parse(sessionStorage.getItem('combatList'));
  var fightBetweenInvaders = false;
  var indexOfRivalInvader;
  var indexOfCombat;
  
  // find combat in turn:
  for (let i = 0; i < combats.length; i++) {
    //var zero = false;
    var one = false;

    if (typeof combats[i][1] !== 'undefined' && one === false) {
      
      if (combats[i][1].length > 0) {
        one = true;  // find invaders  
        indexOfCombat = i;
      }
      
      // check if all invaders are from same side:
      for (let ii = 0; ii < combats[i][1].length; ii++){
        
        if (combats[i][1][ii].commander !== combats[i][1][ii].commander && indexOfCombat == i) {
          fightBetweenInvaders = true;
          indexOfRivalInvader = ii;
        }  
      }
    }
    
  }
  let a1;
  let a2;
  let a1list;
  let a2list;
  let firstDeploy;
  let secondDeploy;
  
  // untested as ai of campaign game is not yet done.
  // if more than one invading army
  if (fightBetweenInvaders === true) { 
    console.log('3a fight between invaders ');
    a1 = combats[indexOfCombat][1][0];
    a2 = combats[indexOfCombat][1][indexOfRivalInvader];

    // deploys players army first as combat console excepts that:
    if (a1[0].commander === gameObject.campaignArmies.armyOfPlayer[0].army) {
      firstDeploy = a2;
      secondDeploy = a1;
    } else {
      firstDeploy = a2; secondDeploy = a1;
    }    
    
    gameObject.factions[0] = getArmyList(firstDeploy.commander);
    gameObject.factions[1] = getArmyList(secondDeploy.commander);
    
    for (let ix = 0; ix < combats[indexOfCombat][1].length; ix++) {
      
      if (combats[indexOfCombat][1][ix].commander === firstDeploy.commander){  
        gameObject.army1.push(combats[indexOfCombat][1][ix]);
      }
      
      if (combats[indexOfCombat][1][ix].commander === secondDeploy.commander){  
        gameObject.army2.push(combats[indexOfCombat][1][ix]);
      }      
    }  
    
  } else { // if only one invader army
    a1 = combats[indexOfCombat][0];
    a2 = combats[indexOfCombat][1];
    a1list = getArmyList(a1[0].commander);
    a2list = getArmyList(a2[0].commander);
    
    // deploys players army first as combat console excepts that:
    if (a1[0].commander === gameObject.campaignArmies.armyOfPlayer[0].army) {
      firstDeploy = a2;
      secondDeploy = a1;
    } else {
      firstDeploy = a2; secondDeploy = a1;
    }
    
    gameObject.factions[0] = getArmyList(firstDeploy[0].commander);
    gameObject.factions[1] = getArmyList(secondDeploy[0].commander);
    
    gameObject.army1 = firstDeploy;
    gameObject.army2 = secondDeploy;    
  }
  
  // Now here, need to check if it is AI vs AI
  let firstIsPlayer = false;
  let secondIsPlayer = false;
  
  // from what army are these guy:
  for (let ind = 0; ind < gameObject.campaignArmies.factions.length; ind++){
  
    if (firstDeploy[0].commander === campaignArmies.factions[ind].army[0].commander) {
    
      if (gameObject.campaignArmies.factions[ind].player === true){
        firstIsPlayer = true;
      }
    }
    if (secondDeploy[0].commander === campaignArmies.factions[ind].army[0].commander) {
      
      if (gameObject.campaignArmies.factions[ind].player === true){
        secondIsPlayer = true;
      }
    }
  }
  
  // Settle ai vs ai:
  if (firstIsPlayer === false && secondIsPlayer === false) {
    aiVsAi(gameObject.army1, gameObject.army2);
  } else {
  
    // if player is involved, start close combat:
  console.log('4 randomizing field, saving and moving...');
  // randomize field, if more areas are added, need to make that callDice param bigger:
  const fieldRandom = callDice(3) - 1;
  gameObject.terrain = worlds[fieldRandom];
  
  // save 'selected' to localStorage
  localStorage.setItem('Go', JSON.stringify(gameObject));
  // clear this fight from combats:
  combats.splice(0, 1); 
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
