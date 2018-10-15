  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [imperials, imperials], // player 1: 0 player 2: 1.
    army1: [{unit: 'Guardsman', id: 1, location: {x: 100, y: 10, z: 0}, quantity: 10, order: 'standby', target: null, 
            engaged: null, joinedCharacters: [], highlighted: false},
            {unit: 'Grizzly battletank', id: 2, location: {x: 250, y: 100, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: null, joinedCharacters: [], highlighted: false}
           ],
    army2: [{unit: 'Guardsman', id: 3, location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', targeted: null, 
             engaged: null, joinedCharacters: [], highlighted: false},
            {unit: 'Grizzly battletank', id: 4, location: {x: 330, y: 510, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: null, joinedCharacters: [], highlighted: false}
           ]  
    // Add terrain elements.
  };