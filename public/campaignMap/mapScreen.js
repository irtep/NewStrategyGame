// Campaign map screen js.
// Zones:
const cities = [
// constructor:  public/combat/contructors.js
  // human start cities: city(nombre, income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits
  new city('Crossroads', 100, 'Busy human city in good strategic location', 'to be added..', 
           ['piece162', 'piece163', 'piece164'], 'human', [], [], 
           ['Centerwoods', 'Lurin', 'Arequipa', 'Lima']),
  new city('Riversend', 120, 'Human port city. Good location', 'to be added..', ['piece136', 'piece137', 'piece155', 'piece156'], 'human', [], [],
          ['Lima', 'Seagarden', 'Centerwoods', 'Tumbes']),
  new city('Northfield', 90, 'Human northern city. Good connections', 'to be added..', ['piece88'], 'human', [], [],
          ['Centerwoods', 'Cajamarca', 'Lurin', 'Whitetower', 'Quito']),
  // elf cities:
  new city('Centerwoods', 100, 'Elf city in great center forest.', 'to be added..', ['piece104'], 'elf', [], [],
          ['Tumbes', 'Cajamarca', 'Northfield', 'Lurin', 'Crossroads', 'Riversend']),
  new city('Whitetower', 100, 'Old elven capital at tropical east forest.', 'to be added..', ['piece131', 'piece132', 'piece150', 'piece151'], 'elf', [], [],
          ['Quito', 'Arequipa', 'Lurin']),
  new city('Seagarden', 110, 'Southern elven city.', 'to be added..', ['piece215', 'piece234'], 'elf', [], [],
          ['Riversend', 'Arequipa', 'Lima']),
  // dwarf cities:
  new city('Ironhall', 100, 'Important dwarf stronghold in center north.', 'to be added..', ['piece8', 'piece27', 'piece28', 'piece9'], 'dwarf', [], [],
          ['Tumbes', 'Cajamarca', 'Steelhammer']),
  new city('Steelhammer', 100, 'Northeastern dwarf stronghold.', 'to be added..', ['piece15', 'piece16'], 'dwarf', [], [],
          ['Ironhall', 'Cajamarca', 'Quito']),
  new city('Southdig', 110, 'Southern dwarf city.', 'to be added..', ['piece242', 'piece243'], 'dwarf', [], [],
          ['Seagarden', 'Arequipa', 'Lima']),
  // neutral towns
  new city('Tumbes', 35, 'Important dwarf stronghold in center north.', 'to be added..', ['piece41'], 'neutral', [], [],
          ['Riversend', 'Centerwoods', 'Ironhall', 'Cajamarca']),
  new city('Cajamarca', 35, 'Northeastern neutral stronghold.', 'to be added..', ['piece67'], 'neutral', [], [],
          ['Tumbes', 'Northfield', 'Centerwoods', 'Ironhall', 'Steelhammer']),
  new city('Quito', 35, 'Southern neutral city.', 'to be added..', ['piece74'], 'neutral', [], [],
          ['Steelhammer', 'Northfield', 'Whitetower']),
  new city('Lurin', 135, 'Important neutral stronghold in center north.', 'to be added..', ['piece145'], 'neutral', [], [],
          ['Crossroads', 'Northfield', 'Centerwoods', 'Whitetower']),
  new city('Lima', 35, 'Northeastern neutral stronghold.', 'to be added..', ['piece179'], 'neutral', [], [],
          ['Arequipa', 'Riversend', 'Crossroads', 'Seagarden']),
  new city('Arequipa', 35, 'Southern neutral city.', 'to be added..', ['piece204'], 'neutral', [], [],
          ['Crossroads', 'Whitetower', 'Seagarden', 'Southdig', 'Lima'])
  
];

console.log('cities: ', cities);

function hoverOnGrid(idOfPiece){
  console.log('hovered: ', idOfPiece);
  const pieceToShow = document.getElementById(idOfPiece);
  /*
  element.style.backgroundColor = "red";
  document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
  .topBorder
  */
}

function hoverOffGrid(idOfPiece){
  console.log('hovered out: ', idOfPiece);
  const pieceToShow = document.getElementById(idOfPiece);
}

// fill grids:
function fillGrids(){
  const maxElements = 247;
  const gridContainer = document.getElementById('gridContainer');
  
  for (let i = 0; i < maxElements; i++){
    let pieceInTurn;
    
    gridContainer.innerHTML = gridContainer.innerHTML + '<div class="item1" onmouseover= "hoverOnGrid(this.id)" id= "piece'+i
      +'" onmouseOut= "hoverOffGrid(this.id)"></div>';
    pieceInTurn = 'piece'+i;
    
      // paint city borders if this piece contains a city: 
    for (let ii = 0; ii < cities.length; ii++) {
      for (let iii = 0; iii < cities[ii].zones.length; iii++) {
        if (pieceInTurn === cities[ii].zones[iii]) {
          document.getElementById(pieceInTurn).setAttribute('class', 'borders');
          // write label and other info:
          if (iii === 0) {
            // income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits
            document.getElementById(pieceInTurn).innerHTML = '<span class= "cityName">'+cities[ii].nombre+'</span><br>'+
              'Controlled by: '+ cities[ii].controlledBy;
          }
        }      
      }
    }
  }
}

fillGrids();