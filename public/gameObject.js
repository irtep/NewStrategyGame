  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [imperials, imperials], // player 1: 0 player 2: 1.
    army1: [{unit: 'Guardsman', id: 1, location: {x: 100, y: 10, z: 0}, quantity: 10, order: 'standby', target: null, 
            engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null},
            {unit: 'Grizzly battletank', id: 2, location: {x: 250, y: 100, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null},
            {unit: 'Ranger', id: 3, location: {x: 550, y: 100, z: 0}, quantity: 3, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null}
           ],
    army2: [{unit: 'Guardsman', id: 4, location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null},
            {unit: 'Grizzly battletank', id: 5, location: {x: 330, y: 510, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null},
            {unit: 'Guardsman', id: 6, location: {x: 500, y: 500, z: 0}, quantity: 6, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null}
           ],
    selectedUnits: {player1: null, player2: null},
    targetedUnits: {player2: null, player2: null}
    // Add terrain elements.
  };