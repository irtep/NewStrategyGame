let player; // who is human player, allocated at startCampaign

// FUNCTIONS: 

function startCampaign(selected, generalsName, generalsPw){
  const cities = gameObject.campaignArmies.cities; // cities
  const factions = gameObject.campaignArmies.factions;
  
  console.log('startCampaign: args: ', selected, generalsName, generalsPw);
  // mark this as campaign play:
  gameObject.campaignPlay = true;  
  // starting a new game:
  if (gameObject.loadingGame === false){

    gameObject.playerStats.name = generalsName;
    gameObject.playerStats.pw = generalsPw;

    // create armies for all players and allocate them to cities. at mapScreen.js
    addUnit('humans', 'Knight commander', 1, 'Crossroads');
    addUnit('humans', 'Crossbowman', 10, 'Riversend');
    addUnit('humans', 'Peasant', 20, 'Northfield');
    addUnit('humans', 'Peasant', 20, 'Northfield');

    addUnit('elves', 'Elven lord', 1, 'Centerwoods');
    addUnit('elves', 'Elven lord', 1, 'Whitetower');
    addUnit('elves', 'Elf ranger', 10, 'Centerwoods');
    addUnit('elves', 'Elf ranger', 10, 'Seagarden');

    addUnit('dwarves', 'Dwarf warchief', 1, 'Ironhall');
    addUnit('dwarves', 'Dwarf infantry', 10, 'Steelhammer');
    addUnit('dwarves', 'Steel golem', 1, 'Southdig');

    addUnit('savages', 'Giant warchief', 1, 'Tumbes');
    addUnit('savages', 'Hill giant', 1, 'Tumbes');
    addUnit('savages', 'Viking raider', 10, 'Tumbes');
    addUnit('savages', 'Peasant rebel', 20, 'Tumbes');

    addUnit('vampires', 'Vampire lord', 1, 'Arequipa');
    addUnit('vampires', 'Zombie', 30, 'Arequipa');
    addUnit('vampires', 'Vampire rider', 5, 'Arequipa');
    addUnit('vampires', 'Zombie', 30, 'Arequipa');
  }
  // set chosen army as player in gameObject  
  // set playerIs:
  switch (selected){
    case 'humans':
      gameObject.campaignArmies.humans.player = true;
      gameObject.campaignArmies.armyOfPlayer = humans;
      gameObject.playerStats.faction = 'humans';
    break;
    case 'elves':
      gameObject.campaignArmies.elves.player = true;
      gameObject.campaignArmies.armyOfPlayer = elves;
      gameObject.playerStats.faction = 'elves';
    break;
    case 'dwarves':
      gameObject.campaignArmies.dwarves.player = true;
      gameObject.campaignArmies.armyOfPlayer = dwarves;
      gameObject.playerStats.faction = 'dwarves';
    break;  
    case 'vampires':
      gameObject.campaignArmies.vampires.player = true;
      gameObject.campaignArmies.armyOfPlayer = vampires;
      gameObject.playerStats.faction = 'vampires';
    break; 
    case 'savages':
      gameObject.campaignArmies.savages.player = true;
      gameObject.campaignArmies.armyOfPlayer = savages;
      gameObject.playerStats.faction = 'savages';
    break; 
    default: console.log('cant find selected at addUnit');  
  }    
      
  if (gameObject.loadingGame === true) {
    gameObject.loadingGame = false;
    // armies to teams.
    const arms = gameObject.playerStats.armies;
    const teams = gameObject.campaignArmies;
    
    if (arms.humans.length > 0) {
      teams.humans.army = arms.humans;    
    }    
    if (arms.elves.length > 0) {
      teams.elves.army = arms.elves;    
    }    
    if (arms.dwarves.length > 0) {
      teams.dwarves.army = arms.dwarves;    
    }    
    if (arms.savages.length > 0) {
      teams.savages.army = arms.savages;    
    }    
    if (arms.vampires.length > 0) {
      teams.vampires.army = arms.vampires;    
    }
  }
  player = selected;
  // set all and start turn 1.
  // push factions with units to: factions array
  factions.push(gameObject.campaignArmies.humans);
  factions.push(gameObject.campaignArmies.elves);
  factions.push(gameObject.campaignArmies.dwarves); 
  factions.push(gameObject.campaignArmies.vampires);
  factions.push(gameObject.campaignArmies.savages);
  
  callUpdate();
  
  // databasecheck test
  /*  disabled as not testing atm.
        const savedGame = makeSavedGame(gameObject);
        //make the save html call.
        console.log('exceeds 5 wins, sending save request. ', savedGame);
        checkDatabase('saveGame', savedGame);
  */
  console.log('go: ', gameObject);
}
//  -------- ONLOAD:  ------------
window.onload = ()=> {
  
  // load gameObject from localStorage:
  //gameObject = JSON.parse(localStorage.getItem('Go'));
  checki = JSON.parse(localStorage.getItem('Go'));
  
  // if first turn then saved localStorage item indicates the chosen race.
  if (checki[0] === 'humans' ||
     checki[0] === 'elves' ||
      checki[0] === 'dwarves' ||
      checki[0] === 'savages' ||
      checki[0] === 'vampires'
     ) {
    gameObject.turn = 1;
    startCampaign(checki[0], checki[1], checki[2]);
    makeButtons(gameObject.phaze);
  } 
  else { // but if not, then campaign is going on or loaded game.
    
    // check if loaded game:
    if (gameObject.loadingGame) {
      
      gameObject.turn = gameObject.playerStats.turn;
      startCampaign(gameObject.playerStats.faction, gameObject.playerStats.name, gameObject.playerStats.pw);
      makeButtons(gameObject.phaze);
    } else {
      
      // not loaded game
      gameObject = JSON.parse(localStorage.getItem('Go'));
      callUpdate();
      
      // Check if cities are still contested:
      const contestedCities = [];
      
      for (let i = 0; i < gameObject.campaignArmies.cities.length; i++){
        
        if (gameObject.campaignArmies.cities[i].controlledBy === 'contested') {
          contestedCities.push(gameObject.campaignArmies.cities[i]);
        }
      }
    
      // if any is contested, lets go to settle them at endTurn
      if (contestedCities.length > 0){
        // save 'selected' to localStorage
        localStorage.setItem('Go', JSON.stringify(gameObject));
        window.location = "https://thenewgame.glitch.me/endTurn";        
      } else {
          
        // check if game is over:
        gameObject.turn++;
        const gameOver = checkIfOver(gameObject);
        infoScreen.innerHTML = ' Turn: ' + gameObject.turn;
        gameObject.phaze = 'hire';
        makeButtons(gameObject.phaze);
        callUpdate();
      
        // save process if player has atleast 5 wins
        if (gameObject.playerStats.wins > 4) {
          const savedGame = makeSavedGame(gameObject);
          //make the save html call.
          console.log('exceeds 5 wins, sending save request. ', savedGame);
          checkDatabase('saveGame', savedGame);
        }
      }
    }
  }
  
  callUpdate();
};
//