// functions in use from public/start/setupFunctions:
// updatePoints(points1, points2);

// selections:
const selected = {
army1: {chosenArmy: 'default', pointsLeft: 200, units: []},
army2: {chosenArmy: 'default', pointsLeft: 200, units: []}
}

// armies:
const availArmies = ['Humans', 'Elves', 'Dwarves'];

// make army selection radiobuttons:
for (let i = 0; i < availArmies.length; i++) {
  const a1s = document.getElementById('army1section');
  
  if (i === 0) {
    a1s.innerHTML = '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
  } else {
    a1s.innerHTML = a1s.innerHTML + '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
  }
}

// event listener for radio button above:
const selector1 = document.armySelectForm1.army1;
let clickedArmy; // placeholder for clicked radio button

for (let i = 0; i < selector1.length; i++) {
  selector1[i].addEventListener('change', () => { 
    selected.army1.chosenArmy = selector1[i].value;
    
    // make list of choosable units:
    switch (selected.army1.chosenArmy){
      case 'Humans':
        clickedArmy = kingdom;
      break;
      case 'Elves':
        clickedArmy = elves;
      break;
      case 'Dwarves':
        clickedArmy = dwarves;
      break;
      default: console.log/(' army1 chosenArmy not found!');        
    }
    // clear unit1section:
    document.getElementById('unit1section').innerHTML = '';
    // make a hire buttons:
    let buttons = [];
    for (let i = 0; i < clickedArmy.length; i++) {
      let forAdd;
      const theArmy = 'army1';
      
      forAdd = '<strong>' + clickedArmy[i].unitSize + ' x ' + clickedArmy[i].nombre + '</strong><br>' +
      'Point cost: ' + clickedArmy[i].stats.pointCost * clickedArmy[i].unitSize + '. Limit per army: '+ clickedArmy[i].limit +'<br>' +
      clickedArmy[i].longDesc + '<br><input type= "button" class= "adder" name= "army1" id= "'+ clickedArmy[i].nombre +'" value= "Add this unit." onclick = "addUnit(this.name, this.id, '+clickedArmy[i].unitSize+')"><br>';
      buttons.push(forAdd); 
    }
        document.getElementById('unit1section').innerHTML = buttons.join('<br>');
  });
}

//  -------- ONLOAD:  ------------
window.onload = ()=> {
  updatePoints(selected.army1.pointsLeft, selected.army2.pointsLeft);
};