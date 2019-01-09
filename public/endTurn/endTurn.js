// check contested cities push them to contested:
const battles = document.getElementById('battles');
const contested = gameObject.campaignArmies.contested;
const combats = []; // here comes unsolved battles..

/*
      selected : { // this is to setup combat in campaign:
        army1: {chosenArmy: null, units: []},
        army2: {chosenArmy: null, units: []},
        field: null // can be used like this: worlds[0] 
    }
*/
/*
battles look like this:

Contested area: Seagarden of elves
Area held by: Elf ranger.
Invaders: Steel golem.

Contested area: Tumbes of savages
Area held by: Giant warchief, Hill giant, Viking raider, Peasant rebel.
Invaders: Dwarf warchief.
*/

function startBattles() {
 console.log('start battles');
  // sort out combats like pushing ready "selected"-stuffs in "combats" array... from where first combats go to play first..
  // first combat is always if invaders are 
  // i think it can go directly to combat.html as startGame() there should recognize this is campaign play....
}

window.onload = ()=> {
  // load gameObject from localStorage:
  gameObject = JSON.parse(localStorage.getItem('Go'));
  console.log('endTurn', gameObject.campaignArmies.cities);
  
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
    
    // show contested areas in web element:
    battles.innerHTML = battles.innerHTML + 
    '<br> Contested area: ' + contested[i].nombre + ' of ' + contested[i].defender + '<br>' +
    'Area held by: ' + defenderList + '<br>' +
    'Invaders: ' + invaderList + '<br>';
    
    console.log('d y i, ', defenders, invaders);
  }
}
