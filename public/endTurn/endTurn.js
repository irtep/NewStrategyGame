// check contested cities push them to contested:
const battles = document.getElementById('battles');
const contested = gameObject.campaignArmies.contested;
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

function startBattles() {
 console.log('start battles');
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
    }
  }
  console.log('combats: ', combats);
}
