// functions in use from public/start/setupFunctions:
// updatePoints(points1, points2);

// selections:
const selected = {
army1: {chosenArmy: null, pointsLeft: 200, units: [], ready: false},
army2: {chosenArmy: null, pointsLeft: 200, units: [], ready: false},
field: worlds[0] // defaulted to 0
}
// playfields
const availFields = ['small farm','forest','village']; // 0, 1, 2
// armies:
const availArmies = ['Humans', 'Elves', 'Dwarves'];

// make field selection radiobuttons:
for (let i = 0; i < availFields.length; i++) {
  const fields = document.getElementById('fields');
  
  if ( i === 0) {
    fields.innerHTML = '<input type= "radio" name= "theField" value = "'+ availFields[i] + '"/>'+ availFields[i] + '<br>';    
  } else {
    fields.innerHTML = fields.innerHTML + '<input type= "radio" name= "theField" value = "'+ availFields[i] + '"/>'+ availFields[i] + '<br>';
  }
}  
// make army selection radiobuttons:
for (let i = 0; i < availArmies.length; i++) {
  const a1s = document.getElementById('army1section');
  const a2s = document.getElementById('army2section');
  
  if (i === 0) {
    a1s.innerHTML = '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+ availArmies[i]+ '<br>';
    a2s.innerHTML = '<input type= "radio" name= "army2" value="'+ availArmies[i] +'"/>'+ availArmies[i]+ '<br>';
  } else {
    a1s.innerHTML = a1s.innerHTML + '<input type= "radio" name= "army1" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
    a2s.innerHTML = a2s.innerHTML + '<input type= "radio" name= "army2" value="'+ availArmies[i] +'"/>'+availArmies[i]+'<br>';
  }
}

// event listener for radio buttons above:
const selectField = document.fieldSelect.theField; //
const selector1 = document.armySelectForm1.army1;
const selector2 = document.armySelectForm2.army2;
// placeholders for clicked radio buttons
let clickedArmy;
let clickedArmy2;
let clickedField;

// field:
for (let i = 0; i < selectField.length; i++) {
  selectField[i].addEventListener('change', () => {
    selected.field = selectField[i].value;
    
    // convert to selected.field so that gameObject is understood
    switch (selected.field) {
      case 'small farm':
        selected.field = worlds[0];  
      break;
      case 'forest':
        selected.field = worlds[1];  
      break;  
      case 'village':
        selected.field = worlds[2];  
      break;
      default: console.log('selected.field not found!');
    }
  });
}

// Army 1:
for (let i = 0; i < selector1.length; i++) {
  selector1[i].addEventListener('change', () => { 
    selected.army1.chosenArmy = selector1[i].value;
    
    // make list of choosable units and convert to real army names:
    switch (selected.army1.chosenArmy){
      case 'Humans':
        clickedArmy = humans;
        selected.army1.chosenArmy = humans;
      break;
      case 'Elves':
        clickedArmy = elves;
        selected.army1.chosenArmy = elves;
      break;
      case 'Dwarves':
        clickedArmy = dwarves;
        selected.army1.chosenArmy = dwarves;
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
      const totalPointCost = clickedArmy[i].stats.pointCost * clickedArmy[i].unitSize;
      
      forAdd = '<strong>' + clickedArmy[i].unitSize + ' x ' + clickedArmy[i].nombre + '</strong><br>' +
      'Point cost: ' + totalPointCost + '.<br>' +
      clickedArmy[i].longDesc + '<br><input type= "button" class= "adder" name= "army1" id= "'+ clickedArmy[i].nombre +'" value= "Add this unit." onclick = "addUnit(this.name, this.id, '+clickedArmy[i].unitSize+', '+totalPointCost+')"><br>';
      buttons.push(forAdd); 
    }
        document.getElementById('unit1section').innerHTML = buttons.join('<br>');
  });
}

// Army 2:
for (let i = 0; i < selector2.length; i++) {
  selector2[i].addEventListener('change', () => { 
    selected.army2.chosenArmy = selector2[i].value;
    
    // make list of choosable units:
    switch (selected.army2.chosenArmy){
      case 'Humans':
        clickedArmy2 = humans;
        selected.army2.chosenArmy = humans;
      break;
      case 'Elves':
        clickedArmy2 = elves;
        selected.army2.chosenArmy = elves;
      break;
      case 'Dwarves':
        clickedArmy2 = dwarves;
        selected.army2.chosenArmy = dwarves;
      break;
      default: console.log/(' army2 chosenArmy not found!');        
    }
    // clear unit2section:
    document.getElementById('unit2section').innerHTML = '';
    // make a hire buttons:
    let buttons = [];
    for (let i = 0; i < clickedArmy2.length; i++) {
      let forAdd;
      const theArmy = 'army2';
      const totalPointCost = clickedArmy2[i].stats.pointCost * clickedArmy2[i].unitSize;
      
      forAdd = '<strong>' + clickedArmy2[i].unitSize + ' x ' + clickedArmy2[i].nombre + '</strong><br>' +
      'Point cost: ' + totalPointCost + '<br>' +
      clickedArmy2[i].longDesc + '<br><input type= "button" class= "adder" name= "army2" id= "'+ clickedArmy2[i].nombre +'" value= "Add this unit." onclick = "addUnit(this.name, this.id, '+clickedArmy2[i].unitSize+', '+totalPointCost+')"><br>';
      buttons.push(forAdd); 
    }
        document.getElementById('unit2section').innerHTML = buttons.join('<br>');
  });
}

//  -------- ONLOAD:  ------------
window.onload = ()=> {
  updatePoints(selected.army1.pointsLeft, selected.army2.pointsLeft);
};