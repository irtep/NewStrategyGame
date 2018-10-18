  const gameObject = { // seq: nombre, location, type, desc, meleeWeapons, rangedWeapons,
                       //stats, size, army, order, targeted, quantity
    factions: [imperials, imperials], // player 1: 0 player 2: 1.
    army1: [{unit: 'Guardsman', id: 1, location: {x: 100, y: 10, z: 0}, quantity: 10, order: 'standby', target: null, 
            engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null},
            {unit: 'Grizzly battletank', id: 2, location: {x: 250, y: 100, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null},
            {unit: 'Lizard light tank', id: 3, location: {x: 450, y: 100, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null},
            {unit: 'Ranger', id: 4, location: {x: 550, y: 100, z: 0}, quantity: 3, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army1', details: null}
           ],
    army2: [{unit: 'Guardsman', id: 5, location: {x: 100, y: 500, z: 0}, quantity: 5, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null},
            {unit: 'Grizzly battletank', id: 6, location: {x: 330, y: 510, z: 0}, quantity: 1, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null},
            {unit: 'Guardsman', id: 7, location: {x: 500, y: 500, z: 0}, quantity: 6, order: 'standby', target: null, 
             engaged: false, joinedCharacters: [], highlighted: false, commander: 'army2', details: null}
           ],  // adding terrains like this, in later versions will be generated:
    terrain: [{building: 'small building', location: {x: 250, y: 222}, size: {width: 45, height: 45}, type: 'building'},
              {building: 'medium building', location: {x: 550, y: 240}, size: {width: 120, height: 60}, type: 'building'},
              {building: 'large building', location: {x: 420, y: 260}, size: {width: 77, height: 140}, type: 'building'},
              {forest: 'small forest', locations: [{x: 100, y: 330},{x: 155, y: 330},{x: 220, y: 390},{x: 200, y: 330}],
               trees: 4, radiuses: [25, 54, 48, 27], type: 'forest'}
             ],
    selectedUnits: {player1: null, player2: null},
    targetedUnits: {player2: null, player2: null}
    // Add terrain elements.
  };
              
              /*
              forest('small forest', {trees: 3}, {radiuses: [25, 54, 28]}, 
  {locations: [{x: 100, y: 260},{x: 100, y: 260},{x: 100, y: 260}]})
              */
              