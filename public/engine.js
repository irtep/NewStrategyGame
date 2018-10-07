let pause = false;

function startGame(){ // 100 10     100 500 130 510
  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [imperials, imperials], // player 1: 0 player 2: 1.
    army1: [{unit: 'Guardsman', location: {x: 100, y: 10, z: 0}, quantity: 10, order: 'standby', targeted: null},
            {unit: 'Grizzly battletank', location: {x: 250, y: 100, z: 0}, quantity: 1, order: 'standby', targeted: null}
           ],
    army2: [{unit: 'Guardsman', location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', targeted: null},
            {unit: 'Grizzly battletank', location: {x: 330, y: 510, z: 0}, quantity: 1, order: 'standby', targeted: null}
           ],
    canvas: document.getElementById("kanveesi")
  };
  draw(gameObject);
}
startGame();