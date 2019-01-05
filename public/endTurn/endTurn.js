// check contested cities push them to contested:
const battles = document.getElementById('battles');
const contested = [];

window.onload = ()=> {
  // load gameObject from localStorage:
  const gameObject = JSON.parse(localStorage.getItem('Go'));
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
    
    battles.innerHTML = battles.innerHTML + 
    '<br> Contested area: ' + contested[i].nombre + ' of ' + contested[i].defender + '<br>'; /* +
    'Area held by: ' + contested[i] */
    
    console.log('d y i, ', defenders, invaders);
  }
}
