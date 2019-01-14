// check contested cities push them to contested:
const battles = document.getElementById('battles');
const contested = gameObject.campaignArmies.contested;
const selected = gameObject.campaignArmies.selected;
const combats = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]; // here comes unsolved battles..
/*
battles look like this:

Contested area: Seagarden of elves
Area held by: Elf ranger.
Invaders: Steel golem.

Contested area: Tumbes of savages
Area held by: Giant warchief, Hill giant, Viking raider, Peasant rebel.
Invaders: Dwarf warchief.
*/
function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

function startBattles() {
 console.log('1 start battles');
  var fightBetweenInvaders = false;
  var indexOfRivalInvader;
  var indexOfCombat;
  
  // find combat in turn:
  for (let i = 0; i < combats.length; i++) {
    console.log('checking combats.. ', combats);
    //var zero = false;
    var one = false;
    /*
    if (typeof combats[i][0] !== 'undefined') {
      
      if (combats[i][0].length > 0) {
        zero = true;  // found defenders
      }      
    }*/
    if (typeof combats[i][1] !== 'undefined' && one === false) {
      
      if (combats[i][1].length > 0) {
        one = true;  // find invaders  
        indexOfCombat = i;
      }
      
      // check if all are from same side:
      for (let ii = 0; ii < combats[i][1].length; ii++){
        
        if (combats[i][1][ii].commander !== combats[i][1][ii].commander && indexOfCombat == i) {
          fightBetweenInvaders = true;
          indexOfRivalInvader = ii;
        }  
      }
    }
    
  }
  console.log('goes here?');
  let a1;
  let a2;
  
  // untested as ai of campaign game is not yet done.
  // if more than one invading army
  if (fightBetweenInvaders === true) { 
    console.log('3a fight between invaders ');
    a1 = combats[indexOfCombat][1][0];
    a2 = combats[indexOfCombat][1][indexOfRivalInvader];
    
    gameObject.factions[0] = a1.commander;
    gameObject.factions[1] = a2.commander;
    
    for (let ix = 0; ix < combats[indexOfCombat][1].length; ix++) {
      
      if (combats[indexOfCombat][1][ix].commander === a1.commander){  
        gameObject.army1.push(combats[indexOfCombat][1][ix]);
      }
      
      if (combats[indexOfCombat][1][ix].commander === a2.commander){  
        gameObject.army2.push(combats[indexOfCombat][1][ix]);
      }      
    }  
    
  } else { // if only one invader army
    console.log('3b only one invader');
    a1 = combats[indexOfCombat][0];
    a2 = combats[indexOfCombat][1];

    gameObject.factions[0] = a1[0].commander;
    gameObject.factions[1] = a2[0].commander;
    
    gameObject.army1 = a1;
    gameObject.army2 = a2;
    
    /*
    gameObject.army1 = selected.army1.units; gameObject.army2 = selected.army2.units;
    gameObject.factions[0] = selected.army1.chosenArmy; gameObject.factions[1] = selected.army2.chosenArmy;
    gameObject.terrain = selected.field; 
    */     
  }
  console.log('4 randomizing field, saving and moving...');
  // randomize field:
  const fieldRandom = callDice(3) - 1;
  gameObject.terrain = worlds[fieldRandom];

  // save 'selected' to localStorage
  localStorage.setItem('Go', JSON.stringify(gameObject));
  // lets do the fight.
  window.location = "https://thenewgame.glitch.me/combat";   
  console.log('5 should have moved by now..'); 
  // sort out combats like pushing ready "selected"-stuffs in "combats" array... from where first combats go to play first..
  // first combat is always if invaders are 
/*
      selected : { // this is to setup combat in campaign:
        army1: {chosenArmy: null, units: []},
        army2: {chosenArmy: null, units: []},
        field: null // can be used like this: worlds[0] 
    }
*/
  // i think it can go directly to combat.html as startGame() there should recognize this is campaign play....
}

window.onload = ()=> {
  // load gameObject from localStorage:
  gameObject = JSON.parse(localStorage.getItem('Go'));
  console.log('endTurn', gameObject);
  
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
    
    console.log('d y i, combats ', defenders, invaders, combats);
    
    // separate invaders if they are from several armies...
    // this code cant be checked yet, as ai for campaign play is not made....
    // DISABLED AS I TRY TO DO THIS IN Start Battle section!
    /*
    for (let i = 0; i < invaders.length;) {
      const tempFile = [[],[],[],[]];
      
      if (invaders[0].details.commander !== invaders[i].details.commander){
        console.log('found different');
        tempFile[0].push(invaders[i]);
        const removed = invaders.splice(i, 1);
      }
      i++
      // when ready, check tempFile
      if (i === invaders.length) {
        
        for (let ix = 0; ix < tempFile.length; ix++) {
          if (tempFile[ix].length > 0){
            for (let ix2 = 0; ix2 < tempFile[ix][ix2].length; ix2++) {
              // if found different team, push to next... 
              if (tempFile[ix][0].details.commander !== tempFile[ix][ix2].details.commander){
                const plusOne = ix2 + 1;
                tempFile[ix][plusOne].push(tempFile[ix][ix2]);
                const removedx = tempFile[ix].splice(ix2, 1);
              }
            }
          }
        }    //
      }
      // Make pushes to invaders from tempFile.........or maybe should pick to selected directly...
    } */
  }
  console.log('combats: ', combats);
}
