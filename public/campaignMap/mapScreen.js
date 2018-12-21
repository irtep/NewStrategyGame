// Campaign map screen js.
// Zones:
const cities = [
// constructor:  public/combat/contructors.js
  // human start cities: city(nombre, income, shortDesc, longDesc, zones, controlledBy, unitsByControlled, unitsByInvaded, exits
  new city('Crossroads', 120, 'busy human city in good strategic location', 'to be added..', )
];
/*
Cities: 
Humans:
Crossroads, Riversend, Northfield
Dwarves:
Ironhall, Steelhammer, Southdig
Elves:
Centerwoods, Whitetower, Seagarden
Towns:
1213 tumbes, 2728 Cajamarca, 32 quito, 51 lurin, 70 Lima, 85 Arequipa

Crossroads: 61, 62, 63, 71, 72, 73
Exits:  centerwoods, lurin, Arequipa, lima

Riversend: 46, 57, 58
Exits: lima, sea garden, tumbes, centerwoods

Northfield: 39, 40
Exits: centerwoods, cajamarca, quito, white tower, luring
*/
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
  const maxElements = 88;
  const gridContainer = document.getElementById('gridContainer');
  
  for (let i = 0; i < maxElements; i++){
    gridContainer.innerHTML = gridContainer.innerHTML + '<div class="item1" onmouseover= "hoverOnGrid(this.id)" id= "piece'+i
      +'" onmouseOut= "hoverOffGrid(this.id)">'+ i +'</div>';
  }
}

fillGrids();