// check contested cities push them to contested:
const battles = document.getElementById('battles');
const contested = gameObject.campaignArmies.contested;

function startBattles() {
 console.log('start battles');
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
    
    battles.innerHTML = battles.innerHTML + 
    '<br> Contested area: ' + contested[i].nombre + ' of ' + contested[i].defender + '<br>' +
    'Area held by: ' + defenderList + '<br>' +
    'Invaders: ' + invaderList + '<br>';
    
    console.log('d y i, ', defenders, invaders);
  }
}
