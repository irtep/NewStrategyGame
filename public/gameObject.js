  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [kingdom, elves], // player 1: 0 player 2: 1.
    army1: armies[2], // 0 ig, 1 sm, 2 kingd, 3 elves
    army2: armies[3],  
    terrain: worlds[0],
    selectedUnits: {player1: null, player2: null}, 
    targetedUnits: {player2: null, player2: null}
    // Add terrain elements.
  };
              
              /*
              forest('small forest', {trees: 3}, {radiuses: [25, 54, 28]}, 
  {locations: [{x: 100, y: 260},{x: 100, y: 260},{x: 100, y: 260}]})
              */
              