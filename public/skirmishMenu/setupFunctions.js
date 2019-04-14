function randomArmies() {  // not very random atm. but allows quick setup for ua-test.
  
  selected.army1.chosenArmy = humans; // selected object is at public/start/setup.js
  selected.army2.chosenArmy = dwarves;
  addUnit('army1', 'Knight', 5, 5);
  addUnit('army1', 'Swordsman', 10, 2);
  addUnit('army1', 'Crossbowman', 10, 2);
  addUnit('army1', 'Swordsman', 10, 2);
  addUnit('army1', 'Swordsman', 10, 2);
  addUnit('army1', 'Swordsman', 10, 2);
  addUnit('army2', 'Dwarf warchief', 1, 25);
  addUnit('army2', 'Mountain guardian', 10, 8);
  addUnit('army2', 'Dwarf infantry', 10, 3);
  addUnit('army2', 'Steel golem', 1, 30);
  extraButtonHandler('ready1');
  extraButtonHandler('ready2');
}

function extraButtonHandler(buttonId) {
  switch (buttonId) {
    case 'clear1':
      selected.army1.units = [];
      document.getElementById('army1Recap').innerHTML = '';
    break;
    case 'clear2':
      selected.army2.units = [];
      document.getElementById('army2Recap').innerHTML = '';
    break;
    case 'ready1':
      selected.army1.ready = true;
      if (selected.army2.ready === true){
        // save 'selected' to localStorage
        localStorage.setItem('Go', JSON.stringify(selected));
        window.location = "https://thenewgame.glitch.me/combat"; 
      }
    break;
    case 'ready2':
      selected.army2.ready = true;
      if (selected.army1.ready === true){
        // save 'selected' to localStorage
        localStorage.setItem('Go', JSON.stringify(selected));
        window.location = "https://thenewgame.glitch.me/combat"; 
      }
    break;
    
    default: console.log('button id not found in extrabuttonhandler');
  }
}

function updatePoints(points1, points2){
  document.getElementById('p1PointsLeft').innerHTML = points1;
  document.getElementById('p2PointsLeft').innerHTML = points2;
}

function updateArmies() {
 if (selected.army1.units.length > 0) {
   const unitNames = [];
   for (let i = 0; i < selected.army1.units.length; i++) {
     unitNames.push(selected.army1.units[i].unit);
   }
   document.getElementById('army1Recap').innerHTML = unitNames.join(', ');
   // and ready and start over buttons:
   document.getElementById('extraButtons1').innerHTML = '<input type= "button", id= "clear1" class= "clears" value= "Clear all" onclick= "extraButtonHandler(this.id)">'+
   '<input type= "button", id= "ready1" class= "readies" value= "Ready to battle" onclick= "extraButtonHandler(this.id)">';
 }
 if (selected.army2.units.length > 0) {
   const unitNames = [];
   for (let i = 0; i < selected.army2.units.length; i++) {
     unitNames.push(selected.army2.units[i].unit);
   }
   document.getElementById('army2Recap').innerHTML = unitNames.join(', ');
   // and ready and start over buttons:
   document.getElementById('extraButtons2').innerHTML = '<input type= "button", id= "clear2" class= "clears" value= "Clear all" onclick= "extraButtonHandler(this.id)">'+
   '<input type= "button", id= "ready2" class= "readies" value= "Ready to battle" onclick= "extraButtonHandler(this.id)">';
 }  
}

function addUnit(targetArmy, targetUnit, unitSize, pointCost){
  const whoIsIt = targetArmy; // army1 or army2
  let armyInCase; let infoBoxInCase;
  const newUnit = {unit: targetUnit, id: null, location: {x: 0, y: 0, z: 0}, quantity: unitSize, order: 'standby', target: null, 
  engaged: {yes: false, withWho: []}, joinedCharacters: [], highlighted: false, commander: targetArmy, details: null,
  firing: false, firingAt: null, notMoved: false}; // army, unit and quantity... all else to default
  
  // set armyInCase and infoBoxInCase:
  if (whoIsIt === 'army1') {
    armyInCase = selected.army1;
    infoBoxInCase = document.getElementById('infobox1');
  } else {
    armyInCase = selected.army2;
    infoBoxInCase = document.getElementById('infobox2');
  }
  
  // check that army has enough points left and deduct point, if it is so:
  if (armyInCase.pointsLeft >= pointCost) {
    armyInCase.units.push(newUnit);
    armyInCase.pointsLeft = armyInCase.pointsLeft - pointCost;
    updatePoints(selected.army1.pointsLeft, selected.army2.pointsLeft);
    updateArmies();
  } else {
    infoBoxInCase.innerHTML = 'Not enough points left for that!';
    setTimeout(() => {
      infoBoxInCase.innerHTML = ''; }, 1500);
  }
};