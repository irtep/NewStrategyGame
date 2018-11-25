// selections:
const selected = {
army1: {chosenArmy: 'default'},
army2: {chosenArmy: 'default'}
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

for (let i = 0; i < selector1.length; i++) {
  selector1[i].addEventListener('change', () => { 
    selected.army1.chosenArmy = selector1[i].value;
    
    // make list of choosable units:
    switch (selected.army1.chosenArmy){
      case 'Humans':
        console.log('h');
      break;
      case 'Elves':
        console.log('e', elves);
        // make a hire buttons:
        let buttons = [];
        for (let i = 0; i < elves.length; i++) {
          let forAdd;
          forAdd = '<strong>' + elves[i].unitSize + ' x ' + elves[i].nombre + '</strong><br>' +
            'Point cost: ' + elves[i].stats.pointCost * elves[i].unitSize + '<br>' +
            elves[i].longDecs + '<br><input type= "button" class= "hire" value= "'+ elves[i].nombre +'"><br>';
          buttons.push(forAdd); 
        }
        document.getElementById('unit1section').innerHTML = buttons.join('<br>');
      break;
      case 'Dwarves':
        console.log('d');
      break;
      default: console.log/(' army1 chosenArmy not found!');        
    }    
  });
}


/*
          <p id= "unit1section">
          <!-- MAKE A DYNAMIC THING THAT LOOPS units here: -->
          </p>
*/